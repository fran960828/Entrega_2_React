import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPaginationLoader } from './loader.Generic';
import { queryClient } from '../../main';
import type { LoaderFunctionArgs } from 'react-router-dom';

// Mockeamos el queryClient (la frontera)
vi.mock('../../main', () => ({
  queryClient: {
    ensureQueryData: vi.fn(),
    setQueryData: vi.fn(),
  },
}));

describe('createPaginationLoader', () => {
  const mockQueryKey = 'test-key';
  const mockFetchFn = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe devolver una función de loader que procese filtros y llame a ensureQueryData', async () => {
    // 1. Creamos el loader específico usando la fábrica
    const loader = createPaginationLoader(mockQueryKey, mockFetchFn);
    
    // 2. Simulamos la Request de React Router
    const request = new Request('http://localhost/test?page=3&name=morty');
    const expectedFilters = { page: 3, name: 'morty', status: '', species: '' };
    const mockData = { results: [ { id: 1 } ] };

    vi.mocked(queryClient.ensureQueryData).mockResolvedValue(mockData);

    // 3. Ejecutamos el loader
    const result = await loader({ request, params: {} } as LoaderFunctionArgs);

    // Assert
    expect(queryClient.ensureQueryData).toHaveBeenCalledWith(
      expect.objectContaining({
        queryKey: [mockQueryKey, expectedFilters],
      })
    );
    expect(result).toEqual(mockData);
  });

  it('debe capturar el error 404 y alimentar la caché con un objeto vacío (Muting)', async () => {
    const loader = createPaginationLoader(mockQueryKey, mockFetchFn);
    const request = new Request('http://localhost/test');
    const error404 = { status: 404 };

    vi.mocked(queryClient.ensureQueryData).mockRejectedValue(error404);

    const result = await loader({ request, params: {} } as LoaderFunctionArgs);

    // Verificamos que se llamó a setQueryData para "curar" la caché
    expect(queryClient.setQueryData).toHaveBeenCalledWith(
      [mockQueryKey, expect.any(Object)],
      { results: [], info: { pages: 0, count: 0 } }
    );
    
    if (result && typeof result === 'object' && 'results' in result) {
        expect(result.results).toHaveLength(0);
    } else {
        throw new Error('El loader no devolvió un objeto con la propiedad results');
    }
  });
  it('debe lanzar errores que no sean 404 (ej: 500)', async () => {
    // Arrange
    const request = new Request('http://localhost/characters');
    const mockError = { status: 500, message: 'Server Error' };
    const loader=createPaginationLoader(mockQueryKey, mockFetchFn);
    
    vi.mocked(queryClient.ensureQueryData).mockRejectedValue(mockError);

    // Act & Assert
    await expect(loader({ request, params: {} } as LoaderFunctionArgs))
      .rejects.toEqual(mockError);
  });
});







