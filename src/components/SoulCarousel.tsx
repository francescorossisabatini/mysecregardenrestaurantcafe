import { useRef, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { klassikerMenu } from "@/data/klassikerData";
import { Leaf, Utensils, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DishDetail {
  type: "daily" | "klassiker";
  name: { de: string; en: string };
  description: { de: string; en: string };
  day?: { de: string; en: string };
  category?: string;
}

export const SoulCarousel = () => {
  const { language } = useLanguage();
  const { menu, isLoading } = useWeeklyMenu();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<DishDetail | null>(null);

  // Get today's day name
  const today = new Date();
  const dayNames = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  const todayName = dayNames[today.getDay()];

  // Get today's menu
  const todayMenu = menu.days.find(day => day.day.de === todayName);

  const handleDishClick = (dish: DishDetail) => {
    setSelectedDish(dish);
  };

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-background overflow-hidden" id="soul-carousel">
      {/* Section Header */}
      <div className="container mx-auto px-4 mb-8 md:mb-12">
        <h2 className="font-cormorant text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-3">
          {language === "de" ? "Ein Ort, wo die Seele isst" : "A place where the soul eats"}
        </h2>
        <p className="font-work text-muted-foreground text-center text-base md:text-lg max-w-xl mx-auto">
          {language === "de" 
            ? "Entdecke unser heutiges Menü und unsere Klassiker" 
            : "Discover today's menu and our classics"}
        </p>
      </div>

      {/* Horizontal Scroll Carousel */}
      <div 
        ref={scrollRef}
        className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 pb-6 snap-x snap-mandatory scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Daily Section Header (Mobile) */}
        <div className="flex-shrink-0 snap-start flex items-center">
          <div className="bg-daily/50 rounded-2xl px-5 py-3 flex items-center gap-2">
            <Leaf className="w-5 h-5 text-accent" />
            <span className="font-cormorant text-lg text-foreground whitespace-nowrap">
              {language === "de" ? "Heute frisch gekocht" : "Freshly cooked today"}
            </span>
          </div>
        </div>

        {/* Daily Dishes - Green & Blue */}
        {todayMenu && (
          <>
            {/* Green Dish Card */}
            <div 
              className="flex-shrink-0 w-72 md:w-80 snap-start cursor-pointer group"
              onClick={() => handleDishClick({
                type: "daily",
                name: { de: "Grünes Tagesmenü", en: "Green Daily Menu" },
                description: todayMenu.green,
                day: todayMenu.day,
              })}
            >
              <div className="bg-daily rounded-2xl p-5 md:p-6 h-full shadow-card transition-all duration-300 group-hover:shadow-elevated group-hover:scale-[1.02] animate-fade-in">
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-badgeWood text-white text-xs font-work font-medium px-2.5 py-1 rounded-full">
                    Heute
                  </span>
                  <span className="text-accent text-xs font-work">
                    {todayMenu.day[language]}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-cormorant text-xl md:text-2xl text-foreground mb-2">
                  {language === "de" ? "Grünes Menü" : "Green Menu"}
                </h3>
                
                {/* Description */}
                <p className="font-work text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {todayMenu.green[language]}
                </p>
                
                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-foreground/10">
                  <p className="font-work text-xs text-accent italic">
                    {language === "de" ? "Frisch. Vegan. Mit Seele." : "Fresh. Vegan. With soul."}
                  </p>
                </div>
              </div>
            </div>

            {/* Blue Dish Card */}
            <div 
              className="flex-shrink-0 w-72 md:w-80 snap-start cursor-pointer group"
              onClick={() => handleDishClick({
                type: "daily",
                name: { de: "Blaues Tagesmenü", en: "Blue Daily Menu" },
                description: todayMenu.blue,
                day: todayMenu.day,
              })}
            >
              <div className="bg-dailyAlt rounded-2xl p-5 md:p-6 h-full shadow-card transition-all duration-300 group-hover:shadow-elevated group-hover:scale-[1.02] animate-fade-in" style={{ animationDelay: "100ms" }}>
                {/* Badge */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-blue text-white text-xs font-work font-medium px-2.5 py-1 rounded-full">
                    Heute
                  </span>
                  <span className="text-blue text-xs font-work">
                    {todayMenu.day[language]}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="font-cormorant text-xl md:text-2xl text-foreground mb-2">
                  {language === "de" ? "Blaues Menü" : "Blue Menu"}
                </h3>
                
                {/* Description */}
                <p className="font-work text-sm text-muted-foreground leading-relaxed line-clamp-4">
                  {todayMenu.blue[language]}
                </p>
                
                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-foreground/10">
                  <p className="font-work text-xs text-blue italic">
                    {language === "de" ? "Heute für dich gekocht" : "Cooked for you today"}
                  </p>
                </div>
              </div>
            </div>

            {/* Soup Card */}
            <div 
              className="flex-shrink-0 w-64 md:w-72 snap-start cursor-pointer group"
              onClick={() => handleDishClick({
                type: "daily",
                name: { de: "Tagessuppe", en: "Soup of the Day" },
                description: todayMenu.soup,
                day: todayMenu.day,
              })}
            >
              <div className="bg-daily/70 rounded-2xl p-5 md:p-6 h-full shadow-card transition-all duration-300 group-hover:shadow-elevated group-hover:scale-[1.02] animate-fade-in" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-accent/20 text-accent text-xs font-work font-medium px-2.5 py-1 rounded-full">
                    Suppe
                  </span>
                </div>
                
                <h3 className="font-cormorant text-lg md:text-xl text-foreground mb-2">
                  {language === "de" ? "Tagessuppe" : "Soup of the Day"}
                </h3>
                
                <p className="font-work text-sm text-muted-foreground leading-relaxed">
                  {todayMenu.soup[language]}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Klassiker Section Header */}
        <div className="flex-shrink-0 snap-start flex items-center">
          <div className="bg-klassiker border border-border rounded-2xl px-5 py-3 flex items-center gap-2">
            <Utensils className="w-5 h-5 text-badgeWood" />
            <span className="font-cormorant text-lg text-foreground whitespace-nowrap">
              {klassikerMenu.title[language]}
            </span>
          </div>
        </div>

        {/* Klassiker Cards */}
        {klassikerMenu.items.map((item, index) => (
          <div 
            key={item.id}
            className="flex-shrink-0 w-64 md:w-72 snap-start cursor-pointer group"
            onClick={() => handleDishClick({
              type: "klassiker",
              name: item.name,
              description: item.description,
              category: item.category,
            })}
          >
            <div className="bg-klassiker border border-border/50 rounded-2xl p-5 md:p-6 h-full shadow-card transition-all duration-300 group-hover:shadow-elevated group-hover:scale-[1.02]">
              {/* Category Badge */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-badgeWood/10 text-badgeWood text-xs font-work font-medium px-2.5 py-1 rounded-full capitalize">
                  {item.category}
                </span>
                {item.isVegan && (
                  <Leaf className="w-4 h-4 text-accent" />
                )}
              </div>
              
              {/* Title */}
              <h3 className="font-cormorant text-lg md:text-xl text-foreground mb-2">
                {item.name[language]}
              </h3>
              
              {/* Description */}
              <p className="font-work text-sm text-muted-foreground leading-relaxed line-clamp-3">
                {item.description[language]}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dish Detail Modal */}
      <Dialog open={!!selectedDish} onOpenChange={() => setSelectedDish(null)}>
        <DialogContent className="max-w-md bg-background border-border rounded-3xl p-0 overflow-hidden">
          {selectedDish && (
            <>
              {/* Header with colored background */}
              <div className={`p-6 pb-4 ${selectedDish.type === "daily" ? "bg-daily" : "bg-klassiker"}`}>
                <DialogHeader>
                  <div className="flex items-center gap-2 mb-2">
                    {selectedDish.type === "daily" ? (
                      <span className="bg-badgeWood text-white text-xs font-work font-medium px-2.5 py-1 rounded-full">
                        Heute
                      </span>
                    ) : (
                      <span className="bg-badgeWood/10 text-badgeWood text-xs font-work font-medium px-2.5 py-1 rounded-full">
                        Klassiker
                      </span>
                    )}
                    {selectedDish.day && (
                      <span className="text-accent text-xs font-work">
                        {selectedDish.day[language]}
                      </span>
                    )}
                  </div>
                  <DialogTitle className="font-cormorant text-2xl md:text-3xl text-foreground">
                    {selectedDish.name[language]}
                  </DialogTitle>
                </DialogHeader>
              </div>
              
              {/* Content */}
              <div className="p-6 pt-4">
                <p className="font-work text-base text-muted-foreground leading-relaxed">
                  {selectedDish.description[language]}
                </p>
                
                {selectedDish.type === "daily" && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="font-work text-sm text-accent italic">
                      {language === "de" 
                        ? "Unsere täglich wechselnden Gerichte – frisch, pflanzlich und mit Seele zubereitet." 
                        : "Our daily changing dishes – fresh, plant-based and prepared with soul."}
                    </p>
                  </div>
                )}
                
                {selectedDish.type === "klassiker" && (
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="font-work text-sm text-badgeWood italic">
                      {language === "de" 
                        ? "Unsere Klassiker – Gerichte, die bleiben." 
                        : "Our classics – dishes that stay."}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Hide scrollbar CSS */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
