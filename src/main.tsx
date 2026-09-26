import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";
import { applyStoredLanguageChoice } from "./lib/i18nRoutes";

// Prima che il router legga l'URL: chi ha già scelto una lingua atterra
// direttamente nella sua versione. Sincrono = nessun flash, una sola
// page_view. Googlebot non ha mai una scelta salvata.
applyStoredLanguageChoice();

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

