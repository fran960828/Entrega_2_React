import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpClient } from '../../shared/adapter';
import { getLocationImpl } from './locations.adapter';


// 1. Mockeamos el archivo donde vive el httpClient
vi.mock('../../shared/adapter/generic.adapter', async () => {
  // Importamos el resto de cosas (como las urls) de forma real
  const actual = await vi.importActual('../../shared/adapter/generic.adapter');
  return {
    ...actual,
    httpClient: {
      get: vi.fn(), // De todo lo que importamos en actual, solo cambiamos la función get
    },
  };
});

describe('getAllLocations', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); // Limpiamos los registros entre tests
  });

  it('getAllLocations debería construir la URL correctamente con el fitro de page', async () => {
    // Arrange
    const mockData = { info: { pages: 2 }, results: [] };
    const mockFilters = { page: 2 };

    // Configuramos el mock para que devuelva nuestros datos
    vi.mocked(httpClient.get).mockResolvedValue(mockData);

    // Act
    const result = await getLocationImpl.getAllLocations(mockFilters);

    // Assert
    // A. Verificamos que el resultado es el que esperamos
    expect(result).toMatchObject(mockData);

    // B. ¡CLAVE! Verificamos que se llamó a la URL correcta con los params
    // Debería contener '?page=2'
    expect(httpClient.get).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
    );
  });
 

  it('getAllLocations debería devolver la url con page=1 cuando se pasa page=0', async () => {
    // Arrange
    const mockFilters = { page: 0};
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getLocationImpl.getAllLocations(mockFilters);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('page=1'))
  
  });
 
 
  it('getAllLocations debería manejar el error 500 cuando hay un fallo en el servidor', async () => {
    //arrange
    const mockFilters={ page: 1 }
    const mockError = { 
    status: 500, 
    message: 'The Citadel is dark. (Network Error)' 
  };
  // Le decimos al mock que falle con ese error
  vi.mocked(httpClient.get).mockRejectedValue(mockError);

  // 2. Act & 3. Assert: 
  await expect(getLocationImpl.getAllLocations(mockFilters))
    .rejects.toEqual(mockError);
  });
 
});





