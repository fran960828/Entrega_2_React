/** * COMPONENT: CharacterDetailHero
 * Sección principal de la vista de detalle.
 * Muestra la información biográfica clave mediante un sistema de rejilla de estadísticas
 * e integra el control de favoritos persistente.
 */

import { Dna, VenusAndMars, MapPin, Globe, Heart } from "lucide-react";
import classes from "./CharacterDetailHero.module.css";
import { useFavorites } from "../../../shared/hooks";
import type{ Character } from "../../models";


export const CharacterDetailHero:React.FC<{character:Character}> = ({character}) => {
  const {isFavorite,toggleFavorite}=useFavorites('favCharacters',character.id)

  return (
        <section className={classes.hero}>
          <div className={classes.imageContainer}>
            <img src={character.image} alt={character.name} className={classes.mainImage} />
            <div className={`${classes.statusBadge} ${classes[character.status.toLowerCase()]}`}>
              {character.status}
            </div>
          </div>

          <div className={classes.headerInfo}>
            <h1 className={classes.title}>
              <span>{character.name}</span>
              <button onClick={toggleFavorite} className={classes.favBtn}>
                <Heart fill={isFavorite ? "#ff4b4b" : "none"} />
              </button>
            </h1>
            
            <div className={classes.statsGrid}>
              <div className={classes.statCard}>
                <Dna className={classes.icon} />
                <div>
                  <label>Especie</label>
                  <p>{character.species}</p>
                </div>
              </div>
              <div className={classes.statCard}>
                <VenusAndMars className={classes.icon} />
                <div>
                  <label>Género</label>
                  <p>{character.gender}</p>
                </div>
              </div>
              <div className={classes.statCard}>
                <Globe className={classes.icon} />
                <div>
                  <label>Origen</label>
                  <p>{character.origin.name}</p>
                </div>
              </div>
              <div className={classes.statCard}>
                <MapPin className={classes.icon} />
                <div>
                  <label>Ubicación Actual</label>
                  <p>{character.location.name}</p>
                </div>
              </div>
            </div>
          </div>
        </section>   
  );
};