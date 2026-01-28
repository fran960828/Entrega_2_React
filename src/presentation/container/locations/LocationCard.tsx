import type { LocationModel } from "../../../core/domain/location";
import classes from "./LocationCard.module.css";
import { ResidentList } from "./LocationResident";

interface LocationCardProps {
  location: LocationModel;
}

export const LocationCard = ({ location }: LocationCardProps) => {
  // Placeholder para la imagen de la locación, ya que la API no las proporciona directamente
  // Podrías mapear tipos a iconos o imágenes si tuvieras una fuente.
  console.log(location)
  const getPlaceholderIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "planet": return "🪐";
      case "space station": return "🛰️";
      case "cluster": return "✨";
      case "dream": return "💭";
      default: return "🌍"; // Icono por defecto
    }
  };

  return (
    <div className={classes.card}>
      <div className={classes.imagePlaceholder}>
        {getPlaceholderIcon(location.type)}
      </div>
      <div className={classes.info}>
        <div>
          <h3 className={classes.name}>{location.name}</h3>
          
          <p className={classes.label}>Type:</p>
          <p className={classes.value}>{location.type || 'Unknown'}</p>
        </div>
        
        <div>
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