import { ChevronLeft, ChevronRight } from "lucide-react";
import classes from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  return (
    <div className={classes.paginationContainer}>
      <button 
        className={classes.navButton}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        <ChevronLeft size={20} />
        <span>Prev</span>
      </button>

      <div className={classes.pageInfo}>
        <span className={classes.currentPage}>{currentPage}</span> / {totalPages}
      </div>

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