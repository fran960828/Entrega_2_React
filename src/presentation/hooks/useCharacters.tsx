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
    /** * El array de queryKey funciona como una "dependencia". 
     * Si cualquier valor dentro de 'filters' cambia, useQuery dispara una nueva petición.
     */
    queryKey: ['characters', filters], 
    
    queryFn: () => getAllCharactersUI(filters),
    
    /** Optimización: Evita peticiones innecesarias si los datos tienen menos de 5 min */
    staleTime: 1000 * 60 * 5, 
  });
};