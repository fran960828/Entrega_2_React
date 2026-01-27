import { motion } from "framer-motion";
import { DashboardCard } from "./DashboardCard";
import classes from "./Dashboard.module.css";

export const Dashboard = () => {
  return (
    <div className={classes.container}>
      
      {/* --- PORTAL ANIMADO (FONDO) --- */}
      <motion.div 
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={classes.portalWrapper}
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={classes.portalRing}
        />
      </motion.div>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <div className={classes.content}>
        <motion.img 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          src="/logo.png" 
          alt="Rick and Morty Logo" 
          className={classes.logo}
        />

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className={classes.subtitle}
        >
          Multiverse Explorer Dashboard
        </motion.p>

        {/* --- BOTONES DE ACCIÓN --- */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className={classes.cardGrid}
        >
          <DashboardCard to="/characters" label="Characters" delay={1.5} />
          <DashboardCard to="/locations" label="Locations" delay={1.7} />
          <DashboardCard to="/episodes" label="Episodes" delay={1.9} />
          <DashboardCard to="/favorites" label="Favorites" delay={2.1} />
        </motion.div>
      </div>
    </div>
  );
};

