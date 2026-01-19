import logoImage from "@/assets/logo-secret-garden.png";

export const Logo = ({ className = "w-24 h-24", lightText = false, showTagline = true }: { className?: string; lightText?: boolean; showTagline?: boolean }) => {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <img 
        src={logoImage} 
        alt="My Secret Garden Logo" 
        className={className}
      />
      {showTagline && (
        <p className={`text-[10px] font-normal tracking-wide ${
          lightText ? 'text-white' : 'text-muted-foreground'
        }`}>
          inspired by Sri Chinmoy
        </p>
      )}
    </div>
  );
};