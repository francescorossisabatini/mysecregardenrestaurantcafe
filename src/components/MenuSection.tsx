import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { klassikerMenu } from "@/data/klassikerData";
import {
  getTodayHoliday,
  getHolidayForDate,
  getHolidayForDayName,
  getDateForMenuDay,
  isSundayByName,
} from "@/data/holidaysData";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

// Parse dietary labels from dish description text
const parseDietaryLabels = (text: string): { isVegan: boolean; isGlutenFree: boolean; isBio: boolean } => {
  const lowerText = text.toLowerCase();
  return {
    isVegan: lowerText.includes("vegan"),
    isGlutenFree: lowerText.includes("glutenfrei") || lowerText.includes("gluten-free") || lowerText.includes("gluten free"),
    isBio: lowerText.includes("bio"),
  };
};

// Render dietary badges dynamically
const DietaryBadges = ({ text, language }: { text: string; language: "de" | "en" }) => {
  const labels = parseDietaryLabels(text);
  
  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      {labels.isVegan && (
        <span className="text-xs text-green-600 dark:text-green-400 font-work">
          vegan
        </span>
      )}
      {labels.isGlutenFree && (
        <span className="text-xs text-amber-600 dark:text-amber-400 font-work">
          {language === "de" ? "glutenfrei" : "gluten-free"}
        </span>
      )}
      {labels.isBio && (
        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-work">
          bio
        </span>
      )}
    </div>
  );
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
  
  // Check if it's Sunday (day 0)
  const isSunday = today.getDay() === 0;
  
  // Check if today is a holiday
  const todayHoliday = getTodayHoliday();
  
  // Check if today's menu has any data
  const hasMenuData = todayMenu && (
    (todayMenu.soup?.de?.trim() || todayMenu.soup?.en?.trim()) ||
    (todayMenu.green?.de?.trim() || todayMenu.green?.en?.trim()) ||
    (todayMenu.blue?.de?.trim() || todayMenu.blue?.en?.trim())
  );
  
  // Determine if restaurant is closed (Sunday, holiday, or no menu data)
  const isClosed = isSunday || todayHoliday !== null || !hasMenuData;
  const isNoMenuDay = !isSunday && !todayHoliday && !hasMenuData;
  
  // Get Monday's menu for Sunday preview
  const mondayMenu = menu.days.find(day => day.day.de === "Montag");

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
            ) : !isClosed && todayMenu ? (
              <div className="space-y-4">
                {/* Soup */}
                {todayMenu.soup[language] && (
                  <div className="bg-daily rounded-xl p-5">
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
                    <DietaryBadges text={todayMenu.soup[language]} language={language} />
                    <p className="text-accent font-semibold text-sm font-work mt-2">5,90</p>
                  </div>
                )}
                
                {/* Green Dish */}
                {todayMenu.green[language] && (
                  <div className="bg-daily rounded-xl p-5">
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
                    <DietaryBadges text={todayMenu.green[language]} language={language} />
                    <p className="text-accent font-semibold text-sm font-work mt-2">11,90</p>
                  </div>
                )}
                
                {/* Blue Dish */}
                {todayMenu.blue[language] && (
                  <div className="bg-daily rounded-xl p-5">
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
                    <DietaryBadges text={todayMenu.blue[language]} language={language} />
                    <p className="text-accent font-semibold text-sm font-work mt-2">11,90</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-daily/50 rounded-xl p-8 text-center space-y-6">
                {/* Holiday, Sunday, or no-menu rest message */}
                <div className="space-y-3">
                  <p className="font-cormorant text-2xl md:text-3xl text-foreground/80 italic">
                    {todayHoliday 
                      ? todayHoliday.name[language]
                      : isNoMenuDay
                        ? (language === "de" ? "Heute geschlossen" : "Closed Today")
                        : (language === "de" ? "Sonntag — Tag der Ruhe" : "Sunday — Day of Rest")}
                  </p>
                  <p className="text-muted-foreground font-work text-sm max-w-md mx-auto">
                    {todayHoliday 
                      ? todayHoliday.message[language]
                      : isNoMenuDay
                        ? (language === "de" 
                            ? "Heute haben wir leider geschlossen. Wir freuen uns, dich bald wiederzusehen." 
                            : "We are closed today. We look forward to seeing you soon.")
                        : (language === "de" 
                            ? "Wir nehmen uns heute Zeit für Stille und Erholung. Morgen öffnen wir wieder die Türen für dich." 
                            : "We take time today for stillness and renewal. Tomorrow we open our doors again for you.")}
                  </p>
                  {(todayHoliday || isNoMenuDay) && (
                    <p className="text-muted-foreground/70 font-work text-xs mt-2">
                      {language === "de" 
                        ? "Heute haben wir geschlossen." 
                        : "We are closed today."}
                    </p>
                  )}
                </div>
                
                {/* Monday preview - only on Sundays */}
                {isSunday && !todayHoliday && mondayMenu && (
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-work mb-4">
                      {language === "de" ? "Vorschau auf Montag" : "Preview of Monday"}
                    </p>
                    <div className="space-y-3 text-left">
                      {mondayMenu.soup[language] && (
                        <div className="bg-background/50 rounded-lg p-3">
                          <span className="text-xs text-accent font-work">
                            {language === "de" ? "Suppe" : "Soup"}
                          </span>
                          <p className="text-foreground/70 font-work text-sm mt-1">
                            {mondayMenu.soup[language]}
                          </p>
                        </div>
                      )}
                      {mondayMenu.green[language] && (
                        <div className="bg-background/50 rounded-lg p-3">
                          <span className="text-xs text-accent font-work">
                            {language === "de" ? "Grünes Gericht" : "Green Dish"}
                          </span>
                          <p className="text-foreground/70 font-work text-sm mt-1 line-clamp-2">
                            {mondayMenu.green[language]}
                          </p>
                        </div>
                      )}
                      {mondayMenu.blue[language] && (
                        <div className="bg-background/50 rounded-lg p-3">
                          <span className="text-xs text-accent font-work">
                            {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                          </span>
                          <p className="text-foreground/70 font-work text-sm mt-1 line-clamp-2">
                            {mondayMenu.blue[language]}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Weekly Menu Accordion */}
          <div className="my-10">
            <Collapsible open={weeklyOpen} onOpenChange={setWeeklyOpen}>
              <CollapsibleTrigger className="w-full group">
                <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground transition-colors">
                  <span className="font-cormorant text-base md:text-lg italic">
                    {isClosed 
                      ? (language === "de" ? "Was dich nächste Woche erwartet" : "What awaits you next week")
                      : (language === "de" ? "Ein Blick auf diese Woche" : "A look at this week")}
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
                      {menu.days.map((day, index) => {
                        // Prefer date-based matching using the menu period (so we can mark *next* week holidays correctly)
                        const dayDate = getDateForMenuDay(menu.period, index);
                        const dayHoliday = dayDate ? getHolidayForDate(dayDate) : getHolidayForDayName(day.day.de);
                        const isDaySunday = dayDate ? dayDate.getDay() === 0 : isSundayByName(day.day.de);
                        const isDayClosed = dayHoliday || isDaySunday;

                        
                        return (
                          <div key={index} className="border-b border-border/30 pb-4 last:border-0">
                            <h4 className="font-cormorant text-base font-semibold text-foreground mb-2">
                              {day.day[language]}
                            </h4>
                            
                            {isDayClosed ? (
                              // Show holiday or Sunday message instead of food
                              <div className="text-center py-3">
                                <p className="font-cormorant text-base text-foreground/70 italic">
                                  {dayHoliday 
                                    ? dayHoliday.name[language]
                                    : (language === "de" ? "Tag der Ruhe" : "Day of Rest")}
                                </p>
                                <p className="text-muted-foreground text-xs font-work mt-1">
                                  {language === "de" ? "Geschlossen" : "Closed"}
                                </p>
                              </div>
                            ) : (
                              // Show normal menu
                              <div className="space-y-2 text-sm font-work">
                                {day.soup[language] && (
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <span className="text-muted-foreground text-xs">
                                        {language === "de" ? "Suppe" : "Soup"}:
                                      </span>
                                      <p className="text-foreground/90">{day.soup[language]}</p>
                                      <DietaryBadges text={day.soup[language]} language={language} />
                                    </div>
                                    <span className="text-accent text-xs font-medium shrink-0">5,90</span>
                                  </div>
                                )}
                                {day.green[language] && (
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <span className="text-muted-foreground text-xs">
                                        {language === "de" ? "Grün" : "Green"}:
                                      </span>
                                      <p className="text-foreground/90">{day.green[language]}</p>
                                      <DietaryBadges text={day.green[language]} language={language} />
                                    </div>
                                    <span className="text-accent text-xs font-medium shrink-0">11,90</span>
                                  </div>
                                )}
                                {day.blue[language] && (
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <span className="text-muted-foreground text-xs">
                                        {language === "de" ? "Blau" : "Blue"}:
                                      </span>
                                      <p className="text-foreground/90">{day.blue[language]}</p>
                                      <DietaryBadges text={day.blue[language]} language={language} />
                                    </div>
                                    <span className="text-accent text-xs font-medium shrink-0">11,90</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
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
            
            <div className="space-y-8">
              {klassikerMenu.categories.map((category) => (
                <div key={category.id}>
                  <h3 className="font-cormorant text-lg font-medium text-foreground/80 mb-4 border-b border-border/30 pb-2">
                    {category.name[language]}
                  </h3>
                  <div className="space-y-3">
                    {category.items.map((item) => (
                      <div 
                        key={item.id} 
                        className="bg-klassiker rounded-xl p-4 border border-border/20"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="font-cormorant text-base font-semibold text-foreground mb-1">
                              {item.name[language]}
                            </h4>
                            <p className="text-muted-foreground font-work text-sm leading-relaxed">
                              {item.description[language]}
                            </p>
                            {/* Dietary labels - only if present */}
                            {(item.isVegan || item.isGlutenFree || item.isBio) && (
                              <div className="flex items-center gap-2 mt-2">
                                {item.isVegan && (
                                  <span className="text-xs text-green-600 dark:text-green-400 font-work">
                                    vegan
                                  </span>
                                )}
                                {item.isGlutenFree && (
                                  <span className="text-xs text-amber-600 dark:text-amber-400 font-work">
                                    {language === "de" ? "glutenfrei" : "gluten-free"}
                                  </span>
                                )}
                                {item.isBio && (
                                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-work">
                                    bio
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                          <span className="text-accent font-semibold text-sm font-work shrink-0">
                            {item.price}
                          </span>
                        </div>
                      </div>
                    ))}
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
