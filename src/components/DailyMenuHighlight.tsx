import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
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

      <div className="container mx-auto max-w-4xl relative z-[1]">
        {/* Title with day and period */}
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-4xl md:text-6xl font-caveat font-bold text-primary mb-3">
            {language === "de" ? "Tagesmenü" : "Daily Menu"}
          </h2>
          <p className="text-base md:text-lg font-lora text-muted-foreground">
            {todayMenu.day[language]} · {menu.period}
          </p>
        </div>

        {/* Single card with all sections for today */}
        <div className="bg-card border border-border/60 rounded-3xl shadow-soft p-6 md:p-10 space-y-8">
          {/* Soup */}
          <div className="pb-6 border-b border-border/50">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-2">
              {language === "de" ? "Suppe des Tages" : "Soup of the Day"}
            </p>
            <p className="font-lora text-base md:text-lg text-foreground leading-relaxed">
              {todayMenu.soup[language]}
            </p>
          </div>

          {/* Green dish */}
          <div className="pb-6 border-b border-border/50">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">
              {language === "de" ? "Tagesgericht Grün" : "Daily Dish Green"}
            </p>
            <p className="font-lora text-base md:text-lg text-foreground leading-relaxed">
              {todayMenu.green[language]}
            </p>
          </div>

          {/* Blue dish */}
          {todayMenu.blue && (todayMenu.blue.de || todayMenu.blue.en) && (
            <div className="pb-6 border-b border-border/40">
              <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                {language === "de" ? "Tagesgericht Blau" : "Daily Dish Blue"}
              </p>
              <p className="font-lora text-base md:text-lg text-foreground leading-relaxed">
                {todayMenu.blue[language] || todayMenu.blue.de || todayMenu.blue.en}
              </p>
            </div>
          )}

          {/* Prices */}
          <div className="pt-2 md:pt-4">
            <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-1">
              {language === "de" ? "Preise" : "Prices"}
            </p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
              {language === "de"
                ? "Tagesgerichte 15,20 € · Suppe klein 4,50 € / groß 6,50 € · Bio-Weckerl 1,90 €"
                : "Daily dishes €15.20 · Soup small €4.50 / large €6.50 · Organic roll €1.90"}
            </p>
          </div>
        </div>

        {/* Photo Gallery link */}
        <div className="text-center mt-10">
          <a
            href="#food-gallery"
            className="inline-block font-lora text-lg text-primary hover:text-accent transition-colors underline decoration-2 underline-offset-4"
          >
            {language === "de"
              ? "→ Foto-Galerie ansehen"
              : "→ View photo gallery"}
          </a>
        </div>
      </div>
    </section>
  );
};
