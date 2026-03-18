import { Card } from "@/components/ui/card";
import { BotanicalDecoration } from "./BotanicalDecoration";

interface DailyMenuCardProps {
  title: string;
  items: string[];
}

export const DailyMenuCard = ({ title, items }: DailyMenuCardProps) => {
  return (
    <Card className="relative p-8 bg-card border-2 border-border hover:shadow-elevated transition-all overflow-hidden">
      {/* Corner decoration */}
      <BotanicalDecoration 
        variant="corner" 
        className="absolute top-0 right-0 w-20 h-20 text-accent/20" 
      />
      
      <h3 className="text-2xl font-bold text-primary mb-4">
        {title}
      </h3>
      
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
            <p className="font-lora text-foreground leading-relaxed">{item}</p>
          </div>
        ))}
      </div>
    </Card>
  );
};
