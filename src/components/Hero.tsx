import { Button } from "@/components/ui/button";
import { Phone, MapPin, Clock } from "lucide-react";
import { useState, useEffect } from "react";

const images = [
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2020/02/vegetarisches-restaurant-wien.jpg",
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2024/12/SecretGardenTeam3-1500x630.jpg",
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2020/04/header-1500x630.jpg",
  "https://www.secretgardenrestaurant.at/wp-content/uploads/2020/09/Gastgarten.jpg",
];

export const Hero = () => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
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

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12 text-center animate-fade-in">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground drop-shadow-lg">
            My Secret Garden
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/95 font-light">
            Vegetarisches & Veganes Restaurant
          </p>

          <div className="space-y-3 text-primary-foreground/90 text-sm md:text-base pt-4">
            <div className="flex items-center justify-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Mariahilferstraße 45 – Im Raimundhof – 1060 Wien</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-5 h-5" />
              <span>Geöffnet Mo-Sa von 11-19 Uhr</span>
            </div>
            <a
              href="tel:015862839"
              className="flex items-center justify-center gap-2 hover:text-accent transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>01 586 28 39</span>
            </a>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="default"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-elevated"
              asChild
            >
              <a href="#menu">Zur Speisekarte</a>
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="bg-card/90 hover:bg-card text-card-foreground shadow-soft backdrop-blur-sm"
              asChild
            >
              <a href="#about">Über Uns</a>
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
