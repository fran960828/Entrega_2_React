/** * DOMAIN ENTITY: Character
 * Representa la estructura central de un personaje en el multiverso.
 */

interface OriginCharacter {
  name: string;
  link: string; // URL al recurso detallado
}

interface LocationCharacter extends OriginCharacter {}

export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  type: string;
  gender: string;
  origin: OriginCharacter;
  location: LocationCharacter;
  image: string;
  episode: string[]; // Lista de endpoints de episodios
  url: string;
  created: string; // Fecha en formato ISO
}



