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

describe('getSomeCharacters()', () => {
    beforeEach(() => {
    vi.clearAllMocks(); 
    });
  it('getSomeCharacters debe devolver varios numeros separados por comas', async () => {
    // Arrange
    const mockData = [1,2,3,4]
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getCharacterImpl.getSomeCharacters(mockData);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('1,2,3,4'));
  });
  it('getSomeCharacters no debe devolver numeros repetidos', async () => {
    // Arrange
    const mockData = [1,2,2,4]
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getCharacterImpl.getSomeCharacters(mockData);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('1,2,4'));
  });
  it('getSomeCharacters no debe devolver nada si no se la pasa ningun valor', async () => {
    // Arrange
    const mockData = [] as any
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getCharacterImpl.getSomeCharacters(mockData);

    // Assert
    expect(httpClient.get).not.toHaveBeenCalled();
  });
});
