import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "navbar" | "mobile";
  tone?: "default" | "overlay";
}

export const LanguageSwitcher = ({ variant = "navbar", tone = "default" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const isOverlay = tone === "overlay";

  if (variant === "mobile") {
    return (
      // Solo bordo, token pieni, pulsanti da 44px (DESIGN_SYSTEM §6/§8,
      // divergence-ledger 26/09/2026). Prima: bordo + ombra nera + blur, h-10.
      <div className="inline-flex h-12 shrink-0 items-center rounded-full border border-border bg-card p-0.5" role="group" aria-label="Language selection">
        <button
          onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("de"); }}
          className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-base whitespace-nowrap ${
            language === "de"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
          }`}
          aria-pressed={language === "de"}
          aria-label="Deutsch"
        >
          DE
        </button>
        <button
          onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("en"); }}
          className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-base whitespace-nowrap ${
            language === "en"
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-muted"
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
    <div className={`flex shrink-0 items-center gap-1 rounded-full border border-border/70 p-1 ${isOverlay ? "bg-card/90 backdrop-blur-md" : "bg-muted/70"}`} role="group" aria-label="Language selection">
      <button
        onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("de"); }}
        className={`rounded-full px-2.5 py-1 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-base whitespace-nowrap ${
          language === "de"
            ? "bg-primary text-primary-foreground"
            : "text-primary hover:text-primary"
        }`}
        aria-pressed={language === "de"}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => { window.gtag?.('event', 'language_switch', { event_category: 'engagement', event_label: language === 'de' ? 'switch_to_en' : 'switch_to_de' }); setLanguage("en"); }}
        className={`rounded-full px-2.5 py-1 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-base whitespace-nowrap ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-primary hover:text-primary"
        }`}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
