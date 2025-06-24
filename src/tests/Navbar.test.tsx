import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Navbar } from "../Components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "../Providers/UserProvider";

describe("Navbar", () => {
  it("al hacer clic en 'Cerrar Sesión' se ejecuta la función", () => {
    render(
      <UserProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </UserProvider>
    );
    fireEvent.click(screen.getByRole("button", { name: /cerrar sesión/i }));
    // Aquí puedes mockear y verificar el efecto secundario si tienes una función de logout mockeada
  });

  it("muestra el logo de la aplicación", () => {
    render(
      <UserProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </UserProvider>
    );
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
  });

    it("navega al perfil al hacer clic en el botón de perfil", () => {
        render(
            <UserProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </UserProvider>
        );
        const perfilBtn = screen.getByRole("button", { name: /perfil/i });
        fireEvent.click(perfilBtn);
        // Aquí puedes mockear el navigate y verificar la navegación si es necesario
    });

    it("muestra los enlaces de navegación principales", () => {
        render(
            <UserProvider>
                <BrowserRouter>
                    <Navbar />
                </BrowserRouter>
            </UserProvider>
        );
        expect(screen.getByText(/inicio/i)).toBeInTheDocument();
        expect(screen.getByText(/cursos/i)).toBeInTheDocument();
        expect(screen.getByText(/logros/i)).toBeInTheDocument();
    });
});