import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { Modal } from "./Modal";

describe("Modal Component", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    // 1. Preparamos el portal en el DOM
    const modalRoot = document.createElement("div");
    modalRoot.setAttribute("id", "modal-root");
    document.body.appendChild(modalRoot);
    vi.clearAllMocks();
  });

  afterEach(() => {
    // 2. Limpiamos para que no afecte a otros tests
    document.body.innerHTML = "";
    document.body.style.overflow = "unset";
  });

  it("debe renderizar el título y el contenido correctamente", () => {
    render(
      <Modal onClose={mockOnClose} title="Test Modal">
        <p>Contenido del modal</p>
      </Modal>
    );

    expect(screen.getByText("Test Modal")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("debe llamar a onClose al pulsar el botón de cerrar", () => {
    render(<Modal onClose={mockOnClose}>Content</Modal>);

    const closeBtn = screen.getByRole("button");
    fireEvent.click(closeBtn);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("debe llamar a onClose al pulsar la tecla Escape", () => {
    render(<Modal onClose={mockOnClose}>Content</Modal>);

    fireEvent.keyDown(window, { key: "Escape" });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("No debe llamar a onClose al hacer clic en el contenido", () => {
    render(
      <Modal onClose={mockOnClose}>
        <div data-testid="modal-content">Contenido</div>
      </Modal>
    );

    // Clic en el contenido (no debería cerrar por el stopPropagation)
    fireEvent.click(screen.getByTestId("modal-content"));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it("debe bloquear el scroll del body al montarse y liberarlo al desmontarse", () => {
    const { unmount } = render(<Modal onClose={mockOnClose}>Content</Modal>);

    expect(document.body.style.overflow).toBe("hidden");

    unmount(); // Desmontamos el componente

    expect(document.body.style.overflow).toBe("unset");
  });
});
