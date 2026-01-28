import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { AlertTriangle, Home } from "lucide-react";
import classes from "./ErrorAlert.module.css";

export default function ErrorPage (){
  const error = useRouteError();
  let title = "Unexpected Error";
  let message = "Something went wrong in this dimension.";
  let code = "500";

  // Verificamos si es un error de respuesta de React Router (como un 404)
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

        <Link to="/" className={classes.backButton}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Home size={18} />
            Back to Earth C-137
          </div>
        </Link>
      </div>
    </div>
  );
};