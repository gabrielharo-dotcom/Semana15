/// <reference types="vitest/config" />
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

/**
 * Config dedicada a los tests (separada de vite.config.ts a propósito).
 * Omitimos Tailwind y el React Compiler: no aportan a los tests y los harían
 * más lentos. Solo necesitamos el plugin de React (JSX) y el alias "@".
 */
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    // jsdom simula un navegador (document, window, localStorage) en Node.
    environment: "jsdom",
    // Archivo que corre antes de cada suite (matchers, limpieza...).
    setupFiles: ["./src/test/setup.ts"],
    // Permite usar describe/it/expect sin importarlos en cada archivo.
    globals: true,
    // Valores fijos para import.meta.env, así los tests son deterministas.
    env: {
      VITE_TMDB_API_URL: "https://api.test",
      VITE_TMDB_IMAGE_URL: "https://img.test",
      VITE_TMDB_API_KEY: "test-key",
    },
  },
});
