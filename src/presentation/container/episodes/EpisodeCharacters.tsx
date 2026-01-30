/** * COMPONENT: EpisodeCharacters (Modal)
 * Interfaz de detalle para el elenco de un episodio.
 * Utiliza React Portals para desacoplar el renderizado del DOM principal.
 * Implementa gestión de accesibilidad (Escape key) y bloqueo de scroll global.
 */

import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { X, Users } from "lucide-react";
import { createPortal } from "react-dom";
import { getSomeCharactersUI } from "../../../config/dependencies";
import classes from "./EpisodeCharacters.module.css";
import type { EpisodeCharactersProps } from "../../models/models";

export const EpisodeCharacters = ({ characterUrls, episodeName, onClose }: EpisodeCharactersProps) => {
  // 1. Lógica de Negocio: Transformación de URLs en IDs para la Query
  const ids = characterUrls.map((url) => Number(url.split("/").pop()));

  const { data: characters, isLoading } = useQuery({
    queryKey: ["episode-characters", ids],
    queryFn: () => getSomeCharactersUI(ids),
    enabled: !!ids,
    staleTime: 1000 * 60 * 10, // Cache persistente por 10 minutos
  });

  /** * GESTIÓN DE SIDE-EFFECTS (UX):
   * Bloquea el scroll del fondo y escucha eventos de teclado para accesibilidad.
   */
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; 

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset"; 
    };
  }, [onClose]);

  // Normalización de datos para asegurar un iterable
  const charArray = Array.isArray(characters) ? characters : characters ? [characters] : [];

  /** * RENDERIZADO MEDIANTE PORTAL:
   * El modal se inyecta en 'modal-root' (fuera de <div id="root">)
   */
  return createPortal(
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        
        <header className={classes.header}>
          <div className={classes.titleGroup}>
            <Users className={classes.icon} size={20} />
            <div>
              <p className={classes.subtitle}>Characters in</p>
              <h3 className={classes.title}>{episodeName}</h3>
            </div>
          </div>
          <button className={classes.closeBtn} onClick={onClose} aria-label="Close modal">
            <X size={24} />
          </button>
        </header>

        <div className={classes.content}>
          {isLoading ? (
            <div className={classes.loading}>
              <div className={classes.spinner}></div>
              <p>Fetching cast...</p>
            </div>
          ) : (
            <div className={classes.grid}>
              {charArray.map((char) => (
                <Link key={char.id} to={`/characters/${char.id}`} onClick={onClose}>
                  <div className={classes.imgWrapper}>
                    <img src={char.image} alt={char.name} />
                  </div>
                  <span className={classes.charName}>{char.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")! 
  );
};