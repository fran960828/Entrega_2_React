import type{ Filters } from "../../shared/models";
import { getCharacterImpl } from "../adapters";
import type{ GetCharacterRepository } from "../models";


const getCharacter =
  (GetCharacterRepository: GetCharacterRepository) => async (id: number) => {
    return GetCharacterRepository.getCharacter(id);
  };

const getSomeCharacters =
  (GetCharacterRepository: GetCharacterRepository) => async (ids: number[]) => {
    return GetCharacterRepository.getSomeCharacters(ids);
  };

const getAllCharacter =
  (GetCharacterRepository: GetCharacterRepository) =>
  async (filters: Filters) => {
    return GetCharacterRepository.getAllCharacters(filters);
  };


export const getCharacterUI = getCharacter(getCharacterImpl);
export const getSomeCharactersUI = getSomeCharacters(getCharacterImpl);
export const getAllCharactersUI = getAllCharacter(getCharacterImpl);