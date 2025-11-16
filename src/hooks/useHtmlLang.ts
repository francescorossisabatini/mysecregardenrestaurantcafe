import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const useHtmlLang = () => {
  const { language } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
};
