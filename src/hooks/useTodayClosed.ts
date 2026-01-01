import { useMemo } from "react";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { getTodayHoliday } from "@/data/holidaysData";

interface TodayClosedResult {
  isClosed: boolean;
  isLoading: boolean;
  reason: "sunday" | "holiday" | "no-menu" | null;
  holidayName?: { de: string; en: string };
  holidayMessage?: { de: string; en: string };
}

/**
 * Hook to determine if the restaurant is closed today.
 * Checks: Sunday, holiday, or no menu data from Google Sheets.
 */
export function useTodayClosed(): TodayClosedResult {
  const { menu, isLoading } = useWeeklyMenu();

  return useMemo(() => {
    if (isLoading) {
      return { isClosed: false, isLoading: true, reason: null };
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
        holidayName: todayHoliday.name,
        holidayMessage: todayHoliday.message,
      };
    }

    // Check for Sunday
    if (isSunday) {
      return { isClosed: true, isLoading: false, reason: "sunday" };
    }

    // Check if today's menu is empty (no data from Google Sheets)
    const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const todayName = dayNames[today.getDay()];
    const todayMenu = menu.days.find((day) => day.day.de === todayName);

    // If no menu found OR all dishes are empty, treat as closed
    const hasMenuData = todayMenu && (
      (todayMenu.soup?.de?.trim() || todayMenu.soup?.en?.trim()) ||
      (todayMenu.green?.de?.trim() || todayMenu.green?.en?.trim()) ||
      (todayMenu.blue?.de?.trim() || todayMenu.blue?.en?.trim())
    );

    if (!hasMenuData) {
      return { isClosed: true, isLoading: false, reason: "no-menu" };
    }

    return { isClosed: false, isLoading: false, reason: null };
  }, [menu, isLoading]);
}
