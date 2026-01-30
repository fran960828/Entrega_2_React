/** * COMPONENT: CharacterCard
 * Representación visual de un personaje.
 * Integra la gestión de favoritos y estados vitales dinámicos.
 * Utiliza composición de Link para navegación interna y Botones para acciones.
 */

import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import classes from "./CharacterCard.module.css";
import { useFavorites } from "../../hooks/useFavorites";
import type { CharacterCardProps } from "../../models/models";

export const CharacterCard = ({ character }: CharacterCardProps) => {
  /** Gestión de persistencia local mediante hook personalizado */
  const { isFavorite, toggleFavorite } = useFavorites("favCharacters", character.id);

  /** * LÓGICA DE ESTADO VITAL:
   * Mapeo de estilos CSS basado en el estado (Alive, Dead, Unknown) 
   */
  let statusClass: string;
  if (character.status === 'Alive') {
    statusClass = classes.alive;
  } else if (character.status === 'Dead') {
    statusClass = classes.dead;
  } else {
    statusClass = classes.unknown;
  }

  return (
    <article className={classes.card}>
      {/* Acción secundaria: Favoritos (Detiene propagación para no activar el Link) */}
      <button className={classes.favoriteBtn} onClick={toggleFavorite}>
        <Heart 
          size={18} 
          className={isFavorite ? classes.heartFilled : classes.heartEmpty} 
        />
      </button>

      {/* Acción principal: Navegación al detalle del personaje */}
      <Link to={`/characters/${character.id}`} className={classes.cardLink}>
        <div className={classes.imageContainer}>
          <img src={character.image} alt={character.name} className={classes.image} />
        </div>
        
        <div className={classes.info}>
          <div className={classes.statusContainer}>
            <span className={`${classes.statusCircle} ${statusClass}`}></span>
            <span>{`${character.status} - ${character.species}`}</span>
          </div>
          
          <h3 className={classes.name}>{character.name}</h3>
          
          <div className={classes.locationInfo}>
            <p className={classes.label}>Last known location:</p>
            <p className={classes.value}>{character.location.name}</p>
          </div>
        </div>
      </Link>
    </article>
  );
};