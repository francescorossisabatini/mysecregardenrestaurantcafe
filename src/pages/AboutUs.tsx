import { useState } from "react";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { SITE } from "@/config/site";
import entranceGarden from "@/assets/entrance-garden.webp";
import gardenReal from "@/assets/garden-real.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";
import alpenpolenta from "@/assets/alpenpolenta.jpg";
import interiorReal from "@/assets/interior-real.jpg";
import sriChinmoyImage from "@/assets/sri-chinmoy-portrait.jpg";
import sriChinmoyBirds from "@/assets/sri-chinmoy-birds.jpg";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";
import sriChinmoyWaves from "@/assets/sri-chinmoy-waves.jpg";
import sriChinmoyAbstract from "@/assets/sri-chinmoy-abstract.jpg";
import supermindLogo from "@/assets/supermind-logo-cropped.png";

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
      heroTagline: "Drinnen riecht es oft nach Kaffee, draußen wartet der Hof.",
      manifesto: "Ein kleiner Gartenhof, ein Teller warmes Essen, kurz Pause.",
      dietaryLine: "Vegetarisch und vegan. Viele Gerichte kochen wir ohne glutenhaltige Zutaten, aber nicht in einer zertifiziert glutenfreien Küche.",
      philosophyLabel: "Unsere Philosophie",
      philosophyTitle: "Unser Ansatz",
      philosophyPara1: "2018 haben wir My Secret Garden eröffnet. Nicht als großes Konzept auf Papier, eher als klare Idee: gutes vegetarisches Essen, ein ruhiger Hof und Menschen, die nicht durch den Mittag hetzen müssen.",
      philosophyQuote: "Kochen ist Gebet. Essen ist Dankbarkeit.",
      philosophyPara2: "Wir kochen jeden Tag frisch. Manchmal wird es mittags eng, manchmal ist der Hof ganz still. Beides gehört dazu.",
      pillarsTitle: "Was uns ausmacht",
      pillarsIntro: "Unsere Küche reist ein bisschen. Indien, Japan, Mittelmeer, Wien. Am Ende landet alles in unserer kleinen Küche im Raimundhof.",
      pillar1Title: "Weltküche",
      pillar1Desc: "Dal, Curry, Bowl, Polenta, Suppe. Nicht alles an einem Tag, aber genau diese Mischung mögen wir. Das Tagesmenü darf wechseln, sonst wird es langweilig.",
      pillar2Title: "Regionale Produkte",
      pillar2Desc: "Morgens kommen Gemüse, Salate und Getreide in die Küche. Was gut aussieht und zur Saison passt, findet oft noch am selben Tag auf die Karte.",
      pillar3Title: "Achtsam & Alkoholfrei",
      pillar3Desc: "Bei uns gibt es keinen Alkohol. Dafür Kaffee, Tee, hausgemachte Kuchen und viele Gerichte ohne glutenhaltige Zutaten. Wenn du Zöliakie hast, sag bitte vorher Bescheid.",
      coffeeLabel: "Unser Kaffee",
      coffeeTitle: "Supermind Kaffee, Wien",
      coffeePara: "Supermind röstet in Wien mit einem ruhigen, klaren Qualitätsanspruch. Wir bringen diesen Kaffee in unseren Garten: alkoholfrei, bewusst, warm und passend zu hausgemachten Kuchen.",
      coffeeBridge: "Zwei Welten, ein ruhiger Moment: Supermind bringt die Bohne, My Secret Garden den Ort.",
      spaceLabel: "Unser Garten",
      spaceTitle: "Im Herzen von Wien",
      spacePara1: "Du gehst durch den Bogen auf der Mariahilferstraße und plötzlich wird es leiser. Der Hof liegt ein paar Schritte zurück, fast ein bisschen versteckt.",
      spacePara2: "Grüne Pflanzen, Holztische, Stimmen vom Tresen. Kein perfekter Rückzugsort, eher ein echter. Gerade deshalb bleibt man gern sitzen.",
      spaceNote: "Komm auf ein schnelles Mittagessen. Oder bleib noch fünf Minuten länger.",
      inspirationLabel: "Unsere Inspiration",
      inspirationTitle: "Sri Chinmoy",
      inspirationPara1: "Sri Chinmoy (1931 bis 2007) war ein spiritueller Lehrer, der Meditation, Musik und Kunst als Wege zum inneren Frieden lehrte.",
      inspirationPara2: "Aus diesem Umfeld sind weltweit vegetarische Restaurants entstanden. Kleine Orte, an denen Kochen nicht nur Arbeit ist, sondern tägliche Übung.",
      inspirationNote: "Bei uns zeigt sich das leise: im Umgang am Tresen, in der Musik, in der Art, wie ein Teller angerichtet wird.",
      artTitle: "Jharna-Kala",
      artSubtitle: "Kunst aus der Quelle",
      poemTitle: "Seine Worte",
      poemHint: "Mit jedem Kaffee erhältst du eine Karte mit einem seiner Gedichte.",
    },
    en: {
      heroTitle: "Our Story",
      heroTagline: "Inside, there is often coffee in the air. Outside, the courtyard waits.",
      manifesto: "A small garden courtyard, a warm plate, a short pause.",
      dietaryLine: "Vegetarian and vegan. Many dishes are cooked without gluten containing ingredients, but this is not a certified gluten free kitchen.",
      philosophyLabel: "Our Philosophy",
      philosophyTitle: "Our Approach",
      philosophyPara1: "My Secret Garden opened in 2018. Not as a polished concept on paper, more as a clear idea: good vegetarian food, a quiet courtyard and people who do not have to rush through lunch.",
      philosophyQuote: "Cooking is prayer. Eating is gratitude.",
      philosophyPara2: "We cook fresh every day. Sometimes lunch gets busy, sometimes the courtyard is almost silent. Both belong here.",
      pillarsTitle: "What Makes Us Special",
      pillarsIntro: "Our kitchen travels a little. India, Japan, the Mediterranean, Vienna. In the end, everything lands in our small kitchen in Raimundhof.",
      pillar1Title: "World Cuisine",
      pillar1Desc: "Dal, curry, bowls, polenta, soup. Not all on the same day, but this is the kind of mix we like. The daily menu should move a bit.",
      pillar2Title: "Local Products",
      pillar2Desc: "Vegetables, salads and grains arrive in the morning. What looks good and fits the season often ends up on the menu the same day.",
      pillar3Title: "Mindful & Alcohol Free",
      pillar3Desc: "We do not serve alcohol. We do serve coffee, tea, homemade cakes and many dishes without gluten containing ingredients. If you are coeliac, please tell us before ordering.",
      coffeeLabel: "Our Coffee",
      coffeeTitle: "Supermind Kaffee, Vienna",
      coffeePara: "Supermind roasts in Vienna with a quiet, clear commitment to quality. We bring that coffee into our garden: alcohol free, mindful, warm and made to sit beside homemade cake.",
      coffeeBridge: "Two worlds, one calm moment: Supermind brings the bean, My Secret Garden brings the place.",
      spaceLabel: "Our Garden",
      spaceTitle: "In the Heart of Vienna",
      spacePara1: "You walk through the arch on Mariahilferstraße and, a few steps later, it gets quieter. The courtyard sits back from the street, almost hidden.",
      spacePara2: "Green plants, wooden tables, voices from the counter. Not a perfect retreat, a real one. That is why people stay.",
      spaceNote: "Come for a quick lunch. Or stay five minutes longer.",
      inspirationLabel: "Our Inspiration",
      inspirationTitle: "Sri Chinmoy",
      inspirationPara1: "Sri Chinmoy lived from 1931 to 2007. He was a spiritual teacher who taught meditation, music and art as paths to inner peace.",
      inspirationPara2: "Vegetarian restaurants grew from that same circle around the world. Small places where cooking is not only work, but a daily practice.",
      inspirationNote: "Here it shows quietly: at the counter, in the music, in the way a plate is put together.",
      artTitle: "Jharna-Kala",
      artSubtitle: "Art from the Source",
      poemTitle: "His Words",
      poemHint: "With every coffee, you receive a card with one of his poems.",
    },
  };

  const t = content[language];
  const pillarsData = [
    { 
      image: koreanBowl, 
      imageAlt: language === "de" ? "Internationale Küche" : "World cuisine",
      title: t.pillar1Title, 
      desc: t.pillar1Desc 
    },
    { 
      image: alpenpolenta, 
      imageAlt: language === "de" ? "Lokale Produkte" : "Local products",
      title: t.pillar2Title, 
      desc: t.pillar2Desc 
    },
    { 
      image: interiorReal, 
      imageAlt: language === "de" ? "Ruhige Atmosphäre" : "Peaceful atmosphere",
      title: t.pillar3Title, 
      desc: t.pillar3Desc 
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={language === "de" ? "Über Uns" : "About Us"}
        description={language === "de" 
          ? "Erfahre mehr über My Secret Garden, unser vegetarisches Restaurant inspiriert von Sri Chinmoys Philosophie in Wien."
          : "Learn more about My Secret Garden, our vegetarian restaurant inspired by Sri Chinmoy's philosophy in Vienna."}
        path="/about"
      />
      <Navigation />
      <div className="h-20" />

      {/* ABOUT HERO */}
      <section className="bg-section-soft py-14 text-center md:py-20">
        <div className="container mx-auto px-4">
          <h1 className="mb-4 font-caveat text-5xl text-primary md:text-7xl">
            {t.heroTitle}
          </h1>
          <p className="mx-auto max-w-xl font-lora text-xl leading-relaxed text-foreground/85">
            {t.manifesto}
          </p>
          <p className="mx-auto mt-4 max-w-md font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
            {t.heroTagline} {t.dietaryLine}
          </p>
        </div>
      </section>

      {/* PHILOSOPHY - Two column */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border/75 shadow-card">
                <img src={entranceGarden} alt="Garden entrance" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">{t.philosophyLabel}</span>
              <h2 className="text-4xl md:text-5xl text-primary">{t.philosophyTitle}</h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.philosophyPara1}</p>
              <blockquote className="border-l-4 border-accent py-2 pl-6 font-lora text-xl italic text-primary/90 md:text-2xl">
                "{t.philosophyQuote}"
              </blockquote>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.philosophyPara2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS / OFFERING - Alternating sections with photos */}
      <section className="bg-section-accent py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
            <h2 className="text-4xl text-primary md:text-5xl">{t.pillarsTitle}</h2>
            <p className="mt-4 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">{t.pillarsIntro}</p>
          </div>
          
          <div className="space-y-16 md:space-y-24">
            {pillarsData.map((pillar, index) => (
              <div 
                key={index} 
                className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`${index % 2 === 1 ? 'md:order-2' : 'md:order-1'}`}>
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-border/75 shadow-card">
                    <img 
                      src={pillar.image} 
                      alt={pillar.imageAlt} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                </div>
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-1' : 'md:order-2'}`}>
                  <p className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">✿</p>
                  <h3 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground">
                    {pillar.title}
                  </h3>
                  <p className="font-lora text-lg text-foreground/80 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COFFEE PARTNERSHIP */}
      <section className="bg-section-soft py-16 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-8 border-y border-border/75 py-10 md:grid-cols-[1.35fr_0.65fr] md:gap-12 md:py-12">
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">{t.coffeeLabel}</span>
                <span className="font-work text-xs text-muted-high-contrast">✿</span>
                <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-primary">Secret Garden × Supermind</span>
              </div>
              <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-5xl">{t.coffeeTitle}</h2>
              <p className="max-w-2xl font-lora text-xl leading-relaxed text-foreground/85">{t.coffeeBridge}</p>
              <p className="max-w-2xl font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">{t.coffeePara}</p>
              <a
                href="https://supermind.at/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-primary/25 bg-card px-4 font-work text-sm font-semibold text-primary transition-colors hover:border-primary/45 hover:bg-muted"
              >
                supermind.at
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <a
              href="https://supermind.at/"
              target="_blank"
              rel="noopener noreferrer"
              className="mx-auto flex w-full max-w-xs items-center justify-center rounded-lg border border-border bg-card px-8 py-10 shadow-card transition-colors hover:border-primary/35 md:justify-self-end"
              aria-label={language === "de" ? "Supermind Kaffee Website öffnen" : "Open Supermind Kaffee website"}
            >
              <img src={supermindLogo} alt="Supermind Kaffee" className="h-48 w-auto object-contain md:h-56" loading="lazy" />
            </a>
          </div>
        </div>
      </section>

      {/* SPACE - Two column reversed */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">{t.spaceLabel}</span>
              <h2 className="text-4xl md:text-5xl text-primary">{t.spaceTitle}</h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.spacePara1}</p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.spacePara2}</p>
              <p className="font-cormorant text-2xl italic leading-relaxed text-primary/90">{t.spaceNote}</p>
              <a 
                href={SITE.instagramUrl}
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block font-work text-accent hover:text-accent/80 transition-colors"
                aria-label={`${SITE.instagramHandle} (opens in new tab)`}
              >
                {SITE.instagramHandle}
              </a>
            </div>
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-border/75 shadow-card">
                <img src={gardenReal} alt="Our garden" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INSPIRATION - Sri Chinmoy integrated section */}
      <section className="bg-section-soft py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
            {/* Portrait */}
            <div className="order-2 md:order-1">
              <div className="relative max-w-sm mx-auto">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-border/75 shadow-card">
                  <img src={sriChinmoyImage} alt="Sri Chinmoy" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-border/75 bg-card px-6 py-2 shadow-card">
                  <p className="font-caveat text-lg text-primary">1931 bis 2007</p>
                </div>
              </div>
            </div>
            {/* Text */}
            <div className="order-1 md:order-2 space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">{t.inspirationLabel}</span>
              <h2 className="text-4xl md:text-5xl text-primary">{t.inspirationTitle}</h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.inspirationPara1}</p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">{t.inspirationPara2}</p>
              <p className="font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">{t.inspirationNote}</p>
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
              {t.artTitle}. {t.artSubtitle}
            </p>
            <div className="flex gap-4 md:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 md:justify-center md:overflow-visible">
              {artworks.map((art, index) => (
                <div key={index} className="flex-shrink-0 w-48 md:w-56 snap-center">
                  <div className="aspect-square overflow-hidden rounded-2xl border border-border/75 shadow-card">
                    <img src={art.src} alt={art.alt} className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Poem Carousel */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3xl text-accent text-center mb-8">{t.poemTitle}</h3>
            <div className="relative">
              <div className="bg-background/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-lg min-h-[160px] flex items-center justify-center">
                <p className="font-lora text-lg md:text-xl text-foreground/90 text-center whitespace-pre-line leading-relaxed italic">
                  "{poems[currentPoem][language]}"
                </p>
              </div>
              <button 
                onClick={prevPoem}
                className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-border/75 bg-card text-muted-high-contrast shadow-card transition-colors hover:text-primary md:-translate-x-12"
                aria-label="Previous poem"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextPoem}
                className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-border/75 bg-card text-muted-high-contrast shadow-card transition-colors hover:text-primary md:translate-x-12"
                aria-label="Next poem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <p className="text-center text-sm text-muted-high-contrast mt-6 font-lora italic">{t.poemHint}</p>
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
