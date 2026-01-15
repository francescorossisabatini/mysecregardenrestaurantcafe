import { useLanguage } from "@/contexts/LanguageContext";
import { Leaf, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const ValueProposition = () => {
  const { language } = useLanguage();

  const values = [
    {
      emoji: "🌱",
      icon: Leaf,
      titleDe: "Vegetarisch & Vegan",
      titleEn: "Vegetarian & Vegan",
      descDe: "Täglich frisch aus saisonalen Bio-Zutaten.",
      descEn: "Fresh daily from seasonal organic ingredients.",
    },
    {
      emoji: "🌿",
      icon: Heart,
      titleDe: "Bio & Regional",
      titleEn: "Organic & Local",
      descDe: "Von lokalen Produzenten aus der Region.",
      descEn: "From local producers in the region.",
    },
    {
      emoji: "✨",
      icon: Sparkles,
      titleDe: "Achtsam Zubereitet",
      titleEn: "Mindfully Prepared",
      descDe: "Mit Ruhe, Aufmerksamkeit und Freude.",
      descEn: "With calm, attention, and joy.",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Label */}
        <p className="text-xs font-work uppercase tracking-widest text-accent text-center mb-4">
          {language === "de" ? "Unser Ansatz" : "Our Approach"}
        </p>
        
        {/* H2 */}
        <h2 className="font-caveat text-4xl md:text-5xl text-primary text-center mb-6">
          {language === "de" ? "Essen mit Seele" : "Food with Soul"}
        </h2>
        
        {/* Paragraph */}
        <p className="font-lora text-lg text-foreground/80 text-center max-w-2xl mx-auto mb-12">
          {language === "de" 
            ? "Wir kochen, wie wir leben: bewusst, saisonal und mit Liebe. Jedes Gericht erzählt eine Geschichte." 
            : "We cook as we live: mindfully, seasonally, and with love. Every dish tells a story."}
        </p>
        
        {/* 3 Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {values.map((value, index) => (
            <div key={index} className="text-center space-y-3">
              <span className="text-4xl">{value.emoji}</span>
              <h3 className="font-cormorant text-xl font-semibold text-foreground">
                {language === "de" ? value.titleDe : value.titleEn}
              </h3>
              <p className="font-work text-sm text-muted-foreground">
                {language === "de" ? value.descDe : value.descEn}
              </p>
            </div>
          ))}
        </div>
        
        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" className="font-work" asChild>
            <Link to="/about">
              {language === "de" ? "Mehr über uns" : "Learn More"}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
