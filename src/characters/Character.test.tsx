import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Character } from "./Character";
import { useGenericPagination } from "../shared/hooks";

// 1. Mocks de los hooks
vi.mock("../shared/hooks", () => ({
  useGenericPagination: vi.fn(),
}));

// Mock de CharacterCard para simplificar el DOM del test
vi.mock("./components", () => ({
  CharacterCard: ({ character }: any) => (
    <div data-testid="character-card">{character.name}</div>
  ),
  CharacterFilter: ({ onFilterChange, initialValues }: any) => (
    <div>
      {/* Mock del Buscador (sin debounce) */}
      <input
        placeholder="Search"
        defaultValue={initialValues.name}
        onChange={(e) => onFilterChange({ name: e.target.value })}
      />

      {/* Mock del Selector de Status */}
      <select
        aria-label="status-select"
        defaultValue={initialValues.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
      >
        <option value="">ALL STATUS</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
      </select>
    </div>
  ),
}));

// Mock de Pagination
vi.mock("../shared/components/Pagination", () => ({
  Pagination: ({ onPageChange }: any) => (
    <button onClick={() => onPageChange(2)}>Next Page</button>
  ),
}));

describe("Character Container", () => {
  const mockData = {
    results: [
      { id: 1, name: "Rick Sanchez" },
      { id: 2, name: "Morty Smith" },
    ],
    info: { pages: 10 },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar las cards cuando hay datos", () => {
    (useGenericPagination as any).mockReturnValue({
      data: mockData,
      isError: false,
    });

    render(
      <MemoryRouter>
        <Character />
      </MemoryRouter>
    );

    expect(screen.getAllByTestId("character-card")).toHaveLength(2);
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
  });

  it("debe mostrar el mensaje de 'no resultados' si hay un error o la lista está vacía", () => {
    (useGenericPagination as any).mockReturnValue({
      data: { results: [], info: { pages: 0 } },
      isError: true,
    });

    render(
      <MemoryRouter>
        <Character />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/No se encontraron personajes/i)
    ).toBeInTheDocument();
  });

  it("debe reaccionar a los cambios de la URL leyendo los searchParams", () => {
    // Simulamos que entramos directamente a la URL: ?name=Morty&page=2
    const initialEntries = ["/characters?name=Morty&page=2"];

    render(
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route path="/characters" element={<Character />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que el hook useGenericPagination fue llamado con los datos de la URL
    expect(useGenericPagination).toHaveBeenCalledWith(
      "characters",
      expect.any(Function),
      expect.objectContaining({
        name: "Morty",
        page: 2,
      })
    );
  });

  // --- TEST 4: INTERACCIÓN Y NAVEGACIÓN ---
  it("debe resetear a la página 1 y filtrar por status cuando se cambia el selector", async () => {
    (useGenericPagination as any).mockReturnValue({ data: mockData });

    render(
      <MemoryRouter initialEntries={["/characters?page=3"]}>
        <Character />
      </MemoryRouter>
    );

    // 1. Buscamos el select por su aria-label (el que pusimos en el mock)
    const select = screen.getByLabelText("status-select");

    // 2. Simulamos que el usuario cambia a 'dead'
    fireEvent.change(select, { target: { value: "dead" } });

    // 3. Verificamos que el hook se llama con los nuevos filtros y resetea la página
    await waitFor(() => {
      expect(useGenericPagination).toHaveBeenCalledWith(
        "characters",
        expect.any(Function),
        expect.objectContaining({
          status: "dead",
          page: 1, // Crucial: siempre debe volver a 1 al filtrar
        })
      );
    });
  });
});
