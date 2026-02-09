import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import classes from "./Modal.module.css";

interface Props {
  children: ReactNode;
  onClose: () => void;
  title?: string;
}

export const Modal = ({ children, onClose, title }: Props) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return createPortal(
    <div className={classes.overlay} onClick={onClose}>
      <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
        <header className={classes.header}>
          {title && <h3 className={classes.title}>{title}</h3>}
          <button className={classes.closeBtn} onClick={onClose}><X size={24} /></button>
        </header>
        <div className={classes.content}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")!
  );
};