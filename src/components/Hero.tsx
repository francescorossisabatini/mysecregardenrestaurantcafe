import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { SpiritualAnimations } from "./SpiritualAnimations";
import heroGarden from "@/assets/garden-real.jpg";
import heroFood from "@/assets/food-bowl-real.jpg";
import heroInterior from "@/assets/interior-real.jpg";
import entranceGarden from "@/assets/entrance-garden.jpg";
import minnesotaBowl from "@/assets/minnesota-bowl.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";
import alpenpolenta from "@/assets/alpenpolenta.jpg";

const heroImages = [
  entranceGarden,
  minnesotaBowl,
  heroGarden,
  koreanBowl,
  heroFood,
  alpenpolenta,
  heroInterior,
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { language } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000); // Faster transitions for more dynamism
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background carousel - fullscreen */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
            currentImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Stronger overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/45 to-black/55" />
      
      {/* Spiritual animations */}
      <SpiritualAnimations variant="meditation-lines" />

      {/* Content - centered */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-8 animate-fade-in">
          {/* Restaurant name with handwriting style */}
          <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-tight">
            My Secret Garden
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-lora text-background drop-shadow-xl">
            {language === "de"
              ? "Vegan & Vegetarische Soul Food in Wien"
              : "Vegan & Vegetarian Soul Food in Vienna"}
          </p>

          {/* Address */}
          <p className="text-base sm:text-lg md:text-xl font-lora text-background/95 drop-shadow-lg">
            {language === "de" ? "Im Raimundhof" : "Inside Raimundhof"} –
            Mariahilferstraße 45
          </p>

          {/* CTA Buttons - Gestalt Hierarchy */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6 max-w-3xl mx-auto">
            {/* PRIMARY CTA - Anrufen (Most Important) - Gestalt: Prominence */}
            <Button
              size="lg"
              asChild
              className="group relative bg-accent text-accent-foreground hover:bg-accent/90 shadow-elevated font-bold text-lg md:text-xl px-12 py-8 rounded-2xl transition-all duration-300 hover:scale-105 order-1 sm:order-2"
            >
              <a href="tel:+4315970547" className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <span>{language === "de" ? "Jetzt Anrufen" : "Call Now"}</span>
              </a>
            </Button>
            
            {/* SECONDARY CTA - Tagesmenü - Gestalt: Similarity & Grouping */}
            <Button
              size="lg"
              onClick={() => scrollToSection("daily-menu")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft font-semibold text-base md:text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-[1.02] order-2 sm:order-1"
            >
              {language === "de" ? "Tagesmenü" : "Daily Menu"}
            </Button>
            
            {/* TERTIARY CTA - Speisekarte - Gestalt: Background/Figure */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("full-menu")}
              className="bg-background/40 backdrop-blur-sm text-foreground hover:bg-background/60 border-2 border-background/60 hover:border-background shadow-sm font-medium text-base px-6 py-5 rounded-lg transition-all duration-300 order-3 sm:order-3"
            >
              {language === "de" ? "Speisekarte" : "Full Menu"}
            </Button>
          </div>

          {/* Carousel dots */}
          <div className="flex gap-3 justify-center pt-8">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentImage === index
                    ? "bg-background w-10 shadow-lg"
                    : "bg-background/60 hover:bg-background/80"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
