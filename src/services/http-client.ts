import axios from "axios";

/**
 * Cliente HTTP central, preconfigurado para la API de TMDB.
 *
 * - `baseURL`: todas las peticiones cuelgan de https://api.themoviedb.org/3,
 *   así en los servicios solo escribimos la ruta relativa (ej: "/movie/popular").
 * - `params.api_key`: TMDB v3 autentica con la API Key como query param.
 *   Axios la añade automáticamente a TODAS las peticiones de este cliente.
 * - `params.language`: pedimos los datos en español desde un solo lugar.
 *
 * La key vive en .env.local (fuera de git) y se inyecta aquí una sola vez.
 * Tener un único cliente evita repetir configuración y deja un solo lugar
 * que tocar si algún día cambia la API o la forma de autenticación.
 */
export const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_API_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "es-ES",
  },
});
