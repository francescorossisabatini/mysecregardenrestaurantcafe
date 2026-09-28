import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, Phone, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { useLanguage, useLocalizedPath } from "@/contexts/LanguageContext";
import { deviceLanguageIsNotGerman, stripLanguagePrefix } from "@/lib/i18nRoutes";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { SITE } from "@/config/site";
import { getNextOpening, getOpenStatus } from "@/lib/openStatus";
import { useTodayClosed } from "@/hooks/useTodayClosed";
import { useWeeklyMenuAvailable } from "@/hooks/useWeeklyMenuAvailable";
import { getHolidayForDate } from "@/data/holidaysData";
import { splitDishText } from "@/lib/splitDishText";
import { cleanDisplayText } from "@/lib/displayText";

const WEEKDAYS = {
  de: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"],
  en: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
};

const isDishText = (text?: string) => {
  const t = (text ?? "").trim();
  return !!t && !/^#(VALUE!?|N\/A|REF!|DIV\/0!|NAME\?|NULL!|NUM!)/i.test(t);
};

/**
 * Il blocco di oggi in cima al drawer: stato, piatti, telefono.
 *
 * Lo stato viene dallo stesso calcolo del badge dell'hero. Chiuso vuol dire
 * solo domenica, festivo o fuori orario: un foglio non ancora aggiornato non
 * chiude il locale (bug del 27/09/2026, vedi useTodayClosed). Da chiuso dice
 * quando si riapre (voice-spec, "Heute geschlossen. Morgen ab 11:00 wieder da.").
 *
 * I piatti sono il dato che Google non ha (direction lock): in Cormorant, più
 * pesanti delle voci, come un solo link a /menu. Se oggi siamo aperti ma il
 * foglio non ha ancora i piatti, lo dice (voice-spec, stato vuoto).
 *
 * Montato con la Navigation, non all'apertura: quando apri il drawer il menu
 * è già letto (cache di 5 minuti) e niente salta sotto il pollice. Prima lo
 * spazio riservato era 84px contro 118 reali, e il telefono si spostava.
 */
const DrawerToday = ({ language, menuHref, onMenuClick, phone }: { language: "de" | "en"; menuHref: string; onMenuClick: () => void; phone: ReactNode }) => {
  const { isClosed: isClosedToday, isLoading, todayMenu, loadedAt, error } = useTodayClosed();
  const weeklyMenuAvailable = useWeeklyMenuAvailable(loadedAt);
  const now = new Date();
  const status = getOpenStatus(SITE.openingHours, now);

  // Mentre il menu carica: solo la riga di stato riservata. Il telefono sta
  // subito sotto lo stato, quindi non si muove quando arrivano i piatti.
  if (isLoading) return <><p className="min-h-11" aria-hidden="true" />{phone}</>;

  const isOpen = status.isOpen && !isClosedToday;
  const next = getNextOpening(SITE.openingHours, now, (date) => getHolidayForDate(date) !== null);
  const reopen = !next
    ? ""
    : next.daysAhead === 1
      ? language === "de" ? ` Morgen ab ${next.open} wieder da.` : ` Back tomorrow from ${next.open}.`
      : language === "de" ? ` Am ${WEEKDAYS.de[next.weekday]} ab ${next.open} wieder da.` : ` Back ${WEEKDAYS.en[next.weekday]} from ${next.open}.`;

  const label = isOpen && status.closesAt
    ? language === "de" ? `Heute bis ${status.closesAt} geöffnet` : `Open today until ${status.closesAt}`
    : !isClosedToday && status.opensAt
      ? language === "de" ? `Heute ab ${status.opensAt} geöffnet` : `Open today from ${status.opensAt}`
      : isClosedToday
        ? (language === "de" ? "Heute geschlossen." : "Closed today.") + reopen
        : (language === "de" ? "Jetzt geschlossen." : "Closed now.") + reopen;

  // Piatti solo per oggi e solo finché ha senso venire: non da chiusi, non
  // dopo la chiusura, non se il foglio è ancora quello della settimana scorsa.
  const showDishes = !isClosedToday && !status.isAfterClosing && weeklyMenuAvailable && !!todayMenu;
  const dishNames = showDishes
    ? (["soup", "green", "blue"] as const)
        .map((key) => ({ key, text: todayMenu[key]?.[language] }))
        .filter((dish) => isDishText(dish.text))
        .map((dish) => cleanDisplayText(splitDishText(dish.text as string, language, dish.key).name))
    : [];

  // Aperto oggi, ma il foglio non ha ancora i piatti: lo stato vuoto di
  // voice-spec, senza telefono perché il telefono sta subito sotto.
  // Solo se il foglio è stato letto davvero: con un errore di rete la karte
  // può essere online, siamo noi a non raggiungerla.
  const menuNotOnline = !error && !isClosedToday && !status.isAfterClosing && dishNames.length === 0;
  // Pallino: verde aperto, neutro "apre alle 11", rosso chiuso (§6, 6px).
  const dot = isOpen ? "bg-success" : !isClosedToday && status.opensAt ? "bg-muted-foreground" : "bg-destructive";

  return (
    <>
      {/* Pallino fuori dal filo (x≈12, l'asse della lineetta della voce
          attiva): il testo resta a 20px come tutto il resto del drawer. */}
      <p className="relative min-h-11 py-2.5 font-work text-sm font-medium text-foreground">
        <span aria-hidden="true" className={`absolute -left-2.5 top-[18px] h-1.5 w-1.5 rounded-full ${dot}`} />
        {label}
      </p>
      {phone}
      {dishNames.length > 0 && (
        // -mx-2 px-2: l'anello di focus non tocca le lettere. min-h-11 per
        // i giorni con un piatto solo. Sottolineati come il telefono: si
        // capisce che si toccano.
        <Link to={menuHref} onClick={onMenuClick} className="-mx-2 block min-h-11 space-y-1.5 rounded-lg px-2 py-1">
          {/* Detto solo allo screen reader: il link porta alla Speisekarte
              (WCAG 2.4.4). A vista i piatti bastano. */}
          <span className="sr-only">{language === "de" ? "Speisekarte: " : "Menu: "}</span>
          {dishNames.map((name) => (
            <span key={name} className="block font-cormorant text-xl font-semibold leading-snug text-foreground underline decoration-border underline-offset-4">
              {name}
            </span>
          ))}
        </Link>
      )}
      {menuNotOnline && (
        <p className="py-1 font-cormorant text-xl italic leading-snug text-muted-foreground">
          {language === "de" ? "Die Karte von heute steht noch nicht online. Wir schreiben sie jeden Morgen." : "Today's menu isn't online yet. We write it every morning."}
        </p>
      )}
    </>
  );
};

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
  // La barra non cambia stato quando si apre il drawer: sta sotto il
  // backdrop ed è inert, e cambiarla aggiungeva una terza animazione (§7).
  const isHeroOverlay = isHome && !isScrolled;

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
  // cima al nuovo contenuto (useFocusMainOnRouteChange, DESIGN_SYSTEM §8).
  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
    requestAnimationFrame(() => menuButtonRef.current?.focus());
  }, [setIsMobileMenuOpen]);

  // Voce del drawer verso la pagina in cui sei già: il percorso non cambia,
  // quindi il focus non andrebbe su <main> e finirebbe su <body>. Si chiude
  // come con la X e il focus torna all'hamburger.
  const closeOrStay = (to: string) => {
    if (location.pathname === lp(to)) closeMenu();
    else setIsMobileMenuOpen(false);
  };

  // Drawer come dialog modale (WCAG 2.2 AA 2.4.11, critico cieco 26/09/2026):
  // prima il focus restava sull'hamburger coperto dal pannello, Escape non
  // chiudeva, e il Tab passava da logo e "EN" sotto il backdrop.
  useEffect(() => {
    // React 18 non conosce l'attributo inert: si usa la proprietà DOM.
    if (navRef.current) navRef.current.inert = isMobileMenuOpen;
    if (!isMobileMenuOpen) return;

    // Anche il resto della pagina esce dal Tab: prima Shift+Tab usciva sotto
    // il modale, sullo skip link.
    const behind = [...document.querySelectorAll<HTMLElement>('#main-content, footer, a[href="#main-content"]')];
    behind.forEach((el) => { el.inert = true; });

    // Dialog modale: la pagina sotto non scorre.
    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";

    // Si aspetta che la X sia davvero visibile prima di darle il focus: con
    // prefers-reduced-motion al primo frame è ancora visibility:hidden e
    // focus() viene ignorato (misurato, 26/09/2026). Al massimo ~20 frame.
    let focusFrame = 0;
    let focusTries = 0;
    const focusClose = () => {
      const close = drawerCloseRef.current;
      if (close && getComputedStyle(close).visibility === "visible") close.focus();
      else if (focusTries++ < 20) focusFrame = requestAnimationFrame(focusClose);
    };
    focusClose();
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
    return () => {
      cancelAnimationFrame(focusFrame);
      root.style.overflow = previousOverflow;
      behind.forEach((el) => { el.inert = false; });
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen, closeMenu]);

  useEffect(() => {
    const updateScrolled = () => setIsScrolled(window.scrollY > 28);
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [location.pathname]);

  // Ordine per domanda del profilo A ("vengo oggi?"): Besuche uns prima di
  // Galerie. Stessa lista per drawer e nav desktop (ledger, 26/09/2026).
  const navLinks = [
    { to: "/", label: language === "de" ? "Startseite" : "Home" },
    { to: "/menu", label: language === "de" ? "Speisekarte" : "Menu" },
    { to: "/visit", label: language === "de" ? "Besuch uns" : "Visit us" },
    { to: "/gallery", label: language === "de" ? "Galerie" : "Gallery" },
    { to: "/about", label: language === "de" ? "Unsere Geschichte" : "Our Story" },
  ];
  // Contiene il testo visibile del wordmark ("My Secret Garden"): WCAG 2.5.3.
  const homeLinkLabel = language === "de" ? "My Secret Garden, Startseite" : "My Secret Garden, home";

  return (
    <>
      {/* Stessa altezza su hero e a nav scrollata (60px su mobile, §6 Top
          bar): cambiano solo i colori, in un'unica transizione da 250ms.
          Prima la barra passava da 72 a 60px e logo e wordmark si
          rimpicciolivano insieme: tre animazioni in contemporanea (§7). */}
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-50 h-[calc(60px+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] transition-colors duration-base ease-in-out before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-[120%] before:bg-linear-to-b before:from-foreground/72 before:via-foreground/40 before:to-transparent before:transition-opacity before:duration-base before:content-[''] md:h-auto md:py-2 ${
          isHeroOverlay
            ? "border-b border-transparent bg-transparent before:opacity-100"
            : "border-b border-border bg-nav-surface backdrop-blur before:opacity-0"
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
          {/* flex-1 sul contenitore, non sul link: prima il link copriva
              230px di barra vuota e un tocco lì portava alla home. */}
          <div className="flex min-w-0 flex-1 justify-center lg:flex-initial lg:justify-start">
          <Link
            to={lp("/")}
            // Focus dalla regola globale §8; sull'hero l'anello navy spariva sullo
            // scrim (1.14:1), quindi lì diventa chiaro.
            className={`group flex min-w-0 items-center gap-2.5 rounded-lg py-1 lg:gap-3 ${isHeroOverlay ? "focus-visible:outline-primary-foreground" : ""}`}
            aria-label={homeLinkLabel}
          >
            <Logo
              className="h-11 w-11 flex-shrink-0"
              showTagline={false}
              aria-hidden="true"
            />
            <span className={`hidden min-w-0 truncate font-cormorant text-xl font-bold leading-none transition-colors duration-base sm:block lg:text-[22px] ${isHeroOverlay ? "text-primary-foreground drop-shadow-[0_1px_2px_hsl(var(--foreground)/0.35)] group-hover:text-primary-foreground/90" : "text-foreground group-hover:text-primary"}`}>
              My Secret Garden
            </span>
          </Link>
          </div>

          {/* Desktop Nav Links + Language (right) */}
          <div className="ml-auto hidden items-center gap-6 lg:flex xl:gap-8">
            <ul className="flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => {
                const isActive = link.to === "/" ? basePath === "/" : basePath.startsWith(link.to);
                const baseColor = isHeroOverlay
                  ? isActive
                    ? "text-primary-foreground"
                    : "text-primary-foreground/85 hover:text-primary-foreground"
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
                      className={`inline-flex min-h-[28px] items-center whitespace-nowrap font-work text-[11px] font-medium uppercase tracking-[0.14em] transition-colors duration-base focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 rounded-lg ${baseColor} ${isHeroOverlay ? "drop-shadow-[0_1px_2px_hsl(var(--foreground)/0.35)]" : ""}`}
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
                  ? "bg-background/20 text-primary-foreground backdrop-blur-md hover:bg-background/30"
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
              aria-label="EN, English version"
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
      {/* Visibile subito all'apertura, senza transizione: altrimenti per il
          primo frame resta visibility:hidden e il focus non entra nel drawer.
          transition-none e non duration-0, perché con prefers-reduced-motion
          index.css forza 100ms !important su ogni durata. In chiusura resta
          visibile quanto dura lo slide del pannello (duration-slow). */}
      <div
        className={`fixed inset-0 z-[70] lg:hidden ${
          isMobileMenuOpen ? "visible transition-none" : "invisible transition-[visibility] duration-slow ease-out"
        }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-foreground/50 transition-opacity duration-slow ease-out ${
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
          className={`absolute left-0 top-0 h-dvh w-80 max-w-[85vw] overflow-y-auto overscroll-contain bg-background transform transition-transform duration-slow ease-out flex flex-col border-r border-border ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Header: solo la X, nel punto esatto in cui c'era l'hamburger.
              Prima qui c'era il logo cliccabile: ritoccare lo stesso punto per
              chiudere portava alla home, ed era un doppione di "Startseite". */}
          {/* border-b trasparente: stessa scatola della barra (60px bordo
              compreso), così la X cade al pixel sull'hamburger. */}
          <div className="flex h-[calc(60px+env(safe-area-inset-top))] shrink-0 items-center border-b border-transparent px-5 pt-[env(safe-area-inset-top)]">
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

          {/* Oggi, prima delle voci: stato e piatti sono il dato che la
              pagina porta (direction lock). Il profilo B li vede aprendo il
              drawer, senza passare da "Speisekarte". */}
          <div className="shrink-0 px-5 pb-2">
            <DrawerToday
              language={language}
              menuHref={lp("/menu")}
              onMenuClick={() => closeOrStay("/menu")}
              // Il telefono è il canale suggerito (CLAUDE.md): link testuale,
              // perché l'azione primaria verde resta quella della barra fissa.
              phone={
                <a
                  href={`tel:${SITE.phoneTel}`}
                  data-call-source="drawer"
                  className="inline-flex min-h-11 items-center font-work text-sm font-medium text-foreground underline decoration-border underline-offset-4 transition-colors duration-base hover:decoration-foreground"
                >
                  {language === "de" ? "Ruf an: " : "Call: "}{SITE.phoneDisplay}
                </a>
              }
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1 px-2 py-4">
            {navLinks.map((link) => {
              const isActive = link.to === "/" ? basePath === "/" : basePath.startsWith(link.to);

              return (
                // "Sei qui" con la lineetta verde da 2px della nav desktop (§3,
                // nav attivo) più il peso. Il testo resta navy: text-accent su
                // questo sfondo è 4.37:1, sotto AA a 14px. La pill bg-muted
                // di prima era 1.07:1.
                <Link
                  key={link.to}
                  to={lp(link.to)}
                  onClick={() => closeOrStay(link.to)}
                  aria-current={isActive ? "page" : undefined}
                  className={`relative block rounded-full px-3 py-3 font-work text-sm font-medium uppercase tracking-[0.08em] transition-colors duration-base hover:bg-muted active:bg-muted ${isActive ? "font-semibold text-foreground" : "text-foreground"}`}
                >
                  {isActive && (
                    <span aria-hidden="true" className="absolute left-1 top-1/2 h-3 w-[2px] -translate-y-1/2 bg-accent" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Lo spazio flessibile sta qui, sotto le cose che contano. */}
          <div className="flex-1" aria-hidden="true" />

          {/* Language switcher inside drawer */}
          <div className="flex items-center justify-between gap-4 px-5 pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <span className="font-work text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              {language === "de" ? "Sprache" : "Language"}
            </span>
            <LanguageSwitcher variant="mobile" />
          </div>

        </div>
      </div>
    </>
  );
};
