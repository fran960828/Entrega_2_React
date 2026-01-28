import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { X, Users } from "lucide-react";
import { createPortal } from "react-dom";
import { getSomeCharactersUI } from "../../../config/dependencies";
import classes from "./EpisodeCharacters.module.css";

interface EpisodeCharactersProps {
  characterUrls: string[];
  episodeName: string;
  onClose: () => void;
}

export const EpisodeCharacters = ({ characterUrls, episodeName, onClose }: EpisodeCharactersProps) => {
  // 1. Extraer IDs y fetch de datos
  const ids = characterUrls.map((url) => Number(url.split("/").pop()));

  const { data: characters, isLoading } = useQuery({
    queryKey: ["episode-characters", ids],
    queryFn: () => getSomeCharactersUI(ids),
    enabled: !!ids,
    staleTime: 1000 * 60 * 10,
  });

  // 2. Manejo de tecla ESC y scroll del body
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden"; // Bloquear scroll al abrir

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset"; // Liberar scroll al cerrar
    };
  }, [onClose]);

  const charArray = Array.isArray(characters) ? characters : characters ? [characters] : [];

  // Renderizado mediante Portal
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
                <Link 
                  key={char.id} 
                  to={`/characters/${char.id}`} 
                  className={classes.charCard}
                  onClick={onClose} // Cerrar al seleccionar
                >
                  <div className={classes.imgWrapper}>
                    <img src={char.image} alt={char.name} />
                  </div>
                  <span className={classes.charName}>{char.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        
        <footer className={classes.footer}>
          Total members: {characterUrls.length}
        </footer>
      </div>
    </div>,
    document.getElementById("modal-root")! // Asegúrate de tener este id en tu index.html
  );
};