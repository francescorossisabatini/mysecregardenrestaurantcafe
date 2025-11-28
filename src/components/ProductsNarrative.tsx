import { Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { BotanicalDecoration } from "./BotanicalDecoration";
import { SpiritualAnimations } from "./SpiritualAnimations";
import { Card } from "@/components/ui/card";
import interiorImg from "@/assets/interior-real.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";

export const ProductsNarrative = () => {
  const { language } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);

  return (
    <section 
      ref={ref as any}
      className={`py-32 md:py-40 bg-muted/30 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary">
            {language === "de" ? "Unsere Produkte" : "Our Products"}
          </h2>
        </div>

        {/* Grid Layout - Clean */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-10">
            <p className="font-lora text-xl leading-relaxed text-foreground/90">
              {language === "de"
                ? "Alle unsere Gerichte werden täglich frisch zubereitet. Wir verwenden biologische und natürliche Zutaten, die Ihrem Körper und Geist Kraft geben."
                : "All our dishes are freshly prepared daily. We use organic and natural ingredients that give your body and mind strength."}
            </p>

            {/* Key Points - Simple list */}
            <div className="space-y-5">
              {[
                {
                  de: "Bio & regionale Zutaten",
                  en: "Organic & regional ingredients"
                },
                {
                  de: "Hausgemachte Zubereitungen",
                  en: "Homemade preparations"
                },
                {
                  de: "Natürliche Gewürze",
                  en: "Natural spices"
                },
                {
                  de: "Glutenfreie Optionen",
                  en: "Gluten-free options"
                }
              ].map((point, index) => (
                <div key={index} className="flex items-center gap-4">
                  <Leaf className="w-7 h-7 text-accent flex-shrink-0" />
                  <span className="font-lora text-xl text-foreground/90">
                    {language === "de" ? point.de : point.en}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={koreanBowl}
                alt="Fresh Korean Bowl at Secret Garden"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
