import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Droplets } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";
import gardenImg from "@/assets/garden-real.jpg";
import sriChinmoyImg from "@/assets/sri-chinmoy.jpg";

export const AboutSection = () => {
  const { language } = useLanguage();

  const aboutText = {
    de: "My Secret Garden ist ein friedliches vegetarisches & veganes Restaurant im Raimundhof in Wien. Wir bieten eine entspannte Atmosphäre und bereiten täglich frische, hausgemachte Gerichte mit natürlichen und biologischen Zutaten zu. Unsere Küche vereint einfache, nährende Speisen, die Körper und Geist stärken.",
    en: "My Secret Garden is a peaceful vegetarian & vegan restaurant inside Vienna's Raimundhof. We offer a relaxed atmosphere and prepare fresh, homemade dishes daily with natural and organic ingredients. Our cuisine combines simple, nourishing meals that strengthen body and mind."
  };

  const inspirationTitle = {
    de: "Unsere Inspiration: Sri Chinmoy",
    en: "Our Inspiration: Sri Chinmoy"
  };

  const inspirationText = {
    de: "My Secret Garden ist von der Philosophie Sri Chinmoys inspiriert – seinen Ideen von Frieden, Einfachheit und bewusster Lebensweise. Seine Botschaft des inneren Friedens und der natürlichen Ernährung spiegelt sich in der Atmosphäre und den Gerichten unseres Restaurants wider.",
    en: "My Secret Garden is inspired by Sri Chinmoy's philosophy – his ideas of peace, simplicity and conscious living. His message of inner peace and natural nourishment is reflected in our restaurant's atmosphere and dishes."
  };

  const quote = {
    de: "\"Der Garten der Seele erblüht durch Frieden und einfache Freude.\"",
    en: "\"The garden of the soul blossoms through peace and simple joy.\""
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

        {/* About the Restaurant */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Garden photo */}
          <Card className="relative overflow-hidden border-2 border-primary/20 hover:shadow-elevated transition-all">
            <BotanicalDecoration 
              variant="corner" 
              className="absolute top-0 right-0 w-24 h-24 text-accent/20 z-10" 
            />
            <img
              src={gardenImg}
              alt="Secret Garden Restaurant"
              className="w-full h-auto"
            />
          </Card>

          {/* About text */}
          <div>
            <p className="font-lora text-lg leading-relaxed text-foreground mb-8">
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
        </div>

        {/* Our Inspiration: Sri Chinmoy */}
        <div className="bg-cream/30 rounded-lg p-8 md:p-12 relative">
          <BotanicalDecoration 
            variant="flower" 
            className="absolute top-4 left-4 w-16 h-16 text-primary/10" 
          />
          
          <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-8 text-center">
            {inspirationTitle[language]}
          </h3>

          <div className="grid md:grid-cols-[250px_1fr] gap-8 items-start mb-8">
            {/* Sri Chinmoy portrait - smaller */}
            <div className="mx-auto md:mx-0">
              <img
                src={sriChinmoyImg}
                alt="Sri Chinmoy"
                className="w-full max-w-[250px] h-auto rounded-lg border-2 border-primary/20 shadow-lg"
              />
            </div>

            {/* Inspiration text */}
            <div>
              <p className="font-lora text-base md:text-lg leading-relaxed text-foreground">
                {inspirationText[language]}
              </p>
            </div>
          </div>

          {/* Quote box */}
          <Card className="bg-cream border-2 border-primary/30 p-6 relative overflow-hidden">
            <BotanicalDecoration 
              variant="flower" 
              className="absolute top-2 right-2 w-12 h-12 text-primary/10" 
            />
            <p className="font-lora text-base md:text-lg italic text-foreground text-center mb-3">
              {quote[language]}
            </p>
            <p className="font-caveat text-xl text-primary text-center">
              – Sri Chinmoy
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};
