/** * LOADER: Characters
 * Estrategia de Prefetching: Sincroniza los parámetros de la URL con la caché de React Query.
 * Asegura que los datos estén listos en el QueryClient antes de renderizar la vista.
 */

import { queryClient } from "../main";
import { getSomeCharactersUI, getSomeEpisodesUI } from "../config/dependencies";

export async function favoritesLoader() {
  const favcharIds = JSON.parse(localStorage.getItem("favCharacters") || "[]").join(",");
  const favEpisodesIds = JSON.parse(localStorage.getItem("favEpisodes") || "[]").join(",");

  // Ejecutamos ambas peticiones en paralelo para optimizar
  const prefetchPromises = [];

  if (favcharIds) {
    prefetchPromises.push(
      queryClient.ensureQueryData({
        queryKey: ["fav-characters-data", favcharIds],
        queryFn: () => getSomeCharactersUI(favcharIds),
      })
    );
  }

  if (favEpisodesIds) {
    prefetchPromises.push(
      queryClient.ensureQueryData({
        queryKey: ["fav-episodes-data", favEpisodesIds],
        queryFn: () => getSomeEpisodesUI(favEpisodesIds),
      })
    );
  }

  await Promise.all(prefetchPromises);
  return { favcharIds, favEpisodesIds };
}