
import type{ Filters, Pagination } from "../../shared/models";
import type{ Episode } from "./episodes.model";



export interface GetEpisodeRepository {
  getSomeEpisodes: (ids: number[]) => Promise<Episode[]>;
  getAllEpisodes: (filters: Filters) => Promise<Pagination<Episode>>;
}