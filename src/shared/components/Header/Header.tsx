/** * CONTAINER: Header
 * Orquestador de la navegación global y control del estado responsive.
 * Gestiona la apertura/cierre del menú móvil y la coordinación de los enlaces.
 */

import classes from "./Header.module.css";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { HeaderLink, HeaderLogo } from "./components";


export function Header() {
  /** Estado local para el menú desplegable en dispositivos móviles */
  const [isOpen, setIsOpen] = useState(false);

  function handleMenu() {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }

  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <HeaderLogo path="/" image="/logo.png" />

        {/* Botón interactivo: cambia el icono según el estado 'isOpen' */}
        <button className={classes.burger} onClick={handleMenu}>
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        {/* Navegación: aplica clases dinámicas para la animación del menú móvil */}
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