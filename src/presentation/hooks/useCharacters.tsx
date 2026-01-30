/** * HOOK: useCharacters
 * Abstracción de TanStack Query para la entidad Character.
 * Gestiona la sincronización automática de la caché basada en los filtros activos.
 * @param {Filters} filters - Criterios de búsqueda y paginación.
 */

import { useQuery } from "@tanstack/react-query";
import type { Filters } from "../../core/domain/pagination";
import { getAllCharactersUI } from "../../config/dependencies";

export const useCharacters = (filters: Filters) => {
  return useQuery({
    queryKey: ["characters", filters],
    queryFn: () => getAllCharactersUI(filters),
    
    /** * ESTRATEGIA DE CACHÉ:
     * 'staleTime': Evita que la app vuelva a pedir datos al servidor inmediatamente.
     * Si el loader ya trajo los datos (o el objeto vacío), los consideramos 
     * frescos por 5 minutos.
     */
    staleTime: 1000 * 60 * 5,

  });
};