import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ValueProposition = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Subtle botanical decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Poetic intro */}
        <div className="text-center space-y-8">
          <p className="font-caveat text-2xl md:text-3xl text-accent">
            {language === "de" ? "Ein Ort, an dem..." : "A place where..."}
          </p>
          
          <h2 className="font-caveat text-4xl md:text-6xl text-primary leading-tight">
            {language === "de" 
              ? "Kochen ein Gebet und\nEssen Dankbarkeit ist." 
              : "Cooking is prayer and\neating is gratitude."}
          </h2>
          
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "In unserer Küche bereiten wir jedes Gericht mit der gleichen Aufmerksamkeit zu, mit der ein Gärtner seine Pflanzen pflegt. Saisonal, biologisch, von Hand – und immer mit einem stillen Lächeln." 
                : "In our kitchen, we prepare each dish with the same attention a gardener gives to their plants. Seasonal, organic, by hand – and always with a quiet smile."}
            </p>
            
            <p className="font-lora text-base md:text-lg text-muted-foreground italic">
              {language === "de" 
                ? "Vegetarisch, vegan, glutenfrei – von österreichischen Bauern aus der Region." 
                : "Vegetarian, vegan, gluten-free – from Austrian farmers in the region."}
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
