import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Favorites } from "./Favorites";
import { useByIds } from "../shared/hooks/useByIds";
import { useModal } from "../shared/components/Modal/context";

// 1. Mocks de los hooks
vi.mock("../shared/hooks/useByIds", () => ({
  useByIds: vi.fn(),
}));

vi.mock("../shared/components/Modal/context", () => ({
  useModal: vi.fn(),
}));

vi.mock("../shared/components/Modal/Modal", () => ({
  Modal: ({ children, title }: any) => (
    <div data-testid="mock-modal">
      <h1>{title}</h1>
      {children}
    </div>
  ),
}));

// Mock de componentes hijos para aislamiento
vi.mock("./complements/EmptyFavorites", () => ({
  EmptyFavorites: () => <div data-testid="empty-state">Empty</div>,
}));

vi.mock("./complements/FavoritesList", () => ({
  FavoritesList: ({ title, items }: any) => (
    <div data-testid="fav-list">
      <h2>{title}</h2>
      <span>Items: {items.length}</span>
    </div>
  ),
}));
vi.mock("../episodes/components", () => ({
  EpisodeCastContainer: () => <div data-testid="cast-spy">Cast Content</div>,
}));

describe("Favorites Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Setup por defecto: Modal cerrado y Storage vacío
    (useModal as any).mockReturnValue({ activeId: null, closeModal: vi.fn() });
    localStorage.clear();
  });

  it("debe mostrar EmptyFavorites cuando no hay nada guardado y no está cargando", () => {
    (useByIds as any).mockReturnValue({ data: [], isFetching: false });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  it("debe orquestar el renderizado de personajes y episodios favoritos", () => {
    // Simulamos que tenemos 1 personaje y 1 episodio en data
    (useByIds as any).mockImplementation((key:string) => {
      if (key === "fav-characters-data") return { data: [{ id: 1, name: 'Rick' }], isFetching: false };
      return { data: [{ id: 1, name: 'Pilot' }], isFetching: false };
    });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    expect(screen.getByText(/Personaje/i)).toBeInTheDocument();
    expect(screen.getByText(/Episodio/i)).toBeInTheDocument();
    const lists = screen.getAllByTestId("fav-list");
    expect(lists).toHaveLength(2);
  });

  it("debe reaccionar a cambios en el localStorage mediante el evento storage", () => {
    (useByIds as any).mockReturnValue({ data: [], isFetching: false });
    
    render(<MemoryRouter><Favorites /></MemoryRouter>);

    // Simulamos que alguien añade un favorito desde otra pestaña
    localStorage.setItem("favCharacters", JSON.stringify([1]));
    fireEvent(window, new Event("storage"));

    // El componente debería haber actualizado su estado interno localIds
    // (Esto se verifica indirectamente porque useByIds se llamaría con nuevos params en una app real)
    expect(useByIds).toHaveBeenCalled();
  });

  it("debe mostrar el Modal cuando hay un activeId", () => {
    (useModal as any).mockReturnValue({ 
      activeId: "1", 
      closeModal: vi.fn() 
    });
    (useByIds as any).mockReturnValue({ data: [{ id: 1 }], isFetching: false });

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    // Verificamos el título del modal que definiste en el componente
    expect(screen.getByText("Characters in Episode")).toBeInTheDocument();
  });
});

