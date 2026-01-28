
import { Heart, Calendar } from "lucide-react";
import classes from "./EpisodesCard.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import type { Episode } from "../../../core/domain/episodes";
import { EpisodeCharacters } from "./EpisodeCharacters";
import { useSearchParams } from "react-router-dom";

export const EpisodesCard = ({ episode }: { episode: Episode }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isFavorite, toggleFavorite } = useFavorites("favEpisodes", episode.id);

  // Comprobamos si el ID de este episodio es el que está en la URL
  const isOpen = searchParams.get("showCast") === episode.id.toString();

  const handleOpenModal = () => {
    // Añadimos el ID del episodio a la URL
    setSearchParams({ ...Object.fromEntries(searchParams), showCast: episode.id.toString() });
  };

  const handleCloseModal = () => {
    // Eliminamos el parámetro para cerrar
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
            className={isFavorite ? 'heartFilled':'heartEmpty'}
            fill={isFavorite ? "#97ce4c" : "none"} 
            color={isFavorite ? "#97ce4c" : "#6b7280"} 
          />
        </button>
      </div>
    </article>
  );
};