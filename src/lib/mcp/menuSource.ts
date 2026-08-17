// Shared helpers for the public MCP tools.
// Import-safe: no env reads or I/O at module top level.

export interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
  greenNote?: { de: string; en: string };
  blue: { de: string; en: string };
  blueNote?: { de: string; en: string };
}

export interface WeeklyMenu {
  period: string;
  days: MenuDay[];
}

type RuntimeGlobals = typeof globalThis & {
  Deno?: { env?: { get?: (name: string) => string | undefined } };
  process?: { env?: Record<string, string | undefined> };
};

function runtimeEnv(name: string): string | undefined {
  const runtime = globalThis as RuntimeGlobals;
  return runtime.Deno?.env?.get?.(name) ?? runtime.process?.env?.[name];
}

function configuredEnv(names: readonly string[]): string | undefined {
  for (const name of names) {
    const value = runtimeEnv(name)?.trim();
    if (value) return value;
  }
  return undefined;
}

function supabaseProjectUrl(): string {
  const url = configuredEnv(["SUPABASE_URL", "VITE_SUPABASE_URL"]);
  if (!url) throw new Error("SUPABASE_URL is not configured");
  return url;
}

function publishableKey(): string {
  const direct = configuredEnv(["SUPABASE_PUBLISHABLE_KEY", "VITE_SUPABASE_PUBLISHABLE_KEY"]);
  if (direct) return direct;
  const keyset = runtimeEnv("SUPABASE_PUBLISHABLE_KEYS");
  if (keyset) {
    try {
      const parsed: unknown = JSON.parse(keyset);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const keys = parsed as Record<string, unknown>;
        const key = [keys.default, ...Object.values(keys)]
          .find((v): v is string => typeof v === "string" && v.trim().startsWith("sb_publishable_"))
          ?.trim();
        if (key) return key;
      }
    } catch {
      // fall through to legacy names
    }
  }
  const legacy = configuredEnv(["SUPABASE_ANON_KEY", "VITE_SUPABASE_ANON_KEY"]);
  if (legacy) return legacy;
  throw new Error("No Supabase publishable key is configured");
}

/** Fetches the current weekly menu through the public get-daily-menu function. */
export async function fetchWeeklyMenu(): Promise<WeeklyMenu | null> {
  const key = publishableKey();
  const res = await fetch(`${supabaseProjectUrl()}/functions/v1/get-daily-menu`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
    },
    body: "{}",
  });
  if (!res.ok) throw new Error(`Menu service returned ${res.status}`);
  const json = (await res.json()) as { success?: boolean; data?: WeeklyMenu; error?: string };
  if (!json.success || !json.data) return null;
  return json.data;
}

const WEEKDAY_KEYS = ["sonntag", "montag", "dienstag", "mittwoch", "donnerstag", "freitag", "samstag"];

/** Returns today's entry (Vienna time) from the weekly menu, or null on Sundays / no match. */
export function pickToday(menu: WeeklyMenu): MenuDay | null {
  const viennaNow = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Europe/Vienna" }),
  );
  const key = WEEKDAY_KEYS[viennaNow.getDay()];
  return (
    menu.days.find((d) => d.day.de.toLowerCase().includes(key)) ??
    null
  );
}

export function formatDay(day: MenuDay, lang: "de" | "en"): string {
  const lines = [
    `${day.day[lang]}`,
    `  Soup: ${day.soup[lang] || "-"}`,
    `  Green: ${day.green[lang] || "-"}${day.greenNote?.[lang] ? ` (${day.greenNote[lang]})` : ""}`,
    `  Blue: ${day.blue[lang] || "-"}${day.blueNote?.[lang] ? ` (${day.blueNote[lang]})` : ""}`,
  ];
  return lines.join("\n");
}
