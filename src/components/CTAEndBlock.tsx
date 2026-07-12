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
    <section className={`py-20 md:py-24 lg:py-32 bg-gradient-hero ${className}`}>
      <div className="container mx-auto px-5">
        <div className="max-w-md lg:max-w-3xl mx-auto text-center space-y-5">
          <div className="flex justify-center">
            <span className="eyebrow-num on-dark">
              07 · {language === "de" ? "Besuch" : "Visit"}
            </span>
          </div>
          <h2 className="h2-editorial text-primary-foreground">
            {title || defaultTitle}
          </h2>
          <div className="flex justify-center">
            <span className="block h-px w-16 bg-primary-foreground/40" aria-hidden="true" />
          </div>
          <p className="text-sm text-primary-foreground/85 font-work pb-4">
            {SITE.addressShort}
          </p>
          <div className="flex flex-col gap-3 lg:grid lg:grid-cols-3">
            {/* Primary CTAs - Call & Directions */}
            {show.includes("call") && (
              <Button
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work bg-accent hover:bg-accent/90 text-accent-foreground shadow-elevated"
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
                className="w-full justify-center gap-2 py-6 text-base font-work border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                asChild
              >
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-5 h-5" />
                  {language === "de" ? "Route anzeigen" : "Get Directions"}
                </a>
              </Button>
            )}
            {show.includes("weekly") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center gap-2 py-6 text-base font-work border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
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
                className="w-full justify-center gap-2 py-6 text-base font-work border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
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
