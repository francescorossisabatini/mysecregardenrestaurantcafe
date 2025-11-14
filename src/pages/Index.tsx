import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Philosophy } from "@/components/Philosophy";
import { DailyMenuHighlight } from "@/components/DailyMenuHighlight";
import { MenuHighlight } from "@/components/MenuHighlight";
import { ProductsNarrative } from "@/components/ProductsNarrative";
import { Reviews } from "@/components/Reviews";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <DailyMenuHighlight />
      <MenuHighlight />
      <Reviews />
      <ProductsNarrative />
      <About />
      <Philosophy />
      <InstagramFeed />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
