/** * DOMAIN ENTITY: Character
 * Representa la estructura central de un personaje en el multiverso.
 */
export enum Status{
alive='Alive',
dead='Dead',
unknown='Unknown'
}

export enum Species {
  human='Human',
  alien='Alien',
  humanoid='Humanoid'
}


interface OriginCharacter {
  name: string;
  link: string; // URL al recurso detallado
}

interface LocationCharacter {
   name: string;
  link: string; // URL al recurso detallado
}

export interface Character {
  id: number;
  name: string;
  status: Status;
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