import { Phone } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { SITE } from "@/config/site";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef, useCallback } from "react";

export const FloatingCallButton = () => {
  const isMobile = useIsMobile();
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Throttled scroll handler using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      // Lower threshold on mobile for quicker visibility
      setIsVisible(window.scrollY > 100);
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

  const label = language === "de" ? "Anrufen" : "Call";

  return (
    <a
      href={`tel:${SITE.phoneTel}`}
      className={`
        fixed bottom-6 right-4 z-50
        flex items-center gap-2
        px-4 py-2.5
        bg-foreground/90 text-background
        rounded-full
        text-base font-medium
        shadow-sm
        transition-all duration-300 ease-out
        hover:bg-foreground
        active:scale-95
        touch-manipulation
        pb-[calc(0.625rem+env(safe-area-inset-bottom))]
        ${isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
      aria-label={label}
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <Phone className="w-4 h-4 flex-shrink-0" strokeWidth={1.5} />
      <span>{label}</span>
    </a>
  );
};
