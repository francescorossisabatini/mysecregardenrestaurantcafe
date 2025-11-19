import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { language } = useLanguage();
  
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 fill-accent text-accent animate-pulse" />
            <span>in Wien</span>
          </div>
          <p className="text-sm text-primary-foreground/70">
            My Secret Garden Restaurant - Vegetarisch & Vegan seit 2006
          </p>
          <p className="text-xs text-primary-foreground/60">
            Mariahilferstraße 45 – Im Raimundhof – 1060 Wien
          </p>
          <div className="pt-4 border-t border-primary-foreground/20 space-y-2">
            <p className="text-xs text-primary-foreground/60">
              © {new Date().getFullYear()} My Secret Garden. {language === "de" ? "Alle Rechte vorbehalten" : "All rights reserved"}.
            </p>
            <Link 
              to="/privacy" 
              className="text-xs text-primary-foreground/70 hover:text-primary-foreground underline inline-block"
            >
              {language === "de" ? "Datenschutzerklärung" : "Privacy Policy"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
