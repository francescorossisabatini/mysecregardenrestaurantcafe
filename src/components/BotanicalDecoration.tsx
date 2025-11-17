import { FC } from "react";

interface BotanicalDecorationProps {
  className?: string;
  variant?: "flower" | "leaf" | "vine" | "corner";
}

export const BotanicalDecoration: FC<BotanicalDecorationProps> = ({ 
  className = "", 
  variant = "flower" 
}) => {
  if (variant === "flower") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
          {/* Center */}
          <circle cx="50" cy="50" r="8" fill="currentColor" />
          
          {/* Petals */}
          <ellipse cx="50" cy="25" rx="12" ry="18" fill="currentColor" opacity="0.6" />
          <ellipse cx="75" cy="50" rx="18" ry="12" fill="currentColor" opacity="0.6" />
          <ellipse cx="50" cy="75" rx="12" ry="18" fill="currentColor" opacity="0.6" />
          <ellipse cx="25" cy="50" rx="18" ry="12" fill="currentColor" opacity="0.6" />
          
          {/* Diagonal petals */}
          <ellipse cx="65" cy="35" rx="12" ry="16" fill="currentColor" opacity="0.4" transform="rotate(45 65 35)" />
          <ellipse cx="65" cy="65" rx="12" ry="16" fill="currentColor" opacity="0.4" transform="rotate(-45 65 65)" />
          <ellipse cx="35" cy="65" rx="12" ry="16" fill="currentColor" opacity="0.4" transform="rotate(45 35 65)" />
          <ellipse cx="35" cy="35" rx="12" ry="16" fill="currentColor" opacity="0.4" transform="rotate(-45 35 35)" />
        </g>
      </svg>
    );
  }

  if (variant === "leaf") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.2">
          <path 
            d="M50 10 Q 70 30 70 50 Q 70 70 50 90 Q 30 70 30 50 Q 30 30 50 10" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="1.5" />
        </g>
      </svg>
    );
  }

  if (variant === "vine") {
    return (
      <svg className={className} viewBox="0 0 200 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.15">
          <path 
            d="M 0 25 Q 25 10, 50 25 T 100 25 T 150 25 T 200 25" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Small leaves */}
          <path d="M 25 20 Q 20 15, 25 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 75 20 Q 70 15, 75 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 125 20 Q 120 15, 125 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
          <path d="M 175 20 Q 170 15, 175 10" stroke="currentColor" strokeWidth="1.5" fill="none" />
        </g>
      </svg>
    );
  }

  if (variant === "corner") {
    return (
      <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.15">
          {/* Corner vine */}
          <path 
            d="M 0 50 Q 20 40, 50 50 Q 60 50, 50 0" 
            stroke="currentColor" 
            strokeWidth="2" 
            fill="none"
          />
          {/* Small flower at corner */}
          <circle cx="50" cy="50" r="6" fill="currentColor" opacity="0.6" />
          <circle cx="44" cy="50" r="4" fill="currentColor" opacity="0.4" />
          <circle cx="56" cy="50" r="4" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="44" r="4" fill="currentColor" opacity="0.4" />
          <circle cx="50" cy="56" r="4" fill="currentColor" opacity="0.4" />
        </g>
      </svg>
    );
  }

  return null;
};
