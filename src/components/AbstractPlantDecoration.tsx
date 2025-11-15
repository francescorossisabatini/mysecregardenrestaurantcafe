export const OrganicLines = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 200" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20 100 Q 50 80, 80 100 T 140 100 T 180 100" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.6"
    />
    <path 
      d="M30 120 Q 60 110, 90 120 T 150 120" 
      stroke="currentColor" 
      strokeWidth="1" 
      opacity="0.4"
    />
    <path 
      d="M40 80 Q 70 60, 100 80 T 160 80" 
      stroke="currentColor" 
      strokeWidth="1" 
      opacity="0.5"
    />
  </svg>
);

export const GeometricLeaf = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M50 10 L65 35 L90 40 L70 60 L75 85 L50 75 L25 85 L30 60 L10 40 L35 35 Z" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.5"
    />
    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="1" opacity="0.3" />
  </svg>
);

export const AbstractBranch = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 150 150" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M20 130 L50 70 L80 130" 
      stroke="currentColor" 
      strokeWidth="2" 
      opacity="0.4"
      strokeLinecap="round"
    />
    <path 
      d="M50 70 L70 40 L90 70" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.4"
      strokeLinecap="round"
    />
    <circle cx="70" cy="35" r="3" fill="currentColor" opacity="0.5" />
    <circle cx="85" cy="55" r="2.5" fill="currentColor" opacity="0.4" />
    <circle cx="55" cy="55" r="2.5" fill="currentColor" opacity="0.4" />
  </svg>
);

export const MinimalGrowth = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 120 120" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="60" y1="100" x2="60" y2="20" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
    <path d="M60 40 Q 50 35, 45 40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M60 40 Q 70 35, 75 40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M60 60 Q 48 55, 42 60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <path d="M60 60 Q 72 55, 78 60" stroke="currentColor" strokeWidth="1" opacity="0.4" />
    <circle cx="60" cy="25" r="4" stroke="currentColor" strokeWidth="1" opacity="0.5" />
  </svg>
);

export const WavyPattern = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 200 100" 
    className={className}
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path 
      d="M0 50 Q 25 30, 50 50 T 100 50 T 150 50 T 200 50" 
      stroke="currentColor" 
      strokeWidth="2" 
      opacity="0.3"
    />
    <path 
      d="M0 60 Q 25 45, 50 60 T 100 60 T 150 60 T 200 60" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.25"
    />
    <path 
      d="M0 40 Q 25 25, 50 40 T 100 40 T 150 40 T 200 40" 
      stroke="currentColor" 
      strokeWidth="1.5" 
      opacity="0.25"
    />
  </svg>
);
