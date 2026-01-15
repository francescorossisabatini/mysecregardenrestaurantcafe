import { MapPin, Phone, Clock, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { CTAEndBlock } from "@/components/CTAEndBlock";
import { useLanguage } from "@/contexts/LanguageContext";
import gardenImg from "@/assets/garden-real.jpg";
import { SITE } from "@/config/site";

const ContactPage = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title={language === "de" ? "Kontakt" : "Contact"}
        description={language === "de" 
          ? "Besuche My Secret Garden in Wien – Mariahilferstraße 45. Öffnungszeiten Mo–Sa 11–19 Uhr."
          : "Visit My Secret Garden in Vienna – Mariahilferstraße 45. Open Mon–Sat 11am–7pm."}
        path="/contact"
      />
      <Navigation />
      
      <main className="pt-24 pb-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            
            {/* Header with CTAs above the fold */}
            <div className="text-center mb-10">
              <h1 className="font-cormorant text-4xl md:text-5xl font-semibold text-foreground mb-4">
                {language === "de" ? "Besuche uns" : "Visit Us"}
              </h1>
              <p className="text-muted-foreground font-work text-base md:text-lg mb-6">
                {language === "de" 
                  ? "Wir freuen uns auf deinen Besuch" 
                  : "We look forward to your visit"}
              </p>
              
              {/* Above the fold CTAs */}
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-work px-8 py-6"
                  asChild
                >
                  <a href={`tel:${SITE.phoneTel}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    {language === "de" ? "Anrufen" : "Call Us"}
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-work px-8 py-6"
                  asChild
                >
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="w-4 h-4 mr-2" />
                    {language === "de" ? "Route" : "Directions"}
                  </a>
                </Button>
              </div>
            </div>

            {/* Essential Info - Address & Hours prominent */}
            <div className="grid sm:grid-cols-2 gap-8 mb-12 max-w-2xl mx-auto">
              
              {/* Address */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <h3 className="font-cormorant font-semibold text-lg text-foreground">
                    {language === "de" ? "Adresse" : "Address"}
                  </h3>
                </div>
                <p className="text-muted-foreground font-work leading-relaxed text-sm">
                  Mariahilferstraße 45<br />
                  Im Raimundhof<br />
                  1060 Wien
                </p>
              </div>

              {/* Hours */}
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <h3 className="font-cormorant font-semibold text-lg text-foreground">
                    {language === "de" ? "Öffnungszeiten" : "Hours"}
                  </h3>
                </div>
                <p className="text-muted-foreground font-work leading-relaxed text-sm">
                  {language === "de" ? "Mo–Sa" : "Mon–Sat"} 11:00–19:00<br />
                  <span className="text-xs opacity-70">
                    {language === "de" ? "Sonn- & Feiertage geschlossen" : "Closed Sun & holidays"}
                  </span>
                </p>
              </div>
            </div>

            {/* Phone & Social - Secondary */}
            <div className="grid sm:grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto text-center">
              <div>
                <p className="text-xs text-muted-foreground font-work uppercase tracking-wide mb-1">
                  {language === "de" ? "Telefon" : "Phone"}
                </p>
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="text-foreground font-work hover:text-primary transition-colors"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-work uppercase tracking-wide mb-1">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/mysecretgarden_vienna/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground font-work hover:text-primary transition-colors inline-flex items-center gap-1"
                >
                  @mysecretgarden_vienna
                  <ExternalLink className="w-3 h-3" />
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

          </div>
        </div>
      </main>

      {/* End CTA Block */}
      <CTAEndBlock show={["weekly", "menu"]} />

      <Footer />
      
      <MobileStickyBar />
    </div>
  );
};

export default ContactPage;
