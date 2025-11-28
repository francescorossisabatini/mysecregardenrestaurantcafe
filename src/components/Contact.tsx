import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { DetailedFlower, ContinuousVine } from "@/components/FloralDecorations";
import gardenImg from "@/assets/garden-real.jpg";

export const Contact = () => {
  const { t } = useLanguage();
  
  return (
    <section id="contact" className="py-32 md:py-40 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-caveat font-bold text-primary">
              {t("contact.title")}
            </h2>
          </div>

          {/* Contact Info - Minimal Grid */}
          <div className="grid sm:grid-cols-2 gap-12 mb-16 text-center sm:text-left">
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <MapPin className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">{t("contact.address")}</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                Mariahilferstraße 45<br />
                Im Raimundhof<br />
                1060 Wien, Österreich
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <Phone className="w-6 h-6 text-accent" />
                <h3 className="font-semibold text-lg text-foreground">{t("contact.phone")}</h3>
              </div>
              <a
                href="tel:015862839"
                className="text-base text-muted-foreground hover:text-accent transition-colors"
              >
                01 586 28 39
              </a>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <Clock className="w-6 h-6 text-primary" />
                <h3 className="font-semibold text-lg text-foreground">{t("contact.hours")}</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t("contact.hours.days")}<br />
                {t("contact.hours.time")}<br />
                <span className="text-sm">{t("contact.hours.closed")}</span>
              </p>
            </div>

            <div>
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                <Mail className="w-6 h-6 text-accent" />
                <h3 className="font-semibold text-lg text-foreground">{t("contact.social")}</h3>
              </div>
              <p className="text-base text-muted-foreground">
                {t("contact.social.desc")}
              </p>
            </div>
          </div>

          {/* Map + Photo - Full Width */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
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

            <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl">
              <img
                src={gardenImg}
                alt="Entrance to Secret Garden in Raimundhof"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-12 py-7 font-lora"
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
