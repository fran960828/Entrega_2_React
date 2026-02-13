import type { Species, Status } from "../../characters/models";

/** * DOMAIN MODEL: Pagination & Filters
 * Estructuras genéricas para el manejo de respuestas paginadas y criterios de búsqueda.
 */
interface Info {
  count: number; // Total de registros en la base de datos
    pages: number; // Total de páginas disponibles
    next: string | null;
    prev: string | null;
}

export interface Pagination<T> {
  info: Info
  results: T[]; // Datos genéricos (Character, Episode, etc.)
}

// Filtros que se pasa a la llamada a la api en el caso de characters
export interface Filters {
  name?: string;
  status?: Status;
  species?: Species;
  page: number;
}