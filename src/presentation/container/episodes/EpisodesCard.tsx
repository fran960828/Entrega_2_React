/** * COMPONENT: EpisodesCard
 * Representación visual de un episodio.
 * Gestiona favoritos y la apertura de modales de forma declarativa mediante la URL.
 * Permite que el estado "Ver Elenco" sea persistente y compartible.
 */

import { Heart, Calendar } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { EpisodeCharacters } from "./EpisodeCharacters";
import classes from "./EpisodesCard.module.css";
import type { EpisodeCardProps } from "../../models/models";

export const EpisodesCard = ({ episode }: EpisodeCardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites("favEpisodes", episode.id);

  /** * LÓGICA DE MODAL (URL STATE):
   * Verificamos si el ID de este episodio coincide con el parámetro 'showCast' en la URL.
   */
  const isOpen = searchParams.get("showCast") === episode.id.toString();

  const handleOpenModal = () => {
    // Sincroniza la URL: app/episodes?showCast=1
    setSearchParams({ ...Object.fromEntries(searchParams), showCast: episode.id.toString() });
  };

  const handleCloseModal = () => {
    // Limpia el parámetro para cerrar el modal
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("showCast");
    setSearchParams(newParams);
  };

  return (
    <article className={classes.card}>
      <div className={classes.episodeCode}>{episode.episode}</div>

      <div className={classes.mainInfo}>
        <h3 className={classes.title}>{episode.name}</h3>
        <div className={classes.airDate}>
          <Calendar size={14} />
          <span>{episode.air_date}</span>
        </div>
      </div>

      <div className={classes.actions}>
        <button className={classes.castBtn} onClick={handleOpenModal}>Ver Elenco</button>
        
        {/* Renderizado condicional basado en la URL */}
        {isOpen && (
          <EpisodeCharacters 
            characterUrls={episode.characters} 
            episodeName={episode.name} 
            onClose={handleCloseModal}
          />
        )}

        <button className={classes.favBtn} onClick={toggleFavorite}>
          <Heart 
            size={20}
            fill={isFavorite ? "#97ce4c" : "none"} 
            color={isFavorite ? "#97ce4c" : "#6b7280"} 
          />
        </button>
      </div>
    </article>
  );
};