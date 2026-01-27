import { useQuery } from "@tanstack/react-query";
import type { Filters } from "../../core/domain/pagination";
import { getAllCharactersUI } from "../../config/dependencies";

export const useCharacters = (filters: Filters) => {
  return useQuery({
    queryKey: ['characters', filters], // La caché se invalida automáticamente si cambian los filtros
    queryFn: () => getAllCharactersUI(filters),
    staleTime: 1000 * 60 * 5, // Datos "frescos" por 5 minutos
  });
};