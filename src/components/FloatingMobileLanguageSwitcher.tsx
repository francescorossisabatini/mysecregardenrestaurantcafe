import { useEffect, useRef, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useMobileMenu } from "@/contexts/MobileMenuContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export const FloatingMobileLanguageSwitcher = () => {
  const isMobile = useIsMobile();
  const { isOpen: isMobileMenuOpen } = useMobileMenu();
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);
  const dragRef = useRef({ dragging: false, moved: false, offsetX: 0, offsetY: 0 });
  const rafRef = useRef<number | null>(null);
  const positionKey = "floating-language-switcher-position";

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

  useEffect(() => {
    const saved = window.localStorage.getItem(positionKey);
    if (!saved) return;

    try {
      const parsed = JSON.parse(saved) as { x?: number; y?: number };
      if (typeof parsed.x === "number" && typeof parsed.y === "number") {
        setPosition({
          x: Math.min(Math.max(parsed.x, 12), window.innerWidth - 92),
          y: Math.min(Math.max(parsed.y, 72), window.innerHeight - 72),
        });
      }
    } catch {
      window.localStorage.removeItem(positionKey);
    }
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    dragRef.current = {
      dragging: true,
      moved: false,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;

    const next = {
      x: Math.min(Math.max(event.clientX - dragRef.current.offsetX, 12), window.innerWidth - 92),
      y: Math.min(Math.max(event.clientY - dragRef.current.offsetY, 72), window.innerHeight - 72),
    };

    dragRef.current.moved = true;
    setPosition(next);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current.dragging) return;

    dragRef.current.dragging = false;
    event.currentTarget.releasePointerCapture(event.pointerId);

    if (dragRef.current.moved && position) {
      window.localStorage.setItem(positionKey, JSON.stringify(position));
    }
  };

  if (!isMobile) return null;

  const shouldShow = isVisible && !isMobileMenuOpen;

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`fixed right-4 z-[60] lg:hidden transition-all duration-300 ease-out ${
        shouldShow ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0 pointer-events-none"
      } touch-none cursor-grab active:cursor-grabbing`}
      style={
        position
          ? { left: `${position.x}px`, top: `${position.y}px`, right: "auto", bottom: "auto" }
          : { bottom: "calc(5.75rem + env(safe-area-inset-bottom))" }
      }
    >
      <LanguageSwitcher variant="floatingMobile" />
    </div>
  );
};