import { Link } from "react-router-dom";
import classes from "./HeaderLogo.module.css";

interface HeaderLogoProps {
  path: string;
  image: string;
}

export function HeaderLogo({ path, image }: HeaderLogoProps) {
  return (
    <Link to={path} className={classes.logoWrapper}>
      <img 
        src={image} 
        alt="Rick and Morty Explorer Logo" 
        className={classes.logoImage} 
      />
    </Link>
  );
}