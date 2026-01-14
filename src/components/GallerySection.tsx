import { useLanguage } from "@/contexts/LanguageContext";

// Import gallery images - curated selection avoiding redundancy
import entranceGarden from "@/assets/entrance-garden.jpg";
import foodBowl from "@/assets/food-bowl-real.jpg";
import foodDetail from "@/assets/food-detail-real.jpg";
import poppyFlower from "@/assets/poppy-flower-real.jpg";
import alpenpolenta from "@/assets/alpenpolenta.jpg";
import curryOfTheDay from "@/assets/curry-of-the-day.jpg";
// New images - replacing redundant ones
import dalRiceBowl from "@/assets/dal-rice-bowl.jpg";
import tableSpreadMenu from "@/assets/table-spread-menu.jpg";
import diningScene from "@/assets/dining-scene.jpg";

export const GallerySection = () => {
  const { language } = useLanguage();

  // Images organized in rows with layout hints
  // Fresh selection avoiding redundancy with Hero and other pages
  const galleryRows = [
    // Row 1: Full width - dining scene with people
    { layout: "full", images: [{ src: diningScene, alt: "Guests enjoying vegan dishes" }] },
    
    // Row 2: Pair - food focus
    { layout: "pair", images: [
      { src: foodBowl, alt: "Fresh bowl creation" },
      { src: dalRiceBowl, alt: "Dal with rice and pomegranate" }
    ]},
    
    // Row 3: Full - torta/quiche - hero shot
    { layout: "full", images: [{ src: curryOfTheDay, alt: "Torta del giorno" }] },
    
    // Row 4: Pair - table spread + polenta
    { layout: "pair", images: [
      { src: tableSpreadMenu, alt: "Selection of vegan dishes" },
      { src: alpenpolenta, alt: "Alpenpolenta" }
    ]},
    
    // Row 5: Full - entrance
    { layout: "full", images: [{ src: entranceGarden, alt: "Entrance to the secret garden" }] },
    
    // Row 6: Triple - details
    { layout: "triple", images: [
      { src: foodDetail, alt: "Food detail" },
      { src: poppyFlower, alt: "Poppy flower" },
      { src: foodBowl, alt: "Bowl detail" }
    ]},
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      {/* Single static inspirational quote */}
      <div className="container mx-auto max-w-3xl text-center px-6 mb-12 md:mb-16">
        <blockquote className="font-caveat text-2xl md:text-3xl text-muted-foreground italic">
          {language === "de" 
            ? "Das Gute in anderen zu sehen, ist der Anfang von Frieden." 
            : "To see the good in others is the beginning of peace."}
        </blockquote>
        <cite className="block mt-3 text-sm text-muted-foreground font-lora tracking-wide">
          — Sri Chinmoy
        </cite>
      </div>

      {/* Gallery - Organic, breathing layout */}
      <div className="px-5 md:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto space-y-5 md:space-y-6">
          {galleryRows.map((row, rowIndex) => {
            // Full width image
            if (row.layout === "full") {
              return (
                <div key={rowIndex} className="w-full">
                  <div className="relative overflow-hidden aspect-[4/3] md:aspect-[16/9]">
                    <img
                      src={row.images[0].src}
                      alt={row.images[0].alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </div>
              );
            }

            // Pair layout
            if (row.layout === "pair") {
              return (
                <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  {row.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative overflow-hidden aspect-[4/5]">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            // Triple layout - 3 columns on desktop, stacked on mobile
            if (row.layout === "triple") {
              return (
                <div key={rowIndex} className="space-y-5 md:space-y-0 md:grid md:grid-cols-3 md:gap-6">
                  {row.images.map((image, imgIndex) => (
                    <div key={imgIndex} className="relative overflow-hidden aspect-[4/5] md:aspect-square">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              );
            }

            return null;
          })}
        </div>
      </div>
    </section>
  );
};
