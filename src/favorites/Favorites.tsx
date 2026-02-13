/** * CONTAINER: Favorites
 * Gestiona la visualización de elementos persistidos por el usuario.
 * Implementa sincronización reactiva con LocalStorage y orquestación de 
 * peticiones masivas mediante TanStack Query.
 */


import { getSomeCharactersUI } from "../characters/services";
import { getSomeEpisodesUI } from "../episodes/services";
import { FavoritesList } from "./complements/FavoritesList";
import classes from "./Favorites.module.css";
import { EmptyFavorites } from "./complements/EmptyFavorites";
import { useEffect, useState } from "react";
import { useByIds } from "../shared/hooks/useByIds";

export const Favorites = () => {
  /** * ESTADO REACTIVO: 
   * Guardamos los IDs como strings separados por comas para optimizar 
   * las dependencias de la QueryKey.
   */
  const [localIds, setLocalIds] = useState({
    favCharIds: JSON.parse(localStorage.getItem("favCharacters") || "[]").join(","),
    favEpisodeIds: JSON.parse(localStorage.getItem("favEpisodes") || "[]").join(",")
  });

  /** * FETCHING MASIVO: 
   * Las queries solo se ejecutan si existen IDs almacenados ('enabled').
   */
  
  const {data:charData}=useByIds('fav-characters-data',localIds.favCharIds,getSomeCharactersUI)
  const {data:episodeData}=useByIds('fav-episodes-data',localIds.favEpisodeIds,getSomeEpisodesUI)

  // Normalización de datos para asegurar el renderizado de listas
  const characters = Array.isArray(charData) ? charData : charData ? [charData] : [];
  const episodes = Array.isArray(episodeData) ? episodeData : episodeData ? [episodeData] : [];

 /** * ESCUCHA DE EVENTOS GLOBALES:
   * Permite que la lista se actualice si el usuario modifica favoritos 
   * desde cualquier otro componente de la aplicación.
   */
  useEffect(() => {
    const handleSync = () => {
      setLocalIds({
        favCharIds: JSON.parse(localStorage.getItem("favCharacters") || "[]").join(","),
        favEpisodeIds: JSON.parse(localStorage.getItem("favEpisodes") || "[]").join(",")
      });
    };

    window.addEventListener("storage", handleSync);
    return () => window.removeEventListener("storage", handleSync);
  }, []);

  // Estado de error/vacío: UX amigable para colecciones vacías
  if (characters.length === 0 && episodes.length === 0) {
    return <EmptyFavorites />;
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.mainTitle}>Tu Colección Intergaláctica</h1>
      
      <FavoritesList title="Personajes Favoritos" items={characters} type="characters" />
      <FavoritesList title="Episodios Guardados" items={episodes} type="episodes" />
    </div>
  );
};
