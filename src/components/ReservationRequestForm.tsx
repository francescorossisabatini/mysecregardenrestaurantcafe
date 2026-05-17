import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Phone, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";
import { SITE } from "@/config/site";
import interiorPhoto from "@/assets/photos/interior-main.jpg";
import gardenPhoto from "@/assets/photos/garden-courtyard.jpg";

type ReservationForm = {
  fullName: string;
  date: string;
  time: string;
  partySize: string;
  seatingArea: "inside" | "outside";
  contact: string;
  notes: string;
};

type ReservationRequestFormProps = {
  compact?: boolean;
  headingLevel?: "h1" | "h2";
  onSuccess?: () => void;
};

const copy = {
  de: {
    title: "Tisch reservieren",
    subline: "Wähle drinnen oder draußen. Reservierungen für heute sind bis 09:00 möglich.",
    name: "Name und Nachname",
    date: "Datum",
    time: "Uhrzeit",
    chooseSlot: "Slot wählen",
    people: "Personen",
    area: "Bereich",
    inside: "Drinnen",
    outside: "Draußen",
    contact: "Email oder Telefon",
    notes: "Notizen",
    notesPlaceholder: "Allergie, besondere Anlässe...",
    submit: "Jetzt reservieren",
    submitting: "Wird gesendet...",
    success: "Dein Tisch ist reserviert. Wir freuen uns auf dich!",
    error: "Die Reservierung konnte nicht gesendet werden. Bitte ruf uns kurz an.",
    required: "Bitte alle Pflichtfelder ausfüllen.",
    rule: "Maximal 10 Personen pro Reservierung. Same-day Reservierungen schließen um 09:00 Uhr.",
    call: "Anrufen",
  },
  en: {
    title: "Book a table",
    subline: "Choose inside or outside. Same-day bookings are possible until 09:00.",
    name: "Full name",
    date: "Date",
    time: "Time",
    chooseSlot: "Choose slot",
    people: "People",
    area: "Area",
    inside: "Inside",
    outside: "Outside",
    contact: "Email or phone",
    notes: "Notes",
    notesPlaceholder: "Allergies, special occasions...",
    submit: "Book now",
    submitting: "Sending...",
    success: "Your table is booked. We can't wait to see you!",
    error: "We could not send your booking. Please call us instead.",
    required: "Please fill in all required fields.",
    rule: "Maximum 10 people per booking. Same-day bookings close at 09:00.",
    call: "Call",
  },
} as const;

const getMinimumReservationDate = () => {
  const now = new Date();
  const viennaTime = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Vienna",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const part = (type: string) => viennaTime.find((item) => item.type === type)?.value ?? "";
  const date = `${part("year")}-${part("month")}-${part("day")}`;
  const hour = Number(part("hour"));

  if (hour < 9) return date;

  const nextDay = new Date(`${date}T12:00:00`);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split("T")[0];
};

const reservationTimeSlots = Array.from({ length: 17 }, (_, index) => {
  const totalMinutes = 11 * 60 + index * 30;
  const hour = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
});

export const ReservationRequestForm = ({ compact = false, headingLevel = "h1", onSuccess }: ReservationRequestFormProps) => {
  const { language } = useLanguage();
  const labels = copy[language];
  const minimumReservationDate = useMemo(() => getMinimumReservationDate(), []);
  const Heading = headingLevel;
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ReservationForm>({
    fullName: "",
    date: minimumReservationDate,
    time: "",
    partySize: "2",
    seatingArea: "inside",
    contact: "",
    notes: "",
  });

  const updateField = <K extends keyof ReservationForm>(field: K, value: ReservationForm[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
    setMessage(null);
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!form.fullName.trim() || !form.contact.trim() || !form.date || !form.time) {
      setMessage({ type: "error", text: labels.required });
      return;
    }

    setIsSubmitting(true);
    window.gtag?.("event", "reservation_request_submit", { event_category: "conversion", seating_area: form.seatingArea, party_size: Number(form.partySize) });

    const { error } = await supabase.from("reservation_requests").insert({
      full_name: form.fullName.trim(),
      contact: form.contact.trim(),
      reservation_date: form.date,
      reservation_time: form.time,
      party_size: Number(form.partySize),
      seating_area: form.seatingArea,
      notes: form.notes.trim() || null,
      language,
    } as never);

    setIsSubmitting(false);

    if (error) {
      window.gtag?.("event", "reservation_request_error", { event_category: "debug" });
      setMessage({ type: "error", text: labels.error });
      return;
    }

    setMessage({ type: "success", text: labels.success });
    setForm({ fullName: "", date: minimumReservationDate, time: "", partySize: "2", seatingArea: "inside", contact: "", notes: "" });
    onSuccess?.();
  };

  return (
    <form onSubmit={submit} className={`grid gap-5 ${compact ? "" : "rounded-lg border border-border bg-card p-4 shadow-card md:p-6"}`}>
      <div>
        <Heading className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-5xl">{labels.title}</Heading>
        <p className="mt-2 text-sm leading-relaxed text-muted-high-contrast">{labels.subline}</p>
      </div>

      <Label className="grid gap-2 text-sm font-semibold text-foreground">
        {labels.name}
        <Input value={form.fullName} onChange={(event) => updateField("fullName", event.target.value)} minLength={2} maxLength={120} required className="h-12 text-base" />
      </Label>

      <div className="grid gap-4 md:grid-cols-3">
        <Label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.date}
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-high-contrast" aria-hidden="true" />
            <Input value={form.date} onChange={(event) => updateField("date", event.target.value)} type="date" min={minimumReservationDate} required className="h-12 pl-10 text-base" />
          </div>
        </Label>

        <Label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.time}
          <Select value={form.time} onValueChange={(value) => updateField("time", value)} required>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder={labels.chooseSlot} />
            </SelectTrigger>
            <SelectContent>
              {reservationTimeSlots.map((slot) => <SelectItem key={slot} value={slot}>{slot}</SelectItem>)}
            </SelectContent>
          </Select>
        </Label>

        <Label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.people}
          <Select value={form.partySize} onValueChange={(value) => updateField("partySize", value)} required>
            <SelectTrigger className="h-12 text-base">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, index) => String(index + 1)).map((count) => <SelectItem key={count} value={count}>{count}</SelectItem>)}
            </SelectContent>
          </Select>
        </Label>
      </div>

      <Label className="grid gap-2 text-sm font-semibold text-foreground">
        {labels.area}
        <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label={labels.area}>
          {(["inside", "outside"] as const).map((area) => {
            const selected = form.seatingArea === area;
            const image = area === "inside" ? interiorPhoto : gardenPhoto;
            const label = area === "inside" ? labels.inside : labels.outside;
            return (
              <button
                key={area}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => updateField("seatingArea", area)}
                className={`group relative overflow-hidden rounded-md border text-left transition-all ${selected ? "border-primary ring-2 ring-primary/40" : "border-input hover:border-primary/50"}`}
              >
                <img
                  src={image}
                  alt={area === "inside" ? "Innenbereich My Secret Garden" : "Gastgarten My Secret Garden"}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
                <span className={`absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-2 text-sm font-semibold backdrop-blur-sm ${selected ? "bg-primary/90 text-primary-foreground" : "bg-background/85 text-foreground"}`}>
                  {label}
                  {selected ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : null}
                </span>
              </button>
            );
          })}
        </div>
      </Label>

      <Label className="grid gap-2 text-sm font-semibold text-foreground">
        {labels.contact}
        <Input value={form.contact} onChange={(event) => updateField("contact", event.target.value)} minLength={3} maxLength={160} required className="h-12 text-base" />
      </Label>

      <Label className="grid gap-2 text-sm font-semibold text-foreground">
        {labels.notes}
        <Textarea value={form.notes} onChange={(event) => updateField("notes", event.target.value.slice(0, 600))} placeholder={labels.notesPlaceholder} maxLength={600} className="min-h-24 resize-none text-base" />
      </Label>

      <p className="rounded-lg border border-border bg-background/70 px-4 py-3 text-sm leading-relaxed text-muted-high-contrast">{labels.rule}</p>

      {message ? (
        <p className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${message.type === "success" ? "border-accent/30 bg-accent/10 text-accent" : "border-destructive/30 bg-destructive/10 text-destructive"}`}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4" aria-hidden="true" /> : null}
          {message.text}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12">
          <Users className="h-4 w-4" aria-hidden="true" />
          {isSubmitting ? labels.submitting : labels.submit}
        </Button>
        <Button type="button" size="lg" variant="outline" className="h-12" asChild onClick={() => window.gtag?.("event", "reservation_call_click", { event_category: "conversion" })}>
          <a href={`tel:${SITE.phoneTel}`}><Phone className="h-4 w-4" aria-hidden="true" />{labels.call}</a>
        </Button>
      </div>
    </form>
  );
};