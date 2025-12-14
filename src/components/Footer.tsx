import { Heart, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-primary text-primary-foreground py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center space-y-5">
          
          {/* Brand */}
          <p className="text-lg font-caveat text-primary-foreground/90">
            My Secret Garden
          </p>
          
          {/* Address - one line */}
          <p className="text-sm text-primary-foreground/70 font-work">
            Mariahilferstraße 45, Im Raimundhof – 1060 Wien
          </p>
          
          {/* Hours - synthetic */}
          <p className="text-sm text-primary-foreground/60 font-work">
            {language === "de" ? "Mo–Sa 11:30–21:30" : "Mon–Sat 11:30–21:30"}
          </p>
          
          {/* Links */}
          <div className="flex items-center justify-center gap-6 text-sm font-work">
            <Link 
              to="/contact" 
              className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            >
              {language === "de" ? "Kontakt" : "Contact"}
            </Link>
            <a 
              href="https://maps.google.com/?q=Mariahilferstraße+45,+1060+Wien"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors"
            >
              Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
            <Link 
              to="/privacy" 
              className="text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors"
            >
              {language === "de" ? "Datenschutz" : "Privacy"}
            </Link>
          </div>
          
          {/* Made with love */}
          <div className="pt-4 border-t border-primary-foreground/10">
            <div className="flex items-center justify-center gap-2 text-xs text-primary-foreground/50">
              <span>Made with</span>
              <Heart className="w-3 h-3 fill-accent text-accent" />
              <span>in Wien</span>
            </div>
            <p className="text-xs text-primary-foreground/40 mt-2">
              © {new Date().getFullYear()} My Secret Garden
            </p>
          </div>
          
        </div>
      </div>
    </footer>
  );
};
