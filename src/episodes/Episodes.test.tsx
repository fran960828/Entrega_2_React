import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Episodes } from "./Episodes";
import { useModal } from "../shared/components/Modal/context/ModalContext";
import { useGenericPagination } from "../shared/hooks";

// 1. Mocks de Hooks
vi.mock("../shared/components/Modal/context/ModalContext", () => ({
  useModal: vi.fn(),
}));

vi.mock("../shared/hooks", () => ({
  useGenericPagination: vi.fn(),
}));

// 2. Mocks de componentes para simplificar el DOM
vi.mock("../shared/components/Modal/Modal", () => ({
  Modal: ({ children, title, onClose }: any) => (
    <div data-testid="modal-wrapper">
      <h1>{title}</h1>
      <button onClick={onClose}>Close Modal</button>
      {children}
    </div>
  ),
}));

vi.mock("./components/EpisodeCastContainer", () => ({
  EpisodeCastContainer: ({ episodeId }: any) => (
    <div data-testid="cast-container">Cast for ID: {episodeId}</div>
  ),
}));

// Mock de EpisodesCard para evitar lógica interna
vi.mock("./components", () => ({
  EpisodesCard: ({ episode }: any) => <div>{episode.name}</div>,
}));

describe("Episodes Container", () => {
  const mockData = {
    results: [
      { id: 1, name: "Pilot" },
      { id: 2, name: "Lawnmower Dog" },
    ],
    info: { pages: 5 },
  };

  const mockCloseModal = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    window.scrollTo = vi.fn();

    // Configuración por defecto: No hay modal abierto
    (useModal as any).mockReturnValue({
      activeId: null,
      closeModal: mockCloseModal,
    });
  });

  it("debe renderizar el listado de episodios correctamente", () => {
    (useGenericPagination as any).mockReturnValue({
      data: mockData,
      isError: false,
    });

    render(
      <MemoryRouter initialEntries={["/episodes?page=1"]}>
        <Episodes />
      </MemoryRouter>
    );

    expect(screen.getByText("Broadcast History")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
  });

  it("debe abrir el Modal cuando hay un activeId en el contexto", () => {
    // Simulamos que el contexto dice que el episodio 1 está activo
    (useModal as any).mockReturnValue({
      activeId: "1",
      closeModal: mockCloseModal,
    });
    (useGenericPagination as any).mockReturnValue({
      data: mockData,
      isError: false,
    });

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    // Verificamos que el Modal y su contenido aparecen
    expect(screen.getByTestId("modal-wrapper")).toBeInTheDocument();
    expect(screen.getByText("Characters in Episode")).toBeInTheDocument();
    expect(screen.getByText("Cast for ID: 1")).toBeInTheDocument();
  });

  it("debe llamar a closeModal cuando el modal lo solicita", () => {
    (useModal as any).mockReturnValue({
      activeId: "1",
      closeModal: mockCloseModal,
    });
    (useGenericPagination as any).mockReturnValue({ data: mockData });

    render(
      <MemoryRouter>
        <Episodes />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Close Modal"));
    expect(mockCloseModal).toHaveBeenCalledTimes(1);
  });
});
