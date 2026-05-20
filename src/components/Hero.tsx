import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, UtensilsCrossed, ChevronDown, Star, MapPin } from "lucide-react";

import gardenHero from "@/assets/photos/garden-courtyard-hero.jpg";

import { SITE } from "@/config/site";
import { getOpenStatus } from "@/lib/openStatus";
import { useTodayClosed } from "@/hooks/useTodayClosed";

const heroImage = { src: gardenHero, position: "center center", alt: "Innenhof im Raimundhof mit gelben Sonnenschirmen" };

function useMinuteNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export const Hero = () => {
  // Remove showTitle state - H1 renders immediately for better LCP
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    // Title now uses CSS animation, no JS delay needed
    const timer2 = setTimeout(() => setShowSubtitle(true), 400);
    const timer3 = setTimeout(() => setShowButtons(true), 800);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
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
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden md:min-h-[660px] lg:min-h-[700px]"
      aria-label={language === "de" ? "Willkommen bei My Secret Garden" : "Welcome to My Secret Garden"}
    >
      {/* Decorative background photo — using <img> with fetchpriority for LCP optimization */}
      <img
        src={heroImage.src}
        alt=""
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover animate-hero-background"
        style={{ objectPosition: heroImage.position }}
        aria-hidden="true"
      />

      {/* Overlay: base scurente uniforme + gradient concentrato sul copy per leggibilità garantita in ogni condizione */}
      <div className="absolute inset-0 bg-foreground/40" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/55 to-foreground/85" aria-hidden="true" />

      {/* Content - bottom anchored on mobile so the primary CTA stays visible */}
      <div className="container relative z-10 mx-auto flex min-h-[100svh] flex-col justify-end px-6 pb-12 pt-32 pointer-events-none sm:px-6 md:min-h-[660px] md:justify-center md:pb-10 md:pt-24 lg:min-h-[700px]">
        <div className="mx-auto max-w-5xl space-y-3 text-center sm:space-y-4 md:space-y-5">
          {/* Restaurant name - renders immediately for LCP, uses CSS animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-[0.95] sm:leading-[0.9] mb-1 sm:mb-4 animate-fade-in-hero">
            {SITE.name}
          </h1>

          {/* Subtitle - visible immediately for LCP */}
          <p className={`mx-auto max-w-2xl text-base font-lora leading-relaxed text-background drop-shadow-2xl transition-all duration-slow ease-out sm:text-lg md:text-xl ${showSubtitle ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            {language === "de" ? "Das Restaurant, das du fast nicht findest." : "The restaurant you almost don't find."}
          </p>

          <div className={`flex items-center justify-center gap-2 drop-shadow-lg transition-opacity duration-base ease-out ${showButtons ? "opacity-100" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-1 rounded-full border border-primary-foreground/25 bg-primary/95 px-3.5 py-1.5 text-xs font-work font-semibold text-primary-foreground shadow-elevated sm:text-sm">
              <span className="inline-flex items-center gap-0.5" aria-label={language === "de" ? "5 Sterne" : "5 stars"}>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-3.5 w-3.5 fill-current text-brand-star" aria-hidden="true" />
                ))}
              </span>
              <span className="ml-1">{SITE.rating} · {SITE.reviewCount} {language === "de" ? "Bewertungen" : "reviews"}</span>
            </span>
          </div>

          {/* Open/Closed chip - soft style */}
          <div className={`flex justify-center items-center gap-2 flex-wrap transition-opacity duration-base ease-out ${
            showSubtitle ? "opacity-100" : "opacity-0"
          }`}>
            {/* Case 1: Open now */}
            {effectivelyOpen && (
              <span className="inline-flex items-center rounded-full border border-accent/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-accent animate-status-pulse" />
                {language === "de" ? "Jetzt geöffnet" : "Open now"}
              </span>
            )}
            {/* Case 2: Not open yet */}
            {!effectivelyOpen && !isClosedToday && status.opensAt && (
              <span className="inline-flex items-center rounded-full border border-warning/45 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-warning" />
                {language === "de" ? "Jetzt geschlossen" : "Closed now"}
              </span>
            )}
            {/* Case 3: After closing time */}
            {!effectivelyOpen && !isClosedToday && status.isAfterClosing && (
              <span className="inline-flex items-center rounded-full border border-destructive/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-destructive" />
                {language === "de" ? "Jetzt geschlossen" : "Closed now"}
              </span>
            )}
            {/* Case 4: Closed today (Sunday, holiday, no menu) */}
            {!effectivelyOpen && isClosedToday && (
              <span className="inline-flex items-center rounded-full border border-destructive/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                <span className="w-2 h-2 rounded-full mr-2 bg-destructive" />
                {language === "de" ? "Heute geschlossen" : "Closed today"}
              </span>
            )}
          </div>

          {/* CTA Buttons: Menu (primary), Find us (secondary ghost) */}
          <div className={`flex flex-col sm:flex-row justify-center items-center gap-3 pt-5 sm:pt-8 transition-all duration-300 ease-out pointer-events-auto ${
            showButtons ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}>
            <Button
              size="lg"
              className="w-full max-w-xs sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-work text-base sm:text-base px-6 sm:px-8 lg:px-10 py-5 sm:py-6 shadow-lg"
              asChild
            >
              <Link to="/#menu">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                {language === "de" ? "Tagesmenü" : "Today's Menu"}
              </Link>
            </Button>
            {/* Secondary: escape route per chi cerca il posto, non il menu */}
            <Button
              size="lg"
              variant="outline"
              className="w-full max-w-xs sm:w-auto border-background/50 bg-background/10 text-background hover:bg-background/20 hover:text-background backdrop-blur-sm font-work text-base px-6 sm:px-8 py-5 sm:py-6"
              asChild
            >
              <Link to="/visit">
                <MapPin className="w-4 h-4 mr-2" />
                {language === "de" ? "So findest du uns" : "Find us"}
              </Link>
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div 
        className={`hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-500 ${
          showScrollIndicator && showButtons ? "opacity-100" : "opacity-0 pointer-events-none"
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
