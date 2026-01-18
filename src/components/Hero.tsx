import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, UtensilsCrossed, ChevronDown } from "lucide-react";

import minnesotaBowl from "@/assets/minnesota-bowl.webp";
import heroGarden from "@/assets/garden-real.webp";
import heroInterior from "@/assets/interior-real.webp";

import { SITE } from "@/config/site";
import { getOpenStatus } from "@/lib/openStatus";
import { useTodayClosed } from "@/hooks/useTodayClosed";

// Lazy load the carousel - it's not needed for initial paint
const HeroCarousel = lazy(() => import("@/components/HeroCarousel"));

const heroImages = [
  { src: minnesotaBowl, position: "center center", alt: "Piatto del giorno" },
  { src: heroGarden, position: "center 45%", alt: "Cortile interno" },
  { src: heroInterior, position: "center 35%", alt: "Interni del ristorante" },
];

function useMinuteNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [carouselReady, setCarouselReady] = useState(false);
  const { language } = useLanguage();

  const handleSlideChange = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTitle(true), 600);
    const timer2 = setTimeout(() => setShowSubtitle(true), 1000);
    const timer3 = setTimeout(() => setShowButtons(true), 1400);
    const timer4 = setTimeout(() => setShowDots(true), 1800);
    // Delay carousel hydration until after initial paint
    const timer5 = setTimeout(() => setCarouselReady(true), 100);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, []);

  // Hide scroll indicator on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Open/Closed chip in Vienna timezone
  const now = useMinuteNow();
  const status = getOpenStatus(SITE.openingHours, now);
  
  // Also check if closed due to no menu data, holiday, or Sunday
  const { isClosed: isClosedToday, reason: closedReason } = useTodayClosed();
  
  // Force closed if no menu data, holiday, or Sunday
  const effectivelyOpen = status.isOpen && !isClosedToday;

  return (
    <section className="relative h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Static first image - shown immediately for FCP */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ${carouselReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${heroImages[0].src})`,
          backgroundSize: "cover",
          backgroundPosition: heroImages[0].position,
        }}
        aria-hidden={carouselReady}
      />

      {/* Lazy-loaded carousel - hydrates after initial paint */}
      {carouselReady && (
        <Suspense fallback={null}>
          <HeroCarousel 
            images={heroImages} 
            onSlideChange={handleSlideChange}
          />
        </Suspense>
      )}

      {/* Overlay - reduced for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
      <div className="absolute inset-0 bg-black/20 md:hidden" />

      {/* Content - pt-20 ensures navbar doesn't cover title */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-20 pb-8 flex flex-col justify-center h-full pointer-events-none">
        <div className="max-w-4xl mx-auto text-center space-y-3 sm:space-y-4 md:space-y-5">
          {/* Restaurant name */}
          <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-[0.9] mb-2 sm:mb-4 transition-opacity duration-[1500ms] ease-out ${
            showTitle ? "opacity-100" : "opacity-0"
          }`}>
            {SITE.name}
          </h1>

          {/* Subtitle */}
          <p className={`text-sm sm:text-base md:text-lg font-lora text-background drop-shadow-xl transition-opacity duration-[1500ms] ease-out ${
            showSubtitle ? "opacity-100" : "opacity-0"
          }`}>
            Vegetarian Café & Restaurant • Vienna
          </p>

          {/* Open/Closed chip - soft style */}
          <div className={`flex justify-center items-center gap-2 flex-wrap transition-opacity duration-[1500ms] ease-out ${
            showSubtitle ? "opacity-100" : "opacity-0"
          }`}>
            {/* Case 1: Open now */}
            {effectivelyOpen && (
              <>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md bg-green-500/25 text-green-100 border border-green-400/40 shadow-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-green-400 animate-pulse" />
                  {language === "de" ? "Jetzt geöffnet" : "Open now"}
                </span>
                {status.closesAt && (
                  <span className="text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `• schließt um ${status.closesAt}` : `• closes at ${status.closesAt}`}
                  </span>
                )}
              </>
            )}
            {/* Case 2: Not open yet, but opens later today */}
            {!effectivelyOpen && !isClosedToday && status.opensAt && (
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md bg-amber-500/25 text-amber-100 border border-amber-400/40 shadow-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-amber-400" />
                {language === "de" ? `Öffnet um ${status.opensAt}` : `Opens at ${status.opensAt}`}
              </span>
            )}
            {/* Case 3: After closing time - show "closed now, opens tomorrow" */}
            {!effectivelyOpen && !isClosedToday && status.isAfterClosing && (
              <>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md bg-red-500/25 text-red-100 border border-red-400/40 shadow-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-red-400" />
                  {language === "de" ? "Jetzt geschlossen" : "Closed now"}
                </span>
                {status.tomorrowOpensAt && !status.tomorrowClosed && (
                  <span className="text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `• morgen ab ${status.tomorrowOpensAt}` : `• tomorrow at ${status.tomorrowOpensAt}`}
                  </span>
                )}
                {status.tomorrowClosed && (
                  <span className="text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? "• morgen geschlossen" : "• closed tomorrow"}
                  </span>
                )}
              </>
            )}
            {/* Case 4: Closed today (Sunday, holiday, no menu) */}
            {!effectivelyOpen && isClosedToday && (
              <>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-md bg-red-500/25 text-red-100 border border-red-400/40 shadow-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-red-400" />
                  {language === "de" ? "Heute geschlossen" : "Closed today"}
                </span>
                {closedReason === "no-menu" && (
                  <span className="text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? "• kein Menü heute" : "• no menu today"}
                  </span>
                )}
                {(closedReason === "sunday" || closedReason === "holiday") && status.tomorrowOpensAt && !status.tomorrowClosed && (
                  <span className="text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `• morgen ab ${status.tomorrowOpensAt}` : `• tomorrow at ${status.tomorrowOpensAt}`}
                  </span>
                )}
              </>
            )}
          </div>

          {/* CTA Buttons: Menu (primary), Specials (secondary) */}
          <div className={`flex flex-wrap justify-center items-center gap-3 pt-6 sm:pt-8 transition-opacity duration-[1500ms] ease-out pointer-events-auto ${
            showButtons ? "opacity-100" : "opacity-0"
          }`}>
            {/* Primary: View Menu */}
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-work text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6"
              asChild
            >
              <Link to="/#menu">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                {language === "de" ? "Tagesmenü" : "Today's Menu"}
              </Link>
            </Button>

            {/* Secondary: Today's Specials */}
            <Button
              size="lg"
              variant="outline"
              className="bg-background/10 hover:bg-background/20 text-background border-background/30 font-work text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6"
              asChild
            >
              <Link to="/wochenkarte">
                <CalendarDays className="w-4 h-4 mr-2" />
                {language === "de" ? "Wochenmenü" : "Weekly Specials"}
              </Link>
            </Button>
          </div>

          {/* Carousel dots */}
          <div className={`flex gap-2 justify-center pt-4 sm:pt-6 transition-opacity duration-[1500ms] ease-out pointer-events-auto ${
            showDots ? "opacity-100" : "opacity-0"
          }`}>
            {heroImages.map((_, index) => (
              <div
                key={index}
                className="w-8 h-8 flex items-center justify-center"
                aria-hidden="true"
              >
                <span className={`rounded-full transition-all duration-300 ${
                  currentImage === index
                    ? "bg-background w-8 h-2.5 shadow-lg"
                    : "bg-background/80 w-2.5 h-2.5"
                }`} />
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${
          showScrollIndicator && showDots ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1 text-background/80">
          <span className="text-xs font-work tracking-wide uppercase">
            {language === "de" ? "Mehr entdecken" : "Discover more"}
          </span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </div>
      </div>
    </section>
  );
};
