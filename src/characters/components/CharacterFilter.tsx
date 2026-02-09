/** * COMPONENT: CharacterFilter
 * Barra de herramientas para el filtrado de personajes.
 * Implementa Debouncing para la búsqueda de texto y actualización inmediata para selectores.
 */

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import classes from "./CharacterFilter.module.css";
import {Status,Species} from '../models'

interface Props {
  onFilterChange: (changes: { name?: string; status?: string; species?: string }) => void;
  initialValues: { name?: string; status?: string; species?: string };
}

export function CharacterFilter({ onFilterChange, initialValues }: Props) {
  const [searchTerm, setSearchTerm] = useState(initialValues.name || "");

  /** Gestión de cambios inmediatos en desplegables (Status / Species) */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

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
          <option value="alive">{Status.alive}</option>
          <option value="dead">{Status.dead}</option>
          <option value="unknown">{Status.unknown}</option>
        </select>
      </div>

      <div className={classes.selectGroup}>
        <select name="species" className={classes.select} onChange={handleSelectChange}>
          <option value="">ALL SPECIES</option>
          <option value="human">{Species.human}</option>
          <option value="alien">{Species.alien}</option>
          <option value="humanoid">{Species.humanoid}</option>
        </select>
      </div>
    </div>
  );
}