import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getSomeCharactersUI } from "../../../config/dependencies";
import classes from "./LocationResident.module.css";

interface ResidentListProps {
  residentUrls: string[];
}

export const ResidentList = ({ residentUrls }: ResidentListProps) => {
  // Extraemos los IDs de los primeros 5 residentes
  const ids = residentUrls
    .slice(0, 5)
    .map((url) => Number(url.split("/").pop()))
    

  // Solo hacemos la petición si hay IDs
  const { data: residents, isLoading } = useQuery({
    queryKey: ["residents", ids],
    queryFn: () => getSomeCharactersUI(ids),
    enabled: ids.length > 0,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div className={classes.skeleton}></div>;
  if (!residents) return null;

  // La API devuelve un objeto si es uno, o un array si son varios. 
  // Normalizamos a array para el map.
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
            title={resident.name}
          >
            <img src={resident.image} alt={resident.name} className={classes.avatarImg} />
          </Link>
        ))}
        {residentUrls.length > 5 && (
          <div className={classes.extra}>
            +{residentUrls.length - 5}
          </div>
        )}
      </div>
    </div>
  );
};