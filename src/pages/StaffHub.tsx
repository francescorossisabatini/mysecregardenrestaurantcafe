import { useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { CalendarDays, ChefHat, ClipboardList, LogOut, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import type { Tables } from "@/integrations/supabase/types";

type Reservation = Tables<"reservation_requests">;
type ReservationStatus = "new" | "confirmed" | "declined" | "archived";

const statusLabels: Record<ReservationStatus, string> = {
  new: "Nuove",
  confirmed: "Confermate",
  declined: "Rifiutate",
  archived: "Archiviate",
};

const StaffHub = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [activeStatus, setActiveStatus] = useState<ReservationStatus>("new");
  const [isLoadingReservations, setIsLoadingReservations] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { menu, isLoading: isMenuLoading, refresh } = useWeeklyMenu();

  const loadReservations = async () => {
    setIsLoadingReservations(true);
    setError(null);

    const { data, error: reservationError } = await supabase
      .from("reservation_requests")
      .select("*")
      .order("reservation_date", { ascending: true })
      .order("reservation_time", { ascending: true });

    setIsLoadingReservations(false);

    if (reservationError) {
      setError("Prenotazioni non disponibili.");
      return;
    }

    setReservations(data ?? []);
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);

      if (!data.session?.user) {
        setIsChecking(false);
        return;
      }

      const { data: roleRows } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .in("role", ["admin", "staff"]);

      const allowed = Boolean(roleRows?.length);
      setIsStaff(allowed);
      setIsChecking(false);
      if (allowed) loadReservations();
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const filteredReservations = useMemo(
    () => reservations.filter((reservation) => reservation.status === activeStatus),
    [reservations, activeStatus]
  );

  const updateReservationStatus = async (id: string, status: ReservationStatus) => {
    const previous = reservations;
    setReservations((current) => current.map((reservation) => reservation.id === id ? { ...reservation, status } : reservation));

    const { error: updateError } = await supabase
      .from("reservation_requests")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      setReservations(previous);
      setError("Stato non aggiornato. Riprova.");
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (!isChecking && !session) return <Navigate to="/staff/login" replace />;

  if (!isChecking && session && !isStaff) {
    return (
      <div className="min-h-screen bg-section-soft px-4 py-12">
        <SEOHead title="Staff Hub" description="Area riservata al personale." path="/staff" noindex />
        <main className="mx-auto max-w-xl rounded-lg border border-border/70 bg-card/90 p-6 text-center shadow-card">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="font-cormorant text-3xl font-semibold text-foreground">Accesso non autorizzato</h1>
          <p className="mt-3 font-work text-sm text-muted-foreground">Questo account non è ancora abilitato come staff.</p>
          <Button onClick={signOut} className="mt-6">Esci</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-soft">
      <SEOHead title="Staff Hub" description="Prenotazioni, ingredienti e richieste interne." path="/staff" noindex />
      <main className="container mx-auto px-4 py-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-primary">My Secret Garden</p>
            <h1 className="mt-2 font-cormorant text-4xl font-semibold text-foreground md:text-5xl">Staff Hub</h1>
            <p className="mt-2 font-work text-sm text-muted-foreground">Prenotazioni, menu corrente e appunti operativi.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={loadReservations} disabled={isLoadingReservations}>
              <RefreshCw className="h-4 w-4" />
              Aggiorna
            </Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Esci
            </Button>
          </div>
        </header>

        {error && <p className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 font-work text-sm text-destructive">{error}</p>}

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <ClipboardList className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-foreground">Nuove richieste</p>
            <strong className="font-cormorant text-4xl text-foreground">{reservations.filter((item) => item.status === "new").length}</strong>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <CalendarDays className="mb-3 h-5 w-5 text-accent" aria-hidden="true" />
            <p className="font-work text-sm text-muted-foreground">Questa settimana</p>
            <strong className="font-cormorant text-4xl text-foreground">{reservations.filter((item) => item.status !== "archived").length}</strong>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <ChefHat className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-foreground">Giorni menu</p>
            <strong className="font-cormorant text-4xl text-foreground">{menu.days.length}</strong>
          </div>
        </section>

        <div className="grid gap-8 xl:grid-cols-[1.25fr_0.75fr]">
          <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
            <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="font-cormorant text-3xl font-semibold text-foreground">Prenotazioni</h2>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(statusLabels) as ReservationStatus[]).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => setActiveStatus(status)}
                    className={`rounded-full px-3 py-1.5 font-work text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${activeStatus === status ? "bg-primary text-primary-foreground" : "bg-muted text-primary hover:bg-primary/10"}`}
                  >
                    {statusLabels[status]}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              {isLoadingReservations ? (
                <p className="font-work text-sm text-muted-foreground">Caricamento prenotazioni…</p>
              ) : filteredReservations.length === 0 ? (
                <p className="rounded-md bg-muted/60 px-4 py-5 font-work text-sm text-muted-foreground">Nessuna richiesta in questa sezione.</p>
              ) : filteredReservations.map((reservation) => (
                <article key={reservation.id} className="rounded-md border border-border/70 bg-background/70 p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h3 className="font-cormorant text-2xl font-semibold text-foreground">{reservation.full_name}</h3>
                      <p className="font-work text-sm text-muted-foreground">
                        {reservation.reservation_date} · {reservation.reservation_time.slice(0, 5)} · {reservation.party_size} persone
                      </p>
                      <a href={`tel:${reservation.contact}`} className="mt-2 inline-flex items-center gap-2 font-work text-sm text-primary underline-offset-4 hover:underline">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                        {reservation.contact}
                      </a>
                      {reservation.notes && <p className="mt-3 font-work text-sm leading-relaxed text-foreground/85">{reservation.notes}</p>}
                    </div>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {activeStatus !== "confirmed" && <Button size="sm" onClick={() => updateReservationStatus(reservation.id, "confirmed")}>Conferma</Button>}
                      {activeStatus !== "declined" && <Button size="sm" variant="outline" onClick={() => updateReservationStatus(reservation.id, "declined")}>Rifiuta</Button>}
                      {activeStatus !== "archived" && <Button size="sm" variant="ghost" onClick={() => updateReservationStatus(reservation.id, "archived")}>Archivia</Button>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="grid gap-6">
            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-cormorant text-3xl font-semibold text-foreground">Piatti e ingredienti</h2>
                <Button variant="outline" size="sm" onClick={refresh}>Sync</Button>
              </div>
              <div className="grid gap-4">
                {isMenuLoading ? <p className="font-work text-sm text-muted-foreground">Menu in caricamento…</p> : menu.days.map((day) => (
                  <article key={day.day.de} className="rounded-md bg-background/70 p-4">
                    <h3 className="font-work text-xs font-semibold uppercase tracking-[0.1em] text-primary">{day.day.de}</h3>
                    {[
                      { label: "Suppe", name: day.soup.de, meta: day.soupMeta },
                      { label: "Green dish", name: day.green.de, meta: day.greenMeta },
                      { label: "Blue dish", name: day.blue.de, meta: day.blueMeta },
                    ].map((dish) => (
                      <div key={`${day.day.de}-${dish.label}`} className="mt-3 border-t border-border/60 pt-3">
                        <p className="font-work text-xs font-semibold text-muted-foreground">{dish.label}</p>
                        <p className="font-work text-sm font-medium text-foreground">{dish.name}</p>
                        {dish.meta?.ingredientsMain?.length ? <p className="mt-1 font-work text-xs text-muted-foreground">Ingredienti: {dish.meta.ingredientsMain.join(", ")}</p> : null}
                        {dish.meta?.allergens?.length ? <p className="mt-1 font-work text-xs text-muted-foreground">Allergeni: {dish.meta.allergens.join(", ")}</p> : null}
                      </div>
                    ))}
                  </article>
                ))}
              </div>
            </section>

            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <h2 className="font-cormorant text-3xl font-semibold text-foreground">Torte</h2>
              <p className="mt-2 font-work text-sm leading-relaxed text-muted-foreground">
                Sezione pronta per le richieste torte. La attiviamo quando sono definiti prodotti, anticipo minimo e campi ordine.
              </p>
            </section>
          </aside>
        </div>
      </main>
    </div>
  );
};

export default StaffHub;
