import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { EmptyFavorites } from "./EmptyFavorites";

describe("EmptyFavorites()", () => {
  it("debe mostrar el mensaje de estado vacío correctamente", () => {
    render(
      <MemoryRouter>
        <EmptyFavorites />
      </MemoryRouter>
    );

    expect(screen.getByText(/¿Dimensiones vacías?/i)).toBeInTheDocument();
    expect(screen.getByText(/tu pistola de portales no ha guardado/i)).toBeInTheDocument();
  });

  it("debe contener un enlace que redirija a la página de personajes", () => {
    render(
      <MemoryRouter>
        <EmptyFavorites />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /explorar el multiverso/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/characters");
  });

  it("debe renderizar el icono decorativo", () => {
    const { container } = render(
      <MemoryRouter>
        <EmptyFavorites />
      </MemoryRouter>
    );

    // Lucide renderiza SVGs. Verificamos que existe uno en el contenedor.
    const icon = container.querySelector("svg");
    expect(icon).toBeInTheDocument();
  });
});