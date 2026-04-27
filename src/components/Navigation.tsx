import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Navigation = () => {
  const { isOpen: isMobileMenuOpen, setIsOpen: setIsMobileMenuOpen } = useMobileMenu();
  const [showNavbar, setShowNavbar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { language } = useLanguage();
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isHeroOverlay = isHomePage && !scrolled && !isMobileMenuOpen;
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
    { to: "/menu", label: language === "de" ? "Speisekarte" : "Menu" },
    { to: "/about", label: language === "de" ? "Über uns" : "About" },
    { to: "/visit", label: language === "de" ? "Besuche uns" : "Visit" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-2 md:py-3 transition-all duration-500 ease-in-out ${
          showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        } ${isHeroOverlay ? "border-b border-background/10 bg-transparent backdrop-blur-[2px]" : "border-b border-border/75 bg-nav-surface backdrop-blur-md shadow-design-card"}`}
      >
        <div className="container relative mx-auto grid min-h-16 grid-cols-[auto_1fr_auto] items-center gap-3 px-5 md:min-h-14 md:px-4 lg:grid-cols-[1fr_auto_1fr]">
          {/* Desktop Navigation Links */}
          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`font-work text-xs font-medium uppercase tracking-[0.08em] transition-colors ${isHeroOverlay ? "text-background/85 hover:text-background drop-shadow-sm" : "text-primary/80 hover:text-primary"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${isHeroOverlay ? "border-background/25 bg-background/10 text-background backdrop-blur-sm hover:bg-background/15" : "border-border/75 bg-card/85 text-primary hover:bg-muted"}`}
              aria-label={isMobileMenuOpen 
                ? (language === "de" ? "Menü schließen" : "Close menu") 
                : (language === "de" ? "Menü öffnen" : "Open menu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Centered Logo */}
          <Link 
            to="/" 
            className="group justify-self-center flex min-w-0 items-center gap-2 rounded-full px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/50 md:gap-3"
            aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
          >
            <Logo className="h-11 w-11 flex-shrink-0 md:h-12 md:w-12" showTagline={false} aria-hidden="true" />
            <div className="hidden min-w-0 text-center leading-tight sm:block">
              <span className={`block max-w-[10rem] truncate font-cormorant text-xl font-bold transition-colors md:max-w-none md:text-xl ${isHeroOverlay ? "text-background drop-shadow-md group-hover:text-background" : "text-foreground group-hover:text-primary"}`}>
                My Secret Garden
              </span>
              <p className={`hidden truncate font-work text-[11px] md:block md:text-xs ${isHeroOverlay ? "text-background/75 drop-shadow-sm" : "text-muted-foreground"}`}>
                Vegetarian Café • Vienna
              </p>
            </div>
          </Link>

          {/* Language */}
          <div className="hidden items-center justify-end gap-3 lg:flex">
            <LanguageSwitcher variant="navbar" tone={isHeroOverlay ? "overlay" : "default"} />
          </div>
          <div className="flex items-center justify-end lg:hidden">
            <LanguageSwitcher variant="mobile" tone={isHeroOverlay ? "overlay" : "default"} />
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
          className={`absolute inset-0 bg-foreground/50 transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-300 ease-out flex flex-col border-r border-border/75 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-border/75 flex items-center justify-between">
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
                className="block rounded-full px-4 py-3 font-work text-sm font-medium uppercase tracking-[0.08em] text-primary/85 transition-colors hover:bg-muted hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

        </div>
      </div>
    </>
  );
};
