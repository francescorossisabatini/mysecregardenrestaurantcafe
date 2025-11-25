import { Check, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BotanicalDecoration } from "./BotanicalDecoration";
import interiorImg from "@/assets/interior-real.jpg";

export const ProductsNarrative = () => {
  const { language } = useLanguage();

  return (
    <section id="products" className="relative overflow-hidden">
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
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-4xl py-12 sm:py-16 md:py-20 px-4">
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-elevated relative">
          <BotanicalDecoration 
            variant="flower" 
            className="absolute top-3 right-3 sm:top-4 sm:right-4 w-16 h-16 sm:w-20 sm:h-20 text-primary/10" 
          />

          {/* Title */}
          <div className="text-center mb-6 sm:mb-7 md:mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-caveat font-bold text-primary mb-3 sm:mb-4">
              {language === "de" ? "Unsere Produkte" : "Our Products"}
            </h2>
          </div>

          {/* Content */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 relative z-10">
            {/* Intro */}
            <p className="font-lora text-sm sm:text-base md:text-lg leading-relaxed text-foreground">
              {language === "de"
                ? "Alle unsere Gerichte werden täglich frisch zubereitet. Wir verwenden biologische und natürliche Zutaten, die Ihrem Körper und Geist Kraft geben."
                : "All our dishes are freshly prepared daily. We use organic and natural ingredients that give your body and mind strength."}
            </p>

            {/* Key Points */}
            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
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
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <span className="font-lora text-sm sm:text-base text-foreground">
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
