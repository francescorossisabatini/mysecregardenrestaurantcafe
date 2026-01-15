import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, Leaf, Heart, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import entranceGarden from "@/assets/entrance-garden.jpg";
import gardenReal from "@/assets/garden-real.jpg";
import sriChinmoyImage from "@/assets/sri-chinmoy-portrait.jpg";
import sriChinmoyBirds from "@/assets/sri-chinmoy-birds.jpg";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";
import sriChinmoyWaves from "@/assets/sri-chinmoy-waves.jpg";
import sriChinmoyAbstract from "@/assets/sri-chinmoy-abstract.jpg";

const poems = [
  { en: "World peace can be achieved\nWhen the power of love\nReplaces the love of power.", de: "Weltfrieden kann erreicht werden,\nwenn die Kraft der Liebe\ndie Liebe zur Macht ersetzt." },
  { en: "Try not to change the world.\nYou will fail.\nTry to love the world.\nLo, the world is changed\nForever.", de: "Versuche nicht, die Welt zu ändern.\nDu wirst scheitern.\nVersuche, die Welt zu lieben.\nSiehe, die Welt ist verändert\nFür immer." },
  { en: "If you have inner peace,\nNobody can force you to be\nA slave to the outer reality.", de: "Wenn du inneren Frieden hast,\nkann dich niemand zwingen,\nein Sklave der äußeren Realität zu sein." },
  { en: "Meditation means\nConversation with silence.", de: "Meditation bedeutet\nGespräch mit der Stille." },
  { en: "To be rich\nIs to give a smile\nWith no expectation of return.", de: "Reich zu sein\nbedeutet, ein Lächeln zu schenken\nohne Erwartung einer Gegenleistung." },
];

const artworks = [
  { src: sriChinmoyBirds, alt: "Soul-Birds" },
  { src: sriChinmoyFlowers, alt: "Flowers" },
  { src: sriChinmoyWaves, alt: "Waves" },
  { src: sriChinmoyAbstract, alt: "Abstract" },
];

const AboutUs = () => {
  const { language } = useLanguage();
  const [currentPoem, setCurrentPoem] = useState(0);

  const nextPoem = () => setCurrentPoem((prev) => (prev + 1) % poems.length);
  const prevPoem = () => setCurrentPoem((prev) => (prev - 1 + poems.length) % poems.length);

  const content = {
    de: {
      heroTitle: "Unsere Geschichte",
      heroTagline: "Ein Ort der Ruhe mitten in Wien.",
      philosophyLabel: "Unsere Philosophie",
      philosophyTitle: "Unser Ansatz",
      philosophyPara1: "Im Jahr 2018 entstand My Secret Garden als ein Traum: ein Ort, wo achtsames Kochen und friedliche Atmosphäre zusammenkommen.",
      philosophyQuote: "Kochen ist Gebet. Essen ist Dankbarkeit.",
      philosophyPara2: "Wir kochen täglich frisch mit biologischen und regionalen Zutaten. Ohne Eile, mit Aufmerksamkeit und Freude.",
      pillarsTitle: "Was uns ausmacht",
      pillar1Title: "Vegetarisch, Vegan & Glutenfrei",
      pillar1Desc: "Nährende Gerichte aus frischen, pflanzlichen Zutaten – täglich mit Liebe zubereitet. Viele glutenfreie Optionen.",
      pillar2Title: "Bio & Österreichisch",
      pillar2Desc: "Zutaten aus biologischem Anbau und von österreichischen Produzenten aus der Region.",
      pillar3Title: "Achtsam & Alkoholfrei",
      pillar3Desc: "Ein Ort der Ruhe ohne Alkohol – zum Genießen, Entspannen und Auftanken.",
      spaceLabel: "Unser Garten",
      spaceTitle: "Im Herzen von Wien",
      spacePara1: "Versteckt im Raimundhof an der Mariahilferstraße – ein ruhiger Innenhof abseits vom Trubel.",
      spacePara2: "Hier vergisst man die Stadt. Grüne Pflanzen, Holztische, sanfte Musik. Ein Ort zum Durchatmen.",
      inspirationLabel: "Unsere Inspiration",
      inspirationTitle: "Sri Chinmoy",
      inspirationPara1: "Sri Chinmoy (1931–2007) war ein spiritueller Lehrer, der Meditation, Musik und Kunst als Wege zum inneren Frieden lehrte.",
      inspirationPara2: "Seine Schüler gründeten weltweit vegetarische Restaurants – Orte, wo Kochen und Servieren als meditative Praxis verstanden werden.",
      artTitle: "Jharna-Kala",
      artSubtitle: "Kunst aus der Quelle",
      poemTitle: "Seine Worte",
      poemHint: "Mit jedem Kaffee erhältst du eine Karte mit einem seiner Gedichte.",
    },
    en: {
      heroTitle: "Our Story",
      heroTagline: "A place of peace in the heart of Vienna.",
      philosophyLabel: "Our Philosophy",
      philosophyTitle: "Our Approach",
      philosophyPara1: "In 2018, My Secret Garden was born from a dream: a place where mindful cooking and peaceful atmosphere come together.",
      philosophyQuote: "Cooking is prayer. Eating is gratitude.",
      philosophyPara2: "We cook fresh daily with organic and regional ingredients. Without haste, with attention and joy.",
      pillarsTitle: "What Makes Us Special",
      pillar1Title: "Vegetarian, Vegan & Gluten-Free",
      pillar1Desc: "Nourishing dishes from fresh, plant-based ingredients – prepared with love every day. Many gluten-free options.",
      pillar2Title: "Organic & Austrian",
      pillar2Desc: "Ingredients from organic farming and Austrian producers from the region.",
      pillar3Title: "Mindful & Alcohol-Free",
      pillar3Desc: "A place of calm without alcohol – to enjoy, relax, and recharge.",
      spaceLabel: "Our Garden",
      spaceTitle: "In the Heart of Vienna",
      spacePara1: "Hidden in the Raimundhof on Mariahilferstraße – a quiet courtyard away from the bustle.",
      spacePara2: "Here you forget the city. Green plants, wooden tables, soft music. A place to breathe.",
      inspirationLabel: "Our Inspiration",
      inspirationTitle: "Sri Chinmoy",
      inspirationPara1: "Sri Chinmoy (1931–2007) was a spiritual teacher who taught meditation, music, and art as paths to inner peace.",
      inspirationPara2: "His students founded vegetarian restaurants worldwide – places where cooking and serving are understood as meditative practice.",
      artTitle: "Jharna-Kala",
      artSubtitle: "Art from the Source",
      poemTitle: "His Words",
      poemHint: "With every coffee, you receive a card with one of his poems.",
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
      <SEOHead 
        title={language === "de" ? "Über Uns" : "About Us"}
        description={language === "de" 
          ? "Erfahre mehr über My Secret Garden – unser vegetarisches Restaurant inspiriert von Sri Chinmoys Philosophie in Wien."
          : "Learn more about My Secret Garden – our vegetarian restaurant inspired by Sri Chinmoy's philosophy in Vienna."}
        path="/about"
      />
      <Navigation />
      <div className="h-20" />

      {/* ABOUT HERO */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="font-caveat text-5xl md:text-7xl text-primary mb-4">
            {t.heroTitle}
          </h1>
          <p className="font-lora text-xl text-foreground/80 max-w-xl mx-auto">
            {t.heroTagline}
          </p>
        </div>
      </section>

      {/* PHILOSOPHY - Two column */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img src={entranceGarden} alt="Garden entrance" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">{t.philosophyLabel}</span>
              <h2 className="font-caveat text-4xl md:text-5xl text-primary">{t.philosophyTitle}</h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.philosophyPara1}</p>
              <blockquote className="font-lora text-xl md:text-2xl italic text-primary/90 border-l-4 border-accent pl-6 py-2">
                "{t.philosophyQuote}"
              </blockquote>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.philosophyPara2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS / OFFERING - 3 centered cards */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-caveat text-4xl md:text-5xl text-primary text-center mb-16">{t.pillarsTitle}</h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {pillars.map((pillar, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/20">
                  <pillar.icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="font-cormorant text-2xl font-semibold text-foreground">{pillar.title}</h3>
                <p className="font-lora text-foreground/75 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPACE - Two column reversed */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">{t.spaceLabel}</span>
              <h2 className="font-caveat text-4xl md:text-5xl text-primary">{t.spaceTitle}</h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.spacePara1}</p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.spacePara2}</p>
              <a 
                href="https://instagram.com/mysecretgarden_vienna" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block font-work text-accent hover:text-accent/80 transition-colors"
              >
                @mysecretgarden_vienna
              </a>
            </div>
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img src={gardenReal} alt="Our garden" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSPIRATION - Sri Chinmoy integrated section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
            {/* Portrait */}
            <div className="order-2 md:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl">
                  <img src={sriChinmoyImage} alt="Sri Chinmoy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-6 py-2 rounded-full shadow-lg">
                  <p className="font-caveat text-lg text-primary">1931 – 2007</p>
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">{t.inspirationLabel}</span>
              <h2 className="font-caveat text-4xl md:text-5xl text-primary">{t.inspirationTitle}</h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.inspirationPara1}</p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.inspirationPara2}</p>
              <a 
                href="https://www.srichinmoy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-work text-accent hover:text-accent/80 transition-colors"
              >
                srichinmoy.org
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Art Gallery - Jharna-Kala */}
          <div className="mb-16">
            <p className="font-caveat text-xl md:text-2xl text-accent text-center mb-6">
              {t.artTitle} – {t.artSubtitle}
            </p>
            <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 md:justify-center md:overflow-visible">
              {artworks.map((art, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-56 snap-center">
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                    <img src={art.src} alt={art.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poem Carousel */}
          <div className="max-w-2xl mx-auto">
            <h3 className="font-caveat text-2xl md:text-3xl text-accent text-center mb-8">{t.poemTitle}</h3>
            <div className="relative">
              <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg min-h-[160px] flex items-center justify-center">
                <p className="font-lora text-lg md:text-xl text-foreground/90 text-center whitespace-pre-line leading-relaxed italic">
                  "{poems[currentPoem][language]}"
                </p>
              </div>
              <button 
                onClick={prevPoem}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-10 h-10 rounded-full bg-background shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Previous poem"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextPoem}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-10 h-10 rounded-full bg-background shadow-lg flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                aria-label="Next poem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-sm text-foreground/50 mt-6 font-lora italic">{t.poemHint}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <CTAEndBlock show={["call", "directions", "weekly"]} />

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default AboutUs;
