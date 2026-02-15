import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { CharacterDetailHero } from "./CharacterDetailHero";
import { useFavorites } from "../../../shared/hooks";

// 1. Mockeamos el hook de favoritos
vi.mock("../../../shared/hooks", () => ({
  useFavorites: vi.fn(),
}));

describe("CharacterDetailHero", () => {
  const mockCharacter = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    gender: "Male",
    image: "rick.jpg",
    origin: { name: "Earth (C-137)" },
    location: { name: "Citadel of Ricks" },
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar toda la información biográfica correctamente", () => {
    (useFavorites as any).mockReturnValue({ isFavorite: false });

    render(<CharacterDetailHero character={mockCharacter} />);

    // Verificamos el título y la imagen
    expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
    const img = screen.getByRole("img") as HTMLImageElement;
    expect(img.src).toContain("rick.jpg");

    // Verificamos las stats de la rejilla
    expect(screen.getByText("Human")).toBeInTheDocument();
    expect(screen.getByText("Male")).toBeInTheDocument();
    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
  });

  it("debe aplicar la clase de estilo correcta al badge de estado", () => {
    (useFavorites as any).mockReturnValue({ isFavorite: false });

    render(<CharacterDetailHero character={mockCharacter} />);

    const badgeElement = screen.getByText("Alive");
    expect(badgeElement).toHaveClass(/alive/i);
  });

  it("debe gestionar el estado de favorito visual y funcionalmente", () => {
    const mockToggle = vi.fn();
    // Simulamos que SÍ es favorito
    (useFavorites as any).mockReturnValue({
      isFavorite: true,
      toggleFavorite: mockToggle,
    });

    render(<CharacterDetailHero character={mockCharacter} />);

    // 1. Verificamos el color del corazón (propiedad fill)
    // Buscamos el SVG dentro del botón
    const heartIcon = screen.getByRole("button").querySelector("svg");
    expect(heartIcon).toHaveAttribute("fill", "#ff4b4b");

    // 2. Verificamos la interacción
    fireEvent.click(screen.getByRole("button"));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});
