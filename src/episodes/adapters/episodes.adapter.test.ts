import { describe, it, expect, vi, beforeEach } from 'vitest';
import { httpClient } from '../../shared/adapter';
import { getEpisodeImpl } from './episodes.adapter';


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

describe('getAllEpisodes', () => {
  
  beforeEach(() => {
    vi.clearAllMocks(); // Limpiamos los registros entre tests
  });

  it('getAllEpisodes debería construir la URL correctamente con el fitro de page', async () => {
    // Arrange
    const mockData = { info: { pages: 2 }, results: [] };
    const mockFilters = { page: 2 };

    // Configuramos el mock para que devuelva nuestros datos
    vi.mocked(httpClient.get).mockResolvedValue(mockData);

    // Act
    const result = await getEpisodeImpl.getAllEpisodes(mockFilters);

    // Assert
    // A. Verificamos que el resultado es el que esperamos
    expect(result).toMatchObject(mockData);

    // B. ¡CLAVE! Verificamos que se llamó a la URL correcta con los params
    // Debería contener '?page=2'
    expect(httpClient.get).toHaveBeenCalledWith(
        expect.stringContaining('page=2')
    );
  });
 

  it('getAllEpisodes debería devolver la url con page=1 cuando se pasa page=0', async () => {
    // Arrange
    const mockFilters = { page: 0};
    vi.mocked(httpClient.get).mockResolvedValue({ results: [] });

    // Act
    await getEpisodeImpl.getAllEpisodes(mockFilters);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('page=1'))
  
  });
 
 
  it('getAllEpisodes debería manejar el error 500 cuando hay un fallo en el servidor', async () => {
    //arrange
    const mockFilters={ page: 1 }
    const mockError = { 
    status: 500, 
    message: 'The Citadel is dark. (Network Error)' 
  };
  // Le decimos al mock que falle con ese error
  vi.mocked(httpClient.get).mockRejectedValue(mockError);

  // 2. Act & 3. Assert: 
  await expect(getEpisodeImpl.getAllEpisodes(mockFilters))
    .rejects.toEqual(mockError);
  });
 
});

describe('getSomeEpisodes()', () => {
    beforeEach(() => {
    vi.clearAllMocks(); 
    });
  it('getSomeEpisodes debe devolver varios numeros separados por comas', async () => {
    // Arrange
    const mockData = [1,2,3,4]
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getEpisodeImpl.getSomeEpisodes(mockData);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('1,2,3,4'));
  });
  it('getSomeEpisodes no debe devolver numeros repetidos', async () => {
    // Arrange
    const mockData = [1,2,2,4]
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getEpisodeImpl.getSomeEpisodes(mockData);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('1,2,4'));
  });
  it('getSomeEpisodes no debe devolver nada si no se la pasa ningun valor', async () => {
    // Arrange
    const mockData = [] as any
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getEpisodeImpl.getSomeEpisodes(mockData);

    // Assert
    expect(httpClient.get).not.toHaveBeenCalled();
  });
});

describe('getEpisode()', () => {
  beforeEach(() => {
    vi.clearAllMocks(); 
  });
  it('getEpisode debe devolver la url que incluya el id', async () => {
    // Arrange
    const mockData = 1
    vi.mocked(httpClient.get).mockResolvedValue(mockData);
    // Act
    await getEpisodeImpl.getEpisode(mockData);

    // Assert
    expect(httpClient.get).toHaveBeenCalledWith(expect.stringContaining('/1'));
  });
  it('getEpisode debe devolver un resultado de objeto transformado correctamente', async () => {
    // Arrange
    const mockData = 1
    const mockResult={id:1,name:'Rick Sanchez'}
    vi.mocked(httpClient.get).mockResolvedValue(mockResult);
    // Act
    const result=await getEpisodeImpl.getEpisode(mockData);

    // Assert
    expect(result).toMatchObject(mockResult);
  });
  it('getEpisode debe devolver un error 404 en caso de no encontrar un personaje', async () => {
     //arrange
     const mockData=1
    const mockError = { 
    status: 404, 
    message: 'Error from the Citadel: Not Found' 
  };
  // Le decimos al mock que falle con ese error
  vi.mocked(httpClient.get).mockRejectedValue(mockError);

  // 2. Act & 3. Assert: 
  await expect(getEpisodeImpl.getEpisode(mockData))
    .rejects.toEqual(mockError);
  });
});