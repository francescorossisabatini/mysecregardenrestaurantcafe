import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { BotanicalDecoration } from "./BotanicalDecoration";
import { WeeklyMenuModal } from "./WeeklyMenuModal";
import foodDetailImg from "@/assets/food-detail-real.jpg";
import gardenImg from "@/assets/garden-real.jpg";
import interiorImg from "@/assets/interior-real.jpg";

export const FullMenu = () => {
  const { language } = useLanguage();
  const { menu } = useWeeklyMenu();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

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
    <>
      <WeeklyMenuModal 
        isOpen={isMenuModalOpen} 
        onClose={() => setIsMenuModalOpen(false)}
        menu={menu}
      />
      
      <section id="full-menu" className="relative bg-background py-16 md:py-24">

        <div className="container mx-auto max-w-6xl px-4 relative">
          <BotanicalDecoration
            variant="flower"
            className="absolute top-10 right-10 w-32 h-32 text-primary/10"
          />
          <BotanicalDecoration
            variant="leaf"
            className="absolute bottom-10 left-10 w-28 h-28 text-accent/10"
          />

          {/* Wochenkarte clickable card section */}
          <div className="max-w-4xl mx-auto mb-16 md:mb-24">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-caveat font-bold text-primary mb-3">
                {language === "de" ? "Wochenkarte" : "Weekly Menu"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-lora">
                {language === "de" 
                  ? "Unsere aktuelle Wochenkarte – wie auf der Speisekarte im Restaurant." 
                  : "Our current weekly menu – as shown on the restaurant menu."}
              </p>
            </div>

            {/* Clickable menu card */}
            <div
              onClick={() => setIsMenuModalOpen(true)}
              className="relative bg-[#F5F1E3] border-2 border-[#1E1C1A] rounded-lg shadow-elevated cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl overflow-hidden"
              style={{ aspectRatio: '16 / 10' }}
            >
              {/* Decorative corners */}
              <BotanicalDecoration
                variant="flower"
                className="absolute top-4 left-4 w-12 h-12 text-primary/10"
              />
              <BotanicalDecoration
                variant="flower"
                className="absolute bottom-4 right-4 w-12 h-12 text-primary/10"
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
                <p className="text-xs md:text-sm text-muted-foreground mb-2 uppercase tracking-wider">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </p>
                <h3 className="text-4xl md:text-6xl font-caveat font-bold text-primary mb-3">
                  {language === "de" ? "Wochenkarte" : "Weekly Menu"}
                </h3>
                <p className="text-sm md:text-base text-foreground/70 font-lora max-w-md">
                  {language === "de" 
                    ? "Klicken, um die Wochenkarte wie eine physische Speisekarte zu öffnen." 
                    : "Click to open the weekly menu like a physical menu card."}
                </p>
              </div>
            </div>
          </div>

          {/* Rest of menu sections */}
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-border/20 bg-card shadow-elevated">
              <div className="p-8 md:p-12 space-y-12">

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
    </>
  );
};
