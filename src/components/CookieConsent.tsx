import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
        isClosing ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
      }`}
      style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
    >
      <div className="container mx-auto max-w-2xl">
        <div className="bg-background border border-border rounded-2xl shadow-xl p-5 md:p-6">
          <div className="flex items-start gap-4">
            <div className="flex-1 space-y-3">
              <p className="font-lora text-sm md:text-base text-foreground/80 leading-relaxed">
                {language === "de" 
                  ? "Wir verwenden Cookies, um Ihre Erfahrung zu verbessern und unsere Website zu analysieren. Sie können wählen, welche Cookies Sie akzeptieren möchten."
                  : "We use cookies to improve your experience and analyze our website. You can choose which cookies you want to accept."
                }
              </p>
              
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {language === "de" ? "Alle akzeptieren" : "Accept all"}
                </Button>
                <Button
                  onClick={handleReject}
                  variant="outline"
                  size="sm"
                >
                  {language === "de" ? "Nur notwendige" : "Only necessary"}
                </Button>
              </div>
              
              <p className="text-xs text-muted-foreground">
                {language === "de" ? (
                  <>Mehr Informationen in unserer <a href="/privacy" className="text-primary underline hover:text-primary/80">Datenschutzerklärung</a>.</>
                ) : (
                  <>More information in our <a href="/privacy" className="text-primary underline hover:text-primary/80">Privacy Policy</a>.</>
                )}
              </p>
            </div>
            
            <button 
              onClick={handleReject}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label={language === "de" ? "Schließen" : "Close"}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
