import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/** Syncs <html lang="..."> with the active site language. */
export const useHtmlLang = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
};
