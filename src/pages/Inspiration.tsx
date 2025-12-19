import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useState, useRef } from "react";
import sriChinmoyImage from "@/assets/sri-chinmoy.jpg";
import sriChinmoyBirds from "@/assets/sri-chinmoy-birds.jpg";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";
import sriChinmoyWaves from "@/assets/sri-chinmoy-waves.jpg";
import sriChinmoyAbstract from "@/assets/sri-chinmoy-abstract.jpg";

const poems = [
  {
    en: "World peace can be achieved\nWhen the power of love\nReplaces the love of power.",
    de: "Weltfrieden kann erreicht werden,\nwenn die Kraft der Liebe\ndie Liebe zur Macht ersetzt."
  },
  {
    en: "Try not to change the world.\nYou will fail.\nTry to love the world.\nLo, the world is changed\nForever.",
    de: "Versuche nicht, die Welt zu ändern.\nDu wirst scheitern.\nVersuche, die Welt zu lieben.\nSiehe, die Welt ist verändert\nFür immer."
  },
  {
    en: "If you have inner peace,\nNobody can force you to be\nA slave to the outer reality.",
    de: "Wenn du inneren Frieden hast,\nkann dich niemand zwingen,\nein Sklave der äußeren Realität zu sein."
  },
  {
    en: "I did not come into the world\nTo prove anything.\nI came into the world\nTo love everyone\nAnd everything.",
    de: "Ich bin nicht auf die Welt gekommen,\num etwas zu beweisen.\nIch bin gekommen,\num jeden und alles zu lieben."
  },
  {
    en: "Your heart must become\nA sea of love.\nYour mind must become\nA river of detachment.",
    de: "Dein Herz muss werden\nein Meer der Liebe.\nDein Geist muss werden\nein Fluss der Losgelöstheit."
  },
  {
    en: "In the outer life\nSimplicity is beautiful.\nIn the inner life\nSimplicity is invincible.",
    de: "Im äußeren Leben\nist Einfachheit schön.\nIm inneren Leben\nist Einfachheit unbesiegbar."
  },
  {
    en: "Death is the road.\nLife is the traveller.\nThe soul is the guide.",
    de: "Der Tod ist die Straße.\nDas Leben ist der Reisende.\nDie Seele ist der Führer."
  },
  {
    en: "Love is not a thing to understand.\nLove is a thing only to become\nAnd eternally be.",
    de: "Liebe ist nichts, das man verstehen kann.\nLiebe ist etwas, das man werden\nund ewig sein muss."
  },
  {
    en: "To be rich\nIs to give a smile\nWith no expectation of return.",
    de: "Reich zu sein\nbedeutet, ein Lächeln zu schenken\nohne Erwartung einer Gegenleistung."
  },
  {
    en: "No, it is not possible\nFor any inner cry\nTo remain unheard.",
    de: "Nein, es ist nicht möglich,\ndass ein innerer Ruf\nunerhört bleibt."
  },
  {
    en: "Begin.\nTo arrive at the destination,\nThere is only one way:\nBegin.",
    de: "Beginne.\nUm das Ziel zu erreichen,\ngibt es nur einen Weg:\nBeginne."
  },
  {
    en: "All that you need\nIs definitely within you.",
    de: "Alles, was du brauchst,\nist bereits in dir."
  },
  {
    en: "Love is something\nThat never cared to learn\nHow to judge anybody.",
    de: "Liebe ist etwas,\ndas nie gelernt hat,\njemanden zu beurteilen."
  },
  {
    en: "Enrich the lives of others.\nLo, your heart has become\nInfinitely rich.",
    de: "Bereichere das Leben anderer.\nSiehe, dein Herz ist\nunendlich reich geworden."
  },
  {
    en: "Meditation means\nConversation with silence.",
    de: "Meditation bedeutet\nGespräch mit der Stille."
  },
  {
    en: "Truth does not force us.\nTruth does not beg us.\nTruth just inspires us.",
    de: "Die Wahrheit zwingt uns nicht.\nDie Wahrheit bittet uns nicht.\nDie Wahrheit inspiriert uns einfach."
  },
  {
    en: "The beauty of self-giving\nEventually grows into\nThe fragrance of God-becoming.",
    de: "Die Schönheit des Sich-Hingebens\nwächst schließlich\nzum Duft des Gott-Werdens."
  },
  {
    en: "A happy life\nIs the clear indication\nOf a tamed mind\nAnd disciplined thoughts.",
    de: "Ein glückliches Leben\nist das klare Zeichen\neines gezähmten Geistes\nund disziplinierter Gedanken."
  }
];

const artworks = [
  { src: sriChinmoyBirds, alt: "Soul-Birds", title: "Soul-Birds" },
  { src: sriChinmoyFlowers, alt: "Flowers", title: "Blumen" },
  { src: sriChinmoyWaves, alt: "Waves", title: "Wellen" },
  { src: sriChinmoyAbstract, alt: "Abstract", title: "Abstrakt" },
];

const Inspiration = () => {
  const { language } = useLanguage();
  const [currentPoem, setCurrentPoem] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextPoem = () => {
    setCurrentPoem((prev) => (prev + 1) % poems.length);
  };

  const prevPoem = () => {
    setCurrentPoem((prev) => (prev - 1 + poems.length) % poems.length);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero - Evocative Title */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-caveat font-bold text-primary mb-6">
              {language === "de" ? "Unsere Inspiration" : "Our Inspiration"}
            </h1>
            <p className="font-lora text-lg md:text-xl text-foreground/60 italic">
              {language === "de" 
                ? "Die Quelle, aus der alles fließt" 
                : "The source from which everything flows"}
            </p>
          </div>
        </div>
      </div>

      {/* Portrait with artistic frame */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src={sriChinmoyImage} 
                  alt="Sri Chinmoy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-background px-6 py-2 rounded-full shadow-lg">
                <p className="font-caveat text-xl text-primary">1931 – 2007</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Block 1 - Origins */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-caveat text-3xl md:text-4xl text-accent text-center mb-8">
              {language === "de" ? "Der Weg eines Meisters" : "The Path of a Master"}
            </h2>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Sri Chinmoy wurde 1931 in Ostbengalen geboren, im heutigen Bangladesch. Mit zwölf Jahren kam er in den Sri Aurobindo Ashram, wo er zwanzig Jahre lang in tiefer Meditation lebte." 
                : "Sri Chinmoy was born in 1931 in East Bengal, now Bangladesh. At twelve, he entered the Sri Aurobindo Ashram, where he lived in deep meditation for twenty years."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "1964 folgte er einem inneren Ruf und reiste nach New York. Dort begann er, Menschen auf dem Weg des Herzens zu begleiten – durch Meditation, Musik, Kunst und Dienen." 
                : "In 1964, following an inner call, he traveled to New York. There he began guiding people on the path of the heart – through meditation, music, art, and service."}
            </p>
          </div>
        </div>
      </section>

      {/* Jharna-Kala Art Gallery */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 mb-4">
          <p className="font-caveat text-xl md:text-2xl text-accent text-center">
            {language === "de" ? "Jharna-Kala – Kunst aus der Quelle" : "Jharna-Kala – Art from the Source"}
          </p>
        </div>
        
        {/* Mobile: scrollable with affordance, Desktop: static row */}
        <div className="relative">
          {/* Mobile scroll hint gradient */}
          <div className="md:hidden absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div className="flex gap-4 md:gap-6 px-4 md:px-8 overflow-x-auto md:overflow-visible scrollbar-hide snap-x snap-mandatory md:snap-none pb-4 md:pb-0 -mx-4 md:mx-0 pl-4 md:pl-8">
            {artworks.map((art, index) => (
              <div 
                key={index}
                className="flex-shrink-0 w-56 md:w-72 snap-center md:snap-align-none"
              >
                <div className="aspect-square rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={art.src} 
                    alt={art.alt} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                  />
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile scroll indicator dots */}
          <div className="md:hidden flex justify-center gap-1.5 mt-4">
            {artworks.map((_, index) => (
              <div key={index} className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            ))}
          </div>
        </div>
      </section>

      {/* Central Quote */}
      <section className="py-20 md:py-32 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-caveat text-3xl md:text-5xl text-primary leading-relaxed">
              {language === "de" ? (
                <>
                  „Kochen ist Gebet.<br />
                  Essen ist Dankbarkeit."
                </>
              ) : (
                <>
                  "Cooking is prayer.<br />
                  Eating is gratitude."
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Story Block 2 - Legacy */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-caveat text-3xl md:text-4xl text-accent text-center mb-8">
              {language === "de" ? "Ein Erbe der Stille" : "A Legacy of Stillness"}
            </h2>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Sri Chinmoy leitete 37 Jahre lang Friedensmeditationen bei den Vereinten Nationen. Er gründete den World Harmony Run, den größten Friedenslauf der Welt, der durch über 150 Länder führt." 
                : "Sri Chinmoy led peace meditations at the United Nations for 37 years. He founded the World Harmony Run, the largest peace run in the world, passing through over 150 countries."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Er komponierte über 22.000 Lieder, schrieb mehr als 120.000 Gedichte und schuf Millionen von Kunstwerken – alles als Ausdruck der inneren Stille." 
                : "He composed over 22,000 songs, wrote more than 120,000 poems, and created millions of artworks – all as expressions of inner stillness."}
            </p>
          </div>
        </div>
      </section>

      {/* Poem Carousel */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-muted/10 to-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="font-caveat text-3xl md:text-4xl text-accent text-center mb-12">
            {language === "de" ? "Seine Worte" : "His Words"}
          </h2>
          
          {/* Mobile: horizontal scroll, Desktop: single card with arrows */}
          <div className="md:hidden relative">
            {/* Scroll hint gradient */}
            <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4">
              {poems.map((poem, index) => (
                <div 
                  key={index}
                  className="flex-shrink-0 w-[85vw] snap-center"
                >
                  <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg min-h-[180px] flex items-center justify-center">
                    <p className="font-lora text-base text-foreground/90 text-center whitespace-pre-line leading-relaxed italic">
                      "{language === "de" ? poem.de : poem.en}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Mobile scroll indicator */}
            <p className="text-center text-xs text-foreground/40 mt-2">
              {language === "de" ? "← Wischen zum Blättern →" : "← Swipe to browse →"}
            </p>
          </div>
          
          {/* Desktop: single card with arrows */}
          <div className="hidden md:block max-w-2xl mx-auto relative">
            <div 
              ref={carouselRef}
              className="bg-background/80 backdrop-blur-sm rounded-3xl p-12 shadow-lg min-h-[200px] flex items-center justify-center transition-opacity duration-300"
            >
              <p className="font-lora text-xl text-foreground/90 text-center whitespace-pre-line leading-relaxed italic">
                "{language === "de" ? poems[currentPoem].de : poems[currentPoem].en}"
              </p>
            </div>
            
            {/* Navigation arrows - desktop only */}
            <button 
              onClick={prevPoem}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 w-12 h-12 rounded-full bg-background shadow-lg flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
              aria-label="Previous poem"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextPoem}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 w-12 h-12 rounded-full bg-background shadow-lg flex items-center justify-center text-foreground/60 hover:text-primary transition-colors"
              aria-label="Next poem"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            {/* Dots indicator - desktop */}
            <div className="flex justify-center gap-2 mt-6">
              {poems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPoem(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentPoem 
                      ? "bg-primary w-6" 
                      : "bg-foreground/20 hover:bg-foreground/40"
                  }`}
                  aria-label={`Go to poem ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Story Block 3 - Restaurants */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-caveat text-3xl md:text-4xl text-accent text-center mb-8">
              {language === "de" ? "Orte der Begegnung" : "Places of Encounter"}
            </h2>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Seine Schüler gründeten auf der ganzen Welt Restaurants und Cafés – Orte, an denen das Kochen und Servieren als meditative Praxis verstanden wird." 
                : "His students founded restaurants and cafés around the world – places where cooking and serving are understood as meditative practice."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Von New York bis Zürich, von Melbourne bis Wien: überall entstanden Räume, in denen Einfachheit, Sorgfalt und Stille die Küche prägen." 
                : "From New York to Zurich, from Melbourne to Vienna: spaces emerged where simplicity, care, and stillness shape the kitchen."}
            </p>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "My Secret Garden in Salzburg ist Teil dieser weltweiten Familie vegetarischer Restaurants, die Sri Chinmoys Geist der Hingabe weitertragen." 
                : "My Secret Garden in Salzburg is part of this worldwide family of vegetarian restaurants that carry forward Sri Chinmoy's spirit of devotion."}
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <h2 className="font-caveat text-3xl md:text-4xl text-accent mb-8">
              {language === "de" ? "Die Philosophie" : "The Philosophy"}
            </h2>
            <p className="font-lora text-lg md:text-xl text-foreground/80 leading-relaxed">
              {language === "de" 
                ? "Der Weg des Herzens lehrt, dass Selbst-Transzendenz – das stete Übertreffen der eigenen Grenzen – zu wahrer Freude führt. Nicht Perfektion, sondern der aufrichtige Versuch zählt." 
                : "The Path of the Heart teaches that self-transcendence – constantly surpassing one's own limits – leads to true joy. Not perfection, but sincere effort is what matters."}
            </p>
            <p className="font-caveat text-2xl md:text-3xl text-primary">
              {language === "de" 
                ? "Jede Handlung kann Meditation werden, wenn sie mit Herz getan wird." 
                : "Every action can become meditation when done with heart."}
            </p>
          </div>
        </div>
      </section>

      {/* Connection to our kitchen */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-lora text-lg md:text-xl text-foreground/70 leading-relaxed">
              {language === "de" 
                ? "Diese Haltung prägt unsere Küche. Einfachheit, Sorgfalt und Stille begleiten, wie wir kochen und wie wir servieren." 
                : "This attitude shapes our kitchen. Simplicity, care and stillness guide how we cook and how we serve."}
            </p>
          </div>
        </div>
      </section>

      {/* Links */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-4">
            <p className="font-lora text-base text-foreground/50 mb-6">
              {language === "de" ? "Mehr entdecken" : "Discover more"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <a 
                href="https://www.srichinmoy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-lora text-base text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                srichinmoy.org
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://www.srichinmoycentre.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-lora text-base text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                Sri Chinmoy Centre
                <ExternalLink className="w-4 h-4" />
              </a>
              <a 
                href="https://www.srichinmoypoetry.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-lora text-base text-muted-foreground hover:text-accent transition-colors duration-300"
              >
                {language === "de" ? "Gedichte" : "Poetry"}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Inspiration;
