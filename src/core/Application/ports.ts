/** * PORTS: Repositories
 * Definición de contratos para el acceso a datos.
 * Actúan como puentes entre la lógica de negocio y la infraestructura (API).
 */

import type { Character } from "../domain/characters";
import type { Episode } from "../domain/episodes";
import type { LocationModel } from "../domain/location";
import type { Filters, Pagination } from "../domain/pagination";

export interface GetCharacterRepository {
  getCharacter: (id: number) => Promise<Character>;
  getSomeCharacters: (ids: number[]) => Promise<Character[]>;
  getAllCharacters: (filters: Filters) => Promise<Pagination<Character>>;
}

export interface GetLocationRepository {
  getAllLocations: (filters: Filters) => Promise<Pagination<LocationModel>>;
}

export interface GetEpisodeRepository {
  getSomeEpisodes: (ids: number[]) => Promise<Episode[]>;
  getAllEpisodes: (filters: Filters) => Promise<Pagination<Episode>>;
}
