/**
 * Construye la URL absoluta de una imagen de TMDB a partir de su `path`.
 *
 * TMDB devuelve solo rutas relativas (ej: "/abc.jpg"); aquí las combinamos con
 * la base y el tamaño deseado. Devuelve "" si no hay imagen, para que cada
 * componente decida qué mostrar en ese caso (placeholder, ocultar, etc.).
 */
export function buildImageUrl(
  path: string | null,
  size: "w500" | "original" = "w500",
): string {
  if (!path) return "";
  return `${import.meta.env.VITE_TMDB_IMAGE_URL}/${size}${path}`;
}
