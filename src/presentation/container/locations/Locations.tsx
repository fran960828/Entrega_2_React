import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLocations } from "../../hooks/useLocations"; // Suponiendo que crearás este hook
import { LocationCard } from "./LocationCard";
import classes from "./Locations.module.css";
import { Pagination } from "../../components/Pagination";


export const Locations = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Inicializamos el estado leyendo la URL (solo al montar)
  const [filters, setFilters] = useState(Number(searchParams.get("page")) || 1, 
  );

  const { data, isLoading } = useLocations(filters);

  // 2. Sincronizamos la URL cuando cambie la página en el estado
  useEffect(() => {
    const currentURLPage = Number(searchParams.get("page")) || 1;

    // Solo actualizamos la URL si es diferente a nuestro estado
    if (filters !== currentURLPage) {
      const newParams = new URLSearchParams();
      if (filters > 1) {
        newParams.set("page", filters.toString());
      }
      setSearchParams(newParams, { replace: true });
    }
  }, [filters]); // Solo reacciona al cambio de página del estado

  const handlePageChange = (newPage: number) => {
    setFilters(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) return <p>Cargando dimensiones...</p>;
  if (!data || data.results.length === 0) return <p>No se encontraron dimensiones.</p>;

  return (
    <section className={classes.container}>
      {/* Título simple en lugar de filtros */}
      <h2 className={classes.title}>Explorar Dimensiones</h2>

      <div className={classes.grid}>
        {data.results.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>

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

