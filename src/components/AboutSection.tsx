import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Heart, Droplets } from "lucide-react";
import entranceGarden from "@/assets/entrance-garden.webp";

export const AboutSection = () => {
  const { language } = useLanguage();
  const { ref, isVisible } = useScrollReveal(0.1);

  const aboutRestaurant = {
    de: "My Secret Garden ist ein friedliches vegetarisches & veganes Restaurant im Raimundhof in Wien. Wir bieten eine entspannte Atmosphäre in einem ruhigen Innenhof-Garten und bereiten täglich frische, hausgemachte Gerichte mit natürlichen und biologischen Zutaten zu. Unsere Küche vereint einfache, nährende Speisen, die Körper und Geist stärken.",
    en: "My Secret Garden is a peaceful vegetarian & vegan restaurant inside Vienna's Raimundhof. We offer a relaxed atmosphere in a quiet courtyard garden and prepare fresh, homemade dishes daily with natural and organic ingredients. Our cuisine combines simple, nourishing meals that strengthen body and mind."
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
      className={`py-32 md:py-40 transition-all duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary">
            {language === "de" ? "Über uns" : "About us"}
          </h2>
        </div>

        {/* Grid Layout - Clean and Open */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-32">
          {/* Content */}
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-6">
                {language === "de" ? "Unser Restaurant" : "Our Restaurant"}
              </h3>
              <p className="font-lora text-xl leading-relaxed text-foreground/90">
                {aboutRestaurant[language]}
              </p>
            </div>

            {/* Values - Simple list */}
            <div className="space-y-5">
              {values.map((value, index) => (
                <div key={index} className="flex items-center gap-4">
                  <value.icon className="w-7 h-7 text-accent flex-shrink-0" />
                  <span className="font-lora text-xl text-foreground/90">
                    {value.title[language]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={entranceGarden}
                alt="Secret Garden Restaurant Entrance"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
