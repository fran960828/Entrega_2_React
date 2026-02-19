import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { Dashboard } from "./Dashboard";

// Mockeamos los componentes hijos para que el test sea rápido y se centre en la orquestación
vi.mock("./components", () => ({
  DashboardBackground: () => <div data-testid="portal-bg" />,
  DashboardMain: () => <div data-testid="dashboard-main" />,
  DashboardCard: ({ label, to }: any) => (
    <div data-testid="dash-card" data-path={to}>{label}</div>
  ),
}));

describe("Dashboard Container", () => {
  it("debe orquestar todos los elementos visuales y de navegación", () => {
    render(
      <MemoryRouter>
        <Dashboard />
      </MemoryRouter>
    );

    // 1. Verificamos las capas visuales
    expect(screen.getByTestId("portal-bg")).toBeInTheDocument();
    expect(screen.getByTestId("dashboard-main")).toBeInTheDocument();

    // 2. Verificamos que se renderizan las 4 cards de navegación
    const cards = screen.getAllByTestId("dash-card");
    expect(cards).toHaveLength(4);

    // 3. Verificamos que los destinos son los correctos
    const labels = cards.map(c => c.textContent);
    expect(labels).toContain("Characters");
    expect(labels).toContain("Locations");
    expect(labels).toContain("Episodes");
    expect(labels).toContain("Favorites");
  });
});