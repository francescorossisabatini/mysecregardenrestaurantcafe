import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type StaffMenuRecord = {
  id: string;
  title: string;
  category?: string;
  description?: string;
  ingredients: string[];
  allergens: string[];
  notes: string[];
  sourceSheet: string;
  fields: Array<{ label: string; value: string }>;
};

const clean = (value: unknown, max = 500) =>
  typeof value === "string"
    ? value.replace(/<[^>]*>/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim().slice(0, max)
    : value == null
      ? ""
      : String(value).trim().slice(0, max);

const splitList = (value: string) =>
  value.split(/[;,|\n]+/).map((item) => clean(item, 120)).filter(Boolean).slice(0, 40);

const headerKind = (label: string) => {
  const h = label.toLowerCase();
  if (/(name|dish|gericht|speise|kuchen|cake|titel|title|produkt|product)/.test(h)) return "title";
  if (/(kategorie|category|gruppe|type|typ)/.test(h)) return "category";
  if (/(beschreibung|description|desc)/.test(h)) return "description";
  if (/(ingredient|zutat|zutaten|inhalt|content|bestandteil)/.test(h)) return "ingredients";
  if (/(allergen|allergene|allergy)/.test(h)) return "allergens";
  if (/(note|notiz|hinweis|info|bemerkung)/.test(h)) return "notes";
  return "field";
};

const parseGviz = (text: string): string[][] => {
  const jsonText = text.substring(47).slice(0, -2);
  const json = JSON.parse(jsonText) as { table?: { rows?: Array<{ c?: Array<{ v?: unknown }> }> } };
  return (json.table?.rows ?? []).map((row) => (row.c ?? []).map((cell) => clean(cell?.v, 1200)));
};

async function fetchSheetRows(sheetId: string, sheetName: string): Promise<string[][]> {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; StaffMenuBot/1.0)",
      Accept: "application/json, text/plain, */*",
    },
  });
  if (!response.ok) throw new Error(`Sheet fetch failed ${response.status}`);
  const text = await response.text();
  if (!text.includes("google.visualization.Query.setResponse")) throw new Error("Invalid sheet response");
  return parseGviz(text);
}

function rowsToRecords(rows: string[][], sourceSheet: string): StaffMenuRecord[] {
  const headerIndex = rows.findIndex((row) => row.filter(Boolean).length >= 2);
  if (headerIndex < 0) return [];

  const headers = rows[headerIndex].map((value, index) => clean(value || `Column ${index + 1}`, 80));
  const body = rows.slice(headerIndex + 1).filter((row) => row.some(Boolean));

  return body.map((row, rowIndex) => {
    const fields = headers
      .map((label, index) => ({ label, value: clean(row[index], 1200) }))
      .filter((field) => field.value && !/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(field.value));

    let title = "";
    let category = "";
    let description = "";
    const ingredients: string[] = [];
    const allergens: string[] = [];
    const notes: string[] = [];

    for (const field of fields) {
      const kind = headerKind(field.label);
      if (kind === "title" && !title) title = field.value;
      if (kind === "category" && !category) category = field.value;
      if (kind === "description" && !description) description = field.value;
      if (kind === "ingredients") ingredients.push(...splitList(field.value));
      if (kind === "allergens") allergens.push(...splitList(field.value));
      if (kind === "notes") notes.push(field.value);
    }

    if (!title) title = fields[0]?.value || `Item ${rowIndex + 1}`;

    return {
      id: `${sourceSheet}-${rowIndex}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 80),
      title,
      category: category || undefined,
      description: description || undefined,
      ingredients: [...new Set(ingredients)],
      allergens: [...new Set(allergens)],
      notes: [...new Set(notes)],
      sourceSheet,
      fields,
    };
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  let sheetId = Deno.env.get("GOOGLE_SHEET_ID") || "";

  if (!supabaseUrl || !serviceRoleKey || !sheetId) {
    return new Response(JSON.stringify({ error: "Backend configuration missing" }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const token = (req.headers.get("Authorization") ?? "").replace("Bearer ", "").trim();
  if (!token) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const admin = createClient(supabaseUrl, serviceRoleKey, { auth: { autoRefreshToken: false, persistSession: false } });
  const { data: userData, error: userError } = await admin.auth.getUser(token);
  if (userError || !userData.user) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const { data: roles, error: roleError } = await admin.from("user_roles").select("role").eq("user_id", userData.user.id).in("role", ["admin", "staff"]);
  if (roleError || !roles?.length) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });

  const match = sheetId.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/);
  if (match) sheetId = match[1];
  sheetId = sheetId.split("?")[0].split("/")[0].trim();

  const sheetNames = ["Kuchenplan", "kuchenplan", "KUCHENPLAN"];
  for (const sheetName of sheetNames) {
    try {
      const rows = await fetchSheetRows(sheetId, sheetName);
      const records = rowsToRecords(rows, sheetName);
      return new Response(JSON.stringify({ success: true, data: { sheetName, records } }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    } catch (error) {
      console.warn(`Unable to read ${sheetName}`, error);
    }
  }

  return new Response(JSON.stringify({ success: false, error: "Kuchenplan sheet not found" }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
});