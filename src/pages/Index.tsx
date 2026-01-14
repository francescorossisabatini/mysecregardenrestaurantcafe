import { useEffect, useState, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Reviews } from "@/components/Reviews";
import { GallerySection } from "@/components/GallerySection";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { MobileStickyBar } from "@/components/MobileStickyBar";

const Index = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (window.scrollY > 10) {
        setShowNavbar(true);
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 2000);

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      clearTimeout(timer);
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
      
      <div className={`transition-opacity duration-[2000ms] ease-out ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navigation />
      </div>
      
      <Hero />
      
      {/* Menu section */}
      <MenuSection />
      
      {/* Reviews */}
      <Reviews />
      
      {/* Gallery */}
      <GallerySection />
      
      {/* End CTA Block */}
      <CTAEndBlock show={["weekly", "menu", "directions"]} />
      
      <Footer />
      
      <MobileStickyBar />
    </div>
  );
};

export default Index;
