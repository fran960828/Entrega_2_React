import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { useFavorites } from "./useFavorites";

describe("useFavorites", () => {
  const STORAGE_KEY = "favorites";
  const ITEM_ID = 1;

  beforeEach(() => {
    // Limpiamos el localStorage antes de cada test
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("debe inicializar isFavorite como false si el item no está en localStorage", () => {
    const { result } = renderHook(() => useFavorites(STORAGE_KEY, ITEM_ID));
    expect(result.current.isFavorite).toBe(false);
  });

  it("debe inicializar isFavorite como true si el item ya existe en localStorage", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([ITEM_ID]));
    
    const { result } = renderHook(() => useFavorites(STORAGE_KEY, ITEM_ID));
    expect(result.current.isFavorite).toBe(true);
  });

  it("debe agregar un item a favoritos y actualizar localStorage", () => {
    const { result } = renderHook(() => useFavorites(STORAGE_KEY, ITEM_ID));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(result.current.isFavorite).toBe(true);
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(stored).toContain(ITEM_ID);
  });

  it("debe eliminar un item de favoritos si ya existía", () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([ITEM_ID]));
    const { result } = renderHook(() => useFavorites(STORAGE_KEY, ITEM_ID));

    act(() => {
      result.current.toggleFavorite();
    });

    expect(result.current.isFavorite).toBe(false);
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    expect(stored).not.toContain(ITEM_ID);
  });

  it("debe disparar el evento 'storage' para notificar a otros componentes", () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    const { result } = renderHook(() => useFavorites(STORAGE_KEY, ITEM_ID));

    act(() => {
      result.current.toggleFavorite();
    });

    // Verificamos que se lanzó el evento que permite la reactividad entre componentes
    expect(dispatchSpy).toHaveBeenCalledWith(expect.any(Event));
    expect(dispatchSpy.mock.calls[0][0].type).toBe("storage");
  });
});