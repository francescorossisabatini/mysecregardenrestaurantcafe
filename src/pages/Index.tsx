import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { HomeMenuPreview } from "@/components/HomeMenuPreview";
import { SkipLink } from "@/components/SkipLink";

// Lazy load below-the-fold components to reduce initial JS bundle
const ValueProposition = lazy(() => import("@/components/ValueProposition").then(m => ({ default: m.ValueProposition })));
const ShowcaseSections = lazy(() => import("@/components/ShowcaseSections").then(m => ({ default: m.ShowcaseSections })));
const Reviews = lazy(() => import("@/components/Reviews").then(m => ({ default: m.Reviews })));

const CTAEndBlock = lazy(() => import("@/components/CTAEndBlock").then(m => ({ default: m.CTAEndBlock })));
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

      <main id="main-content" tabIndex={-1} className="focus:outline-none">
      {/* HERO: Big image, H1, subtitle, 2 CTAs */}
      <Hero />
      
      {/* VALUE PROP: Label, H2, paragraph, 3 cards, CTA */}
      <Suspense fallback={<SectionLoader />}>
        <ValueProposition />
      </Suspense>
      
      {/* SHOWCASE 1: Menu/Specials - Image + Text */}
      {/* SHOWCASE 2: Visit - Text + Image (reversed) */}
      <Suspense fallback={<SectionLoader />}>
        <ShowcaseSections />
      </Suspense>

      {/* VOCI: Social proof from partner platforms (rhythmic break) */}
      <Suspense fallback={<SectionLoader />}>
        <Voci />
      </Suspense>

      {/* Menu preview with today's dishes */}
      <HomeMenuPreview />

      {/* Reviews / Social Proof */}
      <Suspense fallback={<SectionLoader />}>
        <Reviews />
      </Suspense>

      {/* FINAL CTA BLOCK: Brand bg, H2, address, Call + Directions */}
      <Suspense fallback={<SectionLoader />}>
        <CTAEndBlock show={["call", "directions", "menu"]} />
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
