import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Logros from "../navegador/menuProfesor/logros";
import { BrowserRouter } from "react-router-dom";

describe("logros", () => {
  it("muestra el título de gestión de logros", () => {
    render(
  <BrowserRouter>
    <Logros />
    </BrowserRouter>);
    expect(screen.getByText(/Gestión de Logros/i)).toBeInTheDocument();
  });

  it("envía el formulario de nuevo logro", () => {
    render(<BrowserRouter><Logros /></BrowserRouter>);
    fireEvent.click(screen.getByText(/Nuevo Logro/i));
    fireEvent.change(screen.getByPlaceholderText(/Título/i), { target: { value: "Logro Test" } });
    // Completa los otros campos requeridos...
    fireEvent.click(screen.getByText(/Crear Logro/i));
    // Espera que aparezca el nuevo logro en la lista o un mensaje de éxito
  });
});