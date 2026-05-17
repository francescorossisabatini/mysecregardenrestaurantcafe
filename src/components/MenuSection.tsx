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
import { Info, ListFilter, ListTree, X } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useWeeklyMenuAvailable } from "@/hooks/useWeeklyMenuAvailable";
import { WeeklyMenuPendingUpdate } from "@/components/WeeklyMenuPendingUpdate";
import { AllergenLegend, MenuDishDetails } from "@/components/MenuDishDetails";
import { MenuFloatingPill } from "@/components/MenuFloatingPill";
import type { DishDetails } from "@/data/allergensData";
import { splitDishText } from "@/lib/splitDishText";
import { cleanDisplayText, joinDisplayText } from "@/lib/displayText";

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

const WeeklyDishRow = ({ kind, text, price, meta, language }: { kind: keyof typeof weeklyDishLabels; text: string; price: string; meta?: DishDetails; language: "de" | "en" }) => {
  const dishCopy = splitDishText(text, language, kind);

  return (
    <div className="flex justify-between items-start gap-2">
      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
          <p className="font-cormorant text-lg font-bold md:font-semibold leading-snug text-foreground">
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
  const { menu, isLoading, loadedAt } = useWeeklyMenu();
  const weeklyAvailable = useWeeklyMenuAvailable(loadedAt);
  const [activeMenuTab, setActiveMenuTab] = useState<"today" | "fixed" | "week">("today");
  const [activeFixedAnchor, setActiveFixedAnchor] = useState(klassikerMenu.categories[0]?.id ?? "");
  const [isQuickNavOpen, setIsQuickNavOpen] = useState(false);
  const todayRef = useRef<HTMLDivElement>(null);
  const fixedRef = useRef<HTMLDivElement>(null);
  const weekRef = useRef<HTMLDivElement>(null);

  // Close quick nav on escape
  useEffect(() => {
    if (!isQuickNavOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsQuickNavOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isQuickNavOpen]);
  
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
    setIsQuickNavOpen(false);
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
    setIsQuickNavOpen(false);
    const offset = window.matchMedia("(min-width: 768px)").matches ? 148 : 194;
    window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  const quickNavTabs = [
    { id: "today" as const, label: language === "de" ? "Heute" : "Today" },
    { id: "fixed" as const, label: language === "de" ? "Immer da" : "Always" },
    ...(weeklyAvailable ? [{ id: "week" as const, label: language === "de" ? "Woche" : "Week" }] : []),
  ];

  return (
    <section id="menu" className="py-16 md:py-24 bg-section-soft">
      {/* Floating quick-nav trigger (desktop) */}
      <button
        type="button"
        onClick={() => setIsQuickNavOpen((v) => !v)}
        aria-expanded={isQuickNavOpen}
        aria-controls="menu-quick-nav-panel"
        aria-label={language === "de" ? "Menü filtern und navigieren" : "Filter and navigate menu"}
        className="fixed z-[60] flex items-center justify-center gap-2 rounded-full border-2 border-primary bg-primary text-primary-foreground shadow-lg transition-all hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 right-4 bottom-[calc(env(safe-area-inset-bottom)+88px)] h-14 w-14 md:left-4 md:right-auto md:top-24 md:bottom-auto md:h-12 md:w-auto md:px-4"
      >
        {isQuickNavOpen ? (
          <>
            <X className="h-5 w-5" aria-hidden="true" />
            <span className="hidden md:inline font-work text-xs font-semibold uppercase tracking-[0.1em]">
              {language === "de" ? "Schließen" : "Close"}
            </span>
          </>
        ) : (
          <>
            <ListFilter className="h-6 w-6 md:h-5 md:w-5" aria-hidden="true" />
            <span className="hidden md:inline font-work text-xs font-semibold uppercase tracking-[0.1em]">
              {language === "de" ? "Menü filtern" : "Filter menu"}
            </span>
          </>
        )}
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setIsQuickNavOpen(false)}
        className={`fixed inset-0 z-30 bg-foreground/20 transition-opacity ${isQuickNavOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        aria-hidden="true"
      />

      {/* Quick-nav floating panel (desktop) */}
      <aside
        id="menu-quick-nav-panel"
        className={`fixed z-40 transition-all duration-200 ease-out right-4 left-4 bottom-[calc(env(safe-area-inset-bottom)+148px)] md:left-20 md:right-auto md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:w-64 ${isQuickNavOpen ? "opacity-100 translate-x-0" : "pointer-events-none opacity-0 md:-translate-x-3"}`}
        aria-hidden={!isQuickNavOpen}
      >
        <nav className="rounded-lg border border-border/80 bg-nav-surface p-4 shadow-elevated backdrop-blur-md max-h-[80vh] overflow-y-auto" aria-label={language === "de" ? "Schnelle Menünavigation" : "Quick menu navigation"}>
          <p className="mb-3 font-work text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-high-contrast">
            {language === "de" ? "Direkt zum Menü" : "Jump to menu"}
          </p>
          <div className="grid gap-2" role="tablist" aria-label={language === "de" ? "Menübereiche" : "Menu sections"}>
            {quickNavTabs.map((tab) => (
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
            <div className="grid max-h-[40vh] gap-1.5 overflow-y-auto pr-1">
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
      <div className="container mx-auto px-4">
        <div className="mx-auto grid max-w-2xl gap-8 lg:justify-center">

          <div className="min-w-0 max-w-2xl lg:max-w-none">
          {/* Mobile floating pill removed: filter FAB handles navigation */}
          
          {/* BLOCK 1 + Weekly: hidden when weekly menu is not available (Sunday or stale sheet ID) */}
          {weeklyAvailable ? (
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
                {isValidMenuText(todayMenu.soup[language]) && (() => {
                  const dishCopy = splitDishText(todayMenu.soup[language], language, "soup");

                  return (
                    <div className="rounded-2xl border p-4 surface-card md:p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-cormorant text-4xl font-bold leading-tight text-foreground md:text-3xl md:font-semibold">
                            {cleanDisplayText(dishCopy.name)}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                              {language === "de" ? "Suppe" : "Soup"}
                            </span>
                          </div>
                        </div>
                        <p className="shrink-0 font-work text-base font-bold text-accent md:text-sm md:font-semibold">6,90</p>
                      </div>
                      {dishCopy.description && (
                        <p className="mb-2 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                          {cleanDisplayText(dishCopy.description)}
                        </p>
                      )}
                      <DietaryBadges text={todayMenu.soup[language]} language={language} />
                      <WeeklyDishDetails text={todayMenu.soup[language]} meta={todayMenu.soupMeta} />
                    </div>
                  );
                })()}

                {/* Green Dish */}
                {isValidMenuText(todayMenu.green[language]) && (() => {
                  const dishCopy = splitDishText(todayMenu.green[language], language, "green");

                  return (
                    <div className="rounded-2xl border p-4 surface-card md:p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-cormorant text-4xl font-bold leading-tight text-foreground md:text-3xl md:font-semibold">
                            {cleanDisplayText(dishCopy.name)}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                              {language === "de" ? "Grünes Gericht" : "Green Dish"}
                            </span>
                          </div>
                        </div>
                        <p className="shrink-0 font-work text-base font-bold text-accent md:text-sm md:font-semibold">15,90</p>
                      </div>
                      {dishCopy.description && (
                        <p className="mb-2 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                          {cleanDisplayText(dishCopy.description)}
                        </p>
                      )}
                      <DietaryBadges text={todayMenu.green[language]} language={language} />
                      <WeeklyDishDetails text={todayMenu.green[language]} meta={todayMenu.greenMeta} />
                    </div>
                  );
                })()}

                {/* Blue Dish */}
                {isValidMenuText(todayMenu.blue[language]) && (() => {
                  const dishCopy = splitDishText(todayMenu.blue[language], language, "blue");

                  return (
                    <div className="rounded-2xl border p-4 surface-card md:p-5">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-cormorant text-4xl font-bold leading-tight text-foreground md:text-3xl md:font-semibold">
                            {cleanDisplayText(dishCopy.name)}
                          </h3>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-blue/25 bg-blue/10 px-2.5 py-1 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                              {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                            </span>
                          </div>
                        </div>
                        <p className="shrink-0 font-work text-base font-bold text-accent md:text-sm md:font-semibold">15,90</p>
                      </div>
                      {dishCopy.description && (
                        <p className="mb-2 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                          {cleanDisplayText(dishCopy.description)}
                        </p>
                      )}
                      <DietaryBadges text={todayMenu.blue[language]} language={language} />
                      <WeeklyDishDetails text={todayMenu.blue[language]} meta={todayMenu.blueMeta} />
                    </div>
                  );
                })()}
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
                      {isValidMenuText(nextDayMenu.soup[language]) && (() => {
                        const dishCopy = splitDishText(nextDayMenu.soup[language], language, "soup");

                        return (
                          <div className="rounded-xl border border-border/60 bg-background p-3">
                            <p className="font-cormorant text-2xl font-bold md:text-xl md:font-semibold leading-snug text-foreground">
                              {cleanDisplayText(dishCopy.name)}
                            </p>
                            <span className="mt-2 inline-flex rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                              {language === "de" ? "Suppe" : "Soup"}
                            </span>
                            {dishCopy.description && (
                              <p className="mt-2 line-clamp-2 font-work text-sm leading-relaxed text-muted-high-contrast">
                                {cleanDisplayText(dishCopy.description)}
                              </p>
                            )}
                          </div>
                        );
                      })()}
                      {isValidMenuText(nextDayMenu.green[language]) && (() => {
                        const dishCopy = splitDishText(nextDayMenu.green[language], language, "green");

                        return (
                          <div className="rounded-xl border border-border/60 bg-background p-3">
                            <p className="font-cormorant text-2xl font-bold md:text-xl md:font-semibold leading-snug text-foreground">
                              {cleanDisplayText(dishCopy.name)}
                            </p>
                            <span className="mt-2 inline-flex rounded-full border border-accent/25 bg-accent/10 px-2 py-0.5 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
                              {language === "de" ? "Grünes Gericht" : "Green Dish"}
                            </span>
                            {dishCopy.description && (
                              <p className="mt-2 line-clamp-2 font-work text-sm leading-relaxed text-muted-high-contrast">
                                {cleanDisplayText(dishCopy.description)}
                              </p>
                            )}
                          </div>
                        );
                      })()}
                      {isValidMenuText(nextDayMenu.blue[language]) && (() => {
                        const dishCopy = splitDishText(nextDayMenu.blue[language], language, "blue");

                        return (
                          <div className="rounded-xl border border-border/60 bg-background p-3">
                            <p className="font-cormorant text-2xl font-bold md:text-xl md:font-semibold leading-snug text-foreground">
                              {cleanDisplayText(dishCopy.name)}
                            </p>
                            <span className="mt-2 inline-flex rounded-full border border-blue/25 bg-blue/10 px-2 py-0.5 font-work text-[10px] font-semibold uppercase tracking-[0.08em] text-blue">
                              {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                            </span>
                            {dishCopy.description && (
                              <p className="mt-2 line-clamp-2 font-work text-sm leading-relaxed text-muted-high-contrast">
                                {cleanDisplayText(dishCopy.description)}
                              </p>
                            )}
                          </div>
                        );
                      })()}
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
            <WeeklyMenuPendingUpdate />
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
                              <h4 className={`font-cormorant text-xl font-bold md:text-base md:font-semibold mb-1 ${item.isUnavailable ? 'text-muted-high-contrast' : 'text-foreground'}`}>
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
                            <span className={`font-bold text-base md:font-semibold md:text-sm font-work shrink-0 ${item.isUnavailable ? 'text-muted-high-contrast' : 'text-foreground'}`}>
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
                            {subcategory.items.map((item: KlassikerItem) => (
                              <div 
                                key={item.id} 
                                className="rounded-xl border border-border/50 bg-background/60 p-3"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <div className="flex-1">
                                    <span className="font-work text-base font-bold md:text-sm md:font-semibold text-foreground">
                                      {item.name[language]}
                                    </span>
                                    {item.sizeNote && (
                                      <p className="mt-1 text-xs font-work text-muted-high-contrast">
                                        {cleanDisplayText(item.sizeNote)}
                                      </p>
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
                            ))}
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
