import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { MenuSection } from "@/components/MenuSection";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { useLanguage } from "@/contexts/LanguageContext";

const Menu = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={language === "de" ? "Speisekarte" : "Menu"}
        description={language === "de"
          ? "Speisekarte von My Secret Garden in Wien mit Tagesmenü, Wochenmenü, Klassikern und Getränken."
          : "Menu at My Secret Garden in Vienna with today’s dishes, weekly menu, classics and drinks."}
        path="/menu"
      />
      <Navigation />
      <main className="pt-20">
        <MenuSection />
      </main>
      <CTAEndBlock show={["call", "directions"]} />
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Menu;