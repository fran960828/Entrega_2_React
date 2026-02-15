import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { EpisodeCastContainer } from "./EpisodeCastContainer";
import { useByOneId } from "../../shared/hooks/useByOneId";
import { useByIds } from "../../shared/hooks/useByIds";

// 1. Mocks de los hooks
vi.mock("../../shared/hooks/useByOneId", () => ({
  useByOneId: vi.fn(),
}));
vi.mock("../../shared/hooks/useByIds", () => ({
  useByIds: vi.fn(),
}));

describe("EpisodeCastContainer", () => {
  const mockOnClose = vi.fn();
  const mockEpisode = {
    id: 1,
    name: "Pilot",
    characters: ["https://api/character/1", "https://api/character/2"],
  };
  const mockCharacters = [
    { id: 1, name: "Rick Sanchez", image: "rick.jpg" },
    { id: 2, name: "Morty Smith", image: "morty.jpg" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar el estado de carga inicial", () => {
    (useByOneId as any).mockReturnValue({ data: null, isLoading: true });
    (useByIds as any).mockReturnValue({ data: [], isLoading: false });

    render(<EpisodeCastContainer episodeId={1} onClose={mockOnClose} />);
    expect(screen.getByText(/Fetching cast.../i)).toBeInTheDocument();
  });

  it("debe renderizar la lista de personajes una vez obtenidos los datos", () => {
    (useByOneId as any).mockReturnValue({
      data: mockEpisode,
      isLoading: false,
    });
    (useByIds as any).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <EpisodeCastContainer episodeId={1} onClose={mockOnClose} />
      </MemoryRouter>
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Morty Smith")).toBeInTheDocument();
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(2);
  });

  it("debe llamar a onClose cuando se hace clic en el link de un personaje", () => {
    (useByOneId as any).mockReturnValue({
      data: mockEpisode,
      isLoading: false,
    });
    (useByIds as any).mockReturnValue({
      data: mockCharacters,
      isLoading: false,
    });

    render(
      <MemoryRouter>
        <EpisodeCastContainer episodeId={1} onClose={mockOnClose} />
      </MemoryRouter>
    );

    const charLink = screen.getByText("Rick Sanchez");
    fireEvent.click(charLink);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
