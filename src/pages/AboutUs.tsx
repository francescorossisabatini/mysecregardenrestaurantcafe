import { useEffect, useRef, useState, type ReactNode } from "react";
import { ExternalLink, ChevronLeft, ChevronRight, BookOpen, Brush, Music, Globe2, HeartHandshake, Leaf, MapPin, Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/SkipLink";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { SITE } from "@/config/site";
import entranceDoorway from "@/assets/photos/entrance-doorway.jpg";
import gardenCourtyard from "@/assets/photos/garden-courtyard.jpg";
import tavolataDallAlto from "@/assets/photos/tavolata-dall-alto.jpg";
import cheersTable from "@/assets/photos/cheers-table.jpg";
import dishesTableTop from "@/assets/dishes-table-top.jpg";
import tortaCake from "@/assets/torta-2.jpg";
import sriChinmoyImage from "@/assets/sri-chinmoy-portrait.jpg";
import sriChinmoyBirds from "@/assets/sri-chinmoy-birds.jpg";
import sriChinmoyFlowers from "@/assets/sri-chinmoy-flowers.jpg";
import sriChinmoyWaves from "@/assets/sri-chinmoy-waves.jpg";
import sriChinmoyAbstract from "@/assets/sri-chinmoy-abstract.jpg";

type Language = "de" | "en";

type RevealSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
};

const RevealSection = ({ id, className = "", children }: RevealSectionProps) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id={id} className={`section-animate ${isVisible ? "in-view" : ""} ${className}`}>
      {children}
    </section>
  );
};

const poems = [
  { en: "World peace can be achieved\nWhen the power of love\nReplaces the love of power.", de: "Weltfrieden kann erreicht werden,\nwenn die Kraft der Liebe\ndie Liebe zur Macht ersetzt." },
  { en: "Try not to change the world.\nYou will fail.\nTry to love the world.\nLo, the world is changed\nForever.", de: "Versuche nicht, die Welt zu ändern.\nDu wirst scheitern.\nVersuche, die Welt zu lieben.\nSiehe, die Welt ist verändert\nFür immer." },
  { en: "If you have inner peace,\nNobody can force you to be\nA slave to the outer reality.", de: "Wenn du inneren Frieden hast,\nkann dich niemand zwingen,\nein Sklave der äußeren Realität zu sein." },
  { en: "Meditation means\nConversation with silence.", de: "Meditation bedeutet\nGespräch mit der Stille." },
  { en: "To be rich\nIs to give a smile\nWith no expectation of return.", de: "Reich zu sein\nbedeutet, ein Lächeln zu schenken\nohne Erwartung einer Gegenleistung." },
];

const artworks = [
  { src: sriChinmoyBirds, alt: "Soul-Birds" },
  { src: sriChinmoyFlowers, alt: "Jharna-Kala flowers" },
  { src: sriChinmoyWaves, alt: "Jharna-Kala waves" },
  { src: sriChinmoyAbstract, alt: "Jharna-Kala abstract work" },
];

const sourceLinks = [
  { href: "https://srichinmoy.org/sri_chinmoy/biography/", label: { de: "Offizielle Biografie", en: "Official biography" } },
  { href: "https://srichinmoy.org/", label: { de: "Offizielle Website", en: "Official site" } },
  { href: "https://www.srichinmoy.org/sri_chinmoy/landmarks/cultural_offerings/", label: { de: "Kulturelle Werke", en: "Cultural offerings" } },
  { href: "https://srichinmoy.org/sri_chinmoy/art", label: { de: "Jharna-Kala Kunst", en: "Jharna-Kala art" } },
  { href: "https://www.srichinmoylibrary.com/srichinmoy", label: { de: "Sri Chinmoy Library", en: "Sri Chinmoy Library" } },
  { href: "https://www.srichinmoycentre.org/enterprises", label: { de: "Restaurants und Cafés", en: "Restaurants and cafés" } },
];

const restaurantLinks = [
  { href: "https://www.heartofjoy.at/en/", name: "The Heart of Joy", place: "Salzburg" },
  { href: "https://www.smileofthebeyond.com/", name: "The Smile of the Beyond", place: "Queens, New York" },
  { href: "https://myrainbowdreams.org/our-story", name: "My Rainbow-Dreams", place: "Canberra" },
  { href: "https://www.happiness-heart-cafe.de/", name: "Happiness-Heart Café", place: "Berlin" },
  { href: "https://vegelateria.ch/", name: "The Sacred / Vegelateria", place: "Zürich" },
];

const chapterLabel = (language: Language, number: string) => language === "de" ? `Kapitel ${number}` : `Chapter ${number}`;

const ExternalTextLink = ({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`inline-flex items-center gap-2 text-primary transition-colors hover:text-primary/80 ${className}`}
  >
    {children}
    <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
  </a>
);

const AboutUs = () => {
  const { language } = useLanguage();
  const [currentPoem, setCurrentPoem] = useState(0);

  const nextPoem = () => setCurrentPoem((prev) => (prev + 1) % poems.length);
  const prevPoem = () => setCurrentPoem((prev) => (prev - 1 + poems.length) % poems.length);

  const content = {
    de: {
      heroTitle: "Unsere Geschichte",
      heroKicker: "Vegetarisches Restaurant im Raimundhof",
      heroLead: "Ein stiller Innenhof, frisches Essen, ein kurzer Moment zum Durchatmen mitten in Wien.",
      heroText: "My Secret Garden ist kein lautes Konzept. Es ist ein Ort, an dem Küche, Garten und eine spirituelle Idee langsam zusammenfinden.",
      navPlace: "Der Ort",
      navKitchen: "Küche",
      navRhythm: "Alltag",
      navInspiration: "Sri Chinmoy",
      placeLabel: "Der Ort",
      placeTitle: "Ein Garten hinter dem Bogen",
      placeText1: "Von der Mariahilferstraße sind es nur wenige Schritte. Dann wird es leiser, der Raimundhof öffnet sich, und zwischen Pflanzen, Holztischen und Stimmen vom Tresen entsteht ein anderer Rhythmus.",
      placeText2: "Wir mögen Orte, die nicht perfekt wirken müssen. Der Hof ist echt, manchmal belebt, manchmal ganz ruhig. Genau darin liegt sein Charme.",
      placeCaption: "Der Eingang führt durch den Raimundhof in unseren begrünten Innenhof.",
      kitchenLabel: "Die Küche",
      kitchenTitle: "Vegetarisch, vegan, täglich frisch",
      kitchenIntro: "Unsere Küche reist ein bisschen: Indien, Japan, Mittelmeer, Wien. Am Ende landet alles als ehrlicher Teller am Tresen.",
      kitchenCards: [
        { title: "Weltküche", text: "Dal, Curry, Bowl, Polenta, Suppe. Nicht alles an einem Tag, aber immer mit Lust auf Abwechslung." },
        { title: "Lokale Produkte", text: "Gemüse, Salate und Getreide kommen morgens in die Küche. Was zur Saison passt, darf auf die Karte." },
        { title: "Bewusst alkoholfrei", text: "Bei uns gibt es keinen Alkohol. Dafür Tee, Kaffee, hausgemachte Kuchen und viele Gerichte ohne glutenhaltige Zutaten." },
      ],
      kitchenNote: "Wenn du Zöliakie oder Allergien hast, sag bitte vor der Bestellung Bescheid. Unsere Küche ist nicht zertifiziert glutenfrei.",
      rhythmLabel: "Der Alltag",
      rhythmTitle: "Mittags schnell, im Garten langsam",
      rhythmText1: "Zwischen 11 und 19 Uhr verändert sich der Raum mehrmals. Erst kommt der Duft vom Tagesmenü, dann die Gespräche am Tresen, später Kaffee, Kuchen und ein ruhiger Hofmoment.",
      rhythmText2: "Manche Gäste nehmen ihr Essen mit, andere bleiben länger als geplant. Beides gehört zu uns. Der Teller soll nicht inszeniert wirken, sondern gut tun.",
      rhythmQuote: "Ein Teller kann den Tag nicht lösen. Aber er kann ihn kurz leichter machen.",
      inspirationLabel: "Unsere Inspiration",
      inspirationTitle: "Sri Chinmoy",
      inspirationIntro: "Sri Chinmoy (1931 bis 2007) war ein spiritueller Lehrer, Dichter, Künstler, Musiker und Friedensvisionär. Seine Botschaft war einfach und anspruchsvoll zugleich: äußerer Frieden beginnt mit innerem Frieden.",
      inspirationStory1: "Geboren in Bengalen, verbrachte er viele Jahre in spiritueller Praxis in Indien. 1964 zog er nach New York, wo er Meditation, Musik, Kunst, Dichtung und Friedensinitiativen miteinander verband.",
      inspirationStory2: "Er hielt Friedensmeditationen bei den Vereinten Nationen, gab weltweit Konzerte und entwickelte mit Jharna-Kala eine spontane Kunstform. Seine Soul-Birds stehen für Freiheit, Einheit und inneres Streben.",
      inspirationStory3: "Für uns ist diese Inspiration nicht dekorativ. Sie zeigt sich leise: in vegetarischer Küche, in achtsamem Service, in einem Raum, der Menschen nicht beschleunigen will.",
      factsTitle: "Ein Leben in vielen Ausdrucksformen",
      facts: [
        { icon: BookOpen, title: "Dichtung und Bücher", text: "Über 1.500 veröffentlichte Bücher und eine große Sammlung kurzer Gedichte und Aphorismen." },
        { icon: Brush, title: "Jharna-Kala", text: "Spontane Kunst und Millionen von Soul-Birds als Zeichen innerer Freiheit." },
        { icon: Music, title: "Musik und Frieden", text: "Konzerte, Lieder und Friedensinitiativen als Angebote für Harmonie." },
        { icon: HeartHandshake, title: "Dienst am Menschen", text: "Meditation sollte nicht Flucht sein, sondern im Alltag durch selbstlosen Dienst sichtbar werden." },
      ],
      artTitle: "Jharna-Kala und Soul-Birds",
      artText: "Die Kunstwerke geben der Seite einen ruhigen, offenen Rhythmus. Sie sind nicht Dekoration allein, sondern Teil der Sprache, die unser Restaurant geprägt hat.",
      poemTitle: "Seine Worte",
      poemHint: "Mit jedem Kaffee erhältst du eine Karte mit einem seiner Gedichte.",
      widerTitle: "Eine größere Familie vegetarischer Cafés",
      widerText: "Weltweit entstanden Restaurants und Cafés, die von Sri Chinmoys Schülern geführt oder inspiriert wurden. Sie sind unabhängig, teilen aber oft dieselbe Idee: vegetarisches Essen als einfache Form von Gastfreundschaft und Service.",
      readMoreTitle: "Weiterlesen",
      readMoreText: "Ausgewählte Quellen zu Biografie, Kunst, Literatur und den inspirierten Restaurants.",
    },
    en: {
      heroTitle: "Our Story",
      heroKicker: "Vegetarian restaurant in Raimundhof",
      heroLead: "A quiet courtyard, fresh food and a short moment to breathe in the middle of Vienna.",
      heroText: "My Secret Garden is not a loud concept. It is a place where kitchen, garden and a spiritual idea slowly come together.",
      navPlace: "Place",
      navKitchen: "Kitchen",
      navRhythm: "Daily rhythm",
      navInspiration: "Sri Chinmoy",
      placeLabel: "The place",
      placeTitle: "A garden behind the arch",
      placeText1: "It is only a few steps from Mariahilferstraße. Then it gets quieter, Raimundhof opens up, and between plants, wooden tables and voices from the counter, another rhythm begins.",
      placeText2: "We like places that do not have to feel perfect. The courtyard is real, sometimes lively, sometimes almost still. That is its charm.",
      placeCaption: "The entrance leads through Raimundhof into our green courtyard.",
      kitchenLabel: "The kitchen",
      kitchenTitle: "Vegetarian, vegan, fresh every day",
      kitchenIntro: "Our kitchen travels a little: India, Japan, the Mediterranean, Vienna. In the end, everything lands as an honest plate at the counter.",
      kitchenCards: [
        { title: "World cuisine", text: "Dal, curry, bowls, polenta, soup. Not all on the same day, but always with room for change." },
        { title: "Local produce", text: "Vegetables, salads and grains arrive in the morning. What fits the season may end up on the menu." },
        { title: "Mindful and alcohol free", text: "We do not serve alcohol. We do serve tea, coffee, homemade cakes and many dishes without gluten containing ingredients." },
      ],
      kitchenNote: "If you are coeliac or have allergies, please tell us before ordering. Our kitchen is not certified gluten free.",
      rhythmLabel: "The daily rhythm",
      rhythmTitle: "Quick at lunch, slower in the garden",
      rhythmText1: "Between 11 and 19, the room changes more than once. First comes the smell of the daily menu, then conversations at the counter, later coffee, cake and a quiet courtyard moment.",
      rhythmText2: "Some guests take food away, others stay longer than planned. Both belong here. A plate should not feel staged, it should feel good.",
      rhythmQuote: "A plate cannot fix the day. But it can make it lighter for a moment.",
      inspirationLabel: "Our inspiration",
      inspirationTitle: "Sri Chinmoy",
      inspirationIntro: "Sri Chinmoy (1931 to 2007) was a spiritual teacher, poet, artist, musician and peace visionary. His message was simple and demanding at the same time: outer peace begins with inner peace.",
      inspirationStory1: "Born in Bengal, he spent many years in spiritual practice in India. In 1964 he moved to New York, where he brought together meditation, music, art, poetry and peace initiatives.",
      inspirationStory2: "He offered peace meditations at the United Nations, gave concerts around the world and developed Jharna-Kala, a spontaneous form of art. His Soul-Birds stand for freedom, unity and inner aspiration.",
      inspirationStory3: "For us, this inspiration is not decorative. It shows quietly: in vegetarian cooking, in mindful service, in a room that does not try to rush people.",
      factsTitle: "A life in many forms of expression",
      facts: [
        { icon: BookOpen, title: "Poetry and books", text: "Over 1,500 published books and a large body of short poems and aphorisms." },
        { icon: Brush, title: "Jharna-Kala", text: "Spontaneous art and millions of Soul-Birds as signs of inner freedom." },
        { icon: Music, title: "Music and peace", text: "Concerts, songs and peace initiatives offered as gestures of harmony." },
        { icon: HeartHandshake, title: "Service to people", text: "Meditation was not meant as escape, but as something visible in daily selfless service." },
      ],
      artTitle: "Jharna-Kala and Soul-Birds",
      artText: "The artworks give the page a calm, open rhythm. They are not decoration alone, but part of the language that shaped our restaurant.",
      poemTitle: "His words",
      poemHint: "With every coffee, you receive a card with one of his poems.",
      widerTitle: "A wider family of vegetarian cafés",
      widerText: "Around the world, restaurants and cafés were opened or inspired by students of Sri Chinmoy. They are independent, but often share the same idea: vegetarian food as a simple form of hospitality and service.",
      readMoreTitle: "Read more",
      readMoreText: "Selected sources about biography, art, literature and the inspired restaurants.",
    },
  } as const;

  const t = content[language];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={language === "de" ? "Über Uns" : "About Us"}
        description={language === "de"
          ? "Die Geschichte von My Secret Garden im Raimundhof: vegetarische Küche, Gartenatmosphäre und Inspiration durch Sri Chinmoy."
          : "The story of My Secret Garden in Raimundhof: vegetarian cooking, courtyard atmosphere and inspiration from Sri Chinmoy."}
        path="/about"
      />
      <SkipLink />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-20 focus:outline-none">
        <section className="relative overflow-hidden border-b border-border/70 bg-section-soft py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.08fr_0.92fr] md:items-end md:gap-14">
              <div className="space-y-7 animate-fade-in">
                <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {t.heroKicker}
                </span>
                <div className="space-y-5">
                  <h1 className="font-caveat text-5xl leading-none text-primary md:text-7xl lg:text-8xl">
                    {t.heroTitle}
                  </h1>
                  <p className="max-w-2xl font-lora text-2xl leading-relaxed text-foreground md:text-3xl">
                    {t.heroLead}
                  </p>
                  <p className="max-w-xl font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                    {t.heroText}
                  </p>
                </div>
                <nav className="flex flex-wrap gap-2" aria-label={language === "de" ? "Abschnitte der Seite" : "Page sections"}>
                  {[
                    { href: "#place", label: t.navPlace },
                    { href: "#kitchen", label: t.navKitchen },
                    { href: "#rhythm", label: t.navRhythm },
                    { href: "#sri-chinmoy", label: t.navInspiration },
                  ].map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="rounded-full border border-primary/20 bg-card px-4 py-2 font-work text-xs font-semibold uppercase tracking-[0.08em] text-primary transition-colors hover:border-primary/45 hover:bg-muted"
                    >
                      {item.label}
                    </a>
                  ))}
                </nav>
              </div>
              <div className="animate-fade-in md:pt-8">
                <div className="overflow-hidden rounded-lg border border-border/75 shadow-card">
                  <img src={entranceDoorway} alt={language === "de" ? "Eingang zu My Secret Garden im Raimundhof" : "Entrance to My Secret Garden in Raimundhof"} className="h-full w-full object-cover" />
                </div>
                <p className="mt-3 font-work text-xs leading-relaxed text-muted-high-contrast">
                  {t.placeCaption}
                </p>
              </div>
            </div>
          </div>
        </section>

        <RevealSection id="place" className="bg-background py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 stagger-children in-view">
              <div className="space-y-5">
                <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {chapterLabel(language, "01")} · {t.placeLabel}
                </span>
                <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-6xl">
                  {t.placeTitle}
                </h2>
                <p className="font-lora text-lg leading-relaxed text-foreground/85 md:text-xl">
                  {t.placeText1}
                </p>
                <p className="font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                  {t.placeText2}
                </p>
                <ExternalTextLink href={SITE.mapsUrl} className="font-work text-sm font-semibold">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  {language === "de" ? "Route zum Raimundhof" : "Directions to Raimundhof"}
                </ExternalTextLink>
              </div>
              <div>
                <div className="overflow-hidden rounded-lg border border-border/75 shadow-card">
                  <img src={gardenCourtyard} alt={language === "de" ? "Begrünter Innenhof mit Holztischen" : "Green courtyard with wooden tables"} className="aspect-[4/5] w-full object-cover" loading="lazy" />
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="kitchen" className="bg-section-accent py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center stagger-children in-view md:mb-16">
              <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                {chapterLabel(language, "02")} · {t.kitchenLabel}
              </span>
              <h2 className="mt-3 font-cormorant text-4xl font-semibold leading-tight text-primary md:text-6xl">
                {t.kitchenTitle}
              </h2>
              <p className="mt-5 font-lora text-xl leading-relaxed text-foreground/85">
                {t.kitchenIntro}
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3 stagger-children in-view">
              {t.kitchenCards.map((card, index) => {
                const images = [tavolataDallAlto, dishesTableTop, tortaCake];
                return (
                  <article key={card.title} className="overflow-hidden rounded-lg border border-border/75 bg-card shadow-card">
                    <img src={images[index]} alt="" className="aspect-[4/3] w-full object-cover" loading="lazy" />
                    <div className="space-y-3 p-5">
                      <Leaf className="h-5 w-5 text-accent" aria-hidden="true" />
                      <h3 className="font-cormorant text-2xl font-semibold text-foreground">{card.title}</h3>
                      <p className="font-work text-sm leading-relaxed text-muted-high-contrast">{card.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
            <p className="mx-auto mt-8 max-w-2xl rounded-lg border border-border/75 bg-card px-5 py-4 text-center font-work text-xs leading-relaxed text-muted-high-contrast shadow-card md:text-sm">
              {t.kitchenNote}
            </p>
          </div>
        </RevealSection>

        <RevealSection id="rhythm" className="bg-background py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center md:gap-16 stagger-children in-view">
              <div className="order-2 md:order-1">
                <div className="overflow-hidden rounded-lg border border-border/75 shadow-card">
                  <img src={cheersTable} alt={language === "de" ? "Anstoßen am Tisch mit frischen Gerichten" : "Cheers at the table with fresh dishes"} className="aspect-[5/4] w-full object-cover" loading="lazy" />
                </div>
              </div>
              <div className="order-1 space-y-5 md:order-2">
                <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {chapterLabel(language, "03")} · {t.rhythmLabel}
                </span>
                <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-6xl">
                  {t.rhythmTitle}
                </h2>
                <p className="font-lora text-lg leading-relaxed text-foreground/85 md:text-xl">
                  {t.rhythmText1}
                </p>
                <p className="font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                  {t.rhythmText2}
                </p>
                <blockquote className="rounded-lg border border-border/70 bg-card/70 px-6 py-5 text-center shadow-soft">
                  <span className="mx-auto mb-4 block h-px w-20 bg-accent/50" aria-hidden="true" />
                  <p className="font-lora text-2xl italic leading-relaxed text-primary/90">
                    {t.rhythmQuote}
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection id="sri-chinmoy" className="bg-section-soft py-20 md:py-28">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid gap-12 md:grid-cols-[0.86fr_1.14fr] md:items-start md:gap-16 stagger-children in-view">
              <div className="md:sticky md:top-28">
                <div className="mx-auto max-w-sm overflow-hidden rounded-lg border border-border/75 bg-card shadow-card">
                  <img src={sriChinmoyImage} alt="Sri Chinmoy" className="aspect-[3/4] w-full object-cover" loading="lazy" />
                  <div className="border-t border-border/75 p-5 text-center">
                    <p className="font-caveat text-2xl text-primary">1931 bis 2007</p>
                    <p className="mt-1 font-work text-xs uppercase tracking-[0.12em] text-muted-high-contrast">
                      {language === "de" ? "Innerer Frieden · Service · Kreativität" : "Inner peace · service · creativity"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-5">
                  <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {chapterLabel(language, "04")} · {t.inspirationLabel}
                  </span>
                  <h2 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-6xl">
                    {t.inspirationTitle}
                  </h2>
                  <p className="font-lora text-xl leading-relaxed text-foreground/90 md:text-2xl">
                    {t.inspirationIntro}
                  </p>
                  <div className="space-y-4 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">
                    <p>{t.inspirationStory1}</p>
                    <p>{t.inspirationStory2}</p>
                    <p>{t.inspirationStory3}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-border/75 bg-card p-5 shadow-card md:p-7">
                  <h3 className="font-cormorant text-3xl font-semibold text-primary">{t.factsTitle}</h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {t.facts.map((fact) => {
                      const Icon = fact.icon;

                      return (
                        <div key={fact.title} className="rounded-lg border border-border/60 bg-background/65 p-4">
                          <Icon className="mb-3 h-5 w-5 text-accent" aria-hidden="true" />
                          <h4 className="font-cormorant text-xl font-semibold text-foreground">{fact.title}</h4>
                          <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast">{fact.text}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-12 stagger-children in-view">
              <div className="space-y-5">
                <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                  {chapterLabel(language, "05")}
                </span>
                <h3 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-5xl">
                  {t.artTitle}
                </h3>
                <p className="font-lora text-lg leading-relaxed text-foreground/85">
                  {t.artText}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {artworks.map((art) => (
                  <div key={art.alt} className="overflow-hidden rounded-lg border border-border/75 bg-card shadow-card">
                    <img src={art.src} alt={art.alt} className="aspect-square w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-16 max-w-3xl">
              <h3 className="mb-7 text-center font-cormorant text-3xl font-semibold text-accent md:text-4xl">{t.poemTitle}</h3>
              <div className="relative">
                <div className="flex min-h-[180px] items-center justify-center rounded-lg border border-border/75 bg-card p-8 shadow-card md:p-12">
                  <p className="whitespace-pre-line text-center font-lora text-lg italic leading-relaxed text-foreground/90 md:text-xl">
                    "{poems[currentPoem][language]}"
                  </p>
                </div>
                <button
                  onClick={prevPoem}
                  className="absolute left-0 top-1/2 flex h-10 w-10 -translate-x-3 -translate-y-1/2 items-center justify-center rounded-full border border-border/75 bg-card text-muted-high-contrast shadow-card transition-colors hover:text-primary md:-translate-x-12"
                  aria-label={language === "de" ? "Vorheriges Gedicht" : "Previous poem"}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextPoem}
                  className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 translate-x-3 items-center justify-center rounded-full border border-border/75 bg-card text-muted-high-contrast shadow-card transition-colors hover:text-primary md:translate-x-12"
                  aria-label={language === "de" ? "Nächstes Gedicht" : "Next poem"}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-5 text-center font-lora text-sm italic text-muted-high-contrast">{t.poemHint}</p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              <div className="rounded-lg border border-border/75 bg-card p-6 shadow-card md:p-8">
                <Globe2 className="mb-4 h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-cormorant text-3xl font-semibold text-primary">{t.widerTitle}</h3>
                <p className="mt-3 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">{t.widerText}</p>
                <div className="mt-6 grid gap-2">
                  {restaurantLinks.map((restaurant) => (
                    <ExternalTextLink key={restaurant.href} href={restaurant.href} className="justify-between rounded-md border border-border/50 bg-background/65 px-3 py-2 font-work text-sm font-semibold">
                      <span>{restaurant.name} · {restaurant.place}</span>
                    </ExternalTextLink>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-border/75 bg-card p-6 shadow-card md:p-8">
                <Sparkles className="mb-4 h-6 w-6 text-accent" aria-hidden="true" />
                <h3 className="font-cormorant text-3xl font-semibold text-primary">{t.readMoreTitle}</h3>
                <p className="mt-3 font-work text-sm leading-relaxed text-muted-high-contrast md:text-base">{t.readMoreText}</p>
                <div className="mt-6 grid gap-2">
                  {sourceLinks.map((link) => (
                    <ExternalTextLink key={link.href} href={link.href} className="justify-between rounded-md border border-border/50 bg-background/65 px-3 py-2 font-work text-sm font-semibold">
                      <span>{link.label[language]}</span>
                    </ExternalTextLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </RevealSection>
      </main>

      <CTAEndBlock show={["call", "directions", "weekly"]} />
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default AboutUs;
