// List of holidays when the restaurant is closed
// Format: month-day (1-indexed, e.g., "12-24" for December 24th)

interface Holiday {
  date: string; // Format: "MM-DD"
  name: { de: string; en: string };
  message: { de: string; en: string };
}

export const holidays: Holiday[] = [
  {
    date: "12-21",
    name: { de: "Wintersonntag", en: "Winter Sunday" },
    message: { 
      de: "Test - rimuovi questa festività dopo aver testato.", 
      en: "Test - remove this holiday after testing." 
    },
  },
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
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${month}-${day}`;
  
  return holidays.find(h => h.date === todayString) || null;
}
