import type{ Filters } from "../../shared/models";
import {getEpisodeImpl} from '../adapters'
import type{ GetEpisodeRepository } from "../models";


export const getSomeEpisodes =
  (GetEpisodeRepository: GetEpisodeRepository) => async (ids: number[]) => {
    return GetEpisodeRepository.getSomeEpisodes(ids);
  };

export const getAllEpisodes =
  (GetEpisodeRepository: GetEpisodeRepository) => async (filters: Filters) => {
    return GetEpisodeRepository.getAllEpisodes(filters);
  };

// --- EPISODIOS ---
export const getSomeEpisodesUI = getSomeEpisodes(getEpisodeImpl);
export const getAllEpisodesUI = getAllEpisodes(getEpisodeImpl);