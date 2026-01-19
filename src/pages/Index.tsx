import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { Hero } from "@/components/Hero";
import { Navigation } from "@/components/Navigation";
import { MobileStickyBar } from "@/components/MobileStickyBar";

// Lazy load below-the-fold components to reduce initial JS bundle
const ValueProposition = lazy(() => import("@/components/ValueProposition").then(m => ({ default: m.ValueProposition })));
const ShowcaseSections = lazy(() => import("@/components/ShowcaseSections").then(m => ({ default: m.ShowcaseSections })));
const MenuSection = lazy(() => import("@/components/MenuSection").then(m => ({ default: m.MenuSection })));
const Reviews = lazy(() => import("@/components/Reviews").then(m => ({ default: m.Reviews })));
const GallerySection = lazy(() => import("@/components/GallerySection").then(m => ({ default: m.GallerySection })));
const CTAEndBlock = lazy(() => import("@/components/CTAEndBlock").then(m => ({ default: m.CTAEndBlock })));
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
    if (location.hash === "#menu") {
      // Use requestAnimationFrame to batch layout reads
      requestAnimationFrame(() => {
        const element = document.getElementById("menu");
        if (element) {
          const offset = -50;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    }
  }, [location]);

  return (
    <div className="min-h-screen">
      <SEOHead path="/" />
      <div className={`transition-opacity duration-[2000ms] ease-out ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navigation />
      </div>
      
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
      
      {/* Menu section with today's dishes */}
      <Suspense fallback={<SectionLoader />}>
        <MenuSection />
      </Suspense>
      
      {/* Reviews / Social Proof */}
      <Suspense fallback={<SectionLoader />}>
        <Reviews />
      </Suspense>
      
      {/* Gallery */}
      <Suspense fallback={<SectionLoader />}>
        <GallerySection />
      </Suspense>
      
      {/* FINAL CTA BLOCK: Brand bg, H2, address, Call + Directions */}
      <Suspense fallback={<SectionLoader />}>
        <CTAEndBlock show={["call", "directions", "weekly"]} />
      </Suspense>
      
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      
      <MobileStickyBar />
    </div>
  );
};

export default Index;
