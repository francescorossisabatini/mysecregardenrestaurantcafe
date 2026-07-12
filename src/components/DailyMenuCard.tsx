import { Card } from "@/components/ui/card";
import { BotanicalDecoration } from "./BotanicalDecoration";

interface DailyMenuCardProps {
  title: string;
  items: string[];
}

export const DailyMenuCard = ({ title, items }: DailyMenuCardProps) => {
  return (
    <Card className="relative p-8 bg-card border border-border/70 shadow-card hover:shadow-elevated transition-all overflow-hidden rounded-2xl">
      {/* Corner decoration */}
      <BotanicalDecoration
        variant="corner"
        className="absolute top-0 right-0 w-24 h-24 text-accent/15"
      />

      {/* Editorial rule above title */}
      <span className="block h-px w-12 bg-accent/50 mb-4" aria-hidden="true" />

      <h3 className="font-cormorant text-2xl md:text-3xl font-semibold text-primary mb-5 leading-tight">
        {title}
      </h3>

      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
            <p className="font-lora text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
