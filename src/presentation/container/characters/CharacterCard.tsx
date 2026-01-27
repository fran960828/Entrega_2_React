import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react"; // Recuerda tener instalada lucide-react
import type { Character } from "../../../core/domain/characters";
import classes from "./CharacterCard.module.css";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Lógica de favoritos (LocalStorage)
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setIsFavorite(favorites.some((favId: number) => favId === character.id));
  }, [character.id]);

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Evita que el Link navegue al pulsar el corazón
    e.stopPropagation();

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let newFavorites;

    if (isFavorite) {
      newFavorites = favorites.filter((favId: number) => favId !== character.id);
    } else {
      newFavorites = [...favorites, character.id];
    }

    localStorage.setItem("favorites", JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  // Tu lógica original de estados (la mantengo intacta)
  let status: string;
  if (character.status === 'Alive') {
    status = classes.alive;
  } else if (character.status === 'Dead') {
    status = classes.dead;
  } else {
    status = classes.unknown;
  }

  return (
    <article className={classes.card}>
      {/* Botón de Favorito */}
      <button className={classes.favoriteBtn} onClick={toggleFavorite}>
        <Heart 
          size={18} 
          className={isFavorite ? classes.heartFilled : classes.heartEmpty} 
        />
      </button>

      {/* Envolvemos el contenido en un Link */}
      <Link to={`/characters/${character.id}`} className={classes.cardLink}>
        <div className={classes.imageContainer}>
          <img src={character.image} alt={character.name} className={classes.image} />
        </div>
        <div className={classes.info}>
          <div className={classes.statusContainer}>
            <span className={`${classes.statusCircle} ${status}`}></span>
            <span>{`${character.status} - ${character.species}`}</span>
          </div>
          <h3 className={classes.name}>{character.name}</h3>
          
          <div>
            <p className={classes.label}>Last known location:</p>
            <p className={classes.value}>{character.location.name}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};