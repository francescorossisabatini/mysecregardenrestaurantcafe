import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { HomeMenuPreview } from "@/components/HomeMenuPreview";
import { SkipLink } from "@/components/SkipLink";

// Lazy load below-the-fold components to reduce initial JS bundle
const IlPosto = lazy(() => import("@/components/IlPosto").then(m => ({ default: m.IlPosto })));
const Voci = lazy(() => import("@/components/Voci").then(m => ({ default: m.Voci })));
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Minimal section loader
const SectionLoader = () => (
  <div className="py-16 flex justify-center">
    <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const Index = () => {
  const location = useLocation();
  const [showNavbar] = useState(true);
  const rafRef = useRef<number | null>(null);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    if (location.hash !== "#menu") return;

    // Lazy-loaded sections above #menu mount asynchronously; their height
    // changes the target's offset. Re-scroll until the position stabilizes
    // (or after a max number of attempts).
    let cancelled = false;
    let lastTop = -1;
    let stableCount = 0;
    let attempts = 0;

    const tick = () => {
      if (cancelled) return;
      const element = document.getElementById("menu");
      if (!element) {
        if (attempts++ < 40) setTimeout(tick, 50);
        return;
      }
      const offset = 50;
      const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top, behavior: "smooth" });

      if (Math.abs(top - lastTop) < 2) {
        stableCount++;
      } else {
        stableCount = 0;
        lastTop = top;
      }
      if (stableCount < 3 && attempts++ < 40) {
        setTimeout(tick, 120);
      }
    };

    requestAnimationFrame(tick);
    return () => {
      cancelled = true;
    };
  }, [location]);

  return (
    <div className="min-h-screen">
      <SEOHead path="/" />
      <SkipLink />
      <div className={`transition-opacity duration-base ease-out ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navigation />
      </div>

      {/*
        Struttura "Il bancone" — docs/ux/divergence-ledger.md, opzione A.
        Sette sezioni diventano quattro, una per lavoro:
          fascia:   chi siamo, se siamo aperti, quanto valiamo
          menu:     la risposta operativa, sopra la piega su mobile
          il posto: come ci si arriva e com'è (era spezzato in 02 e 04)
          voci:     stampa e ospiti insieme (erano 05 e 06)
        CTAEndBlock non c'è più: chiamare e trovarci sono permanenti in
        MobileStickyBar, e gli orari stanno nel footer.
      */}
      <main id="main-content" tabIndex={-1} className="focus:outline-hidden">
        <Hero />

        <HomeMenuPreview />

        <Suspense fallback={<SectionLoader />}>
          <IlPosto />
        </Suspense>

        <Suspense fallback={<SectionLoader />}>
          <Voci />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <MobileStickyBar />
    </div>
  );
};

export default Index;
