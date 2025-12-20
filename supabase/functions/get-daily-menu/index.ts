import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

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

interface WeeklyMenuResponse {
  success: boolean;
  data?: WeeklyMenu;
  error?: string;
}

// Simple in-memory cache for edge function
let cachedMenu: { data: WeeklyMenu; timestamp: number } | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const sheetId = Deno.env.get('GOOGLE_SHEET_ID');
    
    if (!sheetId) {
      console.error('GOOGLE_SHEET_ID not configured');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'Menu configuration not available'
        } as WeeklyMenuResponse),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check cache first
    if (cachedMenu && (Date.now() - cachedMenu.timestamp) < CACHE_DURATION) {
      console.log('Returning cached menu data');
      return new Response(
        JSON.stringify({ success: true, data: cachedMenu.data } as WeeklyMenuResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Fetching weekly menu from Google Sheets...');
    
    // Fetch from Google Sheets using the public visualization API
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=Menu`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch sheet: ${response.status}`);
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Parse Google Sheets JSON response (wrapped in a function call)
    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    
    console.log('Sheet data received, parsing rows...');
    
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
        console.log('Period detected:', period);
        continue;
      }

      // Skip header row
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
      console.warn('No valid menu data found');
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: 'No menu data available'
        } as WeeklyMenuResponse),
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    const menuData: WeeklyMenu = { period, days };
    console.log(`Parsed menu with ${days.length} days`);
    
    // Update cache
    cachedMenu = { data: menuData, timestamp: Date.now() };
    
    return new Response(
      JSON.stringify({ success: true, data: menuData } as WeeklyMenuResponse),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error fetching weekly menu:', error);
    
    // Return cached data if available, even if stale
    if (cachedMenu) {
      console.log('Returning stale cached data due to error');
      return new Response(
        JSON.stringify({ success: true, data: cachedMenu.data } as WeeklyMenuResponse),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to load menu'
      } as WeeklyMenuResponse),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
