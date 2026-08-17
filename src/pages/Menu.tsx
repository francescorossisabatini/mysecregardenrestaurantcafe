import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { MenuSection } from "@/components/MenuSection";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { useLanguage } from "@/contexts/LanguageContext";
import { SkipLink } from "@/components/SkipLink";

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
      <SkipLink />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-20 focus:outline-none">
        <div className="container mx-auto px-6 pb-6 pt-8">
          <h1 className="font-cormorant text-4xl font-semibold text-foreground md:text-5xl">
            {language === "de" ? "Unsere Speisekarte" : "Our Menu"}
          </h1>
        </div>
        <MenuSection />
      </main>
      <CTAEndBlock show={["call", "directions"]} />
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Menu;