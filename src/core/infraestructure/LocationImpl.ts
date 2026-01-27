import type { GetLocationRepository } from "../Application/ports";
import type { Location } from "../domain/location";
import type { Pagination } from "../domain/pagination";
import { httpClient, urls } from "./api";


export const getLocationImpl: GetLocationRepository = {
  getLocation: async (id) => {
    const dto = await httpClient.get<Location>(`${urls.locations}/${id}`);
    return dto;
  },
  getSomeLocations:async (ids) => {
      const dto = await httpClient.get<Location[]>(`${urls.locations}/${ids}`)
      return dto;
    },
  getAllLocations: async (page?:number) => {
    if (!page){
        page=1
      } 
      const params = new URLSearchParams();
      params.append('page', page.toString());
      ;
    
      const url = `${urls.characters}/?${params.toString()}`;
      return await httpClient.get<Pagination<Location>>(url);
  },
};