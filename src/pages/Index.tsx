import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { AboutSection } from "@/components/AboutSection";
import { Philosophy } from "@/components/Philosophy";

import { DailyMenuHighlight } from "@/components/DailyMenuHighlight";
import { FullMenu } from "@/components/FullMenu";
import { ProductsNarrative } from "@/components/ProductsNarrative";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { Preloader } from "@/components/Preloader";
import { SectionDivider } from "@/components/SectionDivider";

const Index = () => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    // Check if preloader was shown
    const preloaderShown = sessionStorage.getItem("preloader_shown");
    
    if (!preloaderShown) {
      // Show navbar after preloader completes (5.5s) + 1s delay
      const timer = setTimeout(() => {
        setShowNavbar(true);
      }, 6500);
      
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
    } else {
      // No preloader, show navbar after scroll or 2 seconds
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
    }
  }, []);

  useEffect(() => {
    if (location.hash === "#full-menu") {
      setTimeout(() => {
        const element = document.getElementById("full-menu");
        if (element) {
          const offset = -50; // negative offset to scroll section more into view
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
      <Preloader />
      
      {/* Navigation with slow, delicate fade-in */}
      <div className={`transition-opacity duration-[2000ms] ease-out ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navigation />
      </div>
      
      {/* Hero Section - content appears on scroll */}
      <Hero />
      
      {/* Daily Menu */}
      <DailyMenuHighlight />
      
      {/* Modern Section Divider */}
      <SectionDivider variant="accent" />
      
      {/* Full Menu / Wochenkarte */}
      <FullMenu />
      
      {/* Subtle Divider */}
      <SectionDivider variant="default" />
      
      {/* Reviews */}
      <Reviews />
      
      {/* Visual Storytelling Section */}
      <StorySection />
      
      {/* About Section */}
      <AboutSection />
      
      {/* Philosophy / Unsere Inspiration */}
      <Philosophy />
      

      {/* Products */}
      <ProductsNarrative />
      
      {/* Contact with natural transition */}
      <SectionDivider variant="accent" showDecoration={false} />
      
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
