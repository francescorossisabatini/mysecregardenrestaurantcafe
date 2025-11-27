import { Check, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { BotanicalDecoration } from "./BotanicalDecoration";
import { Card } from "@/components/ui/card";
import interiorImg from "@/assets/interior-real.jpg";

export const ProductsNarrative = () => {
  const { language } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-background pb-12 sm:pb-16 md:pb-20">
      <div className="container mx-auto max-w-7xl py-0 px-4">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-caveat font-bold text-primary mb-3 sm:mb-4">
            {language === "de" ? "Unsere Produkte" : "Our Products"}
          </h2>
        </div>

        {/* Side-by-side layout */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-center">
          {/* Content */}
          <div className="order-2 md:order-1">
            <Card className="bg-card/95 backdrop-blur-sm p-6 sm:p-8 shadow-elevated border-2 border-primary/10 relative">
              <BotanicalDecoration 
                variant="flower" 
                className="absolute top-3 right-3 w-16 h-16 text-primary/10" 
              />
              
              <div className="space-y-5 sm:space-y-6 relative z-10">
                {/* Intro */}
                <p className="font-lora text-sm sm:text-base md:text-lg leading-relaxed text-foreground">
                  {language === "de"
                    ? "Alle unsere Gerichte werden täglich frisch zubereitet. Wir verwenden biologische und natürliche Zutaten, die Ihrem Körper und Geist Kraft geben."
                    : "All our dishes are freshly prepared daily. We use organic and natural ingredients that give your body and mind strength."}
                </p>

                {/* Key Points */}
                <div className="grid gap-3 sm:gap-4">
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
                    <div key={index} className="flex items-center gap-3 bg-accent/5 p-3 rounded-lg border border-accent/20">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                        <Leaf className="w-5 h-5 text-accent" />
                      </div>
                      <span className="font-lora text-sm sm:text-base text-foreground">
                        {language === "de" ? point.de : point.en}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2">
            <Card className="overflow-hidden shadow-elevated border-2 border-accent/20">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={interiorImg}
                  alt="Secret Garden Restaurant Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
