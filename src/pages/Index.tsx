import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { DailyMenuHighlight } from "@/components/DailyMenuHighlight";
import { FullMenu } from "@/components/FullMenu";
import { ProductsNarrative } from "@/components/ProductsNarrative";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Navigation } from "@/components/Navigation";
import { PhotoStripe } from "@/components/PhotoStripe";
import foodDetailImg from "@/assets/food-detail-real.jpg";
import poppyImg from "@/assets/poppy-flower-real.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <DailyMenuHighlight />
      <PhotoStripe imageUrl={foodDetailImg} variant="green" />
      <FullMenu />
      <PhotoStripe imageUrl={poppyImg} variant="blue" />
      <Reviews />
      <ProductsNarrative />
      <InstagramFeed />
      <AboutSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
