import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CharacterDetail } from "./CharacterDetail";
import { useByOneId } from "../../shared/hooks/useByOneId";
import { useByIds } from "../../shared/hooks/useByIds";
import { useModal } from "../../shared/components/Modal/context"; // Importa el hook

// 1. Mocks de los hooks de datos
vi.mock("../../shared/hooks/useByOneId", () => ({ useByOneId: vi.fn() }));
vi.mock("../../shared/hooks/useByIds", () => ({ useByIds: vi.fn() }));

// 2. MOCK NUEVO: Mock del contexto del Modal
vi.mock("../../shared/components/Modal/context", () => ({
  useModal: vi.fn(),
}));

// 3. MOCK NUEVO: Mock de los componentes de Modal y Cast para evitar problemas de Portal
vi.mock("../../shared/components/Modal/Modal", () => ({
  Modal: ({ children, title }: any) => (
    <div data-testid="modal-wrapper">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));
vi.mock("../../episodes/components", () => ({
  EpisodeCastContainer: () => <div data-testid="cast-container" />,
}));

// Mock de los componentes hijos existentes
vi.mock("./components", () => ({
  CharacterDetailHero: ({ character }: any) => (
    <div data-testid="hero">{character.name}</div>
  ),
  CharacterDetailEp: ({ episodesArray }: any) => (
    <div data-testid="episodes-count">{episodesArray.length}</div>
  ),
}));

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});

describe("CharacterDetail Container", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    image: "rick.jpg",
    episode: ["https://api/episode/1"],
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Configuración por defecto para el modal (cerrado)
    (useModal as any).mockReturnValue({
      activeId: null,
      closeModal: vi.fn(),
    });
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
    (useByOneId as any).mockReturnValue({ data: mockCharacter });
    (useByIds as any).mockReturnValue({ data: [{ id: 1, name: "Pilot" }] });

    render(
      <MemoryRouter initialEntries={["/character/1"]}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("hero")).toHaveTextContent("Rick Sanchez");
    expect(screen.getByTestId("episodes-count")).toHaveTextContent("1");
  });

  it("debe llamar a navigate('/Characters') al pulsar el botón de volver", () => {
    (useByOneId as any).mockReturnValue({ data: mockCharacter });
    (useByIds as any).mockReturnValue({ data: [] });

    render(
      <MemoryRouter>
        <CharacterDetail />
      </MemoryRouter>
    );

    const backBtn = screen.getByRole("button", { name: /volver/i });
    fireEvent.click(backBtn);

    // Ajustado para coincidir con tu código: navigate("/Characters")
    expect(mockNavigate).toHaveBeenCalledWith("/Characters");
  });

  // TEST EXTRA para el Modal
  it("debe mostrar el Modal si hay un activeId", () => {
    (useByOneId as any).mockReturnValue({ data: mockCharacter });
    (useByIds as any).mockReturnValue({ data: [] });
    (useModal as any).mockReturnValue({
      activeId: "1",
      closeModal: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharacterDetail />
      </MemoryRouter>
    );

    expect(screen.getByTestId("modal-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Characters in Episode")).toBeInTheDocument();
  });
});
