/** * INFRASTRUCTURE: HTTP Client & API Routes
 * Adaptador base genérico para peticiones externas y definición de endpoints.
 */
import { parseJson } from "./component/parseJson";


export const httpClient = {
  
get: async <T>(url: string): Promise<T> => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw {
        status: res.status,
        message: `Error from the Citadel: ${res.statusText}`,
      };
    }
    return parseJson<T>(res);
  } catch (error: any) {
    // Si ya es nuestro objeto de error, lo volvemos a lanzar
    if (error.status) throw error;
    
    // Si es un error de red (servidor caído), lo normalizamos
    throw {
      status: 500,
      message: "The Citadel is dark. (Network Error)",
    };
  }
},
};

export const urls = {
  characters: "https://rickandmortyapi.com/api/character",
  locations: "https://rickandmortyapi.com/api/location",
  episodes: "https://rickandmortyapi.com/api/episode"
};