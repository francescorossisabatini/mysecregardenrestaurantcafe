import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

// 3 curated images for consistency
import minnesotaBowl from "@/assets/minnesota-bowl.jpg";
import heroGarden from "@/assets/garden-real.jpg";
import heroInterior from "@/assets/interior-real.jpg";

const heroImages = [
  { src: minnesotaBowl, position: "center center", alt: "Piatto del giorno" },
  { src: heroGarden, position: "center 45%", alt: "Cortile interno" },
  { src: heroInterior, position: "center 35%", alt: "Interni del ristorante" },
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const { language } = useLanguage();
  

  // Embla carousel for swipe support
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      skipSnaps: false,
      // Enable drag for touch interactions
      watchDrag: true,
    },
    [
      Autoplay({ 
        delay: 7000, 
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    ]
  );

  // Sync embla with currentImage state
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentImage(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Handle dot click
  const scrollToSlide = useCallback((index: number) => {
    if (emblaApi) {
      emblaApi.scrollTo(index);
    }
  }, [emblaApi]);

  useEffect(() => {
    // Gentle staggered fade-in - subtle delays, no blur effects
    const timer1 = setTimeout(() => setShowTitle(true), 600);
    const timer2 = setTimeout(() => setShowSubtitle(true), 1000);
    const timer3 = setTimeout(() => setShowButtons(true), 1400);
    const timer4 = setTimeout(() => setShowDots(true), 1800);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
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
      {/* Background carousel with Embla for swipe support */}
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full touch-pan-y">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className="flex-[0_0_100%] min-w-0 h-full relative"
            >
              <div
                className="absolute inset-0 transition-transform duration-500"
                style={{
                  backgroundImage: `url(${image.src})`,
                  backgroundSize: "cover",
                  backgroundPosition: image.position,
                }}
                aria-label={image.alt}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Overlay for better text readability - stronger on mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/45" />
      {/* Additional mobile overlay for better contrast */}
      <div className="absolute inset-0 bg-black/30 md:hidden" />

      {/* Content - fixed on every slide */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-8 flex flex-col justify-center h-full pointer-events-none">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-5">
          {/* Restaurant name - gentle fade only */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-[0.9] mb-2 sm:mb-4 transition-opacity duration-[1500ms] ease-out ${
            showTitle ? "opacity-100" : "opacity-0"
          }`}>
            My Secret Garden
          </h1>

          {/* Subtitle - gentle fade only */}
          <p className={`text-sm sm:text-base md:text-lg lg:text-xl font-lora text-background/90 drop-shadow-xl transition-opacity duration-[1500ms] ease-out ${
            showSubtitle ? "opacity-100" : "opacity-0"
          }`}>
            {language === "de"
              ? "Vegan Soul Food im Herzen von Wien"
              : "Vegan Soul Food in the Heart of Vienna"}
          </p>

          {/* CTA Buttons - gentle fade only */}
          <div className={`flex flex-row gap-3 sm:gap-4 justify-center items-center pt-6 sm:pt-8 max-w-md mx-auto transition-opacity duration-[1500ms] ease-out pointer-events-auto ${
            showButtons ? "opacity-100" : "opacity-0"
          }`}>
            {/* PRIMARY CTA - Anrufen (green) */}
            <Button
              size="lg"
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 border border-accent-light/20 font-medium text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 rounded-md transition-colors duration-300"
            >
              <a href="tel:+4315970547">
                {language === "de" ? "Anrufen" : "Call"}
              </a>
            </Button>
            
            {/* SECONDARY CTA - Tagesmenü (blue) */}
            <Button
              size="lg"
              onClick={() => scrollToSection("daily-menu")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 border border-primary-foreground/10 font-medium text-sm sm:text-base px-6 sm:px-10 py-3 sm:py-5 rounded-md transition-colors duration-300"
            >
              {language === "de" ? "Tagesmenü" : "Daily Menu"}
            </Button>
          </div>

          {/* Carousel dots - gentle fade only */}
          <div className={`flex gap-3 justify-center pt-4 sm:pt-6 transition-opacity duration-[1500ms] ease-out pointer-events-auto ${
            showDots ? "opacity-100" : "opacity-0"
          }`}>
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToSlide(index)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentImage === index
                    ? "bg-background w-8 shadow-lg"
                    : "bg-background/60 hover:bg-background/80 w-2.5"
                }`}
                aria-label={`Vai alla slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
