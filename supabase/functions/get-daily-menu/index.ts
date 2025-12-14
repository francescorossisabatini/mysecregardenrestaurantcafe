import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface MenuItem {
  name: string;
  description: string;
  price: string;
  tags: string[];
}

interface DailyMenuResponse {
  success: boolean;
  date: string;
  items: MenuItem[];
  error?: string;
}

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
          error: 'Menu configuration not available',
          date: new Date().toISOString().split('T')[0],
          items: []
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Fetching daily menu from Google Sheets...');
    
    // Fetch from Google Sheets using the public visualization API
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=DailyMenu`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Parse Google Sheets JSON response (wrapped in a function call)
    const jsonText = text.substring(47).slice(0, -2);
    const json = JSON.parse(jsonText);
    
    console.log('Sheet data received, parsing rows...');
    
    const rows = json.table.rows;
    const items: MenuItem[] = [];
    
    // Skip header row, parse data rows
    // Expected columns: Name DE, Name EN, Description DE, Description EN, Price, Tags
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i]?.c;
      if (!row) continue;
      
      const nameDe = row[0]?.v as string || '';
      const nameEn = row[1]?.v as string || '';
      const descDe = row[2]?.v as string || '';
      const descEn = row[3]?.v as string || '';
      const price = row[4]?.v as string || '';
      const tagsRaw = row[5]?.v as string || '';
      
      // Skip empty rows
      if (!nameDe && !nameEn) continue;
      
      // Parse tags (comma-separated)
      const tags = tagsRaw
        .split(',')
        .map(t => t.trim().toLowerCase())
        .filter(t => t.length > 0);
      
      items.push({
        name: nameDe || nameEn,
        description: descDe || descEn,
        price: price,
        tags: tags
      });
    }
    
    console.log(`Parsed ${items.length} menu items`);
    
    const result: DailyMenuResponse = {
      success: true,
      date: new Date().toISOString().split('T')[0],
      items
    };
    
    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error fetching daily menu:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Failed to load menu',
        date: new Date().toISOString().split('T')[0],
        items: []
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
