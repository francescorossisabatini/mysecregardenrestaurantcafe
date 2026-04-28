import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    loadContentsquare?: () => void;
  }
}

const CONSENT_KEY = "cookie_consent";

export type ConsentStatus = "pending" | "accepted" | "rejected";

export const getConsentStatus = (): ConsentStatus => {
  if (typeof window === "undefined") return "pending";
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return "pending";
};

export const CookieConsent = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = getConsentStatus();
    if (consent === "pending") {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    closeWithAnimation();
    // Enable Google Analytics tracking after consent
    window.gtag?.('consent', 'update', { 'analytics_storage': 'granted' });
    window.loadContentsquare?.();
  };

  const handleReject = () => {
    localStorage.setItem(CONSENT_KEY, "rejected");
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
        <div className="border rounded-lg p-3 shadow-design-elevated surface-card md:p-5 lg:p-6">
          <div className="flex items-start gap-2.5 md:gap-4">
            <div className="flex-1 space-y-2 md:space-y-3 min-w-0">
              <div className="space-y-1">
                <p className="font-work text-[0.68rem] md:text-xs font-semibold uppercase tracking-[0.12em] text-primary">
                  {language === "de" ? "Analyse Cookies" : "Analytics cookies"}
                </p>
                <p className="font-lora text-xs md:text-base text-foreground/80 leading-snug md:leading-relaxed">
                  {language === "de" 
                    ? "Wir nutzen Google Analytics und Contentsquare/Hotjar, um zu verstehen, welche Inhalte helfen und wo die Website hakt. Keine Werbeprofile, kein Verkauf von Daten. Aktivierung nur mit Ihrer Zustimmung."
                    : "We use Google Analytics and Contentsquare/Hotjar to understand which content helps and where the website can improve. No advertising profiles, no sale of data. Activated only with your consent."
                  }
                </p>
              </div>
              
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm h-8 md:h-10 px-3 md:px-5 rounded-md"
                >
                  {language === "de" ? "Analyse erlauben" : "Allow analytics"}
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm h-8 md:h-10 px-3 md:px-5 rounded-md bg-background/60"
                >
                  {language === "de" ? "Nur notwendige" : "Necessary only"}
                </Button>
                <a 
                  href="/privacy" 
                  className="text-xs text-muted-high-contrast underline hover:text-foreground ml-1"
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
