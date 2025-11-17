import { Check } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BotanicalDecoration } from "./BotanicalDecoration";

export const ProductsNarrative = () => {
  const { language } = useLanguage();

  const features = [
    { de: "Biologische Zutaten", en: "Organic ingredients" },
    { de: "Hausgemachte Zubereitungen", en: "Homemade preparations" },
    { de: "Natürliche Gewürze", en: "Natural spices" },
  ];

  return (
    <section id="products" className="py-12 md:py-16 bg-[#F5F1E3] relative overflow-hidden">
      {/* Subtle botanical corner decoration */}
      <div className="absolute top-4 right-4 w-24 h-24 opacity-10">
        <BotanicalDecoration variant="corner" className="w-full h-full text-[#243260]" />
      </div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-caveat font-bold text-[#243260] mb-6">
            {language === 'de' ? 'Unsere Produkte' : 'Our Products'}
          </h2>
          
          <p className="text-[#1E1C1A] font-lora text-base md:text-lg leading-relaxed mb-8 max-w-2xl mx-auto">
            {language === 'de' 
              ? 'Unsere Gerichte werden täglich mit natürlichen und biologischen Zutaten zubereitet: frischem Gemüse, Vollkorngetreide und ausgewählten Gewürzen.'
              : 'Our dishes are prepared daily with natural and organic ingredients: fresh vegetables, whole grains and selected spices.'}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[#1E1C1A]">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#74A84B] flex items-center justify-center">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="font-lora text-sm md:text-base">
                  {language === 'de' ? feature.de : feature.en}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
