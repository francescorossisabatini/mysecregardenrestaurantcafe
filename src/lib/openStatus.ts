export type Slot = { open: string; close: string };
export type OpeningHours = {
  mon: Slot | null;
  tue: Slot | null;
  wed: Slot | null;
  thu: Slot | null;
  fri: Slot | null;
  sat: Slot | null;
  sun: Slot | null;
};

function toMinutes(hhmm: string): number {
  const [hh, mm] = hhmm.split(":").map(Number);
  return hh * 60 + mm;
}

function getViennaParts(date = new Date()): { weekday: string; minutes: number } {
  const dtf = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Vienna",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const parts = dtf.formatToParts(date);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "Mon";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");

  return { weekday, minutes: hour * 60 + minute };
}

function weekdayKey(weekdayShort: string): keyof OpeningHours {
  const map: Record<string, keyof OpeningHours> = {
    Mon: "mon",
    Tue: "tue",
    Wed: "wed",
    Thu: "thu",
    Fri: "fri",
    Sat: "sat",
    Sun: "sun",
  };
  return map[weekdayShort] ?? "mon";
}

export function getOpenStatus(hours: OpeningHours, now = new Date()) {
  const { weekday, minutes } = getViennaParts(now);
  const key = weekdayKey(weekday);
  const slot = hours[key];

  // Helper to get next day's key
  const dayOrder: (keyof OpeningHours)[] = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const currentDayIndex = dayOrder.indexOf(key);
  const nextDayIndex = (currentDayIndex + 1) % 7;
  const nextDayKey = dayOrder[nextDayIndex];
  const nextDaySlot = hours[nextDayKey];

  if (!slot) {
    // Today is closed (e.g., Sunday) - check if tomorrow opens
    return { 
      isOpen: false, 
      closesAt: null as string | null, 
      opensAt: null as string | null, 
      isClosed: true,
      tomorrowOpensAt: nextDaySlot?.open ?? null,
      tomorrowClosed: !nextDaySlot,
    };
  }

  const openM = toMinutes(slot.open);
  const closeM = toMinutes(slot.close);
  const isOpen = minutes >= openM && minutes < closeM;
  const isBeforeOpening = minutes < openM;
  const isAfterClosing = minutes >= closeM;

  return {
    isOpen,
    closesAt: isOpen ? slot.close : null,
    opensAt: isBeforeOpening ? slot.open : null,
    isClosed: false,
    isAfterClosing,
    tomorrowOpensAt: nextDaySlot?.open ?? null,
    tomorrowClosed: !nextDaySlot,
  };
}
