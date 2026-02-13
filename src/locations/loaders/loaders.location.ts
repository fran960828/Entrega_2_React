/** * LOADER: Characters
 * Estrategia de Prefetching: Sincroniza los parámetros de la URL con la caché de React Query.
 * Asegura que los datos estén listos en el QueryClient antes de renderizar la vista.
 */

import { getAllLocationsUI } from "../services"; 
import { createPaginationLoader } from "../../shared/loader";



export const locationsLoader = createPaginationLoader("locations", getAllLocationsUI);
