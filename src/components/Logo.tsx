import logoImage from "@/assets/logo-secret-garden.png";

export const Logo = ({ className = "w-24 h-24" }: { className?: string }) => {
  return (
    <img 
      src={logoImage} 
      alt="My Secret Garden Logo" 
      className={className}
    />
  );
};