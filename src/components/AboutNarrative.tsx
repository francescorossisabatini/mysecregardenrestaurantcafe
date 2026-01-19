import { Card } from "@/components/ui/card";
import { Leaf, Heart, Flower2, Sun } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { RoseFlower, ContinuousVine, DetailedFlower } from "@/components/FloralDecorations";

export const AboutNarrative = () => {
  const { t, language } = useLanguage();
  
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-24 text-accent opacity-50" aria-hidden="true">
        <ContinuousVine className="w-full h-full" />
      </div>
      <div className="absolute top-20 right-12 w-28 h-28 text-accent opacity-70" aria-hidden="true">
        <RoseFlower className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 left-12 w-32 h-32 text-accent opacity-70" aria-hidden="true">
        <DetailedFlower className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto space-y-20">
          
          {/* Intro Section - Centered */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-block">
              <h2 className="text-5xl md:text-7xl font-serif mb-2">
                <span className="text-foreground font-light">WIR</span>
                <span className="font-dancing text-6xl md:text-8xl text-primary mx-2">über</span>
                <span className="text-foreground font-light">uns</span>
              </h2>
              <div className="w-32 h-1 bg-accent mx-auto rounded-full mt-4" />
            </div>
            
            <p className="text-2xl md:text-3xl font-serif italic text-primary/90 leading-relaxed">
              {t("about.intro")}
            </p>
          </div>

          {/* Story Section 1 - Image Right */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-4">
                <Leaf className="w-8 h-8 text-accent" />
                <h3 className="text-3xl font-serif text-foreground">
                  {language === "de" ? "Unsere Philosophie" : "Our Philosophy"}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-foreground/90">
                {t("about.p1")}
              </p>
              
              <div className="flex flex-wrap gap-3 pt-4">
                <div className="px-4 py-2 bg-accent/15 rounded-full">
                  <span className="text-sm font-medium text-accent">
                    {t("about.bio")}
                  </span>
                </div>
                <div className="px-4 py-2 bg-primary/10 rounded-full">
                  <span className="text-sm font-medium text-primary">
                    {t("about.fair")}
                  </span>
                </div>
                <div className="px-4 py-2 bg-blue/10 rounded-full">
                  <span className="text-sm font-medium text-blue">
                    {t("about.regional")}
                  </span>
                </div>
                <div className="px-4 py-2 bg-accent/10 rounded-full">
                  <span className="text-sm font-medium text-accent">
                    {t("about.seasonal")}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
              <Card className="relative overflow-hidden rounded-2xl shadow-elevated border-2 border-accent/20">
                <img 
                  src="https://www.secretgardenrestaurant.at/wp-content/uploads/2020/02/vegetarisches-restaurant-wien.jpg"
                  alt="Fresh vegetables and ingredients"
                  className="w-full h-80 object-cover"
                />
              </Card>
            </div>
          </div>

          {/* Quote Section */}
          <Card className="relative p-12 bg-gradient-to-br from-primary/10 via-accent/5 to-primary/10 border-primary/20 shadow-elevated overflow-hidden">
            <div className="absolute top-4 right-4 w-24 h-24 text-primary/10">
              <DetailedFlower className="w-full h-full" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <Heart className="w-12 h-12 mx-auto text-accent" />
              <p className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed">
                {language === "de" 
                  ? '"Nahrung für Körper, Geist und Seele – täglich frisch zubereitet mit Liebe und Achtsamkeit"' 
                  : '"Nourishment for body, mind and soul – freshly prepared daily with love and mindfulness"'}
              </p>
            </div>
          </Card>

          {/* Story Section 2 - Image Left */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative group order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-primary/10 rounded-2xl transform -rotate-3 group-hover:-rotate-6 transition-transform"></div>
              <Card className="relative overflow-hidden rounded-2xl shadow-elevated border-2 border-primary/20">
                <img 
                  src="https://www.secretgardenrestaurant.at/wp-content/uploads/2020/09/Gastgarten.jpg"
                  alt="Secret Garden courtyard"
                  className="w-full h-80 object-cover"
                />
              </Card>
            </div>
            
            <div className="space-y-6 order-1 md:order-2">
              <div className="flex items-center gap-3 mb-4">
                <Flower2 className="w-8 h-8 text-primary" />
                <h3 className="text-3xl font-serif text-foreground">
                  {language === "de" ? "Unser Geheimer Garten" : "Our Secret Garden"}
                </h3>
              </div>
              <p className="text-lg leading-relaxed text-foreground/90">
                {t("about.p4")}
              </p>
              <p className="text-lg leading-relaxed text-foreground/90">
                {t("about.p2")}
              </p>
            </div>
          </div>


        </div>
      </div>
    </section>
  );
};
