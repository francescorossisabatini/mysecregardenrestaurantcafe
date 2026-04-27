import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ValueProposition = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-section-soft relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Poetic intro */}
        <div className="text-center space-y-8">
          <p className="font-caveat text-2xl md:text-3xl text-accent">
            {language === "de" ? "Mitten im Raimundhof" : "Inside the Raimundhof"}
          </p>
          
          <h2 className="text-4xl md:text-6xl text-primary leading-tight">
            {language === "de" 
              ? "Kochen ein Gebet und\nEssen Dankbarkeit ist." 
              : "Cooking is prayer and\neating is gratitude."}
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Wir kochen täglich frisch mit biologischen Zutaten und Produkten aus der Region. Die Gerichte wechseln mit der Saison und bleiben so einfach, nährend und liebevoll wie möglich." 
                : "We cook fresh every day with organic ingredients and produce from the region. The dishes follow the season and stay simple, nourishing and made with care."}
            </p>
            
            <p className="font-lora text-base md:text-lg text-muted-foreground italic">
              {language === "de" 
                ? "Vegetarisch, vegan und glutenfrei freundlich, größtenteils von Bauern aus der Region." 
                : "Vegetarian, vegan and gluten-free friendly, mostly from farmers in the region."}
            </p>
          </div>
          
          {/* Visual separator */}
          <div className="flex items-center justify-center gap-4 py-4">
            <span className="w-12 h-px bg-primary/30" />
            <span className="text-primary/60 text-lg">✿</span>
            <span className="w-12 h-px bg-primary/30" />
          </div>
          
          {/* CTA */}
          <Button variant="outline" size="lg" className="font-work group" asChild>
            <Link 
              to="/about"
              className="inline-flex items-center gap-2 transition-all duration-200 ease-in-out hover:gap-3"
            >
              {language === "de" ? "Unsere Geschichte entdecken" : "Discover Our Story"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
