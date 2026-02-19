import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { FavoritesList } from "./FavoritesList";
import classes from "./FavoritesList.module.css";

// 1. Mock de las cards para simplificar el test
vi.mock("../../characters/components", () => ({
  CharacterCard: ({ character }: any) => <div data-testid="char-card">{character.name}</div>,
}));

vi.mock("../../episodes/components", () => ({
  EpisodesCard: ({ episode }: any) => <div data-testid="epi-card">{episode.name}</div>,
}));

describe("FavoritesList Component", () => {
  const mockCharacters = [{ id: 1, name: "Rick" }, { id: 2, name: "Morty" }];
  const mockEpisodes = [{ id: 1, name: "Pilot" }];

  it("debe retornar null si la lista de items está vacía", () => {
    const { container } = render(
      <FavoritesList title="Test" items={[]} type="characters" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("debe renderizar la rejilla de personajes correctamente", () => {
    render(
      <MemoryRouter>
        <FavoritesList title="Fav Characters" items={mockCharacters as any} type="characters" />
      </MemoryRouter>
    );

    expect(screen.getByText("Fav Characters")).toBeInTheDocument();
    const cards = screen.getAllByTestId("char-card");
    expect(cards).toHaveLength(2);
    
    // Verificamos que el contenedor tiene la clase 'grid'
    const listContainer = cards[0].parentElement;
    expect(listContainer).toHaveClass(classes.grid);
  });

  it("debe renderizar la lista de episodios correctamente", () => {
    render(
      <MemoryRouter>
        <FavoritesList title="Saved Episodes" items={mockEpisodes as any} type="episodes" />
      </MemoryRouter>
    );

    expect(screen.getByText("Saved Episodes")).toBeInTheDocument();
    const cards = screen.getAllByTestId("epi-card");
    expect(cards).toHaveLength(1);
    
    // Verificamos que el contenedor tiene la clase 'list'
    const listContainer = cards[0].parentElement;
    expect(listContainer).toHaveClass(classes.list);
  });
});