import { useLanguage } from "@/contexts/LanguageContext";

// Import gallery images
import entranceGarden from "@/assets/entrance-garden.jpg";
import foodBowl from "@/assets/food-bowl-real.jpg";
import foodDetail from "@/assets/food-detail-real.jpg";
import foodGarden from "@/assets/food-garden.jpg";
import garden from "@/assets/garden-real.jpg";
import heroFood from "@/assets/hero-food.jpg";
import heroGarden from "@/assets/hero-garden.jpg";
import interior from "@/assets/interior-real.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";
import minnesotaBowl from "@/assets/minnesota-bowl.jpg";
import poppyFlower from "@/assets/poppy-flower-real.jpg";
import alpenpolenta from "@/assets/alpenpolenta.jpg";

export const GallerySection = () => {
  const { language } = useLanguage();

  // Curated selection of images
  const galleryImages = [
    { src: entranceGarden, alt: "Entrance to the secret garden" },
    { src: foodBowl, alt: "Fresh bowl creation" },
    { src: garden, alt: "Garden atmosphere" },
    { src: koreanBowl, alt: "Korean inspired dish" },
    { src: interior, alt: "Cozy interior" },
    { src: minnesotaBowl, alt: "Minnesota bowl" },
    { src: foodDetail, alt: "Food detail" },
    { src: poppyFlower, alt: "Poppy flower" },
    { src: alpenpolenta, alt: "Alpenpolenta" },
    { src: heroFood, alt: "Signature dish" },
    { src: foodGarden, alt: "Food in garden setting" },
    { src: heroGarden, alt: "Garden view" },
  ];

  return (
    <section id="gallery" className="py-16 md:py-24 bg-background">
      {/* Optional: Single static inspirational quote */}
      <div className="container mx-auto max-w-3xl text-center px-6 mb-12 md:mb-16">
        <blockquote className="font-caveat text-2xl md:text-3xl text-muted-foreground/80 italic">
          "Das Gute in anderen zu sehen, ist der Anfang von Frieden."
        </blockquote>
        <cite className="block mt-3 text-sm text-muted-foreground/60 font-lora tracking-wide">
          — Sri Chinmoy
        </cite>
      </div>

      {/* Gallery Grid - Breathing, Silent, Evocative */}
      <div className="px-4 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="relative overflow-hidden aspect-[4/5] group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
