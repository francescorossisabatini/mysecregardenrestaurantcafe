import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Philosophy } from "@/components/Philosophy";
import { MenuHighlight } from "@/components/MenuHighlight";
import { Reviews } from "@/components/Reviews";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Philosophy />
      <MenuHighlight />
      <Reviews />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
