import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/Hero";
import { StorySection } from "@/components/StorySection";
import { AboutSection } from "@/components/AboutSection";
import { Philosophy } from "@/components/Philosophy";
import { MenuSection } from "@/components/MenuSection";
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
    const preloaderShown = sessionStorage.getItem("preloader_shown");
    
    if (!preloaderShown) {
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
      <Preloader />
      
      <div className={`transition-opacity duration-[2000ms] ease-out ${showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <Navigation />
      </div>
      
      <Hero />
      
      {/* Single unified menu section */}
      <MenuSection />
      
      <SectionDivider variant="default" />
      
      <Reviews />
      
      <StorySection />
      
      <AboutSection />
      
      <Philosophy />

      <ProductsNarrative />
      
      <SectionDivider variant="accent" showDecoration={false} />
      
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
