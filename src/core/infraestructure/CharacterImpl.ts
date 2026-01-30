/** * INFRASTRUCTURE: Character Repository Implementation
 * Implementación del contrato GetCharacterRepository.
 * Gestiona la construcción de URLs y la comunicación con el httpClient.
 */


import type { GetCharacterRepository } from "../Application/ports";
import type { Character } from "../domain/characters";
import type { Pagination } from "../domain/pagination";
import { httpClient, urls } from "./api";


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
