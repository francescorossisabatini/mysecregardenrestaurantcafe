import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { WeeklyMenuModal } from "./WeeklyMenuModal";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";

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
      
      <section id="full-menu" className="relative bg-background py-16 md:py-20">

        <div className="container mx-auto max-w-6xl px-4 relative">
          {/* Wochenkarte clickable card section */}
          <div className="max-w-4xl mx-auto mb-16 md:mb-24">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-caveat font-bold text-primary mb-3">
                {language === "de" ? "Speisekarte" : "Full Menu"}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground font-lora">
                {language === "de" 
                  ? "Unsere aktuelle Wochenkarte – wie auf der Speisekarte im Restaurant." 
                  : "Our current weekly menu – as shown on the restaurant menu."}
              </p>
            </div>

          {/* Clickable menu card with Sri Chinmoy artwork */}
          <div
            onClick={() => setIsMenuModalOpen(true)}
            className="relative border-2 border-primary/30 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/50 group"
            style={{ aspectRatio: '16 / 10' }}
          >
            {/* Background image - Sri Chinmoy's floral artwork */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${sriChinmoyFlowers})` }}
            />
            
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-background/75" />

            {/* Content - Minimal Layout */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center space-y-6">
              {/* Small label */}
              <p className="text-xs md:text-sm text-foreground/80 font-medium uppercase tracking-widest">
                {language === "de" ? "Diese Woche" : "This Week"}
              </p>
              
              {/* Main Title - Simple */}
              <h3 className="text-5xl md:text-7xl font-caveat text-primary">
                {language === "de" ? "Wochenkarte" : "Weekly Menu"}
              </h3>
              
              {/* Subtitle */}
              <p className="text-sm md:text-base text-foreground/85 font-lora">
                {language === "de" 
                  ? "Tippe für das komplette Menü" 
                  : "Tap for the complete menu"}
              </p>
            </div>
          </div>
          </div>

        </div>
      </section>
    </>
  );
};
