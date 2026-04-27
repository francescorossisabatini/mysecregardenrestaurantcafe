import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, UtensilsCrossed, ChevronDown, Star } from "lucide-react";

import minnesotaBowl from "@/assets/minnesota-bowl.webp";
import diningScene from "@/assets/dining-scene.jpg";
import heroGarden from "@/assets/garden-real.webp";
import heroInterior from "@/assets/interior-real.webp";

import { SITE } from "@/config/site";
import { getOpenStatus } from "@/lib/openStatus";
import { useTodayClosed } from "@/hooks/useTodayClosed";
import { getHeroAbVariant, isMobileHeroViewport, trackHeroAbEvent, trackHeroAbImpression, type HeroAbVariantId } from "@/lib/heroAbTest";

// Lazy load the carousel - it's not needed for initial paint
const HeroCarousel = lazy(() => import("@/components/HeroCarousel"));

const heroImages = [
  { src: minnesotaBowl, position: "center center", alt: "Piatto del giorno" },
  { src: heroGarden, position: "center 45%", alt: "Cortile interno" },
  { src: heroInterior, position: "center 35%", alt: "Interni del ristorante" },
];

const mobileHeroVariants: Record<HeroAbVariantId, { src: string; position: string; alt: string }> = {
  food: { src: minnesotaBowl, position: "center center", alt: "Piatto vegetariano del giorno" },
  dining: { src: diningScene, position: "center center", alt: "Tavola con piatti vegetariani" },
  garden: { src: heroGarden, position: "center 45%", alt: "Cortile giardino del ristorante" },
};

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
  // Remove showTitle state - H1 renders immediately for better LCP
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showDots, setShowDots] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [carouselMounted, setCarouselMounted] = useState(false);
  const [carouselVisible, setCarouselVisible] = useState(false);
  const [heroVariant, setHeroVariant] = useState<HeroAbVariantId | null>(null);
  const [isMobileHero, setIsMobileHero] = useState(false);
  const { language } = useLanguage();

  const handleSlideChange = useCallback((index: number) => {
    setCurrentImage(index);
  }, []);

  useEffect(() => {
    // Title now uses CSS animation, no JS delay needed
    const timer2 = setTimeout(() => setShowSubtitle(true), 400);
    const timer3 = setTimeout(() => setShowButtons(true), 800);
    const timer4 = setTimeout(() => setShowDots(true), 1200);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  useEffect(() => {
    const variant = getHeroAbVariant();
    setHeroVariant(variant);
    setIsMobileHero(isMobileHeroViewport());
    trackHeroAbImpression(variant);
  }, []);

  useEffect(() => {
    if (isMobileHero) return;

    const timer = setTimeout(() => setCarouselMounted(true), 100);
    return () => clearTimeout(timer);
  }, [isMobileHero]);

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
  const staticHeroImage = heroVariant ? mobileHeroVariants[heroVariant] : heroImages[0];
  const carouselImages = heroVariant ? [staticHeroImage, ...heroImages.filter((image) => image.src !== staticHeroImage.src)] : heroImages;
  const showCarousel = carouselMounted && !isMobileHero;

  return (
    <section className="relative h-[92svh] min-h-[520px] md:h-[100dvh] md:min-h-[640px] flex items-center justify-center overflow-hidden">
      {/* Static first image - shown immediately for FCP */}
      <div 
        className={`absolute inset-0 animate-hero-background transition-opacity duration-slow ease-out ${carouselVisible && !isMobileHero ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        style={{
          backgroundImage: `url(${staticHeroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: staticHeroImage.position,
        }}
        aria-hidden={carouselVisible && !isMobileHero}
      />

      {/* Lazy-loaded carousel - desktop only; mobile A/B test keeps one static image */}
      {showCarousel && (
        <Suspense fallback={null}>
          <HeroCarousel 
            images={carouselImages} 
            onSlideChange={handleSlideChange}
            onReady={() => setCarouselVisible(true)}
          />
        </Suspense>
      )}

      {/* Overlay - reduced for better image visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/45 via-foreground/24 to-foreground/52" />
      <div className="absolute inset-0 bg-foreground/18 md:hidden" />

      {/* Content - pt-20 ensures navbar doesn't cover title */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 pt-16 md:pt-20 pb-6 md:pb-8 flex flex-col justify-center h-full pointer-events-none">
        <div className="max-w-4xl mx-auto text-center space-y-2.5 sm:space-y-4 md:space-y-5">
          {/* Restaurant name - renders immediately for LCP, uses CSS animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-[0.95] sm:leading-[0.9] mb-1 sm:mb-4 animate-fade-in-hero">
            {SITE.name}
          </h1>

          {/* Subtitle - visible immediately for LCP */}
          <p className={`text-xs sm:text-base md:text-lg font-lora text-background drop-shadow-xl transition-all duration-slow ease-out ${showSubtitle ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            {language === "de" ? "Vegetarische Weltküche im versteckten Gartenhof" : "Vegetarian world cuisine in a hidden garden courtyard"}
          </p>

          <div className={`flex items-center justify-center gap-2 drop-shadow-lg transition-opacity duration-base ease-out ${showButtons ? "opacity-100" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary-foreground/25 bg-primary/95 px-3.5 py-1.5 text-xs font-work font-semibold text-primary-foreground shadow-elevated sm:text-sm">
              <Star className="w-3.5 h-3.5 fill-current text-brand-star" aria-hidden="true" />
              {SITE.rating} · {SITE.reviewCount} {language === "de" ? "Bewertungen" : "reviews"}
            </span>
          </div>

          {/* Open/Closed chip - soft style */}
          <div className={`flex justify-center items-center gap-2 flex-wrap transition-opacity duration-base ease-out ${
            showSubtitle ? "opacity-100" : "opacity-0"
          }`}>
            {/* Case 1: Open now */}
            {effectivelyOpen && (
              <>
                <span className="inline-flex items-center rounded-full border border-accent/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-accent animate-status-pulse" />
                  {language === "de" ? "Jetzt geöffnet" : "Open now"}
                </span>
                {status.closesAt && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `• schließt um ${status.closesAt}` : `• closes at ${status.closesAt}`}
                  </span>
                )}
              </>
            )}
            {/* Case 2: Not open yet, but opens later today */}
            {!effectivelyOpen && !isClosedToday && status.opensAt && (
              <span className="inline-flex items-center rounded-full border border-warning/45 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-warning" />
                {language === "de" ? `Öffnet um ${status.opensAt}` : `Opens at ${status.opensAt}`}
              </span>
            )}
            {/* Case 3: After closing time - show "closed now, opens tomorrow" */}
            {!effectivelyOpen && !isClosedToday && status.isAfterClosing && (
              <>
                <span className="inline-flex items-center rounded-full border border-destructive/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-destructive" />
                  {language === "de" ? "Jetzt geschlossen" : "Closed now"}
                </span>
                {status.tomorrowOpensAt && !status.tomorrowClosed && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `• morgen ab ${status.tomorrowOpensAt}` : `• tomorrow at ${status.tomorrowOpensAt}`}
                  </span>
                )}
                {status.tomorrowClosed && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? "• morgen geschlossen" : "• closed tomorrow"}
                  </span>
                )}
              </>
            )}
            {/* Case 4: Closed today (Sunday, holiday, no menu) */}
            {!effectivelyOpen && isClosedToday && (
              <>
                <span className="inline-flex items-center rounded-full border border-destructive/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-destructive" />
                  {language === "de" ? "Heute geschlossen" : "Closed today"}
                </span>
                {closedReason === "no-menu" && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? "• kein Menü heute" : "• no menu today"}
                  </span>
                )}
                {(closedReason === "sunday" || closedReason === "holiday") && status.tomorrowOpensAt && !status.tomorrowClosed && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `• morgen ab ${status.tomorrowOpensAt}` : `• tomorrow at ${status.tomorrowOpensAt}`}
                  </span>
                )}
              </>
            )}
          </div>

          {/* CTA Buttons: Menu (primary), Specials (secondary) */}
          <div className={`flex flex-wrap justify-center items-center gap-3 pt-5 sm:pt-8 transition-all duration-300 ease-out pointer-events-auto ${
            showButtons ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}>
            {/* Primary: View Menu */}
            <Button
              size="lg"
              className="w-full max-w-xs sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-work text-base sm:text-base px-6 sm:px-8 py-5 sm:py-6 shadow-lg"
              asChild
            >
              <Link to="/#menu" onClick={() => trackHeroAbEvent('click_menu_today', { event_category: 'engagement', event_label: 'hero_cta' }, heroVariant)}>
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                {language === "de" ? "Tagesmenü" : "Today's Menu"}
              </Link>
            </Button>

            {/* Secondary: Today's Specials */}
            <Button
              size="lg"
              variant="outline"
              className="hidden sm:inline-flex bg-background/10 hover:bg-background/20 text-background border-background/30 font-work text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6"
              asChild
            >
              <Link to="/menu" onClick={() => trackHeroAbEvent('click_weekly_specials', { event_category: 'engagement', event_label: 'hero_cta' }, heroVariant)}>
                <CalendarDays className="w-4 h-4 mr-2" />
                {language === "de" ? "Speisekarte" : "Full Menu"}
              </Link>
            </Button>
          </div>

          {/* Carousel dots */}
          <div className={`hidden md:flex gap-2 justify-center pt-4 sm:pt-6 transition-opacity duration-base ease-out pointer-events-auto ${
            showDots ? "opacity-100" : "opacity-0"
          }`}>
            {carouselImages.map((_, index) => (
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
        className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${
          showScrollIndicator && showDots ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-1 text-background/80">
          <span className="text-xs font-work tracking-wide uppercase">
            {language === "de" ? "Weiter" : "More below"}
          </span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
};
