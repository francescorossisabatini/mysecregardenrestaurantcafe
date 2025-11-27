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

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Button
              size="lg"
              onClick={() => scrollToSection("daily-menu")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xl font-semibold text-base md:text-lg px-8 py-6 border-2 border-primary"
            >
              {language === "de" ? "Tagesmenü" : "Daily Menu"}
            </Button>
            <Button
              size="lg"
              onClick={() => scrollToSection("full-menu")}
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-2xl font-semibold text-base md:text-lg px-8 py-6 border-2 border-accent"
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

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-background/60 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-1.5 bg-background/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};
