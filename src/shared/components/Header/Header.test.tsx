import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Header } from "./Header";
import classes from "./Header.module.css";

describe("Header Container", () => {
  it("debe renderizar el logo y todos los enlaces de navegación", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByText(/Characters/i)).toBeInTheDocument();
    expect(screen.getByText(/Locations/i)).toBeInTheDocument();
    expect(screen.getByText(/Episodes/i)).toBeInTheDocument();
    expect(screen.getByText(/Favorites/i)).toBeInTheDocument();
  });

  it("debe alternar la visibilidad del menú al pulsar el botón burger", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    const burgerBtn = screen.getByRole("button");

    // Inicialmente no debería tener la clase activa
    expect(nav).not.toHaveClass(classes.navActive);

    // Primer clic: Abre
    fireEvent.click(burgerBtn);
    expect(nav).toHaveClass(classes.navActive);

    // Segundo clic: Cierra
    fireEvent.click(burgerBtn);
    expect(nav).not.toHaveClass(classes.navActive);
  });

  it("debe cerrar el menú cuando se hace clic en un enlace", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const nav = screen.getByRole("navigation");
    const burgerBtn = screen.getByRole("button");

    // Abrimos el menú
    fireEvent.click(burgerBtn);
    expect(nav).toHaveClass(classes.navActive);

    // Clic en un enlace (ej: Characters)
    const link = screen.getByText(/Characters/i);
    fireEvent.click(link);

    // El menú debería haberse cerrado
    expect(nav).not.toHaveClass(classes.navActive);
  });
});