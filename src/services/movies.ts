import { buildImageUrl } from "@/lib/tmdb";
import { tmdbClient } from "@/services/http-client";
import type { Movie, MovieDetails } from "@/types/movie";
import type {
  TmdbMovie,
  TmdbMovieDetails,
  TmdbPaginatedResponse,
} from "@/types/tmdb";

/** Página de resultados ya mapeada al modelo de dominio. */
export interface MoviesPage {
  results: Movie[];
  page: number;
  totalPages: number;
}

/**
 * "Mapper": convierte una película CRUDA de TMDB a nuestro modelo de dominio.
 * Aquí es el único lugar donde la app conoce los nombres de campos de TMDB.
 */
function toMovie(dto: TmdbMovie): Movie {
  return {
    id: dto.id,
    title: dto.title,
    synopsis: dto.overview,
    posterUrl: buildImageUrl(dto.poster_path, "w500"),
    backdropUrl: buildImageUrl(dto.backdrop_path, "original"),
    rating: dto.vote_average,
    releaseDate: dto.release_date,
  };
}

/** Mapper del detalle: reutiliza `toMovie` y añade los campos extra. */
function toMovieDetails(dto: TmdbMovieDetails): MovieDetails {
  return {
    ...toMovie(dto),
    genres: dto.genres.map((genre) => genre.name),
    runtime: dto.runtime,
    tagline: dto.tagline,
    voteCount: dto.vote_count,
  };
}

/** Trae una página de películas populares, mapeada y con info de paginación. */
export async function getPopularMovies(page = 1): Promise<MoviesPage> {
  const { data } = await tmdbClient.get<TmdbPaginatedResponse<TmdbMovie>>(
    "/movie/popular",
    { params: { page } },
  );

  return {
    results: data.results.map(toMovie),
    page: data.page,
    totalPages: data.total_pages,
  };
}

/** Trae el detalle de una película por su id. */
export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const { data } = await tmdbClient.get<TmdbMovieDetails>(`/movie/${movieId}`);

  return toMovieDetails(data);
}
