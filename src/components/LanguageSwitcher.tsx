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
        className={
          language === "de"
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background"
        }
        aria-pressed={language === "de"}
        aria-label="Switch to German"
      >
        DE
      </Button>
      <Button
        variant={language === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => setLanguage("en")}
        className={
          language === "en"
            ? "bg-accent text-accent-foreground hover:bg-accent/90"
            : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-background"
        }
        aria-pressed={language === "en"}
        aria-label="Switch to English"
      >
        EN
      </Button>
    </div>
  );
};
