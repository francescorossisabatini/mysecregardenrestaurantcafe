export const DetailedFlower = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Petali esterni */}
    <ellipse cx="50" cy="30" rx="12" ry="18" fill="currentColor" opacity="0.7" />
    <ellipse cx="70" cy="50" rx="12" ry="18" fill="currentColor" opacity="0.7" transform="rotate(72 70 50)" />
    <ellipse cx="62" cy="75" rx="12" ry="18" fill="currentColor" opacity="0.7" transform="rotate(144 62 75)" />
    <ellipse cx="38" cy="75" rx="12" ry="18" fill="currentColor" opacity="0.7" transform="rotate(216 38 75)" />
    <ellipse cx="30" cy="50" rx="12" ry="18" fill="currentColor" opacity="0.7" transform="rotate(288 30 50)" />

    {/* Centro */}
    <circle cx="50" cy="50" r="10" fill="currentColor" opacity="0.9" />
    <circle cx="50" cy="50" r="6" fill="white" opacity="0.3" />

    {/* Dettagli petali */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 15 * Math.sin(angle * Math.PI / 180)}
        y2={50 - 15 * Math.cos(angle * Math.PI / 180)}
        stroke="white"
        strokeWidth="0.5"
        opacity="0.4"
      />
    ))}
  </svg>
);

export const RoseFlower = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 100 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Spirale di petali */}
    <path d="M50 50 Q 40 45, 35 50 Q 32 58, 40 62" fill="currentColor" opacity="0.6" />
    <path d="M50 50 Q 55 42, 62 45 Q 68 52, 62 58" fill="currentColor" opacity="0.7" />
    <path d="M40 62 Q 35 70, 40 78 Q 50 82, 58 78" fill="currentColor" opacity="0.6" />
    <path d="M62 58 Q 68 65, 65 73 Q 58 78, 50 75" fill="currentColor" opacity="0.7" />
    <path d="M50 75 Q 42 78, 35 75 Q 30 68, 33 60" fill="currentColor" opacity="0.6" />
    <path d="M33 60 Q 28 52, 32 45 Q 40 40, 48 43" fill="currentColor" opacity="0.7" />

    {/* Centro */}
    <circle cx="50" cy="58" r="8" fill="currentColor" opacity="0.9" />
    <circle cx="50" cy="58" r="4" fill="white" opacity="0.3" />

    {/* Foglie */}
    <path d="M30 85 Q 20 88, 15 95" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <path d="M15 95 Q 12 90, 18 87 Q 23 89, 20 93" fill="currentColor" opacity="0.5" />
    <path d="M70 85 Q 80 88, 85 95" stroke="currentColor" strokeWidth="2" opacity="0.6" />
    <path d="M85 95 Q 88 90, 82 87 Q 77 89, 80 93" fill="currentColor" opacity="0.5" />
  </svg>
);

export const ContinuousVine = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 400 100"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    preserveAspectRatio="none"
  >
    {/* Linea principale ondulata */}
    <path
      d="M0 50 Q 50 30, 100 50 T 200 50 T 300 50 T 400 50"
      stroke="currentColor"
      strokeWidth="2"
      opacity="0.6"
    />

    {/* Foglie lungo la linea */}
    {[50, 150, 250, 350].map((x, i) => (
      <g key={i}>
        <path
          d={`M${x} ${i % 2 === 0 ? 35 : 65} Q ${x - 15} ${i % 2 === 0 ? 25 : 75}, ${x - 20} ${i % 2 === 0 ? 35 : 65} Q ${x - 15} ${i % 2 === 0 ? 45 : 55}, ${x} ${i % 2 === 0 ? 35 : 65}`}
          fill="currentColor"
          opacity="0.5"
        />
        <path
          d={`M${x} ${i % 2 === 0 ? 65 : 35} Q ${x + 15} ${i % 2 === 0 ? 75 : 25}, ${x + 20} ${i % 2 === 0 ? 65 : 35} Q ${x + 15} ${i % 2 === 0 ? 55 : 45}, ${x} ${i % 2 === 0 ? 65 : 35}`}
          fill="currentColor"
          opacity="0.5"
        />
      </g>
    ))}

    {/* Piccoli fiori */}
    {[100, 200, 300].map((x, i) => (
      <circle key={`f${i}`} cx={x} cy="50" r="4" fill="currentColor" opacity="0.7" />
    ))}
  </svg>
);
