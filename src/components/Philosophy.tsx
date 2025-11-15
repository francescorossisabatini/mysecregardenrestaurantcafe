import { Card } from "@/components/ui/card";
import { Quote, Sparkles, Heart, Flower2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { MinimalGrowth, GeometricLeaf } from "@/components/AbstractPlantDecoration";

export const Philosophy = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-16 md:py-24 bg-background relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
      </div>
      
      {/* Abstract Plant Decorations */}
      <div className="absolute top-16 right-16 w-28 h-28 text-indigo-300/40">
        <MinimalGrowth className="w-full h-full" />
      </div>
      <div className="absolute bottom-32 left-16 w-32 h-32 text-purple-300/40">
        <GeometricLeaf className="w-full h-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Flower2 className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              <span className="font-dancing text-4xl md:text-6xl">{t("philosophy.title")}</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          {/* Main Philosophy Content */}
          <Card className="p-8 md:p-10 mb-8 bg-gradient-subtle border-primary/20 shadow-elevated">
            <div className="space-y-6 text-foreground/90 leading-relaxed">
              <p className="text-lg md:text-xl font-medium text-primary">
                {t("philosophy.intro")}
              </p>

              <p className="text-base md:text-lg">
                {t("philosophy.meditation")}{" "}
                <a 
                  href="https://www.srichinmoy.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent font-semibold hover:underline"
                >
                  Sri Chinmoys
                </a>{" "}
                {t("philosophy.inspired")}
              </p>

              <p className="text-base md:text-lg">
                {t("philosophy.harmony")}
              </p>
            </div>
          </Card>

          {/* Quote Block */}
          <Card className="p-8 md:p-10 mb-8 bg-primary text-primary-foreground relative overflow-hidden">
            <Quote className="absolute top-4 right-4 w-16 h-16 opacity-10" />
            <div className="relative z-10 space-y-4">
              <p className="text-lg md:text-xl leading-relaxed italic">
                {t("philosophy.quote.intro")}
              </p>
              <p className="text-xl md:text-2xl font-semibold leading-relaxed">
                {t("philosophy.quote.main")}
              </p>
              <div className="space-y-2 text-base md:text-lg">
                <p>{t("philosophy.quote.line1")}</p>
                <p>{t("philosophy.quote.line2")}</p>
                <p>{t("philosophy.quote.line3")}</p>
                <p className="font-semibold">
                  {t("philosophy.quote.line4")}
                </p>
              </div>
              <p className="text-xl md:text-2xl font-bold pt-4">
                {t("philosophy.quote.heart")}
              </p>
              <p className="text-lg">{t("philosophy.quote.revelation")}</p>
            </div>
          </Card>

          {/* Sri Chinmoy Quote */}
          <Card className="p-8 md:p-10 mb-8 bg-accent/5 border-accent/20 shadow-soft">
            <div className="flex items-start gap-4">
              <Quote className="w-12 h-12 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-base md:text-lg text-foreground/90 leading-relaxed mb-3 italic">
                  {t("philosophy.sri.quote")}
                </p>
                <p className="text-sm font-semibold text-muted-foreground">
                  — {t("philosophy.sri.author")}
                </p>
              </div>
            </div>
          </Card>

          {/* Values Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-7 h-7 text-accent animate-pulse" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{t("philosophy.feature1.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("philosophy.feature1.desc")}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{t("philosophy.feature2.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("philosophy.feature2.desc")}
              </p>
            </Card>

            <Card className="p-6 text-center hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm group">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Flower2 className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-bold text-lg text-foreground mb-2">{t("philosophy.feature3.title")}</h3>
              <p className="text-sm text-muted-foreground">
                {t("philosophy.feature3.desc")}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
