/**
 * Lingua ↔ URL. Unica fonte di verità per quale lingua mostra una pagina.
 *
 * Tedesco alla radice (/menu), inglese sotto /en (/en/menu). Scelta "A"
 * del 26/09/2026: gli URL esistenti non cambiano, quindi i link esterni
 * (HappyCow, Falter, TripAdvisor, scheda Google, bio Instagram) restano
 * validi senza bisogno di redirect lato server — che su questo hosting non
 * possiamo garantire.
 *
 * Prima la lingua veniva da localStorage/navigator.language sullo stesso
 * URL: Googlebot (Chrome in en-US, senza memoria) vedeva quindi solo
 * l'inglese, anche per il mercato austriaco. Verificato in Search Console
 * il 26/09/2026 (Controllo URL: lang="en" su / e /menu).
 *
 * Regola: la lingua di una pagina dipende SOLO dal suo URL. Niente redirect
 * basato sulla lingua del dispositivo — Googlebot è un dispositivo inglese
 * e verrebbe rediretto anche lui (vedi applyStoredLanguageChoice).
 */

export type Language = "de" | "en";

export const EN_PREFIX = "/en";
export const SITE_ORIGIN = "https://secretgardenrestaurant.at";

/** Pagine che esistono in entrambe le lingue. /login e le pagine tecniche no. */
export const LOCALIZED_PATHS = [
  "/",
  "/menu",
  "/visit",
  "/about",
  "/gallery",
  "/impressum",
  "/privacy",
  "/link",
] as const;

/**
 * Vecchi indirizzi che redirigono (App.tsx). Vanno localizzati anche loro:
 * /contact è il link "Kontakt" del footer che GA4 conta come generate_lead,
 * /speisekarte/ è il link del menu su TripAdvisor.
 */
const LEGACY_PATHS = ["/contact", "/wochenkarte", "/speisekarte"];

const LOCALIZABLE: readonly string[] = [...LOCALIZED_PATHS, ...LEGACY_PATHS];

/**
 * Scelta di lingua fatta dall'utente toccando DE/EN. Chiave nuova e separata
 * dalla vecchia "preferred_language", che veniva scritta in automatico da
 * navigator.language a ogni visita: non era una scelta, e non va onorata.
 */
export const LANGUAGE_CHOICE_KEY = "msg_language_choice";

export const getLanguageFromPath = (pathname: string): Language =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "de";

/** "/en/menu" → "/menu", "/en" → "/", "/menu" → "/menu" */
export const stripLanguagePrefix = (pathname: string): string => {
  if (pathname === EN_PREFIX || pathname === `${EN_PREFIX}/`) return "/";
  if (pathname.startsWith(`${EN_PREFIX}/`)) return pathname.slice(EN_PREFIX.length);
  return pathname;
};

const normalize = (path: string) => (path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path);

export const isLocalizedPath = (pathname: string): boolean =>
  LOCALIZABLE.includes(normalize(stripLanguagePrefix(pathname)));

/**
 * Porta un percorso interno nella lingua indicata. Mantiene ?query e #hash.
 * Percorsi non localizzati (es. /login) e URL esterni restano invariati.
 */
export const localizePath = (path: string, language: Language): string => {
  if (!path.startsWith("/") || path.startsWith("//")) return path;

  const cut = path.search(/[?#]/);
  const pathname = cut === -1 ? path : path.slice(0, cut);
  const suffix = cut === -1 ? "" : path.slice(cut);

  const base = normalize(stripLanguagePrefix(pathname));
  if (!LOCALIZABLE.includes(base)) return path;

  if (language === "de") return `${base}${suffix}`;
  return `${base === "/" ? EN_PREFIX : `${EN_PREFIX}${base}`}${suffix}`;
};

export const absoluteUrl = (path: string) => `${SITE_ORIGIN}${path}`;

const readChoice = (): Language | null => {
  try {
    const value = window.localStorage.getItem(LANGUAGE_CHOICE_KEY);
    return value === "de" || value === "en" ? value : null;
  } catch {
    return null;
  }
};

export const getStoredLanguageChoice = (): Language | null =>
  typeof window === "undefined" ? null : readChoice();

export const storeLanguageChoice = (language: Language) => {
  try {
    window.localStorage.setItem(LANGUAGE_CHOICE_KEY, language);
  } catch {
    // Storage bloccato (navigazione privata, cookie disattivati): la scelta
    // vale solo per questa pagina, ed è accettabile.
  }
};

/**
 * Livello 2. Chiamato in main.tsx PRIMA che React e il router partano: se
 * l'utente ha già scelto una lingua toccando DE/EN e atterra su una pagina
 * nell'altra lingua, riscrive l'URL con history.replaceState. Essendo
 * sincrono non c'è flash di contenuto e GA4 registra una sola page_view.
 *
 * Perché è sicuro per la SEO: Googlebot non conserva localStorage tra una
 * visita e l'altra, quindi non ha mai una scelta salvata e non viene mai
 * rediretto. Vede sempre la lingua dell'URL che ha chiesto.
 */
export const applyStoredLanguageChoice = () => {
  if (typeof window === "undefined") return;
  const choice = readChoice();
  if (!choice) return;

  const { pathname, search, hash } = window.location;
  if (!isLocalizedPath(pathname)) return;
  if (getLanguageFromPath(pathname) === choice) return;

  const target = localizePath(`${pathname}${search}${hash}`, choice);
  if (target !== `${pathname}${search}${hash}`) {
    window.history.replaceState(window.history.state, "", target);
  }
};

/**
 * Livello 3: la lingua del dispositivo NON decide nulla, suggerisce soltanto.
 * true se il dispositivo non è in tedesco, così il selettore EN va reso
 * visibile. Un turista italiano o spagnolo legge meglio l'inglese.
 */
export const deviceLanguageIsNotGerman = (): boolean => {
  if (typeof navigator === "undefined") return false;
  const list = (navigator.languages?.length ? navigator.languages : [navigator.language || ""])
    .map((l) => l.toLowerCase())
    .filter(Boolean);
  // Basta il tedesco in QUALUNQUE posizione: un viennese col telefono in
  // inglese ha spesso ["en-AT", "de-AT"], legge il tedesco e non deve
  // portarsi dietro "EN" su ogni pagina (critico cieco, 26/09/2026).
  return list.length > 0 && !list.some((l) => l.startsWith("de"));
};
