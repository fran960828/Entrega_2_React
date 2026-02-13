// useGenericPagination.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useGenericPagination } from './useGenericPagination';

// 1. Creamos un wrapper para React Query
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // Importante: evita que el test tarde si falla
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useGenericPagination', () => {
  it('debe llamar a la función de fetch y devolver los datos', async () => {
    // Arrange
    const mockData = { results: [{ id: 1, name: 'Rick' }] };
    const mockFetchFn = vi.fn().mockResolvedValue(mockData);
    const filters = { page: 1, name:'Rick'};

    // Act
    const { result } = renderHook(
      () => useGenericPagination('characters', mockFetchFn, filters),
      { wrapper: createWrapper() }
    );

    // Assert inicial: debería estar en estado de carga
    expect(result.current.isLoading).toBe(true);

    // Assert final: esperamos a que React Query termine
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockData);
    expect(mockFetchFn).toHaveBeenCalledWith(filters);
  });

  it('debe manejar errores de la función fetch', async () => {
    // Arrange
    const mockError = new Error('Network Error');
    const mockFetchFn = vi.fn().mockRejectedValue(mockError);

    // Act
    const { result } = renderHook(
      () => useGenericPagination('episodes', mockFetchFn, { page: 1 }),
      { wrapper: createWrapper() }
    );

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(mockError);
  });

  it('debe volver a pedir datos cuando los filtros cambian (Paginación)', async () => {
  const mockFetchFn = vi.fn().mockResolvedValue({ results: [] });
  
  // 1. Renderizamos con página 1
  const { rerender, result } = renderHook(
    ({ page }) => useGenericPagination('test', mockFetchFn, { page }),
    { 
      wrapper: createWrapper(),
      initialProps: { page: 1 } // Definimos las props iniciales
    }
  );

  // Esperamos a que termine la primera carga
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(mockFetchFn).toHaveBeenCalledTimes(1);
  expect(mockFetchFn).toHaveBeenCalledWith({ page: 1 });

  // 2. CAMBIO DE FILTROS: Actualizamos a página 2
  rerender({ page: 2 });

  // 3. Verificamos que React Query detecta el cambio de QueryKey y dispara otro fetch
  await waitFor(() => {
    // Buscamos que se haya llamado 2 veces en total
    expect(mockFetchFn).toHaveBeenCalledTimes(2);
  });
  
  expect(mockFetchFn).toHaveBeenCalledWith({ page: 2 });
});


it('debe mantener los datos anteriores (data) cuando una actualización falla', async () => {
  //arrange
  const mockDataPage1 = { results: [{ id: 1, name: 'Rick' }] };
  const mockError = new Error('Error de red');
  
  const mockFetchFn = vi.fn()
    .mockResolvedValueOnce(mockDataPage1)
    .mockImplementationOnce(() => new Promise((_, reject) => 
      setTimeout(() => reject(mockError), 10)
    ));

  // act
  const { rerender, result } = renderHook(
    ({ page }) => useGenericPagination('test-persistence', mockFetchFn, { page }),
    { 
      wrapper: createWrapper(),
      initialProps: { page: 1 } 
    }
  );

  // assert 1
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  // assert 2
  rerender({ page: 2 });

  await waitFor(() => {
    expect(result.current.isFetching).toBe(true);
    expect(result.current.data).toEqual(mockDataPage1);
  });

  // assert 3
  await waitFor(() => expect(result.current.isError).toBe(true));
});
it('debe manejar Race Conditions: mostrar siempre los datos de la última petición realizada', async () => {
  const data1 = { results: [{ id: 1, name: 'Rick' }] };
  const data2 = { results: [{ id: 2, name: 'Morty' }] };

  // 1. Mock dinámico: la primera llamada tarda mucho, la segunda es rápida
  const mockFetchFn = vi.fn()
    .mockImplementationOnce(() => new Promise(res => setTimeout(() => res(data1), 100))) // Lenta
    .mockImplementationOnce(() => new Promise(res => setTimeout(() => res(data2), 10)));  // Rápida

  const { rerender, result } = renderHook(
    ({ page }) => useGenericPagination('race-condition-test', mockFetchFn, { page }),
    { 
      wrapper: createWrapper(),
      initialProps: { page: 1 } 
    }
  );

  // 2. Disparamos la segunda petición sin esperar a que termine la primera
  rerender({ page: 2 });

  // 3. Esperamos a que todo termine
  await waitFor(() => expect(result.current.isSuccess).toBe(true));

  // 4. Assert: Los datos finales DEBEN ser los de la página 2
  expect(result.current.data).toEqual(data2);
  expect(mockFetchFn).toHaveBeenCalledTimes(2);
});

});