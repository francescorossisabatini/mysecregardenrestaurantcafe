import logoImage from "@/assets/logo-secret-garden.png";

export const Logo = ({ className = "w-24 h-24", lightText = false }: { className?: string; lightText?: boolean }) => {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <img 
        src={logoImage} 
        alt="My Secret Garden Logo" 
        className={className}
      />
      <p className={`text-[8px] font-light tracking-wide opacity-70 ${
        lightText ? 'text-white/80' : 'text-muted-foreground'
      }`}>
        inspired by Sri Chinmoy
      </p>
    </div>
  );
};