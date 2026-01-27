import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import classes from "./CharacterFilter.module.css";

interface CharacterFilterProps {
  // Pasamos una función que recibe los cambios parciales del filtro
  onFilterChange: (changes: { name?: string; status?: string; species?: string }) => void;
  initialValues: { name?: string; status?: string; species?: string };
}

export function CharacterFilter({ onFilterChange, initialValues }: CharacterFilterProps) {
  const [searchTerm, setSearchTerm] = useState(initialValues.name || "");

  // Lógica de Debouncing para el nombre
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ name: searchTerm });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

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