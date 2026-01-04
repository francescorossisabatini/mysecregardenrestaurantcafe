import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import entranceGarden from "@/assets/entrance-garden.jpg";
import dalRiceBowl from "@/assets/dal-rice-bowl.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Spacer for fixed navigation */}
      <div className="h-20" />

      {/* ═══════════════════════════════════════════════
          BLOCK 1: MANIFESTO PHRASE - Emotional anchor
          Large, centered, maximum breathing room
      ═══════════════════════════════════════════════ */}
      <section className="py-24 md:py-40">
        <div className="container mx-auto px-4">
          <h1 className="font-caveat text-4xl md:text-6xl lg:text-7xl text-primary text-center leading-tight max-w-3xl mx-auto">
            {language === "de" 
              ? "Ein Raum für Ruhe und Begegnung." 
              : "A space for calm and connection."}
          </h1>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BLOCK 2: DESCRIPTIVE BLOCK - Combined narrative
          Smaller font, one paragraph, natural alignment
      ═══════════════════════════════════════════════ */}
      <section className="pb-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-2xl">
          <p className="font-lora text-lg md:text-xl text-foreground/75 leading-relaxed">
            {language === "de" 
              ? "Was wir kochen, entsteht am Morgen – mit Gemüse aus der Region, Kräutern aus dem Garten und dem, was gerade wächst." 
              : "What we cook takes shape in the morning – with vegetables from the region, herbs from the garden, and whatever is in season."}
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BLOCK 3: VISUAL PAUSE - Image
          Never more than 2 text blocks without image
      ═══════════════════════════════════════════════ */}
      <section className="pb-24 md:pb-36">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg">
            <img 
              src={entranceGarden} 
              alt={language === "de" ? "Eingang zum Garten" : "Entrance to the garden"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          BLOCK 4: SECOND POETIC PHRASE - Discovery moment
          Medium font, centered, feels like finding something
      ═══════════════════════════════════════════════ */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-xl">
          <p className="font-lora text-xl md:text-2xl text-foreground/70 text-center leading-relaxed whitespace-pre-line">
            {language === "de" 
              ? "Wir kochen ohne Eile.\nMit Aufmerksamkeit.\nMit Freude." 
              : "We cook without haste.\nWith attention.\nWith joy."}
          </p>
        </div>
      </section>

      {/* Visual Pause - Second Image */}
      <section className="pb-24 md:pb-36">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-lg">
            <img 
              src={dalRiceBowl} 
              alt={language === "de" ? "Dal mit Reis" : "Dal with rice"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>


      {/* Link to Inspiration - Minimal */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Link 
              to="/inspiration"
              className="font-lora text-lg text-foreground/50 hover:text-foreground/70 transition-colors inline-flex items-center gap-2"
            >
              {language === "de" ? "Unsere Inspiration" : "Our Inspiration"}
              <span className="text-sm">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      
      <FloatingCallButton />
    </div>
  );
};

export default AboutUs;
