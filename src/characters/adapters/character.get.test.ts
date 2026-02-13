import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacterImpl } from './character.adapter';
import { httpClient } from '../../shared/adapter';

// 1. Mockeamos el archivo donde vive el httpClient
vi.mock('../../shared/adapter', async () => {
  // Importamos el resto de cosas (como las urls) de forma real
  const actual = await vi.importActual('../../shared/adapter');
  return {
    ...actual,
    httpClient: {
      get: vi.fn(), // De todo lo que importamos en actual, solo cambiamos la función get
    },
  };
});


describe('getCharacter()', () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
  });
  it('getCharacter debe devolver la url que incluya el id', async () => {
    // Arrange
    const mockData = 1
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getCharacterImpl.getCharacter(mockData);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/1'));
  });
  it('getCharacter debe devolver un resultado de objeto transformado correctamente', async () => {
    // Arrange
    const mockData = 1
    const mockResult={id:1,name:'Rick Sanchez'}
    vi.mocked(httpClient.get).mockResolvedValue(mockResult);
    // Act
    const result=await getCharacterImpl.getCharacter(mockData);

    // Assert
    expect(result).toMatchObject(mockResult);
  });
  it('getCharacter debe devolver un error 404 en caso de no encontrar un personaje', async () => {
     //arrange
     const mockData=1
    const mockError = { 
    status: 404, 
    message: 'Error from the Citadel: Not Found' 
  };
  // Le decimos al mock que falle con ese error
  vi.mocked(httpClient.get).mockRejectedValue(mockError);

  // 2. Act & 3. Assert: 
  await expect(getCharacterImpl.getCharacter(mockData))
    .rejects.toEqual(mockError);
  });
});