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
          {language === "de" ? "glutenfrei" : "gluten-free"}
        </span>
      )}
      {labels.isBio && (
        <span className="text-xs font-work font-semibold text-accent">bio</span>
      )}
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
          ? "Entdecke unser wechselndes Wochenmenü mit frischen vegetarischen und veganen Gerichten."
          : "Discover our changing weekly menu with fresh vegetarian and vegan dishes."}
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
            {menu.period}
          </p>
          <p className="text-sm text-muted-foreground font-work max-w-md mx-auto">
            {language === "de"
              ? "Jeden Tag frisch gekocht mit saisonalen Bio-Zutaten."
              : "Freshly cooked every day with seasonal organic ingredients."}
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
            {isLoading ? (
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
                      <h3 className="font-cormorant text-xl font-semibold text-foreground">
                        {day.day[language]}
                      </h3>
                      {isToday && (
                        <Badge className="bg-primary/15 text-primary border-primary/30 text-xs font-work">
                          {language === "de" ? "Heute" : "Today"}
                        </Badge>
                      )}
                    </div>

                    {isDayClosed ? (
                      <div className="text-center py-4">
                        <p className="font-cormorant text-lg text-foreground/80 italic">
                          {dayHoliday
                            ? dayHoliday.name[language]
                            : isDaySunday
                              ? (language === "de" ? "Geschlossen" : "Closed")
                              : (language === "de" ? "Geschlossen" : "Closed")}
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {/* Soup */}
                        {isValidMenuText(day.soup[language]) && (
                          <div>
                            <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                              {language === "de" ? "Suppe" : "Soup"}
                            </span>
                            <p className="text-foreground font-work text-sm mt-0.5">
                              {day.soup[language]}
                            </p>
                            <DietaryBadges text={day.soup[language]} language={language} />
                          </div>
                        )}

                        {/* Green Dish */}
                        {isValidMenuText(day.green[language]) && (
                          <div>
                            <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                              {language === "de" ? "Grünes Gericht" : "Green Dish"}
                            </span>
                            <p className="text-foreground font-work text-sm mt-0.5">
                              {day.green[language]}
                            </p>
                            <DietaryBadges text={day.green[language]} language={language} />
                          </div>
                        )}

                        {/* Blue Dish */}
                        {isValidMenuText(day.blue[language]) && (
                          <div>
                            <span className="text-xs text-primary font-work font-semibold uppercase tracking-wide">
                              {language === "de" ? "Blaues Gericht" : "Blue Dish"}
                            </span>
                            <p className="text-foreground font-work text-sm mt-0.5">
                              {day.blue[language]}
                            </p>
                            <DietaryBadges text={day.blue[language]} language={language} />
                          </div>
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
