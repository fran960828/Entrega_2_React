import { useQuery } from "@tanstack/react-query";
import { getAllLocationsUI } from "../../config/dependencies";

export const useLocations = (page?:number) => {
  return useQuery({
    queryKey: ['locations', page], // La caché se invalida automáticamente si cambian los filtros
    queryFn: () => getAllLocationsUI(page),
    staleTime: 1000 * 60 * 5, // Datos "frescos" por 5 minutos
  });
};