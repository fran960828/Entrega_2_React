/** * COMPONENT: LocationCard (Refactorizado con Assets Visuales)
 * Representación detallada de una ubicación.
 * Mapea el tipo de dimensión a imágenes personalizadas de alta fidelidad 
 * almacenadas localmente para una experiencia visual inmersiva.
 */

import type { LocationCardProps } from "../../models/models";
import classes from "./LocationCard.module.css";
import { ResidentList } from "./LocationResident";

export const LocationCard = ({ location }: LocationCardProps) => {
  /** * MAPEO DE ASSETS DINÁMICOS:
   * Selecciona la ruta de la imagen en /public basándose en el tipo de localización.
   */
  const getPlaceholderImage = (type: string) => {
    const typeKey = type.toLowerCase();
    
    if (typeKey.includes("planet")) return "/planet.png";
    if (typeKey.includes("space station")) return "/space_station.png";
    if (typeKey.includes("cluster")) return "/cluster.png";
    if (typeKey.includes("dream")) return "/dream.png";
    
    return "/default.png"; // Fallback para tipos desconocidos o vacíos
  };

  return (
    <div className={classes.card}>
      {/* Contenedor de Imagen: Sustitución de emoji por img HTML */}
      <div className={classes.imageContainer}>
        <img 
          src={getPlaceholderImage(location.type)} 
          alt={location.type} 
          className={classes.locationImage}
          loading="lazy" // Optimización de carga para listas largas
        />
      </div>

      <div className={classes.info}>
        <div className={classes.header}>
          <h3 className={classes.name}>{location.name}</h3>
          <span className={classes.typeTag}>{location.type || 'Unknown'}</span>
        </div>
        
        <div className={classes.detailRow}>
          <p className={classes.label}>Dimension:</p>
          <p className={classes.value}>{location.dimension || 'Unknown'}</p>
        </div>

        <div className={classes.residentSection}>
          {location.residents.length > 0 ? (
            <ResidentList residentUrls={location.residents} />
          ) : (
            <p className={classes.noResidents}>No residents found</p>
          )}
        </div>
      </div>
    </div>
  );
};