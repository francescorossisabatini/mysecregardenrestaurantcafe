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

      {/* Product Philosophy - Micro-blocks (addition, not replacement) */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-12">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Was wir kochen, entsteht am Morgen." 
                : "What we cook begins in the morning."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Gemüse aus der Region. Kräuter aus dem Garten. Das, was gerade wächst." 
                : "Vegetables from the region. Herbs from the garden. What grows right now."}
            </p>
          </div>
        </div>
      </section>

      {/* Lo-fi Visual Placeholder - Silent pause */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto">
          <div 
            className="aspect-[3/2] rounded-xl overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, hsl(var(--secondary)) 0%, hsl(var(--muted)) 50%, hsl(var(--secondary)/0.8) 100%)',
              position: 'relative',
            }}
          >
            {/* Subtle grain texture overlay */}
            <div 
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              }}
            />
            {/* Soft warm wash */}
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(ellipse at 30% 40%, hsl(var(--primary)/0.05) 0%, transparent 60%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Product Philosophy continued */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-12">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Wir kochen ohne Eile. Mit Aufmerksamkeit. Mit Freude." 
                : "We cook without haste. With attention. With joy."}
            </p>
          </div>
        </div>
      </section>

      {/* Bridge to Inspiration */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Essen, das nährt. Nicht nur den Körper." 
                : "Food that nourishes. Not just the body."}
            </p>
          </div>
        </div>
      </section>

      {/* Vetrina / Ideas - Internal Chapter */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Intro text */}
            <div className="max-w-2xl mx-auto mb-16 md:mb-20">
              <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed text-center">
                {language === "de" 
                  ? "Ein paar Dinge, die wir gerne teilen." 
                  : "A few things we like to share."}
              </p>
            </div>
            
            {/* Lo-fi Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Item 1 */}
              <div className="space-y-4">
                <div 
                  className="aspect-square rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(160deg, hsl(var(--secondary)) 0%, hsl(var(--muted)/0.8) 100%)',
                  }}
                >
                  <div 
                    className="w-full h-full opacity-[0.04]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <p className="font-lora text-sm text-foreground/60 text-center">
                  {language === "de" ? "Hausgemachte Marmeladen" : "Homemade jams"}
                </p>
              </div>
              
              {/* Item 2 */}
              <div className="space-y-4">
                <div 
                  className="aspect-square rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(145deg, hsl(var(--muted)) 0%, hsl(var(--secondary)/0.9) 100%)',
                  }}
                >
                  <div 
                    className="w-full h-full opacity-[0.04]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <p className="font-lora text-sm text-foreground/60 text-center">
                  {language === "de" ? "Kräutersalze aus dem Garten" : "Herb salts from the garden"}
                </p>
              </div>
              
              {/* Item 3 */}
              <div className="space-y-4">
                <div 
                  className="aspect-square rounded-xl overflow-hidden"
                  style={{
                    background: 'linear-gradient(170deg, hsl(var(--secondary)/0.9) 0%, hsl(var(--muted)/0.7) 100%)',
                  }}
                >
                  <div 
                    className="w-full h-full opacity-[0.04]"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    }}
                  />
                </div>
                <p className="font-lora text-sm text-foreground/60 text-center">
                  {language === "de" ? "Kleine Geschenke" : "Small gifts"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing thought */}
      <div className="pt-12 pb-6">
        <div className="container mx-auto px-4">
          <p className="font-lora text-base text-foreground/70 text-center">
            {language === "de" 
              ? "Einige dieser Dinge leben hier, bei uns." 
              : "Some of these things live here, with us."}
          </p>
        </div>
      </div>

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
