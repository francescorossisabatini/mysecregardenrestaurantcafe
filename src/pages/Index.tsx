import { Hero } from "@/components/Hero";
import { AboutNarrative } from "@/components/AboutNarrative";
import { Philosophy } from "@/components/Philosophy";
import { DailyMenuHighlight } from "@/components/DailyMenuHighlight";
import { FullMenu } from "@/components/FullMenu";
import { ProductsNarrative } from "@/components/ProductsNarrative";
import { Reviews } from "@/components/Reviews";
import { InstagramFeed } from "@/components/InstagramFeed";
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
      <AboutNarrative />
      <Philosophy />
      <InstagramFeed />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
