/** * COMPONENT: EmptyFavorites
 * Estado de cortesía para colecciones vacías.
 * Proporciona feedback visual cuando no hay datos persistidos y 
 * guía al usuario de vuelta al flujo principal de la aplicación.
 */

import { Link } from "react-router-dom";
import { Ghost } from "lucide-react";
import classes from "./EmptyFavorites.module.css";

export const EmptyFavorites = () => {
  return (
    <div className={classes.container}>
      {/* Iconografía semántica para reforzar el concepto de "vacío" */}
      <Ghost size={80} className={classes.icon} />
      
      <h2 className={classes.title}>¿Dimensiones vacías?</h2>
      
      <p className={classes.text}>
        Parece que tu pistola de portales no ha guardado ninguna ubicación ni personaje todavía.
      </p>

      {/* CTA (Call to Action): Re-engaging del usuario */}
      <Link to="/characters" className={classes.link}>
        Explorar el Multiverso
      </Link>
    </div>
  );
};