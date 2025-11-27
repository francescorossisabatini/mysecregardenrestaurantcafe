import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DetailedFlower, ContinuousVine } from "@/components/FloralDecorations";
import gardenImg from "@/assets/garden-real.jpg";

export const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-20 md:py-28 bg-gradient-subtle relative overflow-hidden">
      {/* Decorative Flowers and Lines - Maggiore contrasto */}
      <div className="absolute top-0 left-0 right-0 h-24 text-emerald-600 opacity-40">
        <ContinuousVine className="w-full h-full" />
      </div>
      <div className="absolute top-16 left-12 w-24 h-24 text-teal-600 opacity-50">
        <DetailedFlower className="w-full h-full" />
      </div>
      <div className="absolute bottom-16 right-12 w-28 h-28 text-blue-600 opacity-50">
        <DetailedFlower className="w-full h-full" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 md:mb-16 stagger-children in-view">
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-caveat font-bold text-primary mb-4 leading-tight">
              {t("contact.title")}
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10 stagger-children in-view">
            <Card className="p-4 sm:p-5 md:p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-primary/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">{t("contact.address")}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    Mariahilferstraße 45<br />
                    Im Raimundhof<br />
                    1060 Wien, Österreich
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-accent/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">{t("contact.phone")}</h3>
                  <a
                    href="tel:015862839"
                    className="text-xs sm:text-sm md:text-base text-muted-foreground hover:text-accent transition-colors"
                  >
                    01 586 28 39
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-primary/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">{t("contact.hours")}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {t("contact.hours.days")}<br />
                    {t("contact.hours.time")}<br />
                    <span className="text-xs sm:text-sm">{t("contact.hours.closed")}</span>
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-4 sm:p-5 md:p-6 hover:shadow-elevated transition-all bg-card/80 backdrop-blur-sm">
              <div className="flex items-start gap-3 sm:gap-4">
                <div className="bg-accent/10 p-2 sm:p-3 rounded-lg flex-shrink-0">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm sm:text-base text-foreground mb-1 sm:mb-2">{t("contact.social")}</h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground">
                    {t("contact.social.desc")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Google Maps + Entrance Photo */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-10 animate-smooth-reveal" style={{ animationDelay: '800ms' }}>
            {/* Map */}
            <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm overflow-hidden">
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

            {/* Entrance Photo */}
            <Card className="p-3 sm:p-4 bg-card/80 backdrop-blur-sm overflow-hidden">
              <div className="aspect-video w-full rounded-lg overflow-hidden">
                <img
                  src={gardenImg}
                  alt="Entrance to Secret Garden in Raimundhof"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm font-lora text-muted-foreground">
                {t("contact.garden")}
              </p>
            </Card>
          </div>

          <div className="text-center animate-smooth-reveal" style={{ animationDelay: '1000ms' }}>
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-elevated text-base sm:text-lg px-10 py-6 sm:py-7 font-lora"
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
