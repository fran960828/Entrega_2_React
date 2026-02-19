import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { LocationCard } from "./LocationCard";

// 1. Mock de ResidentList para aislar el test de la card
vi.mock("./LocationResident", () => ({
  ResidentList: ({ residentUrls }: { residentUrls: string[] }) => (
    <div data-testid="resident-list">Count: {residentUrls.length}</div>
  ),
}));

describe("LocationCard Component", () => {
  const mockLocation = {
    id: 1,
    name: "Earth (C-137)",
    type: "Planet",
    dimension: "Dimension C-137",
    residents: ["url1", "url2"],
    url: "",
    created: ""
  };

  it("debe mostrar la información básica de la localización", () => {
    render(<LocationCard location={mockLocation} />);

    expect(screen.getByText("Earth (C-137)")).toBeInTheDocument();
    expect(screen.getByText("Planet")).toBeInTheDocument();
    expect(screen.getByText("Dimension C-137")).toBeInTheDocument();
  });

  it("debe cargar la imagen correcta basada en el tipo (Planet)", () => {
    render(<LocationCard location={mockLocation} />);
    
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/planet.png");
    expect(img).toHaveAttribute("alt", "Planet");
  });

  it("debe usar la imagen por defecto si el tipo es desconocido", () => {
    const unknownLocation = { ...mockLocation, type: "Unknown Type" };
    render(<LocationCard location={unknownLocation} />);
    
    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "/default.png");
  });

  it("debe renderizar la lista de residentes cuando existen", () => {
    render(<LocationCard location={mockLocation} />);
    
    expect(screen.getByTestId("resident-list")).toBeInTheDocument();
    expect(screen.getByText("Count: 2")).toBeInTheDocument();
  });

  it("debe mostrar el mensaje de 'No residents found' cuando la lista está vacía", () => {
    const noResidentsLocation = { ...mockLocation, residents: [] };
    render(<LocationCard location={noResidentsLocation} />);
    
    expect(screen.getByText(/No residents found/i)).toBeInTheDocument();
    expect(screen.queryByTestId("resident-list")).not.toBeInTheDocument();
  });
});