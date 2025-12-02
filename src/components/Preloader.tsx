import { useEffect, useState } from "react";
import entranceGarden from "@/assets/entrance-garden.jpg";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState<boolean>(() => {
    return typeof window !== "undefined" && !sessionStorage.getItem("preloader_shown");
  });
  const [phase, setPhase] = useState<"image" | "quote" | "fadeout">("image");

  useEffect(() => {
    if (!isVisible) return;

    // Phase 1: Show image for 2s
    const quoteTimer = setTimeout(() => {
      setPhase("quote");
    }, 2000);

    // Phase 2: Show quote for 2.5s, then fadeout
    const fadeOutTimer = setTimeout(() => {
      setPhase("fadeout");
    }, 4500);

    // Phase 3: Hide completely
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      try {
        sessionStorage.setItem("preloader_shown", "true");
      } catch (e) {
        // ignore if storage not available
      }
    }, 5500);

    return () => {
      clearTimeout(quoteTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(hideTimer);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] transition-opacity duration-1000 ${
        phase === "fadeout" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Fullscreen immersive background */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ${
          phase === "quote" ? "scale-105 blur-sm" : "scale-100"
        }`}
        style={{ backgroundImage: `url(${entranceGarden})` }}
      />
      
      {/* Overlay that darkens for quote */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        phase === "quote" 
          ? "bg-gradient-to-b from-black/70 via-black/60 to-black/70" 
          : "bg-gradient-to-b from-black/30 via-black/20 to-black/30"
      }`} />

      {/* Spiritual decorations */}
      <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${
        phase === "quote" ? "opacity-100" : "opacity-0"
      }`}>
        {/* Floating lotus petals */}
        <svg className="absolute top-[15%] left-[10%] w-16 h-16 text-white/20 animate-gentle-float" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C35 30, 35 50, 50 70 C65 50, 65 30, 50 10" />
        </svg>
        <svg className="absolute top-[25%] right-[15%] w-12 h-12 text-white/15 animate-gentle-float" style={{ animationDelay: "2s" }} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C35 30, 35 50, 50 70 C65 50, 65 30, 50 10" />
        </svg>
        <svg className="absolute bottom-[30%] left-[20%] w-10 h-10 text-white/10 animate-gentle-float" style={{ animationDelay: "4s" }} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C35 30, 35 50, 50 70 C65 50, 65 30, 50 10" />
        </svg>
        <svg className="absolute bottom-[20%] right-[25%] w-14 h-14 text-white/15 animate-gentle-float" style={{ animationDelay: "3s" }} viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10 C35 30, 35 50, 50 70 C65 50, 65 30, 50 10" />
        </svg>
        
        {/* Subtle flowing lines */}
        <svg className="absolute top-0 left-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" preserveAspectRatio="none">
          <path 
            d="M0,300 Q250,200 500,300 T1000,300" 
            stroke="white" 
            strokeWidth="1" 
            fill="none"
            className="animate-gentle-float"
          />
          <path 
            d="M0,700 Q250,600 500,700 T1000,700" 
            stroke="white" 
            strokeWidth="1" 
            fill="none"
            className="animate-gentle-float"
            style={{ animationDelay: "2s" }}
          />
        </svg>
      </div>

      {/* Sri Chinmoy Quote */}
      <div className={`absolute inset-0 flex flex-col items-center justify-center px-8 transition-all duration-1000 ${
        phase === "quote" ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}>
        <div className="max-w-2xl text-center">
          {/* Decorative element above quote */}
          <svg className="mx-auto w-12 h-6 text-white/40 mb-6" viewBox="0 0 100 50" fill="currentColor">
            <path d="M50 0 C30 20, 30 40, 50 50 C70 40, 70 20, 50 0" />
          </svg>
          
          <p className="text-white/90 text-xl sm:text-2xl md:text-3xl font-lora italic leading-relaxed tracking-wide">
            "To see the good in others is the beginning of peace."
          </p>
          
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="w-12 h-px bg-white/30" />
            <span className="text-white/60 text-sm font-caveat tracking-widest">
              Sri Chinmoy
            </span>
            <div className="w-12 h-px bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
};
