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

  // Gallery images with layout sizes for masonry grid
  const galleryImages = [
    { src: entranceGarden, alt: "Entrance Garden", size: "large" },
    { src: foodBowl, alt: "Food Bowl", size: "medium" },
    { src: garden, alt: "Secret Garden", size: "large" },
    { src: koreanBowl, alt: "Korean Bowl", size: "medium" },
    { src: interior, alt: "Interior", size: "large" },
    { src: minnesotaBowl, alt: "Minnesota Bowl", size: "medium" },
    { src: foodDetail, alt: "Food Detail", size: "small" },
    { src: poppyFlower, alt: "Poppy Flower", size: "small" },
    { src: alpenpolenta, alt: "Alpenpolenta", size: "medium" },
    { src: heroFood, alt: "Signature Dish", size: "large" },
    { src: foodGarden, alt: "Garden Food", size: "medium" },
    { src: heroGarden, alt: "Garden View", size: "large" },
    { src: heroInterior, alt: "Interior Atmosphere", size: "medium" },
    { src: team, alt: "Our Team", size: "small" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-br from-cream via-background to-accent/5">
        <SpiritualAnimations variant="meditation-lines" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-6 md:space-y-10 stagger-children in-view">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-caveat font-bold text-primary leading-tight">
              {language === "de" ? "Galerie" : "Gallery"}
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-lora text-muted-foreground leading-relaxed">
              {language === "de"
                ? "Entdecken Sie unsere kulinarischen Kreationen und die friedliche Atmosphäre unseres Gartens"
                : "Discover our culinary creations and the peaceful atmosphere of our garden"}
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid - Immersive Masonry Layout */}
      <section className="py-16 md:py-28 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Masonry-style grid with varying sizes */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, index) => {
              // Define different aspect ratios and spans for visual interest
              const isLarge = image.size === "large";
              const isMedium = image.size === "medium";
              const isSmall = image.size === "small";
              
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-700 cursor-pointer
                    ${isLarge ? "col-span-2 row-span-2" : ""}
                    ${isMedium ? "col-span-1 row-span-1" : ""}
                    ${isSmall ? "col-span-1 row-span-1" : ""}
                  `}
                  style={{ 
                    animation: `smooth-reveal 1800ms cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                    animationDelay: `${index * 80}ms`,
                    opacity: 0
                  }}
                >
                  <div className="relative w-full h-full min-h-[200px] md:min-h-[250px]">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:brightness-110"
                      loading="lazy"
                    />
                    {/* Gradient overlay on hover with smooth transition */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
                    
                    {/* Image caption - appears on hover */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                      <p className="text-background font-lora text-sm md:text-base font-medium drop-shadow-lg">
                        {image.alt}
                      </p>
                    </div>
                    
                    {/* Decorative corner accent */}
                    <div className="absolute top-3 right-3 w-8 h-8 border-t-2 border-r-2 border-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
