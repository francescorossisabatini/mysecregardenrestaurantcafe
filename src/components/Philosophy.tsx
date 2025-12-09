import { Quote, Sparkles, Heart, Leaf, ExternalLink } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import sriChinmoyImage from "@/assets/sri-chinmoy.jpg";

export const Philosophy = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-32 md:py-40 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary mb-6">
              {t("philosophy.title")}
            </h2>
            <p className="font-lora text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
              {t("philosophy.sri.intro")}
            </p>
          </div>

          {/* Sri Chinmoy Section */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-24">
            {/* Portrait */}
            <div className="relative">
              <div className="aspect-[3/4] overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src={sriChinmoyImage} 
                  alt="Sri Chinmoy - Spiritual Master"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Quote sotto la foto */}
              <div className="mt-4 md:mt-6 text-center space-y-3 md:space-y-4">
                <div className="bg-accent/10 rounded-xl p-4 md:p-6 border border-accent/30">
                  <p className="font-caveat text-lg md:text-2xl text-accent leading-relaxed">
                    {language === "de" ? (
                      <>
                        „Nein, es ist nicht möglich,<br />
                        dass ein innerer Ruf<br />
                        unerhört bleibt."
                      </>
                    ) : (
                      <>
                        "No, it is not possible<br />
                        For any inner cry<br />
                        To remain unheard."
                      </>
                    )}
                  </p>
                </div>
                <p className="text-xs md:text-base font-lora text-muted-foreground italic px-2">
                  {t("philosophy.sri.subtitle")}
                </p>
              </div>
            </div>

            {/* Content */}
            <div className="space-y-6 md:space-y-8">
              <div>
                <a 
                  href="https://www.srichinmoy.org" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 md:gap-3 bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <h3 className="text-2xl md:text-4xl font-caveat font-bold text-primary underline decoration-primary/50 underline-offset-4 group-hover:decoration-primary">
                    {t("philosophy.sri.title")}
                  </h3>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                </a>
              </div>

              <div className="space-y-6">
                <p className="font-lora text-lg leading-relaxed text-foreground/90">
                  {t("philosophy.sri.story1")}
                </p>
                <p className="font-lora text-lg leading-relaxed text-foreground/90">
                  {t("philosophy.sri.story2")}
                </p>
                <p className="font-lora text-lg leading-relaxed text-foreground/90">
                  {t("philosophy.sri.story3")}
                </p>
              </div>

              <div className="bg-muted/50 rounded-xl p-6 md:p-8 border-l-4 border-accent">
                <div className="flex items-start gap-4">
                  <Quote className="w-8 h-8 md:w-10 md:h-10 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-base md:text-lg text-foreground leading-relaxed mb-4 italic">
                      "{t("philosophy.sri.quote")}"
                    </p>
                    <p className="text-sm md:text-base font-semibold text-accent">
                      — {t("philosophy.sri.author")}
                    </p>
                  </div>
                </div>
              </div>

              <p className="font-lora text-lg leading-relaxed text-foreground/90">
                {t("philosophy.sri.influence")}
              </p>

              <a 
                href="https://www.srichinmoy.org" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-primary font-medium transition-colors duration-300"
              >
                {t("philosophy.sri.link")}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Vision */}
          <div className="mb-32">
            <h3 className="text-3xl md:text-4xl font-caveat font-bold text-primary mb-8 text-center">
              {t("philosophy.vision.title")}
            </h3>
            <div className="space-y-6 max-w-4xl mx-auto">
              <p className="font-lora text-xl leading-relaxed text-foreground/90 text-center">
                {t("philosophy.vision.intro")}
              </p>
              <p className="font-lora text-xl leading-relaxed text-foreground/90 text-center">
                {t("philosophy.vision.harmony")}
              </p>
            </div>
          </div>

          {/* Heart Garden Quote */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-12 md:p-16 mb-32">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center mb-8">
                <Heart className="w-12 h-12 mx-auto mb-4" />
                <p className="text-xl md:text-2xl leading-relaxed">
                  {t("philosophy.quote.intro")}
                </p>
              </div>
              
              <p className="text-2xl md:text-3xl font-caveat font-bold leading-relaxed text-center">
                {t("philosophy.quote.main")}
              </p>
              
              <div className="space-y-4 text-lg leading-relaxed pl-6 border-l-4 border-primary-foreground/30">
                <p>{t("philosophy.quote.line1")}</p>
                <p>{t("philosophy.quote.line2")}</p>
                <p>{t("philosophy.quote.line3")}</p>
                <p className="font-semibold">
                  {t("philosophy.quote.line4")}
                </p>
              </div>
              
              <div className="text-center space-y-4 pt-6 border-t border-primary-foreground/20">
                <p className="text-3xl md:text-4xl font-caveat font-bold">
                  {t("philosophy.quote.heart")}
                </p>
                <p className="text-xl">
                  {t("philosophy.quote.revelation")}
                </p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-caveat text-2xl font-bold text-foreground mb-3">{t("philosophy.feature1.title")}</h3>
              <p className="font-lora text-base text-muted-foreground">
                {t("philosophy.feature1.desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-caveat text-2xl font-bold text-foreground mb-3">{t("philosophy.feature2.title")}</h3>
              <p className="font-lora text-base text-muted-foreground">
                {t("philosophy.feature2.desc")}
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent/10 flex items-center justify-center">
                <Leaf className="w-8 h-8 text-accent" />
              </div>
              <h3 className="font-caveat text-2xl font-bold text-foreground mb-3">{t("philosophy.feature3.title")}</h3>
              <p className="font-lora text-base text-muted-foreground">
                {t("philosophy.feature3.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
