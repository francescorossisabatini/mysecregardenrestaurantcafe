import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const Navigation = () => {
  const { isOpen: isMobileMenuOpen, setIsOpen: setIsMobileMenuOpen } = useMobileMenu();
  const { language } = useLanguage();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = location.pathname === "/";
  const isHeroOverlay = isHome && !isScrolled && !isMobileMenuOpen;

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 28);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [location.pathname]);

  // Primary navigation labels
  const navLinks = [
    { to: "/", label: language === "de" ? "Home" : "Home" },
    { to: "/menu", label: language === "de" ? "Speisekarte" : "Menu" },
    { to: "/gallery", label: language === "de" ? "Galerie" : "Gallery" },
    { to: "/about", label: "Our Story" },
    { to: "/visit", label: language === "de" ? "Besuche uns" : "Visit" },
  ];
  const activeNavLabel = navLinks.find((link) => link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to))?.label ?? "";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ease-in-out ${
          isHeroOverlay
            ? "bg-transparent py-2 md:py-2.5 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[120%] before:bg-gradient-to-b before:from-foreground/55 before:via-foreground/25 before:to-transparent before:content-['']"
            : "border-b border-border/60 bg-background/97 py-1.5 backdrop-blur-2xl md:py-2"
        }`}
      >
        <div className={`relative mx-auto flex w-full max-w-[1240px] items-center gap-4 px-4 transition-all duration-500 sm:px-6 lg:gap-8 lg:px-8 ${isHeroOverlay ? "min-h-14 lg:min-h-16" : "min-h-12 md:min-h-14"}`}>
          {/* Mobile Menu Trigger (left, mobile only) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 ${isHeroOverlay ? "border-background/40 bg-background/25 text-background backdrop-blur-md hover:bg-background/35" : "border-border/75 bg-card/90 text-primary hover:bg-muted"}`}
              aria-label={isMobileMenuOpen
                ? (language === "de" ? "Menü schließen" : "Close menu")
                : (language === "de" ? "Menü öffnen" : "Open menu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Logo + Wordmark (left on desktop, centered on mobile) */}
          <Link
            to="/"
            className="group flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-sm py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 lg:flex-initial lg:justify-start lg:gap-3"
            aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
          >
            <Logo
              className={`flex-shrink-0 transition-[height,width] duration-500 ${isHeroOverlay ? "h-10 w-10 lg:h-11 lg:w-11" : "h-9 w-9 lg:h-9 lg:w-9"}`}
              showTagline={false}
              aria-hidden="true"
            />
            <span className={`block max-w-[7.5rem] truncate font-work text-[10px] font-medium uppercase tracking-[0.14em] sm:hidden ${isHeroOverlay ? "text-background" : "text-primary/85"}`}>
              {activeNavLabel}
            </span>
            <span className={`hidden min-w-0 truncate font-cormorant font-bold leading-none transition-[font-size,color] duration-500 sm:block ${isHeroOverlay ? "text-background text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] group-hover:text-background/90 lg:text-[22px]" : "text-foreground text-lg group-hover:text-primary lg:text-xl"}`}>
              My Secret Garden
            </span>
          </Link>

          {/* Desktop Nav Links + Language (right) */}
          <div className="hidden items-center gap-6 lg:flex xl:gap-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to);
                const baseColor = isHeroOverlay
                  ? isActive
                    ? "text-background"
                    : "text-background/85 hover:text-background"
                  : isActive
                    ? "text-accent"
                    : "text-foreground/85 hover:text-accent";
                return (
                  <li key={link.to} className="relative">
                    {isActive && (
                      <span
                        aria-hidden="true"
                        className={`absolute -left-3 top-1/2 h-3 w-[2px] -translate-y-1/2 ${isHeroOverlay ? "bg-background" : "bg-accent"}`}
                      />
                    )}
                    <Link
                      to={link.to}
                      aria-current={isActive ? "page" : undefined}
                      className={`whitespace-nowrap font-work text-[11px] font-medium uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-sm ${baseColor} ${isHeroOverlay ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" : ""}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span aria-hidden="true" className={`h-4 w-px ${isHeroOverlay ? "bg-background/40" : "bg-border/70"}`} />
            <LanguageSwitcher variant="navbar" tone={isHeroOverlay ? "overlay" : "default"} />
          </div>

          {/* Spacer to balance mobile menu button */}
          <div className="w-11 lg:hidden" aria-hidden="true" />
        </div>
      </nav>



      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-all duration-base ease-out ${
          isMobileMenuOpen ? "visible" : "invisible"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-foreground/50 transition-opacity duration-base ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute left-0 top-0 h-dvh w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-300 ease-out flex flex-col border-r border-border/75 ${
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
              <Logo className="w-10 h-10" showTagline={false} aria-hidden="true" />
              <span className="font-cormorant text-lg font-bold text-foreground">My Secret Garden</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 rounded-lg text-muted-high-contrast hover:text-foreground hover:bg-muted/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={language === "de" ? "Menü schließen" : "Close navigation menu"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = link.to === "/" ? location.pathname === "/" : location.pathname.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={isActive ? "page" : undefined}
                  className={`block rounded-full px-4 py-3 font-work text-sm font-medium uppercase tracking-[0.08em] transition-colors hover:bg-muted hover:text-primary ${isActive ? "bg-muted text-primary" : "text-primary/85"}`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Language switcher inside drawer */}
          <div className="border-t border-border/75 p-6 flex items-center justify-between gap-4">
            <span className="font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-high-contrast">
              {language === "de" ? "Sprache" : "Language"}
            </span>
            <LanguageSwitcher variant="mobile" />
          </div>

        </div>
      </div>
    </>
  );
};
