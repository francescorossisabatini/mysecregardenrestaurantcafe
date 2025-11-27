import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";
import { SpiritualAnimations } from "@/components/SpiritualAnimations";

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

  const galleryImages = [
    { src: entranceGarden, alt: "Entrance Garden" },
    { src: foodBowl, alt: "Food Bowl" },
    { src: koreanBowl, alt: "Korean Bowl" },
    { src: minnesotaBowl, alt: "Minnesota Bowl" },
    { src: alpenpolenta, alt: "Alpenpolenta" },
    { src: foodDetail, alt: "Food Detail" },
    { src: heroFood, alt: "Signature Dish" },
    { src: foodGarden, alt: "Garden Food" },
    { src: garden, alt: "Secret Garden" },
    { src: heroGarden, alt: "Garden View" },
    { src: interior, alt: "Interior" },
    { src: heroInterior, alt: "Restaurant Interior" },
    { src: poppyFlower, alt: "Poppy Flower" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-16 overflow-hidden bg-gradient-to-br from-cream via-background to-accent/5">
        <SpiritualAnimations variant="meditation-lines" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-7xl font-caveat font-bold text-primary">
              {language === "de" ? "Galerie" : "Gallery"}
            </h1>
            <p className="text-lg md:text-xl font-lora text-muted-foreground">
              {language === "de"
                ? "Entdecken Sie unsere kulinarischen Kreationen und die friedliche Atmosphäre unseres Gartens"
                : "Discover our culinary creations and the peaceful atmosphere of our garden"}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Gestalt: Proximity & Similarity */}
      <section className="py-12 md:py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-block p-4 bg-primary/10 rounded-full">
              <Instagram className="w-12 h-12 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-caveat font-bold text-primary">
              {language === "de" ? "Folgen Sie uns auf Instagram" : "Follow us on Instagram"}
            </h2>
            <p className="text-lg font-lora text-muted-foreground">
              {language === "de"
                ? "Bleiben Sie auf dem Laufenden mit unseren neuesten Kreationen, Tagesmenüs und Einblicken in unseren Garten."
                : "Stay up to date with our latest creations, daily menus and insights into our garden."}
            </p>
            <Button
              size="lg"
              onClick={() => window.open("https://www.instagram.com/mysecretgardencafewien/", "_blank")}
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg font-semibold text-lg px-8 py-6 gap-2"
            >
              <Instagram className="w-5 h-5" />
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
