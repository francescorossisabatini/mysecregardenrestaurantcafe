import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - restrict to known domains
const ALLOWED_ORIGINS = [
  'https://secret-garden-zurich.lovable.app',
  'https://www.secret-garden-zurich.lovable.app',
  'http://localhost:8080',
  'http://localhost:5173',
  'http://localhost:3000',
];

function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = origin && ALLOWED_ORIGINS.some(allowed => 
    origin === allowed || origin.endsWith('.lovable.app')
  ) ? origin : ALLOWED_ORIGINS[0];
  
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  };
}

// Simple in-memory rate limiter
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

function getClientIP(req: Request): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
         req.headers.get('x-real-ip') || 
         'unknown';
}

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  const clientData = rateLimitMap.get(clientIP);
  
  // Clean up old entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [ip, data] of rateLimitMap.entries()) {
      if (now > data.resetTime) {
        rateLimitMap.delete(ip);
      }
    }
  }
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  clientData.count++;
  return true;
}

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
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes (increased for better protection)

// Sanitize string content - remove potential HTML/script tags and enforce length limits
function sanitizeText(text: unknown, maxLength: number = 500): string {
  if (typeof text !== 'string') return '';
  return text
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, maxLength);
}

// Validate menu day structure
function validateMenuDay(day: unknown): MenuDay | null {
  if (!day || typeof day !== 'object') return null;
  
  const d = day as Record<string, unknown>;
  
  return {
    day: {
      de: sanitizeText(d.dayDe, 50),
      en: sanitizeText(d.dayEn, 50),
    },
    soup: {
      de: sanitizeText(d.soupDe, 500),
      en: sanitizeText(d.soupEn, 500),
    },
    green: {
      de: sanitizeText(d.greenDe, 1000),
      en: sanitizeText(d.greenEn, 1000),
    },
    blue: {
      de: sanitizeText(d.blueDe, 1000),
      en: sanitizeText(d.blueEn, 1000),
    },
  };
}

// Validate entire menu structure
function validateWeeklyMenu(menu: unknown): WeeklyMenu | null {
  if (!menu || typeof menu !== 'object') return null;
  
  const m = menu as Record<string, unknown>;
  
  if (typeof m.period !== 'string' || !Array.isArray(m.days)) {
    return null;
  }
  
  if (m.days.length === 0 || m.days.length > 14) {
    return null;
  }
  
  return {
    period: sanitizeText(m.period, 100),
    days: m.days as MenuDay[],
  };
}

serve(async (req) => {
  const origin = req.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting check
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP)) {
    console.warn('Rate limit exceeded for:', clientIP);
    return new Response(
      JSON.stringify({ success: false, error: 'Too many requests' }),
      { 
        status: 429, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  // Log request for monitoring
  console.log('Menu request from:', origin || 'unknown origin', 'IP:', clientIP);

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
    const url = `https://docs.google.com/spreadsheets/d/${encodeURIComponent(sheetId)}/gviz/tq?tqx=out:json&sheet=Menu`;
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch sheet: ${response.status}`);
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }
    
    const text = await response.text();
    
    // Validate response format before parsing
    if (!text || text.length < 50 || !text.includes('google.visualization.Query.setResponse')) {
      console.error('Invalid Google Sheets response format');
      throw new Error('Invalid response format from Google Sheets');
    }
    
    // Parse Google Sheets JSON response (wrapped in a function call)
    let json: unknown;
    try {
      const jsonText = text.substring(47).slice(0, -2);
      json = JSON.parse(jsonText);
    } catch (parseError) {
      console.error('JSON parsing failed:', parseError);
      throw new Error('Failed to parse menu data');
    }
    
    // Validate JSON structure
    if (!json || typeof json !== 'object') {
      throw new Error('Invalid JSON structure');
    }
    
    const jsonObj = json as Record<string, unknown>;
    if (!jsonObj.table || typeof jsonObj.table !== 'object') {
      throw new Error('Missing table in response');
    }
    
    const table = jsonObj.table as Record<string, unknown>;
    if (!Array.isArray(table.rows)) {
      throw new Error('Missing or invalid rows in response');
    }
    
    console.log('Sheet data received, parsing rows...');
    
    const rows = table.rows as Array<{ c?: Array<{ v?: unknown }> }>;
    let period = '';
    const days: MenuDay[] = [];

    for (const rowObj of rows) {
      const row = rowObj?.c;
      if (!row || !Array.isArray(row)) continue;

      const c0 = row[0]?.v;
      const c1 = row[1]?.v;
      const c2 = row[2]?.v;

      // Detect period: first row with only first cell filled
      if (!period && c0 && !c1 && !c2) {
        period = sanitizeText(c0, 100);
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
            de: sanitizeText(c0, 50),
            en: sanitizeText(c1, 50),
          },
          soup: {
            de: sanitizeText(c2, 500),
            en: sanitizeText(row[3]?.v, 500),
          },
          green: {
            de: sanitizeText(row[4]?.v, 1000),
            en: sanitizeText(row[5]?.v, 1000),
          },
          blue: {
            de: sanitizeText(row[6]?.v, 1000),
            en: sanitizeText(row[7]?.v, 1000),
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
    
    // Validate final menu structure
    const menuData: WeeklyMenu = { period, days };
    const validatedMenu = validateWeeklyMenu(menuData);
    
    if (!validatedMenu) {
      console.error('Menu validation failed');
      throw new Error('Menu data validation failed');
    }
    
    console.log(`Parsed and validated menu with ${validatedMenu.days.length} days`);
    
    // Update cache
    cachedMenu = { data: validatedMenu, timestamp: Date.now() };
    
    return new Response(
      JSON.stringify({ success: true, data: validatedMenu } as WeeklyMenuResponse),
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
