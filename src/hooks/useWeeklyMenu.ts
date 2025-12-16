import { useState, useEffect } from 'react';
import { fetchMenuFromSheets, clearMenuCache } from '@/services/googleSheetsService';
import { weeklyMenu as fallbackMenu } from '@/data/menuData';
import { GOOGLE_SHEETS_CONFIG } from '@/config/googleSheets';

const isDev = import.meta.env.DEV;

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

  const loadMenu = async () => {
    const sheetId = GOOGLE_SHEETS_CONFIG.menuSheetId;
    
    // If no sheet ID is configured, use fallback data
    if (!sheetId) {
      if (isDev) console.log('⚠️ No Sheet ID configured, using fallback data');
      setMenu(fallbackMenu);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      if (isDev) console.log('⏳ Loading menu...');
      const data = await fetchMenuFromSheets(sheetId);
      if (isDev) console.log('✅ Menu loaded and set');
      setMenu(data);
    } catch (err) {
      if (isDev) console.error('❌ Failed to load from Google Sheets, using fallback:', err);
      setError('Failed to load latest menu');
      setMenu(fallbackMenu);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadMenu();

    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      clearMenuCache();
      loadMenu();
    }, 30 * 1000);

    return () => clearInterval(interval);
  }, []);

  const refresh = () => {
    clearMenuCache();
    loadMenu();
  };

  return { menu, isLoading, error, refresh };
}
