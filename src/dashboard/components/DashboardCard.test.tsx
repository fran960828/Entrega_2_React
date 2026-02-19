import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { DashboardCard } from "./DashboardCard";

describe("DashboardCard Component", () => {
  const mockProps = {
    to: "/characters",
    label: "View Characters",
    delay: 0.5
  };

  it("debe renderizar el label y el enlace de navegación correctamente", () => {
    render(
      <MemoryRouter>
        <DashboardCard {...mockProps} />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: mockProps.label });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", mockProps.to);
  });

  it("debe aplicar los estilos iniciales de animación", () => {
    const { container } = render(
      <MemoryRouter>
        <DashboardCard {...mockProps} />
      </MemoryRouter>
    );

    const motionDiv = container.firstChild;
    expect(motionDiv).toHaveClass(/cardWrapper/);
  });
});