/** * HOOK: useLocations
 * Gestiona la sincronización de ubicaciones mediante TanStack Query.
 * Utiliza la propiedad 'select' para garantizar la integridad del modelo de paginación.
 * @param {number} page - Página actual para la consulta.
 */

import { useQuery } from "@tanstack/react-query";
import { getAllLocationsUI } from "../../config/dependencies";
import type { Pagination } from "../../core/domain/pagination";
import type { LocationModel } from "../../core/domain/location";

export const useLocations = (page: number) => {
  return useQuery({
    queryKey: ['locations', page],
    
    queryFn: () => getAllLocationsUI(page),
    
    /** Cache persistente por 5 minutos */
    staleTime: 1000 * 60 * 5, 
    
    /** * Mapeo/Tipado: Asegura que el resultado cumpla con la interfaz de paginación
     * antes de ser entregado al componente.
     */
    select: (data): Pagination<LocationModel> => data,
  });
};