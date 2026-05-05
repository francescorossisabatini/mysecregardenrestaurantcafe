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
  menuDay?: string;
  description?: string;
  ingredients: string[];
  allergens: string[];
  notes: string[];
  sourceSheet: string;
  snapshotPeriod?: string;
  isCurrent?: boolean;
  fields: Array<{ label: string; value: string }>;
};

type MenuDish = {
  id: string;
  category: string;
  cook: string;
  headerEn: string;
  headerDe: string;
  textEn: string;
  textDe: string;
  ingredients: string[];
  prep: string[];
  badges: string[];
};

const clean = (value: unknown, max = 1200) =>
  typeof value === "string"
    ? value.replace(/<[^>]*>/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\u2212]/g, " ").trim().slice(0, max)
    : value == null
      ? ""
      : String(value).replace(/[\u002d\u2010\u2011\u2012\u2013\u2014\u2212]/g, " ").trim().slice(0, max);

const splitList = (value: string) =>
  value.split(/[;,|\n]+/).map((item) => clean(item, 160)).filter(Boolean).slice(0, 80);

const splitLines = (value: string) =>
  value.split(/\n+/).map((item) => clean(item, 240).replace(/^\d+(?:[.,]\d+)?\s*(?:kg|g|l|ml|tsp|tbsp|cup|pkg?|stk\.?|bund|bd\.?|dose[n]?|can|bag|bunch)\s+/i, "")).filter(Boolean).slice(0, 80);

const normalizeCategory = (value: string) => {
  const normalized = clean(value, 80).toLowerCase();
  if (normalized.includes("soup")) return "soup";
  if (normalized.includes("green")) return "green";
  if (normalized.includes("blue")) return "blue";
  return normalized || "seasonal";
};

const detectBadges = (...values: string[]) => {
  const text = values.join(" ").toLowerCase();
  const badges: string[] = [];
  if (/chili|chilli|jalapeño|cayenne|harissa|sriracha|scharf|pikant/.test(text)) badges.push("spicy");
  const garlicKg = text.match(/(\d+(?:\.\d+)?)\s*kg\s*(?:\w+\s+)?(?:garlic|knoblauch)/);
  const garlicPcs = text.match(/(\d+)\s*(?:pieces?|cloves?|zehen|knoblauchzehen)/);
  if (garlicKg && Number(garlicKg[1]) >= 0.3) badges.push("garlic-high");
  else if (garlicPcs && Number(garlicPcs[1]) >= 20) badges.push("garlic-high");
  else if (garlicPcs && Number(garlicPcs[1]) >= 5) badges.push("garlic-med");
  else if (/garlic|knoblauch/.test(text)) badges.push("garlic-low");
  const onionKgs = [...text.matchAll(/(\d+(?:\.\d+)?)\s*kg\s*(?:\w+\s+)?(?:onion|zwiebel)/g)];
  if (onionKgs.length) {
    const total = onionKgs.reduce((sum, match) => sum + Number(match[1]), 0);
    badges.push(total >= 3 ? "onion-high" : total >= 1 ? "onion-med" : "onion-low");
  } else if (/onion|zwiebel/.test(text)) badges.push("onion-low");
  if (/cashew|almond|mandel|walnut|walnuss|peanut|erdnuss|nut/.test(text)) badges.push("nuts");
  if (/cheese|käse|butter|cream(?! of)|parmesan|bergkäse|goat|ziegen|soyananda/.test(text)) badges.push("dairy");
  return [...new Set(badges)];
};

const headerKind = (label: string) => {
  const h = label.toLowerCase();
  if (/(tag|day|wochen|datum|date)/.test(h)) return "day";
  if (/(name|dish|gericht|speise|kuchen|cake|titel|title|produkt|product|artikel|item)/.test(h)) return "title";
  if (/(kategorie|category|gruppe|type|typ|section|bereich)/.test(h)) return "category";
  if (/(beschreibung|description|desc|details)/.test(h)) return "description";
  if (/(ingredient|zutat|zutaten|inhalt|content|bestandteil|rezept|recipe)/.test(h)) return "ingredients";
  if (/(allergen|allergene|allergy)/.test(h)) return "allergens";
  if (/(note|notiz|hinweis|info|bemerkung|vorbereitung|prep)/.test(h)) return "notes";
  return "field";
};

const dayNames = [
  "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag", "sonntag",
  "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday",
  "mo", "di", "mi", "do", "fr", "sa", "so",
  "mon", "tue", "wed", "thu", "fri", "sat", "sun",
];

const isDayLabel = (value: string) => {
  const normalized = clean(value, 80).toLowerCase().replace(/[.:]/g, "").trim();
  return dayNames.some((day) => normalized === day || normalized.startsWith(`${day} `));
};

const fieldKindFromRowLabel = (label: string) => {
  const kind = headerKind(label);
  return kind === "field" ? "description" : kind;
};

const dayDisplayName = (value: string) => {
  const normalized = clean(value, 80).toLowerCase().replace(/[.:]/g, "").trim();
  const names: Record<string, string> = {
    mo: "Monday", mon: "Monday", montag: "Monday", monday: "Monday",
    di: "Tuesday", tue: "Tuesday", dienstag: "Tuesday", tuesday: "Tuesday",
    mi: "Wednesday", wed: "Wednesday", mittwoch: "Wednesday", wednesday: "Wednesday",
    do: "Thursday", thu: "Thursday", donnerstag: "Thursday", thursday: "Thursday",
    fr: "Friday", fri: "Friday", freitag: "Friday", friday: "Friday",
    sa: "Saturday", sat: "Saturday", samstag: "Saturday", saturday: "Saturday",
    so: "Sunday", sun: "Sunday", sonntag: "Sunday", sunday: "Sunday",
  };
  return names[normalized.split(" ")[0]] ?? clean(value, 80);
};

const dayKeyFromLabel = (value: string) => {
  const normalized = clean(value, 80).toLowerCase().replace(/[.:]/g, "").trim();
  const key = normalized.split(" ")[0];
  const keys: Record<string, string> = {
    mo: "mon", mon: "mon", montag: "mon", monday: "mon",
    di: "tue", tue: "tue", dienstag: "tue", tuesday: "tue",
    mi: "wed", wed: "wed", mittwoch: "wed", wednesday: "wed",
    do: "thu", thu: "thu", donnerstag: "thu", thursday: "thu",
    fr: "fri", fri: "fri", freitag: "fri", friday: "fri",
    sa: "sat", sat: "sat", samstag: "sat", saturday: "sat",
    so: "sun", sun: "sun", sonntag: "sun", sunday: "sun",
  };
  return keys[key] ?? key;
};

const addDaysIso = (date: Date, offset: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + offset);
  return next.toISOString().split("T")[0];
};

const parseGviz = (text: string): string[][] => {
  const match = text.match(/google\.visualization\.Query\.setResponse\((.*)\);?\s*$/s);
  if (!match) throw new Error("Invalid sheet response");
  const json = JSON.parse(match[1]) as { table?: { rows?: Array<{ c?: Array<{ v?: unknown; f?: unknown }> }> } };
  return (json.table?.rows ?? []).map((row) => (row.c ?? []).map((cell) => clean(cell?.f ?? cell?.v, 1200)));
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
  return parseGviz(await response.text());
}

const normalizeRows = (rows: string[][]) => rows.map((row) => {
  const last = row.reduce((index, value, current) => value ? current : index, 0);
  return row.slice(0, last + 1).map((value) => clean(value));
}).filter((row) => row.some(Boolean));

const makeId = (sourceSheet: string, rowIndex: number, title: string, fields: Array<{ label: string; value: string }>) =>
  `${sourceSheet}_${rowIndex}_${title}_${fields.map((field) => field.value).join("_")}`.toLowerCase().replace(/[^a-z0-9]+/g, "_").slice(0, 120);

function rowsToWeeklyDayRecords(rows: string[][], sourceSheet: string): StaffMenuRecord[] {
  const usableRows = normalizeRows(rows);
  const records: StaffMenuRecord[] = [];

  usableRows.forEach((row, rowIndex) => {
    const dayCellIndex = row.findIndex(isDayLabel);
    if (dayCellIndex < 0) return;

    const day = dayDisplayName(row[dayCellIndex]);
    const fields = row.map((value, index) => ({ label: index === dayCellIndex ? "day" : `column ${index + 1}`, value: clean(value) })).filter((field) => field.value);
    const afterDay = row.slice(dayCellIndex + 1).map((value) => clean(value)).filter(Boolean);
    if (afterDay.length < 2) return;

    const typedFields = [
      { label: "day", value: day },
      { label: "soup", value: afterDay[0] ?? "" },
      { label: "green dish", value: afterDay[1] ?? "" },
      { label: "blue dish", value: afterDay[2] ?? "" },
      { label: "prep", value: afterDay.slice(3).join(", ") },
    ].filter((field) => field.value);

    const dishes = [
      { category: "Soup", title: afterDay[0] },
      { category: "Green dish", title: afterDay[1] },
      { category: "Blue dish", title: afterDay[2] },
    ].filter((dish) => dish.title && !isDayLabel(dish.title));

    dishes.forEach((dish, dishIndex) => {
      const recordFields = [...typedFields, ...fields].filter((field, index, list) => list.findIndex((item) => item.label === field.label && item.value === field.value) === index);
      records.push({
        id: makeId(sourceSheet, rowIndex * 10 + dishIndex, `${day}_${dish.category}_${dish.title}`, recordFields),
        title: dish.title,
        category: dish.category,
        menuDay: day,
        description: undefined,
        ingredients: afterDay.slice(3),
        allergens: [],
        notes: afterDay.slice(3).length ? [`Prep: ${afterDay.slice(3).join(", ")}`] : [],
        sourceSheet,
        fields: recordFields,
      });
    });
  });

  return records;
}

function rowsToStructuredKitchenRecords(inputRows: string[][], menuRows: string[][]): StaffMenuRecord[] {
  const input = normalizeRows(inputRows);
  const menu = normalizeRows(menuRows);
  if (!input.length || !menu.length) return [];

  const menuHeaderIndex = menu.findIndex((row) => row.some((cell) => /\bID\b/i.test(cell)) && row.some((cell) => /header/i.test(cell)));
  if (menuHeaderIndex < 0) return [];

  const dishes = new Map<string, MenuDish>();
  menu.slice(menuHeaderIndex + 1).forEach((row) => {
    const id = clean(row[2], 160).toLowerCase();
    if (!id) return;
    const ingredientsRaw = clean(row[7], 3000);
    const prepRaw = clean(row[8], 3000);
    const dish: MenuDish = {
      id,
      category: normalizeCategory(row[0]),
      cook: clean(row[1], 80),
      headerEn: clean(row[3], 240),
      textEn: clean(row[4], 800),
      headerDe: clean(row[5], 240),
      textDe: clean(row[6], 800),
      ingredients: splitLines(ingredientsRaw),
      prep: splitLines(prepRaw).filter((line) => line.toUpperCase() !== "PREP:"),
      badges: detectBadges(ingredientsRaw, prepRaw, row[4], row[6]),
    };
    dishes.set(id, dish);
  });

  const mondayCell = input[0]?.[1];
  const mondayDate = mondayCell ? new Date(mondayCell) : null;
  const dayOffsets: Record<string, number> = { mon: 0, tue: 1, wed: 2, thu: 3, fri: 4, sat: 5, sun: 6 };
  const records: StaffMenuRecord[] = [];
  const seenDays = new Set<string>();

  const dayOrder = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  input.slice(1).forEach((row, rowIndex) => {
    let dayKey = dayKeyFromLabel(row[1] || row[0] || "");
    // Fallback: new sheet format has no day label, rows are implicitly Mon..Sun
    if (!(dayKey in dayOffsets)) {
      if (rowIndex >= dayOrder.length) return;
      dayKey = dayOrder[rowIndex];
    }
    if (seenDays.has(dayKey)) return;
    seenDays.add(dayKey);
    const day = dayDisplayName(dayKey);
    const date = mondayDate && !Number.isNaN(mondayDate.getTime()) ? addDaysIso(mondayDate, dayOffsets[dayKey]) : "";
    const ids = [row[2], row[3], row[4]].map((value) => clean(value, 160).toLowerCase());
    const isHoliday = ids.some((id) => id === "feiertag");

    if (isHoliday) {
      records.push({
        id: makeId("input data", rowIndex, `${day}_feiertag`, [{ label: "day", value: day }, { label: "is_holiday", value: "true" }]),
        title: "Feiertag",
        category: "holiday",
        menuDay: day,
        description: date,
        ingredients: [],
        allergens: [],
        notes: [],
        sourceSheet: "input data",
        fields: [{ label: "day", value: day }, { label: "date", value: date }, { label: "is_holiday", value: "true" }],
      });
      return;
    }

    ids.forEach((dishId, dishIndex) => {
      const dish = dishes.get(dishId);
      if (!dish) return;
      const fields = [
        { label: "id", value: dish.id },
        { label: "day", value: day },
        { label: "date", value: date },
        { label: "category", value: dish.category },
        { label: "cook", value: dish.cook },
        { label: "header_en", value: dish.headerEn },
        { label: "header_de", value: dish.headerDe },
        { label: "text_en", value: dish.textEn },
        { label: "text_de", value: dish.textDe },
        { label: "badges", value: dish.badges.join(", ") },
        { label: "prep", value: dish.prep.join("\n") },
      ].filter((field) => field.value);
      records.push({
        id: makeId("menudata", rowIndex * 10 + dishIndex, `${day}_${dish.category}_${dish.id}`, fields),
        title: dish.headerEn || dish.headerDe || dish.id,
        category: dish.category,
        menuDay: day,
        description: dish.textEn || dish.textDe || date,
        ingredients: dish.ingredients,
        allergens: dish.badges,
        notes: dish.prep,
        sourceSheet: "menudata",
        fields,
      });
    });
  });

  return records;
}

function rowsToDayColumnRecords(rows: string[][], sourceSheet: string): StaffMenuRecord[] {
  const usableRows = normalizeRows(rows);
  const dayHeaderIndex = usableRows.findIndex((row) => row.filter(isDayLabel).length >= 2);
  if (dayHeaderIndex < 0) return [];

  const dayHeader = usableRows[dayHeaderIndex];
  const dayColumns = dayHeader
    .map((value, index) => ({ day: clean(value, 80), index }))
    .filter((column) => isDayLabel(column.day));

  const records: StaffMenuRecord[] = [];
  const activeTitles = new Map<number, string>();
  const activeFields = new Map<number, Array<{ label: string; value: string }>>();

  const flushColumn = (columnIndex: number, rowIndex: number) => {
    const title = clean(activeTitles.get(columnIndex) ?? "");
    const fields = activeFields.get(columnIndex) ?? [];
    if (!title || !fields.length) return;

    const ingredients: string[] = [];
    const allergens: string[] = [];
    const notes: string[] = [];
    let description = "";

    for (const field of fields) {
      const kind = fieldKindFromRowLabel(field.label);
      if (kind === "ingredients") ingredients.push(...splitList(field.value));
      else if (kind === "allergens") allergens.push(...splitList(field.value));
      else if (kind === "notes") notes.push(field.value);
      else if (!description && field.value !== title) description = field.value;
    }

    records.push({
      id: makeId(sourceSheet, records.length + rowIndex, title, fields),
      title,
      category: undefined,
      menuDay: dayColumns.find((column) => column.index === columnIndex)?.day,
      description: description || undefined,
      ingredients: ingredients.length ? [...new Set(ingredients)] : [...new Set(fields.map((field) => field.value).filter((value) => value !== title))],
      allergens: [...new Set(allergens)],
      notes: [...new Set(notes)],
      sourceSheet,
      fields,
    });
  };

  usableRows.slice(dayHeaderIndex + 1).forEach((row, offset) => {
    const rowIndex = dayHeaderIndex + offset + 1;
    const rowLabel = clean(row[0] || `Detail ${rowIndex + 1}`, 80);

    for (const column of dayColumns) {
      const value = clean(row[column.index]);
      if (!value) continue;

      const kind = fieldKindFromRowLabel(rowLabel);
      const shouldStartRecord = kind === "title" || (!activeTitles.get(column.index) && rowLabel && !/(zutat|ingredient|allergen|note|notiz|hinweis|prep|vorbereitung|beschreibung|description)/i.test(rowLabel));

      if (shouldStartRecord && activeTitles.get(column.index)) {
        flushColumn(column.index, rowIndex);
        activeFields.set(column.index, []);
      }

      if (shouldStartRecord || !activeTitles.get(column.index)) activeTitles.set(column.index, value);
      activeFields.set(column.index, [...(activeFields.get(column.index) ?? []), { label: rowLabel, value }]);
    }
  });

  dayColumns.forEach((column) => flushColumn(column.index, usableRows.length));
  return records;
}

function rowsToRecords(rows: string[][], sourceSheet: string): StaffMenuRecord[] {
  const weeklyDayRecords = rowsToWeeklyDayRecords(rows, sourceSheet);
  if (weeklyDayRecords.length >= 5) return weeklyDayRecords;

  const dayColumnRecords = rowsToDayColumnRecords(rows, sourceSheet);
  if (dayColumnRecords.length) return dayColumnRecords;

  const usableRows = normalizeRows(rows);
  if (!usableRows.length) return [];

  const headerIndex = usableRows.findIndex((row) => {
    const labels = row.map((cell) => headerKind(cell));
    return row.filter(Boolean).length >= 2 && (labels.includes("title") || labels.includes("ingredients") || labels.includes("allergens"));
  });

  const headers = headerIndex >= 0
    ? usableRows[headerIndex].map((value, index) => clean(value || `Column ${index + 1}`, 80))
    : Array.from({ length: Math.max(...usableRows.map((row) => row.length)) }, (_, index) => index === 0 ? "Section" : index === 1 ? "Item" : index === 2 ? "Ingredients" : `Detail ${index + 1}`);

  const body = (headerIndex >= 0 ? usableRows.slice(headerIndex + 1) : usableRows)
    .filter((row) => row.filter(Boolean).length >= 2);

  let activeSection = "";

  return body.map((row, rowIndex) => {
    const filled = row.filter(Boolean);
    if (filled.length === 1) activeSection = filled[0];

    const fields = headers
      .map((label, index) => ({ label, value: clean(row[index], 1200) }))
      .filter((field) => field.value && !/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(field.value));

    let title = "";
    let category = activeSection;
    let menuDay = "";
    let description = "";
    const ingredients: string[] = [];
    const allergens: string[] = [];
    const notes: string[] = [];

    for (const field of fields) {
      const kind = headerKind(field.label);
      if (kind === "day" && !menuDay) menuDay = field.value;
      if (kind === "title" && !title) title = field.value;
      if (kind === "category" && !category) category = field.value;
      if (kind === "description" && !description) description = field.value;
      if (kind === "ingredients") ingredients.push(...splitList(field.value));
      if (kind === "allergens") allergens.push(...splitList(field.value));
      if (kind === "notes") notes.push(field.value);
    }

    if (!title) title = fields.find((field) => !/(datum|date|tag|day|woche|week)/i.test(field.label))?.value || fields[0]?.value || `Item ${rowIndex + 1}`;

    if (!ingredients.length) {
      fields.slice(1).forEach((field) => {
        if (!/(allergen|note|notiz|hinweis|datum|date|tag|day)/i.test(field.label) && field.value !== title) ingredients.push(field.value);
      });
    }

    return {
      id: makeId(sourceSheet, rowIndex, title, fields),
      title,
      category: category || undefined,
      menuDay: menuDay || undefined,
      description: description || undefined,
      ingredients: [...new Set(ingredients)].filter((value) => value !== title),
      allergens: [...new Set(allergens)],
      notes: [...new Set(notes)],
      sourceSheet,
      fields,
    };
  }).filter((record) => record.title && record.fields.length >= 2);
}

const digestRows = async (rows: string[][], extraRows: string[][] = []) => {
  const bytes = new TextEncoder().encode(JSON.stringify({ parser: "structured-kitchen-v1", rows: normalizeRows(rows), extraRows: normalizeRows(extraRows) }));
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

const recordSearchText = (record: StaffMenuRecord) => clean([
  record.title,
  record.category,
  record.menuDay,
  record.description,
  ...record.ingredients,
  ...record.allergens,
  ...record.notes,
  ...record.fields.map((field) => `${field.label} ${field.value}`),
].filter(Boolean).join(" "), 6000).toLowerCase();

const dbItemToRecord = (item: any, snapshot: any): StaffMenuRecord => ({
  id: item.id,
  title: item.title,
  category: item.category ?? undefined,
  menuDay: item.menu_day ?? undefined,
  description: item.description ?? undefined,
  ingredients: item.ingredients ?? [],
  allergens: item.allergens ?? [],
  notes: item.notes ?? [],
  sourceSheet: snapshot?.sheet_name ?? "Küchenplan",
  snapshotPeriod: snapshot?.period ?? undefined,
  isCurrent: Boolean(snapshot?.is_current),
  fields: Array.isArray(item.fields) ? item.fields : [],
});

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  let sheetId = Deno.env.get("GOOGLE_SHEET_ID") || Deno.env.get("VITE_GOOGLE_SHEETS_ID") || "";

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

  const sheetNames = ["Küchenplan", "Kuechenplan", "Kuchenplan", "küchenplan", "kuechenplan", "kuchenplan", "KÜCHENPLAN", "KUCHENPLAN"];
  let imported: { sheetName: string; rows: string[][]; records: StaffMenuRecord[]; sourceHash: string } | null = null;
  const importErrors: string[] = [];

  try {
    const inputRows = await fetchSheetRows(sheetId, "input data");
    const menuRows = await fetchSheetRows(sheetId, "menudata");
    const records = rowsToStructuredKitchenRecords(inputRows, menuRows);
    if (records.length) {
      imported = { sheetName: "input data + menudata", rows: inputRows, records, sourceHash: await digestRows(inputRows, menuRows) };
    }
  } catch (error) {
    importErrors.push(`input data + menudata: ${error instanceof Error ? error.message : "Unknown error"}`);
    console.warn("Unable to import structured kitchen sheets", error);
  }

  for (const sheetName of imported ? [] : sheetNames) {
    try {
      const rows = await fetchSheetRows(sheetId, sheetName);
      const records = rowsToRecords(rows, sheetName);
      if (!records.length) throw new Error("No usable rows found");
      imported = { sheetName, rows, records, sourceHash: await digestRows(rows) };
      break;
    } catch (error) {
      importErrors.push(`${sheetName}: ${error instanceof Error ? error.message : "Unknown error"}`);
      console.warn(`Unable to import ${sheetName}`, error);
    }
  }

  if (!imported) {
    return new Response(JSON.stringify({ success: false, error: "Küchenplan sheet not found or empty", details: importErrors }), { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  const { data: currentSnapshot } = await admin.from("kuechenplan_snapshots").select("id, source_hash").eq("is_current", true).maybeSingle();

  let snapshotId = currentSnapshot?.id;
  if (!currentSnapshot || currentSnapshot.source_hash !== imported.sourceHash) {
    await admin.from("kuechenplan_snapshots").update({ is_current: false, archived_at: new Date().toISOString() }).eq("is_current", true);
    const { data: newSnapshot, error: snapshotError } = await admin.from("kuechenplan_snapshots").insert({
      source_hash: imported.sourceHash,
      sheet_name: imported.sheetName,
      period: imported.records.find((record) => record.menuDay)?.menuDay ?? null,
      is_current: true,
    }).select("id").single();
    if (snapshotError) throw snapshotError;
    snapshotId = newSnapshot.id;

    const items = imported.records.map((record, index) => ({
      snapshot_id: snapshotId,
      row_index: index,
      title: record.title,
      category: record.category ?? null,
      menu_day: record.menuDay ?? null,
      description: record.description ?? null,
      ingredients: record.ingredients,
      allergens: record.allergens,
      notes: record.notes,
      fields: record.fields,
      search_text: recordSearchText(record),
    }));
    const { error: itemsError } = await admin.from("kuechenplan_items").insert(items);
    if (itemsError) throw itemsError;
  }

  const { data: snapshots, error: snapshotsError } = await admin
    .from("kuechenplan_snapshots")
    .select("id, sheet_name, period, is_current, created_at")
    .order("created_at", { ascending: false })
    .limit(12);
  if (snapshotsError) throw snapshotsError;

  const snapshotIds = (snapshots ?? []).map((snapshot) => snapshot.id);
  const { data: items, error: itemsError } = await admin
    .from("kuechenplan_items")
    .select("*")
    .in("snapshot_id", snapshotIds)
    .order("row_index", { ascending: true });
  if (itemsError) throw itemsError;

  const snapshotById = new Map((snapshots ?? []).map((snapshot) => [snapshot.id, snapshot]));
  const records = (items ?? []).map((item) => dbItemToRecord(item, snapshotById.get(item.snapshot_id)));
  const currentRecords = records.filter((record) => record.isCurrent);
  const archiveRecords = records.filter((record) => !record.isCurrent);

  return new Response(JSON.stringify({
    success: true,
    data: {
      sheetName: imported.sheetName,
      records,
      currentRecords,
      archiveRecords,
      snapshots: snapshots ?? [],
      _debug: { importErrors, sheetIdPrefix: (imported as any)._debugSheetIdPrefix, structuredCount: debugStructuredCount, inputRowsSample: debugInputRowsSample, menuRowsSample: debugMenuRowsSample },
    },
  }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
});
