/** * COMPONENT: CharacterFilter
 * Barra de herramientas para el filtrado de personajes.
 * Implementa Debouncing para la búsqueda de texto y actualización inmediata para selectores.
 */

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import classes from "./CharacterFilter.module.css";
import type { CharacterFilterProps } from "../../models/models";

export function CharacterFilter({ onFilterChange, initialValues }: CharacterFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialValues.name || "");

  /** * LÓGICA DE DEBOUNCING:
   * Retrasa la ejecución de 'onFilterChange' 500ms tras la última pulsación.
   * Esto evita disparar una petición a la API por cada letra escrita.
   */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ name: searchTerm });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  /** Gestión de cambios inmediatos en desplegables (Status / Species) */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className={classes.filterBar}>
      <div className={classes.searchGroup}>
        <Search size={18} className={classes.searchIcon} />
        <input
          type="text"
          className={classes.input}
          placeholder="SEARCH CHARACTERS..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Selectores de filtrado categórico */}
      <div className={classes.selectGroup}>
        <select name="status" className={classes.select} onChange={handleSelectChange}>
          <option value="">ALL STATUS</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className={classes.selectGroup}>
        <select name="species" className={classes.select} onChange={handleSelectChange}>
          <option value="">ALL SPECIES</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="humanoid">Humanoid</option>
        </select>
      </div>
    </div>
  );
}