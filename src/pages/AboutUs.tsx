import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { Button } from "@/components/ui/button";
import { Phone, MapPin, Leaf, Heart, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE } from "@/config/site";
import entranceGarden from "@/assets/entrance-garden.jpg";
import diningScene from "@/assets/dining-scene.jpg";

const AboutUs = () => {
  const { language } = useLanguage();

  const content = {
    de: {
      // Hero
      heroTitle: "Unsere Geschichte",
      heroTagline: "Ein Ort der Ruhe mitten in Wien.",
      
      // Philosophy
      philosophyLabel: "Unsere Philosophie",
      philosophyTitle: "Unser Ansatz",
      philosophyPara1: "Im Jahr 2001 entstand My Secret Garden als ein Traum: ein Ort, wo achtsames Kochen und friedliche Atmosphäre zusammenkommen.",
      philosophyQuote: "Kochen ist Gebet. Essen ist Dankbarkeit.",
      philosophyPara2: "Wir kochen täglich frisch mit biologischen und regionalen Zutaten. Ohne Eile, mit Aufmerksamkeit und Freude.",
      
      // Pillars
      pillarsTitle: "Was uns ausmacht",
      pillar1Title: "Vegetarisch & Vegan",
      pillar1Desc: "Nährende Gerichte aus frischen, pflanzlichen Zutaten – täglich mit Liebe zubereitet.",
      pillar2Title: "Bio & Regional",
      pillar2Desc: "Zutaten aus biologischem Anbau und von lokalen Produzenten aus der Region.",
      pillar3Title: "Achtsam & Alkoholfrei",
      pillar3Desc: "Ein Ort der Ruhe ohne Alkohol – zum Genießen, Entspannen und Auftanken.",
      
      // Space
      spaceLabel: "Unser Garten",
      spaceTitle: "Im Herzen von Wien",
      spacePara1: "Versteckt im Raimundhof an der Mariahilferstraße – ein ruhiger Innenhof abseits vom Trubel.",
      spacePara2: "Hier vergisst man die Stadt. Grüne Pflanzen, Holztische, sanfte Musik. Ein Ort zum Durchatmen.",
      socialHandle: "@mysecretgarden_vienna",
      
      // CTA
      ctaTitle: "Besuche uns",
      ctaButton1: "Jetzt anrufen",
      ctaButton2: "Route anzeigen",
    },
    en: {
      // Hero
      heroTitle: "Our Story",
      heroTagline: "A place of peace in the heart of Vienna.",
      
      // Philosophy
      philosophyLabel: "Our Philosophy",
      philosophyTitle: "Our Approach",
      philosophyPara1: "In 2001, My Secret Garden was born from a dream: a place where mindful cooking and peaceful atmosphere come together.",
      philosophyQuote: "Cooking is prayer. Eating is gratitude.",
      philosophyPara2: "We cook fresh daily with organic and regional ingredients. Without haste, with attention and joy.",
      
      // Pillars
      pillarsTitle: "What Makes Us Special",
      pillar1Title: "Vegetarian & Vegan",
      pillar1Desc: "Nourishing dishes from fresh, plant-based ingredients – prepared with love every day.",
      pillar2Title: "Organic & Local",
      pillar2Desc: "Ingredients from organic farming and local producers from the region.",
      pillar3Title: "Mindful & Alcohol-Free",
      pillar3Desc: "A place of calm without alcohol – to enjoy, relax, and recharge.",
      
      // Space
      spaceLabel: "Our Garden",
      spaceTitle: "In the Heart of Vienna",
      spacePara1: "Hidden in the Raimundhof on Mariahilferstraße – a quiet courtyard away from the bustle.",
      spacePara2: "Here you forget the city. Green plants, wooden tables, soft music. A place to breathe.",
      socialHandle: "@mysecretgarden_vienna",
      
      // CTA
      ctaTitle: "Visit Us",
      ctaButton1: "Call Now",
      ctaButton2: "Get Directions",
    },
  };

  const t = content[language];

  const pillars = [
    { icon: Leaf, title: t.pillar1Title, desc: t.pillar1Desc },
    { icon: Heart, title: t.pillar2Title, desc: t.pillar2Desc },
    { icon: Sparkles, title: t.pillar3Title, desc: t.pillar3Desc },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Spacer for fixed navigation */}
      <div className="h-20" />

      {/* HERO */}
      <section className="py-20 md:py-32 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-caveat text-5xl md:text-7xl lg:text-8xl text-primary mb-6">
            {t.heroTitle}
          </h1>
          <p className="font-lora text-xl md:text-2xl text-foreground/80 max-w-xl mx-auto">
            {t.heroTagline}
          </p>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image - Left */}
            <div className="order-2 md:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={entranceGarden} 
                  alt="Garden entrance"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Text - Right */}
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-sm font-work uppercase tracking-widest text-accent">
                {t.philosophyLabel}
              </span>
              <h2 className="font-caveat text-4xl md:text-5xl text-primary">
                {t.philosophyTitle}
              </h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {t.philosophyPara1}
              </p>
              <blockquote className="font-lora text-xl md:text-2xl italic text-primary/90 border-l-4 border-accent pl-6 py-2">
                "{t.philosophyQuote}"
              </blockquote>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {t.philosophyPara2}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-caveat text-4xl md:text-5xl text-primary text-center mb-16">
            {t.pillarsTitle}
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <pillar.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="font-lora text-foreground/75 leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACE */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text - Left */}
            <div className="space-y-6">
              <span className="text-sm font-work uppercase tracking-widest text-accent">
                {t.spaceLabel}
              </span>
              <h2 className="font-caveat text-4xl md:text-5xl text-primary">
                {t.spaceTitle}
              </h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {t.spacePara1}
              </p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {t.spacePara2}
              </p>
              <a 
                href="https://instagram.com/mysecretgarden_vienna" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block font-work text-accent hover:text-accent/80 transition-colors"
              >
                {t.socialHandle}
              </a>
            </div>
            
            {/* Image - Right */}
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={diningScene} 
                  alt="Dining scene"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="py-20 md:py-28 bg-primary/5">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="font-caveat text-4xl md:text-5xl text-primary mb-6">
            {t.ctaTitle}
          </h2>
          <p className="font-lora text-lg text-foreground/80 mb-10">
            {SITE.addressShort}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-work"
              onClick={() => (window.location.href = `tel:${SITE.phoneTel}`)}
            >
              <Phone className="w-5 h-5 mr-2" />
              {t.ctaButton1}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="font-work"
              asChild
            >
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="w-5 h-5 mr-2" />
                {t.ctaButton2}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
      
      <MobileStickyBar />
    </div>
  );
};

export default AboutUs;
