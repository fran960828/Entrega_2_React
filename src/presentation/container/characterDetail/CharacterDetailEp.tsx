/** * COMPONENT: CharacterDetailEp
 * Listado de apariciones para la vista de detalle.
 * Encapsula la lógica visual de carga y renderizado de episodios vinculados 
 * a un personaje específico, promoviendo la reutilización de 'EpisodesCard'.
 */

import { Tv } from "lucide-react";
import { EpisodesCard } from "../episodes/EpisodesCard"; // Reutilizamos tu componente
import classes from "./CharacterDetailEp.module.css";
import type { Episode } from "../../../core/domain/episodes";


export const CharacterDetailEp:React.FC<{episodesArray:Episode[]}> = ({episodesArray}) => {
  
  return (
        <section className={classes.appearances}>
          <h2 className={classes.sectionTitle}>
            <Tv size={24} /> Registro de Apariciones
          </h2>
            <div className={classes.episodesList}>
              {episodesArray.map((ep) => (
                <EpisodesCard key={ep.id} episode={ep} />
              ))}
            </div>
          
        </section>
      
  );
};