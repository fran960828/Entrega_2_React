/** * LOADER: Characters
 * Estrategia de Prefetching: Sincroniza los parámetros de la URL con la caché de React Query.
 * Asegura que los datos estén listos en el QueryClient antes de renderizar la vista.
 */

import { getAllEpisodesUI } from "../services"; // Tu caso de uso/servicio
import { createPaginationLoader } from "../../shared/loader";

export const episodesLoader = createPaginationLoader("episodes", getAllEpisodesUI);
