import { Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  const isGerman = language === "de";

  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center space-y-4">
          
          {/* Address - one line */}
          <p className="text-sm text-primary-foreground/90 font-work">
            Mariahilferstraße 45, Im Raimundhof – 1060 Wien
          </p>
          
          {/* Instagram */}
          <a 
            href="https://www.instagram.com/mysecretgarden_vienna/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="w-4 h-4" />
            @mysecretgarden_vienna
          </a>
          
          {/* Legal Links */}
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link 
              to="/contact" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {isGerman ? "Kontakt" : "Contact"}
            </Link>
            <span className="text-primary-foreground/40">•</span>
            <Link 
              to="/impressum" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {isGerman ? "Impressum" : "Legal Notice"}
            </Link>
            <span className="text-primary-foreground/40">•</span>
            <Link 
              to="/privacy" 
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
            >
              {isGerman ? "Datenschutz" : "Privacy Policy"}
            </Link>
          </div>
          
          {/* Copyright */}
          <p className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} My Secret Garden
          </p>
          
        </div>
      </div>
    </footer>
  );
};
