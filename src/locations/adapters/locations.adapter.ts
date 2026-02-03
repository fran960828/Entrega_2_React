/** * INFRASTRUCTURE: LocationModel Repository Implementation
 * Implementación del contrato GetLocationRepository.
 * Gestiona la construcción de URLs y la comunicación con el httpClient.
 */

import type{ Filters, Pagination } from "../../shared/models";
import type{ LocationModel } from "../models/locations.model";
import type{ GetLocationRepository } from "../models/locations.repository";
import {httpClient,urls} from '../../shared/adapter/generic.adapter'


export const getLocationImpl: GetLocationRepository = {
  getAllLocations: async (filters: Filters) => {
    const params = new URLSearchParams();
    params.append("page", filters.page.toString());
    const url = `${urls.locations}/?${params.toString()}`;
    return await httpClient.get<Pagination<LocationModel>>(url);
  },
};