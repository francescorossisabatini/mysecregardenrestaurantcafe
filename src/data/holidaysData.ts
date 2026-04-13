// List of holidays when the restaurant is closed
// Format: month-day (1-indexed, e.g., "12-24" for December 24th)

interface Holiday {
  date: string; // Format: "MM-DD"
  name: { de: string; en: string };
  message: { de: string; en: string };
}

export const holidays: Holiday[] = [
  {
    date: "12-24",
    name: { de: "Heiligabend", en: "Christmas Eve" },
    message: { 
      de: "Wir wünschen dir einen besinnlichen Heiligabend im Kreise deiner Lieben.", 
      en: "We wish you a peaceful Christmas Eve with your loved ones." 
    },
  },
  {
    date: "12-25",
    name: { de: "Weihnachten", en: "Christmas Day" },
    message: { 
      de: "Frohe Weihnachten! Möge dieser Tag voller Licht und Freude sein.", 
      en: "Merry Christmas! May this day be filled with light and joy." 
    },
  },
  {
    date: "12-26",
    name: { de: "Stefanitag", en: "St. Stephen's Day" },
    message: { 
      de: "Wir genießen die Ruhe zwischen den Jahren und freuen uns, dich bald wiederzusehen.", 
      en: "We're enjoying the quiet between the years and look forward to seeing you soon." 
    },
  },
];

// Helper function to check if today is a holiday
export function getTodayHoliday(): Holiday | null {
  const today = new Date();
  return getHolidayForDate(today);
}

// Helper: get holiday for a given Date
export function getHolidayForDate(date: Date): Holiday | null {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateString = `${month}-${day}`;
  return holidays.find((h) => h.date === dateString) || null;
}

function parseMonthNameToNumber(monthNameRaw: string): number | null {
  const m = monthNameRaw.trim().toLowerCase();

  const map: Record<string, number> = {
    // German
    januar: 1,
    februar: 2,
    märz: 3,
    maerz: 3,
    april: 4,
    mai: 5,
    juni: 6,
    juli: 7,
    august: 8,
    september: 9,
    oktober: 10,
    november: 11,
    dezember: 12,

    // English
    january: 1,
    february: 2,
    march: 3,
    april_en: 4,
    may: 5,
    june: 6,
    july: 7,
    august_en: 8,
    september_en: 9,
    october: 10,
    november_en: 11,
    december: 12,

    // Italian
    gennaio: 1,
    febbraio: 2,
    marzo: 3,
    aprile: 4,
    maggio: 5,
    giugno: 6,
    luglio: 7,
    agosto: 8,
    settembre: 9,
    ottobre: 10,
    novembre: 11,
    dicembre: 12,
  };

  if (m === "april") return 4;
  if (m === "august") return 8;
  if (m === "september") return 9;
  if (m === "november") return 11;

  return map[m] ?? null;
}

// Parse a period string like "10-15. November" and return the start date.
// If parsing fails, returns null.
export function getWeekStartDateFromPeriod(period: string, baseDate = new Date()): Date | null {
  // Accept: 10-15. November | 10–15 November | 10-15 Novembre 2025 | 10.-15. Dezember
  const match = period
    .trim()
    .match(/(\d{1,2})\s*[\-–]\s*(\d{1,2})\s*\.?\s*([A-Za-zÀ-ÿÄÖÜäöü]+)(?:\s+(\d{4}))?/);

  if (!match) return null;

  const startDay = Number(match[1]);
  const monthName = match[3];
  const yearFromString = match[4] ? Number(match[4]) : null;

  const monthNumber = parseMonthNameToNumber(monthName);
  if (!monthNumber) return null;

  const baseYear = baseDate.getFullYear();
  let year = yearFromString ?? baseYear;

  // If no year specified and we are in late December viewing a "January" menu, roll over.
  if (!yearFromString) {
    const currentMonth = baseDate.getMonth() + 1;
    if (currentMonth === 12 && monthNumber === 1) year = baseYear + 1;
  }

  return new Date(year, monthNumber - 1, startDay);
}

// Given the menu period and a day index (0=Mon ...), returns the corresponding date if possible.
export function getDateForMenuDay(period: string, dayIndex: number): Date | null {
  const start = getWeekStartDateFromPeriod(period);
  if (!start) return null;

  const d = new Date(start);
  d.setDate(start.getDate() + dayIndex);
  return d;
}

// Helper function to get holiday for a specific day name in the current week
// (fallback when period cannot be parsed)
export function getHolidayForDayName(dayName: string): Holiday | null {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ...

  // Map day names to day offsets from Monday
  const dayOffsets: { [key: string]: number } = {
    Montag: 0,
    Monday: 0,
    Dienstag: 1,
    Tuesday: 1,
    Mittwoch: 2,
    Wednesday: 2,
    Donnerstag: 3,
    Thursday: 3,
    Freitag: 4,
    Friday: 4,
    Samstag: 5,
    Saturday: 5,
    Sonntag: 6,
    Sunday: 6,
  };

  const dayOffset = dayOffsets[dayName];
  if (dayOffset === undefined) return null;

  // Calculate the Monday of the current week
  const monday = new Date(today);
  const daysFromMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  monday.setDate(today.getDate() - daysFromMonday);

  // Get the date for the requested day
  const targetDate = new Date(monday);
  targetDate.setDate(monday.getDate() + dayOffset);

  return getHolidayForDate(targetDate);
}

// Check if a day name is Sunday
export function isSundayByName(dayName: string): boolean {
  return dayName === "Sonntag" || dayName === "Sunday";
}

