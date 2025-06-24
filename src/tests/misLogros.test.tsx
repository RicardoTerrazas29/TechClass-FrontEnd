import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MisLogros from "../navegador/menuEstudiante/misLogros";
import { BrowserRouter } from "react-router-dom";

describe("misLogros", () => {
  it("muestra el título de gestión de logros", () => {
    render(
      <BrowserRouter>
        <MisLogros />
      </BrowserRouter>
    );
    expect(screen.getByText(/Gestión de Logros/i)).toBeInTheDocument();
  });
})