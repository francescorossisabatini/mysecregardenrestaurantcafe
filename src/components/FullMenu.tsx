import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { BotanicalDecoration } from "./BotanicalDecoration";
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
      
      <section id="full-menu" className="relative bg-gradient-subtle py-16 md:py-24">

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
            className="relative border-4 border-primary/40 rounded-2xl shadow-elevated cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:border-primary/60 overflow-hidden group"
            style={{ aspectRatio: '16 / 10' }}
          >
            {/* Background image - Sri Chinmoy's floral artwork */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url(${sriChinmoyFlowers})` }}
            />
            
            {/* Artistic gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-background/70 via-background/85 to-primary/90" />

            {/* Decorative animated elements */}
            <div className="absolute top-4 left-4 w-20 h-20 opacity-20 animate-float-slow">
              <svg viewBox="0 0 100 100" className="text-accent">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            
            <div className="absolute bottom-4 right-4 w-24 h-24 opacity-20 animate-float-medium">
              <svg viewBox="0 0 100 100" className="text-primary">
                <path d="M50 10 Q 70 30 65 60 Q 60 80 50 90 Q 40 80 35 60 Q 30 30 50 10" fill="none" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>

            {/* Content - Artistic Layout */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center space-y-4">
              {/* Decorative top line */}
              <div className="flex items-center gap-3 opacity-60">
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                <span className="text-xs md:text-sm text-primary/90 font-semibold uppercase tracking-[0.3em]">
                  {language === "de" ? "Diese Woche" : "This Week"}
                </span>
                <div className="w-12 h-px bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              </div>
              
              {/* Main Title - Artistic with gradient */}
              <div className="relative">
                <h3 className="text-5xl md:text-7xl lg:text-8xl font-caveat font-bold mb-2 relative">
                  <span className="absolute inset-0 text-primary blur-sm opacity-50"></span>
                  <span className="relative bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
                    {language === "de" ? "Wochenkarte" : "Weekly Menu"}
                  </span>
                </h3>
                
                {/* Decorative flourish under title */}
                <div className="flex justify-center items-center gap-2 mt-2">
                  <div className="w-6 h-px bg-accent"></div>
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                  <div className="w-12 h-px bg-gradient-to-r from-accent to-primary"></div>
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse delay-150"></div>
                  <div className="w-6 h-px bg-primary"></div>
                </div>
              </div>
              
              {/* Subtitle with icon */}
              <div className="flex items-center gap-3 bg-background/20 backdrop-blur-sm px-6 py-3 rounded-full border border-primary/20">
                <span className="text-2xl animate-bounce">✨</span>
                <p className="text-sm md:text-base text-foreground/90 font-lora font-medium">
                  {language === "de" 
                    ? "Tippe für das komplette Menü" 
                    : "Tap for the complete menu"}
                </p>
                <span className="text-2xl animate-bounce delay-300">✨</span>
              </div>
            </div>
          </div>
          </div>

        </div>
      </section>
    </>
  );
};
