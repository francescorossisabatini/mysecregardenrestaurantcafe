import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";

export const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content after a brief delay
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 400);

    // Extended duration to ensure all page elements and transitions load properly
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(fadeOutTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-[#F5F1E3] transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating leaves - top left */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-10">
          <svg viewBox="0 0 100 100" className="animate-float-slow">
            <path
              d="M50 10 Q 70 30 65 60 Q 60 80 50 90 Q 40 80 35 60 Q 30 30 50 10"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            />
          </svg>
        </div>
        
        {/* Meditation circle - top right */}
        <div className="absolute top-32 right-16 w-20 h-20 opacity-10">
          <svg viewBox="0 0 100 100" className="animate-flow-slow">
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
          </svg>
        </div>

        {/* Butterfly - bottom right */}
        <div className="absolute bottom-24 right-20 w-12 h-12 opacity-10">
          <svg viewBox="0 0 100 100" className="animate-butterfly">
            <path
              d="M50 50 Q 30 30 20 35 Q 15 40 20 45 Q 30 50 50 50 M50 50 Q 70 30 80 35 Q 85 40 80 45 Q 70 50 50 50 M50 50 Q 30 70 20 65 Q 15 60 20 55 Q 30 50 50 50 M50 50 Q 70 70 80 65 Q 85 60 80 55 Q 70 50 50 50"
              fill="currentColor"
              className="text-primary"
            />
          </svg>
        </div>

        {/* Flowing line - bottom left */}
        <div className="absolute bottom-28 left-12 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="animate-flow-medium">
            <path
              d="M 10 50 Q 30 30 50 50 T 90 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="text-primary"
            />
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`relative z-10 flex flex-col items-center gap-6 transition-all duration-1000 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <Logo className="w-32 h-32" />
        
        <p
          className={`text-sm text-muted-foreground font-light tracking-wide transition-all duration-1000 delay-300 ${
            showContent ? "opacity-70" : "opacity-0"
          }`}
        >
          Inspired by Sri Chinmoy
        </p>
      </div>
    </div>
  );
};
