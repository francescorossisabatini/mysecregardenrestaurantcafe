import { BotanicalDecoration } from "./BotanicalDecoration";

interface SectionDividerProps {
  variant?: "default" | "accent" | "subtle";
  showDecoration?: boolean;
}

export const SectionDivider = ({ 
  variant = "default", 
  showDecoration = true 
}: SectionDividerProps) => {
  const gradientClasses = {
    default: "from-background via-cream to-background",
    accent: "from-background via-accent/5 to-background",
    subtle: "from-transparent via-border/20 to-transparent"
  };

  return (
    <div className="relative w-full py-16 md:py-20">
      {/* Minimal gradient divider */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[variant]} opacity-50`} aria-hidden="true" />
      
      {/* Simple line */}
      {showDecoration && (
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-40" />
          </div>
        </div>
      )}
    </div>
  );
};