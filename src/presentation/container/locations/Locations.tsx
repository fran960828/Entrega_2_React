/** * CONTAINER: Locations
 * Orquestador del módulo de ubicaciones y dimensiones.
 * Optimizado: Sincronización directa con URL, eliminando estados redundantes y useEffect.
 */

import { useSearchParams } from "react-router-dom";
import { LocationCard } from "./LocationCard";
import classes from "./Locations.module.css";
import { Pagination } from "../../components/Pagination";
import { useGenericPagination } from "../../hooks/useGenericPagination";
import { getAllLocationsUI } from "../../../config/dependencies";

export const Locations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** * ESTADO DERIVADO DE LA URL:
   * Ya no necesitamos useState. Leemos directamente de la fuente de verdad.
   */
  const currentPage = Number(searchParams.get("page")) || 1;

  /** * CONSUMO DE DATOS:
   * El hook genérico ahora recibe la página directamente de la URL.
   * La QueryKey se sincroniza automáticamente gracias a 'currentPage'.
   */
  const { data, isLoading } = useGenericPagination(
    "locations",
    getAllLocationsUI,
    { page: currentPage }
  );

  /** * MANEJADOR DE CAMBIO DE PÁGINA:
   * Actualizamos la URL directamente. React Router detectará el cambio y
   * provocará el re-renderizado con el nuevo 'currentPage'.
   */
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page");
    }

    setSearchParams(params, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading)
    return <div className={classes.loading}>Cargando dimensiones...</div>;

  if (!data || data.results.length === 0)
    return <p className={classes.noResults}>No se encontraron dimensiones.</p>;

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Explorar Dimensiones</h2>

      <div className={classes.grid}>
        {data.results.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {data.info && data.info.pages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={data.info.pages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
