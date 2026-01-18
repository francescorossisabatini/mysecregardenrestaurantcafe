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
          <p className="font-caveat text-sm text-primary-foreground/70 italic">
            "Cooking is prayer. Eating is gratitude."
          </p>
          
          {/* Address */}
          <p className="text-sm text-primary-foreground/90 font-work">
            {SITE.addressShort}
          </p>
          
          {/* Instagram */}
          <a 
            href={SITE.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
            {SITE.instagramHandle}
          </a>
          
          {/* Required Legal Links - MUST be on every page */}
          <div className="flex items-center justify-center gap-4 text-sm flex-wrap">
            <Link 
              to="/contact" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {language === "de" ? "Kontakt" : "Contact"}
            </Link>
            <span className="text-primary-foreground/40">•</span>
            <Link 
              to="/impressum" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {language === "de" ? "Impressum" : "Legal Notice"}
            </Link>
            <span className="text-primary-foreground/40">•</span>
            <Link 
              to="/privacy" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {language === "de" ? "Datenschutz" : "Privacy Policy"}
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          
        </div>
      </div>
    </footer>
  );
};
