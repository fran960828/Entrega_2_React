import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination", () => {
  const mockOnPageChange = vi.fn();

  it("debe mostrar la página actual y el total correctamente", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("/ 10")).toBeInTheDocument();
  });

  it("debe deshabilitar el botón 'Prev' si estamos en la página 1", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /prev/i });
    expect(prevButton).toBeDisabled();
  });

  it("debe deshabilitar el botón 'Next' si estamos en la última página", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    expect(nextButton).toBeDisabled();
  });

  it("debe llamar a onPageChange con la página siguiente al pulsar 'Next'", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByRole("button", { name: /next/i });
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  it("debe llamar a onPageChange con la página anterior al pulsar 'Prev'", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByRole("button", { name: /prev/i });
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });
});
