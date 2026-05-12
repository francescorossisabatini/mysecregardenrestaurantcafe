import { useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Archive, CakeSlice, ClipboardList, LogOut, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOHead } from "@/components/SEOHead";
import { WeeklyMenuConfigCard } from "@/components/WeeklyMenuConfigCard";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { cleanDisplayText, joinDisplayText } from "@/lib/displayText";

type StaffMenuRecord = {
  id: string;
  title: string;
  category?: string;
  menuDay?: string;
  description?: string;
  ingredients: string[];
  allergens: string[];
  notes: string[];
  sourceSheet: string;
  snapshotPeriod?: string;
  isCurrent?: boolean;
  fields: Array<{ label: string; value: string }>;
};

type KuchenplanData = {
  sheetName: string;
  records: StaffMenuRecord[];
  currentRecords: StaffMenuRecord[];
  archiveRecords: StaffMenuRecord[];
  snapshots: Array<{ id: string; sheet_name: string; period: string | null; is_current: boolean; created_at: string }>;
};

const emptyKuchenplanData: KuchenplanData = {
  sheetName: "Küchenplan",
  records: [],
  currentRecords: [],
  archiveRecords: [],
  snapshots: [],
};

const recordMatches = (record: StaffMenuRecord, query: string) => [
  record.title,
  record.category,
  record.menuDay,
  record.description,
  record.snapshotPeriod,
  ...record.ingredients,
  ...record.allergens,
  ...record.notes,
  ...record.fields.flatMap((field) => [field.label, field.value]),
]
  .filter(Boolean)
  .some((value) => cleanDisplayText(String(value)).toLowerCase().includes(query));

const recordSection = (record: StaffMenuRecord) => cleanDisplayText(record.menuDay || record.category || "Weekly prep");

const StaffHub = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [kuchenplan, setKuchenplan] = useState<KuchenplanData>(emptyKuchenplanData);
  const [isKuchenplanLoading, setIsKuchenplanLoading] = useState(false);
  const [kuchenplanError, setKuchenplanError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const loadKuchenplan = async () => {
    setIsKuchenplanLoading(true);
    setKuchenplanError(null);
    const { data, error: functionError } = await supabase.functions.invoke("get-staff-menu-details");

    if (functionError || !data?.success) {
      setKuchenplanError("Küchenplan could not be loaded from Google Sheets.");
      setKuchenplan(emptyKuchenplanData);
    } else {
      setKuchenplan({ ...emptyKuchenplanData, ...data.data });
    }

    setIsKuchenplanLoading(false);
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

      const { data: accessData, error: accessError } = await supabase.functions.invoke("check-staff-access");

      if (accessError) {
        setError("Staff access check failed. Please sign out and try again.");
        setIsStaff(false);
      } else {
        const hasStaffAccess = Boolean(accessData?.isStaff);
        setIsStaff(hasStaffAccess);
        if (hasStaffAccess) void loadKuchenplan();
      }
      setIsChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const currentRecords = kuchenplan.currentRecords.length
    ? kuchenplan.currentRecords
    : kuchenplan.records.filter((record) => record.isCurrent);

  const currentSections = useMemo(() => currentRecords.reduce<Record<string, StaffMenuRecord[]>>((groups, record) => {
    const key = recordSection(record);
    groups[key] = [...(groups[key] ?? []), record];
    return groups;
  }, {}), [currentRecords]);

  const archiveSearchRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const searchableRecords = kuchenplan.records.length ? kuchenplan.records : [...currentRecords, ...kuchenplan.archiveRecords];
    const uniqueRecords = Array.from(new Map(searchableRecords.map((record) => [record.id, record])).values());

    return uniqueRecords
      .filter((record) => query ? recordMatches(record, query) : !record.isCurrent)
      .sort((a, b) => Number(Boolean(b.isCurrent)) - Number(Boolean(a.isCurrent)));
  }, [currentRecords, kuchenplan.archiveRecords, kuchenplan.records, searchTerm]);

  if (!isChecking && !session) return <Navigate to="/staff/login" replace />;

  if (!isChecking && session && !isStaff) {
    return (
      <div className="min-h-screen bg-section-soft px-4 py-12">
        <SEOHead title="Staff Hub" description="Restricted staff area." path="/staff" noindex notranslate />
        <main className="mx-auto max-w-xl rounded-lg border border-border/70 bg-card/90 p-6 text-center shadow-card">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="font-cormorant text-3xl font-semibold text-foreground">Unauthorized access</h1>
          <p className="mt-3 font-work text-sm text-muted-high-contrast">This account is not enabled for staff access yet.</p>
          <Button onClick={signOut} className="mt-6">Sign out</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-soft">
      <SEOHead title="Staff Hub" description="Current Küchenplan, ingredients and archive search." path="/staff" noindex notranslate />
      <main className="container mx-auto px-4 py-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-primary">My Secret Garden</p>
            <h1 className="mt-2 font-cormorant text-4xl font-semibold text-foreground md:text-5xl">Staff Hub</h1>
            <p className="mt-2 font-work text-sm text-muted-high-contrast">Küchenplan details from Google Sheets with searchable archive.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="default" asChild>
              <Link to="/staff/kitchen">Kitchen dashboard</Link>
            </Button>
            <Button variant="outline" onClick={loadKuchenplan} disabled={isKuchenplanLoading}>{isKuchenplanLoading ? "Loading" : "Sync Küchenplan"}</Button>
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        {error && <p className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 font-work text-sm text-destructive">{error}</p>}
        {kuchenplanError ? <p className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 font-work text-sm text-destructive">{kuchenplanError}</p> : null}

        <WeeklyMenuConfigCard onMenuSynced={loadKuchenplan} />

        <section className="mb-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <CakeSlice className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-high-contrast">Current Küchenplan items</p>
            <strong className="font-cormorant text-4xl text-foreground">{currentRecords.length}</strong>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <Archive className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-high-contrast">Archived items</p>
            <strong className="font-cormorant text-4xl text-foreground">{kuchenplan.archiveRecords.length}</strong>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <ClipboardList className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-high-contrast">Source sheet</p>
            <strong className="font-cormorant text-3xl text-foreground">{cleanDisplayText(kuchenplan.sheetName)}</strong>
          </div>
        </section>

        <Tabs defaultValue="current" className="grid gap-6">
          <TabsList className="w-full justify-start overflow-x-auto bg-card/85">
            <TabsTrigger value="current">Current Küchenplan</TabsTrigger>
            <TabsTrigger value="archive">Archive search</TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="mt-0">
            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <div className="mb-5 flex items-center gap-2">
                <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="font-cormorant text-3xl font-semibold text-foreground">Weekly Küchenplan details</h2>
              </div>

              {isKuchenplanLoading && !currentRecords.length ? <p className="font-work text-sm text-muted-high-contrast">Loading Küchenplan...</p> : null}
              {!isKuchenplanLoading && !currentRecords.length ? <p className="font-work text-sm text-muted-high-contrast">No current Küchenplan items found.</p> : null}

              <div className="grid gap-6">
                {Object.entries(currentSections).map(([section, records]) => (
                  <div key={section} className="rounded-md bg-background/70 p-4">
                    <h3 className="font-cormorant text-2xl font-semibold text-foreground">{section}</h3>
                    <div className="mt-4 grid gap-4 xl:grid-cols-2">
                      {records.map((record) => <KuchenplanCard key={record.id} record={record} />)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="archive" className="mt-0">
            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h2 className="font-cormorant text-3xl font-semibold text-foreground">Archive dish search</h2>
                  </div>
                  <p className="mt-1 font-work text-sm text-muted-high-contrast">Search current and archived Küchenplan dishes by name, ingredient or allergen.</p>
                </div>
                <div className="relative min-w-0 sm:w-80">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-high-contrast" aria-hidden="true" />
                  <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search dish name" className="pl-9" />
                </div>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                {!archiveSearchRecords.length ? <p className="font-work text-sm text-muted-high-contrast">No archive items found.</p> : null}
                {archiveSearchRecords.map((record) => <KuchenplanCard key={record.id} record={record} showSnapshot />)}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const KuchenplanCard = ({ record, showSnapshot = false }: { record: StaffMenuRecord; showSnapshot?: boolean }) => (
  <article className="rounded-md border border-border/60 bg-card/80 p-4">
    <div className="flex flex-wrap items-start justify-between gap-2">
      <div>
        <div className="mb-2 flex flex-wrap gap-2">
          {record.isCurrent ? <Badge variant="default">Current</Badge> : showSnapshot ? <Badge variant="secondary">Archive</Badge> : null}
          {record.category ? <Badge variant="secondary">{cleanDisplayText(record.category)}</Badge> : null}
          {record.menuDay ? <Badge variant="outline">{cleanDisplayText(record.menuDay)}</Badge> : null}
        </div>
        <h3 className="font-cormorant text-2xl font-semibold text-foreground">{cleanDisplayText(record.title)}</h3>
      </div>
      {showSnapshot && record.snapshotPeriod ? <span className="font-work text-xs text-muted-high-contrast">{cleanDisplayText(record.snapshotPeriod)}</span> : null}
    </div>
    {record.description ? <p className="mt-2 font-work text-sm leading-relaxed text-muted-high-contrast">{cleanDisplayText(record.description)}</p> : null}
    {record.ingredients.length ? <p className="mt-3 font-work text-sm leading-relaxed text-foreground"><span className="font-semibold">Ingredients:</span> {joinDisplayText(record.ingredients, ", ")}</p> : null}
    {record.allergens.length ? <p className="mt-2 font-work text-xs leading-relaxed text-muted-high-contrast"><span className="font-semibold text-foreground/80">Allergens:</span> {joinDisplayText(record.allergens, ", ")}</p> : null}
    {record.notes.length ? <p className="mt-2 font-work text-xs leading-relaxed text-muted-high-contrast"><span className="font-semibold text-foreground/80">Notes:</span> {joinDisplayText(record.notes, ", ")}</p> : null}
    <details className="mt-4 border-t border-border/60 pt-3">
      <summary className="cursor-pointer font-work text-xs font-semibold uppercase tracking-[0.08em] text-primary">All sheet fields</summary>
      <dl className="mt-3 grid gap-2">
        {record.fields.map((field) => (
          <div key={`${record.id}-${field.label}-${field.value}`} className="grid gap-1 rounded-sm bg-background/70 p-2 sm:grid-cols-[11rem_1fr]">
            <dt className="font-work text-xs font-semibold text-foreground/80">{cleanDisplayText(field.label)}</dt>
            <dd className="font-work text-xs leading-relaxed text-muted-high-contrast">{cleanDisplayText(field.value)}</dd>
          </div>
        ))}
      </dl>
    </details>
  </article>
);

export default StaffHub;
