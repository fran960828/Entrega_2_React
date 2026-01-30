/** * LOADER: Characters (Refactorizado)
 * Implementa prefetching con tolerancia a errores de búsqueda (404).
 * Evita el colapso de la ruta cuando la API no encuentra resultados.
 */

import type { LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from '../main'
import { getAllCharactersUI } from "../config/dependencies";

export async function charactersLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  const filters = {
    page: Number(url.searchParams.get("page")) || 1,
    name: url.searchParams.get("name") || "",
    status: url.searchParams.get("status") || "",
    species: url.searchParams.get("species") || ""
  };

  try {
    // Intentamos asegurar los datos en la caché
    return await queryClient.ensureQueryData({
      queryKey: ["characters", filters],
      queryFn: () => getAllCharactersUI(filters),
    });
  } catch (error: any) {
    /** * GESTIÓN DE SILENCIO (Muting):
     * Si la API devuelve 404, inyectamos un resultado vacío en la caché 
     * manualmente para que el componente renderice el estado "Sin Resultados".
     */
    if (error.response?.status === 404 || error.status === 404) {
      const emptyData = { results: [], info: { pages: 0, count: 0 } };
      
      // Alimentamos la caché manualmente para que el useQuery del componente no intente un fetch fallido
      queryClient.setQueryData(["characters", filters], emptyData);
      
      return emptyData;
    }
    
    // Si es un error real (red, 500), lo lanzamos para que actúe el ErrorBoundary
    throw error;
  }
}