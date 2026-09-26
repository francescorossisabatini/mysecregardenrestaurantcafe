import { useCallback, useEffect, useRef, useState } from "react";
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

  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const drawerCloseRef = useRef<HTMLButtonElement>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname, setIsMobileMenuOpen]);

  // Chiusura dall'utente (X, backdrop, Escape): il focus torna all'hamburger.
  // Il cambio di route invece chiude senza toccare il focus, che lì va in
  // cima al nuovo contenuto (DESIGN_SYSTEM §8).
  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, [setIsMobileMenuOpen]);

  // Drawer come dialog modale (WCAG 2.2 AA 2.4.11, critico cieco 26/09/2026):
  // prima il focus restava sull'hamburger coperto dal pannello, Escape non
  // chiudeva, e il Tab passava da logo e "EN" sotto il backdrop.
  useEffect(() => {
    // React 18 non conosce l'attributo inert: si usa la proprietà DOM.
    if (navRef.current) navRef.current.inert = isMobileMenuOpen;
    if (!isMobileMenuOpen) return;

    drawerCloseRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = drawerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

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
      {/* Stessa altezza su hero e a nav scrollata (60px su mobile, §6 Top
          bar): cambiano solo i colori, in un'unica transizione da 250ms.
          Prima la barra passava da 72 a 60px e logo e wordmark si
          rimpicciolivano insieme: tre animazioni in contemporanea (§7). */}
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 h-[60px] transition-colors duration-base ease-in-out md:h-auto md:py-2 ${
          isHeroOverlay
            ? "border-b border-transparent bg-transparent before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[120%] before:bg-linear-to-b before:from-foreground/72 before:via-foreground/40 before:to-transparent before:content-['']"
            : "border-b border-border/60 bg-background backdrop-blur-2xl"
        }`}
      >
        <div className="relative mx-auto flex h-full w-full max-w-[1240px] items-center gap-4 px-5 sm:px-6 md:h-auto md:min-h-14 lg:gap-8 lg:px-8">
          {/* Mobile Menu Trigger (left, mobile only) */}
          <div className="flex items-center lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              // Stessa superficie su hero e a nav scrollata, gemella del
              // pulsante "EN": token pieni di DESIGN_SYSTEM §3, focus dalla
              // regola globale §8. Offset 0: con i 2px di default l'anello
              // cade sullo scrim scuro dell'hero (1.6:1), appoggiato al disco
              // crema regge (vedi divergence-ledger, 26/09/2026).
              className="inline-flex h-11 w-11 touch-manipulation items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors duration-base hover:bg-muted focus-visible:outline-offset-0"
              // Niente stato X: a drawer aperto il pulsante sta sotto il
              // pannello e non si vede. Si chiude dalla X del drawer.
              aria-label={language === "de" ? "Menü öffnen" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-nav-drawer"
            >
              <Menu className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          {/* Logo + Wordmark (left on desktop, centered on mobile) */}
          <Link
            to={lp("/")}
            className="group flex min-w-0 flex-1 items-center justify-center gap-2.5 rounded-lg py-1 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 lg:flex-initial lg:justify-start lg:gap-3"
            aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
          >
            <Logo
              className="h-10 w-10 flex-shrink-0 lg:h-11 lg:w-11"
              showTagline={false}
              aria-hidden="true"
            />
            <span className={`block max-w-[7.5rem] truncate font-work text-[10px] font-medium uppercase tracking-[0.14em] transition-colors duration-base sm:hidden ${isHeroOverlay ? "text-background" : "text-primary/85"}`}>
              {activeNavLabel}
            </span>
            <span className={`hidden min-w-0 truncate font-cormorant text-xl font-bold leading-none transition-colors duration-base sm:block lg:text-[22px] ${isHeroOverlay ? "text-background drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] group-hover:text-background/90" : "text-foreground group-hover:text-primary"}`}>
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
                      className={`inline-flex min-h-[28px] items-center whitespace-nowrap font-work text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-base focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-lg ${baseColor} ${isHeroOverlay ? "drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)]" : ""}`}
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
              aria-label="English version"
              className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border bg-card font-work text-[11px] font-bold tracking-[0.08em] text-foreground transition-colors duration-base hover:bg-muted focus-visible:outline-offset-0 lg:hidden"
            >
              EN
            </button>
          ) : (
            <div className="w-11 lg:hidden" aria-hidden="true" />
          )}
        </div>
      </nav>



      {/* Mobile Menu Drawer */}
      {/* Visibile subito all'apertura (duration-0), altrimenti per il primo
          frame resta visibility:hidden e il focus non entra nel drawer.
          In chiusura resta visibile per la durata della transizione. */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden transition-[visibility] ease-out ${
          isMobileMenuOpen ? "visible duration-0" : "invisible duration-base"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-foreground/50 transition-opacity duration-base ease-out ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={closeMenu}
        />

        {/* Drawer */}
        {/* Solo bordo, niente ombra: bordo + ombra sulla stessa superficie
            è un fallimento duro del direction lock. Il backdrop stacca già. */}
        <div
          ref={drawerRef}
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={language === "de" ? "Menü" : "Menu"}
          className={`absolute left-0 top-0 h-dvh w-80 max-w-[85vw] bg-background transform transition-transform duration-slow ease-out flex flex-col border-r border-border ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-border/75 flex items-center justify-between">
            <Link 
              to={lp("/")} 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="flex items-center gap-3 rounded-lg"
              aria-label={language === "de" ? "Zur Startseite" : "Go to homepage"}
            >
              <Logo className="w-10 h-10" showTagline={false} aria-hidden="true" />
              <span className="font-cormorant text-lg font-bold text-foreground">My Secret Garden</span>
            </Link>
            {/* Stesso disco dell'hamburger: apertura e chiusura dello stesso
                pannello hanno la stessa forma. Focus dalla regola globale §8. */}
            <button
              ref={drawerCloseRef}
              type="button"
              onClick={closeMenu}
              className="inline-flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors duration-base hover:bg-muted focus-visible:outline-offset-0"
              aria-label={language === "de" ? "Menü schließen" : "Close menu"}
            >
              <X className="w-5 h-5" aria-hidden="true" />
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
