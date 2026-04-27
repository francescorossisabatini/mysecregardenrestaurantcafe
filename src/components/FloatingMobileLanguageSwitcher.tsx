import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const FloatingMobileLanguageSwitcher = () => {
  const isMobile = useIsMobile();
  const { isOpen: isMobileMenuOpen } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;

    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(window.scrollY > 80);
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

  if (!isMobile) return null;

  const shouldShow = isVisible && !isMobileMenuOpen;

  return (
    <div
      className={`fixed right-4 z-[60] lg:hidden transition-all duration-300 ease-out ${
        shouldShow ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      }`}
      style={{ bottom: "calc(5.75rem + env(safe-area-inset-bottom))" }}
    >
      <LanguageSwitcher variant="floatingMobile" />
    </div>
  );
};