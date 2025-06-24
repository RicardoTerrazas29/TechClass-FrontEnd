import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CourseCard } from "../Components/CourseCard";
import { BrowserRouter } from "react-router-dom";

describe("CourseCard", () => {
  it("muestra el nombre del curso", () => {
    render(
      <BrowserRouter>
        <CourseCard
          id="1"
          title="Matemáticas"
          description="Curso básico"
          icon="icon.png"
          profesor="Juan Pérez"
        />
      </BrowserRouter>
    );
    expect(screen.getByText("Matemáticas")).toBeInTheDocument();
    expect(screen.getByText("Curso básico")).toBeInTheDocument();
    expect(screen.getByText("Juan Pérez")).toBeInTheDocument();
  });
});