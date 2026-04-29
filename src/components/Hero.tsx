import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CalendarDays, UtensilsCrossed, ChevronDown, Star } from "lucide-react";

import diningScene from "@/assets/dining-scene.jpg";

import { SITE } from "@/config/site";
import { getOpenStatus } from "@/lib/openStatus";
import { useTodayClosed } from "@/hooks/useTodayClosed";

const heroImage = { src: diningScene, position: "center center", alt: "Tavola con piatti vegetariani" };

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
    <section className="relative flex h-[92svh] min-h-[540px] items-center justify-center overflow-hidden md:h-[100dvh] md:min-h-[660px] lg:h-[90dvh] lg:min-h-[700px]">
      {/* Static real photo for FCP and immersive consistency */}
      <div 
        className="absolute inset-0 animate-hero-background"
        style={{
          backgroundImage: `url(${heroImage.src})`,
          backgroundSize: "cover",
          backgroundPosition: heroImage.position,
        }}
        role="img"
        aria-label={heroImage.alt}
      />

      {/* Overlay shaped for readability while keeping the room visible */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/66 via-foreground/30 to-foreground/72" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/36 via-transparent to-foreground/22" />

      {/* Content - pt-20 ensures navbar doesn't cover title */}
      <div className="container relative z-10 mx-auto flex h-full flex-col justify-center px-4 pb-6 pt-20 pointer-events-none sm:px-6 md:pb-10 md:pt-24">
        <div className="mx-auto max-w-5xl space-y-3 text-center sm:space-y-4 md:space-y-5">
          {/* Restaurant name - renders immediately for LCP, uses CSS animation */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-caveat font-bold text-background drop-shadow-2xl leading-[0.95] sm:leading-[0.9] mb-1 sm:mb-4 animate-fade-in-hero">
            {SITE.name}
          </h1>

          {/* Subtitle - visible immediately for LCP */}
          <p className={`mx-auto max-w-2xl text-base font-lora leading-relaxed text-background drop-shadow-2xl transition-all duration-slow ease-out sm:text-lg md:text-xl ${showSubtitle ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            {language === "de" ? "Vegetarische Weltküche im versteckten Gartenhof" : "Vegetarian world cuisine in a hidden garden courtyard"}
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
              <>
                <span className="inline-flex items-center rounded-full border border-accent/35 bg-background/95 px-3.5 py-1.5 text-xs font-work font-semibold text-foreground shadow-elevated sm:px-4 sm:text-sm">
                  <span className="w-2 h-2 rounded-full mr-2 bg-accent animate-status-pulse" />
                  {language === "de" ? "Jetzt geöffnet" : "Open now"}
                </span>
                {status.closesAt && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `schließt um ${status.closesAt}` : `closes at ${status.closesAt}`}
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
                    {language === "de" ? `morgen ab ${status.tomorrowOpensAt}` : `tomorrow at ${status.tomorrowOpensAt}`}
                  </span>
                )}
                {status.tomorrowClosed && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? "morgen geschlossen" : "closed tomorrow"}
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
                    {language === "de" ? "kein Menü heute" : "no menu today"}
                  </span>
                )}
                {(closedReason === "sunday" || closedReason === "holiday") && status.tomorrowOpensAt && !status.tomorrowClosed && (
                  <span className="text-xs sm:text-sm text-background/90 drop-shadow-md font-medium">
                    {language === "de" ? `morgen ab ${status.tomorrowOpensAt}` : `tomorrow at ${status.tomorrowOpensAt}`}
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
              className="w-full max-w-xs sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-work text-base sm:text-base px-6 sm:px-8 lg:px-10 py-5 sm:py-6 shadow-lg"
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
              className="hidden sm:inline-flex bg-background/10 hover:bg-background/20 text-background border-background/30 font-work text-sm sm:text-base px-6 sm:px-8 lg:px-10 py-5 sm:py-6"
              asChild
            >
              <Link to="/menu">
                <CalendarDays className="w-4 h-4 mr-2" />
                {language === "de" ? "Speisekarte" : "Full Menu"}
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
