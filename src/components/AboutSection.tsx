import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Droplets } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";
import gardenImg from "@/assets/garden-real.jpg";
import sriChinmoyImg from "@/assets/sri-chinmoy.jpg";

export const AboutSection = () => {
  const { language } = useLanguage();

  const sectionTitle = {
    de: "Über uns & unsere Inspiration",
    en: "About us & our Inspiration"
  };

  const aboutRestaurant = {
    de: "My Secret Garden ist ein friedliches vegetarisches & veganes Restaurant im Raimundhof in Wien. Wir bieten eine entspannte Atmosphäre in einem ruhigen Innenhof-Garten und bereiten täglich frische, hausgemachte Gerichte mit natürlichen und biologischen Zutaten zu. Unsere Küche vereint einfache, nährende Speisen, die Körper und Geist stärken.",
    en: "My Secret Garden is a peaceful vegetarian & vegan restaurant inside Vienna's Raimundhof. We offer a relaxed atmosphere in a quiet courtyard garden and prepare fresh, homemade dishes daily with natural and organic ingredients. Our cuisine combines simple, nourishing meals that strengthen body and mind."
  };

  const aboutInspiration = {
    de: "Unser Restaurant ist von Sri Chinmoys Philosophie inspiriert – seinen Werten von Frieden, Einfachheit und dem Streben, das Gute in anderen zu sehen. Diese spirituelle Lebensweise des inneren Friedens und der bewussten, natürlichen Ernährung spiegelt sich sowohl in der stillen Atmosphäre unseres Secret Garden als auch in unseren liebevoll zubereiteten Gerichten wider.",
    en: "Our restaurant is inspired by Sri Chinmoy's philosophy – his values of peace, simplicity and the aspiration to see the good in others. This spiritual way of life of inner peace and conscious, natural nourishment is reflected both in the quiet atmosphere of our Secret Garden and in our lovingly prepared dishes."
  };

  const quote = {
    de: "\"Das Gute in anderen zu sehen, ist der Anfang von Frieden.\"",
    en: "\"To see the good in others is the beginning of peace.\""
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
            {sectionTitle[language]}
          </h2>
        </div>

        {/* Combined About Restaurant & Sri Chinmoy Section */}
        <div className="bg-cream/40 rounded-lg p-8 md:p-12 relative">
          <BotanicalDecoration 
            variant="flower" 
            className="absolute top-4 right-4 w-20 h-20 text-primary/10" 
          />
          <BotanicalDecoration 
            variant="leaf" 
            className="absolute bottom-4 left-4 w-16 h-16 text-accent/10" 
          />

          {/* About the Restaurant with photo */}
          <div className="grid md:grid-cols-[1fr_300px] gap-8 items-start mb-12">
            <div>
              <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary mb-6">
                {language === "de" ? "Unser Restaurant" : "Our Restaurant"}
              </h3>
              <p className="font-lora text-base md:text-lg leading-relaxed text-foreground mb-6">
                {aboutRestaurant[language]}
              </p>

              {/* Values */}
              <div className="space-y-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <value.icon className="w-5 h-5 text-accent" />
                    </div>
                    <span className="font-lora text-base text-foreground">
                      {value.title[language]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Garden photo */}
            <Card className="relative overflow-hidden border-2 border-primary/20 hover:shadow-elevated transition-all">
              <BotanicalDecoration 
                variant="corner" 
                className="absolute top-0 right-0 w-16 h-16 text-accent/20 z-10" 
              />
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={gardenImg}
                  alt="Secret Garden Restaurant"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </Card>
          </div>

          {/* Our Inspiration: Sri Chinmoy */}
          <div className="border-t-2 border-primary/10 pt-10">
            <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary mb-8 text-center">
              {language === "de" ? "Unsere Inspiration: Sri Chinmoy" : "Our Inspiration: Sri Chinmoy"}
            </h3>

            <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start mb-8">
              {/* Sri Chinmoy portrait */}
              <div className="mx-auto md:mx-0 w-full max-w-[220px]">
                <Card className="overflow-hidden border-2 border-[#243260]/30 shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={sriChinmoyImg}
                      alt="Sri Chinmoy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
              </div>

              {/* Inspiration text */}
              <div>
                <p className="font-lora text-base md:text-lg leading-relaxed text-foreground mb-6">
                  {aboutInspiration[language]}
                </p>

                {/* Quote box */}
                <Card className="bg-cream border-2 border-[#243260]/40 p-5 relative overflow-hidden">
                  <BotanicalDecoration 
                    variant="flower" 
                    className="absolute top-1 right-1 w-10 h-10 text-[#243260]/10" 
                  />
                  <p className="font-lora text-sm md:text-base italic text-foreground text-center mb-2">
                    {quote[language]}
                  </p>
                  <p className="font-caveat text-lg text-[#243260] text-center">
                    – Sri Chinmoy
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
