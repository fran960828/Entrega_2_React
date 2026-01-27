import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import classes from "./DashboardCard.module.css";

interface DashboardCardProp {
  to: string;
  label: string;
  delay: number;
}

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