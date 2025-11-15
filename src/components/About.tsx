import { Card } from "@/components/ui/card";
import { Leaf, Heart, Coffee, Sprout } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Logo } from "@/components/Logo";
import mandalaMinimal from "@/assets/mandala-minimal.png";

export const About = () => {
  const { t } = useLanguage();
  
  return (
    <section id="about" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/5 rounded-full blur-2xl" />
      
      {/* Floral Decoration */}
      <img 
        src={mandalaMinimal} 
        alt="" 
        className="absolute top-1/3 right-10 w-48 h-48 opacity-10 mix-blend-multiply dark:invert dark:opacity-10"
        aria-hidden="true"
      />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header with Logo */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="flex justify-center mb-6">
              <Logo className="w-32 h-32 animate-float" />
            </div>
            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-primary mb-2">
              <span className="text-foreground">{t("about.title").split(" ")[0]}</span>{" "}
              <span className="font-dancing text-5xl md:text-7xl text-primary">{t("about.title").split(" ")[1]}</span>{" "}
              <span className="text-foreground">{t("about.title").split(" ")[2]}</span>
            </h2>
            <div className="w-32 h-1 bg-accent mx-auto rounded-full mt-6" />
          </div>

          {/* Intro Quote */}
          <div className="text-center mb-12">
            <p className="text-2xl md:text-3xl font-playfair italic text-primary leading-relaxed">
              {t("about.intro")}
            </p>
          </div>

          {/* Main Content */}
          <div className="prose prose-lg max-w-none space-y-8 font-lato">
            <Card className="p-8 bg-card/80 backdrop-blur-sm border-primary/20 shadow-soft">
              <p className="text-lg leading-relaxed text-foreground/90">
                {t("about.p1")}
              </p>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-primary/5 border-primary/20 hover:shadow-elevated transition-all">
                <p className="leading-relaxed text-foreground/90">
                  {t("about.p2")}
                </p>
              </Card>

              <Card className="p-6 bg-accent/5 border-accent/20 hover:shadow-elevated transition-all">
                <p className="leading-relaxed text-foreground/90">
                  {t("about.p3")}
                </p>
              </Card>
            </div>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 shadow-elevated">
              <p className="text-xl font-playfair text-center leading-relaxed text-foreground">
                {t("about.p4")}
              </p>
            </Card>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
            <Card className="p-6 text-center hover:shadow-elevated hover:scale-105 transition-all bg-card/80 backdrop-blur-sm group">
              <Leaf className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-playfair font-semibold text-lg text-foreground capitalize">{t("about.bio")}</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated hover:scale-105 transition-all bg-card/80 backdrop-blur-sm group">
              <Heart className="w-12 h-12 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-playfair font-semibold text-lg text-foreground capitalize">{t("about.fair")}</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated hover:scale-105 transition-all bg-card/80 backdrop-blur-sm group">
              <Sprout className="w-12 h-12 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
              <h3 className="font-playfair font-semibold text-lg text-foreground capitalize">{t("about.regional")}</h3>
            </Card>
            <Card className="p-6 text-center hover:shadow-elevated hover:scale-105 transition-all bg-card/80 backdrop-blur-sm group">
              <Coffee className="w-12 h-12 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
              <h3 className="font-playfair font-semibold text-lg text-foreground capitalize">{t("about.seasonal")}</h3>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
