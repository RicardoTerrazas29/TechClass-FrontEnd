import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  Bell,
  HelpCircle,
} from "lucide-react";

const adminNavigation = [
  { name: "Principal", icon: LayoutDashboard, path: "principal" },
  { name: "Admins", icon: BookOpen, path: "administrador" },
  { name: "Teachers", icon: Users, path: "Profesores" },
  { name: "Students", icon: Bell, path: "Estudiantes" },
];

const professorNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "principal" },
  { name: "Students", icon: LayoutDashboard, path: "estudiantes" },
  { name: "Courses", icon: BookOpen, path: "cursos" },
  { name: "Monitor", icon: HelpCircle, path: "grafico" },
  { name: "Profile", icon: HelpCircle, path: "perfil" },
];

const studentNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "principal" },
  { name: "Courses", icon: BookOpen, path: "cursos" },
  { name: "Profile", icon: HelpCircle, path: "perfil" },
];

// Lógica de rol:
const role = localStorage.getItem("role");

const navigation =
  role === "ADMIN"
    ? adminNavigation
    : role === "PROFESOR"
    ? professorNavigation
    : role === "ESTUDIANTE"
    ? studentNavigation
    : [];

const MenuBar = () => {
  return (
    <div>
      {/* Barra superior */}
      <Navbar />
      {/* Barra lateral */}
      <Sidebar navigation={navigation} />

      {/* Contenido de las páginas */}
      <main style={{ marginLeft: "250px", marginTop: "60px", padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MenuBar;
