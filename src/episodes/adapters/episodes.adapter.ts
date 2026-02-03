/** * INFRASTRUCTURE: Episode Repository Implementation
 * Implementación del contrato GetEpisodeRepository.
 * Gestiona la construcción de URLs y la comunicación con el httpClient.
 */

import { httpClient, urls } from "../../shared/adapter";
import type { Filters, Pagination } from "../../shared/models";
import type { Episode, GetEpisodeRepository } from "../models";

export const getEpisodeImpl: GetEpisodeRepository = {
  getEpisode: async (id) => {
    const dto = await httpClient.get<Episode>(`${urls.episodes}/${id}`);
    return dto;
  },
  getSomeEpisodes: async (ids) => {
    const dto = await httpClient.get<Episode[]>(`${urls.episodes}/${ids}`);
    return dto;
  },
  getAllEpisodes: async (filters: Filters) => {
    const params = new URLSearchParams();
    params.append("page", filters.page.toString());
    const url = `${urls.episodes}/?${params.toString()}`;
    return await httpClient.get<Pagination<Episode>>(url);
  },
};
