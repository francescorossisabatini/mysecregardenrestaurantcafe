import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { UtensilsCrossed, Leaf, Wheat, Milk, Salad, Flame, Feather, CircleAlert, Nut, Egg } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { getDietaryIcons } from "@/utils/menuIcons";

export const MenuHighlight = () => {
  const { t, language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  
  return (
    <section id="menu" className="py-16 md:py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <UtensilsCrossed className="w-8 h-8 text-primary" />
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
              <span className="font-dancing text-4xl md:text-6xl text-primary">{t("menu.title")}</span>
            </h2>
            
            <p className="text-lg md:text-xl mb-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("menu.weeklyUpdate")}
            </p>
            
            <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8">
              {t("menu.description")}
            </p>
          </div>

          {/* Weekly Menu */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-center mb-8 text-foreground">
              {t("menu.weeklyMenu")} {isLoading ? <Skeleton className="inline-block w-32 h-6" /> : menu.period}
            </h3>

            {isLoading ? (
              <div className="grid gap-6 md:gap-8">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="p-6 md:p-8 bg-card border-border">
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
                ))}
              </div>
            ) : (
              <div className="grid gap-6 md:gap-8">
                {menu.days.map((day, index) => (
                <Card key={index} className="p-6 md:p-8 bg-card border-border">
                  <h4 className="text-xl md:text-2xl font-bold mb-6 text-primary">
                    {day.day[language]}
                  </h4>
                  
                  <div className="space-y-6">
                    {/* Soup */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-accent/10 text-accent-foreground border-accent/20">
                          {t("menu.soup")}
                        </Badge>
                        {getDietaryIcons({ de: day.soup.de, en: day.soup.en }).length > 0 && (
                          <div className="flex gap-1">
                            {getDietaryIcons({ de: day.soup.de, en: day.soup.en }).map((item, i) => (
                              <div key={i} title={item.label}>{item.icon}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-foreground">{day.soup[language]}</p>
                      <p className="text-xs text-muted-foreground mt-1">{t("menu.soupPrice")}</p>
                    </div>

                    {/* Green Dish */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-300 dark:border-green-700">
                          {t("menu.greenDish")}
                        </Badge>
                        {getDietaryIcons({ de: day.green.de, en: day.green.en }).length > 0 && (
                          <div className="flex gap-1">
                            {getDietaryIcons({ de: day.green.de, en: day.green.en }).map((item, i) => (
                              <div key={i} title={item.label}>{item.icon}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-foreground">{day.green[language]}</p>
                    </div>

                    {/* Blue Dish */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-300 dark:border-blue-700">
                          {t("menu.blueDish")}
                        </Badge>
                        {(getDietaryIcons({ de: day.blue.de, en: day.blue.en }).length > 0 || 
                          getDietaryIcons(day.blueNote).length > 0) && (
                          <div className="flex gap-1">
                            {[...getDietaryIcons({ de: day.blue.de, en: day.blue.en }), 
                              ...getDietaryIcons(day.blueNote)].map((item, i) => (
                              <div key={i} title={item.label}>{item.icon}</div>
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-sm md:text-base text-foreground">{day.blue[language]}</p>
                    </div>
                  </div>
                </Card>
              ))}
              </div>
            )}
          </div>

          {/* Icon Legend */}
          <Card className="p-6 mb-6 bg-muted/30 border-muted">
            <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
              {language === 'de' ? 'Legende der Symbole' : 'Symbol Legend'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-foreground">Vegan</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Vegetarisch' : 'Vegetarian'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wheat className="w-4 h-4 text-amber-600 line-through flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Glutenfrei' : 'Gluten-free'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Milk className="w-4 h-4 text-blue-600 line-through flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Laktosefrei' : 'Lactose-free'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Salad className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-foreground">Low Carb</span>
              </div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-600 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Scharf' : 'Spicy'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Leicht' : 'Light'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleAlert className="w-4 h-4 text-purple-600 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Enthält Knoblauch' : 'Contains Garlic'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CircleAlert className="w-4 h-4 text-amber-600 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Enthält Zwiebeln' : 'Contains Onion'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Nut className="w-4 h-4 text-orange-700 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Enthält Erdnüsse' : 'Contains Peanuts'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Egg className="w-4 h-4 text-yellow-600 flex-shrink-0" />
                <span className="text-foreground">{language === 'de' ? 'Enthält Eier' : 'Contains Eggs'}</span>
              </div>
            </div>
          </Card>

          {/* Pricing Info */}
          <Card className="p-6 bg-primary/5 border-primary/20 text-center">
            <p className="text-lg font-semibold text-foreground mb-2">
              {t("menu.dailyDishPrice")}
            </p>
            <p className="text-sm text-muted-foreground">
              {t("menu.soupInfo")}
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
