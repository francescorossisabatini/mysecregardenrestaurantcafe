/**
 * Traccia ogni clic su un link `tel:` del sito, ovunque si trovi.
 *
 * Perché un listener delegato invece di un onClick per componente: i numeri di
 * telefono sono sparsi su sei file (MobileStickyBar, CTAEndBlock, /link,
 * WeeklyMenuPendingUpdate, Impressum, Privacy) e fino al 22/09/2026 solo il
 * primo sparava l'evento — che vive però nella barra mobile, assente su
 * desktop. Risultato misurato in GA4 su 90 giorni: click_call desktop = 0,
 * uno zero strutturale, non un comportamento.
 *
 * Non si può risolvere lato GA4: la regola `anrufen_click` configurata nella
 * proprietà si appoggia ai "clic in uscita" della misurazione avanzata, che
 * non scattano sui `tel:` perché non sono link http verso un altro dominio.
 * In 90 giorni quella regola non ha prodotto un solo evento.
 *
 * Le indicazioni stradali NON hanno bisogno dello stesso trattamento: la
 * regola `maps_click` intercetta già ogni link verso google.com/maps, su
 * qualunque componente e qualunque dispositivo (123 eventi contro i 17 di
 * click_directions).
 */

const TEL_SELECTOR = 'a[href^="tel:"]';

export const attachTelClickTracking = () => {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const onClick = (event: MouseEvent) => {
    const target = event.target as Element | null;
    const link = target?.closest?.(TEL_SELECTOR) as HTMLAnchorElement | null;
    if (!link) return;

    // MobileStickyBar spara già click_call per conto suo, insieme ai parametri
    // dell'A/B test dell'hero. Senza questa esclusione lo stesso tocco su
    // mobile verrebbe contato due volte, e il confronto con i 55 eventi
    // storici salterebbe.
    if (link.dataset.callTracked === "self") return;

    // Nessun consenso, nessun gtag, nessun evento: l'assenza qui è il
    // comportamento corretto, non un errore da ritentare.
    if (!window.gtag) return;

    window.gtag("event", "click_call", {
      event_category: "engagement",
      event_label: link.dataset.callSource ?? window.location.pathname,
    });
  };

  document.addEventListener("click", onClick, { capture: true });
  return () => document.removeEventListener("click", onClick, { capture: true });
};
