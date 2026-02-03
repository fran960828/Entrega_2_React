import { httpClient, urls } from "../../shared/adapter";
import type{ Pagination } from "../../shared/models";
import type{ Character, GetCharacterRepository } from "../models";


export const getCharacterImpl: GetCharacterRepository = {
  getCharacter: async (id) => {
    const dto = await httpClient.get<Character>(`${urls.characters}/${id}`);
    return dto;
  },
  getSomeCharacters:async (ids) => {
    const dto = await httpClient.get<Character[]>(`${urls.characters}/${ids}`)
    return dto;
  },
  getAllCharacters: async (filters) => {
    const { page = 1, name, status, species } = filters;
  const params = new URLSearchParams();
  params.append('page', page.toString());
  if (name) params.append('name', name);
  if (status) params.append('status', status);
  if (species) params.append('species', species);

  const url = `${urls.characters}/?${params.toString()}`;
  return await httpClient.get<Pagination<Character>>(url);
  },
};