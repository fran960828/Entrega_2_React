/** * COMPONENT: HeaderLogo
 * Componente de identidad de marca.
 * Proporciona un punto de acceso rápido a la ruta raíz (Home) 
 * y encapsula el tratamiento visual del logotipo.
 */

import { Link } from "react-router-dom";
import classes from "./HeaderLogo.module.css";
import type { HeaderLogoProps } from "../../models/models";

export function HeaderLogo({ path, image }: HeaderLogoProps) {
  return (
    <Link to={path} className={classes.logoWrapper}>
      <img 
        src={image} 
        alt="Rick and Morty Explorer Logo" 
        className={classes.logoImage} 
      />
    </Link>
  );
}