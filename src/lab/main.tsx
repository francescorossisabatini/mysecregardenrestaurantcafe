import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LabApp } from "./LabApp";
import "../index.css";

// Il banco monta gli stessi provider e lo stesso CSS dell'app, così quello che
// si vede qui è vero: stessi token, stessi font, stesse utility.
// Dal 26/09/2026 la lingua la decide l'URL (LanguageContext usa il router):
// senza BrowserRouter il banco si rompeva all'avvio.
createRoot(document.getElementById("lab-root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <LabApp />
    </LanguageProvider>
  </BrowserRouter>
);
