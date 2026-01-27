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

  export const getLocation =
  (GetLocationRepository: GetLocationRepository) => async (id:number) => {
    return GetLocationRepository.getLocation(id);
  };

export const getSomeLocations =
  (GetLocationRepository: GetLocationRepository) => async (ids:number[]) => {
    return GetLocationRepository.getSomeLocations(ids);
  };

export const getAllLocations =
  (GetLocationRepository: GetLocationRepository) => async (page?:number) => {
    return GetLocationRepository.getAllLocations(page);
  };

    export const getEpisode =
  (GetEpisodeRepository: GetEpisodeRepository) => async (id:number) => {
    return GetEpisodeRepository.getEpisode(id);
  };

export const getSomeEpisodes =
  (GetEpisodeRepository: GetEpisodeRepository) => async (ids:number[]) => {
    return GetEpisodeRepository.getSomeEpisodes(ids);
  };

export const getAllEpisodes =
  (GetEpisodeRepository: GetEpisodeRepository) => async (page?:number) => {
    return GetEpisodeRepository.getAllEpisodes(page);
  };