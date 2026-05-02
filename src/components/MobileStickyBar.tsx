import { Phone, MapPin } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { SITE } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { useEffect, useState, useRef, useCallback } from "react";
import { getConsent } from "@/components/CookieConsent";
import { getHeroAbVariant, trackHeroAbEvent } from "@/lib/heroAbTest";

export const MobileStickyBar = () => {
  const isMobile = useIsMobile();
  const location = useLocation();
  const { language } = useLanguage();
  const { isOpen: isMobileMenuOpen } = useMobileMenu();
  const [isScrolled, setIsScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  const [cookieConsentPending, setCookieConsentPending] = useState(true);
  const rafRef = useRef<number | null>(null);

  // Cookie consent: event-based, no polling
  useEffect(() => {
    const checkConsent = () => setCookieConsentPending(getConsent() === null);
    checkConsent();
    const handleChange = () => checkConsent();
    window.addEventListener("storage", handleChange);
    window.addEventListener("cookie-consent-change", handleChange);
    return () => {
      window.removeEventListener("storage", handleChange);
      window.removeEventListener("cookie-consent-change", handleChange);
    };
  }, []);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setIsScrolled(window.scrollY > 200);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll]);

  // Hide when footer is in view (avoids overlapping the footer CTAs)
  useEffect(() => {
    if (!isMobile) return;
    const footer = document.querySelector("footer");
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [isMobile, location.pathname]);

  if (!isMobile) return null;

  const callLabel = language === "de" ? "Anrufen" : "Call";
  const callAriaLabel = language === "de" ? "Restaurant anrufen" : "Call the restaurant";
  const isVisitPage = location.pathname === "/visit" || location.pathname === "/contact";
  const visitLabel = isVisitPage
    ? language === "de" ? "Route" : "Directions"
    : language === "de" ? "Besuchen" : "Visit";
  const visitAriaLabel = isVisitPage
    ? language === "de" ? "Route auf Google Maps öffnen" : "Open directions on Google Maps"
    : language === "de" ? "Besuchsinfos öffnen" : "Open visit information";
  const heroVariant = getHeroAbVariant({ assign: false });

  const shouldShow = isScrolled && !isMobileMenuOpen && !cookieConsentPending && !footerVisible;

  const visitClasses = "flex-1 inline-flex items-center justify-center gap-2 " +
    "bg-card text-primary border border-primary/30 " +
    "rounded-full py-3 px-4 min-h-[48px] " +
    "text-base font-medium font-work " +
    "active:scale-95 transition-transform duration-200 " +
    "touch-manipulation " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2";

  return (
    <div
      role="region"
      aria-label={language === "de" ? "Schnellaktionen" : "Quick actions"}
      className={`
        fixed bottom-0 left-0 right-0 z-50
        bg-nav-surface/95 backdrop-blur-md
        border-t border-border
        shadow-[0_-4px_16px_-4px_rgba(0,0,0,0.08)]
        px-4 pt-3
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
          className="flex-1 inline-flex items-center justify-center gap-2
            bg-accent text-accent-foreground
            rounded-full py-3 px-4 min-h-[48px]
            text-base font-semibold font-work
            shadow-soft
            active:scale-95
            transition-transform duration-200
            touch-manipulation
            focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2"
          aria-label={callAriaLabel}
        >
          <Phone className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
          <span>{callLabel}</span>
        </a>

        {isVisitPage ? (
          <a
            href={SITE.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackHeroAbEvent('click_directions', { event_category: 'engagement', event_label: 'mobile_sticky_bar' }, heroVariant)}
            className={visitClasses}
            aria-label={visitAriaLabel}
          >
            <MapPin className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span>{visitLabel}</span>
          </a>
        ) : (
          <Link
            to="/visit"
            onClick={() => trackHeroAbEvent('click_visit', { event_category: 'engagement', event_label: 'mobile_sticky_bar' }, heroVariant)}
            className={visitClasses}
            aria-label={visitAriaLabel}
          >
            <MapPin className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={2.2} aria-hidden="true" />
            <span>{visitLabel}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
