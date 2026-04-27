import { useEffect, useMemo, useState } from "react";
import { Archive, CalendarDays, ChefHat, ClipboardList, RefreshCw, Search } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
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

type DishCategory = "soup" | "green" | "blue" | "holiday" | "seasonal";

const emptyKuchenplanData: KuchenplanData = {
  sheetName: "Küchenplan",
  records: [],
  currentRecords: [],
  archiveRecords: [],
  snapshots: [],
};

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayLabels: Record<string, string> = {
  Monday: "Lunedì",
  Tuesday: "Martedì",
  Wednesday: "Mercoledì",
  Thursday: "Giovedì",
  Friday: "Venerdì",
  Saturday: "Sabato",
};

const categoryLabels: Record<DishCategory, string> = {
  soup: "Soup",
  green: "Green",
  blue: "Blue",
  holiday: "Feiertag",
  seasonal: "Seasonal",
};

const badgeLabels: Record<string, string> = {
  spicy: "🌶 Spicy",
  "garlic-high": "🧄🧄🧄 Much Garlic",
  "garlic-med": "🧄🧄 Garlic",
  "garlic-low": "🧄 Light Garlic",
  "onion-high": "🧅🧅🧅 Much Onion",
  "onion-med": "🧅🧅 Onion",
  "onion-low": "🧅 Light Onion",
  nuts: "🥜 Nuts",
  dairy: "🧀 Dairy",
};

const dayKey = (value?: string) => cleanDisplayText(value || "");

const fieldValue = (record: StaffMenuRecord, labels: string[]) => {
  const match = record.fields.find((field) => labels.includes(field.label.toLowerCase().trim()));
  return cleanDisplayText(match?.value || "");
};

const normalizeCategory = (value?: string): DishCategory => {
  const category = cleanDisplayText(value || "").toLowerCase();
  if (category.includes("soup")) return "soup";
  if (category.includes("green")) return "green";
  if (category.includes("blue")) return "blue";
  if (category.includes("holiday") || category.includes("feiertag")) return "holiday";
  return "seasonal";
};

const recordBadges = (record: StaffMenuRecord) => {
  const raw = [fieldValue(record, ["badges"]), ...record.allergens].join(",");
  return raw.split(/[,;|]+/).map((badge) => cleanDisplayText(badge).toLowerCase()).filter(Boolean);
};

const recordCook = (record: StaffMenuRecord) => fieldValue(record, ["cook", "chef"]);

const recordDate = (record: StaffMenuRecord) => fieldValue(record, ["date", "datum"]);

const archiveMatches = (record: StaffMenuRecord, query: string) => [
  record.title,
  fieldValue(record, ["id"]),
  fieldValue(record, ["header_en"]),
  fieldValue(record, ["header_de"]),
  record.description,
  ...record.ingredients,
  ...record.notes,
].filter(Boolean).some((value) => cleanDisplayText(String(value)).toLowerCase().includes(query));

const weekRange = (records: StaffMenuRecord[]) => {
  const dates = records.map(recordDate).filter(Boolean).sort();
  if (dates.length < 2) return "Questa settimana";
  const formatter = new Intl.DateTimeFormat("de-AT", { day: "2-digit", month: "long", year: "numeric" });
  return `${formatter.format(new Date(dates[0]))} – ${formatter.format(new Date(dates[dates.length - 1]))}`;
};

const StaffKitchen = () => {
  const [kuchenplan, setKuchenplan] = useState<KuchenplanData>(emptyKuchenplanData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | DishCategory>("all");

  const loadKuchenplan = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: functionError } = await supabase.functions.invoke("get-staff-menu-details");

    if (functionError || !data?.success) {
      setError("Küchenplan could not be loaded from Google Sheets.");
      setKuchenplan(emptyKuchenplanData);
    } else {
      setKuchenplan({ ...emptyKuchenplanData, ...data.data });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    void loadKuchenplan();
  }, []);

  const currentRecords = kuchenplan.currentRecords.length
    ? kuchenplan.currentRecords
    : kuchenplan.records.filter((record) => record.isCurrent);

  const dayGroups = useMemo(() => {
    const groups = new Map(dayOrder.map((day) => [day, [] as StaffMenuRecord[]]));
    currentRecords.forEach((record) => {
      const day = dayKey(record.menuDay);
      if (!groups.has(day)) groups.set(day, []);
      groups.get(day)?.push(record);
    });
    return Array.from(groups.entries()).filter(([, records]) => records.length);
  }, [currentRecords]);

  const archiveRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const records = kuchenplan.records.length ? kuchenplan.records : [...currentRecords, ...kuchenplan.archiveRecords];
    const uniqueRecords = Array.from(new Map(records.map((record) => [record.id, record])).values());

    return uniqueRecords
      .filter((record) => categoryFilter === "all" || normalizeCategory(record.category) === categoryFilter)
      .filter((record) => query ? archiveMatches(record, query) : true)
      .sort((a, b) => (recordDate(b) || b.snapshotPeriod || "").localeCompare(recordDate(a) || a.snapshotPeriod || ""));
  }, [categoryFilter, currentRecords, kuchenplan.archiveRecords, kuchenplan.records, searchTerm]);

  return (
    <div className="min-h-screen bg-background font-work text-foreground">
      <SEOHead title="Staff Kitchen" description="Internal Küchenplan dashboard." path="/staff/kitchen" noindex />
      <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-5 md:px-8 md:py-7">
        <header className="grid gap-4 rounded-lg border border-border bg-card p-4 shadow-card md:grid-cols-[1fr_auto] md:items-center md:p-5">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-accent">My Secret Garden Kitchen</p>
            <h1 className="mt-1 font-work text-3xl font-bold tracking-normal text-primary md:text-4xl">{weekRange(currentRecords)}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Küchenplan dettagliato da Google Sheet, ordinato per giorno.</p>
          </div>
          <Button onClick={loadKuchenplan} disabled={isLoading} className="justify-self-start md:justify-self-end">
            <RefreshCw className="h-4 w-4" />
            {isLoading ? "Sync..." : "Sync Google Sheet"}
          </Button>
        </header>

        {error ? <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}

        <Tabs defaultValue="plan" className="grid gap-5">
          <TabsList className="mx-auto grid h-auto w-full max-w-md grid-cols-2 rounded-full bg-card p-1 shadow-card">
            <TabsTrigger value="plan" className="rounded-full py-3 text-base">Küchenplan</TabsTrigger>
            <TabsTrigger value="archive" className="rounded-full py-3 text-base">Archiv</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="mt-0">
            <section className="grid gap-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-primary">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  <h2 className="font-work text-xl font-bold tracking-normal">This Week</h2>
                </div>
                <Badge variant="outline">{currentRecords.length} items</Badge>
              </div>

              {isLoading && !currentRecords.length ? <p className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">Loading Küchenplan...</p> : null}
              {!isLoading && !currentRecords.length ? <p className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">No current Küchenplan items found.</p> : null}

              <Accordion type="multiple" defaultValue={[dayGroups[0]?.[0]].filter(Boolean)} className="grid gap-3">
                {dayGroups.map(([day, records]) => {
                  const holiday = records.some((record) => normalizeCategory(record.category) === "holiday" || record.title.toLowerCase().includes("feiertag"));
                  return (
                    <AccordionItem key={day} value={day} className="overflow-hidden rounded-lg border border-border bg-card px-4 shadow-card">
                      <AccordionTrigger className="py-4 text-left hover:no-underline">
                        <span className="grid gap-1">
                          <span className="font-work text-2xl font-bold tracking-normal text-primary">{dayLabels[day] || day}</span>
                          <span className="text-sm font-normal text-muted-foreground">{recordDate(records[0]) || `${records.length} piatti`}</span>
                        </span>
                        {holiday ? <Badge variant="secondary">Feiertag</Badge> : <Badge variant="outline">{records.length} dishes</Badge>}
                      </AccordionTrigger>
                      <AccordionContent className="grid gap-4 pb-5">
                        {holiday ? <div className="rounded-lg bg-muted p-5 text-lg font-semibold text-primary">Feiertag</div> : records.map((record) => <DishCard key={record.id} record={record} />)}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>
          </TabsContent>

          <TabsContent value="archive" className="mt-0">
            <section className="grid gap-4 rounded-lg border border-border bg-card p-4 shadow-card md:p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <Archive className="h-5 w-5" aria-hidden="true" />
                    <h2 className="font-work text-xl font-bold tracking-normal">Dish Archive</h2>
                  </div>
                  <div className="relative mt-3">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search header, German title or ID" className="h-12 pl-9 text-base" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["all", "soup", "green", "blue"] as const).map((filter) => (
                    <Button key={filter} type="button" variant={categoryFilter === filter ? "default" : "outline"} onClick={() => setCategoryFilter(filter)} className="rounded-full">
                      {filter === "all" ? "All" : categoryLabels[filter]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {!archiveRecords.length ? <p className="text-sm text-muted-foreground">No archive items found.</p> : null}
                {archiveRecords.map((record) => <ArchiveCard key={record.id} record={record} />)}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

const DishCard = ({ record }: { record: StaffMenuRecord }) => {
  const category = normalizeCategory(record.category);
  const cook = recordCook(record);
  const badges = recordBadges(record);
  const titleDe = fieldValue(record, ["header_de"]);

  return (
    <article className={`rounded-lg border border-border bg-background p-4 shadow-card active:scale-[0.99] ${category === "soup" ? "border-l-8 border-l-warning" : category === "green" ? "border-l-8 border-l-accent" : "border-l-8 border-l-primary"}`}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{categoryLabels[category]}</p>
          <h3 className="mt-1 font-work text-2xl font-bold tracking-normal text-foreground">{cleanDisplayText(record.title)}</h3>
          {record.description ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cleanDisplayText(record.description)}</p> : titleDe ? <p className="mt-1 text-sm text-muted-foreground">{titleDe}</p> : null}
        </div>
        <div className="flex flex-wrap items-start gap-2 md:max-w-72 md:justify-end">
          {badges.map((badge) => <Badge key={badge} variant="secondary" className="rounded-full">{badgeLabels[badge] || badge}</Badge>)}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <DetailList title="Ingredients" icon="•" items={record.ingredients} />
        <DetailList title="Prep" icon="→" items={record.notes} />
      </div>

      {cook ? <div className="mt-4 flex flex-wrap gap-2">{cook.split(/[,;/]+/).map((chef) => <Badge key={chef} variant="outline" className="rounded-full"><ChefHat className="mr-1 h-3 w-3" />Chef {cleanDisplayText(chef)}</Badge>)}</div> : null}
    </article>
  );
};

const DetailList = ({ title, icon, items }: { title: string; icon: string; items: string[] }) => (
  <div>
    <div className="mb-2 flex items-center gap-2 text-primary">
      <ClipboardList className="h-4 w-4" aria-hidden="true" />
      <h4 className="font-work text-sm font-bold tracking-normal">{title}</h4>
    </div>
    {items.length ? <ul className="grid gap-1 text-sm leading-relaxed text-foreground">{items.map((item) => <li key={`${title}-${item}`}>{icon} {cleanDisplayText(item)}</li>)}</ul> : <p className="text-sm text-muted-foreground">—</p>}
  </div>
);

const ArchiveCard = ({ record }: { record: StaffMenuRecord }) => {
  const category = normalizeCategory(record.category);
  const badges = recordBadges(record);
  return (
    <article className="rounded-lg border border-border bg-background p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Badge variant="outline" className="mb-2 rounded-full">{categoryLabels[category]}</Badge>
          <h3 className="font-work text-xl font-bold tracking-normal text-foreground">{cleanDisplayText(record.title)}</h3>
          {record.description ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cleanDisplayText(record.description)}</p> : null}
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{recordDate(record) || cleanDisplayText(record.snapshotPeriod || "")}</span>
      </div>
      {badges.length ? <div className="mt-3 flex flex-wrap gap-2">{badges.map((badge) => <Badge key={badge} variant="secondary" className="rounded-full">{badgeLabels[badge] || badge}</Badge>)}</div> : null}
      {record.ingredients.length ? <p className="mt-3 text-sm text-muted-foreground">{joinDisplayText(record.ingredients.slice(0, 5), ", ")}</p> : null}
    </article>
  );
};

export default StaffKitchen;