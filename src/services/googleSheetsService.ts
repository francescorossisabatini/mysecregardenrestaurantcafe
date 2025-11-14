interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
  blue: { de: string; en: string };
  blueNote?: { de: string; en: string };
}

interface WeeklyMenu {
  period: string;
  days: MenuDay[];
}

const CACHE_KEY = 'weekly_menu_cache';
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

interface CachedMenu {
  data: WeeklyMenu;
  timestamp: number;
}

export async function fetchMenuFromSheets(sheetId: string): Promise<WeeklyMenu> {
  // Check cache first
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    const { data, timestamp }: CachedMenu = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }

  try {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Menu`;
    const response = await fetch(url);
    const text = await response.text();
    
    // Parse Google Sheets JSON response (it's wrapped in a function call)
    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    
    const rows = json.table.rows;
    
    // First row contains the period
    const period = rows[0]?.c?.[0]?.v || '';
    
    // Parse menu days (skip first 2 rows: period and headers)
    const days: MenuDay[] = [];
    for (let i = 2; i < rows.length; i++) {
      const row = rows[i]?.c;
      if (!row || !row[0]?.v) continue; // Skip empty rows
      
      days.push({
        day: { 
          de: row[0]?.v || '', 
          en: row[1]?.v || '' 
        },
        soup: { 
          de: row[2]?.v || '', 
          en: row[3]?.v || '' 
        },
        green: { 
          de: row[4]?.v || '', 
          en: row[5]?.v || '' 
        },
        blue: { 
          de: row[6]?.v || '', 
          en: row[7]?.v || '' 
        },
        blueNote: row[8]?.v || row[9]?.v ? {
          de: row[8]?.v || '',
          en: row[9]?.v || ''
        } : undefined
      });
    }
    
    const menuData: WeeklyMenu = { period, days };
    
    // Cache the data
    localStorage.setItem(CACHE_KEY, JSON.stringify({
      data: menuData,
      timestamp: Date.now()
    }));
    
    return menuData;
  } catch (error) {
    console.error('Error fetching menu from Google Sheets:', error);
    throw error;
  }
}

export function clearMenuCache() {
  localStorage.removeItem(CACHE_KEY);
}
