import { useCallback, useEffect, useId, useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronDown, ChevronUp, Lock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadAnalytics?: () => void;
    loadContentsquare?: () => void;
  }
}

const CONSENT_KEY = "cookie_consent_v2";
export const CONSENT_EVENT = "cookie-consent-updated";

export type ConsentCategories = {
  necessary: true;
  analytics: boolean;
  behavioral: boolean;
};

export type ConsentRecord = {
  necessary: true;
  analytics: boolean;
  behavioral: boolean;
  decidedAt: string;
  version: 2;
};

const ALL_DENIED: ConsentCategories = { necessary: true, analytics: false, behavioral: false };
const ALL_GRANTED: ConsentCategories = { necessary: true, analytics: true, behavioral: true };

export const getConsent = (): ConsentRecord | null => {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentRecord;
    if (!parsed || parsed.version !== 2) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const resetCookieConsent = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

const persistConsent = (categories: ConsentCategories) => {
  const record: ConsentRecord = {
    ...categories,
    decidedAt: new Date().toISOString(),
    version: 2,
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
  window.dispatchEvent(new Event(CONSENT_EVENT));

  // Update Google Consent Mode v2 signals.
  window.gtag?.("consent", "update", {
    analytics_storage: categories.analytics ? "granted" : "denied",
  });

  if (categories.analytics) window.loadAnalytics?.();
  if (categories.behavioral) window.loadContentsquare?.();
};

const copy = {
  de: {
    title: "Datenschutz Einstellungen",
    intro: "Notwendige Funktionen sind immer aktiv. Optionale Dienste laden wir nur, wenn du zustimmst. Du kannst deine Auswahl jederzeit ändern.",
    legal: "Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) und § 165 Abs. 3 TKG 2021. Verantwortlich gemäß DSGVO ist My Secret Garden, Wien (Österreich). Details und Widerruf jederzeit möglich:",
    rejectAll: "Alle ablehnen",
    acceptAll: "Alle akzeptieren",
    customize: "Anpassen",
    save: "Auswahl speichern",
    necessary: "Notwendig",
    necessaryDesc: "Grundfunktionen wie Sprache und Sicherheit. Diese Cookies sind immer aktiv.",
    analytics: "Statistik",
    analyticsDesc: "Google Analytics misst anonym, wie die Seite genutzt wird, damit wir sie verbessern können.",
    behavioral: "Verhaltensanalyse",
    behavioralDesc: "Contentsquare/Hotjar zeigen anonymisierte Klick und Scroll Muster, um die UX zu verbessern.",
    on: "An",
    off: "Aus",
    always: "Immer aktiv",
    privacy: "Datenschutz",
    closeLabel: "Banner schließen, ohne Auswahl zu speichern",
    showDetails: "Details anzeigen",
    hideDetails: "Details ausblenden",
  },
  en: {
    title: "Privacy settings",
    intro: "Necessary functions are always active. Optional services only load if you consent. You can change your choice at any time.",
    legal: "Legal basis: Art. 6(1)(a) GDPR (consent) and § 165(3) TKG 2021 (Austria). Data controller under GDPR is My Secret Garden, Vienna (Austria). Details and withdrawal available anytime:",
    rejectAll: "Reject all",
    acceptAll: "Accept all",
    customize: "Customize",
    save: "Save choices",
    necessary: "Necessary",
    necessaryDesc: "Core features like language and security. These cookies are always active.",
    analytics: "Analytics",
    analyticsDesc: "Google Analytics measures anonymously how the site is used so we can improve it.",
    behavioral: "Behavioral analytics",
    behavioralDesc: "Contentsquare/Hotjar show anonymized click and scroll patterns to improve UX.",
    on: "On",
    off: "Off",
    always: "Always on",
    privacy: "Privacy",
    closeLabel: "Close banner without saving a choice",
    showDetails: "Show details",
    hideDetails: "Hide details",
  },
} as const;

type ConsentRowProps = {
  title: string;
  description: string;
  checked: boolean;
  onChange?: (next: boolean) => void;
  disabled?: boolean;
  onLabel: string;
  offLabel: string;
  alwaysLabel: string;
};

const ConsentRow = ({
  title,
  description,
  checked,
  onChange,
  disabled,
  onLabel,
  offLabel,
  alwaysLabel,
}: ConsentRowProps) => {
  const reactId = useId();
  const id = `consent-${reactId}`;
  const stateLabel = disabled ? alwaysLabel : checked ? onLabel : offLabel;
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <label
          htmlFor={id}
          className={`font-work text-sm font-semibold text-foreground ${disabled ? "" : "cursor-pointer"}`}
        >
          {title}
        </label>
        <p className="font-work text-xs leading-relaxed text-muted-high-contrast">{description}</p>
      </div>
      <div className="flex shrink-0 flex-col items-end gap-1">
        {disabled ? (
          <span
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2 py-0.5 font-work text-[11px] font-semibold uppercase tracking-wide text-foreground"
            aria-label={`${title}: ${alwaysLabel}`}
          >
            <Lock className="h-3 w-3" aria-hidden="true" />
            {alwaysLabel}
          </span>
        ) : (
          <>
            <Switch
              id={id}
              checked={checked}
              onCheckedChange={(value) => onChange?.(Boolean(value))}
              aria-label={`${title}: ${stateLabel}`}
              className="data-[state=unchecked]:bg-muted-high-contrast/70 data-[state=checked]:bg-primary border-2 border-foreground/20"
            />
            <span
              aria-hidden="true"
              className={`font-work text-[11px] font-semibold uppercase tracking-wide ${checked ? "text-primary" : "text-muted-high-contrast"}`}
            >
              {stateLabel}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export const CookieConsent = () => {
  const { language } = useLanguage();
  const labels = copy[language];
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [draft, setDraft] = useState<ConsentCategories>(ALL_DENIED);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const evaluate = () => {
      const consent = getConsent();
      if (!consent) {
        setIsVisible(true);
        setShowDetails(false);
        setDraft(ALL_DENIED);
      }
    };

    const timer = setTimeout(evaluate, 700);
    window.addEventListener(CONSENT_EVENT, evaluate);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, evaluate);
    };
  }, []);

  // EAA: when dialog opens, store the previous focus and move focus into the dialog.
  // When it closes, restore focus.
  useEffect(() => {
    if (!isVisible) return;
    previouslyFocusedRef.current = document.activeElement as HTMLElement | null;
    const focusTarget = dialogRef.current?.querySelector<HTMLElement>(
      "button, [href], [tabindex]:not([tabindex='-1'])"
    );
    focusTarget?.focus();
    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, [isVisible]);

  // EAA: focus trap inside the dialog (Tab / Shift+Tab cycle).
  useEffect(() => {
    if (!isVisible) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex='-1'])"
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isVisible]);

  // Keyboard support: ESC closes the details panel without saving consent (banner stays).
  useEffect(() => {
    if (!isVisible || !showDetails) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        setShowDetails(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isVisible, showDetails]);

  const finishWithAnimation = useCallback(() => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 260);
  }, []);

  const handleAcceptAll = () => {
    persistConsent(ALL_GRANTED);
    finishWithAnimation();
  };

  const handleRejectAll = () => {
    persistConsent(ALL_DENIED);
    finishWithAnimation();
  };

  const handleSaveSelection = () => {
    persistConsent(draft);
    finishWithAnimation();
  };

  if (!isVisible) return null;

  const mobileBottomOffset = isMobile
    ? "calc(0.75rem + env(safe-area-inset-bottom))"
    : "calc(1rem + env(safe-area-inset-bottom))";

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] px-3 pt-3 md:p-6 transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
      style={{ paddingBottom: mobileBottomOffset }}
    >
      <div className="container mx-auto max-w-2xl md:mr-0 md:max-w-xl lg:max-w-2xl">
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-description"
          className="surface-card rounded-lg border p-4 shadow-design-elevated md:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p
                id="cookie-consent-title"
                className="font-work text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-primary md:text-xs"
              >
                {labels.title}
              </p>
              <p
                id="cookie-consent-description"
                className="font-lora text-sm leading-snug text-foreground/90 md:text-base md:leading-relaxed"
              >
                {labels.intro}
              </p>
              <p className="font-work text-[11px] leading-relaxed text-muted-high-contrast md:text-xs">
                {labels.legal}{" "}
                <a href="/privacy" className="underline underline-offset-2 hover:text-foreground">
                  {labels.privacy}
                </a>
                .
              </p>
            </div>
            <button
              type="button"
              onClick={() => setShowDetails((value) => !value)}
              aria-expanded={showDetails}
              aria-controls="cookie-consent-details"
              className="flex h-8 shrink-0 items-center gap-1 rounded-md border border-border bg-background px-2 text-xs font-semibold text-foreground transition-colors hover:bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              {showDetails ? labels.hideDetails : labels.showDetails}
              {showDetails ? <ChevronUp className="h-3.5 w-3.5" aria-hidden="true" /> : <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          </div>

          {showDetails ? (
            <div id="cookie-consent-details" className="mt-4 grid gap-3 rounded-md border border-border bg-background/60 p-3 md:p-4">
              <ConsentRow
                title={labels.necessary}
                description={labels.necessaryDesc}
                checked
                disabled
                onLabel={labels.on}
                offLabel={labels.off}
                alwaysLabel={labels.always}
              />
              <div className="border-t border-border/60 pt-3">
                <ConsentRow
                  title={labels.analytics}
                  description={labels.analyticsDesc}
                  checked={draft.analytics}
                  onChange={(value) => setDraft((current) => ({ ...current, analytics: value }))}
                  onLabel={labels.on}
                  offLabel={labels.off}
                  alwaysLabel={labels.always}
                />
              </div>
              <div className="border-t border-border/60 pt-3">
                <ConsentRow
                  title={labels.behavioral}
                  description={labels.behavioralDesc}
                  checked={draft.behavioral}
                  onChange={(value) => setDraft((current) => ({ ...current, behavioral: value }))}
                  onLabel={labels.on}
                  offLabel={labels.off}
                  alwaysLabel={labels.always}
                />
              </div>
            </div>
          ) : null}

          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            <Button
              onClick={handleRejectAll}
              variant="outline"
              size="sm"
              className="h-10 rounded-md bg-background text-sm"
            >
              {labels.rejectAll}
            </Button>
            <Button
              onClick={showDetails ? handleSaveSelection : () => setShowDetails(true)}
              variant="outline"
              size="sm"
              className="h-10 rounded-md border-primary/40 bg-background text-sm font-semibold text-primary hover:bg-primary/5"
            >
              {showDetails ? labels.save : labels.customize}
            </Button>
            <Button
              onClick={handleAcceptAll}
              size="sm"
              className="h-10 rounded-md bg-primary text-sm text-primary-foreground hover:bg-primary/90"
            >
              {labels.acceptAll}
            </Button>
          </div>

          <div className="mt-3 flex items-center justify-end">
            <a
              href="/privacy"
              className="font-work text-xs text-muted-high-contrast underline underline-offset-2 hover:text-foreground"
            >
              {labels.privacy}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
