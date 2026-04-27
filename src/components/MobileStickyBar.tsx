import { Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SITE } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { getConsentStatus } from "@/components/CookieConsent";
import { getHeroAbVariant, trackHeroAbEvent } from "@/lib/heroAbTest";

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
  const callAriaLabel = language === "de" ? "Restaurant anrufen" : "Call the restaurant";
  const visitLabel = language === "de" ? "Besuch" : "Visit";
  const visitAriaLabel = language === "de" ? "Besuchsinfos öffnen" : "Open visit information";
  const heroVariant = getHeroAbVariant({ assign: false });

  // Hide sticky bar when cookie consent is pending
  const shouldShow = isVisible && !isMobileMenuOpen && !cookieConsentPending;

  return (
    <div
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-nav-surface backdrop-blur-md
        border-t border-border/75
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
      <div className="flex max-w-md gap-3 mx-auto">
        {/* Call Button - Primary */}
        <a
          href={`tel:${SITE.phoneTel}`}
          onClick={() => trackHeroAbEvent('click_call', { event_category: 'engagement', event_label: 'mobile_sticky_bar' }, heroVariant)}
          className="flex-1 flex items-center justify-center gap-2
            bg-accent text-accent-foreground
            rounded-full py-3 px-4
            text-base font-medium font-work
            shadow-soft
            active:scale-95
            transition-all duration-200
            touch-manipulation
            focus:outline-none focus:ring-2 focus:ring-ring/50 focus:ring-offset-2"
          aria-label={callAriaLabel}
        >
          <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
          <span>{callLabel}</span>
        </a>

        <Link
          to="/visit"
          onClick={() => trackHeroAbEvent('click_visit', { event_category: 'engagement', event_label: 'mobile_sticky_bar' }, heroVariant)}
          className="flex-1 flex items-center justify-center gap-2
            bg-primary text-primary-foreground
            rounded-full py-3 px-4
            text-base font-medium font-work
            shadow-soft
            active:scale-95
            transition-all duration-200
            touch-manipulation
            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
          aria-label={visitAriaLabel}
        >
          <MapPin className="w-4 h-4 flex-shrink-0" strokeWidth={2} aria-hidden="true" />
          <span>{visitLabel}</span>
        </Link>
      </div>
    </div>
  );
};
