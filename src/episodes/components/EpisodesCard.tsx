// src/modules/episodes/components/EpisodesCard.tsx
import { Heart, Calendar } from "lucide-react";
import { useModal } from "../../shared/components/Modal/context";
import { useFavorites } from "../../shared/hooks/useFavorites";
import classes from "./EpisodesCard.module.css";
import type { Episode } from "../models";

export const EpisodesCard = ({ episode }: { episode: Episode }) => {
  const { openModal } = useModal();
  const { isFavorite, toggleFavorite } = useFavorites(
    "favEpisodes",
    episode.id
  );

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
        {/* Simplemente pasamos el ID al contexto global */}
        <button
          className={classes.castBtn}
          onClick={() => openModal(episode.id)}
        >
          Ver Elenco
        </button>

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
