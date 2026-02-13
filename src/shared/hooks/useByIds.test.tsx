import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useByIds } from "./useByIds";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("useByIds", () => {
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
  it("debe llamar a la función de fetch con el array de IDs numéricos", async () => {
  const mockIds = [1, 2, 3];
  const mockFetch = vi.fn().mockResolvedValue([{ id: 1 }, { id: 2 }, { id: 3 }]);
  
  const { result } = renderHook(
    () => useByIds("test-key", mockIds, mockFetch),
    { wrapper: createWrapper() }
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  // Verificamos que se llamó con el array de números, no con un string
  expect(mockFetch).toHaveBeenCalledWith([1, 2, 3]);
  expect(result.current.data).toHaveLength(3);
});
it('debe manejar errores de la función fetch', async () => {
    // Arrange
    const mockIds = [1, 2, 3];
    const mockError = new Error('Network Error');
    const mockFetchFn = vi.fn().mockRejectedValue(mockError);

    // Act
    const { result } = renderHook(
      () => useByIds('episodes',mockIds,mockFetchFn ),
      { wrapper: createWrapper() }
    );

    // Assert
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(mockError);
  });
  it("debe formatear y pasar correctamente los argumentos a la función de servicio", async () => {
  // 1. Arrange: Preparamos los datos de entrada
  const mockIds = [1, 5, 10];
  const mockFetchFn = vi.fn().mockResolvedValue([]); // Solo necesitamos que devuelva algo
  
  // 2. Act: Renderizamos el hook
  const { result } = renderHook(
    () => useByIds("characters-key", mockIds, mockFetchFn),
    { wrapper: createWrapper() }
  );

  // 3. Assert: Verificamos la llamada
  // Esperamos a que la query se dispare
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(mockFetchFn).toHaveBeenCalledWith([1, 5, 10]);
  expect(mockFetchFn).toHaveBeenCalledTimes(1);
});
it("debe llamar a la función de fetch con el array de un solo ID", async () => {
  const mockIds = [1];
  const mockFetch = vi.fn().mockResolvedValue([{ id: 1 }]);
  
  const { result } = renderHook(
    () => useByIds("test-key", mockIds, mockFetch),
    { wrapper: createWrapper() }
  );

  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  
  // Verificamos que se llamó con el array de números, no con un string
  expect(mockFetch).toHaveBeenCalledWith([1]);
  expect(result.current.data).toHaveLength(1);
});
it("no debe disparar la consulta si el array de IDs está vacío", () => {
  const mockFetchFn = vi.fn();
  
  const { result } = renderHook(
    () => useByIds("test-key", [], mockFetchFn),
    { wrapper: createWrapper() }
  );

  // El estado debe ser 'idle' y la función no debe haberse llamado
  expect(result.current.fetchStatus).toBe("idle");
  expect(mockFetchFn).not.toHaveBeenCalled();
});
it("debe mantener la lista anterior mientras se actualiza a una nueva lista de IDs", async () => {
  const lista1 = [{ id: 1, name: "Rick" }];
  const lista2 = [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }];
  
  const mockFetchFn = vi.fn()
    .mockResolvedValueOnce(lista1) // Resultado para la primera carga
    .mockReturnValue(new Promise(res => setTimeout(() => res(lista2), 50))); // Retraso para la segunda

  const { result, rerender } = renderHook(
    ({ ids }) => useByIds("test-key", ids, mockFetchFn),
    { 
      wrapper: createWrapper(),
      initialProps: { ids: [1] }
    }
  );

  // 1. Carga inicial
  await waitFor(() => expect(result.current.isSuccess).toBe(true));
  expect(result.current.data).toEqual(lista1);

  // 2. Cambiamos los IDs (añadimos uno)
  rerender({ ids: [1, 2] });

  // 3. Verificamos persistencia: isFetching es true, pero data sigue siendo lista1
  expect(result.current.isFetching).toBe(true);
  expect(result.current.data).toEqual(lista1);

  // 4. Finalmente llegan los nuevos datos
  await waitFor(() => expect(result.current.data).toEqual(lista2));
});
});