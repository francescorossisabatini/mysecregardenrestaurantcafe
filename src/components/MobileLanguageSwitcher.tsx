import { useLanguage } from "@/contexts/LanguageContext";

export const MobileLanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      className="fixed bottom-6 right-4 z-40 flex gap-1 lg:hidden"
      role="group" 
      aria-label="Language selection"
    >
      <button
        onClick={() => setLanguage("de")}
        className={`w-9 h-9 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md ${
          language === "de"
            ? "bg-primary/90 text-primary-foreground shadow-lg"
            : "bg-background/60 text-foreground/60 hover:bg-background/80 hover:text-foreground"
        }`}
        aria-pressed={language === "de"}
        aria-label="Deutsch"
      >
        DE
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`w-9 h-9 rounded-full text-xs font-medium transition-all duration-300 backdrop-blur-md ${
          language === "en"
            ? "bg-primary/90 text-primary-foreground shadow-lg"
            : "bg-background/60 text-foreground/60 hover:bg-background/80 hover:text-foreground"
        }`}
        aria-pressed={language === "en"}
        aria-label="English"
      >
        EN
      </button>
    </div>
  );
};
