import { supabase } from "@/integrations/supabase/client";

interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
  greenNote?: { de: string; en: string };
  blue: { de: string; en: string };
  blueNote?: { de: string; en: string };
}

interface WeeklyMenu {
  period: string;
  days: MenuDay[];
}

const CACHE_KEY = 'weekly_menu_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes (match server cache)
const isDev = import.meta.env.DEV;

interface CachedMenu {
  data: WeeklyMenu;
  timestamp: number;
}

// Fetch menu through edge function (secure, server-side)
export async function fetchMenuFromSheets(_sheetId?: string): Promise<WeeklyMenu> {
  if (isDev) console.log('📊 Fetching menu through edge function');
  
  // Check client-side cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const cachedData: CachedMenu = JSON.parse(cached);

      // If cached data contains spreadsheet error placeholders, treat cache as invalid
      const isSpreadsheetError = (v?: string) => /^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test((v ?? "").trim());
      const hasErrorPlaceholder = cachedData?.data?.days?.some((d) =>
        isSpreadsheetError(d.soup?.de) || isSpreadsheetError(d.soup?.en) ||
        isSpreadsheetError(d.green?.de) || isSpreadsheetError(d.green?.en) ||
        isSpreadsheetError(d.blue?.de) || isSpreadsheetError(d.blue?.en)
      );

      if (!hasErrorPlaceholder && Date.now() - cachedData.timestamp < CACHE_DURATION) {
        if (isDev) console.log('📦 Using cached menu data');
        return cachedData.data;
      }
    } catch (e) {
      // Invalid cache, proceed with fetch
    }
  }
  
  try {
    if (isDev) console.log('🌐 Calling edge function...');
    
    const { data, error } = await supabase.functions.invoke('get-daily-menu');
    
    if (error) {
      console.error('Edge function error:', error);
      throw new Error('EDGE_FUNCTION_ERROR');
    }
    
    if (!data?.success || !data?.data) {
      console.error('Invalid response from edge function:', data);
      throw new Error('NO_MENU_DATA');
    }
    
    const menuData: WeeklyMenu = data.data;
    if (isDev) console.log('✅ Menu loaded successfully, days:', menuData.days.length);

    // Cache the data locally
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: menuData,
      timestamp: Date.now()
    }));
    
    return menuData;
  } catch (error) {
    console.error('Failed to load menu from edge function:', error);
    
    // Try to use stale cache as fallback
    const staleCache = localStorage.getItem(CACHE_KEY);
    if (staleCache) {
      try {
        const cachedData: CachedMenu = JSON.parse(staleCache);
        if (isDev) console.log('⚠️ Using stale cache as fallback');
        return cachedData.data;
      } catch (e) {
        // Cache parsing failed
      }
    }
    
    throw error;
  }
}

export function clearMenuCache() {
  localStorage.removeItem(CACHE_KEY);
}
