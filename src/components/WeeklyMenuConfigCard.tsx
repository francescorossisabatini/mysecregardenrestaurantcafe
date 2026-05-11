import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CalendarClock, RefreshCw } from "lucide-react";
import { useWeeklyMenuAvailable, lastSundayMidnightVienna } from "@/hooks/useWeeklyMenuAvailable";
import { clearMenuCache } from "@/services/googleSheetsService";

type WeeklyMenuConfigCardProps = {
  onMenuSynced?: () => Promise<void> | void;
};

export const WeeklyMenuConfigCard = ({ onMenuSynced }: WeeklyMenuConfigCardProps) => {
  const { toast } = useToast();
  const [sheetInput, setSheetInput] = useState("");
  const [loadedAt, setLoadedAt] = useState<string | null>(null);
  const [currentSheetId, setCurrentSheetId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const available = useWeeklyMenuAvailable(loadedAt);

  const refreshConfig = async () => {
    const { data } = await supabase
      .from("menu_config")
      .select("sheet_id, loaded_at")
      .eq("singleton", true)
      .maybeSingle();
    if (data) {
      setLoadedAt(data.loaded_at);
      setCurrentSheetId(data.sheet_id);
    }
  };

  useEffect(() => {
    void refreshConfig();
  }, []);

  // Compute next expiration: next Sunday 00:00 Vienna
  const nextExpiry = (() => {
    const lastSun = lastSundayMidnightVienna();
    return new Date(lastSun.getTime() + 7 * 24 * 60 * 60 * 1000);
  })();

  const submit = async () => {
    if (!sheetInput.trim()) return;
    setIsSubmitting(true);
    const { data, error } = await supabase.functions.invoke("set-menu-sheet-id", {
      body: { sheetId: sheetInput.trim() },
    });
    setIsSubmitting(false);

    if (error || !data?.success) {
      toast({
        title: "Errore",
        description: data?.error || "Impossibile salvare il Google Sheet ID",
        variant: "destructive",
      });
      return;
    }

    clearMenuCache();
    setSheetInput("");
    await refreshConfig();
    await supabase.functions.invoke("get-staff-menu-details");
    await onMenuSynced?.();
    toast({
      title: "Menu aggiornato",
      description: "Il menu della settimana è di nuovo visibile sul sito.",
    });
  };

  const formatDate = (iso: string | null) =>
    iso
      ? new Intl.DateTimeFormat("de-AT", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Europe/Vienna",
        }).format(new Date(iso))
      : "—";

  return (
    <section className="mb-8 rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
      <div className="mb-4 flex items-center gap-2">
        <CalendarClock className="h-5 w-5 text-primary" aria-hidden="true" />
        <h2 className="font-cormorant text-2xl font-semibold text-foreground">
          Menu della settimana
        </h2>
        {available ? (
          <Badge variant="default">Visibile</Badge>
        ) : (
          <Badge variant="destructive">Da aggiornare</Badge>
        )}
      </div>

      <div className="grid gap-3 text-sm font-work text-muted-high-contrast md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground/70">
            Ultimo caricamento
          </p>
          <p>{formatDate(loadedAt)}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground/70">
            Scade
          </p>
          <p>domenica {formatDate(nextExpiry.toISOString())}</p>
        </div>
        {currentSheetId ? (
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-foreground/70">
              Sheet ID attivo
            </p>
            <p className="break-all font-mono text-xs">{currentSheetId}</p>
          </div>
        ) : null}
      </div>

      <div className="mt-5 grid gap-2 sm:grid-cols-[1fr_auto]">
        <Input
          placeholder="Incolla URL del Google Sheet o solo l'ID"
          value={sheetInput}
          onChange={(e) => setSheetInput(e.target.value)}
          disabled={isSubmitting}
        />
        <Button onClick={submit} disabled={isSubmitting || !sheetInput.trim()}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {isSubmitting ? "Salvo…" : "Carica menu"}
        </Button>
      </div>

      <p className="mt-2 font-work text-xs text-muted-high-contrast">
        Caricando un nuovo ID il menu torna visibile sul sito fino alla domenica successiva.
      </p>
    </section>
  );
};
