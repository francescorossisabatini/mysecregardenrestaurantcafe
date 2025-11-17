import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { DailyMenuHighlight } from "@/components/DailyMenuHighlight";
import { FullMenu } from "@/components/FullMenu";
import { ProductsNarrative } from "@/components/ProductsNarrative";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <DailyMenuHighlight />
      <FullMenu />
      <Reviews />
      <ProductsNarrative />
      <AboutSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
