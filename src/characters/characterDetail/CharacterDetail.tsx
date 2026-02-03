/** * CONTAINER: CharacterDetail
 * Gestiona la vista detallada de un personaje y su historial de episodios.
 * Implementa el patrón de "Queries Dependientes" para sincronizar la carga de
 * información de múltiples entidades relacionadas.
 */

import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import classes from "./CharacterDetail.module.css";
import { CharacterDetailEp, CharacterDetailHero } from "./components";
import { getCharacterUI } from "../services";
import { getSomeEpisodesUI } from "../../episodes/services";


export const CharacterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  /** * QUERY 1: Obtención del personaje.
   * Se activa automáticamente al detectar el ID en la URL.
   */
  const { data: character } = useQuery({
    queryKey: ["character", id],
    queryFn: () => getCharacterUI(Number(id!)),
    enabled: !!id,
  });

  /** * QUERY 2: Queries Dependientes.
   * Procesa las URLs de episodios del personaje para extraer los IDs.
   * 'enabled: !!episodeIds' asegura que esta query no se ejecute hasta que 
   * la Query 1 haya finalizado con éxito.
   */
  const episodeIds = character?.episode.map((url: string) => Number(url.split("/").pop()));
  
  const { data: episodes } = useQuery({
    queryKey: ["character-episodes", episodeIds],
    queryFn: () => getSomeEpisodesUI(episodeIds!),
    enabled: !!episodeIds,
  });

  if (!character) return <p>Personaje no encontrado.</p>;

  // Normalización de datos: La API devuelve objeto si es 1 o Array si son varios
  const episodesArray = Array.isArray(episodes) ? episodes : episodes ? [episodes] : [];

  return (
    <div className={classes.container}>
      {/* Background dinámico: Genera cohesión visual usando la imagen del personaje */}
      <div className={classes.backgroundBlur} style={{ backgroundImage: `url(${character.image})` }} />

      <button onClick={() => navigate(-1)} className={classes.backBtn}>
        <ArrowLeft size={20} /> Volver al listado
      </button>

      <main className={classes.mainContent}>
        {/* Desglose de responsabilidades en componentes atómicos */}
        <CharacterDetailHero character={character}/>
        <CharacterDetailEp episodesArray={episodesArray}/ >
      </main>
    </div>
  );
};