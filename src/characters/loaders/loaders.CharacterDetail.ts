/** * LOADER: Characters
 * Estrategia de Prefetching: Sincroniza los parámetros de la URL con la caché de React Query.
 * Asegura que los datos estén listos en el QueryClient antes de renderizar la vista.
 */

import { type LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from '../../main'
import { getCharacterUI } from "../services"; // Tu caso de uso/servicio

export function characterIdLoader({ params }: LoaderFunctionArgs) {
  const id = params.id


  // Aprovechamos la caché: si ya están los datos, no hace fetch
  return queryClient.ensureQueryData({
    queryKey: ["character", id],
    queryFn: () => getCharacterUI(Number(id)),
  });
}