import { SHOW_WEEKLY_MENU } from "@/config/menuFlags";
import { WeeklyMenuUnavailable } from "@/components/WeeklyMenuUnavailable";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CTATopRow } from "@/components/CTATopRow";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { translatePeriod } from "@/lib/translatePeriod";
import { splitDishText } from "@/lib/splitDishText";
import {
  getTodayHoliday,
  getDateForMenuDay,
  getHolidayForDate,
  getHolidayForDayName,
  isSundayByName,
} from "@/data/holidaysData";

// Treat spreadsheet error placeholders as empty
const isValidMenuText = (text?: string) => {
  const t = (text ?? "").trim();
  if (!t) return false;
  if (/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(t)) return false;
  return true;
};

// Parse dietary labels
const parseDietaryLabels = (text: string) => {
  const lowerText = text.toLowerCase();
  return {
    isVegan: lowerText.includes("vegan"),
    isGlutenFree: lowerText.includes("glutenfrei") || lowerText.includes("gluten-free"),
    isBio: lowerText.includes("bio"),
  };
};

const DietaryBadges = ({ text, language }: { text: string; language: "de" | "en" }) => {
  const labels = parseDietaryLabels(text);
  
  return (
    <div className="flex items-center gap-2 mt-1 flex-wrap">
      {labels.isVegan && (
        <span className="text-xs font-work font-semibold text-accent">vegan</span>
      )}
      {labels.isGlutenFree && (
        <span className="text-xs font-work font-semibold text-primary">
          {language === "de" ? "ohne Gluten-Zutaten" : "no gluten ingredients"}
        </span>
      )}
      {labels.isBio && (
        <span className="text-xs font-work font-semibold text-accent">bio</span>
      )}
    </div>
  );
};

const dishLabels = {
  soup: { de: "Suppe", en: "Soup" },
  green: { de: "Grünes Gericht", en: "Green Dish" },
  blue: { de: "Blaues Gericht", en: "Blue Dish" },
} as const;

const WeeklyDish = ({
  kind,
  text,
  price,
  language,
}: {
  kind: keyof typeof dishLabels;
  text: string;
  price: string;
  language: "de" | "en";
}) => {
  const dishCopy = splitDishText(text, language, kind);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="font-cormorant text-xl font-semibold leading-snug text-foreground">
          {dishCopy.name}
        </h3>
        <span className={`rounded-full border px-2 py-0.5 font-work text-[10px] font-semibold uppercase tracking-[0.08em] ${
          kind === "blue" ? "border-blue/25 bg-blue/10 text-blue" : "border-accent/25 bg-accent/10 text-accent"
        }`}>
          {dishLabels[kind][language]}
        </span>
        <span className="ml-auto font-work text-xs font-semibold text-accent">{price}</span>
      </div>
      {dishCopy.description && (
        <p className="mt-1 font-work text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
          {dishCopy.description}
        </p>
      )}
      <DietaryBadges text={text} language={language} />
    </div>
  );
};

const WeeklySpecials = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  
  const today = new Date();
  const dayNames = {
    de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
    en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  const todayName = dayNames.de[today.getDay()];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={language === "de" ? "Wochenmenü" : "Weekly Specials"}
        description={language === "de" 
          ? "Das Wochenmenü von My Secret Garden: Suppe, grünes Gericht und blaues Gericht von Montag bis Samstag."
          : "The weekly menu at My Secret Garden: soup, green dish and blue dish from Monday to Saturday."}
        path="/wochenkarte"
      />
      <Navigation />
      
      {/* Hero */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mb-3">
            {language === "de" ? "Wochenmenü" : "Weekly Specials"}
          </h1>
          <p className="text-muted-foreground font-work text-base mb-2">
            {translatePeriod(menu.period, language)}
          </p>
          <p className="text-sm text-muted-foreground font-work max-w-md mx-auto">
            {language === "de"
              ? "Was diese Woche mittags am Tresen steht. Kurz prüfen, dann vorbeikommen."
              : "What is at the counter for lunch this week. Check it, then come by."}
          </p>
          
          {/* Top CTA Row */}
          <div className="mt-6">
            <CTATopRow show={["directions", "call"]} />
          </div>
        </div>
      </section>

      {/* Weekly Menu */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            {!SHOW_WEEKLY_MENU ? (
              <WeeklyMenuUnavailable />
            ) : isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Skeleton key={i} className="h-32 w-full rounded-xl" />
                ))}
              </div>
            ) : (
              menu.days.map((day, index) => {
                const dayDate = getDateForMenuDay(menu.period, index);
                const dayHoliday = dayDate ? getHolidayForDate(dayDate) : getHolidayForDayName(day.day.de);
                const isDaySunday = dayDate ? dayDate.getDay() === 0 : isSundayByName(day.day.de);
                const isToday = day.day.de === todayName;

                const hasDayMenuData =
                  isValidMenuText(day.soup?.de) ||
                  isValidMenuText(day.green?.de) ||
                  isValidMenuText(day.blue?.de);

                const isDayClosed = !!dayHoliday || isDaySunday || !hasDayMenuData;

                return (
                  <div
                    key={index}
                    className={`rounded-xl p-5 ${
                      isToday ? "bg-primary/5 border-2 border-primary/20" : "bg-muted/50"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <h2 className="font-cormorant text-xl font-semibold text-foreground">
                        {day.day[language]}
                      </h2>
                      {isToday && (
                        <Badge variant="default" className="text-xs">
                          {language === "de" ? "Heute" : "Today"}
                        </Badge>
                      )}
                    </div>

                    {isDayClosed ? (
                      <div className="text-center py-4">
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
                      <div className="space-y-3">
                        {isValidMenuText(day.soup[language]) && (
                          <WeeklyDish kind="soup" text={day.soup[language]} price="6,90" language={language} />
                        )}
                        {isValidMenuText(day.green[language]) && (
                          <WeeklyDish kind="green" text={day.green[language]} price="15,90" language={language} />
                        )}
                        {isValidMenuText(day.blue[language]) && (
                          <WeeklyDish kind="blue" text={day.blue[language]} price="15,90" language={language} />
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* End CTA Block */}
      <CTAEndBlock show={["menu", "directions"]} />

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default WeeklySpecials;
