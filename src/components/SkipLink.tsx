import { useLanguage } from "@/contexts/LanguageContext";

/**
 * EAA / WCAG 2.4.1 Bypass Blocks — visible on focus.
 * Place once at the top of every page. Target element must have id="main-content".
 */
export const SkipLink = () => {
  const { language } = useLanguage();
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:border focus:border-primary focus:bg-background focus:px-4 focus:py-2 focus:font-work focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-elevated focus:outline-none focus:ring-2 focus:ring-primary"
    >
      {language === "de" ? "Zum Hauptinhalt springen" : "Skip to main content"}
    </a>
  );
};
