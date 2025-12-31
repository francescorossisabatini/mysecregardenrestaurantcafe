import type { OpeningHours } from "@/lib/openStatus";

export const SITE = {
  name: "My Secret Garden",

  // Contact
  phoneDisplay: "01 597 05 47",
  phoneTel: "+4315970547",

  // Address
  addressShort: "Wien – Annagasse 4, 1010",

  // Google Maps share link
  mapsUrl: "https://www.google.com/maps/place/My+Secret+Garden/@48.2058449,16.3693511,17z",

  // Opening hours (Mo–Sa 11:00–19:00, So closed)
  openingHours: {
    mon: { open: "11:00", close: "19:00" },
    tue: { open: "11:00", close: "19:00" },
    wed: { open: "11:00", close: "19:00" },
    thu: { open: "11:00", close: "19:00" },
    fri: { open: "11:00", close: "19:00" },
    sat: { open: "11:00", close: "19:00" },
    sun: null,
  } satisfies OpeningHours,
} as const;
