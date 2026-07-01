/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base de la API REST de TMDB, ej: https://api.themoviedb.org/3 */
  readonly VITE_TMDB_API_URL: string;
  /** Base para construir URLs de imágenes (posters/backdrops) de TMDB. */
  readonly VITE_TMDB_IMAGE_URL: string;
  /** API Key (v3) de TMDB, enviada como parámetro `api_key` en cada request. */
  readonly VITE_TMDB_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
