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
      className={`relative overflow-hidden min-h-screen flex items-center transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${koreanBowl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/80 to-background/85" />
      
      {/* Spiritual animations */}
      <SpiritualAnimations variant="leaves" className="opacity-80" />
      
      <div className="container mx-auto max-w-5xl py-20 px-4 md:px-8 relative z-10">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary mb-6">
            {language === "de" ? "Unsere Produkte" : "Our Products"}
          </h2>
        </div>

        {/* Grid Layout - Minimal */}
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image - Larger on left */}
          <div className="md:col-span-2">
            <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
              <img
                src={interiorImg}
                alt="Secret Garden Restaurant Interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-8">
            <p className="font-lora text-lg leading-relaxed text-foreground/90">
              {language === "de"
                ? "Alle unsere Gerichte werden täglich frisch zubereitet. Wir verwenden biologische und natürliche Zutaten, die Ihrem Körper und Geist Kraft geben."
                : "All our dishes are freshly prepared daily. We use organic and natural ingredients that give your body and mind strength."}
            </p>

            {/* Key Points - Simple list */}
            <div className="space-y-4">
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
                  <Leaf className="w-6 h-6 text-accent flex-shrink-0" />
                  <span className="font-lora text-lg text-foreground/90">
                    {language === "de" ? point.de : point.en}
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
