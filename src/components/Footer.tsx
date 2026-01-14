import { Heart, Instagram, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          
          {/* Brand */}
          <p className="text-lg font-caveat text-primary-foreground">
            My Secret Garden
          </p>
          
          {/* Address - one line */}
          <p className="text-sm text-primary-foreground/85 font-work">
            Mariahilferstraße 45, Im Raimundhof – 1060 Wien
          </p>
          
          {/* Hours - synthetic */}
          <p className="text-sm text-primary-foreground/80 font-work">
            {language === "de" ? "Mo–Sa 11:00–19:00" : "Mon–Sat 11:00–19:00"}
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            <a 
              href="https://www.instagram.com/mysecretgarden_vienna/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center text-primary-foreground/85 hover:bg-primary-foreground/25 hover:text-primary-foreground transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a 
              href="https://www.facebook.com/secretgardencafewien"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-primary-foreground/15 flex items-center justify-center text-primary-foreground/85 hover:bg-primary-foreground/25 hover:text-primary-foreground transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
          
          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm font-work">
            <Link 
              to="/contact" 
              className="text-primary-foreground/90 hover:text-primary-foreground transition-colors underline-offset-2 hover:underline"
            >
              {language === "de" ? "Kontakt" : "Contact"}
            </Link>
            <a 
              href={SITE.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors underline-offset-2 hover:underline"
            >
              Google Maps
            </a>
            <Link 
              to="/privacy" 
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors underline-offset-2 hover:underline"
            >
              {language === "de" ? "Datenschutz" : "Privacy"}
            </Link>
            <Link 
              to="/impressum" 
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors underline-offset-2 hover:underline"
            >
              Impressum
            </Link>
          </div>
          
          {/* Made with love */}
          <div className="pt-4 border-t border-primary-foreground/15">
            <div className="flex items-center justify-center gap-2 text-xs text-primary-foreground/75">
              <span>Made with</span>
              <Heart className="w-3 h-3 fill-accent text-accent" />
              <span>in Wien</span>
            </div>
            <p className="text-xs text-primary-foreground/65 mt-2">
              © {new Date().getFullYear()} My Secret Garden
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
