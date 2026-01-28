import type { Character } from "../domain/characters";
import type { Episode } from "../domain/episodes";
import type { LocationModel } from "../domain/location";
import type { Filters, Pagination } from "../domain/pagination";

export interface GetCharacterRepository {
  getCharacter: (id: number) => Promise<Character>;
  getSomeCharacters:(ids:number[])=> Promise<Character[]>;
  getAllCharacters: (filters:Filters) => Promise<Pagination<Character>>;
}

export interface GetLocationRepository {
  getLocation: (id: number) => Promise<LocationModel>;
  getSomeLocations:(ids:number[])=> Promise<LocationModel[]>;
  getAllLocations: (page:number) => Promise<Pagination<LocationModel>>;
}

export interface GetEpisodeRepository {
  getEpisode: (id: number) => Promise<Episode>;
  getSomeEpisodes:(ids:number[])=> Promise<Episode[]>;
  getAllEpisodes: (page?:number) => Promise<Pagination<Episode>>;
}
