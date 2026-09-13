import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

/**
 * Config separata, solo per compilare il banco come sito statico da
 * pubblicare o aprire senza dev server.
 *
 *   npx vite build --config vite.lab.config.ts    →  dist-lab/
 *
 * Non tocca la build di produzione: vite.config.ts resta com'è e continua a
 * costruire solo index.html.
 */
export default defineConfig({
  base: "./",
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    outDir: "dist-lab",
    emptyOutDir: true,
    rollupOptions: { input: path.resolve(__dirname, "lab.html") },
  },
});
