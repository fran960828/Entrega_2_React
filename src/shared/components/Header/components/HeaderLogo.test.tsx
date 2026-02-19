import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { HeaderLogo } from "./HeaderLogo";

describe("HeaderLogo Component", () => {
  const mockProps = {
    path: "/",
    image: "test-logo.png"
  };

  it("debe renderizar el logo con el src y el alt correctos", () => {
    render(
      <MemoryRouter>
        <HeaderLogo {...mockProps} />
      </MemoryRouter>
    );

    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", mockProps.image);
    expect(logo).toHaveAttribute("alt", "Rick and Morty Explorer Logo");
  });

  it("debe envolver la imagen con un enlace al path indicado", () => {
    render(
      <MemoryRouter>
        <HeaderLogo {...mockProps} />
      </MemoryRouter>
    );

    // Buscamos el link que envuelve a la imagen
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", mockProps.path);
  });
});