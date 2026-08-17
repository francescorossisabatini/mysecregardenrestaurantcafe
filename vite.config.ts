import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    sourcemap: true,
    // Lower target so older iPad/Safari (iOS 12-13) can parse the bundle.
    // Avoids white-screens on staff devices like the kitchen iPad.
    target: ["es2017", "safari12"],
    cssTarget: ["safari12"],
  },
  plugins: [
    react(),
    mcpPlugin(),
    legacy({
      targets: ["defaults", "ios >= 12", "safari >= 12"],
      modernPolyfills: true,
    }),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
