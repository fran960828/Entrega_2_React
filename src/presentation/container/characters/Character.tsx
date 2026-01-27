
import type { Filters } from "../../../core/domain/pagination";
import { useCharacters } from "../../hooks/useCharacters";
import { CharacterCard } from "./CharacterCard";
import classes from "./Character.module.css"; 
import { CharacterFilter } from "./CharacterFilter";
import { useEffect, useState } from "react";
import { Pagination } from "../../components/Pagination";
import { useSearchParams } from "react-router-dom";



export const Character = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Inicializamos el estado leyendo de la URL (importante para el F5)
  const [filters, setFilters] = useState<Filters>({
    page: Number(searchParams.get("page")) || 1,
    name: searchParams.get("name") || "",
    status: searchParams.get("status") || "",
    species: searchParams.get("species") || ""
  });

  const { data} = useCharacters(filters);

  // --- EL TRUCO MÁGICO ---
  // Cada vez que 'filters' cambie (por el buscador o paginación), actualizamos la URL
  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.page > 1) params.page = filters.page.toString();
    if (filters.name) params.name = filters.name;
    if (filters.status) params.status = filters.status;
    if (filters.species) params.species = filters.species;
    
    setSearchParams(params, { replace: true }); // 'replace' evita llenar el historial de "atrás" con cada letra
  }, [filters, setSearchParams]);

  const handleUpdateFilters = (newChanges: Partial<Filters>) => {
    setFilters((prev) => ({
      ...prev,
      ...newChanges,
      page: 1 // Siempre que filtramos volvemos a la página 1
    }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
    // Opcional: Hacer scroll hacia arriba al cambiar de página
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
    
  let content;

  if (data){
    content=
    <div className={classes.grid}>    
        {data.results.map((i) => (
          <CharacterCard key={i.id} character={i} />
        ))}
      </div>
  }
  return (
    <section className={classes.container}>
      {/* Aquí irá el componente de filtros más adelante */}
      <div className={classes.filter}>
        <CharacterFilter 
        onFilterChange={handleUpdateFilters} 
        initialValues={{ name: filters.name, status: filters.status, species: filters.species }} 
      />
      </div>
      {content}
      {/* Aquí irá la paginación más adelante */}
      <div >{data && (
        <Pagination 
          currentPage={filters.page} 
          totalPages={data.info.pages} 
          onPageChange={handlePageChange} 
        />
      )}</div>
    </section>
  );
};
 