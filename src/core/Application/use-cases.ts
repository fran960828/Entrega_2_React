/** * USE CASES: Character, Location & Episode
 * Orquestadores de lógica de negocio. 
 * Inyectan los repositorios (Ports) para desacoplar la aplicación de la infraestructura.
 */

import type { Filters } from "../domain/pagination";
import type { GetCharacterRepository, GetEpisodeRepository, GetLocationRepository } from "./ports";

export const getCharacter =
  (GetCharacterRepository: GetCharacterRepository) => async (id:number) => {
    return GetCharacterRepository.getCharacter(id);
  };

export const getSomeCharacters =
  (GetCharacterRepository: GetCharacterRepository) => async (ids:number[]) => {
    return GetCharacterRepository.getSomeCharacters(ids);
  };

export const getAllCharacter =
  (GetCharacterRepository: GetCharacterRepository) => async (filters:Filters) => {
    return GetCharacterRepository.getAllCharacters(filters);
  };

export const getAllLocations =
  (GetLocationRepository: GetLocationRepository) => async (page:number) => {
    return GetLocationRepository.getAllLocations(page);
  };

export const getSomeEpisodes =
  (GetEpisodeRepository: GetEpisodeRepository) => async (ids:number[]) => {
    return GetEpisodeRepository.getSomeEpisodes(ids);
  };

export const getAllEpisodes =
  (GetEpisodeRepository: GetEpisodeRepository) => async (page?:number) => {
    return GetEpisodeRepository.getAllEpisodes(page);
  };