/** * COMPONENT: FavoritesList
 * Renderizador polimórfico para colecciones de favoritos.
 * Aplica diferentes layouts (Grid vs List) y selecciona el componente 
 * de tarjeta adecuado según el tipo de entidad proporcionado.
 */

import type { FavoriteListProps } from "../../models/models";
import { CharacterCard } from "../characters/CharacterCard";
import { EpisodesCard } from "../episodes/EpisodesCard";
import classes from "./FavoritesList.module.css";

export const FavoritesList = ({ title, items, type }: FavoriteListProps) => {
  /** * GUARD CLAUSE: 
   * Si no hay elementos en esta categoría, el componente se desmonta 
   * para mantener una interfaz limpia.
   */
  if (items.length === 0) return null; 

  return (
    <section className={classes.section}>
      <h2 className={classes.sectionTitle}>{title}</h2>
      {/* LAYOUT DINÁMICO: 
          - Grid para personajes (tarjetas visuales).
          - List para episodios (formato horizontal).
      */}
      <div className={type === "characters" ? classes.grid : classes.list}>
        {items.map((item) => (
          type === "characters" 
            ? <CharacterCard key={item.id} character={item} />
            : <EpisodesCard key={item.id} episode={item} />
        ))}
      </div>
    </section>
  );
};