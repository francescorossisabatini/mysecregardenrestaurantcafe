import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram } from "lucide-react";

// Import all images
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
import team from "@/assets/team-real.jpg";
import alpenpolenta from "@/assets/alpenpolenta.jpg";

const Gallery = () => {
  const { language } = useLanguage();

  // Gallery images - curated selection
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
    { src: heroInterior, alt: "Interior ambiance" },
    { src: team, alt: "Our team" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Page Header - Simple & Clean */}
      <header className="pt-32 md:pt-40 pb-12 md:pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-caveat text-foreground text-center">
            {language === "de" ? "Galerie" : "Gallery"}
          </h1>
        </div>
      </header>

      {/* Optional: Single inspirational quote - static, before gallery */}
      <section className="pb-16 md:pb-24 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <blockquote className="font-caveat text-2xl md:text-3xl text-muted-foreground/80 italic">
            "Das Gute in anderen zu sehen, ist der Anfang von Frieden."
          </blockquote>
          <cite className="block mt-4 text-sm text-muted-foreground/60 font-lora tracking-wide">
            — Sri Chinmoy
          </cite>
        </div>
      </section>

      {/* Gallery Grid - Breathing, Silent, Evocative */}
      <section className="px-4 md:px-8 lg:px-12 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
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
      </section>

      {/* Instagram Call to Action - Minimal */}
      <section className="py-20 md:py-32 px-6 bg-muted/30">
        <div className="container mx-auto max-w-2xl text-center">
          <div className="mb-8 inline-flex items-center justify-center p-4 border border-primary/20 rounded-full">
            <Instagram className="w-8 h-8 text-primary" strokeWidth={1.5} />
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-caveat text-foreground mb-4">
            {language === "de" ? "Mehr entdecken" : "Discover More"}
          </h2>
          
          <p className="text-muted-foreground font-lora mb-8 max-w-md mx-auto">
            {language === "de"
              ? "Folgen Sie uns für frische Inspiration aus unserem geheimen Garten."
              : "Follow us for fresh inspiration from our secret garden."}
          </p>
          
          <button
            onClick={() => window.open("https://www.instagram.com/mysecretgardencafewien/", "_blank")}
            className="inline-flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground font-lora text-sm tracking-wide hover:bg-primary/90 transition-colors duration-300 rounded-sm"
          >
            <Instagram className="w-4 h-4" />
            <span>@mysecretgardencafewien</span>
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
