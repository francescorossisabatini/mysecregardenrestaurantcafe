import { MapPin, Phone, Clock, Mail, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import gardenImg from "@/assets/garden-real.jpg";

const ContactPage = () => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {language === "de" ? "Kontakt" : "Contact"}
              </h1>
              <p className="text-muted-foreground font-work text-base md:text-lg">
                {language === "de" 
                  ? "Wir freuen uns auf deinen Besuch" 
                  : "We look forward to your visit"}
              </p>
            </div>

            {/* Contact Info Grid */}
            <div className="grid sm:grid-cols-2 gap-10 mb-16">
              
              {/* Address */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-cormorant font-semibold text-lg text-foreground">
                    {language === "de" ? "Adresse" : "Address"}
                  </h3>
                </div>
                <p className="text-muted-foreground font-work leading-relaxed">
                  Mariahilferstraße 45<br />
                  Im Raimundhof<br />
                  1060 Wien, Österreich
                </p>
                <a 
                  href="https://maps.google.com/?q=Mariahilferstraße+45,+1060+Wien"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors mt-2 font-work"
                >
                  {language === "de" ? "Auf Google Maps öffnen" : "Open in Google Maps"}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Phone */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <h3 className="font-cormorant font-semibold text-lg text-foreground">
                    {language === "de" ? "Telefon" : "Phone"}
                  </h3>
                </div>
                <a
                  href="tel:015862839"
                  className="text-muted-foreground font-work hover:text-accent transition-colors"
                >
                  01 586 28 39
                </a>
              </div>

              {/* Hours */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-cormorant font-semibold text-lg text-foreground">
                    {language === "de" ? "Öffnungszeiten" : "Opening Hours"}
                  </h3>
                </div>
                <p className="text-muted-foreground font-work leading-relaxed">
                  {language === "de" ? "Montag – Samstag" : "Monday – Saturday"}<br />
                  11:00 – 19:00<br />
                  <span className="text-sm opacity-70">
                    {language === "de" ? "An Feiertagen geschlossen" : "Closed on holidays"}
                  </span>
                </p>
              </div>

              {/* Social */}
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                  <Instagram className="w-5 h-5 text-accent" />
                  <h3 className="font-cormorant font-semibold text-lg text-foreground">
                    Social Media
                  </h3>
                </div>
                <a
                  href="https://www.instagram.com/mysecretgardencafewien/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground font-work hover:text-accent transition-colors"
                >
                  @mysecretgardencafewien
                </a>
              </div>
            </div>

            {/* Map + Photo */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
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

              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                <img
                  src={gardenImg}
                  alt="Entrance to Secret Garden in Raimundhof"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <Button
                size="lg"
                className="bg-accent hover:bg-accent/90 text-accent-foreground font-work px-10 py-6"
                asChild
              >
                <a href="tel:015862839">
                  {language === "de" ? "Jetzt anrufen" : "Call now"}
                </a>
              </Button>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
