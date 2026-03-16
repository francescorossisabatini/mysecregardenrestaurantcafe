import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

// Allowed origins for CORS - restrict to known domains
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:8080",
  "http://localhost:3000",
  "https://lovable.dev",
  "https://www.secretgardenrestaurant.at",
  "https://secretgardenrestaurant.at",
];

function isOriginAllowed(origin: string | null): boolean {
  if (!origin) return true; // server-to-server requests without Origin
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  // ✅ Stricter check: use URL parsing + endsWith to block tricks like evil.lovable.app.evil.com
  try {
    const { hostname } = new URL(origin);
    if (hostname.endsWith(".lovable.app")) return true;
    if (hostname.endsWith(".lovable.dev")) return true;
    if (hostname.endsWith(".lovableproject.com")) return true;
  } catch {
    return false;
  }

  return false;
}

// Rate limiter with cleanup to prevent memory leaks
const rateLimitMap = new Map<string, { count: number; resetTime: number; lastSeen: number }>();
const RATE_LIMIT_WINDOW_MS = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 60;

// ✅ Anti-leak: periodic cleanup and map cap
let lastRateCleanup = 0;
const RATE_CLEANUP_INTERVAL = 10 * 60 * 1000; // every 10 min
const RATE_ENTRY_TTL = 2 * RATE_LIMIT_WINDOW_MS; // TTL after window
const RATE_MAP_MAX = 5000; // hard cap

function getClientIP(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real.trim();
  return "unknown";
}

function cleanupRateLimitMap(now: number) {
  if (now - lastRateCleanup < RATE_CLEANUP_INTERVAL) return;
  lastRateCleanup = now;

  // Remove old entries
  for (const [ip, data] of rateLimitMap.entries()) {
    if (now > data.resetTime + RATE_ENTRY_TTL || now - data.lastSeen > RATE_ENTRY_TTL) {
      rateLimitMap.delete(ip);
    }
  }

  // Cap: if exceeded, remove oldest (by lastSeen)
  if (rateLimitMap.size > RATE_MAP_MAX) {
    const entries = [...rateLimitMap.entries()].sort((a, b) => a[1].lastSeen - b[1].lastSeen);
    const toDrop = entries.length - RATE_MAP_MAX;
    for (let i = 0; i < toDrop; i++) rateLimitMap.delete(entries[i][0]);
  }
}

function checkRateLimit(clientIP: string): boolean {
  const now = Date.now();
  cleanupRateLimitMap(now);
  
  const clientData = rateLimitMap.get(clientIP);
  
  if (!clientData || now > clientData.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS, lastSeen: now });
    return true;
  }
  
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  
  clientData.count++;
  clientData.lastSeen = now;
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
const CACHE_DURATION = 15 * 60 * 1000; // 15 minutes

// Sanitize string content - remove potential HTML/script tags and enforce length limits
function sanitizeText(text: unknown, maxLength: number = 500): string {
  if (typeof text !== "string") return "";
  const cleaned = text
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .replace(/javascript:/gi, "") // Remove javascript: protocol
    .replace(/on\w+=/gi, "") // Remove event handlers
    .trim()
    .substring(0, maxLength);

  // Treat spreadsheet error placeholders as empty
  if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(cleaned)) return "";

  return cleaned;
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

// Parse a CSV line handling quoted fields
function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"' && line[i + 1] === '"') { current += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { current += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { result.push(current.trim()); current = ''; }
      else { current += ch; }
    }
  }
  result.push(current.trim());
  return result;
}

// Build period string from a date like "16/3/2026" -> "16. – 21. März 2026"
function buildPeriodFromDate(dateStr: string): string {
  const parts = dateStr.replace(/"/g, '').trim().split('/');
  if (parts.length < 3) return dateStr;
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);
  if (isNaN(day) || isNaN(month) || isNaN(year)) return dateStr;
  
  const monthNames: Record<number, string> = {
    1: 'Jänner', 2: 'Februar', 3: 'März', 4: 'April',
    5: 'Mai', 6: 'Juni', 7: 'Juli', 8: 'August',
    9: 'September', 10: 'Oktober', 11: 'November', 12: 'Dezember',
  };
  
  // Monday to Saturday = +5 days
  const endDay = day + 5;
  return `${day}. – ${endDay}. ${monthNames[month] || month} ${year}`;
}

serve(async (req) => {
  const origin = req.headers.get("origin");
  
  // ✅ Reject disallowed origins
  if (!isOriginAllowed(origin)) {
    console.warn("Origin not allowed:", origin);
    return new Response(
      JSON.stringify({ error: "Origin not allowed" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const corsHeaders = {
    "Access-Control-Allow-Origin": origin ?? "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
  };

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
    let sheetId = Deno.env.get('GOOGLE_SHEET_ID') || '';
    
    // Extract sheet ID from full URL if needed
    const urlMatch = sheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
    if (urlMatch) {
      sheetId = urlMatch[1];
    }
    // Also strip any query params
    sheetId = sheetId.split('?')[0].split('/')[0].trim();
    
    console.log('Using sheet ID:', sheetId);
    
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
    // Try gviz first, then CSV export as fallback
    const gvizUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=web`;
    const csvUrl = `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&sheet=web`;
    
    console.log('Trying gviz URL:', gvizUrl);
    
    const fetchHeaders = {
      'User-Agent': 'Mozilla/5.0 (compatible; MenuBot/1.0)',
      'Accept': 'application/json, text/plain, */*',
    };
    
    let response = await fetch(gvizUrl, { headers: fetchHeaders });
    let useCSV = false;
    
    if (!response.ok) {
      console.warn(`gviz failed (${response.status}), trying CSV export...`);
      response = await fetch(csvUrl, { headers: fetchHeaders });
      useCSV = true;
    }
    
    if (!response.ok) {
      console.error(`Failed to fetch sheet: ${response.status}`);
      throw new Error(`Failed to fetch sheet: ${response.status}`);
    }
    
    const text = await response.text();
    console.log('Response length:', text.length, 'useCSV:', useCSV);
    
    let period = '';
    const days: MenuDay[] = [];

    if (useCSV) {
      // Parse CSV format
      const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
      
      // Map day abbreviations to full names
      const dayMap: Record<string, { de: string; en: string }> = {
        'mon': { de: 'Montag', en: 'Monday' },
        'tue': { de: 'Dienstag', en: 'Tuesday' },
        'wed': { de: 'Mittwoch', en: 'Wednesday' },
        'thu': { de: 'Donnerstag', en: 'Thursday' },
        'fri': { de: 'Freitag', en: 'Friday' },
        'sat': { de: 'Samstag', en: 'Saturday' },
      };

      for (const line of lines) {
        // Simple CSV parse (handle quoted fields)
        const cells = parseCSVLine(line);
        
        // Detect period row: "Date of Monday:" in first cell
        if (cells[0]?.toLowerCase().includes('date of monday') && cells[1]) {
          // Convert date to period string
          const dateStr = cells[1].trim();
          period = buildPeriodFromDate(dateStr);
          console.log('Period from CSV:', period);
          continue;
        }
        
        // Skip header-like rows
        if (cells[0]?.toLowerCase().includes('soup id') || cells[0]?.toLowerCase().includes('green id')) continue;
        
        // Day rows: column B has day abbreviation (mon, tue, etc.)
        const dayAbbr = cells[1]?.trim().toLowerCase();
        if (dayAbbr && dayMap[dayAbbr]) {
          const dayData: MenuDay = {
            day: dayMap[dayAbbr],
            soup: { de: sanitizeText(cells[2], 500), en: sanitizeText(cells[2], 500) },
            green: { de: sanitizeText(cells[3], 1000), en: sanitizeText(cells[3], 1000) },
            blue: { de: sanitizeText(cells[4], 1000), en: sanitizeText(cells[4], 1000) },
          };
          days.push(dayData);
        }
      }
    } else {
      // Parse gviz JSON format
      if (!text || text.length < 50 || !text.includes('google.visualization.Query.setResponse')) {
        console.error('Invalid Google Sheets response format');
        throw new Error('Invalid response format from Google Sheets');
      }
      
      let json: unknown;
      try {
        const jsonText = text.substring(47).slice(0, -2);
        json = JSON.parse(jsonText);
      } catch (parseError) {
        console.error('JSON parsing failed:', parseError);
        throw new Error('Failed to parse menu data');
      }
      
      if (!json || typeof json !== 'object') throw new Error('Invalid JSON structure');
      const jsonObj = json as Record<string, unknown>;
      if (!jsonObj.table || typeof jsonObj.table !== 'object') throw new Error('Missing table in response');
      const table = jsonObj.table as Record<string, unknown>;
      if (!Array.isArray(table.rows)) throw new Error('Missing or invalid rows in response');
      
      console.log('Sheet data received, parsing rows...');
      
      const rows = table.rows as Array<{ c?: Array<{ v?: unknown }> }>;
      
      // Map day abbreviations for gviz format too
      const dayMap: Record<string, { de: string; en: string }> = {
        'mon': { de: 'Montag', en: 'Monday' },
        'tue': { de: 'Dienstag', en: 'Tuesday' },
        'wed': { de: 'Mittwoch', en: 'Wednesday' },
        'thu': { de: 'Donnerstag', en: 'Thursday' },
        'fri': { de: 'Freitag', en: 'Friday' },
        'sat': { de: 'Samstag', en: 'Saturday' },
      };

      for (const rowObj of rows) {
        const row = rowObj?.c;
        if (!row || !Array.isArray(row)) continue;

        const c0 = typeof row[0]?.v === 'string' ? row[0].v.trim() : '';
        const c1 = typeof row[1]?.v === 'string' ? row[1].v.trim() : '';
        const c2 = typeof row[2]?.v === 'string' ? row[2].v.trim() : '';

        // Detect period: "Date of Monday:" row
        if (c0.toLowerCase().includes('date of monday') && c1) {
          period = buildPeriodFromDate(c1);
          console.log('Period detected:', period);
          continue;
        }

        // Old format: period row (first row with only first cell filled)
        if (!period && c0 && !c1 && !c2) {
          period = sanitizeText(c0, 100);
          console.log('Period detected (legacy):', period);
          continue;
        }

        // Skip header rows
        if (c0 === 'Giorno DE' || c1 === 'Giorno EN' || c2 === 'Zuppa DE') continue;
        if (c2.toLowerCase().includes('soup id') || c2.toLowerCase().includes('green id')) continue;

        // New format: day abbreviation in column B
        const dayAbbr = c1.toLowerCase();
        if (dayAbbr && dayMap[dayAbbr]) {
          const dayData: MenuDay = {
            day: dayMap[dayAbbr],
            soup: { de: sanitizeText(c2, 500), en: sanitizeText(c2, 500) },
            green: { de: sanitizeText(row[3]?.v, 1000), en: sanitizeText(row[3]?.v, 1000) },
            blue: { de: sanitizeText(row[4]?.v, 1000), en: sanitizeText(row[4]?.v, 1000) },
          };
          days.push(dayData);
          continue;
        }

        // Old format: both day columns filled (8-column bilingual)
        if (c0 && c1 && !dayMap[dayAbbr]) {
          const dayData: MenuDay = {
            day: { de: sanitizeText(c0, 50), en: sanitizeText(c1, 50) },
            soup: { de: sanitizeText(c2, 500), en: sanitizeText(row[3]?.v, 500) },
            green: { de: sanitizeText(row[4]?.v, 1000), en: sanitizeText(row[5]?.v, 1000) },
            blue: { de: sanitizeText(row[6]?.v, 1000), en: sanitizeText(row[7]?.v, 1000) },
          };
          days.push(dayData);
        }
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
