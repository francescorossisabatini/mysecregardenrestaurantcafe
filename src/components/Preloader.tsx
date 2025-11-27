import { useEffect, useState } from "react";
import entranceGarden from "@/assets/entrance-garden.jpg";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    // Show only on first visit per session
    return typeof window !== "undefined" && !sessionStorage.getItem("preloader_shown");
  });

  useEffect(() => {
    if (!isVisible) return;

    // Longer immersive moment - fade out after 4 seconds
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem("preloader_shown", "true");
      } catch (e) {
        // ignore if storage not available
      }
    }, 4000);

    return () => {
      clearTimeout(fadeOutTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Fullscreen immersive background */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${entranceGarden})` }}
      />
      
      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30" />
    </div>
  );
};
