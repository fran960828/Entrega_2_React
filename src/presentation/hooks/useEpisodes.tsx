import { useQuery } from "@tanstack/react-query";
import { getAllEpisodesUI } from "../../config/dependencies";

export const useEpisodes = (page?:number) => {
  return useQuery({
    queryKey: ['episodes', page], // La caché se invalida automáticamente si cambian los filtros
    queryFn: () => getAllEpisodesUI(page),
    staleTime: 1000 * 60 * 5, // Datos "frescos" por 5 minutos
  });
};