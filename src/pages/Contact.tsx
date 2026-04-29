import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Accessibility, CalendarDays, Car, Clock, DoorOpen, ExternalLink, HandPlatter, MapPin, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { useLanguage } from "@/contexts/LanguageContext";
import entranceGarden from "@/assets/entrance-garden.webp";
import { SITE } from "@/config/site";
import { supabase } from "@/integrations/supabase/client";

type ReservationForm = {
  fullName: string;
  date: string;
  time: string;
  partySize: string;
  contact: string;
  notes: string;
};

const ContactPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [requestSent, setRequestSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reservationForm, setReservationForm] = useState<ReservationForm>({
    fullName: "",
    date: "",
    time: "",
    partySize: "2",
    contact: "",
    notes: "",
  });

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }, []);

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

  const updateReservationField = (field: keyof ReservationForm, value: string) => {
    setReservationForm((current) => ({ ...current, [field]: value }));
    setSubmitError(null);
    setRequestSent(false);
  };

  const handleReservationSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const { error } = await supabase.from("reservation_requests").insert({
      full_name: reservationForm.fullName.trim(),
      contact: reservationForm.contact.trim(),
      reservation_date: reservationForm.date,
      reservation_time: reservationForm.time,
      party_size: Number(reservationForm.partySize),
      notes: reservationForm.notes.trim() || null,
      language,
    });

    setIsSubmitting(false);

    if (error) {
      setSubmitError(language === "de" ? "Die Anfrage konnte nicht gesendet werden. Bitte ruf uns kurz an." : "We could not send the request. Please call us instead.");
      return;
    }

    setRequestSent(true);
    setReservationForm({ fullName: "", date: "", time: "", partySize: "2", contact: "", notes: "" });
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
      <Navigation />

      <main className="pt-24 pb-16">
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
                      <li>{language === "de" ? "Rückseite: über Windmühlgasse kommst du näher zum Lift." : "Back side: Windmühlgasse brings you closer to the lift."}</li>
                      <li>{language === "de" ? "Im Hof: den grünen Gartenbereich suchen." : "Inside: look for the green garden area."}</li>
                    </ul>
                  </div>

                  <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-work text-sm font-medium text-primary underline-offset-4 hover:underline">
                    {language === "de" ? "In Google Maps öffnen" : "Open in Google Maps"}
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
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
                <Accessibility className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Barrierefreiheit" : "Accessibility"}</h2>
                <p className="font-work leading-relaxed text-muted-high-contrast">
                  {language === "de"
                    ? "Der historische Hof ist nicht überall eben. Für Gäste mit Kinderwagen, Rollstuhl oder Mobilitätseinschränkung planen wir gern den passendsten Weg."
                    : "The historic courtyard is not level everywhere. For guests with strollers, wheelchairs or reduced mobility, we are happy to suggest the easiest route."}
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
                  {SITE.transportNote[language]}
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

            {showReservationRequest && <section className="grid gap-6 rounded-lg border border-border/70 bg-section-accent p-6 shadow-card md:grid-cols-[0.9fr_1.1fr] md:p-8">
              <div>
                <CalendarDays className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-3xl font-semibold text-foreground">
                  {language === "de" ? "Tisch anfragen" : "Request a table"}
                </h2>
                <p className="mb-6 font-work leading-relaxed text-muted-high-contrast">
                  {language === "de"
                    ? "Du möchtest sicher gehen, dass ein Tisch auf dich wartet? Ruf uns an, das geht am schnellsten. Oder schick uns eine kurze Anfrage."
                    : "Want to make sure there’s a table waiting for you? Give us a call, it’s the fastest way. Or send us a short request."}
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={`tel:${SITE.phoneTel}`}><Phone className="mr-2 h-4 w-4" />{SITE.phoneDisplay}</a>
                </Button>
              </div>

              <form className="grid gap-4" onSubmit={handleReservationSubmit}>
                <label className="grid gap-2 font-work text-sm text-foreground">
                  {language === "de" ? "Name und Nachname" : "Full name"}
                  <input value={reservationForm.fullName} onChange={(event) => updateReservationField("fullName", event.target.value)} required minLength={2} maxLength={120} className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="grid gap-2 font-work text-sm text-foreground sm:col-span-1">
                    {language === "de" ? "Datum" : "Date"}
                    <input type="date" value={reservationForm.date} onChange={(event) => updateReservationField("date", event.target.value)} min={tomorrow} required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  </label>
                  <label className="grid gap-2 font-work text-sm text-foreground sm:col-span-1">
                    {language === "de" ? "Uhrzeit" : "Time"}
                    <input type="time" value={reservationForm.time} onChange={(event) => updateReservationField("time", event.target.value)} min="11:00" max="19:00" required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  </label>
                  <label className="grid gap-2 font-work text-sm text-foreground sm:col-span-1">
                    {language === "de" ? "Personen" : "People"}
                    <select value={reservationForm.partySize} onChange={(event) => updateReservationField("partySize", event.target.value)} required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                      {Array.from({ length: 20 }, (_, index) => index + 1).map((count) => <option key={count} value={count}>{count}</option>)}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 font-work text-sm text-foreground">
                  {language === "de" ? "Email oder Telefon" : "Email or phone"}
                  <input value={reservationForm.contact} onChange={(event) => updateReservationField("contact", event.target.value)} required minLength={3} maxLength={160} className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <label className="grid gap-2 font-work text-sm text-foreground">
                  {language === "de" ? "Notizen" : "Notes"}
                  <textarea value={reservationForm.notes} onChange={(event) => updateReservationField("notes", event.target.value)} rows={3} maxLength={600} placeholder={language === "de" ? "Allergie, besondere Anlässe…" : "Allergies, special occasions…"} className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <Button type="submit" disabled={isSubmitting} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Users className="mr-2 h-4 w-4" />
                  {isSubmitting ? (language === "de" ? "Wird gesendet…" : "Sending…") : (language === "de" ? "Tisch anfragen" : "Send request")}
                </Button>
                <p className="font-work text-sm text-muted-high-contrast">
                  {submitError ?? (requestSent
                    ? (language === "de" ? "Anfrage erhalten. Wir melden uns bald zur Bestätigung." : "Request received. We'll get back to you soon to confirm.")
                    : (language === "de" ? "Wir bestätigen deine Anfrage innerhalb von 24 Stunden." : "We confirm your request within 24 hours."))}
                </p>
              </form>
            </section>}
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default ContactPage;
