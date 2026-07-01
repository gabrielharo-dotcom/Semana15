import { Skeleton } from "@/components/ui/skeleton";
import type { Movie } from "@/types/movie";

import MovieCard from "./movie-card";

interface Props {
  movies?: Movie[];
  isLoading: boolean;
  isError: boolean;
  /** Cuántos placeholders mostrar mientras carga. */
  skeletonCount?: number;
}

/**
 * Grilla presentacional de películas: no hace fetching, solo renderiza el
 * estado que recibe (cargando, error o datos). Al no tener lógica de datos
 * propia, se reutiliza tanto en la Home como en la página de catálogo.
 */
const MoviesGrid = ({
  movies,
  isLoading,
  isError,
  skeletonCount = 6,
}: Props) => {
  if (isError) {
    return (
      <p className="text-destructive">
        No pudimos cargar las películas. Intenta de nuevo más tarde.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {isLoading
        ? Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton
              key={index}
              className="aspect-2/3 w-full rounded-xl"
            />
          ))
        : movies?.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
    </div>
  );
};

export default MoviesGrid;
