export const Logo = ({ className = "w-24 h-24" }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Circle background */}
      <circle 
        cx="100" 
        cy="100" 
        r="95" 
        fill="hsl(var(--primary))" 
        stroke="hsl(var(--accent))"
        strokeWidth="3"
      />
      
      {/* Decorative leaf elements */}
      <path 
        d="M 60 100 Q 55 85 50 80 Q 55 85 60 85 Q 55 95 60 100 Z" 
        fill="hsl(var(--accent))" 
        opacity="0.6"
      />
      <path 
        d="M 140 100 Q 145 85 150 80 Q 145 85 140 85 Q 145 95 140 100 Z" 
        fill="hsl(var(--accent))" 
        opacity="0.6"
      />
      
      {/* Text */}
      <text 
        x="100" 
        y="90" 
        textAnchor="middle" 
        fill="hsl(var(--primary-foreground))"
        fontSize="24"
        fontWeight="bold"
        fontFamily="Playfair Display, serif"
      >
        My Secret
      </text>
      <text 
        x="100" 
        y="115" 
        textAnchor="middle" 
        fill="hsl(var(--primary-foreground))"
        fontSize="28"
        fontWeight="bold"
        fontFamily="Playfair Display, serif"
      >
        Garden
      </text>
      
      {/* Small decorative flower */}
      <circle cx="100" cy="130" r="3" fill="hsl(var(--accent))" />
      <circle cx="95" cy="132" r="2" fill="hsl(var(--accent))" opacity="0.7" />
      <circle cx="105" cy="132" r="2" fill="hsl(var(--accent))" opacity="0.7" />
    </svg>
  );
};