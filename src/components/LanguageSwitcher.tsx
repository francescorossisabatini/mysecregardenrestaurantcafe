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
        className={`min-h-[44px] min-w-[44px] touch-manipulation font-semibold ${
          language === "de"
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            : "bg-transparent text-foreground/70 hover:text-foreground hover:bg-primary/10 border-2 border-primary/30"
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
        className={`min-h-[44px] min-w-[44px] touch-manipulation font-semibold ${
          language === "en"
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
            : "bg-transparent text-foreground/70 hover:text-foreground hover:bg-primary/10 border-2 border-primary/30"
        }`}
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </Button>
    </div>
  );
};
