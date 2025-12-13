import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { klassikerMenu } from "@/data/klassikerData";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Leaf, Coffee, Salad, UtensilsCrossed, ChevronDown } from "lucide-react";
import { useState } from "react";
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "bowl": return <UtensilsCrossed className="w-3.5 h-3.5" />;
    case "soup": return <Coffee className="w-3.5 h-3.5" />;
    case "salad": return <Salad className="w-3.5 h-3.5" />;
    case "drink": return <Leaf className="w-3.5 h-3.5" />;
    default: return <UtensilsCrossed className="w-3.5 h-3.5" />;
  }
};

export const MenuSection = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  
  // Get today's day name
  const today = new Date();
  const dayNames = {
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  const todayName = dayNames[language][today.getDay()];
  
  // Find today's menu
  const todayMenu = menu.days.find(day => day.day[language] === todayName);

  return (
    <section id="menu" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          
          {/* BLOCK 1: Daily Dishes */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground mb-3">
                {language === "de" ? "Heute frisch gekocht" : "Freshly cooked today"}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-work">
                {language === "de" 
                  ? "Was heute da ist, bestimmt das Gericht." 
                  : "What's here today determines the dish."}
              </p>
            </div>
            
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-daily/50 rounded-xl p-5 animate-pulse">
                    <Skeleton className="h-5 w-24 mb-3" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                ))}
              </div>
            ) : todayMenu ? (
              <div className="space-y-4">
                {/* Soup */}
                {todayMenu.soup[language] && (
                  <div className="bg-daily rounded-xl p-5 animate-fade-in">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs font-work">
                        {language === "de" ? "Heute" : "Today"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-work">
                        {language === "de" ? "Suppe" : "Soup"}
                      </span>
                    </div>
                    <p className="text-foreground font-work text-sm md:text-base leading-relaxed mb-2">
                      {todayMenu.soup[language]}
                    </p>
                    <p className="text-accent font-semibold text-sm font-work">5,90</p>
                  </div>
                )}
                
                {/* Green Dish */}
                {todayMenu.green[language] && (
                  <div className="bg-daily rounded-xl p-5 animate-fade-in" style={{ animationDelay: "100ms" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs font-work">
                        {language === "de" ? "Heute" : "Today"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-work">
                        {language === "de" ? "Grünes Gericht" : "Green Dish"}
                      </span>
                    </div>
                    <p className="text-foreground font-work text-sm md:text-base leading-relaxed mb-2">
                      {todayMenu.green[language]}
                    </p>
                    <p className="text-accent font-semibold text-sm font-work">11,90</p>
                  </div>
                )}
                
                {/* Blue Dish */}
                {todayMenu.blue[language] && (
                  <div className="bg-daily rounded-xl p-5 animate-fade-in" style={{ animationDelay: "200ms" }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-accent/20 text-accent border-accent/30 text-xs font-work">
                        {language === "de" ? "Heute" : "Today"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-work">
                        {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                      </span>
                    </div>
                    <p className="text-foreground font-work text-sm md:text-base leading-relaxed mb-2">
                      {todayMenu.blue[language]}
                    </p>
                    <p className="text-accent font-semibold text-sm font-work">11,90</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-daily/50 rounded-xl p-6 text-center">
                <p className="text-muted-foreground font-work text-sm">
                  {language === "de" 
                    ? "Heute ist Ruhetag. Wir freuen uns, dich bald wiederzusehen." 
                    : "Today is a rest day. We look forward to seeing you soon."}
                </p>
              </div>
            )}
          </div>
          
          {/* Weekly Menu Accordion */}
          <div className="my-10">
            <Collapsible open={weeklyOpen} onOpenChange={setWeeklyOpen}>
              <CollapsibleTrigger className="w-full group">
                <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground transition-colors">
                  <span className="font-cormorant text-base md:text-lg italic">
                    {language === "de" ? "Ein Blick auf diese Woche" : "A look at this week"}
                  </span>
                  <ChevronDown 
                    className={`w-4 h-4 transition-transform duration-200 ${weeklyOpen ? "rotate-180" : ""}`} 
                  />
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                <div className="pt-4 pb-2 space-y-6">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-muted-foreground text-center font-work mb-4">
                        {menu.period}
                      </p>
                      {menu.days.map((day, index) => (
                        <div key={index} className="border-b border-border/30 pb-4 last:border-0">
                          <h4 className="font-cormorant text-base font-semibold text-foreground mb-2">
                            {day.day[language]}
                          </h4>
                          <div className="space-y-2 text-sm font-work">
                            {day.soup[language] && (
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <span className="text-muted-foreground text-xs">
                                    {language === "de" ? "Suppe" : "Soup"}:
                                  </span>
                                  <p className="text-foreground/90">{day.soup[language]}</p>
                                </div>
                                <span className="text-accent text-xs font-medium shrink-0">5,90</span>
                              </div>
                            )}
                            {day.green[language] && (
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <span className="text-muted-foreground text-xs">
                                    {language === "de" ? "Grün" : "Green"}:
                                  </span>
                                  <p className="text-foreground/90">{day.green[language]}</p>
                                </div>
                                <span className="text-accent text-xs font-medium shrink-0">11,90</span>
                              </div>
                            )}
                            {day.blue[language] && (
                              <div className="flex justify-between items-start gap-2">
                                <div>
                                  <span className="text-muted-foreground text-xs">
                                    {language === "de" ? "Blau" : "Blue"}:
                                  </span>
                                  <p className="text-foreground/90">{day.blue[language]}</p>
                                </div>
                                <span className="text-accent text-xs font-medium shrink-0">11,90</span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          {/* BLOCK 2: Visual Transition */}
          <div className="text-center py-10 md:py-14">
            <p className="font-cormorant text-lg md:text-xl text-muted-foreground/70 italic leading-relaxed whitespace-pre-line">
              {language === "de" 
                ? "Nicht alles bleibt.\nUnd das ist Teil davon." 
                : "Not everything stays.\nAnd that's part of it."}
            </p>
          </div>
          
          {/* BLOCK 3: Fixed Menu (Klassiker) */}
          <div>
            <div className="text-center mb-8">
              <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground mb-3">
                {klassikerMenu.title[language]}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-work">
                {klassikerMenu.subtitle[language]}
              </p>
            </div>
            
            <div className="space-y-4">
              {klassikerMenu.items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="bg-klassiker rounded-xl p-5 border border-border/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-accent">
                          {getCategoryIcon(item.category)}
                        </span>
                        <h3 className="font-cormorant text-lg font-semibold text-foreground">
                          {item.name[language]}
                        </h3>
                      </div>
                      <p className="text-muted-foreground font-work text-sm leading-relaxed">
                        {item.description[language]}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        {item.isVegan && (
                          <span className="text-xs text-green-600 dark:text-green-400 font-work">
                            vegan
                          </span>
                        )}
                        {item.isGlutenFree && (
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-work">
                            glutenfrei
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
