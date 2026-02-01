/** * CONTAINER: Episodes
 * Orquestador del listado de episodios y gestión de paginación.
 * Optimizado: Sincronización directa con URL mediante eventos, eliminando efectos secundarios.
 */

import { useSearchParams } from "react-router-dom";
import { EpisodesCard } from "./EpisodesCard";
import classes from "./Episodes.module.css";
import { Pagination } from "../../components/Pagination";

import { useGenericPagination } from "../../hooks/useGenericPagination";
import { getAllEpisodesUI } from "../../../config/dependencies";

export const Episodes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  /** * LECTURA DE URL:
   * Obtenemos la página directamente de los SearchParams.
   * React Router se encargará de re-renderizar el componente cuando la URL cambie.
   */
  const currentPage = Number(searchParams.get("page")) || 1;

  /** * FETCHING GENÉRICO:
   * Consumimos el hook genérico pasando la página extraída de la URL.
   */
  const { data } = useGenericPagination(
    "episodes", // Cambiado a 'episodes' para consistencia con la caché
    getAllEpisodesUI,
    { page: currentPage }
  );

  /** * MANEJADOR DE EVENTO:
   * Actualiza la URL y realiza el scroll. No necesitamos setFilters porque
   * el cambio en la URL dispara el nuevo renderizado con la página correcta.
   */
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams);

    if (newPage > 1) {
      params.set("page", newPage.toString());
    } else {
      params.delete("page"); // Limpiamos la URL si volvemos a la página 1
    }

    setSearchParams(params, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!data || data.results.length === 0)
    return <p className={classes.noResults}>No se encontraron episodios.</p>;

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Broadcast History</h2>

      <div className={classes.list}>
        {data.results.map((episode) => (
          <EpisodesCard key={episode.id} episode={episode} />
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
