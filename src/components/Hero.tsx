import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Star } from "lucide-react";

import gardenHero from "@/assets/photos/garden-courtyard-hero.jpg";

import { SITE } from "@/config/site";
import { getOpenStatus } from "@/lib/openStatus";
import { useTodayClosed } from "@/hooks/useTodayClosed";

const heroImage = { src: gardenHero, position: "center center" };

function useMinuteNow() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

/**
 * Fascia d'ingresso — non più un hero a schermo pieno.
 *
 * Decisione registrata in docs/ux/divergence-ledger.md, opzione A "Il bancone":
 * il menu del giorno deve stare sopra la piega su mobile. A 100svh non ci stava,
 * e la prova era dentro l'hero stesso — la sua CTA primaria puntava a /#menu,
 * cioè serviva a saltare la sezione che la conteneva.
 *
 * La fascia porta solo quello che serve al profilo A nei primi secondi:
 * chi siamo, se siamo aperti, quanto valiamo. Zero azioni: chiamare e trovarci
 * sono già permanenti in MobileStickyBar e nella top bar.
 */
export const Hero = () => {
  const { language } = useLanguage();
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
      className="relative flex min-h-[max(35svh,340px)] items-end overflow-hidden md:min-h-[max(42svh,380px)]"
      aria-label={language === "de" ? "Willkommen bei My Secret Garden" : "Welcome to My Secret Garden"}
    >
      <img
        src={heroImage.src}
        alt=""
        width={1920}
        height={1280}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: heroImage.position }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-hero-scrim" aria-hidden="true" />

      {/* Una sola animazione nella fascia: il blocco entra una volta. */}
      <div className="container relative z-10 mx-auto px-6 pb-8 pt-24 md:pb-10 md:pt-28">
        <div className="mx-auto max-w-3xl animate-fade-in-hero text-center">
          <h1 className="text-5xl font-bold leading-[0.95] text-background [text-shadow:0_2px_18px_rgba(0,0,0,0.55),0_1px_3px_rgba(0,0,0,0.7)] sm:text-6xl md:text-7xl">
            <span className="block font-caveat">{SITE.name}</span>
            <span className="mt-1.5 block font-work text-xs font-semibold uppercase tracking-[0.18em] text-background/90 sm:text-sm md:text-base [text-shadow:0_1px_6px_rgba(0,0,0,0.5)]">
              {language === "de" ? "Vegetarisches & Veganes Restaurant" : "Vegetarian & Vegan Restaurant"}
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl font-lora text-base italic leading-relaxed text-background [text-shadow:0_1px_10px_rgba(0,0,0,0.7),0_1px_3px_rgba(0,0,0,0.6)] sm:text-lg">
            {language === "de" ? "Das Restaurant, das du fast nicht findest." : "The restaurant you almost don't find."}
          </p>

          {/* Rating e stato: due fatti, non due azioni. */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-work text-[11px] font-semibold uppercase tracking-[0.18em] text-background/95 [text-shadow:0_1px_4px_rgba(0,0,0,0.6)]">
            <span className="inline-flex items-center gap-1.5">
              <span className="inline-flex items-center gap-0.5" aria-label={language === "de" ? "5 Sterne" : "5 stars"}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current text-brand-star" aria-hidden="true" />
                ))}
              </span>
              <span>{SITE.rating} · {SITE.reviewCount}</span>
            </span>
            <span className="hidden h-3 w-px bg-background/40 sm:inline-block" aria-hidden="true" />
            <span className="inline-flex items-center gap-1.5" aria-live="polite">
              {/* Niente pulse: DESIGN_SYSTEM §7 vieta le animazioni infinite. */}
              <span
                className={`inline-block h-1.5 w-1.5 rounded-full ${effectivelyOpen ? "bg-accent" : "bg-destructive"}`}
                aria-hidden="true"
              />
              {openLabel}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
