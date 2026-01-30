/** * DOMAIN MODEL: Pagination & Filters
 * Estructuras genéricas para el manejo de respuestas paginadas y criterios de búsqueda.
 */

export interface Pagination<T> {
  info: {
    count: number; // Total de registros en la base de datos
    pages: number; // Total de páginas disponibles
    next: string | null;
    prev: string | null;
  };
  results: T[]; // Datos genéricos (Character, Episode, etc.)
}

// Filtros que se pasa a la llamada a la api en el caso de characters
export interface Filters {
  name?: string;
  status?: string;
  species?: string;
  page: number;
}

