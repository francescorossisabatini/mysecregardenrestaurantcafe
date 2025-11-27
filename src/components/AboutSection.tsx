import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Card } from "@/components/ui/card";
import { Leaf, Heart, Droplets } from "lucide-react";
import { BotanicalDecoration } from "./BotanicalDecoration";
import { SpiritualAnimations } from "./SpiritualAnimations";
import gardenImg from "@/assets/garden-real.jpg";
import gardenReal from "@/assets/garden-real.jpg";
import entranceGarden from "@/assets/entrance-garden.jpg";
import sriChinmoyImg from "@/assets/sri-chinmoy.jpg";

export const AboutSection = () => {
  const { language } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);

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
    <section 
      ref={ref as any}
      id="about" 
      className={`relative overflow-hidden py-20 md:py-28 transition-all duration-[2000ms] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        backgroundImage: `url(${entranceGarden})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      }}
    >
      {/* Overlay - lighter to see images better */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/85 via-background/80 to-background/85" />
      
      {/* Spiritual animations */}
      <SpiritualAnimations variant="butterfly" />
      
      <div className="container mx-auto max-w-7xl px-4 relative z-10">
        {/* Title */}
        <div className={`text-center mb-12 md:mb-20 transition-all duration-[1800ms] ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          <BotanicalDecoration 
            variant="vine" 
            className="w-48 sm:w-56 md:w-64 h-6 sm:h-7 md:h-8 mx-auto mb-4 md:mb-6 text-primary/20" 
          />
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-caveat font-bold text-primary leading-tight">
            {language === "de" ? "Über uns" : "About us"}
          </h2>
        </div>

        {/* About the Restaurant - Side by side layout */}
        <div className={`grid md:grid-cols-2 gap-8 md:gap-12 mb-16 md:mb-24 items-center transition-all duration-[1800ms] delay-200 ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          {/* Image */}
          <div className="order-2 md:order-1">
            <Card className="overflow-hidden shadow-elevated border-2 border-primary/20">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={gardenImg}
                  alt="Secret Garden Restaurant Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="order-1 md:order-2">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-caveat font-bold text-primary mb-5 md:mb-7 leading-tight">
              {language === "de" ? "Unser Restaurant" : "Our Restaurant"}
            </h3>
            <p className="font-lora text-base sm:text-lg md:text-xl leading-relaxed text-foreground mb-8">
              {aboutRestaurant[language]}
            </p>

            {/* Values */}
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-3 bg-card/50 p-3 rounded-lg border border-border">
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
        </div>

        {/* Our Inspiration: Sri Chinmoy - Card layout */}
        <Card className={`bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20 p-8 sm:p-10 md:p-16 shadow-elevated relative overflow-hidden transition-all duration-[1800ms] delay-400 ${
          isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-4 blur-sm'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}>
          <BotanicalDecoration 
            variant="flower" 
            className="absolute top-4 right-4 w-20 h-20 text-primary/10" 
          />

          <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-caveat font-bold text-primary mb-8 sm:mb-10 text-center leading-tight">
            {language === "de" ? "Unsere Inspiration: Sri Chinmoy" : "Our Inspiration: Sri Chinmoy"}
          </h3>

          <div className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[220px_1fr] gap-8 sm:gap-10 items-start">
            {/* Sri Chinmoy portrait */}
            <div className="mx-auto md:mx-0">
              <Card className="overflow-hidden border-2 border-primary/30 shadow-lg">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={sriChinmoyImg}
                    alt="Sri Chinmoy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
              <p className="text-center mt-3 text-sm font-lora text-muted-foreground italic">
                Sri Chinmoy<br />
                1931-2007
              </p>
            </div>

            {/* Inspiration text and quote */}
            <div>
              <p className="font-lora text-base sm:text-lg md:text-xl leading-relaxed text-foreground mb-8">
                {aboutInspiration[language]}
              </p>

              {/* Quote box */}
              <Card className="bg-card border-2 border-primary/20 p-6 sm:p-8 relative overflow-hidden">
                <BotanicalDecoration 
                  variant="flower" 
                  className="absolute top-2 right-2 w-12 h-12 text-primary/10" 
                />
                <p className="font-lora text-lg sm:text-xl md:text-2xl italic text-foreground mb-4 relative z-10 leading-relaxed">
                  {quote[language]}
                </p>
                <p className="font-caveat text-2xl sm:text-3xl text-primary relative z-10">
                  – Sri Chinmoy
                </p>
              </Card>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
