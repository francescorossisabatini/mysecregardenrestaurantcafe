import { Phone, MapPin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SITE } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { getConsentStatus } from "@/components/CookieConsent";

export const MobileStickyBar = () => {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const { isOpen: isMobileMenuOpen } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(false);
  const [cookieConsentPending, setCookieConsentPending] = useState(true);
  const rafRef = useRef<number | null>(null);

  // Check cookie consent status
  useEffect(() => {
    const checkConsent = () => {
      setCookieConsentPending(getConsentStatus() === "pending");
    };
    checkConsent();
    // Re-check when localStorage changes
    const handleStorage = () => checkConsent();
    window.addEventListener("storage", handleStorage);
    // Also poll occasionally in case consent changes in same tab
    const interval = setInterval(checkConsent, 1000);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(window.scrollY > 150);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  if (!isMobile) return null;

  const callLabel = language === "de" ? "Anrufen" : "Call";
  const directionsLabel = language === "de" ? "Route" : "Directions";

  // Hide sticky bar when cookie consent is pending
  const shouldShow = isVisible && !isMobileMenuOpen && !cookieConsentPending;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-background/95 backdrop-blur-md
        border-t border-border/30
        px-4 py-3
        transition-all duration-300 ease-out
        ${shouldShow
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-full pointer-events-none"
        }
      `}
      style={{ 
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))',
        WebkitTapHighlightColor: 'transparent' 
      }}
    >
      <div className="flex gap-3 max-w-md mx-auto">
        {/* Call Button - Primary */}
        <a
          href={`tel:${SITE.phoneTel}`}
          className="flex-1 flex items-center justify-center gap-2 
            bg-primary text-primary-foreground
            rounded-full py-3 px-4
            text-base font-medium font-work
            shadow-sm
            active:scale-95
            transition-all duration-200
            touch-manipulation"
          aria-label={callLabel}
        >
          <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
          <span>{callLabel}</span>
        </a>

        {/* Directions Button - Secondary */}
        <a
          href={SITE.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 
            bg-muted text-foreground
            rounded-full py-3 px-4
            text-base font-medium font-work
            shadow-sm
            active:scale-95
            transition-all duration-200
            touch-manipulation"
          aria-label={directionsLabel}
        >
          <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={2} />
          <span>{directionsLabel}</span>
        </a>
      </div>
    </div>
  );
};
