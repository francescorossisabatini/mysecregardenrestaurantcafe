import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage, useLocalizedPath } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";

export const Footer = () => {
  const { language } = useLanguage();
  const lp = useLocalizedPath();

  return (
    <footer className="bg-primary text-primary-foreground py-8 pb-24 md:pb-8">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center space-y-4">
          
          {/* Brand Name */}
          <p className="font-cormorant text-lg font-semibold">
            {SITE.name}
          </p>
          
          {/* Tagline */}
          <p className="font-caveat text-base text-primary-foreground italic">
            "Cooking is prayer. Eating is gratitude."
          </p>
          
          {/* Address — clickable link to /visit */}
          <Link
            to={lp("/visit")}
            className="inline-flex min-h-[44px] items-center justify-center px-3 text-sm text-primary-foreground font-work hover:underline underline-offset-2 transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
            aria-label={language === "de" ? "So findest du uns" : "How to find us"}
          >
            {SITE.addressShort}
          </Link>

          {/* Gli orari uscivano con ShowcaseSections, che è stata fusa in IlPosto.
              Il footer è il posto giusto: uno solo, su ogni pagina.
              Stringhe invariate. */}
          <p className="font-work text-sm leading-relaxed text-primary-foreground/90">
            {language === "de" ? "Montag bis Samstag: 11:00 bis 19:00" : "Monday to Saturday: 11:00 to 19:00"}
            <br />
            {language === "de" ? "Sonn- und Feiertage geschlossen." : "Closed on Sundays and public holidays."}
          </p>
          
          {/* Instagram */}
          <a 
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 px-3 font-work text-sm text-primary-foreground hover:text-primary-foreground transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
            aria-label={`${SITE.instagramHandle} on Instagram (opens in new tab)`}
            title={`${SITE.instagramHandle} on Instagram`}
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            {SITE.instagramHandle}
          </a>
          
          
          {/* Required Legal Links - MUST be on every page */}
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <Link 
              to={lp("/contact")} 
              className="inline-flex min-h-[44px] items-center px-2 font-work text-primary-foreground hover:text-primary-foreground transition-colors duration-base underline-offset-2 hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Kontakt" : "Contact Us"}
            >
              {language === "de" ? "Kontakt" : "Contact Us"}
            </Link>
            <Link 
              to={lp("/impressum")} 
              className="inline-flex min-h-[44px] items-center px-2 font-work text-primary-foreground hover:text-primary-foreground transition-colors duration-base underline-offset-2 hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Impressum" : "Legal Notice"}
            >
              {language === "de" ? "Impressum" : "Legal Notice"}
            </Link>
            <Link 
              to={lp("/privacy")} 
              className="inline-flex min-h-[44px] items-center px-2 font-work text-primary-foreground hover:text-primary-foreground transition-colors duration-base underline-offset-2 hover:underline focus:outline-hidden focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Datenschutz" : "Privacy Policy"}
            >
              {language === "de" ? "Datenschutz" : "Privacy Policy"}
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="font-work text-xs text-primary-foreground">
            © {new Date().getFullYear()} {SITE.name}
          </p>

          
        </div>
      </div>
    </footer>
  );
};
