/** * HOOK: useEpisodes
 * Abstracción de TanStack Query para la entidad Episode.
 * Sincroniza la lista de episodios basándose en el número de página.
 * @param {number} [page] - Número de página opcional para la paginación.
 */

import { useQuery } from "@tanstack/react-query";
import { getAllEpisodesUI } from "../../config/dependencies";

export const useEpisodes = (page?: number) => {
  return useQuery({
    /** Mantiene la caché organizada por página para una navegación instantánea */
    queryKey: ['episodes', page], 
    
    queryFn: () => getAllEpisodesUI(page),
    
    /** Cache persistente por 5 minutos para evitar re-fetch al navegar */
    staleTime: 1000 * 60 * 5, 
  });
};