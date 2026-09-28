import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "navbar" | "mobile";
  tone?: "default" | "overlay";
}

export const LanguageSwitcher = ({ variant = "navbar", tone = "default" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  // L'etichetta viene dal pulsante premuto, e sulla lingua già attiva non
  // parte nessun evento: prima toccare DE su una pagina DE registrava
  // "switch_to_en" (critico cieco, 28/09/2026).
  const choose = (next: "de" | "en") => {
    if (next === language) return;
    window.gtag?.("event", "language_switch", { event_category: "engagement", event_label: `switch_to_${next}` });
    setLanguage(next);
  };
  const isOverlay = tone === "overlay";

  if (variant === "mobile") {
    return (
      // Solo bordo, token pieni, pulsanti da 44px (DESIGN_SYSTEM §6/§8,
      // divergence-ledger 26/09/2026). Prima: bordo + ombra nera + blur, h-10.
      <div className="inline-flex h-[52px] shrink-0 items-center rounded-full border border-border bg-card p-1" role="group" aria-label={language === "de" ? "Sprache wählen" : "Choose language"}>
        <button
          type="button"
          lang="de"
          onClick={() => choose("de")}
          className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 font-work text-[11px] font-semibold tracking-[0.08em] transition-[background-color,color] duration-base whitespace-nowrap focus-visible:outline-offset-0 ${
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
          type="button"
          lang="en"
          onClick={() => choose("en")}
          className={`flex h-11 min-w-11 items-center justify-center rounded-full px-2.5 font-work text-[11px] font-semibold tracking-[0.08em] transition-[background-color,color] duration-base whitespace-nowrap focus-visible:outline-offset-0 ${
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
    <div className={`flex shrink-0 items-center gap-1 rounded-full border border-border/70 p-1 ${isOverlay ? "bg-card/90 backdrop-blur-md" : "bg-muted/70"}`} role="group" aria-label={language === "de" ? "Sprache wählen" : "Choose language"}>
      <button
        type="button"
        lang="de"
        onClick={() => choose("de")}
        className={`rounded-full px-2.5 py-1 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-base whitespace-nowrap ${
          language === "de"
            ? "bg-primary text-primary-foreground"
            : "text-primary"
        }`}
        aria-pressed={language === "de"}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        type="button"
        lang="en"
        onClick={() => choose("en")}
        className={`rounded-full px-2.5 py-1 font-work text-[11px] font-semibold tracking-[0.08em] transition-colors duration-base whitespace-nowrap ${
          language === "en"
            ? "bg-primary text-primary-foreground"
            : "text-primary"
        }`}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
