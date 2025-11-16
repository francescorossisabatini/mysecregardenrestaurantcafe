import { useState, useEffect } from 'react';
import { fetchMenuFromSheets, clearMenuCache } from '@/services/googleSheetsService';
import { weeklyMenu as fallbackMenu } from '@/data/menuData';
import { GOOGLE_SHEETS_CONFIG } from '@/config/googleSheets';

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
    console.log('🔑 Sheet ID trovato:', sheetId ? 'SI ✅' : 'NO ❌');
    console.log('🔑 Valore Sheet ID:', sheetId);
    
    // If no sheet ID is configured, use fallback data
    if (!sheetId) {
      console.log('⚠️ Nessun Sheet ID, uso dati fallback');
      setMenu(fallbackMenu);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      console.log('⏳ Inizio caricamento menu...');
      const data = await fetchMenuFromSheets(sheetId);
      console.log('✅ Menu caricato e impostato');
      setMenu(data);
    } catch (err) {
      console.error('❌ Fallito caricamento da Google Sheets, uso fallback:', err);
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
