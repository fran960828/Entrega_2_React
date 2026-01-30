/** * INFRASTRUCTURE: HTTP Client & API Routes
 * Adaptador base genérico para peticiones externas y definición de endpoints.
 */

/** Procesa la respuesta para evitar errores en cuerpos vacíos */
const parseJson = async <T>(res: Response): Promise<T> => {
  const text = await res.text();
  return text && JSON.parse(text);
};

export const httpClient = {
  get: async <T>(url: string): Promise<T> => {
    const res = await fetch(url);
    if (!res.ok)
      throw new Response(
        JSON.stringify({ message: "Could not fetch data from the Citadel." }),
        { status: 500 }
      );
    return parseJson<T>(res);
  },
};

export const urls = {
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode"
};