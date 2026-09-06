import { lazy, type ComponentType } from "react";

const RELOAD_KEY = "chunk-reload-at";

/**
 * Lazy import resiliente ai deploy: se il chunk richiesto non esiste piu
 * (nuova build pubblicata mentre la pagina era aperta), ricarica la pagina
 * una sola volta invece di mostrare uno schermo bianco.
 */
export function lazyWithRetry<T extends ComponentType<unknown>>(
  factory: () => Promise<{ default: T }>
) {
  return lazy(async () => {
    try {
      const mod = await factory();
      sessionStorage.removeItem(RELOAD_KEY);
      return mod;
    } catch (err) {
      const last = Number(sessionStorage.getItem(RELOAD_KEY) ?? 0);
      // Evita loop infiniti: un solo reload ogni 10 secondi.
      if (Date.now() - last > 10_000) {
        sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
        window.location.reload();
        // Promise pendente: la pagina si sta ricaricando.
        return new Promise<{ default: T }>(() => {});
      }
      throw err;
    }
  });
}
