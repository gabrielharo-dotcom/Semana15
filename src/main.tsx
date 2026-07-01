import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import App from "./App";
import { queryClient } from "@/lib/query-client";

import "./index.css";

/**
 * Punto de entrada de la app.
 *
 * Envolvemos TODA la aplicación con QueryClientProvider para que cualquier
 * componente pueda usar hooks de TanStack Query (useQuery, useMutation...).
 * Las Devtools solo se renderizan en desarrollo y permiten inspeccionar la
 * caché de queries en vivo (no aparecen en el build de producción).
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);
