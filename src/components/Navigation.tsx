import { useState, useEffect, useRef, useCallback, createContext, useContext } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE } from "@/config/site";

// Context to share mobile menu state
export const MobileMenuContext = createContext<{ isOpen: boolean }>({ isOpen: false });

export const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const rafRef = useRef<number | null>(null);

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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: language === "de" ? "Home" : "Home" },
    { to: "/#menu", label: language === "de" ? "Speisekarte" : "Menu" },
    { to: "/wochenkarte", label: language === "de" ? "Wochenmenü" : "Weekly Specials" },
    { to: "/about", label: language === "de" ? "Über uns" : "About" },
    { to: "/contact", label: language === "de" ? "Besuche uns" : "Visit Us" },
  ];

  return (
    <MobileMenuContext.Provider value={{ isOpen: isMobileMenuOpen }}>
      <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20 py-3 md:py-4 transition-all duration-500 ease-in-out ${
          showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Mobile Menu Button - Left */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-3 rounded-lg transition-colors lg:hidden touch-manipulation text-primary hover:bg-primary/10"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo + Subtitle */}
          <Link to="/" className="flex items-center gap-3 group">
            <Logo className="w-10 h-10 md:w-12 md:h-12" />
            <div className="hidden sm:block">
              <span className="font-cormorant text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                My Secret Garden
              </span>
              <p className="text-xs text-muted-foreground font-work">
                Vegetarian Café & Restaurant • Vienna
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-work text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTAs + Language */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher variant="navbar" />
            
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-work"
              onClick={() => (window.location.href = `tel:${SITE.phoneTel}`)}
            >
              <Phone className="w-4 h-4 mr-2" />
              {language === "de" ? "Anrufen" : "Call"}
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

          {/* Mobile: Show small Call button */}
          <div className="lg:hidden">
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-work"
              onClick={() => (window.location.href = `tel:${SITE.phoneTel}`)}
            >
              <Phone className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-300 ease-out flex flex-col ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-border/20 flex items-center justify-between">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3">
              <Logo className="w-10 h-10" />
              <span className="font-cormorant text-lg font-bold text-foreground">My Secret Garden</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-3 px-4 text-base text-foreground/80 hover:text-foreground hover:bg-muted/30 rounded-lg transition-colors font-work"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="p-6 border-t border-border/20 space-y-3">
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

            <div className="pt-2">
              <LanguageSwitcher variant="navbar" />
            </div>
          </div>
        </div>
      </div>
      </>
    </MobileMenuContext.Provider>
  );
};
