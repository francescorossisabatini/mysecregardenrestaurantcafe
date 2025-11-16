import logoImage from "@/assets/logo-secret-garden.png";

export const Logo = ({ className = "w-24 h-24" }: { className?: string }) => {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <img 
        src={logoImage} 
        alt="My Secret Garden Logo" 
        className={className}
      />
      <p className="text-[8px] text-muted-foreground font-light tracking-wide opacity-70">
        inspired by Sri Chinmoy
      </p>
    </div>
  );
};