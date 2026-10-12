import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { privacyPolicy } from "./scripts/privacy-policy";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "privacy-content-security-policy",
      transformIndexHtml: {
        order: "post" as const,
        handler: () => [{
          tag: "meta",
          attrs: {
            "http-equiv": "Content-Security-Policy",
            content: privacyPolicy(mode === "development"),
          },
          injectTo: "head-prepend" as const,
        }],
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
