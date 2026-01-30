/** * COMPONENT: HeaderLink
 * Enlace de navegación inteligente.
 * Utiliza el estado de la ruta para aplicar estilos de "activo" automáticamente
 * y gestiona el cierre de menús mediante callbacks.
 */

import { NavLink } from "react-router-dom";
import classes from "./HeaderLink.module.css";
import type { HeaderLinkProps } from "../../models/models";

export function HeaderLink({ path, label, onClick }: HeaderLinkProps) {
  return (
    <NavLink
      to={path}
      onClick={onClick} // Crucial para cerrar el menú responsive en el Header
      /** * La función de className recibe 'isActive' de React Router.
       * Esto evita gestionar el estado de "página actual" manualmente.
       */
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""}`
      }
    >
      {label}
    </NavLink>
  );
}