import { useLocation } from "react-router-dom";
import { Accessibility, Car, Clock, DoorOpen, ExternalLink, HandPlatter, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { SkipLink } from "@/components/SkipLink";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { ReservationRequestForm } from "@/components/ReservationRequestForm";
import { useLanguage } from "@/contexts/LanguageContext";
import entranceGarden from "@/assets/entrance-garden.webp";
import { SITE } from "@/config/site";
import { MapConsentGate } from "@/components/MapConsentGate";

const ContactPage = () => {
  const { language } = useLanguage();
  const location = useLocation();

  const parkingMapsUrl = "https://www.google.com/maps/search/?api=1&query=Wipark%20Windm%C3%BChlgasse%2022-24%201060%20Wien";
  const parkingDetails = language === "de"
    ? [
      { label: "Garage", value: "Wipark Windmühlgasse" },
      { label: "Adresse", value: "Windmühlgasse 22 bis 24" },
      { label: "Vorteil", value: "1 Stunde inklusive ab 27 Euro Konsumation" },
    ]
    : [
      { label: "Garage", value: "Wipark Windmühlgasse" },
      { label: "Address", value: "Windmühlgasse 22 to 24" },
      { label: "Benefit", value: "1 hour included with a 27 euro spend" },
    ];
  const showReservationRequest = false;

  const visitJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "My Secret Garden",
    url: `https://secretgardenrestaurant.at${location.pathname}`,
    telephone: SITE.phoneTel,
    servesCuisine: ["Vegetarian", "Vegan", "World Cuisine"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mariahilferstraße 45, Im Raimundhof",
      postalCode: "1060",
      addressLocality: "Wien",
      addressCountry: "AT",
    },
    openingHoursSpecification: [{
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "11:00",
      closes: "19:00",
    }],
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={language === "de" ? "Besuch uns" : "Visit us"}
        description={language === "de"
          ? "So findest du My Secret Garden im Raimundhof: Eingang, Öffnungszeiten, Anreise, Barrierefreiheit und Tischanfrage."
          : "How to find My Secret Garden in Raimundhof: entrance, opening hours, directions, accessibility and table requests."}
        path={location.pathname}
        jsonLd={visitJsonLd}
      />
      <SkipLink />
      <Navigation />

      <main id="main-content" tabIndex={-1} className="pt-24 pb-16 focus:outline-none">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <header className="mb-10 text-center md:mb-14">
              <h1 className="mb-4 font-cormorant text-4xl font-semibold text-foreground md:text-5xl">
                {language === "de" ? "Besuch uns" : "Visit us"}
              </h1>
              <p className="mx-auto max-w-2xl font-work text-base leading-relaxed text-muted-high-contrast md:text-lg">
                {language === "de"
                  ? "Alles Wichtige für deinen Besuch: Adresse, Öffnungszeiten, Anreise und Unterstützung vor Ort."
                  : "Everything you need for your visit: address, opening hours, travel options and on-site support."}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button size="lg" className="bg-primary px-8 py-6 font-work text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={`tel:${SITE.phoneTel}`}>
                    <Phone className="mr-2 h-4 w-4" />
                    {language === "de" ? "Anrufen" : "Call"}
                  </a>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 font-work" asChild>
                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    {language === "de" ? "Route anzeigen" : "Get directions"}
                  </a>
                </Button>
              </div>
            </header>

            <section className="mb-14 overflow-hidden rounded-lg border border-border/70 bg-card/70 shadow-card">
              <div className="grid gap-0 lg:grid-cols-[1fr_1fr]">
                <div className="min-h-[320px] lg:min-h-[520px]">
                  <MapConsentGate
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.366188!2d16.353526!3d48.1994275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d078f0451b459%3A0x76f7dc33e496ccb5!2sSecret%20Garden%20Caf%C3%A9%20Restaurant!5e0!3m2!1sde!2sat!4v1234567890"
                    title="Secret Garden Restaurant Location"
                  />
                </div>
                <div className="grid gap-6 p-6 md:p-8">
                  <div>
                    <div className="mb-4 flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h2 className="font-cormorant text-3xl font-semibold text-foreground">
                        {language === "de" ? "So findest du uns" : "How to find us"}
                      </h2>
                    </div>
                    <p className="font-work leading-relaxed text-muted-high-contrast">
                      Mariahilferstraße 45<br />
                      Im Raimundhof<br />
                      1060 Wien
                    </p>
                  </div>

                  <div className="overflow-hidden rounded-lg border border-border/70">
                    <img src={entranceGarden} alt={language === "de" ? "Eingang im Raimundhof zu My Secret Garden" : "Entrance in Raimundhof to My Secret Garden"} className="aspect-[4/3] w-full object-cover" loading="lazy" />
                  </div>

                  <div className="rounded-lg border border-border/70 bg-background/60 p-5">
                    <div className="mb-3 flex items-center gap-3">
                      <DoorOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                      <h3 className="font-cormorant text-2xl font-semibold text-foreground">
                        {language === "de" ? "Zugang vor Ort" : "On-site access"}
                      </h3>
                    </div>
                    <ul className="space-y-2 font-work text-sm leading-relaxed text-muted-high-contrast">
                      <li>{language === "de" ? "Straßenseite: durch den Hausbogen gehen." : "Street side: walk through the building arch."}</li>
                      <li>{language === "de" ? "Rückseite: besser, wenn du den Lift nutzen möchtest." : "Back side: better if you want to use the lift."}</li>
                      <li>{language === "de" ? "Im Hof: halte dich zum grünen Gartenbereich." : "Inside: head toward the green garden area."}</li>
                    </ul>
                    <div className="mt-4 rounded-md border border-border/60 bg-card/70 p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Accessibility className="h-4 w-4 text-primary" aria-hidden="true" />
                        <h4 className="font-work text-sm font-semibold text-foreground">
                          {language === "de" ? "Barrierefreiheit" : "Accessibility"}
                        </h4>
                      </div>
                      <p className="font-work text-sm leading-relaxed text-muted-high-contrast">
                        {language === "de"
                          ? "Stufenfreier Zugang ist über die Rückseite des Raimundhofs und den Lift möglich. Ruf uns gern kurz an, wenn du Unterstützung beim Ankommen brauchst."
                          : "Step-free access is available from the back side of Raimundhof via the lift. Please call us if you need help when arriving."}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            <section className="mb-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card">
                <Clock className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Öffnungszeiten" : "Opening hours"}</h2>
                <p className="font-work leading-relaxed text-muted-high-contrast">
                  {language === "de" ? "Mo bis Sa: 11:00 bis 19:00" : "Mon to Sat: 11:00 to 19:00"}<br />
                  {language === "de" ? "Sonn- und Feiertage geschlossen." : "Closed on Sundays and public holidays."}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card">
                <MapPin className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Öffentlich" : "Public transport"}</h2>
                <p className="font-work leading-relaxed text-muted-high-contrast">
                  {SITE.transportNote[language]}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card">
                <HandPlatter className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "So funktioniert es" : "How it works"}</h2>
                <p className="font-work leading-relaxed text-muted-high-contrast">
                      {SITE.counterServiceNote[language]} {language === "de" ? "Schnell, wenn du es eilig hast. Ruhig, wenn du bleiben möchtest." : "Quick if you’re in a hurry. Quiet if you want to stay a while."}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card md:col-span-2 xl:col-span-1">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div>
                    <Car className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                    <h2 className="font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Parken" : "Parking"}</h2>
                  </div>
                  <span className="rounded-full bg-primary/10 px-3 py-1 font-work text-xs font-semibold text-primary">
                    {language === "de" ? "1h frei" : "1h free"}
                  </span>
                </div>
                <p className="font-work text-sm leading-relaxed text-muted-high-contrast">
                  {language === "de" ? "Die Garage ist die nächste Option, wenn du mit dem Auto kommst." : "This is the closest option if you arrive by car."}
                </p>
                <dl className="mt-5 grid gap-3">
                  {parkingDetails.map((detail) => (
                    <div key={detail.label} className="rounded-md border border-border/60 bg-background/60 p-3">
                      <dt className="font-work text-xs font-semibold uppercase tracking-[0.08em] text-primary">{detail.label}</dt>
                      <dd className="mt-1 font-work text-sm leading-relaxed text-foreground">{detail.value}</dd>
                    </div>
                  ))}
                </dl>
                <Button variant="outline" className="mt-5 w-full font-work" asChild>
                  <a href={parkingMapsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-2 h-4 w-4" />
                    {language === "de" ? "Garage öffnen" : "Open garage map"}
                    <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </section>

            {showReservationRequest && <ReservationRequestForm headingLevel="h2" />}
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default ContactPage;
