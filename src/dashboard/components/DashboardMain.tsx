/** * COMPONENT: DashboardMain
 * Elementos centrales de identidad del Dashboard.
 * Gestiona la aparición coreografiada del logotipo principal y el eslogan 
 * mediante transiciones de opacidad y desplazamiento vertical.
 */
import { motion } from "framer-motion"
import classes from "./DashboardMain.module.css"

export function DashboardMain(){
    return (
        <>     
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
        </>
    )
}