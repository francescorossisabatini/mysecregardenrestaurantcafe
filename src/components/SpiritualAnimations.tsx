interface SpiritualAnimationsProps {
  variant?: "leaves" | "butterfly" | "meditation-lines";
  className?: string;
}

export const SpiritualAnimations = ({ 
  variant = "leaves", 
  className = "" 
}: SpiritualAnimationsProps) => {
  if (variant === "leaves") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {/* Floating leaves */}
        <svg
          className="absolute top-1/4 left-[10%] w-8 h-8 text-accent/15 animate-float-slow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2C8 2 4 6 4 12c0 4 2 6 4 8 1 1 2 2 4 2s3-1 4-2c2-2 4-4 4-8 0-6-4-10-8-10z" />
          <path d="M12 2v20" />
        </svg>
        
        <svg
          className="absolute top-1/3 right-[15%] w-6 h-6 text-primary/15 animate-float-medium"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M12 2C8 2 4 6 4 12c0 4 2 6 4 8 1 1 2 2 4 2s3-1 4-2c2-2 4-4 4-8 0-6-4-10-8-10z" />
          <path d="M12 2v20" />
        </svg>

        <svg
          className="absolute bottom-1/4 left-[20%] w-10 h-10 text-accent/10 animate-float-slow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path d="M12 2C8 2 4 6 4 12c0 4 2 6 4 8 1 1 2 2 4 2s3-1 4-2c2-2 4-4 4-8 0-6-4-10-8-10z" />
          <path d="M12 2v20" />
        </svg>
      </div>
    );
  }

  if (variant === "butterfly") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {/* Gentle butterfly movements */}
        <svg
          className="absolute top-[20%] right-[10%] w-12 h-12 text-primary/15 animate-butterfly"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2c-1 0-2 1-2 2v4c-2-1-4 0-5 2-1 2 0 4 2 5h-2c-1 0-2 1-2 2s1 2 2 2h2c-2 1-3 3-2 5 1 2 3 3 5 2v4c0 1 1 2 2 2s2-1 2-2v-4c2 1 4 0 5-2 1-2 0-4-2-5h2c1 0 2-1 2-2s-1-2-2-2h-2c2-1 3-3 2-5-1-2-3-3-5-2V4c0-1-1-2-2-2z" />
        </svg>

        <svg
          className="absolute bottom-[30%] left-[8%] w-10 h-10 text-accent/12 animate-butterfly-delayed"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2c-1 0-2 1-2 2v4c-2-1-4 0-5 2-1 2 0 4 2 5h-2c-1 0-2 1-2 2s1 2 2 2h2c-2 1-3 3-2 5 1 2 3 3 5 2v4c0 1 1 2 2 2s2-1 2-2v-4c2 1 4 0 5-2 1-2 0-4-2-5h2c1 0 2-1 2-2s-1-2-2-2h-2c2-1 3-3 2-5-1-2-3-3-5-2V4c0-1-1-2-2-2z" />
        </svg>
      </div>
    );
  }

  if (variant === "meditation-lines") {
    return (
      <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
        {/* Flowing meditation curves */}
        <svg
          className="absolute top-0 left-0 w-full h-full opacity-[0.08]"
          viewBox="0 0 1000 1000"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            className="animate-flow-slow text-primary"
            d="M0,500 Q250,400 500,500 T1000,500"
            strokeLinecap="round"
          />
          <path
            className="animate-flow-medium text-accent"
            d="M0,300 Q250,200 500,300 T1000,300"
            strokeLinecap="round"
          />
          <path
            className="animate-flow-fast text-primary"
            d="M0,700 Q250,600 500,700 T1000,700"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  return null;
};
