import { QueryClient } from "@tanstack/react-query";

/**
 * Instancia única de QueryClient para toda la app.
 *
 * Valores por defecto pensados para un catálogo que cambia poco:
 * - `staleTime`: durante 1 minuto los datos se consideran "frescos" y no se
 *   vuelven a pedir al re-montar un componente → menos peticiones a TMDB.
 * - `retry`: reintenta 1 vez ante un fallo de red antes de mostrar error.
 * - `refetchOnWindowFocus`: lo desactivamos para no recargar cada vez que el
 *   usuario vuelve a la pestaña (útil en dashboards, molesto en un catálogo).
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
