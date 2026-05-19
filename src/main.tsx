import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

// Staff pages must opt out of browser translation before React renders.
// iOS Safari can translate the English dashboard while <html lang="de"> is still
// active during lazy loading, mutating the DOM and leaving only the background.
if (window.location.pathname.startsWith("/staff")) {
  document.documentElement.lang = "en";
  document.documentElement.setAttribute("translate", "no");
  document.documentElement.classList.add("notranslate");
}

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

