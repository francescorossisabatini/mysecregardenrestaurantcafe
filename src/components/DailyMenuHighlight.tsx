import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { Loader2 } from "lucide-react";
import { translatePeriod } from "@/lib/translatePeriod";
import { BotanicalDecoration } from "./BotanicalDecoration";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const DailyMenuHighlight = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const isMobile = useIsMobile();

  // Get today's index to start on
  const today = new Date().getDay();
  const startIndex = today >= 1 && today <= 6 ? today - 1 : 0;

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Start at today's menu (desktop only)
  useEffect(() => {
    if (api && menu?.days?.length && !isMobile) {
      api.scrollTo(startIndex, true);
    }
  }, [api, menu, startIndex, isMobile]);

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

  // Shared menu card component
  const MenuCard = ({ day, index, isToday }: { day: typeof menu.days[0]; index: number; isToday: boolean }) => (
    <div 
      className={`
        bg-card border rounded-2xl p-6 md:p-8 h-full transition-all duration-300
        ${isToday 
          ? 'border-primary/50 shadow-lg ring-2 ring-primary/20' 
          : 'border-border shadow-md'
        }
      `}
    >
      {/* Day Header */}
      <div className="text-center mb-6 pb-4 border-b border-border">
        <div className="flex items-center justify-center gap-2">
          <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary">
            {day.day[language]}
          </h3>
          {isToday && (
            <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full uppercase tracking-wide">
              {language === "de" ? "Heute" : "Today"}
            </span>
          )}
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-5">
        {/* Soup */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <BotanicalDecoration variant="leaf" className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wide">
              {language === "de" ? "Suppe" : "Soup"}
            </span>
          </div>
          <p className="font-lora text-sm text-foreground leading-relaxed">
            {day.soup[language]}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {language === "de" ? "Klein 4,5€ / Groß 6,5€" : "Small €4.5 / Large €6.5"}
          </p>
        </div>

        {/* Green Dish - WCAG compliant using primary instead of accent for text */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BotanicalDecoration variant="flower" className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                {language === "de" ? "Grün" : "Green"}
              </span>
            </div>
            <span className="text-sm font-bold text-foreground">15,2€</span>
          </div>
          <p className="font-lora text-sm text-foreground leading-relaxed">
            {day.green[language]}
          </p>
          {day.greenNote && day.greenNote[language] && (
            <p className="text-xs text-muted-foreground mt-1 italic">
              {day.greenNote[language]}
            </p>
          )}
        </div>

        {/* Blue Dish */}
        {day.blue && (day.blue.de || day.blue.en) && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <BotanicalDecoration variant="flower" className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary uppercase tracking-wide">
                  {language === "de" ? "Blau" : "Blue"}
                </span>
              </div>
              <span className="text-sm font-bold text-primary">15,2€</span>
            </div>
            <p className="font-lora text-sm text-foreground leading-relaxed">
              {day.blue[language]}
            </p>
            {day.blueNote && day.blueNote[language] && (
              <p className="text-xs text-muted-foreground mt-1 italic">
                {day.blueNote[language]}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id="daily-menu" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary mb-4">
            {language === "de" ? "Wochenmenü" : "Weekly Menu"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground">
            {translatePeriod(menu.period, language)}
          </p>
        </div>

        {/* Mobile: Vertical Stack */}
        {isMobile ? (
          <div className="space-y-6">
            {menu.days.map((day, index) => {
              const isToday = index === startIndex;
              return (
                <MenuCard key={index} day={day} index={index} isToday={isToday} />
              );
            })}
          </div>
        ) : (
          /* Desktop: Carousel */
          <div className="relative">
            <Carousel
              setApi={setApi}
              opts={{
                align: "center",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {menu.days.map((day, index) => {
                  const isToday = index === startIndex;
                  return (
                    <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                      <div 
                        className={`
                          bg-card border rounded-2xl p-6 md:p-8 h-full
                          transition-all duration-500 ease-out
                          ${isToday ? 'border-primary/50' : 'border-border'}
                          ${current === index 
                            ? 'shadow-xl scale-100 opacity-100' 
                            : 'shadow-md scale-95 opacity-70'
                          }
                        `}
                      >
                        {/* Day Header */}
                        <div className="text-center mb-6 pb-4 border-b border-border">
                          <div className="flex items-center justify-center gap-2">
                            <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary">
                              {day.day[language]}
                            </h3>
                            {isToday && (
                              <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full uppercase tracking-wide">
                                {language === "de" ? "Heute" : "Today"}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="space-y-5">
                          {/* Soup */}
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <BotanicalDecoration variant="leaf" className="w-5 h-5 text-primary" />
                              <span className="text-sm font-medium text-primary uppercase tracking-wide">
                                {language === "de" ? "Suppe" : "Soup"}
                              </span>
                            </div>
                            <p className="font-lora text-sm text-foreground leading-relaxed">
                              {day.soup[language]}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {language === "de" ? "Klein 4,5€ / Groß 6,5€" : "Small €4.5 / Large €6.5"}
                            </p>
                          </div>

                          {/* Green Dish */}
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <BotanicalDecoration variant="flower" className="w-5 h-5 text-accent" />
                                <span className="text-sm font-medium text-accent uppercase tracking-wide">
                                  {language === "de" ? "Grün" : "Green"}
                                </span>
                              </div>
                              <span className="text-sm font-bold text-accent">15,2€</span>
                            </div>
                            <p className="font-lora text-sm text-foreground leading-relaxed">
                              {day.green[language]}
                            </p>
                            {day.greenNote && day.greenNote[language] && (
                              <p className="text-xs text-muted-foreground mt-1 italic">
                                {day.greenNote[language]}
                              </p>
                            )}
                          </div>

                          {/* Blue Dish */}
                          {day.blue && (day.blue.de || day.blue.en) && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <BotanicalDecoration variant="flower" className="w-5 h-5 text-primary" />
                                  <span className="text-sm font-medium text-primary uppercase tracking-wide">
                                    {language === "de" ? "Blau" : "Blue"}
                                  </span>
                                </div>
                                <span className="text-sm font-bold text-primary">15,2€</span>
                              </div>
                              <p className="font-lora text-sm text-foreground leading-relaxed">
                                {day.blue[language]}
                              </p>
                              {day.blueNote && day.blueNote[language] && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {day.blueNote[language]}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>

              {/* Navigation Arrows */}
              <CarouselPrevious className="-left-12 w-12 h-12 bg-card border-border hover:bg-primary hover:text-primary-foreground transition-colors" />
              <CarouselNext className="-right-12 w-12 h-12 bg-card border-border hover:bg-primary hover:text-primary-foreground transition-colors" />
            </Carousel>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label={language === "de" ? "Wochentage" : "Days of the week"}>
              {menu.days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  role="tab"
                  aria-selected={current === index}
                  aria-label={language === "de" ? day.day.de : day.day.en}
                  className={`
                    w-2 h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50
                    ${current === index 
                      ? 'w-8 bg-primary' 
                      : 'bg-muted-foreground/60 hover:bg-muted-foreground/80'
                    }
                  `}
                />
              ))}
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center mt-12">
          <p className="text-base md:text-lg font-lora text-muted-foreground">
            {language === "de"
              ? "Alle Gerichte werden mit frischen Bio-Zutaten zubereitet"
              : "All dishes are prepared with fresh organic ingredients"}
          </p>
        </div>
      </div>
    </section>
  );
};
