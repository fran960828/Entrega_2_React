import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CharacterCard } from "./CharacterCard";
import { useFavorites } from "../../shared/hooks";

// 1. Mockeamos el hook de favoritos
vi.mock("../../shared/hooks", () => ({
  useFavorites: vi.fn(),
}));

describe("CharacterCard", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    image: "rick.jpg",
    location: { name: "Earth" },
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe renderizar la información básica del personaje", () => {
    // Configuramos el mock para este test
    (useFavorites as any).mockReturnValue({
      isFavorite: false,
      toggleFavorite: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    expect(screen.getByText("Alive - Human")).toBeInTheDocument();
    expect(screen.getByText("Earth")).toBeInTheDocument();
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("rick.jpg");
  });

  it("debe aplicar la clase de estado correcta (Alive)", () => {
    (useFavorites as any).mockReturnValue({ isFavorite: false });

    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    const statusCircle = screen.getByTestId("status-circle");
    expect(statusCircle).toHaveClass(/alive/i);
  });

  it("debe llamar a toggleFavorite cuando se hace clic en el botón de corazón", () => {
    const mockToggle = vi.fn();
    (useFavorites as any).mockReturnValue({
      isFavorite: false,
      toggleFavorite: mockToggle,
    });

    render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    const favoriteBtn = screen.getByRole("button");
    fireEvent.click(favoriteBtn);

    expect(mockToggle).toHaveBeenCalledTimes(1);
  });

  it("debe renderizar el corazón relleno si isFavorite es true", () => {
    (useFavorites as any).mockReturnValue({
      isFavorite: true,
      toggleFavorite: vi.fn(),
    });

    const { container } = render(
      <MemoryRouter>
        <CharacterCard character={mockCharacter} />
      </MemoryRouter>
    );

    const heartIcon = container.querySelector("svg");
    expect(heartIcon).toHaveClass(/heartFilled/i);
  });
});
