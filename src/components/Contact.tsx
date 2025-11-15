import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LotusIcon, BlossomIcon } from "@/components/FloralDecoration";

export const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Floral Decorations - Green/Teal tones */}
      <div className="absolute top-20 left-10 w-36 h-24 text-emerald-400/30">
        <BlossomIcon className="w-full h-full" />
      </div>
      <div className="absolute bottom-20 right-10 w-32 h-32 text-teal-400/30 -rotate-12">
        <LotusIcon className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-4">
              <span className="font-dancing text-4xl md:text-6xl">{t("contact.title")}</span>
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("contact.address")}</h3>
                  <p className="text-muted-foreground">
                    Mariahilferstraße 45<br />
                    Im Raimundhof<br />
                    1060 Wien, Österreich
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Phone className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("contact.phone")}</h3>
                  <a
                    href="tel:015862839"
                    className="text-muted-foreground hover:text-accent transition-colors"
                  >
                    01 586 28 39
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("contact.hours")}</h3>
                  <p className="text-muted-foreground">
                    {t("contact.hours.days")}<br />
                    {t("contact.hours.time")}<br />
                    <span className="text-sm">{t("contact.hours.closed")}</span>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-3 rounded-lg">
                  <Mail className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">{t("contact.social")}</h3>
                  <p className="text-muted-foreground">
                    {t("contact.social.desc")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-elevated"
              asChild
            >
              <a href="tel:015862839">{t("contact.call")}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
