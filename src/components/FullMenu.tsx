import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { BotanicalDecoration } from "./BotanicalDecoration";
import foodDetailImg from "@/assets/food-detail-real.jpg";
import gardenImg from "@/assets/garden-real.jpg";
import interiorImg from "@/assets/interior-real.jpg";

export const FullMenu = () => {
  const { language } = useLanguage();
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
    <section id="full-menu" className="relative bg-background">
      {/* Hero-style header with photo */}
      <div className="relative h-[400px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${foodDetailImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-primary/50" />
        
        {/* Title overlay */}
        <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <BotanicalDecoration
            variant="vine"
            className="w-64 h-8 mx-auto mb-6 text-background/30"
          />
          <h2 className="text-5xl md:text-7xl font-caveat font-bold text-background drop-shadow-lg mb-4">
            {language === "de" ? "Wochenkarte" : "Weekly Menu"}
          </h2>
          {menu?.period && (
            <p className="text-xl md:text-2xl font-lora text-background/95 drop-shadow-md">
              {menu.period}
            </p>
          )}
        </div>
      </div>

      {/* Content section */}
      <div className="container mx-auto max-w-6xl px-4 py-16 relative">
        <BotanicalDecoration
          variant="flower"
          className="absolute top-10 right-10 w-32 h-32 text-primary/10"
        />
        <BotanicalDecoration
          variant="leaf"
          className="absolute bottom-10 left-10 w-28 h-28 text-accent/10"
        />

        <div className="max-w-5xl mx-auto">
          {/* Menu Card */}
          <Card className="border-2 border-border/20 bg-card shadow-elevated">
            <div className="p-8 md:p-12 space-y-12">
              
              {/* Weekly Menu Section */}
              <div>
                <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary text-center mb-2">
                  {language === "de" ? "Wochenkarte" : "Weekly Menu"}
                </h3>
                <p className="text-center text-sm text-muted-foreground mb-8 font-lora">
                  {menu.period}
                </p>
                <Separator className="my-8 bg-border/30" />
                
                <div className="space-y-8">
                  {menu.days.map((day, idx) => (
                    <div key={idx} className="space-y-3">
                      <h4 className="font-lora text-xl text-primary font-semibold">
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
                                {language === "de" ? "Tagesgericht Grün" : "Daily Dish Green"}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {day.green[language]}
                              </p>
                              {day.greenNote && day.greenNote[language] && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {day.greenNote[language]}
                                </p>
                              )}
                            </div>
                            <span className="text-sm font-light whitespace-nowrap">
                              15,20 €
                            </span>
                          </div>
                        </div>
                      )}

                      {day.blue && day.blue[language] && (
                        <div className="pl-6 mt-2">
                          <div className="flex justify-between items-start gap-4">
                            <div className="flex-1">
                              <p className="text-sm font-medium mb-1 text-primary">
                                {language === "de" ? "Tagesgericht Blau" : "Daily Dish Blue"}
                              </p>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {day.blue[language]}
                              </p>
                              {day.blueNote && day.blueNote[language] && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  {day.blueNote[language]}
                                </p>
                              )}
                            </div>
                            <span className="text-sm font-light whitespace-nowrap">
                              15,20 €
                            </span>
                          </div>
                        </div>
                      )}

                      {idx < menu.days.length - 1 && (
                        <Separator className="mt-6 bg-border/20" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-12 bg-border/30" />

              {/* Fixed Warm Dishes */}
              <div>
                <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-6">
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
                            <Badge key={i} variant="outline" className="text-xs font-light border-border/40">
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

              <Separator className="my-12 bg-border/30" />

              {/* Salads Section */}
              <div>
                <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-6">
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
                            <Badge key={i} variant="outline" className="text-xs font-light border-border/40">
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

              <Separator className="my-12 bg-border/30" />

              {/* Drinks Section */}
              <div>
                <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary text-center mb-8">
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
              <div className="text-center pt-8 border-t border-border/20">
                <p className="text-xs text-muted-foreground italic">
                  {language === "de" 
                    ? "Alle Preise in Euro · Änderungen vorbehalten" 
                    : "All prices in Euro · Subject to change"}
                </p>
              </div>
            </div>
          </Card>

          {/* Photo Gallery link */}
          <div className="text-center mt-10">
            <a
              href="#food-gallery"
              className="inline-block font-lora text-lg text-primary hover:text-accent transition-colors underline decoration-2 underline-offset-4"
            >
              {language === "de"
                ? "→ Foto-Galerie ansehen"
                : "→ View photo gallery"}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
