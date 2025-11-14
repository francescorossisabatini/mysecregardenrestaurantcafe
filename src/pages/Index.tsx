import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Philosophy } from "@/components/Philosophy";
import { MenuHighlight } from "@/components/MenuHighlight";
import { Products } from "@/components/Products";
import { Reviews } from "@/components/Reviews";
import { InstagramFeed } from "@/components/InstagramFeed";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Philosophy />
      <MenuHighlight />
      <Products />
      <Reviews />
      <InstagramFeed />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
