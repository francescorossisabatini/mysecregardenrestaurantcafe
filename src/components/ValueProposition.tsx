import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ValueProposition = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 md:py-28 lg:py-32 bg-card relative overflow-hidden">
      <div className="container mx-auto px-5 max-w-4xl lg:max-w-5xl relative z-10">
        <div className="text-center space-y-8 lg:space-y-10">
          {/* Eyebrow numbered — signature editorial */}
          <div className="flex justify-center">
            <span className="eyebrow-num">
              02 · {language === "de" ? "Der Ort" : "The place"}
            </span>
          </div>

          <p className="font-caveat text-2xl md:text-3xl text-accent">
            {language === "de" ? "Mitten im Raimundhof" : "Inside the Raimundhof"}
          </p>

          <h2 className="h2-editorial text-primary">
            {language === "de"
              ? "Kochen ein Gebet und\nEssen Dankbarkeit ist."
              : "Cooking is prayer and\neating is gratitude."}
          </h2>

          <div className="mx-auto flex justify-center">
            <span className="rule-short" aria-hidden="true" />
          </div>

          <div className="max-w-2xl lg:max-w-3xl mx-auto space-y-6">
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de"
                ? "Wir kochen jeden Tag frisch. Morgens kommen Gemüse, Kräuter und Getreide in die Küche, mittags stehen die ersten Teller am Tresen."
                : "We cook fresh every day. Vegetables, herbs and grains arrive in the morning; by lunch, the first plates are at the counter."}
            </p>

            <p className="font-lora text-base md:text-lg text-muted-high-contrast italic">
              {language === "de"
                ? "Vegetarisch und vegan. Viele Gerichte ohne glutenhaltige Zutaten, aber keine zertifiziert glutenfreie Küche."
                : "Vegetarian and vegan. Many dishes without gluten containing ingredients, but not a certified gluten free kitchen."}
            </p>
          </div>

          <div className="pt-2">
            <Button variant="outline" size="lg" className="font-work group" asChild>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 transition-all duration-200 ease-in-out hover:gap-3"
              >
                {language === "de" ? "Unsere Geschichte lesen" : "Read Our Story"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
