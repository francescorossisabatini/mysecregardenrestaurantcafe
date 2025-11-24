import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BotanicalDecoration } from "./BotanicalDecoration";
import interiorImg from "@/assets/interior-real.jpg";

export const ProductsNarrative = () => {
  const { language } = useLanguage();

  const features = [
    { de: "Biologische Zutaten", en: "Organic ingredients" },
    { de: "Hausgemachte Zubereitungen", en: "Homemade preparations" },
    { de: "Natürliche Gewürze", en: "Natural spices" },
  ];

  return (
    <section id="products" className="relative py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${interiorImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-accent/85 via-accent/80 to-accent/85" />
      </div>

      {/* Decorative corner */}
      <div className="absolute top-4 right-4 w-24 h-24 opacity-20">
        <BotanicalDecoration variant="corner" className="w-full h-full text-background" />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-caveat font-bold text-background drop-shadow-lg mb-6">
            {language === 'de' ? 'Unsere Produkte' : 'Our Products'}
          </h2>
          
          <div className="bg-background/90 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-elevated">
            <p className="text-foreground font-lora text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Unsere Gerichte werden täglich mit natürlichen und biologischen Zutaten zubereitet: frischem Gemüse, Vollkorngetreide und ausgewählten Gewürzen.'
                : 'Our dishes are prepared daily with natural and organic ingredients: fresh vegetables, whole grains and selected spices.'}
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-3 text-foreground">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="font-lora text-sm md:text-base font-medium">
                    {language === 'de' ? feature.de : feature.en}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
