import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { WeeklyMenuModal } from "./WeeklyMenuModal";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";
import { fixedDishes } from "@/data/fixedMenuData";

export const FullMenu = () => {
  const { language } = useLanguage();
  const { menu } = useWeeklyMenu();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

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
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-3">
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
              <h3 className="text-5xl md:text-7xl text-primary">
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
