import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { getDietaryIcons } from "@/utils/menuIcons";
import { DetailedFlower } from "@/components/FloralDecorations";

export const DailyMenuHighlight = () => {
  const { t, language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();

  // Get today's day name
  const getTodayDayName = () => {
    const days = {
      de: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
      en: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    };
    const today = new Date().getDay();
    return {
      de: days.de[today],
      en: days.en[today]
    };
  };

  // Find today's menu
  const todayDayName = getTodayDayName();
  const todayMenu = menu.days.find(day => {
    const matchDE = day.day.de?.toLowerCase().trim() === todayDayName.de.toLowerCase().trim();
    const matchEN = day.day.en?.toLowerCase().trim() === todayDayName.en.toLowerCase().trim();
    return matchDE || matchEN;
  });

  return (
    <section id="daily-menu" className="py-8 md:py-12 bg-gradient-to-br from-primary/5 via-background to-accent/5 relative overflow-hidden">
      {/* Decorative Flowers - Maggiore contrasto */}
      <div className="absolute top-8 left-8 w-20 h-20 text-blue-600 opacity-80">
        <DetailedFlower className="w-full h-full" />
      </div>
      <div className="absolute bottom-8 right-8 w-20 h-20 text-teal-600 opacity-80">
        <DetailedFlower className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full mb-4">
              <Calendar className="w-7 h-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-2">
              <span className="font-dancing text-3xl md:text-5xl text-primary">
                {language === 'de' ? 'Heute' : 'Today'}
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <p className="text-sm">{todayDayName[language]}</p>
            </div>
          </div>

          {isLoading ? (
            <Card className="p-6 md:p-8 bg-card border-border shadow-lg">
              <Skeleton className="h-8 w-32 mb-6" />
              <div className="space-y-6">
                <div>
                  <Skeleton className="h-6 w-24 mb-2" />
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
                <div>
                  <Skeleton className="h-6 w-32 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
                <div>
                  <Skeleton className="h-6 w-28 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            </Card>
          ) : todayMenu ? (
            <Card className="p-6 md:p-8 bg-card border-border shadow-lg hover:shadow-xl transition-shadow">
              <div className="space-y-6">
                {/* Soup */}
                {todayMenu.soup && (todayMenu.soup.de || todayMenu.soup.en) && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                        {t("menu.soup")}
                      </Badge>
                      {getDietaryIcons({ de: todayMenu.soup.de, en: todayMenu.soup.en }).length > 0 && (
                        <div className="flex gap-1">
                          {getDietaryIcons({ de: todayMenu.soup.de, en: todayMenu.soup.en }).map((item, i) => (
                            <div key={i} title={item.label}>{item.icon}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-base md:text-lg text-foreground font-medium">{todayMenu.soup[language]}</p>
                    <p className="text-xs text-muted-foreground mt-1">{t("menu.soupPrice")}</p>
                  </div>
                )}

                {/* Green Dish */}
                {todayMenu.green && (todayMenu.green.de || todayMenu.green.en) && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700">
                        {t("menu.greenDish")}
                      </Badge>
                      {(getDietaryIcons({ de: todayMenu.green.de, en: todayMenu.green.en }).length > 0 || 
                        getDietaryIcons(todayMenu.greenNote).length > 0) && (
                        <div className="flex gap-1">
                          {[...getDietaryIcons({ de: todayMenu.green.de, en: todayMenu.green.en }), 
                            ...getDietaryIcons(todayMenu.greenNote)].map((item, i) => (
                            <div key={i} title={item.label}>{item.icon}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-base md:text-lg text-foreground font-medium">{todayMenu.green[language]}</p>
                    {todayMenu.greenNote && todayMenu.greenNote[language] && (
                      <p className="text-xs text-muted-foreground mt-1 italic">{todayMenu.greenNote[language]}</p>
                    )}
                  </div>
                )}

                {/* Blue Dish */}
                {todayMenu.blue && (todayMenu.blue.de || todayMenu.blue.en) && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700">
                        {t("menu.blueDish")}
                      </Badge>
                      {(getDietaryIcons({ de: todayMenu.blue.de, en: todayMenu.blue.en }).length > 0 || 
                        getDietaryIcons(todayMenu.blueNote).length > 0) && (
                        <div className="flex gap-1">
                          {[...getDietaryIcons({ de: todayMenu.blue.de, en: todayMenu.blue.en }), 
                            ...getDietaryIcons(todayMenu.blueNote)].map((item, i) => (
                            <div key={i} title={item.label}>{item.icon}</div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-base md:text-lg text-foreground font-medium">{todayMenu.blue[language]}</p>
                    {todayMenu.blueNote && todayMenu.blueNote[language] && (
                      <p className="text-xs text-muted-foreground mt-1 italic">{todayMenu.blueNote[language]}</p>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card className="p-6 md:p-8 bg-card border-border shadow-lg text-center">
              <p className="text-muted-foreground">
                {language === 'de' 
                  ? 'Heute ist kein Menü verfügbar. Schauen Sie sich unser wöchentliches Menü unten an.' 
                  : 'No menu available for today. Check out our weekly menu below.'}
              </p>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
};
