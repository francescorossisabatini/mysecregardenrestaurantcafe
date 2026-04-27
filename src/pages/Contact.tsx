import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Accessibility, CalendarDays, Car, Clock, DoorOpen, ExternalLink, MapPin, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileStickyBar } from "@/components/MobileStickyBar";
import { useLanguage } from "@/contexts/LanguageContext";
import entranceGarden from "@/assets/entrance-garden.webp";
import { SITE } from "@/config/site";

const ContactPage = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const [requestSent, setRequestSent] = useState(false);

  const tomorrow = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().split("T")[0];
  }, []);

  const enterSteps = language === "de"
    ? ["Durch den Bogen bei Mariahilferstraße 45 gehen.", "Im Raimundhof dem ruhigen Innenhof folgen.", "Am Tresen bestellen oder kurz nach deinem Tisch fragen."]
    : ["Enter through the arch at Mariahilferstraße 45.", "Follow Raimundhof into the quiet courtyard.", "Order at the counter or ask for your table."];

  const handleReservationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setRequestSent(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={language === "de" ? "Besuche uns" : "Visit Us"}
        description={language === "de"
          ? "So findest du My Secret Garden im Raimundhof: Eingang, Öffnungszeiten, Barrierefreiheit, Parken und Tischanfrage."
          : "How to find My Secret Garden in Raimundhof: entrance, opening hours, accessibility, parking and table requests."}
        path={location.pathname}
      />
      <Navigation />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <header className="mb-10 text-center md:mb-14">
              <h1 className="mb-4 font-cormorant text-4xl font-semibold text-foreground md:text-5xl">
                {language === "de" ? "Besuche uns" : "Visit Us"}
              </h1>
              <p className="mx-auto max-w-2xl font-work text-base leading-relaxed text-muted-foreground md:text-lg">
                {language === "de"
                  ? "My Secret Garden liegt im Raimundhof. Der Eingang ist leicht zu übersehen. Hier findest du den Weg, die Zeiten und die wichtigsten Infos vor deinem Besuch."
                  : "My Secret Garden is inside Raimundhof. The entrance is easy to miss. Here is the way in, the hours and the practical details before you visit."}
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

            <section className="mb-14 grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-stretch">
              <div className="min-h-[320px] overflow-hidden rounded-lg shadow-card">
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
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card md:p-8">
                <div className="mb-4 flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="font-cormorant text-3xl font-semibold text-foreground">
                    {language === "de" ? "So findest du uns" : "How to find us"}
                  </h2>
                </div>
                <p className="font-work leading-relaxed text-muted-foreground">
                  Mariahilferstraße 45<br />
                  Im Raimundhof<br />
                  1060 Wien
                </p>
                <p className="mt-5 font-work leading-relaxed text-foreground/90">
                  {SITE.courtyardInstruction[language]}
                </p>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 font-work text-sm font-medium text-primary underline-offset-4 hover:underline">
                  {language === "de" ? "In Google Maps öffnen" : "Open in Google Maps"}
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </section>

            <section className="mb-14 grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
              <div className="overflow-hidden rounded-lg shadow-card">
                <img src={entranceGarden} alt={language === "de" ? "Eingang im Raimundhof zu My Secret Garden" : "Entrance in Raimundhof to My Secret Garden"} className="h-full w-full object-cover" loading="lazy" />
              </div>
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <DoorOpen className="h-5 w-5 text-primary" aria-hidden="true" />
                  <h2 className="font-cormorant text-3xl font-semibold text-foreground">
                    {language === "de" ? "Wie du hineinkommst" : "How to enter"}
                  </h2>
                </div>
                <ol className="space-y-4">
                  {enterSteps.map((step, index) => (
                    <li key={step} className="flex gap-4 font-work text-foreground/90">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">{index + 1}</span>
                      <span className="pt-0.5 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section className="mb-14 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card">
                <Clock className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Öffnungszeiten" : "Opening hours"}</h2>
                <p className="font-work leading-relaxed text-muted-foreground">
                  {language === "de" ? "Mo–Sa: 11:00–19:00" : "Mon–Sat: 11:00–19:00"}<br />
                  {language === "de" ? "So + Feiertage: geschlossen" : "Sun + holidays: closed"}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card">
                <Accessibility className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Barrierefreiheit" : "Accessibility"}</h2>
                <p className="font-work leading-relaxed text-muted-foreground">
                  {language === "de"
                    ? "Unser Garten hat Stufen, aber keine Hürden. Bitte ruf uns kurz an, wir helfen dir gerne beim Zugang."
                    : "Our garden has steps, but no barriers. Give us a call and we'll make sure you can get in."}
                </p>
              </div>
              <div className="rounded-lg border border-border/70 bg-card/70 p-6 shadow-card">
                <Car className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-2xl font-semibold text-foreground">{language === "de" ? "Parken" : "Parking"}</h2>
                <p className="font-work leading-relaxed text-muted-foreground">
                  Wipark Windmühlgasse<br />
                  Windmühlgasse 22–24<br />
                  {language === "de" ? "Eine Stunde kostenlos für unsere Gäste." : "One hour free for our guests."}
                </p>
              </div>
            </section>

            <section className="grid gap-6 rounded-lg border border-border/70 bg-section-accent p-6 shadow-card md:grid-cols-[0.9fr_1.1fr] md:p-8">
              <div>
                <CalendarDays className="mb-4 h-6 w-6 text-primary" aria-hidden="true" />
                <h2 className="mb-3 font-cormorant text-3xl font-semibold text-foreground">
                  {language === "de" ? "Tisch anfragen" : "Request a table"}
                </h2>
                <p className="mb-6 font-work leading-relaxed text-muted-foreground">
                  {language === "de"
                    ? "Walk-ins sind willkommen. Wenn du sicher planen möchtest, schick uns eine Anfrage oder ruf direkt an."
                    : "Walk-ins are welcome. If you want to plan ahead, send a request or call us directly."}
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                  <a href={`tel:${SITE.phoneTel}`}><Phone className="mr-2 h-4 w-4" />{SITE.phoneDisplay}</a>
                </Button>
              </div>

              <form className="grid gap-4" onSubmit={handleReservationSubmit}>
                <label className="grid gap-2 font-work text-sm text-foreground">
                  {language === "de" ? "Name und Nachname" : "Full name"}
                  <input required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="grid gap-2 font-work text-sm text-foreground sm:col-span-1">
                    {language === "de" ? "Datum" : "Date"}
                    <input type="date" min={tomorrow} required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  </label>
                  <label className="grid gap-2 font-work text-sm text-foreground sm:col-span-1">
                    {language === "de" ? "Uhrzeit" : "Time"}
                    <input type="time" min="11:00" max="19:00" required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                  </label>
                  <label className="grid gap-2 font-work text-sm text-foreground sm:col-span-1">
                    {language === "de" ? "Personen" : "People"}
                    <select required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30">
                      {Array.from({ length: 10 }, (_, index) => index + 1).map((count) => <option key={count}>{count}</option>)}
                    </select>
                  </label>
                </div>
                <label className="grid gap-2 font-work text-sm text-foreground">
                  {language === "de" ? "Email oder Telefon" : "Email or phone"}
                  <input required className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <label className="grid gap-2 font-work text-sm text-foreground">
                  {language === "de" ? "Notizen" : "Notes"}
                  <textarea rows={3} placeholder={language === "de" ? "Allergie, besondere Anlässe…" : "Allergies, special occasions…"} className="rounded-md border border-input bg-background px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30" />
                </label>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Users className="mr-2 h-4 w-4" />
                  {language === "de" ? "Tisch anfragen" : "Send request"}
                </Button>
                <p className="font-work text-sm text-muted-foreground">
                  {requestSent
                    ? (language === "de" ? "Anfrage erhalten. Wir melden uns bald." : "Request received. We'll get back to you soon.")
                    : (language === "de" ? "Wir bestätigen deine Anfrage innerhalb von 24 Stunden." : "We confirm your request within 24 hours.")}
                </p>
              </form>
            </section>
          </div>
        </div>
      </main>

      <Footer />
      <MobileStickyBar />
    </div>
  );
};

export default ContactPage;
