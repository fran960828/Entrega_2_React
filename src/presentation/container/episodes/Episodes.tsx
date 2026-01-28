import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { EpisodesCard } from "./EpisodesCard";
import classes from "./Episodes.module.css";
import { Pagination } from "../../components/Pagination";
import { useEpisodes } from "../../hooks/useEpisodes";


export const Episodes = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1. Inicializamos el estado leyendo la URL (solo al montar)
  const [filters, setFilters] = useState(Number(searchParams.get("page")) || 1, 
  );

  const { data, isLoading } = useEpisodes(filters);

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
  <h2 className={classes.title}>Broadcast History</h2>
  
  <div className={classes.list}>
    {data.results.map((episode) => (
      <EpisodesCard key={episode.id} episode={episode} />
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

