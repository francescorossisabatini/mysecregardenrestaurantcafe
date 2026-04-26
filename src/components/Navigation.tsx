import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X, Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE } from "@/config/site";

export const Navigation = () => {
  const { isOpen: isMobileMenuOpen, setIsOpen: setIsMobileMenuOpen } = useMobileMenu();
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current || showNavbar) return; // Skip if already visible
    
    rafRef.current = requestAnimationFrame(() => {
      if (window.scrollY > 50) {
        setShowNavbar(true);
      }
      rafRef.current = null;
    });
  }, [showNavbar]);

  useEffect(() => {
    const handleScrollShadow = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScrollShadow, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollShadow);
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
  }, [location.pathname, setIsMobileMenuOpen]);

  // Required nav links per master template: Home, Menu, Specials, About, Visit, Contact
  const navLinks = [
    { to: "/", label: language === "de" ? "Home" : "Home" },
    { to: "/#menu", label: language === "de" ? "Speisekarte" : "Menu" },
    { to: "/wochenkarte", label: language === "de" ? "Wochenmenü" : "Specials" },
    { to: "/about", label: language === "de" ? "Über uns" : "About" },
    { to: "/contact", label: language === "de" ? "Besuche uns" : "Visit" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/20 py-2 md:py-4 transition-all duration-500 ease-in-out ${
          showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${scrolled ? "shadow-sm" : ""}`}
      >
        <div className="container mx-auto flex min-h-16 items-center justify-between gap-4 px-5 md:min-h-0 md:px-4">
          {/* Logo + Subtitle */}
          <Link 
            to="/" 
            className="group flex min-w-0 flex-1 items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 lg:flex-none"
            aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
          >
            <Logo className="h-11 w-11 flex-shrink-0 md:h-12 md:w-12" aria-hidden="true" />
            <div className="min-w-0 leading-tight">
              <span className="block max-w-[9.75rem] truncate font-cormorant text-xl font-bold text-foreground transition-colors group-hover:text-primary sm:max-w-none md:text-xl">
                My Secret Garden
              </span>
              <p className="hidden sm:block text-[11px] md:text-xs text-muted-foreground font-work truncate">
                Vegetarian Café • Vienna
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-sm font-work text-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Language */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher variant="navbar" />
          </div>

          {/* Mobile nav actions */}
          <div className="flex flex-shrink-0 items-center gap-3 lg:hidden">
            <LanguageSwitcher variant="mobile" />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-md border border-border/60 bg-background/80 text-primary shadow-sm transition-colors hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
              aria-label={isMobileMenuOpen 
                ? (language === "de" ? "Menü schließen" : "Close menu") 
                : (language === "de" ? "Menü öffnen" : "Open menu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
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
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg"
              aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
            >
              <Logo className="w-10 h-10" aria-hidden="true" />
              <span className="font-cormorant text-lg font-bold text-foreground">My Secret Garden</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={language === "de" ? "Menü schließen" : "Close navigation menu"}
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
                className="block py-3 px-4 text-base text-foreground hover:text-primary hover:bg-muted/30 rounded-lg transition-colors font-work"
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
          </div>
        </div>
      </div>
    </>
  );
};
