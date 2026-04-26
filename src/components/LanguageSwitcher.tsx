import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "navbar" | "mobile";
}

export const LanguageSwitcher = ({ variant = "navbar" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="inline-flex h-9 shrink-0 items-center rounded-full border border-border/75 bg-muted/70 p-0.5 shadow-sm" role="group" aria-label="Language selection">
        <button
          onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("de"); }}
          className={`flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-200 whitespace-nowrap ${
            language === "de"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-primary/75 hover:text-primary"
          }`}
          aria-pressed={language === "de"}
          aria-label="Deutsch"
        >
          DE
        </button>
        <button
          onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("en"); }}
          className={`flex h-8 min-w-9 items-center justify-center rounded-full px-2.5 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-200 whitespace-nowrap ${
            language === "en"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-primary/75 hover:text-primary"
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
    <div className="flex shrink-0 items-center gap-1 rounded-full bg-muted/70 p-1" role="group" aria-label="Language selection">
      <button
        onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("de"); }}
        className={`rounded-full px-2.5 py-1 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-200 whitespace-nowrap ${
          language === "de"
            ? "bg-primary text-primary-foreground"
            : "text-primary/70 hover:text-primary"
        }`}
        aria-pressed={language === "de"}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("en"); }}
        className={`rounded-full px-2.5 py-1 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-200 whitespace-nowrap ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-primary/70 hover:text-primary"
        }`}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
