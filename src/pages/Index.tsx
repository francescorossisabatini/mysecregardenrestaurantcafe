import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { MenuSection } from "@/components/MenuSection";
import { Reviews } from "@/components/Reviews";
import { GallerySection } from "@/components/GallerySection";
import { InstagramCTA } from "@/components/InstagramCTA";
import { HomeClosing } from "@/components/HomeClosing";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { FloatingCallButton } from "@/components/FloatingCallButton";

const Index = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNavbar(true);
    }, 2000);

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowNavbar(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (location.hash === "#menu") {
      setTimeout(() => {
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
      }, 50);
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
      
      {/* Gallery - after reviews, before closing */}
      <GallerySection />
      
      {/* Instagram - whispered invitation */}
      <InstagramCTA />
      
      {/* Silent closing + exploration CTA */}
      <HomeClosing />
      
      <Footer />
      
      <FloatingCallButton />
    </div>
  );
};

export default Index;
