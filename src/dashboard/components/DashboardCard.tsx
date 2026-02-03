/** * COMPONENT: DashboardCard
 * Botón de navegación animado para el menú principal.
 * Gestiona una entrada secuencial personalizada mediante 'props' 
 * e implementa micro-interacciones para mejorar el feedback de usuario.
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import classes from "./DashboardCard.module.css";

interface Prop {
  to: string;
  label: string;
  delay: number; // Tiempo para la animación de entrada
}
export const DashboardCard = ({ to, label, delay }: Prop) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay }}
      whileHover={{ scale: 1.05 }}
      className={classes.cardWrapper}
    >
      <Link to={to} className={classes.link}>
        {label}
      </Link>
    </motion.div>
  );
};