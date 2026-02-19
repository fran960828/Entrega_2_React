import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DashboardBackground } from "./DashboardBackground";
import classes from "./DashboardBackground.module.css";

describe("DashboardBackground", () => {
  it("debe renderizar la estructura del portal correctamente", () => {
    const { container } = render(<DashboardBackground />);

    // Buscamos los elementos por sus clases de CSS Modules
    // Usamos querySelector con el patrón de clase parcial por si el hash cambia
    const wrapper = container.querySelector(`.${classes.portalWrapper}`);
    const ring = container.querySelector(`.${classes.portalRing}`);

    expect(wrapper).toBeInTheDocument();
    expect(ring).toBeInTheDocument();
  });

  it("debe contener los elementos de motion necesarios", () => {
    const { container } = render(<DashboardBackground />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ opacity: 0 }); 
  });
});