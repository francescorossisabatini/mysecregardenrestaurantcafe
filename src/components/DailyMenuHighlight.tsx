import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Loader2 } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";
import { SpiritualAnimations } from "./SpiritualAnimations";
import foodGarden from "@/assets/food-garden.jpg";

export const DailyMenuHighlight = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  const { ref, isVisible } = useScrollReveal(0.2);

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
  const today = new Date().getDay();
  const dayIndex = today >= 1 && today <= 6 ? today - 1 : 0;
  const todayMenu = menu.days[dayIndex] || menu.days[0];

  return (
    <section 
      ref={ref as any}
      id="daily-menu" 
      className={`relative py-12 sm:py-16 md:py-20 overflow-hidden transition-opacity duration-700 ease-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${foodGarden})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay - lighter to see images better */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/75 to-background/80" />
      
      {/* Spiritual animations */}
      <SpiritualAnimations variant="leaves" className="opacity-100" />

      <div className="container mx-auto max-w-6xl px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-caveat font-bold text-primary mb-2 md:mb-3">
            {language === "de" ? "Tagesmenü" : "Daily Menu"}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-lora text-muted-foreground">
            {todayMenu.day[language]} · {menu.period}
          </p>
          <p className="text-sm sm:text-base text-muted-foreground mt-2">
            {language === "de"
              ? "Jeden Tag frisch für Sie zubereitet"
              : "Freshly prepared for you every day"}
          </p>
        </div>

        {/* Menu Cards Grid */}
        <div className={`grid gap-4 sm:gap-5 md:gap-6 max-w-3xl mx-auto transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {/* Soup Card */}
          <div className="bg-[#F5F1E3] rounded-xl p-5 sm:p-6 md:p-7 shadow-md hover:shadow-lg transition-all border-2 border-primary/10">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <BotanicalDecoration variant="leaf" className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-caveat font-bold text-primary mb-1">
                  {language === "de" ? "Suppe des Tages" : "Soup of the Day"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
                  {language === "de" ? "Vegan & Glutenfrei" : "Vegan & Gluten-Free"}
                </p>
              </div>
            </div>
            <p className="font-lora text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
              {todayMenu.soup[language]}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-3 pt-3 border-t border-primary/20">
              {language === "de"
                ? "Klein 4,50 € / Groß 6,50 € · Bio-Weckerl +1,90 €"
                : "Small €4.50 / Large €6.50 · Organic roll +€1.90"}
            </p>
          </div>

          {/* Green Dish Card */}
          <div className="bg-[#F5F1E3] rounded-xl p-5 sm:p-6 md:p-7 shadow-md hover:shadow-lg transition-all border-2 border-accent/20">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                <BotanicalDecoration variant="flower" className="w-6 h-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-caveat font-bold text-accent mb-1">
                  {language === "de" ? "Tagesgericht Grün" : "Daily Dish Green"}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
                  {language === "de" ? "Vegan & Glutenfrei" : "Vegan & Gluten-Free"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg sm:text-xl font-bold text-accent">15,20 €</p>
              </div>
            </div>
            <p className="font-lora text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
              {todayMenu.green[language]}
            </p>
          </div>

          {/* Blue Dish Card (if available) */}
          {todayMenu.blue && (todayMenu.blue.de || todayMenu.blue.en) && (
            <div className="bg-[#F5F1E3] rounded-xl p-5 sm:p-6 md:p-7 shadow-md hover:shadow-lg transition-all border-2 border-primary/20">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <BotanicalDecoration variant="flower" className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-caveat font-bold text-primary mb-1">
                    {language === "de" ? "Tagesgericht Blau" : "Daily Dish Blue"}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">
                    {language === "de"
                      ? "Kann Milch, Ei oder Gluten enthalten"
                      : "May contain dairy, egg or gluten"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg sm:text-xl font-bold text-primary">15,20 €</p>
                </div>
              </div>
              <p className="font-lora text-sm sm:text-base md:text-lg text-foreground leading-relaxed">
                {todayMenu.blue[language]}
              </p>
              {todayMenu.blueNote && todayMenu.blueNote[language] && (
                <p className="text-xs sm:text-sm text-muted-foreground mt-3 italic">
                  {todayMenu.blueNote[language]}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 sm:mt-10">
          <p className="text-sm sm:text-base text-muted-foreground">
            {language === "de"
              ? "Alle Gerichte werden mit frischen Bio-Zutaten zubereitet"
              : "All dishes are prepared with fresh organic ingredients"}
          </p>
        </div>
      </div>
    </section>
  );
};
