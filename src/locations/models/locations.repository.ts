import type{ Filters, Pagination } from "../../shared/models";
import type{LocationModel} from './locations.model'


export interface GetLocationRepository {
  getAllLocations: (filters:Filters ) => Promise<Pagination<LocationModel>>;
}