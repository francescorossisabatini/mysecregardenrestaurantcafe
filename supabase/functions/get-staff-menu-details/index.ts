import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type SheetField = { label: string; value: string };

type KuechenplanRecord = {
  id: string;
  snapshotId: string;
  title: string;
  category?: string;
  menuDay?: string;
  description?: string;
  ingredients: string[];
  allergens: string[];
  notes: string[];
  sourceSheet: string;
  snapshotPeriod?: string;
  isCurrent: boolean;
  fields: SheetField[];
};

type ParsedRecord = Omit<KuechenplanRecord, "id" | "snapshotId" | "isCurrent" | "snapshotPeriod"> & {
  rowIndex: number;
  searchText: string;
};

const clean = (value: unknown, max = 800) => {
  const text = typeof value === "string" ? value : value == null ? "" : String(value);
  const cleaned = text.replace(/<[^>]*>/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim().slice(0, max);
  if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(cleaned)) return "";
  return cleaned;
};

const splitList = (value: string) => value.split(/[;,|\n]+/).map((item) => clean(item, 140)).filter(Boolean).slice(0, 60);

const headerKind = (label: string) => {
  const h = label.toLowerCase();
  if (/(tag|day|wochentag|datum|date)/.test(h)) return "day";
  if (/(name|dish|gericht|speise|kuchen|cake|titel|title|produkt|product|menu)/.test(h)) return "title";
  if (/(kategorie|category|gruppe|section|bereich|type|typ)/.test(h)) return "category";
  if (/(beschreibung|description|desc|text)/.test(h)) return "description";
  if (/(ingredient|zutat|zutaten|inhalt|content|bestandteil|rezept|recipe)/.test(h)) return "ingredients";
  if (/(allergen|allergene|allergy)/.test(h)) return "allergens";
  if (/(note|notiz|hinweis|info|bemerkung|comment)/.test(h)) return "notes";
  return "field";
};

const stableStringify = (rows: string[][]) => JSON.stringify(rows.map((row) => row.map((cell) => clean(cell, 1200))));

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

function parseGviz(text: string): string[][] {
  const jsonText = text.substring(47).slice(0, -2);
  const json = JSON.parse(jsonText) as { table?: { rows?: Array<{ c?: Array<{ v?: unknown }> }> } };
  return (json.table?.rows ?? []).map((row) => (row.c ?? []).map((cell) => clean(cell?.v, 1600)));
}

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

function looksLikeHeader(row: string[]) {
  const labels = row.map((cell) => clean(cell, 80)).filter(Boolean);
  if (labels.length < 2) return false;
  const recognized = labels.filter((label) => headerKind(label) !== "field").length;
  return recognized >= 1;
}

function findPeriod(rows: string[][]) {
  for (const row of rows.slice(0, 8)) {
    const joined = row.map((cell) => clean(cell, 120)).filter(Boolean).join(" ");
    if (/(week|woche|periode|period|date of monday|montag)/i.test(joined)) return joined;
  }
  return undefined;
}

function rowsToRecords(rows: string[][], sourceSheet: string): ParsedRecord[] {
  const headerIndex = rows.findIndex(looksLikeHeader);
  if (headerIndex < 0) return [];

  const headers = rows[headerIndex].map((value, index) => clean(value || `Column ${index + 1}`, 100));
  const body = rows.slice(headerIndex + 1).filter((row) => row.some((cell) => clean(cell)));

  return body.map((row, bodyIndex) => {
    const fields = headers
      .map((label, index) => ({ label, value: clean(row[index], 1600) }))
      .filter((field) => field.value);

    let title = "";
    let category = "";
    let menuDay = "";
    let description = "";
    const ingredients: string[] = [];
    const allergens: string[] = [];
    const notes: string[] = [];

    for (const field of fields) {
      const kind = headerKind(field.label);
      if (kind === "title" && !title) title = field.value;
      if (kind === "category" && !category) category = field.value;
      if (kind === "day" && !menuDay) menuDay = field.value;
      if (kind === "description" && !description) description = field.value;
      if (kind === "ingredients") ingredients.push(...splitList(field.value));
      if (kind === "allergens") allergens.push(...splitList(field.value));
      if (kind === "notes") notes.push(field.value);
    }

    if (!title) title = fields.find((field) => field.value.length > 2)?.value || `Item ${bodyIndex + 1}`;
    if (!category) category = sourceSheet;

    const allText = [title, category, menuDay, description, ...ingredients, ...allergens, ...notes, ...fields.map((field) => field.value)].filter(Boolean).join(" ");

    return {
      rowIndex: headerIndex + bodyIndex + 2,
      title,
      category: category || undefined,
      menuDay: menuDay || undefined,
      description: description || undefined,
      ingredients: [...new Set(ingredients)],
      allergens: [...new Set(allergens)],
      notes: [...new Set(notes)],
      sourceSheet,
      fields,
      searchText: clean(allText, 5000),
    };
  });
}

async function ensureSnapshot(admin: ReturnType<typeof createClient>, rows: string[][], records: ParsedRecord[], sheetName: string) {
  const sourceHash = await sha256(stableStringify(rows));
  const period = findPeriod(rows);

  const { data: existing, error: existingError } = await admin
    .from("kuechenplan_snapshots")
    .select("id, period, is_current")
    .eq("source_hash", sourceHash)
    .maybeSingle();

  if (existingError) throw existingError;

  if (existing?.id) {
    if (!existing.is_current) {
      await admin.from("kuechenplan_snapshots").update({ is_current: false, archived_at: new Date().toISOString() }).eq("is_current", true);
      await admin.from("kuechenplan_snapshots").update({ is_current: true, archived_at: null }).eq("id", existing.id);
    }
    return { id: existing.id as string, period: (existing.period as string | null) || period };
  }

  await admin.from("kuechenplan_snapshots").update({ is_current: false, archived_at: new Date().toISOString() }).eq("is_current", true);

  const { data: snapshot, error: snapshotError } = await admin
    .from("kuechenplan_snapshots")
    .insert({ source_hash: sourceHash, sheet_name: sheetName, period, is_current: true })
    .select("id, period")
    .single();

  if (snapshotError) throw snapshotError;

  if (records.length) {
    const rowsToInsert = records.map((record) => ({
      snapshot_id: snapshot.id,
      row_index: record.rowIndex,
      title: record.title,
      category: record.category ?? null,
      menu_day: record.menuDay ?? null,
      description: record.description ?? null,
      ingredients: record.ingredients,
      allergens: record.allergens,
      notes: record.notes,
      fields: record.fields,
      search_text: record.searchText,
    }));
    const { error: itemsError } = await admin.from("kuechenplan_items").insert(rowsToInsert);
    if (itemsError) throw itemsError;
  }

  return { id: snapshot.id as string, period: (snapshot.period as string | null) || period };
}

async function loadRecords(admin: ReturnType<typeof createClient>): Promise<KuechenplanRecord[]> {
  const { data, error } = await admin
    .from("kuechenplan_items")
    .select("id, snapshot_id, title, category, menu_day, description, ingredients, allergens, notes, fields, kuechenplan_snapshots!inner(sheet_name, period, is_current, created_at)")
    .order("created_at", { referencedTable: "kuechenplan_snapshots", ascending: false })
    .order("row_index", { ascending: true })
    .limit(1200);

  if (error) throw error;

  return (data ?? []).map((item: any) => ({
    id: item.id,
    snapshotId: item.snapshot_id,
    title: item.title,
    category: item.category ?? undefined,
    menuDay: item.menu_day ?? undefined,
    description: item.description ?? undefined,
    ingredients: item.ingredients ?? [],
    allergens: item.allergens ?? [],
    notes: item.notes ?? [],
    sourceSheet: item.kuechenplan_snapshots?.sheet_name ?? "Küchenplan",
    snapshotPeriod: item.kuechenplan_snapshots?.period ?? undefined,
    isCurrent: Boolean(item.kuechenplan_snapshots?.is_current),
    fields: item.fields ?? [],
  }));
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

  const sheetNames = ["Küchenplan", "Kuchenplan", "kuechenplan", "KUECHENPLAN"];
  let imported = false;
  let sheetNameUsed = "Küchenplan";
  let importError = "";

  for (const sheetName of sheetNames) {
    try {
      const rows = await fetchSheetRows(sheetId, sheetName);
      const records = rowsToRecords(rows, sheetName);
      if (!records.length) throw new Error("No usable rows found");
      await ensureSnapshot(admin, rows, records, sheetName);
      imported = true;
      sheetNameUsed = sheetName;
      break;
    } catch (error) {
      importError = error instanceof Error ? error.message : "Unknown import error";
      console.warn(`Unable to import ${sheetName}`, error);
    }
  }

  const allRecords = await loadRecords(admin);
  const currentRecords = allRecords.filter((record) => record.isCurrent);
  const archivedRecords = allRecords.filter((record) => !record.isCurrent);
  const currentPeriod = currentRecords[0]?.snapshotPeriod;

  return new Response(
    JSON.stringify({
      success: imported || allRecords.length > 0,
      data: { sheetName: sheetNameUsed, currentPeriod, currentRecords, archivedRecords, allRecords },
      warning: imported ? undefined : importError || "Küchenplan sheet not found",
    }),
    { status: imported || allRecords.length > 0 ? 200 : 404, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
