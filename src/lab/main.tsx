import { createRoot } from "react-dom/client";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LabApp } from "./LabApp";
import "../index.css";

// Il banco monta gli stessi provider e lo stesso CSS dell'app, così quello che
// si vede qui è vero: stessi token, stessi font, stesse utility.
createRoot(document.getElementById("lab-root")!).render(
  <LanguageProvider>
    <LabApp />
  </LanguageProvider>
);
