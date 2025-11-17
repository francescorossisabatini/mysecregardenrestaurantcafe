import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Droplets } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";
import sriChinmoyImg from "@/assets/sri-chinmoy.jpg";

export const AboutSection = () => {
  const { language } = useLanguage();

  const aboutText = {
    de: "Ein friedliches vegetarisches & veganes Restaurant im Raimundhof in Wien. Unsere Küche ist von Sri Chinmoys Werten von Frieden, Einfachheit und natürlicher Nahrung inspiriert. Wir bereiten einfache, hausgemachte Gerichte zu, die Körper und Geist nähren.",
    en: "A peaceful vegetarian & vegan restaurant inside Vienna's Raimundhof. Our cuisine is inspired by Sri Chinmoy's values of peace, simplicity and natural nourishment. We prepare simple, homemade dishes to nourish body and mind."
  };

  const values = [
    {
      icon: Leaf,
      title: { de: "Natürliche Zutaten", en: "Natural Ingredients" },
    },
    {
      icon: Heart,
      title: { de: "Hausgemachtes Essen", en: "Homemade Food" },
    },
    {
      icon: Droplets,
      title: { de: "Alkoholfrei", en: "Alcohol-free" },
    },
  ];

  return (
    <section id="about" className="py-20 px-4 bg-background relative">
      {/* Decorative elements */}
      <BotanicalDecoration 
        variant="flower" 
        className="absolute top-20 right-10 w-32 h-32 text-accent/10" 
      />
      <BotanicalDecoration 
        variant="leaf" 
        className="absolute bottom-20 left-10 w-28 h-28 text-primary/10" 
      />

      <div className="container mx-auto max-w-6xl">
        {/* Title */}
        <div className="text-center mb-16">
          <BotanicalDecoration 
            variant="vine" 
            className="w-64 h-8 mx-auto mb-4 text-primary/20" 
          />
          <h2 className="text-5xl md:text-6xl font-caveat font-bold text-primary mb-6">
            {language === "de" ? "Über Uns" : "About Us"}
          </h2>
        </div>

        {/* Content with image */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <p className="font-lora text-lg leading-relaxed text-foreground mb-6">
              {aboutText[language]}
            </p>

            {/* Values */}
            <div className="space-y-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-accent" />
                  </div>
                  <span className="font-lora text-lg text-foreground">
                    {value.title[language]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Sri Chinmoy image */}
          <Card className="relative overflow-hidden border-2 border-primary/20 hover:shadow-elevated transition-all">
            <BotanicalDecoration 
              variant="corner" 
              className="absolute top-0 right-0 w-24 h-24 text-accent/20 z-10" 
            />
            <img
              src={sriChinmoyImg}
              alt="Sri Chinmoy"
              className="w-full h-auto"
            />
            <div className="p-6 bg-gradient-to-t from-primary/90 to-transparent absolute bottom-0 left-0 right-0">
              <p className="font-caveat text-2xl text-background text-center">
                {language === "de" 
                  ? "Inspiriert von Sri Chinmoy" 
                  : "Inspired by Sri Chinmoy"}
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
