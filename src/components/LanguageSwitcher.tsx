import { useLanguage } from "@/contexts/LanguageContext";

interface LanguageSwitcherProps {
  variant?: "navbar" | "mobile";
}

export const LanguageSwitcher = ({ variant = "navbar" }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  if (variant === "mobile") {
    return (
      <div className="border-t border-border/20 pt-6">
        <p className="text-sm text-foreground/50 mb-3 px-1">Sprache</p>
        <div className="flex gap-4" role="group" aria-label="Language selection">
          <button
            onClick={() => setLanguage("de")}
            className={`text-lg transition-colors duration-200 ${
              language === "de"
                ? "text-foreground font-medium"
                : "text-foreground/50 hover:text-foreground"
            }`}
            aria-pressed={language === "de"}
            aria-label="Deutsch"
          >
            DE
          </button>
          <span className="text-foreground/30">/</span>
          <button
            onClick={() => setLanguage("en")}
            className={`text-lg transition-colors duration-200 ${
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
      </div>
    );
  }

  // Desktop navbar variant - minimal text only, constrained width
  return (
    <div className="flex items-center gap-1 shrink-0" role="group" aria-label="Language selection">
      <button
        onClick={() => setLanguage("de")}
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
        onClick={() => setLanguage("en")}
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
