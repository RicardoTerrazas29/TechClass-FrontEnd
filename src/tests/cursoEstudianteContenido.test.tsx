import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CursoEstudianteContenido } from "../navegador/menuEstudiante/cursoEstudianteContenido";
import  CursoProfesor  from "../navegador/menuProfesor/cursoProfesor";
import { BrowserRouter } from "react-router-dom";

describe("cursoEstudianteContenido", () => {
  it("muestra el botón de volver", () => {
    render(
      <BrowserRouter>
        <CursoEstudianteContenido />
      </BrowserRouter>
    );
    expect(screen.getByText(/Volver a cursos/i)).toBeInTheDocument();
  });

  it("muestra el título de contenido", () => {
    render(
      <BrowserRouter>
        <CursoEstudianteContenido />
      </BrowserRouter>
    );
    expect(screen.getByText(/Contenido del Curso/i)).toBeInTheDocument();
  });

  it("renderiza el formulario de nuevo curso", () => {
    render(
    <BrowserRouter>
      <CursoProfesor />
    </BrowserRouter>);
    expect(screen.getByPlaceholderText(/Nombre del Curso/i)).toBeInTheDocument();
  });
});