import type { LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from '../main'
import { getAllCharactersUI } from "../config/dependencies"; // Tu caso de uso/servicio

export function charactersLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  
  // Extraemos los filtros de la URL para crear la Key idéntica
  const filters = {
    page: Number(url.searchParams.get("page")) || 1,
    name: url.searchParams.get("name") || "",
    status: url.searchParams.get("status") || "",
    species: url.searchParams.get("species") || ""
  };

  // Aprovechamos la caché: si ya están los datos, no hace fetch
  return queryClient.ensureQueryData({
    queryKey: ["characters", filters],
    queryFn: () => getAllCharactersUI(filters),
  });
}