import type{ Filters } from "../../shared/models";
import { getLocationImpl } from "../adapters/locations.adapter";
import type{ GetLocationRepository } from "../models/locations.repository";

export const getAllLocations =
  (GetLocationsRepository: GetLocationRepository) =>
  async (filters: Filters) => {
    return GetLocationsRepository.getAllLocations(filters);
  };


// --- UBICACIONES ---
// Refactorizado para asegurar que recibe el objeto { page } y lo pasa al caso de uso
export const getAllLocationsUI = getAllLocations(getLocationImpl);