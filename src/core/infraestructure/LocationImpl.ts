/** * INFRASTRUCTURE: LocationModel Repository Implementation
 * Implementación del contrato GetLocationRepository.
 * Gestiona la construcción de URLs y la comunicación con el httpClient.
 */

import type { GetLocationRepository } from "../Application/ports";
import type { LocationModel } from "../domain/location";
import type { Filters, Pagination } from "../domain/pagination";
import { httpClient, urls } from "./api";

export const getLocationImpl: GetLocationRepository = {
  getAllLocations: async (filters: Filters) => {
    const params = new URLSearchParams();
    params.append("page", filters.page.toString());
    const url = `${urls.locations}/?${params.toString()}`;
    return await httpClient.get<Pagination<LocationModel>>(url);
  },
};
