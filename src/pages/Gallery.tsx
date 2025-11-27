import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

// Import all images
import alpenpolenta from "@/assets/alpenpolenta.jpg";
import entranceGarden from "@/assets/entrance-garden.jpg";
import foodBowl from "@/assets/food-bowl-real.jpg";
import foodDetail from "@/assets/food-detail-real.jpg";
import foodGarden from "@/assets/food-garden.jpg";
import garden from "@/assets/garden-real.jpg";
import heroFood from "@/assets/hero-food.jpg";
import heroGarden from "@/assets/hero-garden.jpg";
import heroInterior from "@/assets/hero-interior.jpg";
import interior from "@/assets/interior-real.jpg";
import koreanBowl from "@/assets/korean-bowl.jpg";
import minnesotaBowl from "@/assets/minnesota-bowl.jpg";
import poppyFlower from "@/assets/poppy-flower-real.jpg";
import sriChinmoy from "@/assets/sri-chinmoy.jpg";
import team from "@/assets/team-real.jpg";

const Gallery = () => {
  const { language } = useLanguage();

  // Gallery images for scroll-based display
  const galleryImages = [
    { src: entranceGarden, position: "center 40%" },
    { src: foodBowl, position: "center center" },
    { src: garden, position: "center 45%" },
    { src: koreanBowl, position: "center center" },
    { src: interior, position: "center 55%" },
    { src: minnesotaBowl, position: "center center" },
    { src: foodDetail, position: "center center" },
    { src: poppyFlower, position: "center 40%" },
    { src: alpenpolenta, position: "center center" },
    { src: heroFood, position: "center center" },
    { src: foodGarden, position: "center 45%" },
    { src: heroGarden, position: "center 45%" },
    { src: heroInterior, position: "center 55%" },
    { src: team, position: "center 40%" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Minimal Title - Fixed Position */}
      <div className="fixed top-20 md:top-24 left-0 right-0 z-30 pointer-events-none">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-caveat text-background drop-shadow-2xl">
            {language === "de" ? "Galerie" : "Gallery"}
          </h1>
        </div>
      </div>

      {/* Scroll-Based Immersive Gallery */}
      <div className="relative">
        {galleryImages.map((image, index) => (
          <section
            key={index}
            className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden snap-start"
          >
            {/* Full-screen background image */}
            <div
              className="absolute inset-0 transition-transform duration-700"
              style={{
                backgroundImage: `url(${image.src})`,
                backgroundSize: "cover",
                backgroundPosition: image.position,
                backgroundAttachment: "scroll",
              }}
            />
            
            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30" />
          </section>
        ))}
      </div>

      {/* Instagram Call to Action */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8 md:space-y-12 stagger-children in-view">
            <div className="inline-block p-4 bg-primary/10 rounded-full">
              <Instagram className="w-12 h-12 md:w-16 md:h-16 text-primary" />
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-caveat font-bold text-primary leading-tight">
              {language === "de" ? "Folgen Sie uns auf Instagram" : "Follow us on Instagram"}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl font-lora text-muted-foreground leading-relaxed">
              {language === "de"
                ? "Bleiben Sie auf dem Laufenden mit unseren neuesten Kreationen, Tagesmenüs und Einblicken in unseren Garten."
                : "Stay up to date with our latest creations, daily menus and insights into our garden."}
            </p>
            <Button
              size="lg"
              onClick={() => window.open("https://www.instagram.com/mysecretgardencafewien/", "_blank")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg font-lora text-base sm:text-lg md:text-xl px-10 py-6 md:py-8 gap-3"
            >
              <Instagram className="w-5 h-5 md:w-6 md:h-6" />
              @mysecretgardencafewien
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
