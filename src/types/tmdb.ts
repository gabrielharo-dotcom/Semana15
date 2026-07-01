/**
 * Tipos que reflejan la forma CRUDA de la respuesta de TMDB.
 *
 * Se mantienen separados del modelo de dominio (ver types/movie.ts) para que
 * la UI no dependa de cómo TMDB nombra sus campos (snake_case, rutas de imagen
 * relativas, etc.). Si TMDB cambia, solo ajustamos el "mapper" en
 * services/movies.ts, no todos los componentes.
 */
export interface TmdbMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
}

/** Envoltorio paginado que TMDB usa en sus listados. */
export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/** Género tal como lo devuelve TMDB en el detalle de una película. */
export interface TmdbGenre {
  id: number;
  name: string;
}

/**
 * Detalle de una película: la respuesta de /movie/{id} trae más campos que el
 * listado (géneros, duración, eslogan...). Extiende la forma base de listado.
 */
export interface TmdbMovieDetails extends TmdbMovie {
  genres: TmdbGenre[];
  runtime: number | null;
  tagline: string;
  vote_count: number;
}
