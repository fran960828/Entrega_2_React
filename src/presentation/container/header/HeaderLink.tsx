import { NavLink } from "react-router-dom";
import classes from "./HeaderLink.module.css";

interface HeaderLinkProps {
  path: string;
  label: string;
  onClick?: () => void;
}

export function HeaderLink({ path, label, onClick }: HeaderLinkProps) {
  return (
    <NavLink
      to={path}
      onClick={onClick}
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""}`
      }
    >
      {label}
    </NavLink>
  );
}