import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { getMovieDetails, getPopularMovies } from "@/services/movies";

/**
 * Hook para obtener una página de películas populares.
 *
 * - La `queryKey` incluye la página: cada página se cachea por separado.
 * - `placeholderData: keepPreviousData` mantiene visibles los datos de la
 *   página anterior mientras carga la nueva, evitando parpadeos al paginar.
 */
export function useMovies(page = 1) {
  return useQuery({
    queryKey: ["movies", "popular", page],
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  });
}

/**
 * Hook para obtener el detalle de una película.
 *
 * `enabled` evita lanzar la petición si el id no es válido (ej: la URL trae
 * algo que no es un número), un patrón común con parámetros de ruta.
 */
export function useMovie(movieId: number) {
  return useQuery({
    queryKey: ["movies", "detail", movieId],
    queryFn: () => getMovieDetails(movieId),
    enabled: Number.isFinite(movieId) && movieId > 0,
  });
}
