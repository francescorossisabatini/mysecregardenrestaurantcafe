import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
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

  // Mobile bottom offset to avoid overlap with MobileStickyBar
  const mobileBottomOffset = isMobile ? "calc(5rem + env(safe-area-inset-bottom))" : "calc(1rem + env(safe-area-inset-bottom))";

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-[60] p-3 md:p-6 transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
      style={{ paddingBottom: mobileBottomOffset }}
    >
      <div className="container mx-auto max-w-2xl">
        <div className="bg-background border border-border rounded-2xl shadow-xl p-4 md:p-6">
          <div className="flex items-start gap-3 md:gap-4">
            <div className="flex-1 space-y-2 md:space-y-3">
              <p className="font-lora text-xs md:text-base text-foreground/80 leading-relaxed">
                {language === "de" 
                  ? "Wir verwenden Cookies zur Analyse. Sie können wählen, welche Sie akzeptieren."
                  : "We use cookies for analytics. You can choose which to accept."
                }
              </p>
              
              <div className="flex items-center gap-2 md:gap-3">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm h-8 md:h-9 px-3 md:px-4"
                >
                  {language === "de" ? "Akzeptieren" : "Accept"}
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  size="sm"
                  className="text-xs md:text-sm h-8 md:h-9 px-3 md:px-4"
                >
                  {language === "de" ? "Ablehnen" : "Decline"}
                </Button>
                <a 
                  href="/privacy" 
                  className="text-xs text-muted-foreground underline hover:text-foreground ml-1 hidden sm:inline"
                >
                  {language === "de" ? "Datenschutz" : "Privacy"}
                </a>
              </div>
            </div>
            
            <button 
              onClick={handleReject}
              className="text-muted-foreground hover:text-foreground transition-colors p-1 -mt-1"
              aria-label={language === "de" ? "Schließen" : "Close"}
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
