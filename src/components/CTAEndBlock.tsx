import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, CalendarDays, UtensilsCrossed } from "lucide-react";
import { SITE } from "@/config/site";

interface CTAEndBlockProps {
  /** Which buttons to show. Defaults to all three. */
  show?: ("weekly" | "menu" | "directions")[];
  /** Optional className for the container */
  className?: string;
}

export const CTAEndBlock = ({ 
  show = ["weekly", "menu", "directions"],
  className = ""
}: CTAEndBlockProps) => {
  const { language } = useLanguage();

  return (
    <section className={`py-12 md:py-16 bg-muted/30 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <p className="text-center text-sm text-muted-foreground font-work mb-6">
            {language === "de" ? "Wie können wir helfen?" : "How can we help?"}
          </p>
          <div className="flex flex-col gap-3">
            {show.includes("weekly") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work"
                asChild
              >
                <Link to="/wochenkarte">
                  <CalendarDays className="w-5 h-5" />
                  {language === "de" ? "Wochenmenü" : "Weekly Specials"}
                </Link>
              </Button>
            )}
            {show.includes("menu") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work"
                asChild
              >
                <Link to="/#menu">
                  <UtensilsCrossed className="w-5 h-5" />
                  {language === "de" ? "Speisekarte" : "Menu"}
                </Link>
              </Button>
            )}
            {show.includes("directions") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work"
                asChild
              >
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-5 h-5" />
                  {language === "de" ? "Wegbeschreibung" : "Directions"}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
