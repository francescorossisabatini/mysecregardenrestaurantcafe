import { useCallback, useEffect, useRef, useState } from "react";
import { fetchMenuFromSheets, clearMenuCache } from "@/services/googleSheetsService";
import { weeklyMenu as fallbackMenu } from "@/data/menuData";

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

export function useWeeklyMenu() {
  const [menu, setMenu] = useState<WeeklyMenu>(fallbackMenu);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fix: no refresh every 30s.
  // Soft refresh on focus/online/visibility change, with minimum gap.
  const SOFT_REFRESH_MIN_GAP = 10 * 60 * 1000; // 10 min
  const HEARTBEAT_INTERVAL = 15 * 60 * 1000;   // 15 min (tab open long)
  const lastSoftRefreshRef = useRef<number>(0);

  const loadMenu = useCallback(
    async (opts?: { force?: boolean; silent?: boolean }) => {
      const force = opts?.force ?? false;
      const silent = opts?.silent ?? false;

      try {
        if (!silent) setIsLoading(true);
        setError(null);

        if (force) {
          clearMenuCache(); // bypass local cache
        }

        const data = await fetchMenuFromSheets();
        setMenu(data);
      } catch (err) {
        console.error("Failed to load menu:", err);
        setError("Failed to load latest menu");
        setMenu(fallbackMenu);
      } finally {
        if (!silent) setIsLoading(false);
      }
    },
    []
  );

  const softRefresh = useCallback(() => {
    const now = Date.now();
    if (now - lastSoftRefreshRef.current < SOFT_REFRESH_MIN_GAP) return;

    // Soft refresh: does NOT clear cache -> avoids unnecessary calls
    loadMenu({ silent: true });
    lastSoftRefreshRef.current = now;
  }, [loadMenu]);

  useEffect(() => {
    loadMenu();
    lastSoftRefreshRef.current = Date.now();

    const onVisibility = () => {
      if (document.visibilityState === "visible") softRefresh();
    };

    window.addEventListener("focus", softRefresh);
    window.addEventListener("online", softRefresh);
    document.addEventListener("visibilitychange", onVisibility);

    const interval = setInterval(() => softRefresh(), HEARTBEAT_INTERVAL);

    return () => {
      window.removeEventListener("focus", softRefresh);
      window.removeEventListener("online", softRefresh);
      document.removeEventListener("visibilitychange", onVisibility);
      clearInterval(interval);
    };
  }, [loadMenu, softRefresh]);

  // Hard refresh (bypass cache)
  const refresh = () => loadMenu({ force: true });

  return { menu, isLoading, error, refresh };
}
