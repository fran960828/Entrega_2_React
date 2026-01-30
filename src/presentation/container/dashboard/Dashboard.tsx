/** * CONTAINER: Dashboard
 * Punto de entrada principal y experiencia inmersiva.
 * Orquestador de animaciones coordinadas mediante Framer Motion.
 * Gestiona el fondo cinemático y la rejilla de acceso a los módulos de la app.
 */

import { motion } from "framer-motion";
import { DashboardCard } from "./DashboardCard";
import classes from "./Dashboard.module.css";
import { DashboardBackground } from "./DashboardBackground";
import { DashboardMain } from "./DashboardMain";

export const Dashboard = () => {
  return (
    <div className={classes.container}>
      
      {/* CAPA 1: Portal animado y efectos visuales de profundidad */}
      <DashboardBackground />

      {/* CAPA 2: Interfaz de usuario y navegación */}
      <div className={classes.content}>
        
        {/* Título y elementos visuales centrales (Logo, texto de bienvenida) */}
        <DashboardMain />

        {/* CAPA 3: Rejilla de navegación con entrada secuencial (Staggered animation) */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className={classes.cardGrid}
        >
          {/** * Cada DashboardCard recibe un delay incremental para crear 
           * un efecto de "cascada" visual al cargar la página.
           */}
          <DashboardCard to="/characters" label="Characters" delay={1.5} />
          <DashboardCard to="/locations" label="Locations" delay={1.7} />
          <DashboardCard to="/episodes" label="Episodes" delay={1.9} />
          <DashboardCard to="/favorites" label="Favorites" delay={2.1} />
        </motion.div>
      </div>
    </div>
  );
};

