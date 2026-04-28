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
import { Info } from "lucide-react";
import { useState, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { SHOW_WEEKLY_MENU } from "@/config/menuFlags";
import { WeeklyMenuUnavailable } from "@/components/WeeklyMenuUnavailable";
import { AllergenLegend, MenuDishDetails } from "@/components/MenuDishDetails";
import type { DishDetails } from "@/data/allergensData";
import { splitDishText } from "@/lib/splitDishText";
import { cleanDisplayText, joinDisplayText } from "@/lib/displayText";
import supermindLogo from "@/assets/supermind-logo-cropped.png";

const cakeMenuItems = [
  "Chocolate Mousse Cake",
  "Poppy Seeds Hazelnut Cake",
  "Carrot Spice Cake",
  "Walnut Brownie",
  "Salty Caramel Slice",
  "Vegan Cheesecake (Cashew Paste)",
];
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
  const visibleLabels = [
    labels.isVegan ? "vegan" : null,
    labels.isGlutenFree ? (language === "de" ? "ohne Gluten Zutaten" : "no gluten ingredients") : null,
    labels.isBio ? "bio" : null,
  ].filter(Boolean);

  if (visibleLabels.length === 0) return null;
  
  return (
    <p className="mt-2 font-work text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-high-contrast">
      {joinDisplayText(visibleLabels)}
    </p>
  );
};

const WeeklyDishDetails = ({ text, meta }: { text: string; meta?: DishDetails }) => (
  <MenuDishDetails details={meta ?? {}} compact />
);

const weeklyDishLabels = {
  soup: { de: "Suppe", en: "Soup" },
  green: { de: "Grünes Gericht", en: "Green Dish" },
  blue: { de: "Blaues Gericht", en: "Blue Dish" },
} as const;

const supermindCoffeeItemIds = new Set([
  "espresso",
  "verlaengerter",
  "cappuccino",
  "flat-white",
  "latte-macchiato",
  "chaga-kaffee",
]);

const WeeklyDishRow = ({ kind, text, price, meta, language }: { kind: keyof typeof weeklyDishLabels; text: string; price: string; meta?: DishDetails; language: "de" | "en" }) => {
  const dishCopy = splitDishText(text, language, kind);

  return (
    <div className="flex justify-between items-start gap-2">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <p className="font-cormorant text-lg font-semibold leading-snug text-foreground">
            {cleanDisplayText(dishCopy.name)}
          </p>
          <span className={`font-work text-[10px] font-semibold uppercase tracking-[0.08em] ${kind === "blue" ? "text-blue" : "text-accent"}`}>
            {weeklyDishLabels[kind][language]}
          </span>
        </div>
        {dishCopy.description && (
          <p className="mt-1 text-muted-high-contrast whitespace-pre-line">{cleanDisplayText(dishCopy.description)}</p>
        )}
        <DietaryBadges text={text} language={language} />
        <WeeklyDishDetails text={text} meta={meta} />
      </div>
      <span className="text-primary text-xs font-medium shrink-0">{price}</span>
    </div>
  );
};

export const MenuSection = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  const [activeMenuTab, setActiveMenuTab] = useState<"today" | "fixed" | "week">("today");
  const [activeFixedAnchor, setActiveFixedAnchor] = useState(klassikerMenu.categories[0]?.id ?? "");
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

  const fixedMenuAnchors = klassikerMenu.categories.flatMap((category) => [
    { id: category.id, label: category.name[language] },
    ...(category.subcategories?.map((subcategory) => ({ id: subcategory.id, label: subcategory.name[language] })) ?? []),
  ]);

  const scrollToFixedAnchor = (id: string) => {
    const target = document.getElementById(`menu-${id}`);
    if (!target) return;
    setActiveMenuTab("fixed");
    setActiveFixedAnchor(id);
    const offset = window.matchMedia("(min-width: 768px)").matches ? 148 : 194;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-section-soft">
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[15rem_minmax(0,42rem)] lg:items-start lg:justify-center">
          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <nav className="rounded-lg border border-border/80 bg-nav-surface p-4 shadow-card backdrop-blur-md" aria-label={language === "de" ? "Schnelle Menünavigation" : "Quick menu navigation"}>
              <p className="mb-3 font-work text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-high-contrast">
                {language === "de" ? "Direkt zum Menü" : "Jump to menu"}
              </p>
              <div className="grid gap-2" role="tablist" aria-label={language === "de" ? "Menübereiche" : "Menu sections"}>
                {[
                  { id: "today" as const, label: language === "de" ? "Heute" : "Today" },
                  { id: "fixed" as const, label: language === "de" ? "Immer da" : "Always" },
                  ...(SHOW_WEEKLY_MENU ? [{ id: "week" as const, label: language === "de" ? "Woche" : "Week" }] : []),
                ].map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={activeMenuTab === tab.id}
                    onClick={() => scrollToMenuBlock(tab.id)}
                    className={`rounded-full px-4 py-2.5 text-left font-work text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      activeMenuTab === tab.id
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-card text-primary hover:bg-muted"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-5 border-t border-border/70 pt-4">
                <p className="mb-3 font-work text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-high-contrast">
                  {language === "de" ? "Klassiker" : "Classics"}
                </p>
                <div className="grid max-h-[48vh] gap-1.5 overflow-y-auto pr-1">
                  {fixedMenuAnchors.map((anchor) => (
                    <button
                      key={anchor.id}
                      type="button"
                      onClick={() => scrollToFixedAnchor(anchor.id)}
                      aria-current={activeFixedAnchor === anchor.id ? "true" : undefined}
                      className={`rounded-md px-3 py-2 text-left font-work text-xs font-medium leading-snug transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                        activeFixedAnchor === anchor.id
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted hover:text-primary"
                      }`}
                    >
                      {cleanDisplayText(anchor.label)}
                    </button>
                  ))}
                </div>
              </div>
            </nav>
          </aside>

          <div className="min-w-0 max-w-2xl lg:max-w-none">
          <div className="md:hidden sticky top-[72px] z-30 -mx-4 mb-8 border-y border-border/75 bg-nav-surface px-4 py-2 backdrop-blur-md">
            <div className="grid grid-cols-3 gap-1 rounded-full bg-muted p-1" role="tablist" aria-label={language === "de" ? "Menübereiche" : "Menu sections"}>
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
                  className={`rounded-full px-2 py-2 text-xs font-work font-semibold uppercase tracking-[0.06em] transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    activeMenuTab === tab.id
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-primary/75 hover:text-primary"
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
              <p className="text-muted-high-contrast text-sm md:text-base font-work max-w-sm mx-auto leading-relaxed">
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
                  <div className="rounded-2xl border p-4 surface-card md:p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                        {language === "de" ? "Heute" : "Today"}
                      </span>
                      <span className="text-xs text-muted-high-contrast font-work uppercase tracking-wide">
                        {language === "de" ? "Suppe" : "Soup"}
                      </span>
                      </div>
                       <p className="text-accent font-semibold text-sm font-work shrink-0">6,90</p>
                    </div>
                    <p className="text-foreground font-work text-base md:text-base leading-relaxed mb-2">
                      {todayMenu.soup[language]}
                    </p>
                    <DietaryBadges text={todayMenu.soup[language]} language={language} />
                    <WeeklyDishDetails text={todayMenu.soup[language]} meta={todayMenu.soupMeta} />
                  </div>
                )}

                {/* Green Dish */}
                {isValidMenuText(todayMenu.green[language]) && (
                  <div className="rounded-2xl border p-4 surface-card md:p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                        {language === "de" ? "Heute" : "Today"}
                      </span>
                      <span className="text-xs text-muted-high-contrast font-work uppercase tracking-wide">
                        {language === "de" ? "Grünes Gericht" : "Green Dish"}
                      </span>
                      </div>
                       <p className="text-accent font-semibold text-sm font-work shrink-0">15,90</p>
                    </div>
                    <p className="text-foreground font-work text-base md:text-base leading-relaxed mb-2">
                      {todayMenu.green[language]}
                    </p>
                    <DietaryBadges text={todayMenu.green[language]} language={language} />
                    <WeeklyDishDetails text={todayMenu.green[language]} meta={todayMenu.greenMeta} />
                  </div>
                )}

                {/* Blue Dish */}
                {isValidMenuText(todayMenu.blue[language]) && (
                  <div className="rounded-2xl border p-4 surface-card md:p-5">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                        {language === "de" ? "Heute" : "Today"}
                      </span>
                      <span className="text-xs text-muted-high-contrast font-work uppercase tracking-wide">
                        {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                      </span>
                      </div>
                       <p className="text-accent font-semibold text-sm font-work shrink-0">15,90</p>
                    </div>
                    <p className="text-foreground font-work text-base md:text-base leading-relaxed mb-2">
                      {todayMenu.blue[language]}
                    </p>
                    <DietaryBadges text={todayMenu.blue[language]} language={language} />
                    <WeeklyDishDetails text={todayMenu.blue[language]} meta={todayMenu.blueMeta} />
                  </div>
                )}
              </div>
              <div className="mt-4 flex items-start gap-2 rounded-2xl border px-4 py-3 text-left surface-card">
                <Info className="w-4 h-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
                <p className="text-xs sm:text-sm text-muted-high-contrast font-work leading-relaxed">
                  {language === "de"
                    ? "Markierte Optionen werden ohne glutenhaltige Zutaten gekocht. Unsere Küche ist klein und nicht für Zöliakie geeignet. Bei Allergien bitte kurz fragen."
                    : "Marked options are made without gluten containing ingredients. Our kitchen is small and not suitable for coeliac disease. If you have allergies, please ask us first."}
                </p>
              </div>
              </>
            ) : (
              <div className="space-y-6 rounded-2xl border p-8 text-center surface-card">
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
                  <p className="text-muted-high-contrast font-work text-sm max-w-md mx-auto">
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
                    <p className="text-muted-high-contrast font-work text-xs mt-2">
                      {language === "de" 
                        ? "Heute haben wir geschlossen." 
                        : "We are closed today."}
                    </p>
                  )}
                </div>
                
                {/* Next day preview - when closed */}
                {isClosed && nextDayMenu && (
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs uppercase tracking-wider text-muted-high-contrast font-work mb-4">
                      {language === "de" ? `Vorschau auf ${nextDayName.de}` : `Preview of ${nextDayName.en}`}
                    </p>
                    <div className="space-y-3 text-left">
                      {isValidMenuText(nextDayMenu.soup[language]) && (
                          <div className="rounded-xl border border-border/60 bg-background p-3">
                          <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                            {language === "de" ? "Suppe" : "Soup"}
                          </span>
                          <p className="text-foreground font-work text-sm mt-1">
                            {nextDayMenu.soup[language]}
                          </p>
                        </div>
                      )}
                      {isValidMenuText(nextDayMenu.green[language]) && (
                          <div className="rounded-xl border border-border/60 bg-background p-3">
                          <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                            {language === "de" ? "Grünes Gericht" : "Green Dish"}
                          </span>
                          <p className="text-foreground font-work text-sm mt-1 line-clamp-2">
                            {nextDayMenu.green[language]}
                          </p>
                        </div>
                      )}
                      {isValidMenuText(nextDayMenu.blue[language]) && (
                          <div className="rounded-xl border border-border/60 bg-background p-3">
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
            <p className="text-xs text-muted-high-contrast font-work font-medium tracking-wide mb-6 text-center uppercase">
              {language === "de" ? "Unser Wochenmenü" : "This week"}
            </p>
          </div>
          
          {/* Weekly Menu */}
          <div className="my-2 rounded-2xl border px-4 py-5 surface-card md:px-5">
                <div className="space-y-6">
                  {isLoading ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <Skeleton key={i} className="h-16 w-full rounded-lg" />
                      ))}
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-muted-high-contrast text-center font-work mb-4">
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
                                <p className="text-muted-high-contrast text-xs font-work mt-1">
                                  {language === "de" ? "Geschlossen" : "Closed"}
                                </p>
                              </div>
                            ) : (
                              <div className="space-y-2 text-sm font-work">
                                {isValidMenuText(day.soup[language]) && (
                                  <WeeklyDishRow kind="soup" text={day.soup[language]} price="6,90" meta={day.soupMeta} language={language} />
                                )}
                                {isValidMenuText(day.green[language]) && (
                                  <WeeklyDishRow kind="green" text={day.green[language]} price="15,90" meta={day.greenMeta} language={language} />
                                )}
                                {isValidMenuText(day.blue[language]) && (
                                  <WeeklyDishRow kind="blue" text={day.blue[language]} price="15,90" meta={day.blueMeta} language={language} />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                </div>
          </div>
          </>
          ) : (
            <WeeklyMenuUnavailable />
          )}
          
          {/* BLOCK 2: Visual Transition - WCAG compliant text */}
          <div className="text-center py-10 md:py-14">
            <p className="font-cormorant text-lg md:text-xl text-muted-high-contrast italic leading-relaxed whitespace-pre-line">
              {language === "de" 
                ? "Manches kochen wir nur heute.\nEin paar Dinge bleiben, weil ihr sie immer wieder bestellt." 
                : "Some dishes are only here today.\nA few stay because people keep asking for them."}
            </p>
          </div>
          
          {/* BLOCK 3: Fixed Menu (Klassiker) */}
          <div ref={fixedRef} id="menu-fixed" className="scroll-mt-32">
            <div className="text-center mb-8">
              <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground mb-3">
                {cleanDisplayText(klassikerMenu.title[language])}
              </h2>
              <p className="text-muted-high-contrast text-sm md:text-base font-work max-w-sm mx-auto leading-relaxed">
                {cleanDisplayText(klassikerMenu.subtitle[language])}
              </p>
              <p className="text-muted-high-contrast text-xs font-work font-medium mt-2 uppercase tracking-wide">
                {language === "de" ? "Preise in Euro" : "Prices in Euro"}
              </p>
            </div>

            <div className="mb-8 rounded-lg border border-border bg-card p-5 shadow-card md:p-6">
              <div className="grid gap-4 md:grid-cols-[1fr_auto] md:items-start">
                <div>
                  <p className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">{language === "de" ? "Hausgemachte Torten" : "Homemade cakes"}</p>
                  <h3 className="mt-2 font-cormorant text-3xl font-semibold leading-tight text-primary md:text-4xl">{language === "de" ? "Ganze Torten vorbestellen" : "Pre-order whole cakes"}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-high-contrast">
                    {language === "de" ? "Alle sechs Sorten kosten €39,00 als ganze Torte. Zahlung bei Abholung, mindestens 24h im Voraus." : "All six cakes are €39.00 as whole cakes. Payment at pickup, at least 24h in advance."}
                  </p>
                </div>
                <Link
                  to="/order"
                  onClick={() => window.gtag?.("event", "cake_cta_click", { event_category: "engagement", source: "menu_always_here" })}
                  className="inline-flex h-11 items-center justify-center rounded-full bg-accent px-6 font-work text-sm font-medium text-accent-foreground shadow-soft transition-colors hover:bg-[hsl(var(--btn-primary-hover))] focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {language === "de" ? "Torte bestellen" : "Order a cake"}
                </Link>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {cakeMenuItems.map((cake) => (
                  <Link key={cake} to="/cakes" className="rounded-md border border-border bg-background/70 px-3 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/35 hover:text-primary">
                    {cake}
                  </Link>
                ))}
              </div>
            </div>

            <div className="sticky top-[118px] z-20 -mx-4 mb-8 border-y border-border/75 bg-nav-surface px-4 py-3 backdrop-blur-md md:top-[84px] md:rounded-2xl md:border md:shadow-card">
              <p className="mb-2 text-center font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-high-contrast">
                {language === "de" ? "Immer da direkt wählen" : "Always choose directly"}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label={language === "de" ? "Klassiker filtern" : "Filter classics"}>
                {fixedMenuAnchors.map((anchor) => (
                  <button
                    key={anchor.id}
                    type="button"
                    onClick={() => scrollToFixedAnchor(anchor.id)}
                    aria-current={activeFixedAnchor === anchor.id ? "true" : undefined}
                    className={`shrink-0 rounded-full border px-3 py-2 text-xs font-work font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                      activeFixedAnchor === anchor.id
                        ? "border-primary bg-primary text-primary-foreground shadow-sm"
                        : "border-border/75 bg-card text-primary hover:border-primary/35 hover:bg-muted"
                    }`}
                  >
                    {cleanDisplayText(anchor.label)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="space-y-8">
              {klassikerMenu.categories.map((category) => (
                <div key={category.id} id={`menu-${category.id}`} className="scroll-mt-52 md:scroll-mt-40">
                  <h3 className="font-cormorant text-2xl md:text-3xl font-semibold text-foreground mb-4 border-b border-border/50 pb-3">
                    {cleanDisplayText(category.name[language])}
                  </h3>
                  
                  {/* Regular items (non-drinks categories) */}
                  {category.items && (
                    <div className="space-y-3">
                      {category.items.map((item) => (
                        <div 
                          key={item.id} 
                          className={`rounded-2xl border border-border/75 bg-card p-4 shadow-card ${item.isUnavailable ? 'border-dashed' : ''}`}
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className={`font-cormorant text-base font-semibold mb-1 ${item.isUnavailable ? 'text-muted-high-contrast' : 'text-foreground'}`}>
                                {cleanDisplayText(item.name[language])}
                                {item.isUnavailable && (
                                  <span className="ml-2 text-xs font-work text-muted-high-contrast italic">
                                    ({language === "de" ? "derzeit nicht verfügbar" : "currently unavailable"})
                                  </span>
                                )}
                              </h4>
                              {item.description && (
                                <p className={`font-work text-sm leading-relaxed ${item.isUnavailable ? 'text-muted-high-contrast' : 'text-muted-high-contrast'}`}>
                                  {cleanDisplayText(item.description[language])}
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
                                      {language === "de" ? "ohne Gluten Zutaten" : "no gluten ingredients"}
                                    </span>
                                  )}
                                  {item.isBio && (
                                    <span className="text-xs font-work font-semibold text-state-bio">
                                      bio
                                    </span>
                                  )}
                                </div>
                              )}
                              {!item.isUnavailable && (
                                <MenuDishDetails
                                  details={{
                                    descriptionShort: item.descriptionShort,
                                    ingredientsMain: item.ingredientsMain,
                                    allergens: item.allergens,
                                    gfDisclaimer: item.gfDisclaimer,
                                    ingredientProducers: item.ingredientProducers,
                                  }}
                                />
                              )}
                            </div>
                            <span className={`font-semibold text-sm font-work shrink-0 ${item.isUnavailable ? 'text-muted-high-contrast' : 'text-foreground'}`}>
                              {item.price.replace(/,(\d)0$/g, ',$1').replace(/,(\d)0\s/g, ',$1 ')}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {/* Drinks - curated selection with expand option */}
                  {category.subcategories && (
                    <div className="space-y-6">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory.id} id={`menu-${subcategory.id}`} className="scroll-mt-52 rounded-2xl border border-border/75 bg-card p-4 shadow-card md:scroll-mt-40 md:p-5">
                          <div className="mb-4 flex items-start justify-between gap-3 border-b border-border/40 pb-3">
                            <div>
                              <h4 className="font-cormorant text-xl md:text-2xl font-semibold text-foreground">
                                {cleanDisplayText(subcategory.name[language])}
                              </h4>
                              {subcategory.sizeNote && (
                                <p className="mt-1 text-xs font-work text-muted-high-contrast">{subcategory.sizeNote}</p>
                              )}
                            </div>
                            <span className="font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-high-contrast">
                              {language === "de" ? "Getränke" : "Drinks"}
                            </span>
                          </div>
                          <div className="grid gap-2 sm:grid-cols-2">
                            {subcategory.items.map((item: KlassikerItem) => {
                              const isSupermindCoffee = supermindCoffeeItemIds.has(item.id);

                              return (
                              <div 
                                key={item.id} 
                                className="rounded-xl border border-border/50 bg-background/60 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <span className="font-work text-sm font-semibold text-foreground">
                                      {item.name[language]}
                                    </span>
                                    {item.sizeNote && (
                                      <p className="mt-1 text-xs font-work text-muted-high-contrast">
                                        {cleanDisplayText(item.sizeNote)}
                                      </p>
                                    )}
                                    {isSupermindCoffee && (
                                      <a
                                        href="https://supermind.at/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-2 inline-flex min-h-9 items-center gap-2 rounded-full border border-primary/20 bg-card px-2.5 py-1 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/40 hover:bg-muted"
                                        aria-label={language === "de" ? "Supermind Kaffee Website öffnen" : "Open Supermind coffee website"}
                                      >
                                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-background">
                                          <img src={supermindLogo} alt="" className="h-5 w-auto object-contain" loading="lazy" />
                                        </span>
                                        {language === "de" ? "Supermind Kaffee" : "Supermind Coffee"}
                                      </a>
                                    )}
                                  </div>
                                  <span className="text-accent font-semibold text-sm font-work shrink-0">
                                    {item.price}
                                  </span>
                                </div>
                                {(item.descriptionShort || item.ingredientsMain || item.allergens) && (
                                  <MenuDishDetails
                                    details={{
                                      descriptionShort: item.descriptionShort,
                                      ingredientsMain: item.ingredientsMain,
                                      allergens: item.allergens,
                                      gfDisclaimer: item.gfDisclaimer,
                                    }}
                                    compact
                                  />
                                )}
                              </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <AllergenLegend />
          </div>
          
        </div>
        </div>
      </div>
    </section>
  );
};
