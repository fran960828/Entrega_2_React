/** * CONTAINER: Character
 * Orquestador de la lógica de búsqueda, filtrado y paginación.
 * Implementa el patrón "URL as Truth": sincroniza el estado local con los 
 * parámetros de búsqueda para permitir navegación persistente y compartir enlaces.
 */

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
  
  // Inicializamos el estado leyendo de la URL 
  const [filters, setFilters] = useState<Filters>({
    page: Number(searchParams.get("page")) || 1,
    name: searchParams.get("name") || "",
    status: searchParams.get("status") || "",
    species: searchParams.get("species") || ""
  });

  const {data} = useCharacters(filters);

  
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
  // Función que maneja el cambio de pagina
  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
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
      <div className={classes.filter}>
        <CharacterFilter 
        onFilterChange={handleUpdateFilters} 
        initialValues={{ name: filters.name, status: filters.status, species: filters.species }} 
      />
      </div>
      {content}
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
 