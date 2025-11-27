import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
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
      // Show navbar after preloader
      const timer = setTimeout(() => {
        setShowNavbar(true);
      }, 4200); // Shortly after preloader ends
      
      return () => clearTimeout(timer);
    } else {
      // No preloader, show immediately
      setShowNavbar(true);
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
      
      {/* Navigation with fade-in after preloader */}
      <div className={`transition-opacity duration-1000 ${showNavbar ? "opacity-100" : "opacity-0"}`}>
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
      
      {/* Elegant Divider */}
      <SectionDivider variant="subtle" />
      
      {/* About Section */}
      <AboutSection />
      
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
