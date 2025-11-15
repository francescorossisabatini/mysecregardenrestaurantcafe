import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { getDietaryIcons } from "@/utils/menuIcons";
import { OrganicLines } from "@/components/AbstractPlantDecoration";

export const FullMenu = () => {
  const { t, language } = useLanguage();
  const { menu } = useWeeklyMenu();

  const fixedDishes = {
    warm: {
      de: [
        {
          name: "Indisches Dal",
          price: "9,90 €",
          description: "Cremige rote Linsen verfeinert mit sautierten Zwiebeln, gehackten Tomaten und authentischen indischen Gewürzen. Serviert mit Bio-Naturreis.",
          tags: ["vegan", "glutenfrei"]
        }
      ],
      en: [
        {
          name: "Indian Dal",
          price: "9,90 €",
          description: "Creamy red lentils refined with sautéed onions, chopped tomatoes and authentic Indian spices. Served with organic brown rice.",
          tags: ["vegan", "gluten-free"]
        }
      ]
    },
    salads: {
      de: [
        {
          name: "Bunter Salat",
          price: "5,90 / 9,90 €",
          size: "klein / groß",
          description: "Reichhaltige Mischung aus Lollo Rosso, Babyspinat, Rucola, Radicchio, Karotten, Rote Rüben, Kaiserschoten, Sprossen, Äpfeln und Granatapfelkernen.",
          tags: ["vegan", "glutenfrei"]
        },
        {
          name: "Secret Garden Salat mit Avocado",
          price: "16,90 €",
          description: "Großer Bunter Salat mit frischen Avocadostreifen.",
          tags: ["vegan", "glutenfrei"]
        },
        {
          name: "Secret Garden Salat mit Ziegenkäse",
          price: "16,90 €",
          description: "Großer Bunter Salat mit gegrilltem Ziegenkäse und hausgemachtem Apfel-Chutney.",
          tags: ["glutenfrei"]
        },
        {
          name: "Secret Garden Salat mit Tofu",
          price: "16,90 €",
          description: "Großer Bunter Salat mit knusprig gebratenen Tofuwürfeln, in Tamari-Gewürzsauce abgelöscht.",
          tags: ["vegan", "glutenfrei"]
        }
      ],
      en: [
        {
          name: "Colorful Salad",
          price: "5,90 / 9,90 €",
          size: "small / large",
          description: "Rich mixture of Lollo Rosso, baby spinach, arugula, radicchio, carrots, beetroot, snow peas, sprouts, apples and pomegranate seeds.",
          tags: ["vegan", "gluten-free"]
        },
        {
          name: "Secret Garden Salad with Avocado",
          price: "16,90 €",
          description: "Large colorful salad with fresh avocado strips.",
          tags: ["vegan", "gluten-free"]
        },
        {
          name: "Secret Garden Salad with Goat Cheese",
          price: "16,90 €",
          description: "Large colorful salad with grilled goat cheese and homemade apple chutney.",
          tags: ["gluten-free"]
        },
        {
          name: "Secret Garden Salad with Tofu",
          price: "16,90 €",
          description: "Large colorful salad with crispy fried tofu cubes, deglazed in tamari spice sauce.",
          tags: ["vegan", "gluten-free"]
        }
      ]
    },
    drinks: {
      de: [
        { name: "Ingwer-Limonade (hausgemacht)", price: "3,00 / 4,70 €", size: "0,2 / 0,5 l" },
        { name: "Hausgemachter Eistee", price: "3,50 €", size: "0,3 l" },
        { name: "Apfelsaft naturtrüb", price: "3,40 / 5,30 €", size: "0,2 / 0,5 l" },
        { name: "Pfirsich-Nektar", price: "4,50 / 7,50 €", size: "0,2 / 0,5 l" },
        { name: "Kokoswasser", price: "3,50 / 5,50 €", size: "0,2 / 0,5 l" },
        { name: "Mineralwasser", price: "2,40 €", size: "0,33 l" }
      ],
      en: [
        { name: "Ginger Lemonade (homemade)", price: "3,00 / 4,70 €", size: "0,2 / 0,5 l" },
        { name: "Homemade Iced Tea", price: "3,50 €", size: "0,3 l" },
        { name: "Cloudy Apple Juice", price: "3,40 / 5,30 €", size: "0,2 / 0,5 l" },
        { name: "Peach Nectar", price: "4,50 / 7,50 €", size: "0,2 / 0,5 l" },
        { name: "Coconut Water", price: "3,50 / 5,50 €", size: "0,2 / 0,5 l" },
        { name: "Mineral Water", price: "2,40 €", size: "0,33 l" }
      ]
    }
  };

  const currentDishes = fixedDishes.warm[language];
  const currentSalads = fixedDishes.salads[language];
  const currentDrinks = fixedDishes.drinks[language];

  return (
    <section id="full-menu" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Paper texture overlay */}
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}
      />

      {/* Decorative lines */}
      <div className="absolute top-10 left-10 w-64 h-32 text-primary/10">
        <OrganicLines className="w-full h-full" />
      </div>
      <div className="absolute bottom-10 right-10 w-64 h-32 text-accent/10">
        <OrganicLines className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header - Paper style */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-serif text-foreground mb-4 tracking-wide">
              SPEISEKARTE
            </h2>
            <div className="w-32 h-px bg-foreground/20 mx-auto my-8" />
            <p className="text-lg text-muted-foreground font-light italic">
              {language === "de" ? "Unser Angebot auf einen Blick" : "Our menu at a glance"}
            </p>
          </div>

          {/* Menu Card - Paper texture */}
          <Card className="border-2 border-foreground/10 bg-card/95 backdrop-blur-sm shadow-2xl">
            <div className="p-8 md:p-12 space-y-12">
              
              {/* Weekly Menu Section */}
              <div>
                <h3 className="text-3xl font-serif text-center mb-2 tracking-wide">
                  {language === "de" ? "Wochenkarte" : "Weekly Menu"}
                </h3>
                <p className="text-center text-sm text-muted-foreground mb-6 italic">
                  {menu.period}
                </p>
                <Separator className="my-8 bg-foreground/10" />
                
                <div className="space-y-8">
                  {menu.days.map((day, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="font-serif text-xl text-primary">
                        {day.day[language]}
                      </h4>
                      
                      {day.soup[language] && (
                        <div className="pl-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1">
                                {language === "de" ? "Tagessuppe" : "Soup of the Day"}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {day.soup[language]}
                              </p>
                            </div>
                            <span className="text-sm font-light whitespace-nowrap">
                              4,50 / 6,50 €
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {day.green[language] && (
                        <div className="pl-6">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1 text-accent">
                                {language === "de" ? "Tagesgericht" : "Daily Special"}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {day.green[language]}
                              </p>
                              <div className="flex gap-2 mt-2">
                                {getDietaryIcons(day.green).map((dietaryIcon, i) => (
                                  <div key={i} className="flex items-center gap-1" title={dietaryIcon.label}>
                                    {dietaryIcon.icon}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <span className="text-sm font-light whitespace-nowrap">
                              15,20 €
                            </span>
                          </div>
                        </div>
                      )}
                      
                      {idx < menu.days.length - 1 && (
                        <Separator className="mt-6 bg-foreground/5" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-12 bg-foreground/10" />

              {/* Fixed Warm Dishes */}
              <div>
                <h3 className="text-3xl font-serif text-center mb-8 tracking-wide">
                  {language === "de" ? "Warme Speisen" : "Warm Dishes"}
                </h3>
                
                <div className="space-y-6">
                  {currentDishes.map((dish, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-2">{dish.name}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {dish.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {dish.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-light border-foreground/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <span className="font-light whitespace-nowrap">{dish.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-12 bg-foreground/10" />

              {/* Salads Section */}
              <div>
                <h3 className="text-3xl font-serif text-center mb-8 tracking-wide">
                  {language === "de" ? "Frische Salate" : "Fresh Salads"}
                </h3>
                
                <div className="space-y-6">
                  {currentSalads.map((salad, idx) => (
                    <div key={idx} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">
                          {salad.name}
                          {salad.size && (
                            <span className="text-xs text-muted-foreground ml-2">
                              ({salad.size})
                            </span>
                          )}
                        </h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          {salad.description}
                        </p>
                        <div className="flex gap-2 flex-wrap">
                          {salad.tags.map((tag, i) => (
                            <Badge key={i} variant="outline" className="text-xs font-light border-foreground/20">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <span className="font-light whitespace-nowrap">{salad.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-12 bg-foreground/10" />

              {/* Drinks Section */}
              <div>
                <h3 className="text-3xl font-serif text-center mb-8 tracking-wide">
                  {language === "de" ? "Kalte Getränke" : "Cold Drinks"}
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {currentDrinks.map((drink, idx) => (
                    <div key={idx} className="flex justify-between items-center gap-4 text-sm">
                      <div className="flex-1">
                        <span className="font-light">{drink.name}</span>
                        {drink.size && (
                          <span className="text-xs text-muted-foreground ml-2">
                            {drink.size}
                          </span>
                        )}
                      </div>
                      <span className="font-light whitespace-nowrap text-sm">{drink.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer note */}
              <div className="text-center pt-8 border-t border-foreground/10">
                <p className="text-xs text-muted-foreground italic">
                  {language === "de" 
                    ? "Alle Preise in Euro · Änderungen vorbehalten" 
                    : "All prices in Euro · Subject to change"}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
