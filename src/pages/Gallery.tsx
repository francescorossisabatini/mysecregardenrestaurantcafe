import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Instagram, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
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
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Gallery images for carousel
  const galleryImages = [
    { src: entranceGarden, alt: language === "de" ? "Garteneingang" : "Garden Entrance", position: "center 40%" },
    { src: foodBowl, alt: language === "de" ? "Bowl des Tages" : "Daily Bowl", position: "center center" },
    { src: garden, alt: language === "de" ? "Geheimer Garten" : "Secret Garden", position: "center 45%" },
    { src: koreanBowl, alt: language === "de" ? "Koreanische Bowl" : "Korean Bowl", position: "center center" },
    { src: interior, alt: language === "de" ? "Innenbereich" : "Interior Space", position: "center 55%" },
    { src: minnesotaBowl, alt: language === "de" ? "Minnesota Bowl" : "Minnesota Bowl", position: "center center" },
    { src: foodDetail, alt: language === "de" ? "Kulinarische Details" : "Culinary Details", position: "center center" },
    { src: poppyFlower, alt: language === "de" ? "Mohnblume im Garten" : "Poppy in Garden", position: "center 40%" },
    { src: alpenpolenta, alt: language === "de" ? "Alpenpolenta" : "Alpine Polenta", position: "center center" },
    { src: heroFood, alt: language === "de" ? "Signature Gericht" : "Signature Dish", position: "center center" },
    { src: foodGarden, alt: language === "de" ? "Essen im Garten" : "Garden Dining", position: "center 45%" },
    { src: heroGarden, alt: language === "de" ? "Gartenblick" : "Garden View", position: "center 45%" },
    { src: heroInterior, alt: language === "de" ? "Gemütliche Atmosphäre" : "Cozy Atmosphere", position: "center 55%" },
    { src: team, alt: language === "de" ? "Unser Team" : "Our Team", position: "center 40%" },
  ];

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % galleryImages.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [isAutoPlaying, galleryImages.length]);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextImage();
    }
    if (touchStart - touchEnd < -75) {
      prevImage();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Immersive Full-Screen Gallery Carousel */}
      <section 
        className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background carousel - fullscreen with smooth transitions */}
        {galleryImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[2500ms] ease-in-out ${
              currentImage === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            style={{
              backgroundImage: `url(${image.src})`,
              backgroundSize: "cover",
              backgroundPosition: image.position,
            }}
          />
        ))}

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-16">
          <div className="max-w-5xl mx-auto">
            {/* Title Section */}
            <div className="text-center space-y-4 mb-12 md:mb-16">
              <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-caveat font-bold text-background drop-shadow-2xl leading-[0.9]">
                {language === "de" ? "Galerie" : "Gallery"}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl font-lora text-background/90 drop-shadow-lg max-w-3xl mx-auto">
                {language === "de"
                  ? "Entdecken Sie unsere kulinarischen Kreationen und die friedliche Atmosphäre"
                  : "Discover our culinary creations and peaceful atmosphere"}
              </p>
            </div>

            {/* Image Counter & Caption */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="bg-background/10 backdrop-blur-md px-6 py-3 rounded-full border border-background/20">
                <p className="text-background font-lora text-sm md:text-base font-medium">
                  {currentImage + 1} / {galleryImages.length}
                </p>
              </div>
              <div className="bg-background/10 backdrop-blur-md px-8 py-4 rounded-2xl border border-background/20 max-w-md">
                <p className="text-background font-lora text-base md:text-lg text-center drop-shadow-lg">
                  {galleryImages[currentImage].alt}
                </p>
              </div>
            </div>

            {/* Desktop Navigation Controls */}
            <div className="hidden md:flex justify-center items-center gap-6 mb-8">
              <button
                onClick={prevImage}
                className="bg-background/15 backdrop-blur-md hover:bg-background/25 text-background border border-background/30 p-4 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="bg-background/15 backdrop-blur-md hover:bg-background/25 text-background border border-background/30 px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                {isAutoPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                <span className="font-lora text-sm">
                  {isAutoPlaying ? (language === "de" ? "Pause" : "Pause") : (language === "de" ? "Abspielen" : "Play")}
                </span>
              </button>

              <button
                onClick={nextImage}
                className="bg-background/15 backdrop-blur-md hover:bg-background/25 text-background border border-background/30 p-4 rounded-full transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Carousel Dots Navigation */}
            <div className="flex gap-2 justify-center flex-wrap max-w-2xl mx-auto">
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`transition-all duration-300 ${
                    currentImage === index
                      ? "bg-background w-12 h-3 rounded-full shadow-lg"
                      : "bg-background/50 hover:bg-background/70 w-3 h-3 rounded-full"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>

            {/* Mobile Swipe Hint */}
            <div className="md:hidden mt-8 text-center">
              <p className="text-background/70 font-lora text-sm drop-shadow">
                {language === "de" ? "← Wischen →" : "← Swipe →"}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile Touch Navigation Zones */}
        <div className="md:hidden absolute inset-0 z-20 flex">
          <button
            onClick={prevImage}
            className="flex-1 opacity-0 active:opacity-10 active:bg-background/20 transition-opacity"
            aria-label="Previous image"
          />
          <button
            onClick={nextImage}
            className="flex-1 opacity-0 active:opacity-10 active:bg-background/20 transition-opacity"
            aria-label="Next image"
          />
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
