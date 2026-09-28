import type { ImgHTMLAttributes } from "react";
import logoImage from "@/assets/logo-secret-garden.png";

type LogoProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  lightText?: boolean;
  showTagline?: boolean;
};

// shrink-0 sul contenitore: in una riga flex stretta (320px, /about) si
// restringeva il div e il logo diventava ovale. Gli attributi extra
// (aria-hidden, ecc.) vanno all'<img>: prima venivano persi.
export const Logo = ({ className = "w-24 h-24", lightText = false, showTagline = true, alt = "My Secret Garden Logo", ...imgProps }: LogoProps) => {
  return (
    <div className="flex shrink-0 flex-col items-center gap-0.5">
      <img 
        src={logoImage} 
        alt={alt} 
        className={className}
        {...imgProps}
      />
      {showTagline && (
        <p className={`text-xs font-normal tracking-wide ${
          lightText ? 'text-primary-foreground' : 'text-muted-foreground'
        }`}>
          inspired by Sri Chinmoy
        </p>
      )}
    </div>
  );
};