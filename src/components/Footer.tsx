import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";

export const Footer = () => {
  const { language } = useLanguage();

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
            to="/visit"
            className="inline-flex min-h-[44px] items-center justify-center px-3 text-sm text-primary-foreground font-work hover:underline underline-offset-2 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded"
            aria-label={language === "de" ? "So findest du uns" : "How to find us"}
          >
            {SITE.addressShort}
          </Link>
          
          {/* Instagram */}
          <a 
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[44px] items-center justify-center gap-2 px-3 text-sm text-primary-foreground hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded"
            aria-label={`${SITE.instagramHandle} on Instagram (opens in new tab)`}
            title={`${SITE.instagramHandle} on Instagram`}
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            {SITE.instagramHandle}
          </a>
          
          
          {/* Required Legal Links - MUST be on every page */}
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <Link 
              to="/contact" 
              className="text-primary-foreground hover:text-primary-foreground transition-colors duration-200 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Kontakt" : "Contact Us"}
            >
              {language === "de" ? "Kontakt" : "Contact Us"}
            </Link>
            <Link 
              to="/impressum" 
              className="text-primary-foreground hover:text-primary-foreground transition-colors duration-200 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Impressum" : "Legal Notice"}
            >
              {language === "de" ? "Impressum" : "Legal Notice"}
            </Link>
            <Link 
              to="/privacy" 
              className="text-primary-foreground hover:text-primary-foreground transition-colors duration-200 underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary-foreground/50 rounded"
              aria-label={language === "de" ? "Datenschutz" : "Privacy Policy"}
            >
              {language === "de" ? "Datenschutz" : "Privacy Policy"}
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-primary-foreground">
            © {new Date().getFullYear()} {SITE.name}
          </p>

          
        </div>
      </div>
    </footer>
  );
};
