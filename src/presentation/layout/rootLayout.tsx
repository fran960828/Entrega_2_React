/** * LAYOUT: RootLayout
 * Estructura base de la aplicación.
 * Define el contenedor principal, el Header persistente y la gestión global de scroll.
 */

import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "../container/header/Header";
import classes from "./RootLayout.module.css";

export const RootLayout = () => {
  return (
    <div className={classes.appContainer}>
      <Header />

      <main className={classes.mainContent}>
        <Outlet />
      </main>

      {/* Este div añade ese toque de profundidad verde neón en el fondo */}
      <div className={classes.ambientGlow} />
      <ScrollRestoration/>
    </div>
  );
};