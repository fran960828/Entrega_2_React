/** * COMPONENT: Pagination
 * Componente representacional para el control de navegación.
 * Gestiona estados de habilitación de botones y comunica cambios de página 
 * mediante un callback descendente.
 */

import { ChevronLeft, ChevronRight } from "lucide-react";
import classes from "./Pagination.module.css";
import type { PaginationProps } from "../models/models";

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className={classes.paginationContainer}>
      {/* Botón de retroceso: se deshabilita automáticamente en la página 1 */}
      <button 
        className={classes.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size={20} />
        <span>Prev</span>
      </button>

      {/* Indicador visual de progreso */}
      <div className={classes.pageInfo}>
        <span className={classes.currentPage}>{currentPage}</span> / {totalPages}
      </div>

      {/* Botón de avance: se deshabilita al alcanzar el límite de páginas de la API */}
      <button 
        className={classes.navButton}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        <span>Next</span>
        <ChevronRight size={20} />
      </button>
    </div>
  );
};