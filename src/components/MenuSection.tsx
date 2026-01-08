import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { klassikerMenu, KlassikerItem } from "@/data/klassikerData";
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
import { useState, useMemo } from "react";

// Parse dietary labels from dish description text
const parseDietaryLabels = (text: string): { isVegan: boolean; isGlutenFree: boolean; isBio: boolean } => {
  const lowerText = text.toLowerCase();
  return {
    isVegan: lowerText.includes("vegan"),
    isGlutenFree: lowerText.includes("glutenfrei") || lowerText.includes("gluten-free") || lowerText.includes("gluten free"),
    isBio: lowerText.includes("bio"),
  };
};

// Treat spreadsheet error placeholders as empty (e.g. "#VALUE" / "#VALUE!")
const isValidMenuText = (text?: string) => {
  const t = (text ?? "").trim();
  if (!t) return false;
  if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(t)) return false;
  return true;
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

// Curated selection IDs for the compact drinks view
const CURATED_DRINK_IDS = [
  "indian-chai-latte",
  "matcha-latte", 
  "kurkuma-latte",
  "cappuccino",
  "espresso",
  "flat-white",
  "pumpkin-spiced-latte", // signature/seasonal
  "glueh-kombucha", // signature/seasonal
  "mineral-water",
  "cola",
];

export const MenuSection = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  const [weeklyOpen, setWeeklyOpen] = useState(false);
  const [drinksExpanded, setDrinksExpanded] = useState(false);
  
  // Get today's day name
  const today = new Date();
  const currentHour = today.getHours();
  const dayNames = {
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  const todayName = dayNames[language][today.getDay()];
  
  // After 19:00, show next day's menu as preview
  const isAfterClosing = currentHour >= 19;
  
  // Find today's menu
  const todayMenu = menu.days.find(day => day.day[language] === todayName);
  
  // Check if it's Sunday (day 0)
  const isSunday = today.getDay() === 0;
  
  // Check if today is a holiday
  const todayHoliday = getTodayHoliday();
  
  // Check if today's menu has any data
  const hasMenuData = !!todayMenu && (
    isValidMenuText(todayMenu.soup?.de) || isValidMenuText(todayMenu.soup?.en) ||
    isValidMenuText(todayMenu.green?.de) || isValidMenuText(todayMenu.green?.en) ||
    isValidMenuText(todayMenu.blue?.de) || isValidMenuText(todayMenu.blue?.en)
  );
  
  // Determine if restaurant is closed (Sunday, holiday, no menu data, or after 19:00)
  const isClosed = isSunday || todayHoliday !== null || !hasMenuData || isAfterClosing;
  const isNoMenuDay = !isSunday && !todayHoliday && !hasMenuData && !isAfterClosing;
  
  // Show next day preview if closed OR after 19:00
  const showNextDayPreview = isClosed || isAfterClosing;
  
  // Get next day's menu for closed day preview
  const getNextDayMenu = () => {
    const dayNamesDE = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
    const nextDayIndex = (today.getDay() + 1) % 7;
    const nextDayNameDE = dayNamesDE[nextDayIndex];
    return menu.days.find(day => day.day.de === nextDayNameDE);
  };
  
  const nextDayMenu = getNextDayMenu();
  const nextDayName = {
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"][(today.getDay() + 1) % 7],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][(today.getDay() + 1) % 7]
  };

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
                {isValidMenuText(todayMenu.soup[language]) && (
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
                    <p className="text-accent font-semibold text-sm font-work mt-2">6,90</p>
                  </div>
                )}

                {/* Green Dish */}
                {isValidMenuText(todayMenu.green[language]) && (
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
                    <p className="text-accent font-semibold text-sm font-work mt-2">15,90</p>
                  </div>
                )}

                {/* Blue Dish */}
                {isValidMenuText(todayMenu.blue[language]) && (
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
                    <p className="text-accent font-semibold text-sm font-work mt-2">15,90</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-daily/50 rounded-xl p-8 text-center space-y-6">
                {/* Holiday, Sunday, after closing, or no-menu rest message */}
                <div className="space-y-3">
                  <p className="font-cormorant text-2xl md:text-3xl text-foreground/80 italic">
                    {todayHoliday 
                      ? todayHoliday.name[language]
                      : isAfterClosing
                        ? (language === "de" ? "Für heute geschlossen" : "Closed for today")
                        : isNoMenuDay
                          ? (language === "de" ? "Heute geschlossen" : "Closed Today")
                          : (language === "de" ? "Sonntag — Tag der Ruhe" : "Sunday — Day of Rest")}
                  </p>
                  <p className="text-muted-foreground font-work text-sm max-w-md mx-auto">
                    {todayHoliday 
                      ? todayHoliday.message[language]
                      : isAfterClosing
                        ? (language === "de" 
                            ? "Wir sind für heute geschlossen. Schau dir an, was morgen auf dich wartet." 
                            : "We are closed for today. See what awaits you tomorrow.")
                        : isNoMenuDay
                          ? (language === "de" 
                              ? "Heute haben wir leider geschlossen. Wir freuen uns, dich bald wiederzusehen." 
                              : "We are closed today. We look forward to seeing you soon.")
                          : (language === "de" 
                              ? "Wir nehmen uns heute Zeit für Stille und Erholung. Morgen öffnen wir wieder die Türen für dich." 
                              : "We take time today for stillness and renewal. Tomorrow we open our doors again for you.")}
                  </p>
                  {(todayHoliday || isNoMenuDay) && !isAfterClosing && (
                    <p className="text-muted-foreground/70 font-work text-xs mt-2">
                      {language === "de" 
                        ? "Heute haben wir geschlossen." 
                        : "We are closed today."}
                    </p>
                  )}
                </div>
                
                {/* Next day preview - when closed */}
                {isClosed && nextDayMenu && (
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground font-work mb-4">
                      {language === "de" ? `Vorschau auf ${nextDayName.de}` : `Preview of ${nextDayName.en}`}
                    </p>
                    <div className="space-y-3 text-left">
                      {isValidMenuText(nextDayMenu.soup[language]) && (
                        <div className="bg-background/50 rounded-lg p-3">
                          <span className="text-xs text-accent font-work">
                            {language === "de" ? "Suppe" : "Soup"}
                          </span>
                          <p className="text-foreground/70 font-work text-sm mt-1">
                            {nextDayMenu.soup[language]}
                          </p>
                        </div>
                      )}
                      {isValidMenuText(nextDayMenu.green[language]) && (
                        <div className="bg-background/50 rounded-lg p-3">
                          <span className="text-xs text-accent font-work">
                            {language === "de" ? "Grünes Gericht" : "Green Dish"}
                          </span>
                          <p className="text-foreground/70 font-work text-sm mt-1 line-clamp-2">
                            {nextDayMenu.green[language]}
                          </p>
                        </div>
                      )}
                      {isValidMenuText(nextDayMenu.blue[language]) && (
                        <div className="bg-background/50 rounded-lg p-3">
                          <span className="text-xs text-accent font-work">
                            {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                          </span>
                          <p className="text-foreground/70 font-work text-sm mt-1 line-clamp-2">
                            {nextDayMenu.blue[language]}
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

                        const hasDayMenuData =
                          isValidMenuText(day.soup?.de) || isValidMenuText(day.soup?.en) ||
                          isValidMenuText(day.green?.de) || isValidMenuText(day.green?.en) ||
                          isValidMenuText(day.blue?.de) || isValidMenuText(day.blue?.en);

                        const isDayClosed = !!dayHoliday || isDaySunday || !hasDayMenuData;

                        
                        return (
                          <div key={index} className="border-b border-border/30 pb-4 last:border-0">
                            <h4 className="font-cormorant text-base font-semibold text-foreground mb-2">
                              {day.day[language]}
                            </h4>
                            
                            {isDayClosed ? (
                              // Show holiday / Sunday / no-menu message instead of food
                              <div className="text-center py-3">
                                <p className="font-cormorant text-base text-foreground/70 italic">
                                  {dayHoliday
                                    ? dayHoliday.name[language]
                                    : isDaySunday
                                      ? (language === "de" ? "Tag der Ruhe" : "Day of Rest")
                                      : (language === "de" ? "Heute geschlossen" : "Closed")}
                                </p>
                                <p className="text-muted-foreground text-xs font-work mt-1">
                                  {language === "de" ? "Geschlossen" : "Closed"}
                                </p>
                              </div>
                            ) : (
                              // Show normal menu
                              <div className="space-y-2 text-sm font-work">
                                {isValidMenuText(day.soup[language]) && (
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <span className="text-muted-foreground text-xs">
                                        {language === "de" ? "Suppe" : "Soup"}:
                                      </span>
                                      <p className="text-foreground/90">{day.soup[language]}</p>
                                      <DietaryBadges text={day.soup[language]} language={language} />
                                    </div>
                                    <span className="text-accent text-xs font-medium shrink-0">6,90</span>
                                  </div>
                                )}
                                {isValidMenuText(day.green[language]) && (
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <span className="text-muted-foreground text-xs">
                                        {language === "de" ? "Grün" : "Green"}:
                                      </span>
                                      <p className="text-foreground/90">{day.green[language]}</p>
                                      <DietaryBadges text={day.green[language]} language={language} />
                                    </div>
                                    <span className="text-accent text-xs font-medium shrink-0">15,90</span>
                                  </div>
                                )}
                                {isValidMenuText(day.blue[language]) && (
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex-1">
                                      <span className="text-muted-foreground text-xs">
                                        {language === "de" ? "Blau" : "Blue"}:
                                      </span>
                                      <p className="text-foreground/90">{day.blue[language]}</p>
                                      <DietaryBadges text={day.blue[language]} language={language} />
                                    </div>
                                    <span className="text-accent text-xs font-medium shrink-0">15,90</span>
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
                ? "Nicht alles bleibt.\nUnd das gehört dazu." 
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
              <p className="text-muted-foreground/70 text-xs font-work mt-2 uppercase tracking-wide">
                {language === "de" ? "Preise in Euro" : "Prices in Euro"}
              </p>
            </div>
            
            <div className="space-y-8">
              {klassikerMenu.categories.map((category) => (
                <div key={category.id}>
                  <h3 className="font-cormorant text-lg font-medium text-foreground/80 mb-4 border-b border-border/30 pb-2">
                    {category.name[language]}
                  </h3>
                  
                  {/* Regular items (non-drinks categories) */}
                  {category.items && (
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div 
                          key={item.id} 
                          className={`bg-klassiker rounded-xl p-4 border border-border/20 ${item.isUnavailable ? 'opacity-50' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="font-cormorant text-base font-semibold text-foreground mb-1">
                                {item.name[language]}
                                {item.isUnavailable && (
                                  <span className="ml-2 text-xs font-work text-muted-foreground italic">
                                    ({language === "de" ? "derzeit nicht verfügbar" : "currently unavailable"})
                                  </span>
                                )}
                              </h4>
                              {item.description && (
                                <p className="text-muted-foreground font-work text-sm leading-relaxed">
                                  {item.description[language]}
                                </p>
                              )}
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
                              {item.price.replace(/,(\d)0$/g, ',$1').replace(/,(\d)0\s/g, ',$1 ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Drinks - curated selection with expand option */}
                  {category.subcategories && (
                    <div className="space-y-4">
                      {/* Curated selection (always visible) */}
                      <div className="space-y-2">
                        {category.subcategories
                          .flatMap(sub => sub.items)
                          .filter(item => CURATED_DRINK_IDS.includes(item.id))
                          .map((item: KlassikerItem) => (
                            <div 
                              key={item.id} 
                              className="flex items-start justify-between gap-3 py-2 border-b border-border/10 last:border-0"
                            >
                              <div className="flex-1">
                                <span className="font-work text-sm text-foreground">
                                  {item.name[language]}
                                </span>
                                {item.sizeNote && (
                                  <span className="text-muted-foreground text-xs ml-2">
                                    ({item.sizeNote})
                                  </span>
                                )}
                              </div>
                              <span className="text-accent font-medium text-sm font-work shrink-0">
                                {item.price}
                              </span>
                            </div>
                          ))}
                      </div>
                      
                      {/* Expand link */}
                      {!drinksExpanded && (
                        <button
                          onClick={() => setDrinksExpanded(true)}
                          className="text-muted-foreground text-sm font-work hover:text-foreground transition-colors"
                        >
                          {language === "de" ? "Alle Getränke anzeigen" : "Show all drinks"}
                        </button>
                      )}
                      
                      {/* Full drinks list (expanded) */}
                      {drinksExpanded && (
                        <div className="space-y-6 pt-4">
                          {category.subcategories.map((subcategory) => (
                            <div key={subcategory.id}>
                              <h4 className="font-work text-sm text-muted-foreground uppercase tracking-wide mb-3">
                                {subcategory.name[language]}
                                {subcategory.sizeNote && (
                                  <span className="ml-2 text-xs normal-case">({subcategory.sizeNote})</span>
                                )}
                              </h4>
                              <div className="space-y-2">
                                {subcategory.items
                                  .filter(item => !CURATED_DRINK_IDS.includes(item.id))
                                  .map((item: KlassikerItem) => (
                                    <div 
                                      key={item.id} 
                                      className="flex items-start justify-between gap-3 py-2 border-b border-border/10 last:border-0"
                                    >
                                      <div className="flex-1">
                                        <span className="font-work text-sm text-foreground">
                                          {item.name[language]}
                                        </span>
                                        {item.sizeNote && (
                                          <span className="text-muted-foreground text-xs ml-2">
                                            ({item.sizeNote})
                                          </span>
                                        )}
                                      </div>
                                      <span className="text-accent font-medium text-sm font-work shrink-0">
                                        {item.price}
                                      </span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                          
                          {/* Collapse link */}
                          <button
                            onClick={() => setDrinksExpanded(false)}
                            className="text-muted-foreground text-sm font-work hover:text-foreground transition-colors"
                          >
                            {language === "de" ? "Weniger anzeigen" : "Show less"}
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};
