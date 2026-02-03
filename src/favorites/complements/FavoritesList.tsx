/** * COMPONENT: FavoritesList
 * Renderizador polimórfico para colecciones de favoritos.
 * Aplica diferentes layouts (Grid vs List) y selecciona el componente 
 * de tarjeta adecuado según el tipo de entidad proporcionado.
 */

import classes from "./FavoritesList.module.css";
import {CharacterCard} from "../../characters/components"
import {EpisodesCard} from "../../episodes/components"
import type{ Episode } from "../../episodes/models";
import type{ Character } from "../../characters/models";
interface Props {
  title: string;
  items: Episode[]|Character[]; // Puede contener Characters o Episodes
  type: "characters" | "episodes";
}

export const FavoritesList = ({ title, items, type }: Props) => {
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
            ? <CharacterCard key={item.id} character={item as Character} />
            : <EpisodesCard key={item.id} episode={item as Episode} />
        ))}
      </div>
    </section>
  );
};