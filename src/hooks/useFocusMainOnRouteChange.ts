import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

/**
 * DESIGN_SYSTEM §8: "Route transition: il focus si sposta in cima al nuovo
 * contenuto". In una SPA il browser non lo fa da solo: dopo un link del drawer
 * o un cambio lingua il focus finiva su <body>, e uno screen reader restava
 * senza punto di partenza (critico cieco, 26/09/2026).
 *
 * Sta in AppContent e non nella Navigation, perché ogni pagina monta la sua
 * Navigation e un effetto lì ripartirebbe da zero a ogni route.
 * Non tocca il primo caricamento: lì il focus è già all'inizio del documento.
 * Si confronta col percorso precedente e non con un flag "primo render",
 * perché in sviluppo StrictMode esegue l'effetto due volte al montaggio.
 */
export const useFocusMainOnRouteChange = () => {
  const { pathname } = useLocation();
  const previousPath = useRef(pathname);

  useEffect(() => {
    if (previousPath.current === pathname) return;
    previousPath.current = pathname;
    // Le pagine sono lazy: <main> può arrivare qualche frame dopo il cambio
    // di percorso. E se il cambio parte dal drawer, per un momento <main> è
    // ancora inert e focus() viene ignorato. Si riprova finché il focus non
    // ci arriva davvero, per circa due secondi, poi si lascia stare.
    let frames = 0;
    let id = 0;
    const tryFocus = () => {
      const main = document.getElementById("main-content");
      if (main && !main.closest("[inert]")) main.focus({ preventScroll: true });
      if (document.activeElement === main) return;
      if (frames++ < 120) id = requestAnimationFrame(tryFocus);
    };
    id = requestAnimationFrame(tryFocus);
    return () => cancelAnimationFrame(id);
  }, [pathname]);
};
