import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadAnalytics?: () => void;
    loadContentsquare?: () => void;
  }
}

const CONSENT_KEY = "cookie_consent";
const CONSENT_EVENT = "cookie-consent-updated";

export type ConsentStatus = "pending" | "accepted" | "rejected";

export const getConsentStatus = (): ConsentStatus => {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return "pending";
};

export const resetCookieConsent = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event(CONSENT_EVENT));
};

export const CookieConsent = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const showIfPending = () => {
      const consent = getConsentStatus();
      if (consent === "pending") setIsVisible(true);
    };

    const timer = setTimeout(showIfPending, 700);
    window.addEventListener(CONSENT_EVENT, showIfPending);
    return () => {
      clearTimeout(timer);
      window.removeEventListener(CONSENT_EVENT, showIfPending);
    };
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    window.dispatchEvent(new Event(CONSENT_EVENT));
    closeWithAnimation();
    window.loadAnalytics?.();
    window.gtag?.("consent", "update", { analytics_storage: "granted" });
    window.loadContentsquare?.();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    window.dispatchEvent(new Event(CONSENT_EVENT));
    window.gtag?.("consent", "update", { analytics_storage: "denied" });
    closeWithAnimation();
  };

  const closeWithAnimation = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  // Keep the banner compact on mobile; MobileStickyBar stays hidden while consent is pending.
  const mobileBottomOffset = isMobile ? "calc(0.75rem + env(safe-area-inset-bottom))" : "calc(1rem + env(safe-area-inset-bottom))";

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[60] px-3 pt-3 md:p-6 transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
      style={{ paddingBottom: mobileBottomOffset }}
    >
      <div className="container mx-auto max-w-xl md:mr-0 md:max-w-lg lg:max-w-xl">
        <div className="border rounded-lg p-3 shadow-design-elevated surface-card md:p-5 lg:p-6" role="dialog" aria-modal="false" aria-labelledby="cookie-consent-title" aria-describedby="cookie-consent-description">
          <div className="flex items-start gap-2.5 md:gap-4">
            <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
              <div className="space-y-1">
                <p id="cookie-consent-title" className="font-work text-[0.68rem] md:text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {language === "de" ? "Datenschutz Einstellungen" : "Privacy settings"}
                </p>
                <p id="cookie-consent-description" className="font-lora text-xs md:text-base text-foreground/90 leading-snug md:leading-relaxed">
                  {language === "de" 
                    ? "Notwendige Funktionen sind immer aktiv. Analyse Dienste wie Google Analytics und Contentsquare/Hotjar laden wir nur, wenn Sie zustimmen. Ablehnen ist genauso einfach wie zustimmen."
                    : "Necessary functions are always active. Analytics services such as Google Analytics and Contentsquare/Hotjar load only if you consent. Refusing is as easy as accepting."
                  }
                </p>
              </div>
              
              <div className="grid gap-2 sm:grid-cols-2 md:gap-3">
                <Button
                  onClick={handleReject}
                  variant="outline"
                  size="sm"
                  className="h-9 rounded-md bg-background text-xs md:h-10 md:text-sm"
                >
                  {language === "de" ? "Ablehnen" : "Reject"}
                </Button>
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="h-9 rounded-md bg-primary text-xs text-primary-foreground hover:bg-primary/90 md:h-10 md:text-sm"
                >
                  {language === "de" ? "Zustimmen" : "Accept"}
                </Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={handleReject} className="font-work text-xs text-muted-high-contrast underline underline-offset-2 hover:text-foreground">
                  {language === "de" ? "Nur notwendige Cookies" : "Necessary only"}
                </button>
                <a 
                  href="/privacy" 
                  className="font-work text-xs text-muted-high-contrast underline underline-offset-2 hover:text-foreground"
                >
                  {language === "de" ? "Datenschutz" : "Privacy"}
                </a>
              </div>
            </div>
            
            <button 
              onClick={handleReject}
              className="text-muted-high-contrast hover:text-foreground transition-colors p-1 -mt-1 rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
              aria-label={language === "de" ? "Cookie Banner schließen" : "Close cookie banner"}
              title={language === "de" ? "Schließen" : "Close"}
            >
              <X className="w-4 h-4 md:w-5 md:h-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
