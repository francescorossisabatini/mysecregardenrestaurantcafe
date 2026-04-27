import { Link } from "react-router-dom";
import { ChevronRight, Info, UtensilsCrossed } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { getTodayHoliday } from "@/data/holidaysData";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { AllergenCodes } from "@/components/MenuDishDetails";
import { splitDishText } from "@/lib/splitDishText";
import { cleanDisplayText, joinDisplayText } from "@/lib/displayText";

const isValidMenuText = (text?: string) => {
  const t = (text ?? "").trim();
  if (!t) return false;
  if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(t)) return false;
  return true;
};

const parseDietaryLabels = (text: string): { isVegan: boolean; isGlutenFree: boolean; isBio: boolean } => {
  const lowerText = text.toLowerCase();
  return {
    isVegan: lowerText.includes("vegan"),
    isGlutenFree: lowerText.includes("glutenfrei") || lowerText.includes("gluten-free") || lowerText.includes("gluten free"),
    isBio: lowerText.includes("bio"),
  };
};

const DietaryBadges = ({ text, language }: { text: string; language: "de" | "en" }) => {
  const labels = parseDietaryLabels(text);
  const visibleLabels = [
    labels.isVegan ? "vegan" : null,
    labels.isGlutenFree ? (language === "de" ? "ohne Gluten Zutaten" : "no gluten ingredients") : null,
    labels.isBio ? "bio" : null,
  ].filter(Boolean);

  if (visibleLabels.length === 0) return null;

  return (
    <p className="mt-2 font-work text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
      {joinDisplayText(visibleLabels)}
    </p>
  );
};

export const HomeMenuPreview = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();

  const today = new Date();
  const currentHour = today.getHours();
  const dayIndex = today.getDay();
  const dayNames = {
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  };
  const todayName = dayNames[language][dayIndex];
  const todayMenu = menu.days.find((day) => day.day[language] === todayName);
  const todayHoliday = getTodayHoliday();
  const hasMenuData = !!todayMenu && (
    isValidMenuText(todayMenu.soup?.[language]) ||
    isValidMenuText(todayMenu.green?.[language]) ||
    isValidMenuText(todayMenu.blue?.[language])
  );
  const isClosed = dayIndex === 0 || todayHoliday !== null || !hasMenuData || currentHour >= 19;

  const dishes = todayMenu ? [
    { key: "soup", label: language === "de" ? "Suppe" : "Soup", price: "6,90", text: todayMenu.soup[language], allergens: todayMenu.soupMeta?.allergens },
    { key: "green", label: language === "de" ? "Grünes Gericht" : "Green Dish", price: "15,90", text: todayMenu.green[language], allergens: todayMenu.greenMeta?.allergens },
    { key: "blue", label: language === "de" ? "Blaues Gericht" : "Blue Dish", price: "15,90", text: todayMenu.blue[language], allergens: todayMenu.blueMeta?.allergens },
  ].filter((dish) => isValidMenuText(dish.text)) : [];

  return (
    <section id="menu" className="bg-section-soft py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              {language === "de" ? "Heute" : "Today"}
            </span>
            <h2 className="mt-2 font-cormorant text-3xl font-semibold text-foreground md:text-4xl">
              {language === "de" ? "Heute aus der Küche" : "From the kitchen today"}
            </h2>
            <p className="mx-auto mt-3 max-w-sm font-work text-sm leading-relaxed text-muted-foreground md:text-base">
              {language === "de"
                ? "Ein kurzer Blick auf das Tagesmenü. Für Klassiker, Getränke und Details geht es weiter zur Speisekarte."
                : "A quick look at today’s menu. Classics, drinks and details are on the menu page."}
            </p>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="rounded-2xl border border-border/75 bg-card p-4 shadow-card md:p-5">
                  <Skeleton className="mb-3 h-5 w-24" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ))}
            </div>
          ) : !isClosed && dishes.length > 0 ? (
            <div className="space-y-4">
              {dishes.map((dish) => {
                const dishCopy = splitDishText(dish.text, language, dish.key);

                return (
                <div key={dish.key} className="rounded-2xl border p-4 surface-card md:p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
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
                      {dishCopy.description && (
                        <p className="mt-2 font-work text-sm leading-relaxed text-muted-foreground md:text-base">
                          {cleanDisplayText(dishCopy.description)}
                        </p>
                      )}
                    </div>
                    <p className="shrink-0 font-work text-sm font-semibold text-accent">{dish.price}</p>
                  </div>
                  <DietaryBadges text={dish.text} language={language} />
                  <AllergenCodes codes={dish.allergens} />
                </div>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl border p-8 text-center surface-card">
              <p className="font-cormorant text-2xl italic text-foreground/85 md:text-3xl">
                {todayHoliday
                  ? todayHoliday.name[language]
                  : currentHour >= 19
                    ? language === "de" ? "Für heute geschlossen" : "Closed for today"
                    : language === "de" ? "Heute geschlossen" : "Closed today"}
              </p>
              <p className="mx-auto mt-3 max-w-md font-work text-sm text-muted-foreground">
                {language === "de" ? "Schau gern in die komplette Speisekarte für Klassiker und Getränke." : "You can still browse the full menu for classics and drinks."}
              </p>
            </div>
          )}

          <div className="mt-4 flex items-start gap-2 rounded-2xl border px-4 py-3 text-left surface-card">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <p className="font-work text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {language === "de"
                ? "Markierte Optionen werden ohne glutenhaltige Zutaten gekocht. Bei Allergien bitte kurz bei uns nachfragen."
                : "Marked options are made without gluten-containing ingredients. If you have allergies, please ask us first."}
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" asChild>
              <Link to="/menu">
                <UtensilsCrossed className="h-4 w-4" />
                {language === "de" ? "Zur Speisekarte" : "Go to menu"}
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};