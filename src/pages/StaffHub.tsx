import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { CakeSlice, ChefHat, ClipboardList, LogOut, Search, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOHead } from "@/components/SEOHead";
import { useWeeklyMenu } from "@/hooks/useWeeklyMenu";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { inferDishDetails } from "@/lib/menuDetails";
import { cleanDisplayText, joinDisplayText } from "@/lib/displayText";

type DishMeta = {
  descriptionShort?: string;
  ingredientsMain?: string[];
  allergens?: string[];
  gfDisclaimer?: boolean;
};

type StaffMenuRecord = {
  id: string;
  title: string;
  category?: string;
  description?: string;
  ingredients: string[];
  allergens: string[];
  notes: string[];
  sourceSheet: string;
  snapshotPeriod?: string;
  menuDay?: string;
  isCurrent: boolean;
  fields: Array<{ label: string; value: string }>;
};

type StaffMenuResponse = {
  currentPeriod?: string;
  currentRecords: StaffMenuRecord[];
  archivedRecords: StaffMenuRecord[];
  allRecords: StaffMenuRecord[];
};

const mergeDishMeta = (dishText: string, sheetMeta?: DishMeta): DishMeta => {
  const inferred = inferDishDetails(dishText);
  return {
    descriptionShort: sheetMeta?.descriptionShort || inferred.descriptionShort,
    ingredientsMain: sheetMeta?.ingredientsMain?.length ? sheetMeta.ingredientsMain : inferred.ingredientsMain,
    allergens: sheetMeta?.allergens?.length ? sheetMeta.allergens : inferred.allergens,
    gfDisclaimer: sheetMeta?.gfDisclaimer || inferred.gfDisclaimer,
  };
};

const StaffHub = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cakePlan, setCakePlan] = useState<StaffMenuResponse>({ currentRecords: [], archivedRecords: [], allRecords: [] });
  const [isCakeLoading, setIsCakeLoading] = useState(false);
  const [cakeError, setCakeError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { menu, isLoading: isMenuLoading, refresh } = useWeeklyMenu();

  const loadCakePlan = async () => {
    setIsCakeLoading(true);
    setCakeError(null);
    const { data, error: functionError } = await supabase.functions.invoke("get-staff-menu-details");
    if (functionError || !data?.success) {
      setCakeError("Kuchenplan could not be loaded from Google Sheets.");
      setCakePlan({ currentRecords: [], archivedRecords: [], allRecords: [] });
    } else {
      setCakePlan({
        currentPeriod: data.data.currentPeriod,
        currentRecords: data.data.currentRecords ?? [],
        archivedRecords: data.data.archivedRecords ?? [],
        allRecords: data.data.allRecords ?? [],
      });
    }
    setIsCakeLoading(false);
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
        if (hasStaffAccess) void loadCakePlan();
      }
      setIsChecking(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const searchableCakeRecords = searchTerm.trim() ? cakePlan.allRecords : cakePlan.currentRecords;

  const filteredCakeRecords = searchableCakeRecords.filter((record) => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return true;
    return [record.title, record.category, record.menuDay, record.description, record.snapshotPeriod, ...record.ingredients, ...record.allergens, ...record.notes]
      .filter(Boolean)
      .some((value) => cleanDisplayText(String(value)).toLowerCase().includes(query));
  });

  const currentSections = cakePlan.currentRecords.reduce<Record<string, StaffMenuRecord[]>>((groups, record) => {
    const key = cleanDisplayText(record.menuDay || record.category || "General prep");
    groups[key] = [...(groups[key] ?? []), record];
    return groups;
  }, {});

  const isSearchingArchive = searchTerm.trim().length > 0;

  if (!isChecking && !session) return <Navigate to="/staff/login" replace />;

  if (!isChecking && session && !isStaff) {
    return (
      <div className="min-h-screen bg-section-soft px-4 py-12">
          <SEOHead title="Staff Hub" description="Restricted staff area." path="/staff" noindex />
        <main className="mx-auto max-w-xl rounded-lg border border-border/70 bg-card/90 p-6 text-center shadow-card">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="font-cormorant text-3xl font-semibold text-foreground">Unauthorized access</h1>
          <p className="mt-3 font-work text-sm text-muted-foreground">This account is not enabled for staff access yet.</p>
          <Button onClick={signOut} className="mt-6">Sign out</Button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-soft">
      <SEOHead title="Staff Hub" description="Current menu, ingredients and internal notes." path="/staff" noindex />
      <main className="container mx-auto px-4 py-8 md:py-10">
        <header className="mb-8 flex flex-col gap-4 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-work text-xs font-semibold uppercase tracking-[0.12em] text-primary">My Secret Garden</p>
            <h1 className="mt-2 font-cormorant text-4xl font-semibold text-foreground md:text-5xl">Staff Hub</h1>
            <p className="mt-2 font-work text-sm text-muted-foreground">Current menu, ingredients and internal notes.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="ghost" onClick={signOut}>
              <LogOut className="h-4 w-4" />
              Sign out
            </Button>
          </div>
        </header>

        {error && <p className="mb-5 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 font-work text-sm text-destructive">{error}</p>}

        <section className="mb-8 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <ChefHat className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-foreground">Menu days</p>
            <strong className="font-cormorant text-4xl text-foreground">{menu.days.length}</strong>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:col-span-2">
            <p className="font-work text-sm text-muted-foreground">Week</p>
            <strong className="mt-1 block font-cormorant text-3xl text-foreground">{cleanDisplayText(menu.period)}</strong>
          </div>
          <div className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card">
            <CakeSlice className="mb-3 h-5 w-5 text-primary" aria-hidden="true" />
            <p className="font-work text-sm text-muted-foreground">Küchenplan current</p>
            <strong className="font-cormorant text-4xl text-foreground">{cakePlan.currentRecords.length}</strong>
          </div>
        </section>

        <Tabs defaultValue="weekly" className="grid gap-6">
          <TabsList className="w-full justify-start overflow-x-auto bg-card/85">
            <TabsTrigger value="weekly">Weekly menu</TabsTrigger>
            <TabsTrigger value="cakes">Küchenplan</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly" className="mt-0">
            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-cormorant text-3xl font-semibold text-foreground">Weekly menu and ingredients</h2>
                  <p className="font-work text-sm text-muted-foreground">Soup, green dish and blue dish with details for staff.</p>
                </div>
                <Button variant="outline" size="sm" onClick={refresh}>Sync</Button>
              </div>
              <div className="grid gap-4 xl:grid-cols-2">
                {isMenuLoading ? <p className="font-work text-sm text-muted-foreground">Loading menu...</p> : menu.days.map((day) => (
                  <article key={day.day.de} className="rounded-md bg-background/70 p-4">
                    <h3 className="font-cormorant text-2xl font-semibold text-foreground">{day.day.en}</h3>
                    {[
                      { label: "Soup", name: day.soup.en || day.soup.de, meta: day.soupMeta },
                      { label: "Green dish", name: day.green.de, meta: day.greenMeta },
                      { label: "Blue dish", name: day.blue.de, meta: day.blueMeta },
                    ].map((dish) => {
                      const details = mergeDishMeta(dish.name, dish.meta);
                      return (
                        <div key={`${day.day.de}-${dish.label}`} className="mt-4 border-t border-border/60 pt-4">
                          <p className="font-work text-xs font-semibold uppercase tracking-[0.08em] text-primary">{dish.label}</p>
                          <p className="mt-1 font-work text-sm font-medium leading-relaxed text-foreground">{cleanDisplayText(dish.name)}</p>
                          {details.descriptionShort ? <p className="mt-2 font-work text-xs leading-relaxed text-muted-foreground">{cleanDisplayText(details.descriptionShort)}</p> : null}
                          {details.ingredientsMain?.length ? <p className="mt-2 font-work text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground/80">Ingredients:</span> {joinDisplayText(details.ingredientsMain, ", ")}</p> : null}
                          {details.allergens?.length ? <p className="mt-1 font-work text-xs text-muted-foreground"><span className="font-semibold text-foreground/80">Allergens:</span> {joinDisplayText(details.allergens, ", ")}</p> : null}
                          {details.gfDisclaimer ? <p className="mt-1 font-work text-xs text-muted-foreground">No gluten containing ingredients by recipe.</p> : null}
                        </div>
                      );
                    })}
                  </article>
                ))}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="cakes" className="mt-0">
            <section className="rounded-lg border border-border/70 bg-card/85 p-5 shadow-card md:p-6">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
                    <h2 className="font-cormorant text-3xl font-semibold text-foreground">Küchenplan weekly prep</h2>
                  </div>
                  <p className="mt-1 font-work text-sm text-muted-foreground">Current Küchenplan sections from Google Sheets, with archived dishes searchable below.</p>
                </div>
                <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
                  <div className="relative min-w-0 sm:w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search current and archive" className="pl-9" />
                  </div>
                  <Button variant="outline" onClick={loadCakePlan} disabled={isCakeLoading}>{isCakeLoading ? "Loading" : "Sync Küchenplan"}</Button>
                </div>
              </div>

              {cakeError ? <p className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 font-work text-sm text-destructive">{cakeError}</p> : null}

              <div className="grid gap-4 xl:grid-cols-2">
                {isCakeLoading && !cakePlan.allRecords.length ? <p className="font-work text-sm text-muted-foreground">Loading Küchenplan...</p> : null}
                {!isCakeLoading && !filteredCakeRecords.length ? <p className="font-work text-sm text-muted-foreground">No Küchenplan items found.</p> : null}
                {filteredCakeRecords.map((record) => (
                  <article key={record.id} className="rounded-md bg-background/70 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        {record.category ? <Badge variant="secondary" className="mb-2">{cleanDisplayText(record.category)}</Badge> : null}
                        <h3 className="font-cormorant text-2xl font-semibold text-foreground">{cleanDisplayText(record.title)}</h3>
                      </div>
                      <span className="font-work text-xs text-muted-foreground">{cleanDisplayText(record.sourceSheet)}</span>
                    </div>
                    {record.description ? <p className="mt-2 font-work text-sm leading-relaxed text-muted-foreground">{cleanDisplayText(record.description)}</p> : null}
                    {record.ingredients.length ? <p className="mt-3 font-work text-sm leading-relaxed text-foreground"><span className="font-semibold">Ingredients:</span> {joinDisplayText(record.ingredients, ", ")}</p> : null}
                    {record.allergens.length ? <p className="mt-2 font-work text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground/80">Allergens:</span> {joinDisplayText(record.allergens, ", ")}</p> : null}
                    {record.notes.length ? <p className="mt-2 font-work text-xs leading-relaxed text-muted-foreground"><span className="font-semibold text-foreground/80">Notes:</span> {joinDisplayText(record.notes, ", ")}</p> : null}
                    <details className="mt-4 border-t border-border/60 pt-3">
                      <summary className="cursor-pointer font-work text-xs font-semibold uppercase tracking-[0.08em] text-primary">All sheet fields</summary>
                      <dl className="mt-3 grid gap-2">
                        {record.fields.map((field) => (
                          <div key={`${record.id}-${field.label}`} className="grid gap-1 rounded-sm bg-card/70 p-2 sm:grid-cols-[11rem_1fr]">
                            <dt className="font-work text-xs font-semibold text-foreground/80">{cleanDisplayText(field.label)}</dt>
                            <dd className="font-work text-xs leading-relaxed text-muted-foreground">{cleanDisplayText(field.value)}</dd>
                          </div>
                        ))}
                      </dl>
                    </details>
                  </article>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default StaffHub;
