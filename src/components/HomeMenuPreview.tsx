import { Link } from "react-router-dom";
import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { useWeeklyMenuAvailable } from "@/hooks/useWeeklyMenuAvailable";
import { getTodayHoliday } from "@/data/holidaysData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AllergenCodes } from "@/components/MenuDishDetails";
import { splitDishText } from "@/lib/splitDishText";
import { cleanDisplayText } from "@/lib/displayText";
import { DietaryBadges } from "@/components/menu/DietaryBadges";

const isValidMenuText = (text?: string) => {
  const t = (text ?? "").trim();
  if (!t) return false;
  if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(t)) return false;
  return true;
};

export const HomeMenuPreview = () => {
  const { language } = useLanguage();
  const { menu, loadedAt, isLoading } = useWeeklyMenu();
  const weeklyMenuAvailable = useWeeklyMenuAvailable(loadedAt);

  const today = new Date();
  const currentHour = today.getHours();
  const dayIndex = today.getDay();
  const dayNames = {
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  };
  const todayName = dayNames[language][dayIndex];
  const todayMenu = menu.days.find((day) => day.day[language] === todayName);
  const nextDayIndex = (dayIndex + 1) % 7;
  const nextDayName = dayNames[language][nextDayIndex];
  const nextDayMenu = menu.days.find((day) => day.day[language] === nextDayName);
  const todayHoliday = getTodayHoliday();
  const hasMenuData = !!todayMenu && (
    isValidMenuText(todayMenu.soup?.[language]) ||
    isValidMenuText(todayMenu.green?.[language]) ||
    isValidMenuText(todayMenu.blue?.[language])
  );
  const isClosed = dayIndex === 0 || todayHoliday !== null || !hasMenuData || currentHour >= 19;


  // Griglia dei piatti — due decisioni che vivono nel CSS, non qui:
  //  · le colonne le conta :has(), perché nei giorni in cui arriva solo la
  //    zuppa la griglia fissa a tre lasciava due colonne vuote;
  //  · le righe sono dichiarate sul contenitore e le card le ereditano con
  //    grid-rows-subgrid, così nome, descrizione, dietary e allergeni si
  //    allineano fra una card e l'altra senza min-h inventati.
  // Entrambe provate in lab.html, esperimenti "subgrid" e "has".
  const dishes = todayMenu && weeklyMenuAvailable ? [
    { key: "soup", label: language === "de" ? "Suppe" : "Soup", price: "6,90", text: todayMenu.soup[language], allergens: todayMenu.soupMeta?.allergens },
    { key: "green", label: language === "de" ? "Grünes Gericht" : "Green Dish", price: "15,90", text: todayMenu.green[language], allergens: todayMenu.greenMeta?.allergens },
    { key: "blue", label: language === "de" ? "Blaues Gericht" : "Blue Dish", price: "15,90", text: todayMenu.blue[language], allergens: todayMenu.blueMeta?.allergens },
  ].filter((dish) => isValidMenuText(dish.text)) : [];

  const nextDishes = nextDayMenu && weeklyMenuAvailable ? [
    { key: "soup", label: language === "de" ? "Suppe" : "Soup", text: nextDayMenu.soup[language] },
    { key: "green", label: language === "de" ? "Grünes Gericht" : "Green Dish", text: nextDayMenu.green[language] },
    { key: "blue", label: language === "de" ? "Blaues Gericht" : "Blue Dish", text: nextDayMenu.blue[language] },
  ].filter((dish) => isValidMenuText(dish.text)) : [];

  const showPending = !weeklyMenuAvailable && !isLoading;


  return (
    <section id="menu" className="bg-card py-10 pb-[calc(6rem+env(safe-area-inset-bottom))] md:py-14 md:pb-14">
      <div className="container mx-auto px-5">
        <div className="mx-auto max-w-2xl lg:max-w-5xl">
          {/* Il giorno della settimana è un dato, non un ornamento: fa il lavoro
              che sulle altre sezioni faceva l'eyebrow numerata. */}
          <div className="mb-6 max-w-[62ch]">
            <p className="font-work text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-high-contrast">
              {todayName}
            </p>
            <h2 className="h2-editorial mt-1.5 text-primary">
              {language === "de" ? "Heute aus der Küche" : "From the kitchen today"}
            </h2>
            <p className="mt-3 text-pretty font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
              {language === "de"
                ? "Ein kurzer Blick auf das Tagesmenü. Für Klassiker, Getränke und Details geht es weiter zur Speisekarte."
                : "A quick look at today's menu. Classics, drinks and details are on the menu page."}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4 lg:grid lg:grid-cols-3 lg:gap-4 lg:space-y-0">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-lg border border-border/75 bg-card p-4 md:p-5">
                  <Skeleton className="mb-3 h-5 w-24" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : !isClosed && dishes.length > 0 ? (
            <div className="grid gap-4 lg:grid-cols-3 lg:grid-rows-[auto_1fr_auto_auto] lg:has-[>*:only-child]:max-w-md lg:has-[>*:only-child]:grid-cols-1 lg:has-[>:nth-child(2):last-child]:grid-cols-2">
              {dishes.map((dish) => {
                const dishCopy = splitDishText(dish.text, language, dish.key);

                return (
                <div key={dish.key} className="rounded-lg border p-4 surface-card md:p-5 lg:row-span-4 lg:grid lg:grid-rows-subgrid lg:gap-0">
                  {/* Quattro righe, una per fascia. Devono restare figli diretti
                      della card, altrimenti subgrid non le vede. */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex min-w-0 flex-wrap items-center gap-2">
                      <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground md:text-2xl">
                        {cleanDisplayText(dishCopy.name)}
                      </h3>
                      <span className={`font-work text-[10px] font-semibold uppercase tracking-[0.08em] ${
                        dish.key === "blue"
                          ? "text-blue"
                          : "text-accent"
                      }`}>
                        {dish.label}
                      </span>
                    </div>
                    <p className="shrink-0 font-work text-sm font-semibold text-accent" aria-label={`${dish.price.replace(",", " Euro ")}`}>{dish.price}</p>
                  </div>
                  <div>
                    {dishCopy.description && (
                      <p className="mt-2 text-pretty font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                        {cleanDisplayText(dishCopy.description)}
                      </p>
                    )}
                  </div>
                  <div><DietaryBadges text={dish.text} language={language} /></div>
                  <div className="mt-3"><AllergenCodes codes={dish.allergens} /></div>
                </div>
                );
              })}
            </div>
          ) : showPending ? (
            <div className="rounded-lg border p-8 surface-card">
              <p className="font-cormorant text-2xl italic text-foreground/85 md:text-3xl">
                {language === "de" ? "Der Wochenplan wird gerade aktualisiert." : "The weekly menu is being updated."}
              </p>
              <p className="mt-3 max-w-md font-work text-sm text-muted-high-contrast">
                {language === "de"
                  ? "Schau am Montag wieder vorbei oder ruf uns an: +43 1 586 28 39."
                  : "Check back on Monday or call us: +43 1 586 28 39."}
              </p>
            </div>
          ) : (
            <div className="rounded-lg border p-8 surface-card">
              <p className="font-cormorant text-2xl italic text-foreground/85 md:text-3xl">
                {todayHoliday
                  ? todayHoliday.name[language]
                  : currentHour >= 19
                    ? language === "de" ? "Für heute geschlossen" : "Closed for today"
                    : language === "de" ? "Heute geschlossen" : "Closed today"}
              </p>
              <p className="mt-3 max-w-md font-work text-sm text-muted-high-contrast">
                {language === "de" ? "Schau gern in die komplette Speisekarte für Klassiker und Getränke." : "You can still browse the full menu for classics and drinks."}
              </p>

              {nextDishes.length > 0 && (
                <div className="mt-6 border-t border-border/40 pt-5 text-left">
                  <p className="mb-4 font-work text-xs uppercase tracking-wider text-muted-high-contrast">
                    {language === "de" ? `Vorschau auf ${nextDayName}` : `Preview of ${nextDayName}`}
                  </p>
                  <div className="grid gap-3 lg:grid-cols-3">
                    {nextDishes.map((dish) => {
                      const dishCopy = splitDishText(dish.text, language, dish.key);
                      return (
                        <div key={dish.key} className="rounded-lg border border-border/60 bg-background p-3">
                          <p className="font-cormorant text-xl font-semibold leading-snug text-foreground">
                            {cleanDisplayText(dishCopy.name)}
                          </p>
                          <span className={`mt-2 inline-flex font-work text-[10px] font-semibold uppercase tracking-[0.08em] ${dish.key === "blue" ? "text-blue" : "text-accent"}`}>
                            {dish.label}
                          </span>
                          {dishCopy.description && (
                            <p className="mt-2 line-clamp-2 font-work text-sm leading-relaxed text-muted-high-contrast">
                              {cleanDisplayText(dishCopy.description)}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}


          <div className="mt-4 flex items-start gap-2 rounded-lg border px-4 py-3 text-left surface-card">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="font-work text-xs leading-relaxed text-muted-high-contrast sm:text-sm">
              {language === "de"
                ? "Markierte Optionen werden ohne glutenhaltige Zutaten gekocht. Bei Allergien bitte kurz bei uns nachfragen."
                : "Marked options are made without gluten containing ingredients. If you have allergies, please ask us first."}
            </p>
          </div>

          <div className="mt-8">
            {/* Secondario, non verde pieno: la barra fissa porta già l'unica
                azione primaria del viewport (CLAUDE.md, una CTA per viewport). */}
            <Button size="lg" variant="outline" className="font-work" asChild>
              <Link to="/menu">{language === "de" ? "Zur Speisekarte" : "Go to menu"}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};