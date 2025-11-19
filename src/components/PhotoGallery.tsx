import { useLanguage } from "@/contexts/LanguageContext";
import { BotanicalDecoration } from "./BotanicalDecoration";
import gardenImg from "@/assets/garden-real.jpg";
import foodBowlImg from "@/assets/food-bowl-real.jpg";
import interiorImg from "@/assets/interior-real.jpg";
import foodDetailImg from "@/assets/food-detail-real.jpg";
import poppyImg from "@/assets/poppy-flower-real.jpg";
import teamImg from "@/assets/team-real.jpg";

export const PhotoGallery = () => {
  const { language } = useLanguage();

  const galleryImages = [
    { src: gardenImg, alt: "Secret Garden Innenhof" },
    { src: foodBowlImg, alt: "Vegetarisches Gericht" },
    { src: interiorImg, alt: "Restaurant Innenraum" },
    { src: foodDetailImg, alt: "Frische Zutaten" },
    { src: poppyImg, alt: "Blumendekoration" },
    { src: teamImg, alt: "Unser Team" },
  ];

  return (
    <section className="py-12 md:py-16 bg-cream relative overflow-hidden">
      {/* Botanical decorations */}
      <div className="absolute top-6 left-6 w-20 h-20 opacity-10">
        <BotanicalDecoration variant="flower" className="w-full h-full text-primary" />
      </div>
      <div className="absolute bottom-6 right-6 w-16 h-16 opacity-10">
        <BotanicalDecoration variant="leaf" className="w-full h-full text-accent" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Botanical frame border */}
        <div className="border border-primary/20 rounded-2xl p-6 md:p-10 bg-background/30 shadow-sm">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-3">
              {language === 'de' ? 'Impressionen' : 'Impressions'}
            </h2>
            <div className="w-16 h-1 bg-accent mx-auto rounded-full" />
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {galleryImages.map((image, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
