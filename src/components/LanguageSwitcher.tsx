import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex gap-2" role="group" aria-label="Language selection">
      <Button
        variant={language === "de" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("de")}
        className={`min-h-[44px] min-w-[44px] touch-manipulation ${
          language === "de"
            ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
            : "bg-background/95 backdrop-blur-sm text-foreground hover:bg-background border-2 border-border"
        }`}
        aria-pressed={language === "de"}
        aria-label="Switch to German"
      >
        DE
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={`min-h-[44px] min-w-[44px] touch-manipulation ${
          language === "en"
            ? "bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg"
            : "bg-background/95 backdrop-blur-sm text-foreground hover:bg-background border-2 border-border"
        }`}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </Button>
    </div>
  );
};
