import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarDays, MapPin } from "lucide-react";
import { SITE } from "@/config/site";
import curryOfTheDay from "@/assets/curry-of-the-day.webp";
import entranceGarden from "@/assets/entrance-garden.webp";

export const ShowcaseSections = () => {
  const { language } = useLanguage();

  return (
    <>
      {/* SHOWCASE 1: Menu - Image Left, Text Right */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Image */}
            <div>
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={curryOfTheDay} 
                  alt={language === "de" ? "Tagesmenü" : "Today's special"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Text */}
            <div className="space-y-6">
              <span className="text-xs font-work uppercase tracking-widest text-accent">
                {language === "de" ? "Täglich Frisch" : "Fresh Daily"}
              </span>
              <h2 className="text-4xl md:text-5xl text-primary">
                {language === "de" ? "Saisonale Küche" : "Seasonal Kitchen"}
              </h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de" 
                  ? "Jeden Tag kochen wir zwei frische Hauptgerichte und eine Suppe – basierend auf dem, was gerade Saison hat." 
                  : "Every day we cook two fresh main dishes and a soup – based on what's currently in season."}
              </p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de" 
                  ? "Dazu bieten wir unsere beliebten Klassiker, die es immer gibt." 
                  : "Plus our beloved classics, available every day."}
              </p>
              <Button className="font-work" asChild>
                <Link to="/wochenkarte">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  {language === "de" ? "Wochenmenü ansehen" : "View Weekly Specials"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE 2: Visit - Text Left, Image Right (Reversed) */}
      <section className="py-16 md:py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Text - Left on desktop */}
            <div className="space-y-6 order-2 md:order-1">
              <span className="text-xs font-work uppercase tracking-widest text-accent">
                {language === "de" ? "Unser Garten" : "Our Garden"}
              </span>
              <h2 className="text-4xl md:text-5xl text-primary">
                {language === "de" ? "Ein verstecktes Refugium" : "A Hidden Refuge"}
              </h2>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de" 
                  ? "Im Raimundhof, abseits der Mariahilferstraße, liegt unser ruhiger Innenhof – eine Oase mitten in Wien." 
                  : "In the Raimundhof, off Mariahilferstraße, lies our peaceful courtyard – an oasis in the heart of Vienna."}
              </p>
              <p className="font-lora text-lg text-foreground/85 leading-relaxed">
                {language === "de" 
                  ? "Grüne Pflanzen, Holztische und sanfte Musik. Ein Ort zum Durchatmen." 
                  : "Green plants, wooden tables, and soft music. A place to breathe."}
              </p>
              <Button variant="outline" className="font-work group" asChild>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => window.gtag?.('event', 'click_directions', { event_category: 'engagement', event_label: 'visit_section' })}
                  aria-label={language === "de" ? "Route auf Google Maps (öffnet in neuem Tab)" : "Directions on Google Maps (opens in new tab)"}
                  className="inline-flex items-center gap-2 transition-all duration-200 ease-in-out"
                >
                  <MapPin className="w-4 h-4" aria-hidden="true" />
                  {language === "de" ? "Route auf Google Maps" : "Directions on Google Maps"}
                </a>
              </Button>
            </div>
            
            {/* Image - Right on desktop */}
            <div className="order-1 md:order-2">
              <div className="aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
                <img 
                  src={entranceGarden} 
                  alt={language === "de" ? "Eingang zum Garten" : "Garden entrance"}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
