import { Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export const FloatingCallButton = () => {
  const { language } = useLanguage();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 350);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only show on mobile
  if (!isMobile) return null;

  const label = language === "de" ? "Anrufen" : "Call";

  return (
    <a
      href="tel:+41442620818"
      className={`
        fixed bottom-6 right-4 z-50
        flex items-center gap-2
        px-4 py-2.5
        bg-foreground/90 text-background
        rounded-full
        text-sm font-medium
        shadow-sm
        transition-all duration-300 ease-out
        hover:bg-foreground
        active:scale-95
        pb-[calc(0.625rem+env(safe-area-inset-bottom))]
        ${isVisible 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-4 pointer-events-none"
        }
      `}
      aria-label={label}
    >
      <Phone className="w-4 h-4" strokeWidth={1.5} />
      <span>{label}</span>
    </a>
  );
};
