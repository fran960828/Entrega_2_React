/** * PRESENTATION MODELS
 * Definición de contratos para las Props de los componentes.
 * Actúa como puente entre los modelos del Dominio y la capa de Visualización.
 */

import type { Character } from "../../core/domain/characters";
import type { Episode } from "../../core/domain/episodes";
import type { LocationModel } from "../../core/domain/location";

/** Props para la tarjeta individual de personaje */
export interface CharacterCardProps {
  character: Character;
}

/** Props para el sistema de filtrado en la lista de personajes */
export interface CharacterFilterProps {
  onFilterChange: (changes: { name?: string; status?: string; species?: string }) => void;
  initialValues: { name?: string; status?: string; species?: string };
}

/** Configuración de las tarjetas del Dashboard principal */
export interface DashboardCardProp {
  to: string;
  label: string;
  delay: number; // Tiempo para la animación de entrada
}

/** Props para el modal que muestra personajes de un episodio específico */
export interface EpisodeCharactersProps {
  characterUrls: string[];
  episodeName: string;
  onClose: () => void;
}
/** Props para el card de cada episodio */
export interface EpisodeCardProps {
  episode: Episode;
}

/** Lista genérica para la vista de favoritos */
export interface FavoriteListProps {
  title: string;
  items: any[]; // Puede contener Characters o Episodes
  type: "characters" | "episodes";
}
/** Props para el navLink de cada ruta del header */
export interface HeaderLinkProps {
  path: string;
  label: string;
  onClick?: () => void;
}
/** Props para el logo del header */
export interface HeaderLogoProps {
  path: string;
  image: string;
}
/** Props para el card de cada location */
export interface LocationCardProps {
  location: LocationModel;
}

/** Lista de residentes (siluetas/miniaturas) para Localizaciones o Episodios */
export interface ResidentListProps {
  residentUrls: string[];
}
/** Props para el componente de Paginación de los diferentes containers */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}