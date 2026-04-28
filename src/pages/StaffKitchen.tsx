import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Navigate } from "react-router-dom";
import { Archive, CalendarDays, ChefHat, ChevronLeft, ChevronRight, ClipboardList, LogOut, Phone, RefreshCw, Search, ShieldCheck, StickyNote, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import type { Session } from "@supabase/supabase-js";
import { cleanDisplayText, joinDisplayText } from "@/lib/displayText";
import { z } from "zod";

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
type DashboardLanguage = "en" | "de";
type ReservationStatus = "new" | "confirmed" | "cancelled" | "arrived" | "no_show";
type ReservationStatusFilter = "all" | ReservationStatus;
type CakeOrderStatus = "pending" | "confirmed" | "cancelled" | "fulfilled";
type CakeOrderStatusFilter = "all" | CakeOrderStatus;
type StaffSignalKind = "spicy" | "garlic" | "onion" | "allergen";
type StaffSignalIntensity = "low" | "medium" | "high";
type StaffSignal = { key: string; labelKey: string; kind: StaffSignalKind; intensity?: StaffSignalIntensity };

type StaffReservation = {
  id: string;
  full_name: string;
  contact: string;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  notes: string | null;
  staff_notes?: string | null;
  status: ReservationStatus;
  language: string;
  created_at: string;
  updated_at: string;
};

type StaffCakeOrder = {
  id: string;
  name: string;
  phone: string;
  cake_choice: string;
  quantity: number;
  pickup_date: string;
  notes: string | null;
  payment_acknowledged: boolean;
  status: CakeOrderStatus;
  staff_notes?: string | null;
  language: string;
  created_at: string;
  updated_at: string;
};

const emptyKuchenplanData: KuchenplanData = {
  sheetName: "Küchenplan",
  records: [],
  currentRecords: [],
  archiveRecords: [],
  snapshots: [],
};

const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dayLabels: Record<DashboardLanguage, Record<string, string>> = {
  en: {
    Monday: "Monday",
    Tuesday: "Tuesday",
    Wednesday: "Wednesday",
    Thursday: "Thursday",
    Friday: "Friday",
    Saturday: "Saturday",
  },
  de: {
    Monday: "Montag",
    Tuesday: "Dienstag",
    Wednesday: "Mittwoch",
    Thursday: "Donnerstag",
    Friday: "Freitag",
    Saturday: "Samstag",
  },
};

const categoryLabels: Record<DashboardLanguage, Record<DishCategory, string>> = {
  en: {
    soup: "Soup",
    green: "Green",
    blue: "Blue",
    holiday: "Holiday",
    seasonal: "Seasonal",
  },
  de: {
    soup: "Suppe",
    green: "Grün",
    blue: "Blau",
    holiday: "Feiertag",
    seasonal: "Saisonal",
  },
};

const badgeLabels: Record<DashboardLanguage, Record<string, string>> = {
  en: {
    "spicy-high": "Very spicy",
    "spicy-med": "Spicy",
    "spicy-low": "Mild heat",
    "garlic-high": "High garlic",
    "garlic-med": "Garlic",
    "garlic-low": "Light garlic",
    "onion-high": "High onion",
    "onion-med": "Onion",
    "onion-low": "Light onion",
    nuts: "Nuts",
    dairy: "Dairy",
  },
  de: {
    "spicy-high": "Sehr scharf",
    "spicy-med": "Scharf",
    "spicy-low": "Leichte Schärfe",
    "garlic-high": "Viel Knoblauch",
    "garlic-med": "Knoblauch",
    "garlic-low": "Wenig Knoblauch",
    "onion-high": "Viel Zwiebel",
    "onion-med": "Zwiebel",
    "onion-low": "Wenig Zwiebel",
    nuts: "Nüsse",
    dairy: "Milchprodukte",
  },
};

const text = {
  en: {
    subtitle: "Detailed Küchenplan from Google Sheets, ordered by day.",
    syncLoading: "Sync...",
    sync: "Sync Google Sheet",
    planTab: "Kitchen plan",
    archiveTab: "Archive",
    thisWeek: "This Week",
    items: "items",
    dishes: "dishes",
    loading: "Loading kitchen plan...",
    emptyCurrent: "No current kitchen plan items found.",
    holiday: "Holiday",
    archiveTitle: "Dish Archive",
    searchPlaceholder: "Search header, German title or ID",
    all: "All",
    emptyArchive: "No archive items found.",
    ingredients: "Ingredients",
    prep: "Prep",
    chef: "Chef",
    fallbackWeek: "This Week",
    loadError: "Kitchen plan could not be loaded from Google Sheets.",
    requestsTab: "Requests",
    requestsTitle: "Table requests",
    cakesTitle: "Cake orders",
    tableRequests: "Tables",
    cakeRequests: "Cakes",
    requestsLoading: "Loading requests...",
    requestsError: "Requests could not be loaded.",
    emptyRequests: "No requests for this day.",
    emptyCakeOrders: "No cake orders for this day.",
    today: "Today",
    prevDay: "Prev day",
    nextDay: "Next day",
    totalRequests: "requests",
    dailyCap: "requests today",
    staffNotes: "Staff notes",
    guestNotes: "Guest notes",
    saveNotes: "Save notes",
    confirm: "Confirm",
    arrived: "Arrived",
    cancel: "Cancel",
    noShow: "No-show",
    call: "Call",
    guests: "guests",
    filterAll: "All",
    filterNew: "Pending",
    filterConfirmed: "Confirmed",
    filterArrived: "Arrived",
    filterCancelled: "Cancelled",
    filterNoShow: "No-show",
    statusNew: "Pending",
    statusConfirmed: "Confirmed",
    statusArrived: "Arrived",
    statusCancelled: "Cancelled",
    statusNoShow: "No-show",
    totalCakeOrders: "cake orders",
    cakeOrderLoading: "Loading cake orders...",
    cakeOrderError: "Cake orders could not be loaded.",
    cakesToday: "cakes today",
    pickup: "Pickup",
    fulfill: "Fulfilled",
    statusPending: "Pending",
    statusFulfilled: "Fulfilled",
  },
  de: {
    subtitle: "Detaillierter Küchenplan aus Google Sheets, nach Tagen sortiert.",
    syncLoading: "Sync...",
    sync: "Google Sheet synchronisieren",
    planTab: "Küchenplan",
    archiveTab: "Archiv",
    thisWeek: "Diese Woche",
    items: "Einträge",
    dishes: "Gerichte",
    loading: "Küchenplan wird geladen...",
    emptyCurrent: "Keine aktuellen Küchenplan-Einträge gefunden.",
    holiday: "Feiertag",
    archiveTitle: "Gerichte-Archiv",
    searchPlaceholder: "Header, deutschen Titel oder ID suchen",
    all: "Alle",
    emptyArchive: "Keine Archiv-Einträge gefunden.",
    ingredients: "Zutaten",
    prep: "Vorbereitung",
    chef: "Koch",
    fallbackWeek: "Diese Woche",
    loadError: "Küchenplan konnte nicht aus Google Sheets geladen werden.",
    requestsTab: "Anfragen",
    requestsTitle: "Tischanfragen",
    cakesTitle: "Tortenbestellungen",
    tableRequests: "Tische",
    cakeRequests: "Torten",
    requestsLoading: "Anfragen werden geladen...",
    requestsError: "Anfragen konnten nicht geladen werden.",
    emptyRequests: "Heute keine Anfragen.",
    emptyCakeOrders: "Heute keine Tortenbestellungen.",
    today: "Heute",
    prevDay: "Vortag",
    nextDay: "Nächster Tag",
    totalRequests: "Anfragen",
    dailyCap: "Anfragen heute",
    staffNotes: "Team-Notizen",
    guestNotes: "Gastnotizen",
    saveNotes: "Notizen speichern",
    confirm: "Bestätigen",
    arrived: "Angekommen",
    cancel: "Stornieren",
    noShow: "No-show",
    call: "Anrufen",
    guests: "Gäste",
    filterAll: "Alle",
    filterNew: "Ausstehend",
    filterConfirmed: "Bestätigt",
    filterArrived: "Angekommen",
    filterCancelled: "Storniert",
    filterNoShow: "No-show",
    statusNew: "Ausstehend",
    statusConfirmed: "Bestätigt",
    statusArrived: "Angekommen",
    statusCancelled: "Storniert",
    statusNoShow: "No-show",
    totalCakeOrders: "Tortenbestellungen",
    cakeOrderLoading: "Tortenbestellungen werden geladen...",
    cakeOrderError: "Tortenbestellungen konnten nicht geladen werden.",
    cakesToday: "Torten heute",
    pickup: "Abholung",
    fulfill: "Erledigt",
    statusPending: "Ausstehend",
    statusFulfilled: "Erledigt",
  },
} satisfies Record<DashboardLanguage, Record<string, string>>;

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

const includesAny = (value: string, terms: string[]) => terms.some((term) => value.includes(term));

const signalIntensity = (value: string, terms: { high: string[]; low: string[] }): StaffSignalIntensity => {
  if (includesAny(value, terms.high)) return "high";
  if (includesAny(value, terms.low)) return "low";
  return "medium";
};

const recordSignals = (record: StaffMenuRecord): StaffSignal[] => {
  const rawBadges = [fieldValue(record, ["badges"]), ...record.allergens]
    .join(",")
    .split(/[,;|]+/)
    .map((badge) => cleanDisplayText(badge).toLowerCase())
    .filter(Boolean);
  const searchableText = cleanDisplayText([
    record.title,
    record.description,
    ...record.ingredients,
    ...record.notes,
    ...record.fields.map((field) => field.value),
    ...rawBadges,
  ].filter(Boolean).join(" ")).toLowerCase();
  const signals = new Map<string, StaffSignal>();
  const add = (signal: StaffSignal) => signals.set(signal.key, signal);

  if (includesAny(searchableText, ["spicy", "scharf", "piccante", "chili", "chilli", "hot", "jalapeno", "jalapeño", "peperoncino", "cayenne"])) {
    const intensity = signalIntensity(searchableText, {
      high: ["very spicy", "sehr scharf", "extra scharf", "hot", "viel chili", "chili++"],
      low: ["mild spicy", "leicht scharf", "mild", "wenig chili"],
    });
    add({ key: `spicy-${intensity}`, labelKey: intensity === "high" ? "spicy-high" : intensity === "low" ? "spicy-low" : "spicy-med", kind: "spicy", intensity });
  }
  if (includesAny(searchableText, ["garlic", "knoblauch", "aglio"])) {
    const intensity = signalIntensity(searchableText, {
      high: ["much garlic", "extra garlic", "viel knoblauch", "knoblauch++"],
      low: ["light garlic", "little garlic", "wenig knoblauch", "ohne knoblauch"],
    });
    add({ key: `garlic-${intensity}`, labelKey: intensity === "high" ? "garlic-high" : intensity === "low" ? "garlic-low" : "garlic-med", kind: "garlic", intensity });
  }
  if (includesAny(searchableText, ["onion", "zwiebel", "cipolla", "shallot", "schalotte"])) {
    const intensity = signalIntensity(searchableText, {
      high: ["much onion", "extra onion", "viel zwiebel", "zwiebel++"],
      low: ["light onion", "little onion", "wenig zwiebel", "ohne zwiebel"],
    });
    add({ key: `onion-${intensity}`, labelKey: intensity === "high" ? "onion-high" : intensity === "low" ? "onion-low" : "onion-med", kind: "onion", intensity });
  }
  if (rawBadges.some((badge) => includesAny(badge, ["nuts", "nüsse", "nuss", "peanut", "erdnuss", "h"]))) add({ key: "nuts", labelKey: "nuts", kind: "allergen" });
  if (rawBadges.some((badge) => includesAny(badge, ["dairy", "milk", "milch", "laktose", "lactose", "g"]))) add({ key: "dairy", labelKey: "dairy", kind: "allergen" });

  return [...signals.values()];
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

const weekRange = (records: StaffMenuRecord[], language: DashboardLanguage) => {
  const dates = records.map(recordDate).filter(Boolean).sort();
  if (dates.length < 2) return text[language].fallbackWeek;
  const formatter = new Intl.DateTimeFormat(language === "de" ? "de-AT" : "en-GB", { day: "2-digit", month: "long", year: "numeric" });
  return `${formatter.format(new Date(dates[0]))} – ${formatter.format(new Date(dates[dates.length - 1]))}`;
};

const reservationStatuses: ReservationStatusFilter[] = ["all", "new", "confirmed", "arrived", "cancelled", "no_show"];
const reservationUpdateSchema = z.object({
  status: z.enum(["new", "confirmed", "cancelled", "arrived", "no_show"]).optional(),
  staff_notes: z.string().trim().max(500).nullable().optional(),
});
const cakeOrderStatuses: CakeOrderStatusFilter[] = ["all", "pending", "confirmed", "fulfilled", "cancelled"];
const cakeOrderUpdateSchema = z.object({
  status: z.enum(["pending", "confirmed", "cancelled", "fulfilled"]).optional(),
  staff_notes: z.string().trim().max(500).nullable().optional(),
});
type StaffUpdateTable = { update: (values: Record<string, unknown>) => { eq: (column: string, value: string) => PromiseLike<{ error: unknown }> } };
type StaffSelectTable = { select: (columns: string) => { eq: (column: string, value: string) => { order: (column: string, options: { ascending: boolean }) => PromiseLike<{ data: unknown[] | null; error: unknown }> } } };

const todayIso = () => new Date().toISOString().split("T")[0];

const addDaysToIso = (value: string, offset: number) => {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + offset);
  return date.toISOString().split("T")[0];
};

const formatReservationDate = (value: string, language: DashboardLanguage) => new Intl.DateTimeFormat(language === "de" ? "de-AT" : "en-GB", { weekday: "short", day: "2-digit", month: "long" }).format(new Date(`${value}T12:00:00`));

const isPastReservationDate = (value: string) => value < todayIso();

const reservationStatusLabel = (status: ReservationStatus, labels: Record<string, string>) => ({
  new: labels.statusNew,
  confirmed: labels.statusConfirmed,
  arrived: labels.statusArrived,
  cancelled: labels.statusCancelled,
  no_show: labels.statusNoShow,
}[status]);

const reservationFilterLabel = (status: ReservationStatusFilter, labels: Record<string, string>) => ({
  all: labels.filterAll,
  new: labels.filterNew,
  confirmed: labels.filterConfirmed,
  arrived: labels.filterArrived,
  cancelled: labels.filterCancelled,
  no_show: labels.filterNoShow,
}[status]);

const cakeOrderStatusLabel = (status: CakeOrderStatus, labels: Record<string, string>) => ({
  pending: labels.statusPending,
  confirmed: labels.statusConfirmed,
  fulfilled: labels.statusFulfilled,
  cancelled: labels.statusCancelled,
}[status]);

const cakeOrderFilterLabel = (status: CakeOrderStatusFilter, labels: Record<string, string>) => status === "all" ? labels.filterAll : cakeOrderStatusLabel(status, labels);

const countPillClasses = {
  neutral: "border-border bg-background text-foreground",
  table: "border-primary/25 bg-primary/10 text-primary",
  cake: "border-accent/25 bg-accent/10 text-accent",
} as const;

const categoryChipClasses: Record<DishCategory, string> = {
  soup: "border-warning/30 bg-warning/15 text-foreground",
  green: "border-accent/30 bg-accent/12 text-accent",
  blue: "border-primary/30 bg-primary/10 text-primary",
  holiday: "border-destructive/30 bg-destructive/10 text-destructive",
  seasonal: "border-border bg-muted text-muted-foreground",
};

const CountPill = ({ children, tone = "neutral" }: { children: ReactNode; tone?: keyof typeof countPillClasses }) => (
  <span className={`inline-flex min-h-8 items-center rounded-md border px-3 text-sm font-extrabold tabular-nums ${countPillClasses[tone]}`}>{children}</span>
);

const CategoryChip = ({ category, children }: { category: DishCategory; children: ReactNode }) => (
  <span className={`inline-flex min-h-7 items-center rounded-sm border px-2.5 text-xs font-extrabold uppercase tracking-[0.08em] ${categoryChipClasses[category]}`}>{children}</span>
);

const InfoTag = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex min-h-7 items-center rounded-sm border border-border bg-muted px-2.5 text-xs font-bold text-muted-foreground">{children}</span>
);

const signalBadgeClasses: Record<StaffSignalKind, string> = {
  spicy: "border-destructive/35 bg-destructive/10 text-destructive",
  garlic: "border-warning/35 bg-warning/15 text-warning-foreground",
  onion: "border-primary/25 bg-primary/10 text-primary",
  allergen: "border-border bg-muted text-foreground",
};

const signalIcons: Record<StaffSignalKind, string> = {
  spicy: "🌶",
  garlic: "🧄",
  onion: "🧅",
  allergen: "!",
};

const SignalBadge = ({ signal, language }: { signal: StaffSignal; language: DashboardLanguage }) => (
  <span className={`inline-flex min-h-8 items-center gap-1.5 rounded-md border px-2.5 text-xs font-extrabold ${signalBadgeClasses[signal.kind]}`}>
    <span aria-hidden="true">{signalIcons[signal.kind]}</span>
    {badgeLabels[language][signal.labelKey] || signal.labelKey}
  </span>
);

const StaffKitchen = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [isCheckingAccess, setIsCheckingAccess] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [kuchenplan, setKuchenplan] = useState<KuchenplanData>(emptyKuchenplanData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<"all" | DishCategory>("all");
  const [language, setLanguage] = useState<DashboardLanguage>("en");
  const [selectedReservationDate, setSelectedReservationDate] = useState(todayIso);
  const [reservationStatusFilter, setReservationStatusFilter] = useState<ReservationStatusFilter>("all");
  const [reservations, setReservations] = useState<StaffReservation[]>([]);
  const [isReservationsLoading, setIsReservationsLoading] = useState(false);
  const [reservationError, setReservationError] = useState<string | null>(null);
  const [updatingReservationIds, setUpdatingReservationIds] = useState<string[]>([]);
  const [cakeOrders, setCakeOrders] = useState<StaffCakeOrder[]>([]);
  const [cakeOrderStatusFilter, setCakeOrderStatusFilter] = useState<CakeOrderStatusFilter>("all");
  const [isCakeOrdersLoading, setIsCakeOrdersLoading] = useState(false);
  const [cakeOrderError, setCakeOrderError] = useState<string | null>(null);
  const [updatingCakeOrderIds, setUpdatingCakeOrderIds] = useState<string[]>([]);
  const labels = text[language];

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const loadKuchenplan = async () => {
    setIsLoading(true);
    setError(null);
    const { data, error: functionError } = await supabase.functions.invoke("get-staff-menu-details");

    if (functionError || !data?.success) {
      setError(text[language].loadError);
      setKuchenplan(emptyKuchenplanData);
    } else {
      setKuchenplan({ ...emptyKuchenplanData, ...data.data });
    }

    setIsLoading(false);
  };

  const loadReservations = async (date = selectedReservationDate) => {
    setIsReservationsLoading(true);
    setReservationError(null);

    const { data, error: requestError } = await supabase
      .from("reservation_requests")
      .select("id, full_name, contact, reservation_date, reservation_time, party_size, notes, staff_notes, status, language, created_at, updated_at")
      .eq("reservation_date", date)
      .order("reservation_time", { ascending: true });

    if (requestError) {
      setReservationError(text[language].requestsError);
      setReservations([]);
    } else {
      setReservations(((data ?? []) as unknown as StaffReservation[]).map((reservation) => ({ ...reservation, status: reservation.status || "new" })));
    }

    setIsReservationsLoading(false);
  };

  const updateReservation = async (reservation: StaffReservation, update: Partial<Pick<StaffReservation, "status" | "staff_notes">>) => {
    const parsed = reservationUpdateSchema.safeParse(update);
    if (!parsed.success) {
      setReservationError(language === "de" ? "Ungültige Eingabe." : "Invalid input.");
      return;
    }

    const previous = reservations;
    setUpdatingReservationIds((ids) => [...ids, reservation.id]);
    setReservations((items) => items.map((item) => item.id === reservation.id ? { ...item, ...parsed.data } : item));

    const { error: updateError } = await (supabase.from("reservation_requests") as unknown as StaffUpdateTable)
      .update({ ...parsed.data, updated_at: new Date().toISOString() })
      .eq("id", reservation.id);

    setUpdatingReservationIds((ids) => ids.filter((id) => id !== reservation.id));

    if (updateError) {
      setReservations(previous);
      setReservationError(language === "de" ? "Fehler, bitte nochmal versuchen." : "Error, please try again.");
    }
  };

  const loadCakeOrders = async (date = selectedReservationDate) => {
    setIsCakeOrdersLoading(true);
    setCakeOrderError(null);

    const { data, error: requestError } = await (supabase.from("cake_orders") as unknown as StaffSelectTable)
      .select("id, name, phone, cake_choice, quantity, pickup_date, notes, payment_acknowledged, status, staff_notes, language, created_at, updated_at")
      .eq("pickup_date", date)
      .order("created_at", { ascending: true });

    if (requestError) {
      setCakeOrderError(text[language].cakeOrderError);
      setCakeOrders([]);
    } else {
      setCakeOrders(((data ?? []) as StaffCakeOrder[]).map((order) => ({ ...order, status: order.status || "pending" })));
    }

    setIsCakeOrdersLoading(false);
  };

  const updateCakeOrder = async (order: StaffCakeOrder, update: Partial<Pick<StaffCakeOrder, "status" | "staff_notes">>) => {
    const parsed = cakeOrderUpdateSchema.safeParse(update);
    if (!parsed.success) {
      setCakeOrderError(language === "de" ? "Ungültige Eingabe." : "Invalid input.");
      return;
    }

    const previous = cakeOrders;
    setUpdatingCakeOrderIds((ids) => [...ids, order.id]);
    setCakeOrders((items) => items.map((item) => item.id === order.id ? { ...item, ...parsed.data } : item));

    const { error: updateError } = await (supabase.from("cake_orders") as unknown as StaffUpdateTable)
      .update({ ...parsed.data, updated_at: new Date().toISOString() })
      .eq("id", order.id);

    setUpdatingCakeOrderIds((ids) => ids.filter((id) => id !== order.id));

    if (updateError) {
      setCakeOrders(previous);
      setCakeOrderError(language === "de" ? "Fehler, bitte nochmal versuchen." : "Error, please try again.");
    }
  };

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session);

      if (!data.session?.user) {
        setIsCheckingAccess(false);
        setIsLoading(false);
        return;
      }

      const { data: accessData, error: accessError } = await supabase.functions.invoke("check-staff-access");
      const hasStaffAccess = !accessError && Boolean(accessData?.isStaff);
      setIsStaff(hasStaffAccess);
      setIsCheckingAccess(false);

      if (hasStaffAccess) void loadKuchenplan();
      else setIsLoading(false);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!session || !isStaff) return;
    void loadReservations(selectedReservationDate);
    void loadCakeOrders(selectedReservationDate);
  }, [selectedReservationDate, session, isStaff]);

  useEffect(() => {
    if (!session || !isStaff) return;

    const channel = supabase
      .channel("reservation-requests-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "reservation_requests" }, () => {
        void loadReservations(selectedReservationDate);
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "cake_orders" }, () => {
        void loadCakeOrders(selectedReservationDate);
      })
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [selectedReservationDate, session, isStaff]);

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

  const filteredReservations = useMemo(() => reservationStatusFilter === "all"
    ? reservations
    : reservations.filter((reservation) => reservation.status === reservationStatusFilter), [reservationStatusFilter, reservations]);
  const filteredCakeOrders = useMemo(() => cakeOrderStatusFilter === "all"
    ? cakeOrders
    : cakeOrders.filter((order) => order.status === cakeOrderStatusFilter), [cakeOrderStatusFilter, cakeOrders]);
  const dailyCap = 20;
  const dailyWorkload = reservations.length + cakeOrders.reduce((sum, order) => sum + order.quantity, 0);
  const dailyProgress = Math.min(100, Math.round((dailyWorkload / dailyCap) * 100));
  const dailyProgressTone = dailyWorkload >= 19 ? "bg-destructive" : dailyWorkload >= 15 ? "bg-warning" : "bg-accent";
  const selectedDateIsPast = isPastReservationDate(selectedReservationDate);

  if (!isCheckingAccess && !session) return <Navigate to="/staff/login" replace />;
  if (!isCheckingAccess && session && !isStaff) {
    return (
      <div className="staff-app min-h-screen bg-background px-4 py-12 font-work text-foreground">
        <SEOHead title="Staff Kitchen" description="Restricted staff area." path="/staff" noindex />
        <main className="mx-auto max-w-xl rounded-md border border-border bg-card p-6 text-center shadow-soft">
          <ShieldCheck className="mx-auto mb-4 h-8 w-8 text-primary" aria-hidden="true" />
          <h1 className="text-3xl font-bold tracking-normal text-foreground">Unauthorized access</h1>
          <p className="mt-3 text-sm text-muted-foreground">This account is not enabled for staff access yet.</p>
          <Button onClick={signOut} className="mt-6">
            <LogOut className="h-4 w-4" />
            Sign out
          </Button>
        </main>
      </div>
    );
  }

  return (
    <div className="staff-app min-h-screen bg-background font-work text-foreground">
      <SEOHead title="Staff Kitchen" description="Internal Küchenplan dashboard." path="/staff" noindex />
      <main className="mx-auto grid w-full max-w-[1600px] gap-5 px-3 py-3 md:px-6 md:py-5">
        <header className="sticky top-0 z-20 -mx-3 grid gap-3 border-b border-border bg-background/95 px-3 py-3 backdrop-blur md:-mx-6 md:grid-cols-[1fr_auto] md:items-center md:px-6">
          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">Staff operations</p>
            <h1 className="mt-1 truncate font-work text-2xl font-extrabold tracking-normal text-foreground md:text-3xl">{weekRange(currentRecords, language)}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{labels.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2 justify-self-start md:justify-self-end">
            <div className="flex rounded-md border border-border bg-card p-1" aria-label="Dashboard language">
              {(["en", "de"] as const).map((option) => (
                <Button key={option} type="button" size="sm" variant={language === option ? "default" : "ghost"} className="h-8 rounded px-3" onClick={() => setLanguage(option)}>
                  {option.toUpperCase()}
                </Button>
              ))}
            </div>
            <Button onClick={loadKuchenplan} disabled={isLoading} className="rounded-md">
              <RefreshCw className="h-4 w-4" />
              {isLoading ? labels.syncLoading : labels.sync}
            </Button>
          </div>
        </header>

        {error ? <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}

        <Tabs defaultValue="plan" className="grid gap-4">
          <TabsList className="grid h-auto w-full grid-cols-3 rounded-md border border-border bg-card p-1 shadow-soft lg:w-[36rem]">
            <TabsTrigger value="plan" className="rounded py-2.5 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{labels.planTab}</TabsTrigger>
            <TabsTrigger value="archive" className="rounded py-2.5 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{labels.archiveTab}</TabsTrigger>
            <TabsTrigger value="requests" className="rounded py-2.5 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">{labels.requestsTab}</TabsTrigger>
          </TabsList>

          <TabsContent value="plan" className="mt-0">
            <section className="grid gap-4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-primary">
                  <CalendarDays className="h-5 w-5" aria-hidden="true" />
                  <h2 className="font-work text-xl font-bold tracking-normal">{labels.thisWeek}</h2>
                </div>
                <CountPill>{currentRecords.length} {labels.items}</CountPill>
              </div>

              {isLoading && !currentRecords.length ? <p className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">{labels.loading}</p> : null}
              {!isLoading && !currentRecords.length ? <p className="rounded-lg border border-border bg-card p-5 text-sm text-muted-foreground">{labels.emptyCurrent}</p> : null}

              <Accordion type="multiple" defaultValue={[dayGroups[0]?.[0]].filter(Boolean)} className="grid gap-3 xl:grid-cols-2">
                {dayGroups.map(([day, records]) => {
                  const holiday = records.some((record) => normalizeCategory(record.category) === "holiday" || record.title.toLowerCase().includes("feiertag"));
                  return (
                    <AccordionItem key={day} value={day} className="overflow-hidden rounded-md border border-border bg-card px-3 shadow-soft md:px-4">
                      <AccordionTrigger className="py-3 text-left hover:no-underline">
                        <span className="grid gap-1">
                          <span className="font-work text-xl font-extrabold tracking-normal text-foreground">{dayLabels[language][day] || day}</span>
                          <span className="text-sm font-normal text-muted-foreground">{recordDate(records[0]) || `${records.length} ${labels.dishes}`}</span>
                        </span>
                        {holiday ? <CategoryChip category="holiday">{labels.holiday}</CategoryChip> : <CountPill>{records.length} {labels.dishes}</CountPill>}
                      </AccordionTrigger>
                      <AccordionContent className="grid gap-4 pb-5">
                        {holiday ? <div className="rounded-lg bg-muted p-5 text-lg font-semibold text-primary">{labels.holiday}</div> : records.map((record) => <DishCard key={record.id} record={record} language={language} />)}
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </section>
          </TabsContent>

          <TabsContent value="archive" className="mt-0">
            <section className="grid gap-4 rounded-md border border-border bg-card p-3 shadow-soft md:p-5">
              <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <Archive className="h-5 w-5" aria-hidden="true" />
                    <h2 className="font-work text-xl font-bold tracking-normal">{labels.archiveTitle}</h2>
                  </div>
                  <div className="relative mt-3">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                    <Input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={labels.searchPlaceholder} className="h-12 pl-9 text-base" />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["all", "soup", "green", "blue"] as const).map((filter) => (
                    <Button key={filter} type="button" variant={categoryFilter === filter ? "default" : "outline"} onClick={() => setCategoryFilter(filter)} className="rounded-md">
                      {filter === "all" ? labels.all : categoryLabels[language][filter]}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {!archiveRecords.length ? <p className="text-sm text-muted-foreground">{labels.emptyArchive}</p> : null}
                {archiveRecords.map((record) => <ArchiveCard key={record.id} record={record} language={language} />)}
              </div>
            </section>
          </TabsContent>

          <TabsContent value="requests" className="mt-0">
            <section className="grid gap-4 rounded-md border border-border bg-card p-3 shadow-soft md:p-5">
              <div className="grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <Users className="h-5 w-5" aria-hidden="true" />
                    <h2 className="font-work text-xl font-bold tracking-normal">{labels.requestsTab}</h2>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{formatReservationDate(selectedReservationDate, language)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <CountPill tone="table">{reservations.length} {labels.totalRequests}</CountPill>
                  <CountPill tone="cake">{cakeOrders.reduce((sum, order) => sum + order.quantity, 0)} {labels.cakesToday}</CountPill>
                </div>
              </div>

              <div className="grid gap-3 rounded-md border border-border bg-background p-3">
                <div className="grid grid-cols-3 gap-2">
                  <Button type="button" variant="outline" onClick={() => setSelectedReservationDate(addDaysToIso(selectedReservationDate, -1))} className="h-11 rounded-md">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="hidden sm:inline">{labels.prevDay}</span>
                  </Button>
                  <Button type="button" variant="default" onClick={() => setSelectedReservationDate(todayIso())} className="h-11 rounded-md">{labels.today}</Button>
                  <Button type="button" variant="outline" onClick={() => setSelectedReservationDate(addDaysToIso(selectedReservationDate, 1))} className="h-11 rounded-md">
                    <span className="hidden sm:inline">{labels.nextDay}</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full rounded-full transition-all ${dailyProgressTone}`} style={{ width: `${dailyProgress}%` }} />
                </div>
                <p className="text-xs text-muted-foreground">{dailyWorkload} / {dailyCap} {labels.dailyCap}</p>
              </div>

              <div className="grid gap-4 xl:grid-cols-2">
                <div className="grid content-start gap-3 rounded-md border border-border bg-background p-3 md:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-work text-lg font-bold tracking-normal text-primary">{labels.tableRequests}</h3>
                    <CountPill tone="table">{filteredReservations.length}</CountPill>
                  </div>

                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {reservationStatuses.map((status) => (
                      <Button key={status} type="button" size="sm" variant={reservationStatusFilter === status ? "default" : "outline"} onClick={() => setReservationStatusFilter(status)} className="shrink-0 rounded-md">
                        {reservationFilterLabel(status, labels)}
                      </Button>
                    ))}
                  </div>

                  {reservationError ? <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{reservationError}</p> : null}
                  {isReservationsLoading ? <p className="rounded-lg border border-border bg-background p-5 text-sm text-muted-foreground">{labels.requestsLoading}</p> : null}
                  {!isReservationsLoading && !filteredReservations.length ? <p className="rounded-lg border border-border bg-background p-8 text-center text-sm text-muted-foreground">{labels.emptyRequests}</p> : null}

                  <div className="grid gap-4">
                    {filteredReservations.map((reservation) => (
                      <ReservationCard key={reservation.id} reservation={reservation} language={language} labels={labels} readOnly={selectedDateIsPast} isUpdating={updatingReservationIds.includes(reservation.id)} onUpdate={updateReservation} />
                    ))}
                  </div>
                </div>

                <div className="grid content-start gap-3 rounded-md border border-border bg-background p-3 md:p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-work text-lg font-bold tracking-normal text-primary">{labels.cakesTitle}</h3>
                    <CountPill tone="cake">{filteredCakeOrders.length}</CountPill>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {cakeOrderStatuses.map((status) => (
                      <Button key={status} type="button" size="sm" variant={cakeOrderStatusFilter === status ? "default" : "outline"} onClick={() => setCakeOrderStatusFilter(status)} className="shrink-0 rounded-md">
                        {cakeOrderFilterLabel(status, labels)}
                      </Button>
                    ))}
                  </div>
                  {cakeOrderError ? <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{cakeOrderError}</p> : null}
                  {isCakeOrdersLoading ? <p className="rounded-lg border border-border bg-background p-5 text-sm text-muted-foreground">{labels.cakeOrderLoading}</p> : null}
                  {!isCakeOrdersLoading && !filteredCakeOrders.length ? <p className="rounded-lg border border-border bg-background p-8 text-center text-sm text-muted-foreground">{labels.emptyCakeOrders}</p> : null}
                  <div className="grid gap-4">
                    {filteredCakeOrders.map((order) => (
                      <CakeOrderCard key={order.id} order={order} language={language} labels={labels} readOnly={selectedDateIsPast} isUpdating={updatingCakeOrderIds.includes(order.id)} onUpdate={updateCakeOrder} />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};


const ReservationCard = ({
  reservation,
  language,
  labels,
  readOnly,
  isUpdating,
  onUpdate,
}: {
  reservation: StaffReservation;
  language: DashboardLanguage;
  labels: Record<string, string>;
  readOnly: boolean;
  isUpdating: boolean;
  onUpdate: (reservation: StaffReservation, update: Partial<Pick<StaffReservation, "status" | "staff_notes">>) => void;
}) => {
  const [staffNotes, setStaffNotes] = useState(reservation.staff_notes ?? "");

  useEffect(() => {
    setStaffNotes(reservation.staff_notes ?? "");
  }, [reservation.staff_notes]);

  const time = reservation.reservation_time.slice(0, 5);
  const canAct = !readOnly && !isUpdating;

  return (
    <article className="rounded-md border border-border bg-card p-3 shadow-soft md:p-4">
      <div className="flex items-start justify-between gap-3">
        <ReservationStatusBadge status={reservation.status} labels={labels} />
        <div className="flex shrink-0 items-center gap-3 text-sm font-semibold text-primary">
          <span>{time}</span>
          <span className="inline-flex items-center gap-1 text-muted-foreground">
            <Users className="h-4 w-4" aria-hidden="true" />
            {reservation.party_size}
          </span>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-work text-xl font-extrabold tracking-normal text-foreground">{cleanDisplayText(reservation.full_name)}</h3>
        <a href={`tel:${reservation.contact}`} className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-bold text-primary hover:border-primary/40" aria-label={`${labels.call} ${reservation.full_name}`}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          {cleanDisplayText(reservation.contact)}
        </a>
        {reservation.notes ? (
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span><span className="font-semibold text-foreground/80">{labels.guestNotes}:</span> {cleanDisplayText(reservation.notes)}</span>
          </p>
        ) : null}
      </div>

      {!readOnly ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {reservation.status === "new" ? (
            <>
              <Button type="button" size="sm" disabled={!canAct} onClick={() => onUpdate(reservation, { status: "confirmed" })}>{labels.confirm}</Button>
              <Button type="button" size="sm" variant="outline" disabled={!canAct} onClick={() => onUpdate(reservation, { status: "cancelled" })}>{labels.cancel}</Button>
            </>
          ) : null}
          {reservation.status === "confirmed" ? (
            <>
              <Button type="button" size="sm" disabled={!canAct} onClick={() => onUpdate(reservation, { status: "arrived" })}>{labels.arrived}</Button>
              <Button type="button" size="sm" variant="outline" disabled={!canAct} onClick={() => onUpdate(reservation, { status: "no_show" })}>{labels.noShow}</Button>
              <Button type="button" size="sm" variant="ghost" disabled={!canAct} onClick={() => onUpdate(reservation, { status: "cancelled" })}>{labels.cancel}</Button>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 border-t border-border pt-4">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.staffNotes}
          <Textarea
            value={staffNotes}
            onChange={(event) => setStaffNotes(event.target.value.slice(0, 500))}
            onBlur={() => onUpdate(reservation, { staff_notes: staffNotes.trim() || null })}
            placeholder={language === "de" ? "Interne Notiz hinzufügen" : "Add internal note"}
            className="min-h-20 resize-none font-work font-normal"
            maxLength={500}
          />
        </label>
      </div>
    </article>
  );
};

const ReservationStatusBadge = ({ status, labels }: { status: ReservationStatus; labels: Record<string, string> }) => {
  const className = {
    new: "border-warning/40 bg-warning/15 text-warning-foreground",
    confirmed: "border-accent/40 bg-accent/15 text-accent",
    arrived: "border-primary/40 bg-primary/10 text-primary",
    cancelled: "border-border bg-muted text-muted-foreground",
    no_show: "border-destructive/40 bg-destructive/10 text-destructive",
  }[status];

  return <span className={`rounded-md border px-3 py-1 text-xs font-semibold ${className}`}>{reservationStatusLabel(status, labels)}</span>;
};

const CakeOrderCard = ({
  order,
  language,
  labels,
  readOnly,
  isUpdating,
  onUpdate,
}: {
  order: StaffCakeOrder;
  language: DashboardLanguage;
  labels: Record<string, string>;
  readOnly: boolean;
  isUpdating: boolean;
  onUpdate: (order: StaffCakeOrder, update: Partial<Pick<StaffCakeOrder, "status" | "staff_notes">>) => void;
}) => {
  const [staffNotes, setStaffNotes] = useState(order.staff_notes ?? "");

  useEffect(() => {
    setStaffNotes(order.staff_notes ?? "");
  }, [order.staff_notes]);

  const canAct = !readOnly && !isUpdating;

  return (
    <article className="rounded-md border border-border bg-card p-3 shadow-soft md:p-4">
      <div className="flex items-start justify-between gap-3">
        <CakeOrderStatusBadge status={order.status} labels={labels} />
        <CountPill tone="cake">× {order.quantity}</CountPill>
      </div>

      <div className="mt-4">
        <h3 className="font-work text-xl font-extrabold leading-tight tracking-normal text-foreground">{cleanDisplayText(order.cake_choice)}</h3>
        <p className="mt-1 text-sm font-semibold text-foreground">{cleanDisplayText(order.name)}</p>
        <a href={`tel:${order.phone}`} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-bold text-primary hover:border-primary/40" aria-label={`${labels.call} ${order.name}`}>
          <Phone className="h-4 w-4" aria-hidden="true" />
          {cleanDisplayText(order.phone)}
        </a>
        {order.notes ? (
          <p className="mt-3 flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <StickyNote className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span><span className="font-semibold text-foreground/80">{labels.guestNotes}:</span> {cleanDisplayText(order.notes)}</span>
          </p>
        ) : null}
      </div>

      {!readOnly ? (
        <div className="mt-4 flex flex-wrap gap-2">
          {order.status === "pending" ? (
            <>
              <Button type="button" size="sm" disabled={!canAct} onClick={() => onUpdate(order, { status: "confirmed" })}>{labels.confirm}</Button>
              <Button type="button" size="sm" variant="outline" disabled={!canAct} onClick={() => onUpdate(order, { status: "cancelled" })}>{labels.cancel}</Button>
            </>
          ) : null}
          {order.status === "confirmed" ? (
            <>
              <Button type="button" size="sm" disabled={!canAct} onClick={() => onUpdate(order, { status: "fulfilled" })}>{labels.fulfill}</Button>
              <Button type="button" size="sm" variant="ghost" disabled={!canAct} onClick={() => onUpdate(order, { status: "cancelled" })}>{labels.cancel}</Button>
            </>
          ) : null}
        </div>
      ) : null}

      <div className="mt-4 border-t border-border pt-4">
        <label className="grid gap-2 text-sm font-semibold text-foreground">
          {labels.staffNotes}
          <Textarea
            value={staffNotes}
            onChange={(event) => setStaffNotes(event.target.value.slice(0, 500))}
            onBlur={() => onUpdate(order, { staff_notes: staffNotes.trim() || null })}
            placeholder={language === "de" ? "Interne Notiz hinzufügen" : "Add internal note"}
            className="min-h-20 resize-none font-work font-normal"
            maxLength={500}
          />
        </label>
      </div>
    </article>
  );
};

const CakeOrderStatusBadge = ({ status, labels }: { status: CakeOrderStatus; labels: Record<string, string> }) => {
  const className = {
    pending: "border-warning/40 bg-warning/15 text-warning-foreground",
    confirmed: "border-accent/40 bg-accent/15 text-accent",
    fulfilled: "border-primary/40 bg-primary/10 text-primary",
    cancelled: "border-border bg-muted text-muted-foreground",
  }[status];

  return <span className={`rounded-md border px-3 py-1 text-xs font-semibold ${className}`}>{cakeOrderStatusLabel(status, labels)}</span>;
};

const DishCard = ({ record, language }: { record: StaffMenuRecord; language: DashboardLanguage }) => {
  const category = normalizeCategory(record.category);
  const cook = recordCook(record);
  const signals = recordSignals(record);
  const titleDe = fieldValue(record, ["header_de"]);
  const labels = text[language];

  return (
    <article className={`rounded-md border border-border bg-background p-3 shadow-soft md:p-4 ${category === "soup" ? "border-l-4 border-l-warning" : category === "green" ? "border-l-4 border-l-accent" : "border-l-4 border-l-primary"}`}>
      <div className="grid gap-3 md:grid-cols-[1fr_auto]">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground">{categoryLabels[language][category]}</p>
          <h3 className="mt-1 font-work text-xl font-extrabold tracking-normal text-foreground">{cleanDisplayText(record.title)}</h3>
          {record.description ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cleanDisplayText(record.description)}</p> : titleDe ? <p className="mt-1 text-sm text-muted-foreground">{titleDe}</p> : null}
        </div>
        <div className="flex flex-wrap items-start gap-2 md:max-w-72 md:justify-end">
          {signals.map((signal) => <SignalBadge key={signal.key} signal={signal} language={language} />)}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <DetailList title={labels.ingredients} icon="•" items={record.ingredients} />
        <DetailList title={labels.prep} icon="→" items={record.notes} />
      </div>

      {cook ? <div className="mt-4 flex flex-wrap gap-2">{cook.split(/[,;/]+/).map((chef) => <InfoTag key={chef}><ChefHat className="mr-1 h-3 w-3" />{labels.chef} {cleanDisplayText(chef)}</InfoTag>)}</div> : null}
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

const ArchiveCard = ({ record, language }: { record: StaffMenuRecord; language: DashboardLanguage }) => {
  const category = normalizeCategory(record.category);
  const signals = recordSignals(record);
  return (
    <article className="rounded-md border border-border bg-background p-3 shadow-soft md:p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <CategoryChip category={category}>{categoryLabels[language][category]}</CategoryChip>
          <h3 className="font-work text-xl font-bold tracking-normal text-foreground">{cleanDisplayText(record.title)}</h3>
          {record.description ? <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{cleanDisplayText(record.description)}</p> : null}
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">{recordDate(record) || cleanDisplayText(record.snapshotPeriod || "")}</span>
      </div>
      {signals.length ? <div className="mt-3 flex flex-wrap gap-2">{signals.map((signal) => <SignalBadge key={signal.key} signal={signal} language={language} />)}</div> : null}
      {record.ingredients.length ? <p className="mt-3 text-sm text-muted-foreground">{joinDisplayText(record.ingredients.slice(0, 5), ", ")}</p> : null}
    </article>
  );
};

export default StaffKitchen;