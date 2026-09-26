import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage, useLocalizedPath } from "@/contexts/LanguageContext";
import { deviceLanguageIsNotGerman, stripLanguagePrefix } from "@/lib/i18nRoutes";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE } from "@/config/site";

export const Navigation = () => {
  const { isOpen: isMobileMenuOpen, setIsOpen: setIsMobileMenuOpen } = useMobileMenu();
  const { language, setLanguage, hasChosenLanguage } = useLanguage();
  // Livello 3 del rilevamento lingua (docs/ux/divergence-ledger.md): su
  // mobile il selettore DE/EN sta solo nel drawer, invisibile a chi atterra.
  // Per chi ha il dispositivo non in tedesco e non ha ancora scelto, "EN"
  // compare nella top bar. Non reindirizza nessuno: Googlebot (en-US) vede
  // il pulsante ma resta sulla pagina tedesca.
  const showEnglishHint = language === "de" && !hasChosenLanguage && deviceLanguageIsNotGerman();
  const location = useLocation();
  const lp = useLocalizedPath();
  // /en/menu e /menu sono la stessa voce di menu: si confronta il percorso
  // senza prefisso lingua.
  const basePath = stripLanguagePrefix(location.pathname);
  const [isScrolled, setIsScrolled] = useState(false);
  const isHome = basePath === "/";
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
    { to: "/about", label: language === "de" ? "Unsere Geschichte" : "Our Story" },
    { to: "/visit", label: language === "de" ? "Besuche uns" : "Visit" },
  ];
  const activeNavLabel = navLinks.find((link) => link.to === "/" ? basePath === "/" : basePath.startsWith(link.to))?.label ?? "";

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-slow ease-in-out ${
          isHeroOverlay
            ? "bg-transparent py-2 md:py-2.5 before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[120%] before:bg-linear-to-b before:from-foreground/72 before:via-foreground/40 before:to-transparent before:content-['']"
            : "border-b border-border/60 bg-background py-1.5 backdrop-blur-2xl md:py-2"
        }`}
      >
        <div className={`relative mx-auto flex w-full max-w-[1240px] items-center gap-4 px-4 transition-all duration-slow sm:px-6 lg:gap-8 lg:px-8 ${isHeroOverlay ? "min-h-14 lg:min-h-16" : "min-h-12 md:min-h-14"}`}>
          {/* Mobile Menu Trigger (left, mobile only) */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              // Stessa superficie su hero e a nav scrollata, gemella del
              // pulsante "EN": token pieni di DESIGN_SYSTEM §3, focus dalla
              // regola globale §8 (vedi divergence-ledger, 26/09/2026).
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors duration-base hover:bg-muted"
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
            to={lp("/")}
            className="group flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-lg py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 lg:flex-initial lg:justify-start lg:gap-3"
            aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
          >
            <Logo
              className={`flex-shrink-0 transition-[height,width] duration-slow ${isHeroOverlay ? "h-10 w-10 lg:h-11 lg:w-11" : "h-9 w-9 lg:h-9 lg:w-9"}`}
              showTagline={false}
              aria-hidden="true"
            />
            <span className={`block max-w-[7.5rem] truncate font-work text-[10px] font-medium uppercase tracking-[0.14em] sm:hidden ${isHeroOverlay ? "text-background" : "text-primary/85"}`}>
              {activeNavLabel}
            </span>
            <span className={`hidden min-w-0 truncate font-cormorant font-bold leading-none transition-[font-size,color] duration-slow sm:block ${isHeroOverlay ? "text-background text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] group-hover:text-background/90 lg:text-[22px]" : "text-foreground text-lg group-hover:text-primary lg:text-xl"}`}>
              My Secret Garden
            </span>
          </Link>

          {/* Desktop Nav Links + Language (right) */}
          <div className="ml-auto hidden items-center gap-6 lg:flex xl:gap-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = link.to === "/" ? basePath === "/" : basePath.startsWith(link.to);
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
                      to={lp(link.to)}
                      aria-current={isActive ? "page" : undefined}
                      className={`inline-flex min-h-[28px] items-center whitespace-nowrap font-work text-[11px] font-medium uppercase tracking-[0.14em] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-lg ${baseColor} ${isHeroOverlay ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" : ""}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span aria-hidden="true" className={`h-4 w-px ${isHeroOverlay ? "bg-background/40" : "bg-border/70"}`} />
            <LanguageSwitcher variant="navbar" tone={isHeroOverlay ? "overlay" : "default"} />
            {/* MobileStickyBar copre solo mobile (return null su desktop) —
                senza questo link nessun visitatore desktop trovava un
                numero da nessuna parte: CTAEndBlock rimosso dalla home e
                dall'header di /visit contando (erroneamente) sulla barra
                fissa come unica fonte. Bug segnalato da Lovable il
                24/09/2026, corretto qui invece che pagina per pagina. */}
            <a
              href={`tel:${SITE.phoneTel}`}
              data-call-source="nav-desktop"
              className={`inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 font-work text-[11px] font-semibold uppercase tracking-[0.1em] transition-colors duration-base focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 ${
                isHeroOverlay
                  ? "bg-background/20 text-background backdrop-blur-md hover:bg-background/30"
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
              }`}
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={2.2} aria-hidden="true" />
              {language === "de" ? "Anrufen" : "Call"}
            </a>
          </div>

          {/* A destra su mobile: "EN" per chi può non leggere il tedesco,
              altrimenti lo spazio che tiene il logo centrato. */}
          {showEnglishHint ? (
            <button
              type="button"
              onClick={() => {
                // Stesso evento del LanguageSwitcher, etichetta propria: così
                // si misura quante persone passano all'inglese da qui.
                window.gtag?.("event", "language_switch", { event_category: "engagement", event_label: "hint_to_en" });
                setLanguage("en");
                // Il pulsante sparisce dopo la scelta: senza questo il focus
                // finirebbe su <body> e uno screen reader perderebbe il punto.
                requestAnimationFrame(() => document.getElementById("main-content")?.focus());
              }}
              lang="en"
              aria-label="English"
              className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border bg-card font-work text-[11px] font-semibold tracking-[0.08em] text-foreground transition-colors duration-base hover:bg-muted lg:hidden"
            >
              EN
            </button>
          ) : (
            <div className="w-11 lg:hidden" aria-hidden="true" />
          )}
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
          className={`absolute left-0 top-0 h-dvh w-80 max-w-[85vw] bg-background shadow-2xl transform transition-transform duration-slow ease-out flex flex-col border-r border-border/75 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-border/75 flex items-center justify-between">
            <Link 
              to={lp("/")} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="flex items-center gap-3 focus:outline-hidden focus:ring-2 focus:ring-primary/50 rounded-lg"
              aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
            >
              <Logo className="w-10 h-10" showTagline={false} aria-hidden="true" />
              <span className="font-cormorant text-lg font-bold text-foreground">My Secret Garden</span>
            </Link>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-high-contrast hover:text-foreground hover:bg-muted/30 transition-colors focus:outline-hidden focus:ring-2 focus:ring-primary/50"
              aria-label={language === "de" ? "Menü schließen" : "Close navigation menu"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 p-6 space-y-1 overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = link.to === "/" ? basePath === "/" : basePath.startsWith(link.to);

              return (
                <Link
                  key={link.to}
                  to={lp(link.to)}
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
