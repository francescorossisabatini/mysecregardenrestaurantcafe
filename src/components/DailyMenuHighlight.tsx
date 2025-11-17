import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { DailyMenuCard } from "./DailyMenuCard";
import { Loader2 } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";

export const DailyMenuHighlight = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();

  if (isLoading) {
    return (
      <section id="daily-menu" className="py-20 px-4 bg-background">
        <div className="container mx-auto flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (!menu?.days?.length) {
    return null;
  }

  // Get today's menu or the first available day
  const today = new Date().getDay(); // 0 = Sunday, 1 = Monday, etc.
  const todayMenu = menu.days[today - 1] || menu.days[0]; // Adjust for Monday = index 0

  return (
    <section id="daily-menu" className="py-20 px-4 bg-gradient-subtle relative">
      {/* Decorative elements */}
      <BotanicalDecoration 
        variant="flower" 
        className="absolute top-10 left-10 w-24 h-24 text-accent/10" 
      />
      <BotanicalDecoration 
        variant="leaf" 
        className="absolute bottom-10 right-10 w-20 h-20 text-primary/10" 
      />

      <div className="container mx-auto max-w-6xl">
        {/* Title with botanical decoration */}
        <div className="text-center mb-16 relative">
          <BotanicalDecoration 
            variant="vine" 
            className="w-64 h-8 mx-auto mb-4 text-accent/20" 
          />
          <h2 className="text-5xl md:text-6xl font-caveat font-bold text-primary mb-3">
            {language === "de" ? "Menu del Giorno" : "Daily Menu"}
          </h2>
          <p className="text-xl font-lora text-muted-foreground">
            {menu.period}
          </p>
        </div>

        {/* Daily menu cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <DailyMenuCard
            title={language === "de" ? "Suppe" : "Soup"}
            items={[todayMenu.soup[language]]}
          />
          <DailyMenuCard
            title={language === "de" ? "Grünes Menü" : "Green Menu"}
            items={[
              todayMenu.green[language],
              ...(todayMenu.greenNote ? [todayMenu.greenNote[language]] : [])
            ]}
          />
          <DailyMenuCard
            title={language === "de" ? "Blaues Menü" : "Blue Menu"}
            items={[
              todayMenu.blue[language],
              ...(todayMenu.blueNote ? [todayMenu.blueNote[language]] : [])
            ]}
          />
        </div>

        {/* View full menu link */}
        <div className="text-center mt-12">
          <a
            href="#full-menu"
            className="inline-block font-lora text-lg text-primary hover:text-accent transition-colors underline decoration-2 underline-offset-4"
          >
            {language === "de" 
              ? "→ Komplettes Wochenmenü ansehen" 
              : "→ View complete weekly menu"}
          </a>
        </div>
      </div>
    </section>
  );
};
