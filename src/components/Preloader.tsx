import { useEffect, useState } from "react";

const STORAGE_KEY = "preloader_first_visit_shown";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return false; // If storage unavailable, skip preload
    }
  });
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Start fade out after 600ms
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 600);

    // Remove from DOM after fade completes (300ms transition)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {
        // ignore if storage not available
      }
    }, 900);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center px-6 bg-background transition-opacity duration-300 ease-out ${
        isFadingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      <p className="text-center text-muted-foreground/80 text-lg sm:text-xl font-lora italic leading-relaxed max-w-lg">
        To see the good in others is the beginning of peace
      </p>
    </div>
  );
};
