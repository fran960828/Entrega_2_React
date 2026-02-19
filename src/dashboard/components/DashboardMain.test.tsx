import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DashboardMain } from "./DashboardMain";

describe("DashboardMain Component", () => {
  it("debe renderizar el logo principal con los atributos correctos", () => {
    render(<DashboardMain />);

    const logo = screen.getByRole("img", { name: /rick and morty logo/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", "/logo.png");
  });

  it("debe mostrar el eslogan del dashboard", () => {
    render(<DashboardMain />);

    const subtitle = screen.getByText(/multiverse explorer dashboard/i);
    expect(subtitle).toBeInTheDocument();
  });
});