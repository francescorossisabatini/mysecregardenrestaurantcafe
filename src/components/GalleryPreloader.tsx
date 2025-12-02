import { useEffect, useState } from "react";

export const GalleryPreloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 3.5 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    // Remove from DOM after fade completes
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-1000 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "linear-gradient(135deg, hsl(var(--primary)/0.15) 0%, hsl(var(--background)) 50%, hsl(var(--accent)/0.1) 100%)",
      }}
    >
      {/* Spiritual decorations - floating circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large soft gradient circles */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
          style={{
            background: "radial-gradient(circle, hsl(var(--primary)/0.3) 0%, transparent 70%)",
            top: "-10%",
            left: "-10%",
            animationDuration: "4s",
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-15 animate-pulse"
          style={{
            background: "radial-gradient(circle, hsl(var(--accent)/0.4) 0%, transparent 70%)",
            bottom: "-15%",
            right: "-10%",
            animationDuration: "5s",
            animationDelay: "0.5s",
          }}
        />
        
        {/* Floating lotus-inspired shapes */}
        <svg className="absolute top-1/4 left-10 w-16 h-16 text-primary/20 animate-float-slow" viewBox="0 0 100 100">
          <ellipse cx="50" cy="70" rx="8" ry="25" fill="currentColor" transform="rotate(-30 50 70)" />
          <ellipse cx="50" cy="70" rx="8" ry="25" fill="currentColor" transform="rotate(0 50 70)" />
          <ellipse cx="50" cy="70" rx="8" ry="25" fill="currentColor" transform="rotate(30 50 70)" />
        </svg>
        
        <svg className="absolute bottom-1/4 right-16 w-20 h-20 text-accent/25 animate-float-medium" viewBox="0 0 100 100">
          <ellipse cx="50" cy="70" rx="8" ry="25" fill="currentColor" transform="rotate(-30 50 70)" />
          <ellipse cx="50" cy="70" rx="8" ry="25" fill="currentColor" transform="rotate(0 50 70)" />
          <ellipse cx="50" cy="70" rx="8" ry="25" fill="currentColor" transform="rotate(30 50 70)" />
        </svg>

        {/* Flowing lines */}
        <svg className="absolute top-1/3 right-1/4 w-32 h-32 text-primary/10" viewBox="0 0 100 100">
          <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="currentColor" strokeWidth="2" className="animate-flow-slow" />
          <path d="M10,60 Q30,30 50,60 T90,60" fill="none" stroke="currentColor" strokeWidth="1.5" className="animate-flow-medium" />
        </svg>
        
        {/* Small decorative dots */}
        <div className="absolute top-1/2 left-1/4 w-3 h-3 rounded-full bg-primary/20 animate-pulse" style={{ animationDelay: "0.2s" }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-accent/25 animate-pulse" style={{ animationDelay: "0.8s" }} />
        <div className="absolute bottom-1/3 left-1/3 w-4 h-4 rounded-full bg-primary/15 animate-pulse" style={{ animationDelay: "1.2s" }} />
      </div>

      {/* Quote content */}
      <div className="relative z-10 max-w-4xl mx-auto px-8 text-center">
        <p 
          className="font-caveat text-3xl md:text-5xl lg:text-6xl text-primary leading-relaxed animate-fade-in"
          style={{ animationDuration: "1.5s" }}
        >
          "To see the good in others is the beginning of peace."
        </p>
        <p 
          className="mt-6 font-lora text-lg md:text-xl text-muted-foreground italic animate-fade-in"
          style={{ animationDuration: "1.5s", animationDelay: "0.5s", animationFillMode: "backwards" }}
        >
          — Sri Chinmoy
        </p>
      </div>
    </div>
  );
};
