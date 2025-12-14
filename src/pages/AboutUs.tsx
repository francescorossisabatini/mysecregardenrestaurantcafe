import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import entranceGarden from "@/assets/entrance-garden.jpg";
import interiorReal from "@/assets/interior-real.jpg";
import gardenReal from "@/assets/garden-real.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero - Minimal */}
      <div className="pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-5xl md:text-7xl font-caveat font-bold text-primary">
              {language === "de" ? "Über uns" : "About us"}
            </h1>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="container mx-auto px-4 mb-24 md:mb-32">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl">
            <img
              src={entranceGarden}
              alt="Secret Garden Restaurant Entrance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* First Fragment */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="font-lora text-xl md:text-2xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Ein Innenhof. Ein Garten. Ein Ort der Stille." 
                : "A courtyard. A garden. A place of stillness."}
            </p>
          </div>
        </div>
      </section>

      {/* Garden Image */}
      <div className="container mx-auto px-4 mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={gardenReal}
              alt={language === "de" ? "Unser Garten" : "Our Garden"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Second Fragment */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Täglich kochen wir frisch." 
                : "We cook fresh every day."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Biologische Zutaten. Einfache Rezepte." 
                : "Organic ingredients. Simple recipes."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Vegetarisch. Vegan. Alkoholfrei." 
                : "Vegetarian. Vegan. Alcohol-free."}
            </p>
          </div>
        </div>
      </section>

      {/* Interior Image */}
      <div className="container mx-auto px-4 mb-16 md:mb-24">
        <div className="max-w-4xl mx-auto">
          <div className="aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src={interiorReal}
              alt={language === "de" ? "Unser Raum" : "Our Space"}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Third Fragment */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Ein Raum für Ruhe und Begegnung." 
                : "A space for calm and connection."}
            </p>
          </div>
        </div>
      </section>

      {/* Link to Inspiration - Minimal */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Link 
              to="/inspiration" 
              className="font-lora text-lg text-accent hover:text-primary transition-colors duration-300"
            >
              {language === "de" ? "Unsere Inspiration →" : "Our Inspiration →"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
