import { subgridExperiment } from "./01-subgrid";
import { containerQueriesExperiment } from "./02-container-queries";
import { hasExperiment } from "./03-has";
import { startingStyleExperiment } from "./04-starting-style";
import { textPrettyExperiment } from "./05-text-pretty";
import type { Experiment } from "./types";

/**
 * Ogni esperimento parte da un difetto che esiste davvero in questo repo, con
 * file e riga. Un banco pieno di demo generiche di CSS non serve a niente:
 * serve a decidere cosa promuovere in produzione.
 */
export const experiments: Experiment[] = [
  subgridExperiment,
  hasExperiment,
  containerQueriesExperiment,
  textPrettyExperiment,
  startingStyleExperiment,
];
