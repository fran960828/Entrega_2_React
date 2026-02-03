/** * CONTAINER: Character
 * Orquestador de la lógica de búsqueda, filtrado y paginación.
 * Optimizado: Se elimina useState y useEffect para usar la URL como Single Source of Truth.
 */

import { useSearchParams } from "react-router-dom";
import type{ Filters } from "../shared/models";
import { useGenericPagination } from "../shared/hooks";
import { getAllCharactersUI } from "./services";
import { CharacterCard, CharacterFilter } from "./components";
import classes from './Character.module.css'
import { Pagination } from "../shared/components/Pagination";


export const Character = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** * 1. ESTADO DERIVADO (URL as Truth):
   * Construimos el objeto de filtros directamente desde la URL en cada renderizado.
   */
  const currentFilters: Filters = {
    page: Number(searchParams.get("page")) || 1,
    name: searchParams.get("name") || "",
    status: searchParams.get("status") || "",
    species: searchParams.get("species") || "",
  };

  /** * 2. CONSUMO DE DATOS:
   * El hook genérico reaccionará automáticamente cuando la URL cambie.
   */
  const { data, isError } = useGenericPagination(
    "characters",
    getAllCharactersUI,
    currentFilters
  );

  /** * 3. MANEJADORES DE NAVEGACIÓN (Event-driven):
   * En lugar de actualizar un estado local, actualizamos la URL directamente.
   */
  const updateURL = (newParams: Record<string, string | number>) => {
    const params = new URLSearchParams();

    // Solo añadimos a la URL los valores que existen para mantenerla limpia
    if (newParams.page && Number(newParams.page) > 1)
      params.set("page", newParams.page.toString());
    if (newParams.name) params.set("name", newParams.name.toString());
    if (newParams.status) params.set("status", newParams.status.toString());
    if (newParams.species) params.set("species", newParams.species.toString());

    setSearchParams(params, { replace: true });
  };

  const handleUpdateFilters = (newChanges: Partial<Filters>) => {
    // Combinamos filtros actuales con los cambios y reseteamos a página 1
    updateURL({
      ...currentFilters,
      ...newChanges,
      page: 1,
    });
  };

  const handlePageChange = (newPage: number) => {
    updateURL({ ...currentFilters, page: newPage });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Lógica de renderizado
  const isResultsEmpty =
     (isError || (data && data.results.length === 0));

  return (
    <section className={classes.container}>
      <div className={classes.filter}>
        <CharacterFilter
          onFilterChange={handleUpdateFilters}
          initialValues={{
            name: currentFilters.name,
            status: currentFilters.status,
            species: currentFilters.species,
          }}
        />
      </div>

      {isResultsEmpty && (
        <div className={classes.noResults}>
          <p>No se encontraron personajes que coincidan con la búsqueda.</p>
        </div>
      )}

      {!isResultsEmpty && data && (
        <>
          <div className={classes.grid}>
            {data.results.map((i) => (
              <CharacterCard key={i.id} character={i} />
            ))}
          </div>
          <Pagination
            currentPage={currentFilters.page}
            totalPages={data.info.pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </section>
  );
};
