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

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/45" />

      {/* Content - centered */}
      <div className="relative z-10 container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 md:space-y-12 animate-subtle-fade-in">
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

          {/* CTA Buttons - Minimal Hierarchy */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-10 max-w-2xl mx-auto">
            {/* PRIMARY CTA - Anrufen */}
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold text-lg px-10 py-6 rounded-lg transition-colors duration-200 order-1 sm:order-2"
            >
              <a href="tel:+4315970547" className="flex items-center gap-2">
                <span className="text-xl">📞</span>
                <span>{language === "de" ? "Anrufen" : "Call"}</span>
              </a>
            </Button>
            
            {/* SECONDARY CTA - Tagesmenü */}
            <Button
              size="lg"
              onClick={() => scrollToSection("daily-menu")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base px-8 py-5 rounded-lg transition-colors duration-200 order-2 sm:order-1"
            >
              {language === "de" ? "Tagesmenü" : "Daily Menu"}
            </Button>
            
            {/* TERTIARY CTA - Speisekarte */}
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("full-menu")}
              className="bg-background/30 backdrop-blur-sm text-foreground hover:bg-background/50 border border-background/50 font-normal text-base px-7 py-5 rounded-lg transition-colors duration-200 order-3 sm:order-3"
            >
              {language === "de" ? "Speisekarte" : "Menu"}
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
