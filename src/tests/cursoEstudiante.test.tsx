import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CursoEstudiante from "../navegador/menuEstudiante/cursoEstudiante";
import { BrowserRouter } from "react-router-dom";

describe("cursoEstudiante", () => {
  it("muestra el título de cursos", () => {
    render(
      <BrowserRouter>
        <CursoEstudiante />
      </BrowserRouter>
    );
    expect(
      screen.getByText(/¡Hola, Explorador! Estos son tus cursos/i)
    ).toBeInTheDocument();
  });

  it("muestra el panel de progreso", () => {
    render(
      <BrowserRouter>
        <CursoEstudiante />
      </BrowserRouter>
    );
    expect(screen.getByText(/Tu Progreso/i)).toBeInTheDocument();
  });

  it("muestra logros recientes", () => {
    render(
    <BrowserRouter>
        <CursoEstudiante />
    </BrowserRouter>);
    expect(screen.getByText(/Logros recientes/i)).toBeInTheDocument();
  });
});