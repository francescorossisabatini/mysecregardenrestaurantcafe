import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/SkipLink";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CTAEndBlock } from "@/components/CTAEndBlock";

// New high-quality photos
import entranceDoorway from "@/assets/photos/entrance-doorway.jpg";
import gardenCourtyard from "@/assets/photos/garden-courtyard.jpg";
import tavolataDallAlto from "@/assets/photos/tavolata-dall-alto.jpg";
import interiorMain from "@/assets/photos/interior-main.jpg";
import interiorBanquette from "@/assets/photos/interior-banquette.jpg";
import interiorLibrary from "@/assets/photos/interior-library.jpg";
import cheersTable from "@/assets/photos/cheers-table.jpg";

// Existing photos from home/site
import gastgarten from "@/assets/gastgarten.jpg";
import diningScene from "@/assets/dining-scene.jpg";
import piattoBowlBlue from "@/assets/piatto-bowl-blue.jpg";
import dalRiceBowl from "@/assets/dal-rice-bowl.jpg";
import curryOfTheDay from "@/assets/curry-of-the-day.webp";
import tavolata from "@/assets/tavolata-3.jpg";
import torta from "@/assets/torta-2.jpg";
import maniMangianoCibo from "@/assets/primo-piano-mani-mangiano-cibo.jpg";
import dishesTableTop from "@/assets/dishes-table-top.jpg";
import foodDetail from "@/assets/food-detail-real.jpg";

type Chapter = {
  kicker: { de: string; en: string };
  title: { de: string; en: string };
  story: { de: string; en: string };
  shots: { src: string; alt: { de: string; en: string }; size?: "wide" | "tall" | "square" }[];
};

const Reveal = ({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Gallery = () => {
  const { language } = useLanguage();

  const chapters: Chapter[] = [
    {
      kicker: { de: "Kapitel 01", en: "Chapter 01" },
      title: { de: "Hinter der grünen Tür", en: "Behind the green door" },
      story: {
        de: "Ein paar Schritte von der Mariahilferstraße. Die Stadt wird leiser, der Raimundhof öffnet sich, und ein begrünter Innenhof empfängt dich.",
        en: "A few steps from Mariahilferstraße. The city quiets down, Raimundhof opens up, and a green courtyard welcomes you.",
      },
      shots: [
        { src: entranceDoorway, alt: { de: "Grüne Eingangstür im Raimundhof", en: "Green entrance door at Raimundhof" }, size: "tall" },
        { src: gardenCourtyard, alt: { de: "Begrünter Innenhof mit Tischen", en: "Green courtyard with tables" }, size: "tall" },
        { src: gastgarten, alt: { de: "Gastgarten unter Sonnenschirmen", en: "Garden seating under umbrellas" }, size: "wide" },
      ],
    },
    {
      kicker: { de: "Kapitel 02", en: "Chapter 02" },
      title: { de: "Räume zum Verweilen", en: "Rooms to linger in" },
      story: {
        de: "Holz, Pflanzen, gedämpftes Licht. Ein Ort, der nicht beschleunigen will und Platz lässt für ein Gespräch oder eine ruhige Pause.",
        en: "Wood, plants, soft light. A place that does not rush you and leaves room for a conversation or a quiet pause.",
      },
      shots: [
        { src: interiorMain, alt: { de: "Hauptraum mit Holztischen", en: "Main room with wooden tables" }, size: "tall" },
        { src: interiorBanquette, alt: { de: "Sitznische mit Kissen", en: "Banquette seating with cushions" }, size: "tall" },
        { src: interiorLibrary, alt: { de: "Leseecke mit Büchern", en: "Library corner with books" }, size: "tall" },
      ],
    },
    {
      kicker: { de: "Kapitel 03", en: "Chapter 03" },
      title: { de: "Was auf den Tisch kommt", en: "What comes to the table" },
      story: {
        de: "Vegetarisch, oft vegan. Dal, Curry, Bowls, Suppe, Polenta. Frisch zubereitet und ehrlich serviert, ohne Inszenierung.",
        en: "Vegetarian, often vegan. Dal, curry, bowls, soup, polenta. Freshly cooked and honestly served, without staging.",
      },
      shots: [
        { src: tavolataDallAlto, alt: { de: "Tisch von oben mit mehreren Gerichten", en: "Table from above with several dishes" }, size: "wide" },
        { src: piattoBowlBlue, alt: { de: "Blauer Teller mit Salat und Gemüse", en: "Blue plate with salad and vegetables" }, size: "square" },
        { src: dalRiceBowl, alt: { de: "Dal mit Reis", en: "Dal with rice" }, size: "square" },
        { src: curryOfTheDay, alt: { de: "Curry des Tages", en: "Curry of the day" }, size: "square" },
        { src: dishesTableTop, alt: { de: "Mehrere Schalen am Tisch", en: "Several bowls on the table" }, size: "square" },
      ],
    },
    {
      kicker: { de: "Kapitel 04", en: "Chapter 04" },
      title: { de: "Geteilte Momente", en: "Shared moments" },
      story: {
        de: "Hände, die teilen. Ein Anstoßen, ein Lachen, ein Stück Kuchen am Nachmittag. Hier zählen die kleinen Begegnungen.",
        en: "Hands that share. A toast, a laugh, a slice of cake in the afternoon. The small encounters are what matter.",
      },
      shots: [
        { src: cheersTable, alt: { de: "Anstoßen am Tisch", en: "Cheers at the table" }, size: "tall" },
        { src: maniMangianoCibo, alt: { de: "Hände beim Essen", en: "Hands during a meal" }, size: "tall" },
        { src: tavolata, alt: { de: "Tafel mit vegetarischen Gerichten", en: "Table with vegetarian dishes" }, size: "wide" },
        { src: torta, alt: { de: "Hausgemachte Torte", en: "Homemade cake" }, size: "square" },
        { src: foodDetail, alt: { de: "Detail eines Gerichts", en: "Dish detail" }, size: "square" },
        { src: diningScene, alt: { de: "Gäste im Café", en: "Guests in the café" }, size: "wide" },
      ],
    },
  ];

  const aspect = (size?: "wide" | "tall" | "square") =>
    size === "wide" ? "aspect-[16/10]" : size === "square" ? "aspect-square" : "aspect-[4/5]";

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={language === "de" ? "Galerie" : "Gallery"}
        description={
          language === "de"
            ? "Eine bildhafte Reise durch My Secret Garden im Raimundhof: Eingang, Räume, Teller und geteilte Momente."
            : "A visual journey through My Secret Garden in Raimundhof: entrance, rooms, plates and shared moments."
        }
        path="/gallery"
      />
      <SkipLink />
      <Navigation />
      <main id="main-content" tabIndex={-1} className="pt-20 focus:outline-none">
        {/* Hero */}
        <section className="relative overflow-hidden border-b border-border/70 bg-section-soft py-16 md:py-24">
          <div className="container mx-auto max-w-5xl px-4 text-center">
            <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
              {language === "de" ? "Bilder aus dem Garten" : "Pictures from the garden"}
            </span>
            <h1 className="mt-4 font-caveat text-5xl leading-none text-primary md:text-7xl lg:text-8xl">
              {language === "de" ? "Galerie" : "Gallery"}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl font-lora text-xl leading-relaxed text-foreground/85 md:text-2xl">
              {language === "de"
                ? "Eine ruhige Reise in vier Kapiteln: vom Eingang in den Hof, durch die Räume, an die Teller und an den Tisch."
                : "A quiet journey in four chapters: from the entrance into the courtyard, through the rooms, to the plates and to the table."}
            </p>
          </div>
        </section>

        {/* Chapters */}
        {chapters.map((chapter, index) => (
          <section
            key={chapter.title.en}
            className={`${index % 2 === 0 ? "bg-background" : "bg-section-soft"} py-20 md:py-28`}
          >
            <div className="container mx-auto max-w-6xl px-4">
              <Reveal>
                <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
                  <span className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {chapter.kicker[language]}
                  </span>
                  <h2 className="mt-3 font-cormorant text-4xl font-semibold leading-tight text-primary md:text-5xl">
                    {chapter.title[language]}
                  </h2>
                  <p className="mt-5 font-lora text-lg leading-relaxed text-foreground/80 md:text-xl">
                    {chapter.story[language]}
                  </p>
                </div>
              </Reveal>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
                {chapter.shots.map((shot, i) => {
                  const isWide = shot.size === "wide";
                  return (
                    <Reveal
                      key={shot.src}
                      delay={i * 90}
                      className={isWide ? "md:col-span-2 lg:col-span-2" : ""}
                    >
                      <figure className="overflow-hidden rounded-lg border border-border/75 bg-card shadow-card">
                        <img
                          src={shot.src}
                          alt={shot.alt[language]}
                          loading="lazy"
                          className={`${aspect(shot.size)} w-full object-cover`}
                        />
                        <figcaption className="px-4 py-3 font-work text-xs leading-relaxed text-muted-high-contrast">
                          {shot.alt[language]}
                        </figcaption>
                      </figure>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          </section>
        ))}

        <CTAEndBlock />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default Gallery;
