import { useLanguage } from "@/contexts/LanguageContext";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Leaf, Heart, Droplets, Users, Coffee, Utensils } from "lucide-react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import entranceGarden from "@/assets/entrance-garden.jpg";
import interiorReal from "@/assets/interior-real.jpg";
import gardenReal from "@/assets/garden-real.jpg";
import foodDetailReal from "@/assets/food-detail-real.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";
import { Link } from "react-router-dom";

const AboutUs = () => {
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
      description: { 
        de: "Biologische und regionale Produkte bilden das Fundament unserer Küche.", 
        en: "Organic and regional products form the foundation of our cuisine." 
      }
    },
    {
      icon: Heart,
      title: { de: "Hausgemachtes Essen", en: "Homemade Food" },
      description: { 
        de: "Jedes Gericht wird täglich frisch und mit Sorgfalt zubereitet.", 
        en: "Every dish is prepared fresh daily with care." 
      }
    },
    {
      icon: Droplets,
      title: { de: "Alkoholfrei", en: "Alcohol-free" },
      description: { 
        de: "Ein Raum der Klarheit und Ruhe für alle Gäste.", 
        en: "A space of clarity and calm for all guests." 
      }
    },
    {
      icon: Users,
      title: { de: "Gemeinschaft", en: "Community" },
      description: { 
        de: "Ein Ort der Begegnung und des Austauschs.", 
        en: "A place for gathering and connection." 
      }
    },
    {
      icon: Coffee,
      title: { de: "Natürliche Gewürze", en: "Natural Spices" },
      description: { 
        de: "Sorgfältig ausgewählte Gewürze aus aller Welt.", 
        en: "Carefully selected spices from around the world." 
      }
    },
    {
      icon: Utensils,
      title: { de: "Glutenfreie Optionen", en: "Gluten-free Options" },
      description: { 
        de: "Viele unserer Gerichte sind glutenfrei verfügbar.", 
        en: "Many of our dishes are available gluten-free." 
      }
    },
  ];

  const storySlides = [
    {
      image: gardenReal,
      title: { de: "Ein Garten der Stille", en: "A Garden of Stillness" },
      text: { 
        de: "Versteckt im Herzen Wiens, fernab vom Lärm der Mariahilferstraße, öffnet sich ein geheimer Innenhof. Hier beginnt die Reise.", 
        en: "Hidden in the heart of Vienna, away from the bustle of Mariahilferstraße, a secret courtyard opens up. Here begins the journey." 
      }
    },
    {
      image: interiorReal,
      title: { de: "Wo die Seele atmet", en: "Where the Soul Breathes" },
      text: { 
        de: "Jeder Raum erzählt eine Geschichte von Ruhe und Hingabe. Kunst an den Wänden, Pflanzen in jeder Ecke, Frieden in der Luft.", 
        en: "Every space tells a story of calm and devotion. Art on the walls, plants in every corner, peace in the air." 
      }
    },
    {
      image: foodDetailReal,
      title: { de: "Mit Liebe zubereitet", en: "Prepared with Love" },
      text: { 
        de: "Jedes Gericht ist ein Gedicht. Frische Bio-Zutaten, jahrhundertealte Rezepte und die unsichtbare Zutat: Liebe.", 
        en: "Every dish is a poem. Fresh organic ingredients, age-old recipes, and the invisible ingredient: love." 
      }
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Header */}
      <div className="pt-24 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-caveat font-bold text-primary mb-8">
              {language === "de" ? "Über uns" : "About us"}
            </h1>
            <p className="font-lora text-xl md:text-2xl text-foreground/80 leading-relaxed">
              {aboutRestaurant[language]}
            </p>
          </div>
        </div>
      </div>

      {/* Main Image */}
      <div className="container mx-auto px-4 mb-20">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-xl">
            <img
              src={entranceGarden}
              alt="Secret Garden Restaurant Entrance"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section 
        ref={ref as any}
        className={`py-20 bg-muted/30 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-12 text-center">
              {language === "de" ? "Unsere Werte" : "Our Values"}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center p-6">
                  <value.icon className="w-10 h-10 text-accent mx-auto mb-4" />
                  <h3 className="font-lora text-xl font-semibold text-foreground mb-2">
                    {value.title[language]}
                  </h3>
                  <p className="text-muted-foreground text-base">
                    {value.description[language]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-24">
            {storySlides.map((slide, index) => (
              <div 
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                    <img
                      src={slide.image}
                      alt={slide.title[language]}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:col-start-1 md:text-right' : ''}`}>
                  <h3 className="text-2xl md:text-3xl font-caveat font-bold text-primary">
                    {slide.title[language]}
                  </h3>
                  <p className="font-lora text-lg text-foreground/80 leading-relaxed">
                    {slide.text[language]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-caveat font-bold text-primary">
                  {language === "de" ? "Unsere Produkte" : "Our Products"}
                </h2>
                <p className="font-lora text-lg text-foreground/80 leading-relaxed">
                  {language === "de"
                    ? "Alle unsere Gerichte werden täglich frisch zubereitet. Wir verwenden biologische und natürliche Zutaten, die Ihrem Körper und Geist Kraft geben."
                    : "All our dishes are freshly prepared daily. We use organic and natural ingredients that give your body and mind strength."}
                </p>
                <ul className="space-y-3">
                  {[
                    { de: "Bio & regionale Zutaten", en: "Organic & regional ingredients" },
                    { de: "Hausgemachte Zubereitungen", en: "Homemade preparations" },
                    { de: "Natürliche Gewürze", en: "Natural spices" },
                    { de: "Glutenfreie Optionen", en: "Gluten-free options" }
                  ].map((point, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Leaf className="w-5 h-5 text-accent flex-shrink-0" />
                      <span className="font-lora text-foreground/80">{point[language]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={koreanBowl}
                  alt="Fresh Korean Bowl"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA to Inspiration */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-lora text-lg text-muted-foreground mb-4">
              {language === "de" 
                ? "Möchten Sie mehr über unsere Inspiration erfahren?" 
                : "Want to learn more about our inspiration?"}
            </p>
            <Link 
              to="/inspiration" 
              className="font-lora text-accent hover:text-primary transition-colors"
            >
              {language === "de" ? "Unsere Inspiration →" : "Our Inspiration →"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;