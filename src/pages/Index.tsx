import { useEffect } from "react";
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
  useEffect(() => {
    try {
      const target = sessionStorage.getItem("scrollTarget");
      if (target) {
        sessionStorage.removeItem("scrollTarget");
        setTimeout(() => {
          const element = document.querySelector(target);
          if (element) {
            const offset = 80; // navbar height
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          }
        }, 150);
      }
    } catch (e) {
      // ignore storage errors
    }
  }, []);

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
