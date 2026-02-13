import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCharacterImpl } from './character.adapter';
import { httpClient } from '../../shared/adapter';
import { Species, Status } from '../models';

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

describe('getAllCharacters', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); // Limpiamos los registros entre tests
  });

  it('getAllCharacters debería construir la URL correctamente con filtros de página', async () => {
    // Arrange
    const mockData = { info: { pages: 5 }, results: [] };
    const mockFilters = { page: 2 };

    // Configuramos el mock para que devuelva nuestros datos
    vi.mocked(httpClient.get).mockResolvedValue(mockData);

    // Act
    const result = await getCharacterImpl.getAllCharacters(mockFilters);

    // Assert
    // A. Verificamos que el resultado es el que esperamos
    expect(result).toEqual(mockData);

    // B. ¡CLAVE! Verificamos que se llamó a la URL correcta con los params
    // Debería contener '?page=2'
    expect(httpClient.get).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
    );
  });

  it('getAllCharacters debería incluir el nombre en la URL si se pasa como filtro', async () => {
    // Arrange
    const mockFilters = { page: 1, name: 'Rick',status:Status.dead,species:Species.human };
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getCharacterImpl.getAllCharacters(mockFilters);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(
        expect.stringContaining('name=Rick')
    );
    expect(httpClient.get).toHaveBeenCalledWith(
        expect.stringContaining('status=Dead')
    );
    expect(httpClient.get).toHaveBeenCalledWith(
        expect.stringContaining('species=Human')
    );
    
   
  });
  it('getAllCharacters no debería incluir el nombre en la URL si se pasa como string vacio', async () => {
    // Arrange
    const mockFilters = { page: 1, name: ''};
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getCharacterImpl.getAllCharacters(mockFilters);

    // Assert
    expect(httpClient.get).not.toHaveBeenCalledWith(expect.stringContaining('name=""'));
  
  });
  it('getAllCharacters debería devolver los valores correctos aunque se pase el nombre con espacios', async () => {
    // Arrange
    const mockFilters = { page: 1, name: 'Rick Sanchez'};
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getCharacterImpl.getAllCharacters(mockFilters);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('name=Rick+Sanchez'));
  
  });
  it('getAllCharacters debería devolver la url con page=1 cuando se pasa page=0', async () => {
    // Arrange
    const mockFilters = { page: 0};
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getCharacterImpl.getAllCharacters(mockFilters);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('page=1'))
  
  });
  
  it('getAllCharacters no debería devolver la url con un filtro no permitido', async () => {
    // Arrange
    const mockFilters = { page: 0,location:'Earth137'};
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getCharacterImpl.getAllCharacters(mockFilters);

    // Assert
    expect(httpClient.get).not.toHaveBeenCalledWith(expect.stringContaining('location=Earth137'))
  
  });
  it('getAllCharacters debería manejar el error 404 cuando no hay resultados para un filtro ', async () => {
    //arrange
    const mockFilters={ page: 1, name: 'PersonajeInexistente' }
    const mockError = { 
    status: 404, 
    message: 'Error from the Citadel: Not Found' 
  };
  // Le decimos al mock que falle con ese error
  vi.mocked(httpClient.get).mockRejectedValue(mockError);

  // 2. Act & 3. Assert: 
  await expect(getCharacterImpl.getAllCharacters(mockFilters))
    .rejects.toEqual(mockError);

  
  });
  it('getAllCharacters debería manejar el error 500 cuando hay un fallo en el servidor', async () => {
    //arrange
    const mockFilters={ page: 1 }
    const mockError = { 
    status: 500, 
    message: 'The Citadel is dark. (Network Error)' 
  };
  // Le decimos al mock que falle con ese error
  vi.mocked(httpClient.get).mockRejectedValue(mockError);

  // 2. Act & 3. Assert: 
  await expect(getCharacterImpl.getAllCharacters(mockFilters))
    .rejects.toEqual(mockError);
  });
});





