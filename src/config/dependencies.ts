import { getAllCharacter, getAllEpisodes, getAllLocations, getCharacter, getEpisode, getLocation, getSomeCharacters, getSomeEpisodes, getSomeLocations } from "../core/Application/use-cases";
import { getCharacterImpl } from "../core/infraestructure/CharacterImpl";
import { getEpisodeImpl } from "../core/infraestructure/EpisodeImpl";
import { getLocationImpl } from "../core/infraestructure/LocationImpl";

export const getCharacterUI = getCharacter(getCharacterImpl);
export const getSomeCharactersUI=getSomeCharacters(getCharacterImpl)
export const getAllCharactersUI = getAllCharacter(getCharacterImpl);
export const getLocationUI = getLocation(getLocationImpl);
export const getSomeLocationsUI=getSomeLocations(getLocationImpl)
export const getAllLocationsUI = getAllLocations(getLocationImpl);
export const getEpisodeUI = getEpisode(getEpisodeImpl);
export const getSomeEpisodesUI=getSomeEpisodes(getEpisodeImpl)
export const getAllEpisodesUI = getAllEpisodes(getEpisodeImpl);
