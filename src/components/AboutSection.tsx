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
    <section id="about" className="relative overflow-hidden">
      {/* Large background image with overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${gardenImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-background/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-6xl py-12 sm:py-16 md:py-20 px-4">
        {/* Title */}
        <div className="text-center mb-8 sm:mb-12 md:mb-16">
          <BotanicalDecoration 
            variant="vine" 
            className="w-48 sm:w-56 md:w-64 h-6 sm:h-7 md:h-8 mx-auto mb-3 md:mb-4 text-primary/20" 
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-caveat font-bold text-primary mb-4 md:mb-6">
            {sectionTitle[language]}
          </h2>
        </div>

        {/* Main content card */}
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-elevated relative">
          <BotanicalDecoration 
            variant="flower" 
            className="absolute top-4 right-4 w-20 h-20 text-primary/10" 
          />

          {/* About the Restaurant */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-caveat font-bold text-primary mb-4 sm:mb-5 md:mb-6">
              {language === "de" ? "Unser Restaurant" : "Our Restaurant"}
            </h3>
            <p className="font-lora text-sm sm:text-base md:text-lg leading-relaxed text-foreground mb-4 sm:mb-5 md:mb-6">
              {aboutRestaurant[language]}
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-2 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                  </div>
                  <span className="font-lora text-sm sm:text-base text-foreground">
                    {value.title[language]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Our Inspiration: Sri Chinmoy */}
          <div className="border-t-2 border-primary/10 pt-6 sm:pt-8 md:pt-10">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-caveat font-bold text-primary mb-6 sm:mb-7 md:mb-8">
              {language === "de" ? "Unsere Inspiration: Sri Chinmoy" : "Our Inspiration: Sri Chinmoy"}
            </h3>

            <div className="grid md:grid-cols-[180px_1fr] lg:grid-cols-[200px_1fr] gap-6 sm:gap-7 md:gap-8 items-start">
              {/* Sri Chinmoy portrait */}
              <div className="mx-auto md:mx-0 w-full max-w-[160px] sm:max-w-[180px] md:max-w-[180px] lg:max-w-[200px]">
                <Card className="overflow-hidden border-2 border-primary/30 shadow-lg">
                  <div className="aspect-[3/4] overflow-hidden">
                    <img
                      src={sriChinmoyImg}
                      alt="Sri Chinmoy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Card>
                <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm font-lora text-muted-foreground italic">
                  Sri Chinmoy<br />
                  {language === "de" ? "1931-2007" : "1931-2007"}
                </p>
              </div>

              {/* Inspiration text and quote */}
              <div>
                <p className="font-lora text-sm sm:text-base md:text-lg leading-relaxed text-foreground mb-4 sm:mb-5 md:mb-6">
                  {aboutInspiration[language]}
                </p>

                {/* Quote box */}
                <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 p-4 sm:p-5 md:p-6 relative overflow-hidden">
                  <BotanicalDecoration 
                    variant="flower" 
                    className="absolute top-2 right-2 w-10 h-10 sm:w-12 sm:h-12 text-primary/10" 
                  />
                  <p className="font-lora text-sm sm:text-base md:text-lg italic text-foreground mb-2 sm:mb-3 relative z-10">
                    {quote[language]}
                  </p>
                  <p className="font-caveat text-lg sm:text-xl text-primary relative z-10">
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
