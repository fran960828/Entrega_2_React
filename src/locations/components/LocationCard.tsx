/** * COMPONENT: LocationCard (Refactorizado con Assets Visuales)
 * Representación detallada de una ubicación.
 * Mapea el tipo de dimensión a imágenes personalizadas de alta fidelidad 
 * almacenadas localmente para una experiencia visual inmersiva.
 */

import type{ LocationModel } from "../models/locations.model";
import classes from "./LocationCard.module.css";
import { LocationResident } from "./LocationResident";
export interface Props {
  location: LocationModel;
}

export const LocationCard = ({ location }: Props) => {
  /** * MAPEO DE ASSETS DINÁMICOS:
   * Selecciona la ruta de la imagen en /public basándose en el tipo de localización.
   */
  const getPlaceholderImage = (type: string) => {
    const typeKey = type.toLowerCase();
    
    if (typeKey.includes("planet")) return `${import.meta.env.BASE_URL}planet.png`;
    if (typeKey.includes("space station")) return `${import.meta.env.BASE_URL}space_station.png`;
    if (typeKey.includes("cluster")) return `${import.meta.env.BASE_URL}cluster.png`;
    if (typeKey.includes("dream")) return `${import.meta.env.BASE_URL}dream.png`;
    
    return `${import.meta.env.BASE_URL}default.png`; // Fallback para tipos desconocidos o vacíos
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
            <LocationResident residentUrls={location.residents} />
          ) : (
            <p className={classes.noResidents}>No residents found</p>
          )}
        </div>
      </div>
    </div>
  );
};