import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, useSearchParams } from "react-router-dom";
import { Locations } from "./Locations";
import { useGenericPagination } from "../shared/hooks/useGenericPagination";

// 1. Mocks de los hooks
vi.mock("../shared/hooks/useGenericPagination", () => ({
  useGenericPagination: vi.fn(),
}));

// Mock de la navegación
const mockSetSearchParams = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useSearchParams: vi.fn(),
  };
});

// Mock de componentes hijos para aislamiento
vi.mock("./components/LocationCard", () => ({
  LocationCard: ({ location }: any) => <div data-testid="location-card">{location.name}</div>,
}));

describe("Locations Container", () => {
  const mockData = {
    results: [
      { id: 1, name: "Citadel of Ricks" },
      { id: 2, name: "Worldender's Lair" },
    ],
    info: { pages: 5, count: 100 },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Setup de URLSearchParams mockeado
    (useSearchParams as any).mockReturnValue([new URLSearchParams(), mockSetSearchParams]);
    // Mock de window.scrollTo para evitar errores en JSDOM
    window.scrollTo = vi.fn();
  });

  it("debe renderizar el listado de localizaciones cuando hay datos", () => {
    (useGenericPagination as any).mockReturnValue({ data: mockData });

    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );

    expect(screen.getByText(/Explorar Dimensiones/i)).toBeInTheDocument();
    expect(screen.getAllByTestId("location-card")).toHaveLength(2);
  });

  it("debe leer la página correcta desde la URL", () => {
    const params = new URLSearchParams("page=3");
    (useSearchParams as any).mockReturnValue([params, mockSetSearchParams]);
    (useGenericPagination as any).mockReturnValue({ data: mockData });

    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );

    // Verificamos que el hook de paginación recibió la página 3
    expect(useGenericPagination).toHaveBeenCalledWith(
      "locations",
      expect.any(Function),
      { page: 3 }
    );
  });

  it("debe actualizar los searchParams al cambiar de página", () => {
    (useGenericPagination as any).mockReturnValue({ data: mockData });

    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );

    // Buscamos el botón de la página 2 en el componente Pagination
    const page2Button = screen.getByRole("button", { name: /next/i });
    fireEvent.click(page2Button);

    // Verificamos que se intentó actualizar la URL a page=2
    expect(mockSetSearchParams).toHaveBeenCalled();
    const calledParams = mockSetSearchParams.mock.calls[0][0];
    expect(calledParams.get("page")).toBe("2");
  });

  it("debe mostrar el mensaje de no resultados si la data está vacía", () => {
    (useGenericPagination as any).mockReturnValue({ data: { results: [] } });

    render(
      <MemoryRouter>
        <Locations />
      </MemoryRouter>
    );

    expect(screen.getByText(/No se encontraron dimensiones/i)).toBeInTheDocument();
  });
});