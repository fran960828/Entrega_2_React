/** * HOOK: useGenericPagination
 * Abstracción de lógica de fetching para listas paginadas.
 * @param queryKey - Identificador único para la caché de TanStack Query.
 * @param fetchFn - Función de servicio (UC) que realiza la llamada.
 * @param filters - Objeto con page (obligatorio) y criterios extra.
 */

import { useQuery } from "@tanstack/react-query";
import type { Filters } from "../../core/domain/pagination";

export const useGenericPagination = <T, F extends Filters>(
  queryKey: string,
  fetchFn: (filters: F) => Promise<T>,
  filters: F
) => {

  return useQuery({
    queryKey: [queryKey, filters],
    queryFn: () => fetchFn(filters),
    staleTime: 1000 * 60 * 5, // 5 minutos de caché
  });
};
