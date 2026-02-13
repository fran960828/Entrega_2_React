

import { describe, it, expect, vi, afterEach } from 'vitest';
import { httpClient} from './generic.adapter';


describe('httpClient', () => {
  // Limpiamos los mocks antes de cada test para evitar efectos secundarios
  afterEach(() => {
    vi.unstubAllGlobals()
    vi.restoreAllMocks();
  });

  it('debería realizar una petición GET exitosa y parsear el JSON correctamente', async () => {
    // Arrange
    const mockData = { id: 1, name: 'Rick Sanchez' };
    const mockResponse = {
      ok: true,
      text: async () => JSON.stringify(mockData), // Simulamos el método .text() que usas
    } as Response;

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    // Act
    const result = await httpClient.get('https://rickandmortyapi.com/api');

    // Asserts
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalledWith('https://rickandmortyapi.com/api');
  });

  it('debería manejar respuestas vacías sin fallar (retornar undefined/null)', async () => {
    // Arrange
    const mockResponse = {
      ok: true,
      text: async () => "", 
    } as Response;

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    // Act
    const result = await httpClient.get('https://api.empty');

    // Assert
    expect(result).toBeFalsy(); 
  });

  it('debería lanzar un objeto de error personalizado si la respuesta no es ok', async () => {
    // Arrange
    const mockResponse = {
      ok: false,
      status: 404,
      statusText: 'Not Found',
    } as Response;

    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(mockResponse));

    
    try {
      //act
      await httpClient.get('https://api.error');
      // assert
      expect(true).toBe(false);
    } catch (error: any) {
      
      expect(error).toEqual({
        status: 404,
        message: 'Error from the Citadel: Not Found',
      });
    }
  });
  it('debería devolver un error 500 normalizado si fetch falla por red', async () => {
    // arrange
  const mockData={
      status: 500,
      message: "The Citadel is dark. (Network Error)",
    }
  vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network Fail')));

  try {
  // act
    await httpClient.get('https://api.down');
  } catch (error: any) {
  // asserts
    expect(error).toEqual(mockData);
  }
});
});




