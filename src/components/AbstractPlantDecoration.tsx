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
