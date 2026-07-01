/**
 * Modelo de DOMINIO de una película: la forma que consume nuestra UI.
 *
 * Es independiente de TMDB (nombres en camelCase, URLs de imagen ya armadas).
 * El mapeo desde la respuesta cruda vive en services/movies.ts.
 */
export interface Movie {
  id: number;
  title: string;
  synopsis: string;
  /** URL absoluta del poster, o "" si TMDB no tiene imagen. */
  posterUrl: string;
  /** URL absoluta del fondo (backdrop), o "" si no hay. */
  backdropUrl: string;
  /** Puntuación media (0-10). */
  rating: number;
  /** Fecha de estreno en formato ISO "YYYY-MM-DD". */
  releaseDate: string;
}

/**
 * Detalle enriquecido de una película, para la página de detalle.
 * Extiende el modelo base con datos que solo trae el endpoint /movie/{id}.
 */
export interface MovieDetails extends Movie {
  /** Nombres de los géneros, ej: ["Ciencia ficción", "Drama"]. */
  genres: string[];
  /** Duración en minutos, o null si TMDB no la tiene. */
  runtime: number | null;
  /** Eslogan / frase promocional, o "" si no hay. */
  tagline: string;
  /** Número de votos que respaldan la puntuación. */
  voteCount: number;
}
