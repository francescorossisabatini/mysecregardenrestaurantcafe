import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { Loader2 } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";
import foodBowlImg from "@/assets/food-bowl-real.jpg";

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
    <section id="daily-menu" className="relative overflow-hidden">
      {/* Split layout: Image on left, content on right (desktop) */}
      <div className="container mx-auto max-w-7xl px-0">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side: Large food photo */}
          <div className="relative h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${foodBowlImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20" />
            
            {/* Decorative elements on photo */}
            <BotanicalDecoration
              variant="flower"
              className="absolute top-10 left-10 w-24 h-24 text-background/20"
            />
          </div>

          {/* Right side: Menu content */}
          <div className="relative bg-background py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-12 flex flex-col justify-center">
            <BotanicalDecoration
              variant="leaf"
              className="absolute top-6 right-6 md:top-10 md:right-10 w-16 h-16 md:w-20 md:h-20 text-primary/10"
            />

            <div className="relative z-[1] max-w-xl mx-auto w-full">
              {/* Title with day and period */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-caveat font-bold text-primary mb-2 md:mb-3">
                  {language === "de" ? "Tagesmenü" : "Daily Menu"}
                </h2>
                <p className="text-sm sm:text-base md:text-lg font-lora text-muted-foreground">
                  {todayMenu.day[language]} · {menu.period}
                </p>
              </div>

              {/* Menu items */}
              <div className="space-y-4 sm:space-y-6">
                {/* Soup */}
                <div className="pb-4 sm:pb-5 border-b border-border/50">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground mb-1.5 sm:mb-2">
                    {language === "de" ? "Suppe des Tages" : "Soup of the Day"}
                  </p>
                  <p className="font-lora text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
                    {todayMenu.soup[language]}
                  </p>
                </div>

                {/* Green dish */}
                <div className="pb-4 sm:pb-5 border-b border-border/50">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-accent mb-1.5 sm:mb-2">
                    {language === "de" ? "Tagesgericht Grün" : "Daily Dish Green"}
                  </p>
                  <p className="font-lora text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
                    {todayMenu.green[language]}
                  </p>
                </div>

                {/* Blue dish */}
                {todayMenu.blue && (todayMenu.blue.de || todayMenu.blue.en) && (
                  <div className="pb-4 sm:pb-5 border-b border-border/40">
                    <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-primary mb-1.5 sm:mb-2">
                      {language === "de" ? "Tagesgericht Blau" : "Daily Dish Blue"}
                    </p>
                    <p className="font-lora text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
                      {todayMenu.blue[language] || todayMenu.blue.de || todayMenu.blue.en}
                    </p>
                  </div>
                )}

                {/* Prices */}
                <div className="pt-2 sm:pt-3">
                  <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-muted-foreground mb-1">
                    {language === "de" ? "Preise" : "Prices"}
                  </p>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">
                    {language === "de"
                      ? "Tagesgerichte 15,20 € · Suppe klein 4,50 € / groß 6,50 € · Bio-Weckerl 1,90 €"
                      : "Daily dishes €15.20 · Soup small €4.50 / large €6.50 · Organic roll €1.90"}
                  </p>
                </div>
              </div>

              {/* Photo Gallery link */}
              <div className="mt-6 sm:mt-8">
                <a
                  href="#food-gallery"
                  className="inline-block font-lora text-sm sm:text-base text-primary hover:text-accent transition-colors underline decoration-2 underline-offset-4"
                >
                  {language === "de"
                    ? "→ Foto-Galerie ansehen"
                    : "→ View photo gallery"}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
