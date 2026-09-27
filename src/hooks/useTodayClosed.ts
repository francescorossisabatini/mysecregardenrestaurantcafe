import { useMemo } from "react";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { getTodayHoliday } from "@/data/holidaysData";

type WeeklyMenuData = ReturnType<typeof useWeeklyMenu>["menu"];

interface TodayClosedResult {
  isClosed: boolean;
  isLoading: boolean;
  reason: "sunday" | "holiday" | null;
  /** Il foglio ha almeno un piatto valido per oggi. Non decide se siamo chiusi. */
  hasMenuToday: boolean;
  todayMenu?: WeeklyMenuData["days"][number];
  loadedAt: string | null;
  holidayName?: { de: string; en: string };
  holidayMessage?: { de: string; en: string };
}

/**
 * Siamo chiusi oggi? Solo domenica e festivi (holidaysData).
 *
 * Fino al 27/09/2026 anche "il foglio non ha ancora i piatti di oggi" contava
 * come chiuso: un lunedì alle 10, prima dell'aggiornamento dello staff, il
 * sito diceva "Heute geschlossen" e il locale apriva alle 11. Il menu vuoto
 * ora è solo `hasMenuToday: false` (docs/ux/divergence-ledger.md). Una chiusura
 * straordinaria va segnata in holidaysData.
 */
export function useTodayClosed(): TodayClosedResult {
  const { menu, isLoading, loadedAt } = useWeeklyMenu();

  return useMemo(() => {
    if (isLoading) {
      return { isClosed: false, isLoading: true, reason: null, hasMenuToday: false, loadedAt: null };
    }

    const today = new Date();
    const isSunday = today.getDay() === 0;
    const todayHoliday = getTodayHoliday();

    // Check for holiday first
    if (todayHoliday) {
      return {
        isClosed: true,
        isLoading: false,
        reason: "holiday",
        hasMenuToday: false,
        loadedAt,
        holidayName: todayHoliday.name,
        holidayMessage: todayHoliday.message,
      };
    }

    // Check for Sunday
    if (isSunday) {
      return { isClosed: true, isLoading: false, reason: "sunday", hasMenuToday: false, loadedAt };
    }

    // Check if today's menu is empty (no data from Google Sheets)
    const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const todayName = dayNames[today.getDay()];
    const todayMenu = menu.days.find((day) => day.day.de === todayName);

    const isValidMenuText = (text?: string) => {
      const t = (text ?? "").trim();
      if (!t) return false;
      if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(t)) return false;
      return true;
    };

    const hasMenuData = !!todayMenu && (
      isValidMenuText(todayMenu.soup?.de) || isValidMenuText(todayMenu.soup?.en) ||
      isValidMenuText(todayMenu.green?.de) || isValidMenuText(todayMenu.green?.en) ||
      isValidMenuText(todayMenu.blue?.de) || isValidMenuText(todayMenu.blue?.en)
    );

    return { isClosed: false, isLoading: false, reason: null, hasMenuToday: hasMenuData, todayMenu, loadedAt };
  }, [menu, isLoading, loadedAt]);
}
