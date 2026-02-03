
import type{ Filters, Pagination } from "../../shared/models";
import type{ Character } from "./character.model";


export interface GetCharacterRepository {
  getCharacter: (id: number) => Promise<Character>;
  getSomeCharacters: (ids: number[]) => Promise<Character[]>;
  getAllCharacters: (filters: Filters) => Promise<Pagination<Character>>;
}