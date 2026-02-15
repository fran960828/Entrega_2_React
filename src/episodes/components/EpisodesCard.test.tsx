import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { EpisodesCard } from "./EpisodesCard";
import { useModal } from "../../shared/components/Modal/context";
import { useFavorites } from "../../shared/hooks/useFavorites";

// 1. Mockeamos ambos hooks
vi.mock("../../shared/components/Modal/context", () => ({
  useModal: vi.fn(),
}));

vi.mock("../../shared/hooks/useFavorites", () => ({
  useFavorites: vi.fn(),
}));

describe("EpisodesCard", () => {
  const mockEpisode = {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
  } as any;

  const mockOpenModal = vi.fn();
  const mockToggleFavorite = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // Configuración por defecto de los mocks
    (useModal as any).mockReturnValue({
      openModal: mockOpenModal,
    });
    (useFavorites as any).mockReturnValue({
      isFavorite: false,
      toggleFavorite: mockToggleFavorite,
    });
  });

  it("debe renderizar la información del episodio correctamente", () => {
    render(<EpisodesCard episode={mockEpisode} />);

    expect(screen.getByText("S01E01")).toBeInTheDocument();
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("December 2, 2013")).toBeInTheDocument();
  });

  it("debe llamar a openModal con el id del episodio al pulsar 'Ver Elenco'", () => {
    render(<EpisodesCard episode={mockEpisode} />);

    const castBtn = screen.getByRole("button", { name: /ver elenco/i });
    fireEvent.click(castBtn);

    expect(mockOpenModal).toHaveBeenCalledWith(1);
  });

  it("debe cambiar la apariencia del corazón según el estado de favorito", () => {
    // Forzamos que sea favorito en este test
    (useFavorites as any).mockReturnValue({
      isFavorite: true,
      toggleFavorite: mockToggleFavorite,
    });

    render(<EpisodesCard episode={mockEpisode} />);

    const heartIcon = screen
      .getByRole("button", { name: "" })
      .querySelector("svg");
    // Verificamos el color verde característico que has puesto (#97ce4c)
    expect(heartIcon).toHaveAttribute("fill", "#97ce4c");
  });

  it("debe llamar a toggleFavorite al pulsar el botón de corazón", () => {
    render(<EpisodesCard episode={mockEpisode} />);

    const favBtn = screen.getAllByRole("button")[1]; // El segundo botón es el de favoritos
    fireEvent.click(favBtn);

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
