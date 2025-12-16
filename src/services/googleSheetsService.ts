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
const CACHE_DURATION = 30 * 1000; // 30 seconds
const isDev = import.meta.env.DEV;

interface CachedMenu {
  data: WeeklyMenu;
  timestamp: number;
}

export async function fetchMenuFromSheets(sheetId: string): Promise<WeeklyMenu> {
  if (isDev) console.log('📊 Caricamento da Google Sheets');
  
  // Clear cache to ensure fresh data
  clearMenuCache();
  
  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Menu`;
    if (isDev) console.log('🌐 Fetching menu data...');
    const response = await fetch(url);
    if (isDev) console.log('📥 Response status:', response.status);
    const text = await response.text();
    
    // Parse Google Sheets JSON response (it's wrapped in a function call)
    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    
    const rows = json.table.rows;
    
    let period = '';
    const days: MenuDay[] = [];

    for (const rowObj of rows) {
      const row = rowObj?.c;
      if (!row) continue;

      const c0 = row[0]?.v as string | undefined;
      const c1 = row[1]?.v as string | undefined;
      const c2 = row[2]?.v as string | undefined;

      // Detect period: first row with only first cell filled
      if (!period && c0 && !c1 && !c2) {
        period = c0;
        if (isDev) console.log('📅 Period detected:', period);
        continue;
      }

      // Skip header row (e.g. "Giorno DE", "Giorno EN", ...)
      if (c0 === 'Giorno DE' || c1 === 'Giorno EN' || c2 === 'Zuppa DE') {
        continue;
      }

      // Data rows: both day columns filled
      if (c0 && c1) {
        const dayData: MenuDay = {
          day: {
            de: c0 || '',
            en: c1 || '',
          },
          soup: {
            de: c2 || '',
            en: (row[3]?.v as string) || '',
          },
          green: {
            de: (row[4]?.v as string) || '',
            en: (row[5]?.v as string) || '',
          },
          blue: {
            de: (row[6]?.v as string) || '',
            en: (row[7]?.v as string) || '',
          },
        };

        days.push(dayData);
      }
    }
    
    if (!period || days.length === 0) {
      if (isDev) console.warn('⚠️ No valid menu data found, using fallback');
      throw new Error('NO_MENU_DATA');
    }
    
    const menuData: WeeklyMenu = { period, days };
    if (isDev) console.log('✅ Menu loaded successfully, days:', days.length);

    // Cache the data
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: menuData,
      timestamp: Date.now()
    }));
    
    return menuData;
  } catch (error) {
    console.error('Failed to load menu from Google Sheets');
    throw error;
  }
}

export function clearMenuCache() {
  localStorage.removeItem(CACHE_KEY);
}
