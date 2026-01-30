/** * COMPONENT: ErrorPage
 * Boundary de errores a nivel de ruta.
 * Captura, categoriza y muestra fallos de navegación o de carga de datos (Loaders).
 * Utiliza hooks de React Router para identificar el tipo de error (404, 503, 500).
 */

import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import classes from "./ErrorAlert.module.css";

export default function ErrorPage() {
  const error = useRouteError();
  
  // Configuración por defecto para errores inesperados (Fallback)
  let title = "Unexpected Error";
  let message = "Something went wrong in this dimension.";
  let code = "500";

  /** * Lógica de categorización:
   * Determina si el error es una respuesta controlada de la ruta (Response object)
   */
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      code = "404";
      title = "Dimension Not Found";
      message = "The portal you're trying to use doesn't lead anywhere. Rick must have messed with the coordinates.";
    } else if (error.status === 503) {
      code = "503";
      title = "Service Unavailable";
      message = "The Citadel's servers are down. Try again later.";
    }
  }

  return (
    <div className={classes.container}>
      <span className={classes.errorCode}>{code}</span>
      
      <div className={classes.content}>
        <div className={classes.portalError}>
          <AlertTriangle size={80} strokeWidth={1.5} />
        </div>

        <h1 className={classes.title}>{title}</h1>
        <p className={classes.message}>{message}</p>

        {/* Retorno seguro a la ruta raíz */}
        <Link to="/" className={classes.backButton}>
          <div  className="flex items-center gap-2">
            <Home size={18} />
            Back to Earth C-137
          </div>
        </Link>
      </div>
    </div>
  );
};