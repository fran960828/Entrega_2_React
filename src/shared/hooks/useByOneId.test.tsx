import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useByOneId } from "./useByOneId";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("useByOneId", () => {
  // Configuración del wrapper de React Query
  const createWrapper = () => {
    const queryClient = new QueryClient({
      defaultOptions: { 
        queries: { retry: false, gcTime: 0 } 
      },
    });
    return ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // 1. Test de Funcionamiento Correcto
  it("debe recuperar los datos de un solo item correctamente", async () => {
    const mockItem = { id: 1, name: "Rick Sanchez" };
    const mockFetchFn = vi.fn().mockResolvedValue(mockItem);

    const { result } = renderHook(
      () => useByOneId("character", 1, mockFetchFn),
      { wrapper: createWrapper() }
    );

    // Verificamos estado de carga inicial
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    // Verificamos que los datos coinciden y la función se llamó con el ID correcto
    expect(result.current.data).toEqual(mockItem);
    expect(mockFetchFn).toHaveBeenCalledWith(1);
    expect(mockFetchFn).toHaveBeenCalledTimes(1);
  });

  // 2. Test de Control de Errores
  it("debe manejar correctamente el estado de error", async () => {
    const mockError = new Error("Not Found");
    const mockFetchFn = vi.fn().mockRejectedValue(mockError);

    const { result } = renderHook(
      () => useByOneId("character", 999, mockFetchFn),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toEqual(mockError);
  });

  // 3. Test de Seguridad (Enabled)
  it("no debe disparar la consulta si el ID es 0 o indefinido", () => {
    const mockFetchFn = vi.fn();
    
    // Test con ID 0 (falsy)
    const { result } = renderHook(
      () => useByOneId("character", 0, mockFetchFn),
      { wrapper: createWrapper() }
    );

    expect(result.current.fetchStatus).toBe("idle");
    expect(mockFetchFn).not.toHaveBeenCalled();
  });

  // 4. Test de Resiliencia (KeepPreviousData)
  it("debe mantener el objeto anterior mientras se carga uno nuevo", async () => {
    const item1 = { id: 1, name: "Rick" };
    const item2 = { id: 2, name: "Morty" };
    const mockFetchFn = vi.fn()
      .mockResolvedValueOnce(item1)
      .mockReturnValue(new Promise(res => setTimeout(() => res(item2), 50)));

    const { result, rerender } = renderHook(
      ({ id }) => useByOneId("character", id, mockFetchFn),
      { 
        wrapper: createWrapper(),
        initialProps: { id: 1 }
      }
    );

    // Esperamos al primer item
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(item1);

    // Cambiamos el ID
    rerender({ id: 2 });

    // Verificamos que, aunque esté cargando el 2, el data sigue siendo el 1 (UX persistente)
    expect(result.current.isFetching).toBe(true);
    expect(result.current.data).toEqual(item1);

    // Finalmente llega el 2
    await waitFor(() => expect(result.current.data).toEqual(item2));
  });
});