import { BotanicalDecoration } from "./BotanicalDecoration";

interface PhotoStripeProps {
  imageUrl: string;
  variant?: "green" | "blue";
}

export const PhotoStripe = ({ imageUrl, variant = "green" }: PhotoStripeProps) => {
  const overlayColor = variant === "green" ? "bg-accent/40" : "bg-primary/40";

  return (
    <div className="relative w-full h-32 md:h-40 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Colored overlay */}
      <div className={`absolute inset-0 ${overlayColor}`} />

      {/* Light floral pattern */}
      <div className="absolute inset-0 opacity-10">
        <BotanicalDecoration
          variant="flower"
          className="absolute top-1/2 left-1/4 -translate-y-1/2 w-16 h-16 text-background"
        />
        <BotanicalDecoration
          variant="leaf"
          className="absolute top-1/2 right-1/4 -translate-y-1/2 w-12 h-12 text-background"
        />
      </div>
    </div>
  );
};
