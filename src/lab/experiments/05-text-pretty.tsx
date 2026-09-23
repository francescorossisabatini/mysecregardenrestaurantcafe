import type { Experiment } from "./types";

const text =
  "Du gehst durch den Bogen an der Mariahilferstraße. Ein paar Schritte später wird es leiser, und der Raimundhof öffnet sich. Pflanzen, Holztische, Teller vom Tresen.";

const Before = () => (
  <div className="space-y-6">
    <h2 className="font-cormorant text-4xl leading-[1.05] text-primary">Der Hof hinter dem Bogen</h2>
    <p className="max-w-[62ch] font-lora text-lg leading-relaxed text-foreground/85">{text}</p>
  </div>
);

/**
 * balance per i titoli (già in h2-editorial), pretty per il corpo.
 * pretty non pareggia le righe: evita la riga finale con una parola sola e le
 * sillabazioni infelici, senza toccare il resto del paragrafo.
 */
const After = () => (
  <div className="space-y-6">
    <h2 className="text-balance font-cormorant text-4xl leading-[1.05] text-primary">Der Hof hinter dem Bogen</h2>
    <p className="max-w-[62ch] text-pretty font-lora text-lg leading-relaxed text-foreground/85">{text}</p>
  </div>
);

export const textPrettyExperiment: Experiment = {
  id: "text-pretty",
  title: "Righe finali senza parole orfane, nel corpo",
  feature: "text-wrap: balance e pretty — utility text-balance / text-pretty",
  problem:
    "h2-editorial ha già balance, aggiunto in questa sessione perché ogni titolo su due righe lasciava una parola sola sulla seconda. Nel corpo il difetto resta: i paragrafi di IlPosto e HomeMenuPreview chiudono spesso con una parola isolata. balance è sbagliato sul corpo — pareggia tutte le righe e su testi lunghi costa; pretty guarda solo le ultime righe.",
  cost: "Praticamente nullo. Va messo sui paragrafi, non ereditato dal body, altrimenti si paga su ogni blocco di testo della pagina.",
  support: "text-wrap: pretty — Chrome 117+, Safari 17.5+, Firefox 137+. Senza supporto il testo va a capo come oggi.",
  widths: [390, 700],
  Before,
  After,
};
