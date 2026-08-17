import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { UtensilsCrossed, ChevronDown, Star, ArrowRight } from "lucide-react";

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
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { language } = useLanguage();

  useEffect(() => {
    const timer2 = setTimeout(() => setShowSubtitle(true), 400);
    const timer3 = setTimeout(() => setShowButtons(true), 800);

    return () => {
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setShowScrollIndicator(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const now = useMinuteNow();
  const status = getOpenStatus(SITE.openingHours, now);
  const { isClosed: isClosedToday } = useTodayClosed();
  const effectivelyOpen = status.isOpen && !isClosedToday;

  const openLabel = effectivelyOpen
    ? language === "de" ? "Jetzt geöffnet" : "Open now"
    : isClosedToday
      ? language === "de" ? "Heute geschlossen" : "Closed today"
      : language === "de" ? "Jetzt geschlossen" : "Closed now";

  return (
    <section
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden md:min-h-[680px] lg:min-h-[720px]"
      aria-label={language === "de" ? "Willkommen bei My Secret Garden" : "Welcome to My Secret Garden"}
    >
      {/* Hero photo */}
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

      {/* Gradient scrim — soft on top, deeper at bottom for legibility */}
      <div className="absolute inset-0 bg-hero-scrim" aria-hidden="true" />

      {/* Content */}
      <div className="container relative z-10 mx-auto flex min-h-[100svh] flex-col justify-end px-6 pb-14 pt-32 pointer-events-none sm:px-6 md:min-h-[680px] md:justify-center md:pb-12 md:pt-24 lg:min-h-[720px]">
        <div className="mx-auto max-w-5xl space-y-5 text-center sm:space-y-6">

          {/* Trust eyebrow — rating + open state consolidated ABOVE H1 */}
          <div className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 transition-opacity duration-slow ease-out ${showSubtitle ? "opacity-100" : "opacity-0"}`}>
            <span className="inline-flex items-center gap-1.5 font-work text-[11px] font-semibold uppercase tracking-[0.18em] text-background/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              <span className="inline-flex items-center gap-0.5" aria-label={language === "de" ? "5 Sterne" : "5 stars"}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current text-brand-star" aria-hidden="true" />
                ))}
              </span>
              <span>{SITE.rating} · {SITE.reviewCount}</span>
            </span>
            <span className="hidden sm:inline-block h-3 w-px bg-background/40" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5 font-work text-[11px] font-semibold uppercase tracking-[0.18em] text-background/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${
                  effectivelyOpen
                    ? "bg-accent animate-status-pulse"
                    : "bg-destructive"
                }`}
                aria-hidden="true"
              />
              {openLabel}
            </span>
          </div>

          {/* H1 — Caveat brand name + descriptor in the same heading for SEO */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-background leading-[0.92] animate-fade-in-hero [text-shadow:0_2px_18px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)]">
            <span className="block font-caveat">{SITE.name}</span>
            <span className="block mt-1 sm:mt-2 font-work text-xs sm:text-sm md:text-base lg:text-lg font-semibold uppercase tracking-[0.18em] text-background/90 [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              {language === "de" ? "Vegetarisches & Veganes Restaurant" : "Vegetarian & Vegan Restaurant"}
            </span>
          </h1>

          {/* Subtitle — no chip, only text-shadow for legibility */}
          <p className={`mx-auto max-w-xl font-lora text-lg italic leading-relaxed text-background transition-all duration-slow ease-out sm:text-xl md:text-2xl [text-shadow:0_1px_10px_rgba(0,0,0,0.7),0_1px_3px_rgba(0,0,0,0.6)] ${showSubtitle ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}>
            {language === "de" ? "Das Restaurant, das du fast nicht findest." : "The restaurant you almost don't find."}
          </p>

          {/* Single primary CTA + text link secondary */}
          <div className={`flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row sm:gap-6 sm:pt-6 transition-all duration-300 ease-out pointer-events-auto ${
            showButtons ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}>
            <Button
              size="lg"
              className="w-full max-w-xs sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-work text-base px-8 sm:px-10 py-6 shadow-elevated"
              asChild
            >
              <Link to="/#menu">
                <UtensilsCrossed className="w-4 h-4 mr-2" />
                {language === "de" ? "Was gibt's heute?" : "What's on today?"}
              </Link>
            </Button>

            <Link
              to="/visit"
              className="group inline-flex min-h-[44px] items-center gap-1.5 px-3 font-work text-sm font-medium uppercase tracking-[0.14em] text-background/95 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)] transition-all hover:gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-background/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm"
            >
              {language === "de" ? "Wie du uns findest" : "How to find us"}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
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
          <span className="text-xs font-work tracking-[0.2em] uppercase">
            {language === "de" ? "Weiter" : "More below"}
          </span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </div>
    </section>
  );
};
