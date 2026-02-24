import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { ModalProvider, useModal } from "./ModalContext";

// Componente "Dummy" para probar el hook
const TestComponent = () => {
  const { activeId, openModal, closeModal } = useModal();
  return (
    <div>
      <p data-testid="active-id">{activeId || "none"}</p>
      <button onClick={() => openModal("123")}>Open</button>
      <button onClick={() => closeModal()}>Close</button>
    </div>
  );
};

describe("ModalContext", () => {
  it("debe lanzar un error si se usa fuera de ModalProvider", () => {
    // Silenciamos el error en consola para este test específico
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<TestComponent />)).toThrow(
      "useModal must be used within ModalProvider"
    );

    consoleSpy.mockRestore();
  });

  it("debe sincronizar activeId con los parámetros de la URL", () => {
    render(
      <MemoryRouter initialEntries={["/test?modalId=456"]}>
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("active-id")).toHaveTextContent("456");
  });

  it("debe añadir el modalId a la URL al llamar a openModal", () => {
    render(
      <MemoryRouter initialEntries={["/test"]}>
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Open"));
    expect(screen.getByTestId("active-id")).toHaveTextContent("123");
  });

  it("debe eliminar el modalId de la URL al llamar a closeModal", () => {
    render(
      <MemoryRouter initialEntries={["/test?modalId=789"]}>
        <ModalProvider>
          <TestComponent />
        </ModalProvider>
      </MemoryRouter>
    );

    expect(screen.getByTestId("active-id")).toHaveTextContent("789");

    fireEvent.click(screen.getByText("Close"));
    expect(screen.getByTestId("active-id")).toHaveTextContent("none");
  });
});
