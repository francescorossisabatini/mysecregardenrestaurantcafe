import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

// Import gallery images - curated selection avoiding redundancy
import entranceGarden from "@/assets/entrance-garden.webp";
import foodDetail from "@/assets/food-detail-real.jpg";
import curryOfTheDay from "@/assets/curry-of-the-day.webp";
import diningScene from "@/assets/dining-scene.jpg";
import piattoBowlBlue from "@/assets/piatto-bowl-blue.jpg";
import dalRiceBowl from "@/assets/dal-rice-bowl.jpg";
import tavolata from "@/assets/tavolata-3.jpg";
import torta from "@/assets/torta-2.jpg";
import maniMangianoCibo from "@/assets/primo-piano-mani-mangiano-cibo.jpg";
import gastgarten from "@/assets/gastgarten.jpg";

const GalleryReveal = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.24, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transform-gpu transition-all duration-1000 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:blur-0 ${
        isVisible ? "translate-y-0 opacity-100 blur-0" : "translate-y-10 opacity-0 blur-sm"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ImageFrame = ({ src, alt, ratio = "aspect-[4/5]" }: { src: string; alt: string; ratio?: string }) => (
  <div className={`group relative overflow-hidden rounded-2xl bg-muted shadow-card ${ratio}`}>
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-cover transition-[filter] duration-700 ease-out group-hover:saturate-110"
      loading="lazy"
    />
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/18 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
  </div>
);

export const GallerySection = () => {
  const { language } = useLanguage();

  // Images organized in rows with layout hints
  // Fresh selection avoiding redundancy with Hero and other pages
  const galleryRows = [
    // Row 1: Full width - dining scene with people
    { layout: "full", images: [{ src: diningScene, alt: "Guests enjoying vegan dishes" }] },
    
    // Row 2: Pair - food focus
    { layout: "pair", images: [
      { src: piattoBowlBlue, alt: "Blue plate bowl with salad and vegetables" },
      { src: dalRiceBowl, alt: "Dal and rice bowl" }
    ]},
    
    // Row 3: Full - torta/quiche - hero shot
    { layout: "full", images: [{ src: curryOfTheDay, alt: "Torta del giorno" }] },
    
    // Row 4: Pair - table spread + polenta
    { layout: "pair", images: [
      { src: tavolata, alt: "Table with several vegetarian dishes" },
      { src: torta, alt: "Homemade cake with berries and coconut" }
    ]},
    
    // Row 5: Full - entrance
    { layout: "full", images: [{ src: entranceGarden, alt: "Entrance to the secret garden" }] },

    // Row 6: Full - courtyard garden
    { layout: "full", images: [{ src: gastgarten, alt: "Courtyard garden with outdoor seating" }] },
    
    // Row 7: Triple - details
    { layout: "triple", images: [
      { src: foodDetail, alt: "Food detail" },
      { src: maniMangianoCibo, alt: "Guest eating vegetarian food" }
    ]},
  ];

  return (
    <section id="gallery" className="overflow-hidden bg-background py-16 md:py-24">
      <div className="container mx-auto max-w-3xl px-6 text-center mb-12 md:mb-16 rounded-2xl border border-border/70 bg-card/45 py-8 shadow-card md:py-10">
        <p className="mb-3 font-work text-xs font-semibold uppercase tracking-[0.12em] text-accent">
          {language === "de" ? "Ein Blick in den Garten" : "A glimpse into the garden"}
        </p>
        <h2 className="font-cormorant text-3xl md:text-4xl font-semibold text-foreground mb-4">
          {language === "de" ? "Teller, Tische, kleine Spuren" : "Plates, tables, small traces"}
        </h2>
        <p className="mx-auto max-w-2xl font-work text-sm md:text-base leading-relaxed text-muted-foreground mb-8">
          {language === "de"
            ? "Ein paar Bilder aus dem Alltag: Schüsseln am Tisch, Blumen am Eingang, Licht im Hof. Nicht alles ist gestellt. Genau das mögen wir."
            : "A few pictures from daily life: bowls on the table, flowers by the entrance, light in the courtyard. Not everything is staged. We like that."}
        </p>
        <blockquote className="font-caveat text-2xl md:text-3xl text-foreground/80 italic">
          {language === "de" 
            ? "Das Gute in anderen zu sehen, ist der Anfang von Frieden." 
            : "To see the good in others is the beginning of peace."}
        </blockquote>
        <cite className="block mt-3 text-sm text-muted-foreground font-lora font-medium tracking-wide">
          Sri Chinmoy
        </cite>
      </div>

      {/* Gallery - Organic, breathing layout */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="mx-auto max-w-6xl space-y-5 md:space-y-7">
          {galleryRows.map((row, rowIndex) => {
            // Full width image
            if (row.layout === "full") {
              return (
                <GalleryReveal key={rowIndex} delay={rowIndex * 90} className="w-full">
                  <ImageFrame src={row.images[0].src} alt={row.images[0].alt} ratio="aspect-[4/3] md:aspect-[16/9]" />
                </GalleryReveal>
              );
            }

            // Pair layout
            if (row.layout === "pair") {
              return (
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {row.images.map((image, imgIndex) => (
                    <GalleryReveal key={imgIndex} delay={imgIndex * 120}>
                      <ImageFrame src={image.src} alt={image.alt} />
                    </GalleryReveal>
                  ))}
                </div>
              );
            }

            // Triple layout - up to 3 columns on desktop, stacked on mobile
            if (row.layout === "triple") {
              return (
                <div key={rowIndex} className="space-y-5 md:space-y-0 md:grid md:grid-cols-2 md:gap-6">
                  {row.images.map((image, imgIndex) => (
                    <GalleryReveal key={imgIndex} delay={imgIndex * 100}>
                      <ImageFrame src={image.src} alt={image.alt} ratio="aspect-[4/5] md:aspect-square" />
                    </GalleryReveal>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Instagram CTA */}
        <div className="max-w-xl mx-auto text-center mt-12 md:mt-16 space-y-4">
          <p className="font-lora text-lg text-foreground/80">
            {language === "de" 
              ? "Mehr vom heutigen Tresen" 
              : "More from today’s counter"}
          </p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/30 bg-card/70 hover:bg-primary/5 text-foreground font-work"
            asChild
          >
            <a
              href={SITE.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="w-5 h-5 mr-2" />
              {language === "de" ? "Folge uns auf Instagram" : "Follow us on Instagram"}
            </a>
          </Button>
          <p className="text-sm text-muted-foreground font-work">
            {SITE.instagramHandle}
          </p>
        </div>
      </div>
    </section>
  );
};
