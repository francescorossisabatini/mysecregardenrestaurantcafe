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
import { translatePeriod } from "@/lib/translatePeriod";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, Info } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { SHOW_WEEKLY_MENU } from "@/config/menuFlags";
import { WeeklyMenuUnavailable } from "@/components/WeeklyMenuUnavailable";
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

// Render dietary badges dynamically - WCAG AAA compliant colors (7:1+ on cream)
// Using explicit dark colors that GUARANTEE 4.5:1+ contrast on #FAF7F3
const DietaryBadges = ({ text, language }: { text: string; language: "de" | "en" }) => {
  const labels = parseDietaryLabels(text);
  
  return (
    <div className="flex items-center gap-2 mt-2 flex-wrap">
      {labels.isVegan && (
        <span className="text-xs font-work font-semibold text-state-vegan">
          vegan
        </span>
      )}
      {labels.isGlutenFree && (
        <span className="text-xs font-work font-semibold text-state-glutenFree">
          {language === "de" ? "glutenfrei" : "gluten-free"}
        </span>
      )}
      {labels.isBio && (
        <span className="text-xs font-work font-semibold text-state-bio">
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
  const [activeMenuTab, setActiveMenuTab] = useState<"today" | "fixed" | "week">("today");
  const todayRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);
  
  // Memoize date calculations to avoid recalculating on every render
  // This prevents forced reflows from repeated Date operations
  const dateInfo = useMemo(() => {
    const today = new Date();
    const currentHour = today.getHours();
    const dayIndex = today.getDay();
    const nextDayIndex = (dayIndex + 1) % 7;
    
    return {
      dayIndex,
      currentHour,
      nextDayIndex,
      isAfterClosing: currentHour >= 19,
      isSunday: dayIndex === 0,
      todayHoliday: getTodayHoliday(),
    };
  }, []);
  
  const dayNames = useMemo(() => ({
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  }), []);
  
  const todayName = dayNames[language][dateInfo.dayIndex];
  
  // Find today's menu
  const todayMenu = useMemo(() => 
    menu.days.find(day => day.day[language] === todayName),
    [menu.days, language, todayName]
  );
  
  // Check if today's menu has any data
  const hasMenuData = useMemo(() => !!todayMenu && (
    isValidMenuText(todayMenu.soup?.de) || isValidMenuText(todayMenu.soup?.en) ||
    isValidMenuText(todayMenu.green?.de) || isValidMenuText(todayMenu.green?.en) ||
    isValidMenuText(todayMenu.blue?.de) || isValidMenuText(todayMenu.blue?.en)
  ), [todayMenu]);
  
  // Determine if restaurant is closed (Sunday, holiday, no menu data, or after 19:00)
  const isClosed = dateInfo.isSunday || dateInfo.todayHoliday !== null || !hasMenuData || dateInfo.isAfterClosing;
  const isNoMenuDay = !dateInfo.isSunday && !dateInfo.todayHoliday && !hasMenuData && !dateInfo.isAfterClosing;
  
  // Get next day's menu for closed day preview
  const nextDayMenu = useMemo(() => {
    const nextDayNameDE = dayNames.de[dateInfo.nextDayIndex];
    return menu.days.find(day => day.day.de === nextDayNameDE);
  }, [menu.days, dateInfo.nextDayIndex, dayNames.de]);
  
  const nextDayName = useMemo(() => ({
    de: dayNames.de[dateInfo.nextDayIndex],
    en: dayNames.en[dateInfo.nextDayIndex]
  }), [dayNames, dateInfo.nextDayIndex]);

  const scrollToMenuBlock = (tab: "today" | "fixed" | "week") => {
    const target = tab === "today" ? todayRef.current : tab === "fixed" ? fixedRef.current : weekRef.current;
    if (!target) return;

    setActiveMenuTab(tab);
    const offset = 128;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="md:hidden sticky top-[72px] z-30 -mx-4 mb-8 border-y border-border/30 bg-background/95 px-4 py-2 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted/40 p-1" role="tablist" aria-label={language === "de" ? "Menübereiche" : "Menu sections"}>
              {[
                { id: "today" as const, label: language === "de" ? "Heute" : "Today" },
                { id: "fixed" as const, label: language === "de" ? "Immer da" : "Always" },
                { id: "week" as const, label: language === "de" ? "Woche" : "Week" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={activeMenuTab === tab.id}
                  onClick={() => scrollToMenuBlock(tab.id)}
                  className={`rounded-md px-2 py-2 text-sm font-work font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    activeMenuTab === tab.id
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* BLOCK 1 + Weekly: hidden when menu is disabled */}
          {SHOW_WEEKLY_MENU ? (
          <>
          <div ref={todayRef} id="menu-today" className="scroll-mt-32 mb-14 md:mb-16">
            <div className="text-center mb-8">
              <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground mb-2">
                {language === "de" ? "Heute aus der Küche" : "From the kitchen today"}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-work max-w-sm mx-auto leading-relaxed">
                {language === "de" 
                  ? "Mittags warm, ohne viel Umweg. Wenn du wegen Allergien unsicher bist, frag bitte kurz bei uns nach." 
                  : "Warm lunch, no fuss. If allergies are a concern, please ask us before ordering."}
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
              <>
              <div className="space-y-4">
                {/* Soup */}
                {isValidMenuText(todayMenu.soup[language]) && (
                  <div className="bg-daily rounded-lg p-4 md:p-5 border border-border/20">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-primary/15 text-primary border-primary/30 text-xs font-work">
                        {language === "de" ? "Heute" : "Today"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-work uppercase tracking-wide">
                        {language === "de" ? "Suppe" : "Soup"}
                      </span>
                      </div>
                      <p className="text-primary font-semibold text-sm font-work shrink-0">6,90</p>
                    </div>
                    <p className="text-foreground font-work text-base md:text-base leading-relaxed mb-2">
                      {todayMenu.soup[language]}
                    </p>
                    <DietaryBadges text={todayMenu.soup[language]} language={language} />
                  </div>
                )}

                {/* Green Dish */}
                {isValidMenuText(todayMenu.green[language]) && (
                  <div className="bg-daily rounded-lg p-4 md:p-5 border border-border/20">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-primary/15 text-primary border-primary/30 text-xs font-work">
                        {language === "de" ? "Heute" : "Today"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-work uppercase tracking-wide">
                        {language === "de" ? "Grünes Gericht" : "Green Dish"}
                      </span>
                      </div>
                      <p className="text-primary font-semibold text-sm font-work shrink-0">15,90</p>
                    </div>
                    <p className="text-foreground font-work text-base md:text-base leading-relaxed mb-2">
                      {todayMenu.green[language]}
                    </p>
                    <DietaryBadges text={todayMenu.green[language]} language={language} />
                  </div>
                )}

                {/* Blue Dish */}
                {isValidMenuText(todayMenu.blue[language]) && (
                  <div className="bg-daily rounded-lg p-4 md:p-5 border border-border/20">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                      <Badge className="bg-primary/15 text-primary border-primary/30 text-xs font-work">
                        {language === "de" ? "Heute" : "Today"}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-work uppercase tracking-wide">
                        {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                      </span>
                      </div>
                      <p className="text-primary font-semibold text-sm font-work shrink-0">15,90</p>
                    </div>
                    <p className="text-foreground font-work text-base md:text-base leading-relaxed mb-2">
                      {todayMenu.blue[language]}
                    </p>
                    <DietaryBadges text={todayMenu.blue[language]} language={language} />
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-lg border border-border/30 bg-muted/30 px-4 py-3 text-left">
                <Info className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-muted-foreground font-work leading-relaxed">
                  {language === "de"
                    ? "Glutenfreie Optionen sind markiert. Unsere Küche ist aber klein und nicht rein glutenfrei. Bei Allergien bitte kurz fragen, lieber einmal zu viel."
                    : "Gluten-free options are marked. Our kitchen is small and not fully gluten-free. If you have allergies, please ask us first."}
                </p>
              </div>
              </>
            ) : (
              <div className="bg-daily/50 rounded-xl p-8 text-center space-y-6">
                {/* Holiday, Sunday, after closing, or no-menu rest message */}
                <div className="space-y-3">
                  <p className="font-cormorant text-2xl md:text-3xl text-foreground/80 italic">
                    {dateInfo.todayHoliday 
                      ? dateInfo.todayHoliday.name[language]
                      : dateInfo.isAfterClosing
                        ? (language === "de" ? "Für heute geschlossen" : "Closed for today")
                        : isNoMenuDay
                          ? (language === "de" ? "Heute geschlossen" : "Closed Today")
                          : (language === "de" ? "Sonntag. Heute bleibt es still" : "Sunday. A quiet day here")}
                  </p>
                  <p className="text-muted-foreground font-work text-sm max-w-md mx-auto">
                    {dateInfo.todayHoliday 
                      ? dateInfo.todayHoliday.message[language]
                      : dateInfo.isAfterClosing
                        ? (language === "de" 
                            ? "Die Töpfe sind für heute leer. Unten siehst du schon, was morgen geplant ist." 
                            : "The pots are done for today. Below you can see what is planned for tomorrow.")
                        : isNoMenuDay
                          ? (language === "de" 
                              ? "Heute bleibt die Küche zu. Schau gern später noch einmal vorbei." 
                              : "The kitchen is closed today. Feel free to check back later.")
                          : (language === "de" 
                              ? "Sonntag ist bei uns Pause. Morgen riecht es hier wieder nach Reis, Gewürzen und frischem Kaffee." 
                              : "Sunday is our pause. Tomorrow it will smell of rice, spices and fresh coffee again.")}
                  </p>
                  {(dateInfo.todayHoliday || isNoMenuDay) && !dateInfo.isAfterClosing && (
                    <p className="text-muted-foreground font-work text-xs mt-2">
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
                        <div className="bg-background rounded-lg p-3">
                          <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                            {language === "de" ? "Suppe" : "Soup"}
                          </span>
                          <p className="text-foreground font-work text-sm mt-1">
                            {nextDayMenu.soup[language]}
                          </p>
                        </div>
                      )}
                      {isValidMenuText(nextDayMenu.green[language]) && (
                        <div className="bg-background rounded-lg p-3">
                          <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                            {language === "de" ? "Grünes Gericht" : "Green Dish"}
                          </span>
                          <p className="text-foreground font-work text-sm mt-1 line-clamp-2">
                            {nextDayMenu.green[language]}
                          </p>
                        </div>
                      )}
                      {isValidMenuText(nextDayMenu.blue[language]) && (
                        <div className="bg-background rounded-lg p-3">
                          <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                            {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                          </span>
                          <p className="text-foreground font-work text-sm mt-1 line-clamp-2">
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
          
          {/* Weekly Menu Anchor Label */}
          <div ref={weekRef} id="wochenmenu" className="scroll-mt-32 pt-4 md:pt-8">
            <p className="text-xs text-muted-foreground font-work font-medium tracking-wide mb-6 text-center uppercase">
              {language === "de" ? "Unser Wochenmenü" : "This week"}
            </p>
          </div>
          
          {/* Weekly Menu Accordion */}
          <div className="my-2 rounded-lg border border-border/30 bg-muted/15 px-3 py-2">
            <Collapsible open={weeklyOpen} onOpenChange={setWeeklyOpen}>
              <CollapsibleTrigger className="w-full group">
                <div className="flex items-center justify-center gap-2 py-3 text-muted-foreground hover:text-foreground transition-colors">
                  <span className="font-cormorant text-base md:text-lg italic">
                    {dateInfo.isSunday
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
                        {translatePeriod(menu.period, language)}
                      </p>
                      {menu.days.map((day, index) => {
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
                              <div className="text-center py-3">
                                <p className="font-cormorant text-base text-foreground/85 italic">
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
                                    <span className="text-primary text-xs font-medium shrink-0">6,90</span>
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
                                    <span className="text-primary text-xs font-medium shrink-0">15,90</span>
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
                                    <span className="text-primary text-xs font-medium shrink-0">15,90</span>
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
          </>
          ) : (
            <WeeklyMenuUnavailable />
          )}
          
          {/* BLOCK 2: Visual Transition - WCAG compliant text */}
          <div className="text-center py-10 md:py-14">
            <p className="font-cormorant text-lg md:text-xl text-muted-foreground italic leading-relaxed whitespace-pre-line">
              {language === "de" 
                ? "Manches kochen wir nur heute.\nEin paar Dinge bleiben, weil ihr sie immer wieder bestellt." 
                : "Some dishes are only here today.\nA few stay because people keep asking for them."}
            </p>
          </div>
          
          {/* BLOCK 3: Fixed Menu (Klassiker) */}
          <div ref={fixedRef} id="menu-fixed" className="scroll-mt-32">
            <div className="text-center mb-8">
              <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground mb-3">
                {klassikerMenu.title[language]}
              </h2>
              <p className="text-muted-foreground text-sm md:text-base font-work max-w-sm mx-auto leading-relaxed">
                {klassikerMenu.subtitle[language]}
              </p>
              <p className="text-muted-foreground text-xs font-work font-medium mt-2 uppercase tracking-wide">
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
                          className={`bg-klassiker rounded-xl p-4 border border-border/20 ${item.isUnavailable ? 'border-dashed' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className={`font-cormorant text-base font-semibold mb-1 ${item.isUnavailable ? 'text-muted-foreground' : 'text-foreground'}`}>
                                {item.name[language]}
                                {item.isUnavailable && (
                                  <span className="ml-2 text-xs font-work text-muted-foreground italic">
                                    ({language === "de" ? "derzeit nicht verfügbar" : "currently unavailable"})
                                  </span>
                                )}
                              </h4>
                              {item.description && (
                                <p className={`font-work text-sm leading-relaxed ${item.isUnavailable ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                                  {item.description[language]}
                                </p>
                              )}
                              {/* Dietary labels - WCAG AAA compliant with explicit colors */}
                              {(item.isVegan || item.isGlutenFree || item.isBio) && !item.isUnavailable && (
                                <div className="flex items-center gap-2 mt-2">
                                  {item.isVegan && (
                                    <span className="text-xs font-work font-semibold text-state-vegan">
                                      vegan
                                    </span>
                                  )}
                                  {item.isGlutenFree && (
                                    <span className="text-xs font-work font-semibold text-state-glutenFree">
                                      {language === "de" ? "glutenfrei" : "gluten-free"}
                                    </span>
                                  )}
                                  {item.isBio && (
                                    <span className="text-xs font-work font-semibold text-state-bio">
                                      bio
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <span className={`font-semibold text-sm font-work shrink-0 ${item.isUnavailable ? 'text-muted-foreground' : 'text-foreground'}`}>
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
                              <span className="text-primary font-medium text-sm font-work shrink-0">
                                {item.price}
                              </span>
                            </div>
                          ))}
                      </div>
                      
                      {/* Expand link */}
                      {!drinksExpanded && (
                        <button
                          onClick={() => setDrinksExpanded(true)}
                          className="text-primary text-sm font-work font-medium hover:text-primary/80 transition-colors underline underline-offset-2"
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
                                      <span className="text-primary font-medium text-sm font-work shrink-0">
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
                            className="text-primary text-sm font-work font-medium hover:text-primary/80 transition-colors underline underline-offset-2"
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
