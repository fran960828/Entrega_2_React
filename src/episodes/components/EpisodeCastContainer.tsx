// src/modules/episodes/components/EpisodeCastContainer.tsx
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getSomeCharactersUI } from "../../characters/services";
import { getEpisodeUI } from "../services"; // Necesitarás crear este servicio
import classes from "./EpisodeCastContainer.module.css";

export const EpisodeCastContainer = ({
  episodeId,
  onClose,
}: {
  episodeId: number;
  onClose: () => void;
}) => {
  // 1. Primero obtenemos el episodio para tener las URLs de los personajes
  const { data: episode, isLoading: isEpLoading } = useQuery({
    queryKey: ["episode", episodeId],
    queryFn: () => getEpisodeUI(episodeId),
  });

  const characterUrls = episode?.characters || [];
  const ids = characterUrls.map((url) => Number(url.split("/").pop()));

  // 2. Obtenemos los personajes
  const { data: characters, isLoading: isCharsLoading } = useQuery({
    queryKey: ["episode-characters", ids],
    queryFn: () => getSomeCharactersUI(ids),
    enabled: ids.length > 0,
  });

  if (isEpLoading || isCharsLoading)
    return <div className={classes.loading}>Fetching cast...</div>;

  const charArray = Array.isArray(characters)
    ? characters
    : characters
    ? [characters]
    : [];

  return (
    <div className={classes.grid}>
      {charArray.map((char) => (
        <Link
          key={char.id}
          to={`/characters/${char.id}`}
          onClick={onClose}
          className={classes.charLink}
        >
          <div className={classes.imgWrapper}>
            <img src={char.image} alt={char.name} />
          </div>
          <span className={classes.charName}>{char.name}</span>
        </Link>
      ))}
    </div>
  );
};
