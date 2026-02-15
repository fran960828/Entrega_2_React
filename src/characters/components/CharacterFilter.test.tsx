import { render, screen, fireEvent, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CharacterFilter } from "./CharacterFilter";

describe("CharacterFilter", () => {
  const mockOnFilterChange = vi.fn();
  const initialValues = { name: "", status: undefined, species: undefined };

  beforeEach(() => {
    vi.useFakeTimers(); // Activamos el control del tiempo
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers(); // Restauramos el tiempo real
  });

  it("debe llamar a onFilterChange inmediatamente al cambiar un selector", () => {
    render(
      <CharacterFilter
        onFilterChange={mockOnFilterChange}
        initialValues={initialValues}
      />
    );

    // En lugar de getByRole, buscamos por lo que el usuario ve escrito
    const statusSelect = screen.getByDisplayValue("ALL STATUS");

    fireEvent.change(statusSelect, {
      target: { value: "alive", name: "status" },
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ status: "alive" });
  });

  it("debe aplicar Debouncing al escribir en el buscador", () => {
    render(
      <CharacterFilter
        onFilterChange={mockOnFilterChange}
        initialValues={initialValues}
      />
    );

    const input = screen.getByPlaceholderText(/SEARCH CHARACTERS.../i);

    // 1. Simulamos que el usuario escribe rápido
    fireEvent.change(input, { target: { value: "Rick" } });

    // 2. Verificamos que todavía NO se ha llamado a la función (por el debounce)
    expect(mockOnFilterChange).not.toHaveBeenCalledWith({ name: "Rick" });

    // 3. Adelantamos el reloj 500ms
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // 4. Ahora sí debe haber sido llamada
    expect(mockOnFilterChange).toHaveBeenCalledWith({ name: "Rick" });
  });

  it("debe limpiar el timeout anterior si el usuario sigue escribiendo", () => {
    render(
      <CharacterFilter
        onFilterChange={mockOnFilterChange}
        initialValues={initialValues}
      />
    );
    const input = screen.getByPlaceholderText(/SEARCH CHARACTERS.../i);

    fireEvent.change(input, { target: { value: "Ri" } });

    // Adelantamos solo 300ms (no es suficiente)
    act(() => {
      vi.advanceTimersByTime(300);
    });

    fireEvent.change(input, { target: { value: "Rick" } });

    // Adelantamos otros 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    // Sigue sin llamarse porque el segundo input reinició el contador
    expect(mockOnFilterChange).not.toHaveBeenCalled();

    // Finalmente adelantamos lo que falta
    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(mockOnFilterChange).toHaveBeenCalledWith({ name: "Rick" });
  });
});
