import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Instagram } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [visibleWords, setVisibleWords] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Sri Chinmoy quote - split into words
  const quote = "Das Gute in anderen zu sehen, ist der Anfang von Frieden.";
  const words = quote.split(" ");

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

  const [quoteVisible, setQuoteVisible] = useState(true);
  const [titleVisible, setTitleVisible] = useState(true);

  // Track scroll position to reveal words progressively
  useEffect(() => {
    const handleScroll = () => {
      if (!galleryRef.current) return;
      
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      
      // Calculate which image is currently visible (0-indexed)
      const currentImageIndex = Math.floor(scrollTop / viewportHeight);
      
      // Hide title after first image
      setTitleVisible(currentImageIndex < 1);
      
      // Hide quote before 14th image (index 13)
      setQuoteVisible(currentImageIndex < 13);
      
      // Start showing words from second image (index 1)
      // Complete phrase before 13th image (index 12) - distribute across images 1 to 11
      const endImageIndex = 11;
      const startImageIndex = 1;
      const imagesForQuote = endImageIndex - startImageIndex;
      const wordsPerImage = words.length / imagesForQuote;
      const wordsToShow = Math.min(
        Math.floor(Math.max(0, currentImageIndex - startImageIndex) * wordsPerImage),
        words.length
      );
      
      setVisibleWords(wordsToShow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [words.length, galleryImages.length]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Minimal Title - Fixed Position */}
      <div className={`fixed top-24 md:top-28 left-0 right-0 z-30 pointer-events-none transition-opacity duration-500 ${
        titleVisible ? "opacity-100" : "opacity-0"
      }`}>
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-caveat text-background drop-shadow-2xl">
            {language === "de" ? "Galerie" : "Gallery"}
          </h1>
        </div>
      </div>

      {/* Sri Chinmoy Quote - Progressive Reveal with Fade Out */}
      <div className={`fixed top-1/3 left-0 right-0 z-20 pointer-events-none px-6 md:px-12 lg:px-20 transition-opacity duration-700 ${
        quoteVisible ? "opacity-100" : "opacity-0"
      }`}>
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap gap-2 md:gap-3 lg:gap-4 justify-start md:justify-center items-center">
            {words.map((word, index) => (
              <span
                key={index}
                className={`font-caveat font-bold text-3xl md:text-5xl lg:text-6xl xl:text-7xl transition-all duration-700 ${
                  index < visibleWords
                    ? "opacity-100 blur-0 translate-y-0"
                    : "opacity-0 blur-md translate-y-4"
                }`}
                style={{
                  color: "white",
                  textShadow: "0 2px 8px rgba(0,0,0,0.9), 0 4px 16px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.5)",
                  transitionDelay: `${(index % 3) * 100}ms`,
                }}
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll-Based Immersive Gallery */}
      <div ref={galleryRef} className="relative">
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

      {/* Instagram Call to Action - Evocative & Mobile-First */}
      <section className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-primary/5">
        {/* Soft gradient background using site palette */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-accent/10" />
        
        {/* Decorative glow elements */}
        <div className="absolute top-10 left-4 md:top-20 md:left-10 w-32 md:w-64 h-32 md:h-64 bg-primary/15 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-40 md:w-80 h-40 md:h-80 bg-accent/10 rounded-full blur-3xl" />
        
        {/* Floating botanicals - hidden on small mobile */}
        <svg className="hidden sm:block absolute top-1/4 left-[5%] w-12 md:w-20 h-12 md:h-20 text-primary/10 animate-gentle-float" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C35 30, 35 50, 50 70 C65 50, 65 30, 50 10" />
        </svg>
        <svg className="hidden sm:block absolute bottom-1/4 right-[10%] w-10 md:w-16 h-10 md:h-16 text-primary/10 animate-gentle-float" style={{ animationDelay: "2s" }} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C35 30, 35 50, 50 70 C65 50, 65 30, 50 10" />
        </svg>

        <div className="relative z-10 container mx-auto px-5 py-12 md:py-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Minimal icon */}
            <div className="mb-8 md:mb-12 relative inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150" />
              <div className="relative p-4 md:p-6 border border-primary/30 rounded-full bg-background/50 backdrop-blur-sm">
                <Instagram className="w-8 h-8 md:w-12 md:h-12 text-primary" strokeWidth={1.5} />
              </div>
            </div>

            {/* Headline - mobile optimized */}
            <div className="mb-6 md:mb-8">
              <span className="block text-xs md:text-sm font-lora tracking-[0.2em] md:tracking-[0.3em] uppercase text-muted-foreground mb-3 md:mb-4">
                {language === "de" ? "Entdecken Sie mehr" : "Discover more"}
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-caveat text-foreground leading-tight">
                {language === "de" ? "Folgen Sie" : "Follow the"}
              </h2>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-caveat text-primary leading-tight mt-1">
                {language === "de" ? "unserer Reise" : "Journey"}
              </h2>
            </div>

            {/* Description - mobile optimized */}
            <p className="text-base md:text-lg lg:text-xl font-lora text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 md:mb-12 px-2">
              {language === "de"
                ? "Frische Inspiration, saisonale Kreationen und Momente der Ruhe aus unserem geheimen Garten."
                : "Fresh inspiration, seasonal creations and moments of peace from our secret garden."}
            </p>

            {/* CTA button - mobile friendly */}
            <button
              onClick={() => window.open("https://www.instagram.com/mysecretgardencafewien/", "_blank")}
              className="group inline-flex items-center gap-3 px-6 md:px-8 py-4 md:py-5 bg-primary text-primary-foreground font-lora text-sm md:text-base tracking-wide hover:bg-primary/90 transition-all duration-300 rounded-sm shadow-lg hover:shadow-xl"
            >
              <Instagram className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform duration-300" />
              <span>@mysecretgardencafewien</span>
            </button>

            {/* Subtle signature */}
            <p className="mt-10 md:mt-16 text-muted-foreground/50 text-xs md:text-sm font-lora tracking-widest">
              My Secret Garden Wien
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Gallery;
