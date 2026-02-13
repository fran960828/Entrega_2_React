/** * LOADER: Characters (Refactorizado)
 * Implementa prefetching con tolerancia a errores de búsqueda (404).
 * Evita el colapso de la ruta cuando la API no encuentra resultados.
 */

import { createPaginationLoader } from "../../shared/loader";
import { getAllCharactersUI } from "../services";


export const charactersLoader = createPaginationLoader("characters", getAllCharactersUI);