/** * COMPONENT: DashboardCard
 * Botón de navegación animado para el menú principal.
 * Gestiona una entrada secuencial personalizada mediante 'props' 
 * e implementa micro-interacciones para mejorar el feedback de usuario.
 */

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import classes from "./DashboardCard.module.css";
import type { DashboardCardProp } from "../../models/models";

export const DashboardCard = ({ to, label, delay }: DashboardCardProp) => {
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