import classes from "./Header.module.css";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderLink } from "./HeaderLink";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  function handleMenu (){
    setIsOpen((prevIsOpen)=>!prevIsOpen)
  }
  

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <HeaderLogo path="/" image="/logo.png" />

        <button className={classes.burger} onClick={handleMenu}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <nav className={`${classes.nav} ${isOpen ? classes.navActive : ""}`}>
          <HeaderLink path="/characters" label="Characters" onClick={() => setIsOpen(false)} />
          <HeaderLink path="/locations" label="Locations" onClick={() => setIsOpen(false)} />
          <HeaderLink path="/episodes" label="Episodes" onClick={() => setIsOpen(false)} />
          <HeaderLink path="/favorites" label="Favorites" onClick={() => setIsOpen(false)} />
        </nav>
      </div>
    </header>
  );
}