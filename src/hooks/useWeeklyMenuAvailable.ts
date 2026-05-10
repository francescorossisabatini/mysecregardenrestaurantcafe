import { SHOW_WEEKLY_MENU } from "@/config/menuFlags";

/**
 * Last Sunday 00:00 in Europe/Vienna time, returned as a UTC Date.
 * If today is Sunday in Vienna, returns today 00:00.
 */
export function lastSundayMidnightVienna(now: Date = new Date()): Date {
  // Get Vienna Y/M/D + weekday using Intl
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Vienna",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  });
  const parts = fmt.formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const year = Number(get("year"));
  const month = Number(get("month"));
  const day = Number(get("day"));
  const wd = get("weekday"); // Sun, Mon, ..., Sat
  const map: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  const dow = map[wd] ?? 0;

  // Build a UTC date for Vienna-local Y/M/D 00:00, then offset by Vienna's UTC offset.
  // Since Vienna is CET/CEST (UTC+1 or +2), construct using local-as-UTC then subtract offset.
  // Easiest reliable approach: build "YYYY-MM-DDT00:00:00" and interpret in Vienna by
  // computing the offset.
  const viennaMidnightLocal = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  // Compute Vienna offset (in minutes) at that instant
  const offsetMin = getViennaOffsetMinutes(viennaMidnightLocal);
  const todayMidnightUtc = new Date(viennaMidnightLocal.getTime() - offsetMin * 60 * 1000);

  // Subtract dow days to land on Sunday
  const sundayUtc = new Date(todayMidnightUtc.getTime() - dow * 24 * 60 * 60 * 1000);
  return sundayUtc;
}

function getViennaOffsetMinutes(at: Date): number {
  // Compute the offset between UTC and Vienna at the given instant
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Vienna",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const parts = dtf.formatToParts(at);
  const map: Record<string, string> = {};
  for (const p of parts) map[p.type] = p.value;
  const asUtc = Date.UTC(
    Number(map.year),
    Number(map.month) - 1,
    Number(map.day),
    Number(map.hour),
    Number(map.minute),
    Number(map.second)
  );
  return Math.round((asUtc - at.getTime()) / 60000);
}

/**
 * The weekly menu is "valid" if loadedAt is on or after last Sunday 00:00 (Vienna).
 * Manual SHOW_WEEKLY_MENU=false acts as an emergency master kill switch.
 */
export function useWeeklyMenuAvailable(loadedAt: string | null | undefined): boolean {
  if (!SHOW_WEEKLY_MENU) return false;
  if (!loadedAt) return false;
  const loaded = new Date(loadedAt);
  if (isNaN(loaded.getTime())) return false;
  return loaded.getTime() >= lastSundayMidnightVienna().getTime();
}
