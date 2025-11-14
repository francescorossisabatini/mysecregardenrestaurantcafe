import { Card } from "@/components/ui/card";
import { Leaf, Heart, Coffee, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              {t("about.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground/90 mb-12">
            <p className="text-lg md:text-xl leading-relaxed">
              {t("about.intro")}
            </p>

            <p className="leading-relaxed">
              {t("about.p1")}
            </p>

            <p className="leading-relaxed">
              {t("about.p2")}
            </p>

            <p className="leading-relaxed">
              {t("about.p3")}
            </p>

            <p className="leading-relaxed text-lg">
              {t("about.p4")}
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Leaf className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground capitalize">{t("about.bio")}</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Heart className="w-10 h-10 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-foreground capitalize">{t("about.fair")}</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Sprout className="w-10 h-10 mx-auto mb-3 text-primary" />
              <h3 className="font-semibold text-foreground capitalize">{t("about.regional")}</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <Coffee className="w-10 h-10 mx-auto mb-3 text-accent" />
              <h3 className="font-semibold text-foreground capitalize">{t("about.seasonal")}</h3>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
