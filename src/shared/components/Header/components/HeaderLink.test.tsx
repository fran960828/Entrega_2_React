import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HeaderLink } from "./HeaderLink";

// Importamos los estilos para verificar las clases
// Nota: En Vitest con CSS Modules, las clases suelen ser strings vacíos o nombres originales
import classes from "./HeaderLink.module.css";

describe("HeaderLink Component", () => {
  it("debe renderizar el texto correctamente y tener el destino correcto", () => {
    render(
      <MemoryRouter>
        <HeaderLink path="/characters" label="Characters" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /characters/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/characters");
  });

  it("debe aplicar la clase active cuando la ruta coincide", () => {
    render(
      // Simulamos que estamos en la ruta /episodes
      <MemoryRouter initialEntries={["/episodes"]}>
        <HeaderLink path="/episodes" label="Episodes" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /episodes/i });
    
    // Verificamos que tiene la clase active definida en tu CSS Module
    expect(link).toHaveClass(classes.active);
  });

  it("no debe tener la clase active cuando la ruta no coincide", () => {
    render(
      <MemoryRouter initialEntries={["/characters"]}>
        <HeaderLink path="/episodes" label="Episodes" />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /episodes/i });
    expect(link).not.toHaveClass(classes.active);
  });

  it("debe llamar a la función onClick al ser pulsado", () => {
    const mockOnClick = vi.fn();
    render(
      <MemoryRouter>
        <HeaderLink path="/test" label="Test" onClick={mockOnClick} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("link"));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});