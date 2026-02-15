import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CharacterDetailEp } from "./CharacterDetailEp";

// 1. Mockeamos el componente hijo EpisodesCard
// Usamos un data-testid para contar fácilmente cuántos se renderizan
vi.mock("../../../episodes/components", () => ({
  EpisodesCard: ({ episode }: any) => (
    <div data-testid="episode-card">{episode.name}</div>
  ),
}));

describe("CharacterDetailEp", () => {
  const mockEpisodes = [
    { id: 1, name: "Pilot", episode: "S01E01" },
    { id: 2, name: "Lawnmower Dog", episode: "S01E02" },
  ] as any;

  it("debe renderizar el título de la sección", () => {
    render(<CharacterDetailEp episodesArray={[]} />);
    expect(screen.getByText(/Registro de Apariciones/i)).toBeInTheDocument();
  });

  it("debe renderizar tantas EpisodesCard como elementos haya en el array", () => {
    render(<CharacterDetailEp episodesArray={mockEpisodes} />);

    // Verificamos que hay 2 elementos con el testid que definimos en el mock
    const cards = screen.getAllByTestId("episode-card");
    expect(cards).toHaveLength(2);
  });

  it("debe pasar la información correcta a cada EpisodesCard", () => {
    render(<CharacterDetailEp episodesArray={mockEpisodes} />);

    // Verificamos que los nombres de los episodios del mock aparecen en pantalla
    expect(screen.getByText("Pilot")).toBeInTheDocument();
    expect(screen.getByText("Lawnmower Dog")).toBeInTheDocument();
  });

  it("no debe renderizar ninguna card si el array está vacío", () => {
    render(<CharacterDetailEp episodesArray={[]} />);

    // queryBy devuelve null si no lo encuentra, a diferencia de getBy que lanza error
    const cards = screen.queryAllByTestId("episode-card");
    expect(cards).toHaveLength(0);
  });
});
