import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationResident } from "./LocationResident";
import {getSomeCharactersUI} from "../../characters/services";

// Mock del servicio
vi.mock("../../characters/services", () => ({
  getSomeCharactersUI: vi.fn(),
}));

describe("LocationResident Component", () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    vi.clearAllMocks();
  });

  const mockUrls = [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2",
  ];

  it("debe mostrar el skeleton mientras carga", () => {
    // Forzamos que la promesa no se resuelva inmediatamente
    (getSomeCharactersUI as any).mockReturnValue(new Promise(() => {}));

    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <LocationResident residentUrls={mockUrls} />
      </QueryClientProvider>
    );

    // Buscamos por la clase skeleton definida en tu módulo CSS
    expect(container.querySelector('[class*="skeleton"]')).toBeInTheDocument();
  });

  it("debe renderizar los avatares de los residentes correctamente", async () => {
    const mockResidents = [
      { id: 1, name: "Rick", image: "rick.png" },
      { id: 2, name: "Morty", image: "morty.png" },
    ];
    (getSomeCharactersUI as any).mockResolvedValue(mockResidents);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LocationResident residentUrls={mockUrls} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    // Esperamos a que React Query resuelva
    const images = await screen.findAllByRole("img");
    expect(images).toHaveLength(2);
    expect(screen.getByAltText("Rick")).toBeInTheDocument();
  });

  it("debe mostrar el badge de excedentes cuando hay más de 5 residentes", async () => {
    const manyUrls = Array(10).fill("https://rickandmortyapi.com/api/character/1");
    (getSomeCharactersUI as any).mockResolvedValue([{ id: 1, name: "Rick", image: "img" }]);

    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <LocationResident residentUrls={manyUrls} />
        </MemoryRouter>
      </QueryClientProvider>
    );

    const extraBadge = await screen.findByText("+5");
    expect(extraBadge).toBeInTheDocument();
  });
});