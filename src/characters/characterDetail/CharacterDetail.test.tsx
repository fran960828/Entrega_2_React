import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CharacterDetail } from "./CharacterDetail";
import { useByOneId } from "../../shared/hooks/useByOneId";
import { useByIds } from "../../shared/hooks/useByIds";

// 1. Mock de los hooks de datos
vi.mock("../../shared/hooks/useByOneId", () => ({
  useByOneId: vi.fn(),
}));
vi.mock("../../shared/hooks/useByIds", () => ({
  useByIds: vi.fn(),
}));

// 2. Mock de los componentes hijos para aislar el container
vi.mock("./components", () => ({
  CharacterDetailHero: ({ character }: any) => (
    <div data-testid="hero">{character.name}</div>
  ),
  CharacterDetailEp: ({ episodesArray }: any) => (
    <div data-testid="episodes-count">{episodesArray.length}</div>
  ),
}));

// Mock de useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("CharacterDetail Container", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    image: "rick.jpg",
    episode: ["https://api/episode/1", "https://api/episode/2"],
  };

  const mockEpisodes = [
    { id: 1, name: "Pilot" },
    { id: 2, name: "Lawnmower Dog" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar 'no encontrado' si no hay datos del personaje", () => {
    (useByOneId as any).mockReturnValue({ data: null });
    (useByIds as any).mockReturnValue({ data: [] });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Personaje no encontrado/i)).toBeInTheDocument();
  });

  it("debe orquestar la carga del personaje y sus episodios", () => {
    // Simulamos que el primer hook ya tiene los datos
    (useByOneId as any).mockReturnValue({ data: mockCharacter });
    // Simulamos que el segundo hook devuelve los episodios
    (useByIds as any).mockReturnValue({ data: mockEpisodes });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que se renderizan los hijos con la info correcta
    expect(screen.getByTestId("hero")).toHaveTextContent("Rick Sanchez");
    expect(screen.getByTestId("episodes-count")).toHaveTextContent("2");
  });

  it("debe llamar a navigate(-1) al pulsar el botón de volver", () => {
    (useByOneId as any).mockReturnValue({ data: mockCharacter });
    (useByIds as any).mockReturnValue({ data: [] });

    render(
      <MemoryRouter>
        <CharacterDetail />
      </MemoryRouter>
    );

    const backBtn = screen.getByRole("button", { name: /volver/i });
    fireEvent.click(backBtn);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
