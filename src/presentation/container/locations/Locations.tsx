/** * CONTAINER: Locations
 * Orquestador del módulo de ubicaciones y dimensiones.
 * Implementa el patrón de sincronización de estado con URL (Search Params)
 * para garantizar que la navegación por páginas sea persistente y compartible.
 */

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocations } from "../../hooks/useLocations";
import { LocationCard } from "./LocationCard";
import classes from "./Locations.module.css";
import { Pagination } from "../../components/Pagination";

export const Locations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  /** * ESTADO INICIAL: 
   * Hidratación desde la URL para soportar recargas de página (F5) 
   * en una página específica.
   */
  const [filters, setFilters] = useState(Number(searchParams.get("page")) || 1);

  const { data } = useLocations(filters);

  const handlePageChange = (newPage: number) => {
    setFilters(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Feedback visual de cambio de sección
  };

    /** * SINCRONIZACIÓN DE URL:
   * Refleja el estado local en los parámetros de búsqueda del navegador.
   * 'replace: true' evita que cada cambio de página genere una nueva entrada
   * en el historial de navegación "atrás".
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

  if (!data || data.results.length === 0) return <p>No se encontraron dimensiones.</p>;

  return (
    <section className={classes.container}>
      <h2 className={classes.title}>Explorar Dimensiones</h2>

      {/* RENDERIZADO EN CUADRÍCULA: 
          Las ubicaciones se presentan en un layout de Grid para facilitar 
          el escaneo rápido de nombres y tipos.
      */}
      <div className={classes.grid}>
        {data.results.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

      {/* CONTROL DE NAVEGACIÓN: 
          Delegación de la lógica visual al componente común Pagination.
      */}
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

