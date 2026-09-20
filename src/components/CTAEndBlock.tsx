import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
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
    <section className={`bg-gradient-hero py-20 md:py-28 ${className}`}>
      <div className="container mx-auto px-5">
        {/* La numerazione "07 ·" è sparita: valeva solo dentro la vecchia home a
            sette sezioni, e su /menu prometteva una sequenza inesistente.
            Il filetto decorativo pure (No-Line Rule). */}
        <div className="mx-auto max-w-md space-y-5 text-center lg:max-w-2xl">
          <div className="flex justify-center">
            <span className="eyebrow-num on-dark">
              {language === "de" ? "Besuch" : "Visit"}
            </span>
          </div>
          <h2 className="h2-editorial text-primary-foreground">
            {title || defaultTitle}
          </h2>
          <p className="pb-4 font-work text-sm text-primary-foreground/85">
            {SITE.addressShort}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            {/* Primary CTAs - Call & Directions */}
            {show.includes("call") && (
              <Button
                size="lg"
                className="w-full justify-center py-6 text-base font-work bg-accent hover:bg-accent/90 text-accent-foreground sm:w-auto sm:px-10"
                onClick={() => (window.location.href = `tel:${SITE.phoneTel}`)}
              >
                {language === "de" ? "Anrufen" : "Call Now"}
              </Button>
            )}
            {show.includes("directions") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center py-6 text-base font-work border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto sm:px-10"
                asChild
              >
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                  {language === "de" ? "Durch den Bogen, Mariahilferstraße 45" : "Get Directions"}
                </a>
              </Button>
            )}
            {show.includes("weekly") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center py-6 text-base font-work border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto sm:px-10"
                asChild
              >
                <Link to="/menu">
                  {language === "de" ? "Wochenmenü" : "Weekly Specials"}
                </Link>
              </Button>
            )}
            {show.includes("menu") && (
              <Button
                variant="outline"
                size="lg"
                className="w-full justify-center py-6 text-base font-work border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground sm:w-auto sm:px-10"
                asChild
              >
                <Link to="/menu">
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
