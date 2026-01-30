/** * COMPONENT: ResidentList
 * Visualizador de avatares de residentes por ubicación.
 * Implementa una estrategia de carga parcial (top 5) para optimizar el 
 * ancho de banda y mejorar el rendimiento de renderizado en listas largas.
 */

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getSomeCharactersUI } from "../../../config/dependencies";
import classes from "./LocationResident.module.css";
import type { ResidentListProps } from "../../models/models";

export const ResidentList = ({ residentUrls }: ResidentListProps) => {
  /** * OPTIMIZACIÓN DE DATOS: 
   * Limitamos el procesamiento a los primeros 5 residentes para mantener
   * la interfaz limpia y las peticiones a la API bajo control.
   */
  const ids = residentUrls
    .slice(0, 5)
    .map((url) => Number(url.split("/").pop()))

  const { data: residents, isLoading } = useQuery({
    queryKey: ["residents", ids],
    queryFn: () => getSomeCharactersUI(ids),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 10, // Los datos se consideran frescos durante 10 min
  });

  if (isLoading) return <div className={classes.skeleton}></div>;
  if (!residents) return null;

  // Normalización: Maneja la respuesta inconsistente de la API (Objeto vs Array)
  const residentsArray = Array.isArray(residents) ? residents : [residents];

  return (
    <div className={classes.container}>
      <p className={classes.label}>Residents:</p>
      <div className={classes.list}>
        {residentsArray.map((resident) => (
          <Link 
            key={resident.id} 
            to={`/characters/${resident.id}`} 
            className={classes.avatarLink}
            title={resident.name} // Tooltip nativo para accesibilidad
          >
            <img src={resident.image} alt={resident.name} className={classes.avatarImg} />
          </Link>
        ))}
        
        {/* INDICADOR DE EXCESO: 
            Muestra cuántos residentes adicionales existen sin sobrecargar el DOM.
        */}
        {residentUrls.length > 5 && (
          <div className={classes.extra}>
            +{residentUrls.length - 5}
          </div>
        )}
      </div>
    </div>
  );
};