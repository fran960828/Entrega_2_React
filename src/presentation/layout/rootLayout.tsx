import { Outlet } from "react-router-dom";
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
    </div>
  );
};