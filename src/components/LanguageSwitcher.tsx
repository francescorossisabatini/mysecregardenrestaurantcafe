import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "navbar" | "mobile";
}

export const LanguageSwitcher = ({ variant = "navbar" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="inline-flex h-9 shrink-0 items-center rounded-md border border-border/60 bg-background/80 p-0.5 shadow-sm" role="group" aria-label="Language selection">
        <button
          onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("de"); }}
          className={`flex h-8 min-w-9 items-center justify-center rounded-[6px] px-2 text-sm transition-colors duration-200 whitespace-nowrap ${
            language === "de"
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={language === "de"}
          aria-label="Deutsch"
        >
          DE
        </button>
        <button
          onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("en"); }}
          className={`flex h-8 min-w-9 items-center justify-center rounded-[6px] px-2 text-sm transition-colors duration-200 whitespace-nowrap ${
            language === "en"
              ? "bg-primary text-primary-foreground font-medium"
              : "text-muted-foreground hover:text-foreground"
          }`}
          aria-pressed={language === "en"}
          aria-label="English"
        >
          EN
        </button>
      </div>
    );
  }

  // Desktop navbar variant - minimal text only, constrained width
  return (
    <div className="flex items-center gap-1 shrink-0" role="group" aria-label="Language selection">
      <button
        onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("de"); }}
        className={`text-sm transition-colors duration-200 px-1 whitespace-nowrap ${
          language === "de"
            ? "text-foreground font-medium"
            : "text-foreground/50 hover:text-foreground"
        }`}
        aria-pressed={language === "de"}
        aria-label="Deutsch"
      >
        DE
      </button>
      <span className="text-foreground/30 text-sm">/</span>
      <button
        onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("en"); }}
        className={`text-sm transition-colors duration-200 px-1 whitespace-nowrap ${
          language === "en"
            ? "text-foreground font-medium"
            : "text-foreground/50 hover:text-foreground"
        }`}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
