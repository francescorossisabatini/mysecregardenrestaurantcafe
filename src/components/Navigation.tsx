import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/config/site";

export const Navigation = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const rafRef = useRef<number | null>(null);

  const isHomePage = location.pathname === "/";

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }
      };
    }
    setShowNavbar(true);
  }, [isHomePage, handleScroll]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20 py-3 md:py-4 transition-all duration-500 ease-in-out ${
          showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-3 rounded-lg transition-colors lg:hidden touch-manipulation text-primary hover:bg-primary/10"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo + Subtitle - Center on mobile, Left on desktop */}
            <Link 
              to="/"
              onClick={(e) => {
                if (location.pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-3 transition-all duration-300"
            >
              <Logo className="w-10 h-10 md:w-12 md:h-12" showTagline={false} />
              <div className="hidden sm:block">
                <span className="font-caveat text-lg text-primary">My Secret Garden</span>
                <p className="text-xs text-muted-foreground">
                  Vegetarian Café & Restaurant • Vienna
                </p>
              </div>
            </Link>

            {/* Desktop: DE/EN toggle + CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <LanguageSwitcher variant="navbar" />
              
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-work"
                onClick={() => (window.location.href = `tel:${SITE.phoneTel}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                {language === "de" ? "Anrufen" : "Call Us"}
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="font-work"
                asChild
              >
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="w-4 h-4 mr-2" />
                  {language === "de" ? "Route" : "Directions"}
                </a>
              </Button>
            </div>

            {/* Mobile: placeholder for spacing (buttons in menu) */}
            <div className="w-12 lg:hidden" />
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-background/95 backdrop-blur-lg border-r border-border/30 z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full pt-20 pb-8 px-6">
          {/* Primary CTAs */}
          <div className="space-y-3 mb-8">
            <Button
              size="lg"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-work"
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.location.href = `tel:${SITE.phoneTel}`;
              }}
            >
              <Phone className="w-5 h-5 mr-2" />
              {language === "de" ? "Jetzt anrufen" : "Call Now"}
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full font-work"
              asChild
            >
              <a 
                href={SITE.mapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <MapPin className="w-5 h-5 mr-2" />
                {language === "de" ? "Route anzeigen" : "Get Directions"}
              </a>
            </Button>
          </div>

          {/* Secondary nav links */}
          <nav className="flex-1 space-y-2">
            <Link
              to="/#menu"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-4 text-base text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
            >
              {language === "de" ? "Speisekarte" : "View Menu"}
            </Link>
            <Link
              to="/wochenkarte"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-4 text-base text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
            >
              {language === "de" ? "Wochenmenü" : "Today's Specials"}
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-4 text-base text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
            >
              {language === "de" ? "Über uns" : "About"}
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block py-3 px-4 text-base text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors"
            >
              {language === "de" ? "Besuche uns" : "Visit Us"}
            </Link>
          </nav>

          {/* Language switcher at bottom */}
          <div className="mt-auto pt-4 border-t border-border/20">
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </>
  );
};
