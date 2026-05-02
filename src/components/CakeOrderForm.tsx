import { FormEvent, useMemo, useState } from "react";
import { CalendarDays, CheckCircle2, Minus, Phone, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/contexts/LanguageContext";

export const cakeCatalog = [
  "Chocolate Mousse Cake",
  "Poppy Seeds Hazelnut Cake",
  "Carrot Spice Cake",
  "Walnut Brownie",
  "Salty Caramel Slice",
  "Vegan Cheesecake (Cashew Paste)",
] as const;

const copy = {
  de: {
    title: "Eine Torte bestellen",
    subline: "Zahlung an der Kasse bei Abholung.",
    name: "Name und Nachname",
    phone: "Telefon",
    cake: "Torte auswählen",
    quantity: "Menge",
    pickup: "Abholdatum",
    notes: "Notizen",
    notesPlaceholder: "Allergien, Anlass, besondere Wünsche...",
    standardLead: "Mindestens 5 Tage im Voraus.",
    largeLead: "Mindestens 5 Tage im Voraus.",
    largeHelper: "Bei mehr als 3 Torten rufen wir dich zur Bestätigung zurück.",
    ack: "Ich verstehe, dass die Zahlung bei Abholung erfolgt. Nicht abgeholte Bestellungen sind nicht erstattungsfähig.",
    submit: "Anfrage senden",
    submitting: "Wird gesendet...",
    success: "Danke. Wir haben deine Tortenanfrage erhalten.",
    error: "Die Anfrage konnte nicht gesendet werden. Bitte ruf uns an.",
    required: "Bitte alle Pflichtfelder ausfüllen.",
    call: "Anrufen",
    closedDay: "Bitte wähle Montag bis Samstag.",
  },
  en: {
    title: "Order a cake",
    subline: "Payment at pickup, cash or card.",
    name: "Full name",
    phone: "Phone",
    cake: "Choose a cake",
    quantity: "Quantity",
    pickup: "Pickup date",
    notes: "Notes",
    notesPlaceholder: "Allergies, occasion, special wishes...",
    standardLead: "At least 5 days in advance.",
    largeLead: "At least 5 days in advance.",
    largeHelper: "For more than 3 cakes, we'll call you back to confirm.",
    ack: "I understand that payment is made at pickup. Uncollected orders are non-refundable.",
    submit: "Send request",
    submitting: "Sending...",
    success: "Thank you. We received your cake request.",
    error: "The request could not be sent. Please call us.",
    required: "Please fill in all required fields.",
    call: "Call",
    closedDay: "Please choose Monday to Saturday.",
  },
} as const;

const addDays = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

const isSunday = (value: string) => new Date(`${value}T12:00:00`).getDay() === 0;

type CakeOrderFormProps = {
  compact?: boolean;
  onSuccess?: () => void;
};

export const CakeOrderForm = ({ compact = false, onSuccess }: CakeOrderFormProps) => {
  const { language } = useLanguage();
  const labels = copy[language];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [cakeChoice, setCakeChoice] = useState<(typeof cakeCatalog)[number] | "">("");
  const [quantity, setQuantity] = useState(1);
  const minPickupDate = useMemo(() => addDays(5), []);
  const [pickupDate, setPickupDate] = useState(minPickupDate);
  const [notes, setNotes] = useState("");
  const [paymentAcknowledged, setPaymentAcknowledged] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const normalizedPickupDate = pickupDate < minPickupDate ? minPickupDate : pickupDate;
  const hasClosedDay = normalizedPickupDate ? isSunday(normalizedPickupDate) : false;

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!name.trim() || !phone.trim() || !cakeChoice || !paymentAcknowledged || hasClosedDay) {
      setMessage({ type: "error", text: hasClosedDay ? labels.closedDay : labels.required });
      return;
    }

    setIsSubmitting(true);
    window.gtag?.("event", "cake_order_submit", { event_category: "conversion", quantity, cake_choice: cakeChoice });

    const { error } = await (supabase.from("cake_orders") as any).insert({
      name: name.trim(),
      phone: phone.trim(),
      cake_choice: cakeChoice,
      quantity,
      pickup_date: normalizedPickupDate,
      notes: notes.trim() || null,
      payment_acknowledged: paymentAcknowledged,
      language,
    });

    setIsSubmitting(false);

    if (error) {
      window.gtag?.("event", "cake_order_error", { event_category: "debug" });
      setMessage({ type: "error", text: labels.error });
      return;
    }

    setMessage({ type: "success", text: labels.success });
    setName("");
    setPhone("");
    setCakeChoice("");
    setQuantity(1);
    setPickupDate(addDays(1));
    setNotes("");
    setPaymentAcknowledged(false);
    onSuccess?.();
  };

  return (
    <form onSubmit={submit} className={`grid gap-5 ${compact ? "" : "rounded-lg border border-border bg-card p-4 shadow-card md:p-6"}`}>
      <div>
        <h1 className="font-cormorant text-4xl font-semibold leading-tight text-primary md:text-5xl">{labels.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-high-contrast">{labels.subline}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.name}
          <Input value={name} onChange={(event) => setName(event.target.value)} minLength={2} required className="h-12 text-base" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.phone}
          <Input value={phone} onChange={(event) => setPhone(event.target.value)} type="tel" required className="h-12 text-base" />
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-foreground">
        {labels.cake}
        <Select value={cakeChoice} onValueChange={(value) => setCakeChoice(value as (typeof cakeCatalog)[number])}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder={labels.cake} />
          </SelectTrigger>
          <SelectContent>
            {cakeCatalog.map((cake) => <SelectItem key={cake} value={cake}>{cake}</SelectItem>)}
          </SelectContent>
        </Select>
      </label>

      <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr]">
        <div className="grid gap-2 text-sm font-semibold text-foreground">
          <span>{labels.quantity}</span>
          <div className="grid h-12 grid-cols-[3rem_1fr_3rem] overflow-hidden rounded-md border border-input bg-background">
            <button type="button" className="grid place-items-center border-r border-border text-primary disabled:text-muted-high-contrast" disabled={quantity <= 1} onClick={() => setQuantity((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </button>
            <span className="grid place-items-center text-lg font-bold text-foreground">{quantity}</span>
            <button type="button" className="grid place-items-center border-l border-border text-primary" onClick={() => setQuantity((value) => value + 1)} aria-label="Increase quantity">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {quantity >= 3 ? <p className="text-xs font-normal leading-relaxed text-accent">{labels.largeHelper}</p> : null}
        </div>
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.pickup}
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-high-contrast" />
            <Input value={normalizedPickupDate} onChange={(event) => setPickupDate(event.target.value)} type="date" min={minPickupDate} required className="h-12 pl-10 text-base" />
          </div>
          <p className={`text-xs font-normal leading-relaxed ${hasClosedDay ? "text-destructive" : "text-muted-high-contrast"}`}>{hasClosedDay ? labels.closedDay : quantity >= 3 ? labels.largeLead : labels.standardLead}</p>
        </label>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-foreground">
        {labels.notes}
        <Textarea value={notes} onChange={(event) => setNotes(event.target.value.slice(0, 300))} placeholder={labels.notesPlaceholder} maxLength={300} className="min-h-24 resize-none text-base" />
      </label>

      <label className="flex items-start gap-3 rounded-lg border border-border bg-background/70 p-3 text-sm leading-relaxed text-foreground">
        <Checkbox checked={paymentAcknowledged} onCheckedChange={(checked) => setPaymentAcknowledged(checked === true)} className="mt-1" />
        <span>{labels.ack}</span>
      </label>

      {message ? (
        <p className={`flex items-center gap-2 rounded-lg border px-4 py-3 text-sm ${message.type === "success" ? "border-accent/30 bg-accent/10 text-accent" : "border-destructive/30 bg-destructive/10 text-destructive"}`}>
          {message.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : null}
          {message.text}
        </p>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
        <Button type="submit" size="lg" disabled={isSubmitting} className="h-12">{isSubmitting ? labels.submitting : labels.submit}</Button>
        <Button type="button" size="lg" variant="outline" className="h-12" asChild onClick={() => window.gtag?.("event", "cake_call_click", { event_category: "conversion" })}>
          <a href="tel:+4315864156"><Phone className="h-4 w-4" />{labels.call}</a>
        </Button>
      </div>
    </form>
  );
};
