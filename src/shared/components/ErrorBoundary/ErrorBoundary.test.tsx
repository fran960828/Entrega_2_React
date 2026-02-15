import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  MemoryRouter,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import { ErrorBoundary } from "./ErrorBoundary";

// 1. Mockeamos react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useRouteError: vi.fn(),
    isRouteErrorResponse: vi.fn(),
  };
});

describe("ErrorBoundary", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("debe mostrar el error 404 correctamente", () => {
    // Configuramos los mocks para simular un 404
    (useRouteError as any).mockReturnValue({ status: 404 });
    (isRouteErrorResponse as any).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Dimension Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(/Rick must have messed with the coordinates/i)
    ).toBeInTheDocument();
  });

  it("debe mostrar el error 503 cuando los servidores están caídos", () => {
    (useRouteError as any).mockReturnValue({ status: 503 });
    (isRouteErrorResponse as any).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByText("503")).toBeInTheDocument();
    expect(screen.getByText("Service Unavailable")).toBeInTheDocument();
    expect(
      screen.getByText(/The Citadel's servers are down/i)
    ).toBeInTheDocument();
  });

  it("debe mostrar un error genérico 500 para fallos inesperados", () => {
    // Simulamos un error que NO es una respuesta de ruta (ej. un error de JS)
    (useRouteError as any).mockReturnValue(new Error("Crash!"));
    (isRouteErrorResponse as any).mockReturnValue(false);

    render(
      <MemoryRouter>
        <ErrorBoundary />
      </MemoryRouter>
    );

    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Unexpected Error")).toBeInTheDocument();
    expect(
      screen.getByText(/Something went wrong in this dimension/i)
    ).toBeInTheDocument();
  });

  it("debe contener un link para volver a la página principal", () => {
    (useRouteError as any).mockReturnValue({ status: 404 });
    (isRouteErrorResponse as any).mockReturnValue(true);

    render(
      <MemoryRouter>
        <ErrorBoundary />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /Back to Earth C-137/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
