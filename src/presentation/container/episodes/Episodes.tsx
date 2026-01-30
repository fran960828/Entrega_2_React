/** * CONTAINER: Episodes
 * Orquestador del listado de episodios y gestión de paginación.
 * Sincroniza el estado de navegación con la URL para permitir 
 * el guardado de posición en el historial del navegador.
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EpisodesCard } from "./EpisodesCard";
import classes from "./Episodes.module.css";
import { Pagination } from "../../components/Pagination";
import { useEpisodes } from "../../hooks/useEpisodes";

export const Episodes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** * ESTADO INICIAL: 
   * Se hidrata desde la URL para mantener la consistencia tras un refresco (F5).
   */
  const [filters, setFilters] = useState(Number(searchParams.get("page")) || 1);

  const { data } = useEpisodes(filters);

  /** * EFECTO DE SINCRONIZACIÓN:
   * Mantiene la URL actualizada con el estado local de paginación.
   * Utiliza 'replace: true' para no saturar el historial con cada cambio de página.
   */
  useEffect(() => {
    const currentURLPage = Number(searchParams.get("page")) || 1;

    if (filters !== currentURLPage) {
      const newParams = new URLSearchParams();
      if (filters > 1) {
        newParams.set("page", filters.toString());
      }
      setSearchParams(newParams, { replace: true });
    }
  }, [filters]);

  const handlePageChange = (newPage: number) => {
    setFilters(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Mejora de UX: scroll automático al inicio
  };

  if (!data || data.results.length === 0) return <p>No se encontraron dimensiones.</p>;

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Broadcast History</h2>
    
      <div className={classes.list}>
        {data.results.map((episode) => (
          <EpisodesCard key={episode.id} episode={episode} />
        ))}
      </div>
    
      {/* PAGINACIÓN: Solo se renderiza si existen metadatos de info de la API */}
      {data.info && (
        <Pagination
          currentPage={filters}
          totalPages={data.info.pages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};

