import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
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

// Position optimization for mobile - ensures subjects are properly centered
const imagePositions = [
  "center 40%", // entranceGarden - garden entrance
  "center center", // minnesotaBowl - food bowl
  "center 45%", // heroGarden - garden view
  "center center", // koreanBowl - food bowl
  "center center", // heroFood - food bowl
  "center center", // alpenpolenta - food
  "center 55%", // heroInterior - interior view
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(1); // Start from second image (minnesotaBowl)
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    // Start carousel from beginning after a delay
    const startTimer = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % heroImages.length);
      }, 7000); // Slow carousel: 7 seconds per image
      return () => clearInterval(timer);
    }, 2000); // Wait 2 seconds before starting carousel

    return () => clearTimeout(startTimer);
  }, []);

  useEffect(() => {
    // Staggered animations - each element appears with a delay
    const timer1 = setTimeout(() => setShowTitle(true), 800);
    const timer2 = setTimeout(() => setShowSubtitle(true), 1400);
    const timer3 = setTimeout(() => setShowButtons(true), 2000);
    const timer4 = setTimeout(() => setShowDots(true), 2600);

    // Also trigger on scroll
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowTitle(true);
        setShowSubtitle(true);
        setShowButtons(true);
        setShowDots(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background carousel - fullscreen with slow transitions */}
      {heroImages.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-[3000ms] ease-in-out ${
            currentImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: imagePositions[index],
          }}
        />
      ))}

      {/* Overlay for better text readability - stronger on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/45 md:from-black/40 md:via-black/30 md:to-black/45" />
      {/* Additional mobile overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 md:hidden" />

      {/* Content - centered with smooth, staggered reveal */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center h-full">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-5">
          {/* Restaurant name with handwriting style - appears first - HERO ELEMENT */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-[0.9] mb-2 sm:mb-4 transition-all duration-[2000ms] ${
            showTitle ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            My Secret Garden
          </h1>

          {/* Subtitle - Vegan Soul Food - appears second */}
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-lora text-background/90 drop-shadow-xl transition-all duration-[2000ms] ${
            showSubtitle ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            {language === "de"
              ? "Vegan Soul Food im Herzen von Wien"
              : "Vegan Soul Food in the Heart of Vienna"}
          </p>

          {/* CTA Buttons - appear third */}
          <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 max-w-md mx-auto transition-all duration-[2000ms] ${
            showButtons ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            {/* PRIMARY CTA - Anrufen (green) */}
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent-light/20 font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-5 rounded-md transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
            >
              <a href="tel:+4315970547">
                {language === "de" ? "Anrufen" : "Call"}
              </a>
            </Button>
            
            {/* SECONDARY CTA - Tagesmenü (blue) */}
            <Button
              size="lg"
              onClick={() => scrollToSection("daily-menu")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary-foreground/10 font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-5 rounded-md transition-all duration-300 hover:shadow-lg w-full sm:w-auto"
            >
              {language === "de" ? "Tagesmenü" : "Daily Menu"}
            </Button>
          </div>

          {/* Carousel dots - appear last */}
          <div className={`flex gap-2 sm:gap-3 justify-center pt-4 sm:pt-6 transition-all duration-[2000ms] ${
            showDots ? "opacity-100 translate-y-0 blur-0" : "opacity-0 translate-y-4 blur-sm"
          }`}
          style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                  currentImage === index
                    ? "bg-background w-6 sm:w-10 shadow-lg"
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
