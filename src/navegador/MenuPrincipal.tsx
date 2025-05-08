import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";

import {
  LayoutDashboard,
  BookOpen,
  Users,
  School2,
  GraduationCap,
  UserRound,
  Monitor,
} from "lucide-react";
import { useUser } from "../Providers/UserProvider";

const adminNavigation = [
  { name: "Principal", icon: LayoutDashboard, path: "/admin/principal" },
  { name: "Admins", icon: Users, path: "/admin/administrador" },
  { name: "Teachers", icon: School2, path: "/admin/profesores" },
  { name: "Students", icon: GraduationCap, path: "/admin/estudiantes" },
];

const professorNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/profesor/principal" },
  { name: "Students", icon: GraduationCap, path: "/profesor/estudiantes" },
  { name: "Courses", icon: BookOpen, path: "/profesor/cursos" },
  { name: "Monitor", icon: Monitor, path: "/profesor/grafico" },
  { name: "Profile", icon: UserRound, path: "/profesor/perfil" },
];

const studentNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/estudiante/principal" },
  { name: "Courses", icon: BookOpen, path: "/estudiante/cursos" },
  { name: "Profile", icon: UserRound, path: "/estudiante/perfil" },
];

const MenuBar = () => {
  // Lógica de rol:
  const { role } = useUser();

  const navigation =
    role === "ADMIN"
      ? adminNavigation
      : role === "PROFESOR"
      ? professorNavigation
      : role === "ESTUDIANTE"
      ? studentNavigation
      : [];

  return (
    <div>
      {/* Barra superior */}
      <Navbar />
      {/* Barra lateral */}
      <Sidebar navigation={navigation} />

      {/* Contenido de las páginas */}
      <main style={{ marginLeft: "250px", marginTop: "60px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default MenuBar;
