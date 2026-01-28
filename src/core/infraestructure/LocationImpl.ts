import type { GetLocationRepository } from "../Application/ports";
import type { LocationModel } from "../domain/location";
import type { Pagination } from "../domain/pagination";
import { httpClient, urls } from "./api";


export const getLocationImpl: GetLocationRepository = {
  getLocation: async (id) => {
    const dto = await httpClient.get<LocationModel>(`${urls.locations}/${id}`);
    return dto;
  },
  getSomeLocations:async (ids) => {
      const dto = await httpClient.get<LocationModel[]>(`${urls.locations}/${ids}`)
      return dto;
    },
  getAllLocations: async (page:number) => {
      const params = new URLSearchParams();
      params.append('page', page.toString());
      const url = `${urls.locations}/?${params.toString()}`;
      return await httpClient.get<Pagination<LocationModel>>(url);
  },
};