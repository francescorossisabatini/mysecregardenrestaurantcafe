import { useState, useEffect } from 'react';
import { fetchMenuFromSheets, clearMenuCache } from '@/services/googleSheetsService';
import { weeklyMenu as fallbackMenu } from '@/data/menuData';

interface MenuDay {
  day: { de: string; en: string };
  soup: { de: string; en: string };
  green: { de: string; en: string };
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

  const loadMenu = async () => {
    const sheetId = import.meta.env.VITE_GOOGLE_SHEETS_ID;
    
    // If no sheet ID is configured, use fallback data
    if (!sheetId) {
      setMenu(fallbackMenu);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchMenuFromSheets(sheetId);
      setMenu(data);
    } catch (err) {
      console.error('Failed to load menu from Google Sheets, using fallback:', err);
      setError('Failed to load latest menu');
      setMenu(fallbackMenu);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();

    // Auto-refresh every 10 minutes
    const interval = setInterval(() => {
      clearMenuCache();
      loadMenu();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const refresh = () => {
    clearMenuCache();
    loadMenu();
  };

  return { menu, isLoading, error, refresh };
}
