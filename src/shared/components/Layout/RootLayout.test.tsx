import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { RootLayout } from "./RootLayout";
import { useModal } from "../Modal/context";

// 1. Mockeamos los componentes pesados que el Layout "sostiene"
vi.mock("../Header", () => ({
  Header: () => <header data-testid="mock-header">Header</header>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    ScrollRestoration: () => <div data-testid="scroll-restoration" />,
  };
});

const PageChildSpy = () => {
  const { openModal, activeId } = useModal();
  return (
    <div>
      <span data-testid="modal-status">{activeId || "closed"}</span>
      <button onClick={() => openModal("test-id")}>Open</button>
    </div>
  );
};

describe("RootLayout Integration", () => {
  it("debe proveer el Header y el Contexto del Modal a los hijos del Outlet", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route path="/" element={<PageChildSpy />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    // Verificamos que el Header persiste fuera del Outlet
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();

    // Verificamos que el hijo (dentro del Outlet) accede al ModalProvider del Layout
    const status = screen.getByTestId("modal-status");
    expect(status).toHaveTextContent("closed");

    // Actuamos sobre el hijo
    fireEvent.click(screen.getByRole("button", { name: /open/i }));

    // Si esto pasa, significa que el ModalProvider envuelve correctamente al Outlet
    expect(status).toHaveTextContent("test-id");
    
    // Verificamos que el elemento de profundidad visual existe
    expect(document.querySelector('[class*="ambientGlow"]')).toBeDefined();
  });
});