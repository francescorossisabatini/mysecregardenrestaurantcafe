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
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const todayString = `${month}-${day}`;
  
  return holidays.find(h => h.date === todayString) || null;
}

// Helper function to get holiday for a specific date in the current week
export function getHolidayForWeekday(dayIndex: number): Holiday | null {
  // dayIndex: 0 = Monday, 1 = Tuesday, ... 5 = Saturday
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ...
  
  // Calculate the Monday of the current week
  const monday = new Date(today);
  const daysFromMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  monday.setDate(today.getDate() - daysFromMonday);
  
  // Get the date for the requested day
  const targetDate = new Date(monday);
  targetDate.setDate(monday.getDate() + dayIndex);
  
  const month = String(targetDate.getMonth() + 1).padStart(2, '0');
  const day = String(targetDate.getDate()).padStart(2, '0');
  const dateString = `${month}-${day}`;
  
  return holidays.find(h => h.date === dateString) || null;
}
