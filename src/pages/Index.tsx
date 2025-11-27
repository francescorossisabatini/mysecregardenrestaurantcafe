import { useEffect } from "react";
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
import { PhotoStripe } from "@/components/PhotoStripe";
import foodDetailImg from "@/assets/food-detail-real.jpg";
import poppyImg from "@/assets/poppy-flower-real.jpg";

const Index = () => {
  const location = useLocation();

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
      <Navigation />
      <Hero />
      <DailyMenuHighlight />
      <PhotoStripe imageUrl={foodDetailImg} variant="green" />
      <FullMenu />
      <PhotoStripe imageUrl={poppyImg} variant="blue" />
      <Reviews />
      <AboutSection />
      <ProductsNarrative />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
