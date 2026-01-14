import { Instagram } from "lucide-react";

export const Footer = () => {
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
          
          {/* Copyright */}
          <p className="text-xs text-primary-foreground/70">
            © {new Date().getFullYear()} My Secret Garden
          </p>
          
        </div>
      </div>
    </footer>
  );
};
