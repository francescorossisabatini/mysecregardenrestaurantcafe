import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Syncs <html lang="..."> with the active site language.
 *
 * IMPORTANT: Skips staff routes (/staff, /staff/login, ...). Those pages are
 * locked to lang="en" + translate="no" by useStaffPageGuard to prevent
 * Safari/Chrome iOS auto-translation from mutating the DOM mid-render, which
 * was crashing the staff dashboard on iPad (page loads then disappears,
 * leaving only the background color).
 *
 * If this hook re-runs on a staff route it would flip lang back to "de",
 * re-enabling auto-translate and re-triggering the crash.
 */
export const useHtmlLang = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.pathname.startsWith('/staff')) {
      return;
    }
    document.documentElement.lang = language;
  }, [language]);
};
