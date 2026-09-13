import type { FC } from "react";

export interface VariantProps {
  /** Larghezza del contenitore in cui la variante viene renderizzata. */
  width: number;
}

export interface Experiment {
  id: string;
  title: string;
  /** La funzione CSS che Tailwind espone, con il nome della utility. */
  feature: string;
  /** Il difetto reale nel repo, con file e riga. Non un esempio inventato. */
  problem: string;
  /** Cosa costa adottarlo. */
  cost: string;
  /** Supporto browser, onesto. */
  support: string;
  /** Larghezze a cui ha senso guardarlo. */
  widths: number[];
  Before: FC<VariantProps>;
  After: FC<VariantProps>;
}
