/** * COMPONENT: DashboardBackground
 * Elemento decorativo cinemático con lógica de animación dual.
 * 1. Entrada: Efecto de "Portal Opening" mediante escalado y rotación inicial.
 * 2. Loop: Rotación infinita del anillo del portal para dinamismo visual.
 */

import { motion } from "framer-motion"
import classes from "./DashboardBackground.module.css"

export function DashboardBackground(){
    return (
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
    )
}