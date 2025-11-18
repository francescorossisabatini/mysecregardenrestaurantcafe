import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { BotanicalDecoration } from "./BotanicalDecoration";
import heroGarden from "@/assets/garden-real.jpg";
import heroFood from "@/assets/food-bowl-real.jpg";
import heroInterior from "@/assets/interior-real.jpg";

const heroImages = [heroGarden, heroFood, heroInterior];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: currentImage === index ? 1 : 0,
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Dark overlay (35%) */}
      <div className="absolute inset-0 bg-primary/35" />

      {/* Botanical pattern overlay (15% opacity) */}
      <div className="absolute inset-0 opacity-15">
        <BotanicalDecoration 
          variant="flower" 
          className="absolute top-20 left-20 w-32 h-32 text-background" 
        />
        <BotanicalDecoration 
          variant="leaf" 
          className="absolute top-40 right-32 w-24 h-24 text-background" 
        />
        <BotanicalDecoration 
          variant="flower" 
          className="absolute bottom-32 left-40 w-28 h-28 text-background" 
        />
        <BotanicalDecoration 
          variant="leaf" 
          className="absolute bottom-20 right-20 w-20 h-20 text-background" 
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto text-background">
        <h1 className="text-6xl md:text-8xl font-caveat font-bold mb-4 drop-shadow-lg">
          My Secret Garden
        </h1>
        <p className="text-2xl md:text-3xl font-lora mb-3 drop-shadow-md">
          {language === "de" 
            ? "Vegetarische & Vegane Soul Food in Wien" 
            : "Vegan & Vegetarian Soul Food in Vienna"}
        </p>
        <p className="text-lg md:text-xl font-lora mb-8 drop-shadow-md opacity-90">
          {language === "de"
            ? "Im Raimundhof – Mariahilferstraße 45"
            : "Inside the Raimundhof – Mariahilferstraße 45"}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Button
            size="lg"
            onClick={() => scrollToSection("daily-menu")}
            className="bg-accent hover:bg-accent-light text-accent-foreground font-lora text-lg px-8 py-6 shadow-elevated"
          >
            {language === "de" ? "Menu del Giorno" : "Daily Menu"}
          </Button>
          <Button
            size="lg"
            onClick={() => scrollToSection("full-menu")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-lora text-lg px-8 py-6 shadow-elevated"
          >
            {language === "de" ? "Menu Completo" : "Full Menu"}
          </Button>
        </div>

        {/* Carousel dots */}
        <div className="flex gap-2 justify-center mt-12">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentImage === index 
                  ? "bg-background w-8" 
                  : "bg-background/50 hover:bg-background/70"
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Decorative vine at bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <BotanicalDecoration 
          variant="vine" 
          className="w-full h-12 text-background" 
        />
      </div>
    </section>
  );
};
