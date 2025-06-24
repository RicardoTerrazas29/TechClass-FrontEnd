import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContenidosCurso from "../navegador/menuProfesor/ContenidosCurso";
import { BrowserRouter } from "react-router-dom";

describe("ContenidoCurso", () => {
  it("muestra el botón de añadir contenido", () => {
    render(
      <BrowserRouter>
        <ContenidosCurso />
      </BrowserRouter>
    );
    expect(screen.getByText(/Añadir Contenido/i)).toBeInTheDocument();
  });

  it("al hacer clic en 'Añadir Contenido' se muestra el formulario", () => {
    render(
      <BrowserRouter>
        <ContenidosCurso />
      </BrowserRouter>
    );
    const addButton = screen.getByText(/Añadir Contenido/i);
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText(/Título del Contenido/i)).toBeInTheDocument();
  });
});