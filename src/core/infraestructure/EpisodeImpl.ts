import type { GetEpisodeRepository } from "../Application/ports";
import type { Episode } from "../domain/episodes";
import type { Pagination } from "../domain/pagination";
import { httpClient, urls } from "./api";


export const getEpisodeImpl: GetEpisodeRepository = {
  getEpisode: async (id) => {
    const dto = await httpClient.get<Episode>(`${urls.episodes}/${id}`);
    return dto;
  },
  getSomeEpisodes:async (ids) => {
      const dto = await httpClient.get<Episode[]>(`${urls.episodes}/${ids}`)
      return dto;
    },
  getAllEpisodes: async (page?:number) => { 
      if (!page){
        page=1
      } 
      const params = new URLSearchParams();
      params.append('page', page.toString());
      ;
      const url = `${urls.characters}/?${params.toString()}`;
      return await httpClient.get<Pagination<Episode>>(url);
  },
};