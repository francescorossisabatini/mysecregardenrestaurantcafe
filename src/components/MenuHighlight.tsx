import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UtensilsCrossed } from "lucide-react";
import { WeeklyMenuDialog } from "@/components/WeeklyMenuDialog";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export const MenuHighlight = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { t } = useLanguage();
  return (
    <section id="menu" className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-6">
            <UtensilsCrossed className="w-8 h-8 text-accent-foreground" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t("menu.title")}
          </h2>
          
          <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
            {t("menu.description")}
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <Card className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-center">
              <h3 className="font-bold text-xl mb-2 text-primary-foreground">{t("menu.warm")}</h3>
              <p className="text-primary-foreground/80 text-sm">Currys, Dal, Tagesgerichte</p>
            </Card>
            <Card className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-center">
              <h3 className="font-bold text-xl mb-2 text-primary-foreground">{t("menu.salads")}</h3>
              <p className="text-primary-foreground/80 text-sm">Reichhaltig & nahrhaft</p>
            </Card>
            <Card className="p-6 bg-primary-foreground/10 backdrop-blur-sm border-primary-foreground/20 text-center">
              <h3 className="font-bold text-xl mb-2 text-primary-foreground">{t("menu.desserts")}</h3>
              <p className="text-primary-foreground/80 text-sm">Torten, Kuchen, Rohkost</p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-elevated"
              onClick={() => setShowMenu(true)}
            >
              {t("menu.view")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
            >
              {t("menu.togo")}
            </Button>
          </div>
        </div>
      </div>

      <WeeklyMenuDialog open={showMenu} onOpenChange={setShowMenu} />
    </section>
  );
};
