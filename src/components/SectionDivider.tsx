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
    <div className="relative w-full py-12 md:py-16">
      {/* Gradient divider */}
      <div className={`absolute inset-0 bg-gradient-to-r ${gradientClasses[variant]}`} />
      
      {/* Decorative line with botanical elements */}
      {showDecoration && (
        <div className="relative z-10 container mx-auto px-4">
          <div className="flex items-center justify-center gap-6">
            {/* Left decoration */}
            <BotanicalDecoration 
              variant="leaf" 
              className="w-8 h-8 text-primary/20 animate-float-slow" 
            />
            
            {/* Center line with dot */}
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/30" />
              <div className="w-2 h-2 rounded-full bg-primary/40" />
              <div className="flex-1 h-px bg-gradient-to-r from-primary/30 via-primary/30 to-transparent" />
            </div>
            
            {/* Right decoration */}
            <BotanicalDecoration 
              variant="flower" 
              className="w-8 h-8 text-accent/20 animate-float-medium" 
            />
          </div>
        </div>
      )}
    </div>
  );
};