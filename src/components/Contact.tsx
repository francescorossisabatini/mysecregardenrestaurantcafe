import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DetailedFlower, ContinuousVine } from "@/components/FloralDecorations";

export const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-16 md:py-24 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative Flowers and Lines - Maggiore contrasto */}
      <div className="absolute top-0 left-0 right-0 h-24 text-emerald-600 opacity-60">
        <ContinuousVine className="w-full h-full" />
      </div>
      <div className="absolute top-16 left-12 w-24 h-24 text-teal-600 opacity-80">
        <DetailedFlower className="w-full h-full" />
      </div>
      <div className="absolute bottom-16 right-12 w-28 h-28 text-blue-600 opacity-80">
        <DetailedFlower className="w-full h-full" />
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

          {/* Google Maps Embed */}
          <Card className="p-4 mb-8 bg-card/80 backdrop-blur-sm overflow-hidden">
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.366188!2d16.353526!3d48.1994275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d078f0451b459%3A0x76f7dc33e496ccb5!2sSecret%20Garden%20Caf%C3%A9%20Restaurant!5e0!3m2!1sde!2sat!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Secret Garden Restaurant Location"
              />
            </div>
          </Card>

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
