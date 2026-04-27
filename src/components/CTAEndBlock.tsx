import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, CalendarDays, UtensilsCrossed, Phone } from "lucide-react";
import { SITE } from "@/config/site";

interface CTAEndBlockProps {
  /** Which buttons to show. Defaults to Call + Directions. */
  show?: ("call" | "directions" | "weekly" | "menu")[];
  /** Optional className for the container */
  className?: string;
  /** Optional title override */
  title?: string;
}

export const CTAEndBlock = ({ 
  show = ["call", "directions"],
  className = "",
  title
}: CTAEndBlockProps) => {
  const { language } = useLanguage();

  const defaultTitle = language === "de" ? "Besuche uns" : "Visit Us";

  return (
    <section className={`py-16 md:py-20 lg:py-28 bg-section-accent ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-md lg:max-w-3xl mx-auto text-center rounded-2xl border border-border/70 bg-card/55 p-6 shadow-card md:p-8 lg:p-10">
          <h2 className="text-3xl md:text-4xl text-primary mb-4">
            {title || defaultTitle}
          </h2>
          <p className="text-sm text-muted-foreground font-work mb-8">
            {SITE.addressShort}
          </p>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
            {/* Primary CTAs - Call & Directions */}
            {show.includes("call") && (
              <Button
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={() => (window.location.href = `tel:${SITE.phoneTel}`)}
              >
                <Phone className="w-5 h-5" />
                {language === "de" ? "Jetzt anrufen" : "Call Now"}
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
                  {language === "de" ? "Route anzeigen" : "Get Directions"}
                </a>
              </Button>
            )}
            {/* Secondary CTAs - Weekly & Menu */}
            {show.includes("weekly") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work"
                asChild
              >
                <Link to="/menu">
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
                <Link to="/menu">
                  <UtensilsCrossed className="w-5 h-5" />
                  {language === "de" ? "Speisekarte" : "Menu"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
