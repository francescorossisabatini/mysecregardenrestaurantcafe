import { useEffect, useRef, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { getConsent, CONSENT_EVENT } from "@/components/CookieConsent";
import { SHOW_WEEKLY_MENU } from "@/config/menuFlags";

type TabId = "today" | "fixed" | "week";

interface Props {
  activeTab: TabId;
  onSelect: (tab: TabId) => void;
}

/**
 * Discreet floating pill for mobile: replaces the bulky sticky tab bars.
 * - Appears only after user scrolls past the hero of the menu section
 * - Hides when at top, when mobile nav is open, when cookie consent pending,
 *   when footer in view (handled implicitly via scroll position cap).
 * - Sits above the MobileStickyBar (call/visit), stays centered, narrow width.
 */
export const MenuFloatingPill = ({ activeTab, onSelect }: Props) => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const { isOpen: isMobileMenuOpen } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(false);
  const [stickyBarLifted, setStickyBarLifted] = useState(false);
  const [consentPending, setConsentPending] = useState(true);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const check = () => setConsentPending(getConsent() === null);
    check();
    window.addEventListener("storage", check);
    window.addEventListener(CONSENT_EVENT, check);
    return () => {
      window.removeEventListener("storage", check);
      window.removeEventListener(CONSENT_EVENT, check);
    };
  }, []);

  const onScroll = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      const y = window.scrollY;
      // Show after scrolling a bit (past the page header / first heading)
      setStickyBarLifted(y > 200);
      // Hide near the bottom (footer area) to avoid overlap
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const nearBottom = max - y < 240;
      setIsVisible(y > 320 && !nearBottom);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onScroll]);

  if (!isMobile) return null;

  const tabs: { id: TabId; label: string }[] = [
    { id: "today", label: language === "de" ? "Heute" : "Today" },
    { id: "fixed", label: language === "de" ? "Immer" : "Always" },
    ...(SHOW_WEEKLY_MENU ? [{ id: "week" as TabId, label: language === "de" ? "Woche" : "Week" }] : []),
  ];

  const shouldShow = isVisible && !isMobileMenuOpen && !consentPending;
  // When the bottom MobileStickyBar is visible (after 200px scroll), lift this pill above it
  const bottomOffset = stickyBarLifted ? "5.25rem" : "1rem";

  return (
    <div
      role="navigation"
      aria-label={language === "de" ? "Menü-Schnellnavigation" : "Menu quick navigation"}
      className={`md:hidden fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-300 ease-out motion-reduce:transition-none ${
        shouldShow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 pointer-events-none"
      }`}
      style={{
        bottom: `calc(${bottomOffset} + env(safe-area-inset-bottom))`,
      }}
    >
      <div
        className="flex items-center gap-1 rounded-full border border-border/70 bg-nav-surface/95 px-1.5 py-1 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.25)] backdrop-blur-md"
        role="tablist"
      >
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onSelect(tab.id)}
              className={`rounded-full px-3.5 py-1.5 font-work text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 ${
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-primary/75 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
