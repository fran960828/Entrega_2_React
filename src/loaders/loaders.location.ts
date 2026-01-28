import type { LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from '../main'
import { getAllLocationsUI } from "../config/dependencies"; // Tu caso de uso/servicio


export function locationsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // Extraemos los filtros de la URL para crear la Key idéntica
  const filters = {
    page: Number(url.searchParams.get("page")) || 1,
  };

  // Aprovechamos la caché: si ya están los datos, no hace fetch
  return queryClient.ensureQueryData({
    queryKey: ["locations", filters.page],
    queryFn: () => getAllLocationsUI(filters.page),
  });
}