import React from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.tsx";
import "./index.css";

const root = document.getElementById("root")!;

createRoot(root).render(
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

// Show content after React has rendered - prevents FOUC
requestAnimationFrame(() => {
  root.classList.add("ready");
});
