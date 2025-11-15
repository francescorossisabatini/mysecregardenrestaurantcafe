import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DetailedFlower, RoseFlower, FlowingLines } from "@/components/FloralDecorations";

const images = [
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2020/02/vegetarisches-restaurant-wien.jpg",
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2024/12/SecretGardenTeam3-1500x630.jpg",
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2020/04/header-1500x630.jpg",
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2020/09/Gastgarten.jpg",
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              idx === currentImage ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={img}
              alt="Secret Garden Restaurant"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/40 to-background/95" />
          </div>
        ))}
      </div>

      {/* Decorative Flowers and Lines - Maggiore contrasto per accessibilità */}
      <div className="absolute top-0 left-0 right-0 h-32 text-emerald-600 z-10 opacity-70">
        <FlowingLines className="w-full h-full" />
      </div>
      <div className="absolute top-16 right-8 w-24 h-24 text-blue-600 z-10 opacity-80">
        <DetailedFlower className="w-full h-full" />
      </div>
      <div className="absolute bottom-32 left-8 w-28 h-28 text-teal-600 z-10 opacity-80">
        <RoseFlower className="w-full h-full" />
      </div>
      <div className="absolute top-1/3 right-1/4 w-20 h-20 text-cyan-600 z-10 opacity-75">
        <DetailedFlower className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground drop-shadow-lg">
            <span className="font-dancing text-5xl md:text-7xl lg:text-8xl">{t("hero.title")}</span>
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/95 font-light">
            {t("hero.subtitle")}
          </p>

          <div className="space-y-3 text-primary-foreground/90 text-sm md:text-base pt-4">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{t("hero.address")}</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>{t("hero.hours")}</span>
            </div>
            <a
              href="tel:015862839"
              className="flex items-center justify-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>01 586 28 39</span>
            </a>
          </div>

          <div className="pt-6 flex justify-center">
            <Button
              size="lg"
              variant="default"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-elevated text-lg px-12"
              asChild
            >
              <a href="#full-menu">{t("hero.menu")}</a>
            </Button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-2 h-2 rounded-full transition-all ${
                idx === currentImage
                  ? "bg-accent w-8"
                  : "bg-primary-foreground/40 hover:bg-primary-foreground/60"
              }`}
              aria-label={`Go to image ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
