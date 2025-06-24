import {
  LayoutDashboard,
  BookOpen,
  Users,
  School2,
  GraduationCap,
  UserRound,
  Monitor,
  Star,
} from "lucide-react";

export type NavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};

export const adminNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/admin/principal" },
  { name: "Admins", icon: Users, path: "/admin/administrador" },
  { name: "Teachers", icon: School2, path: "/admin/profesores" },
  { name: "Students", icon: GraduationCap, path: "/admin/estudiantes" },
];

export const professorNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/profesor/principal" },
  { name: "Students", icon: GraduationCap, path: "/profesor/estudiantes" },
  { name: "Courses", icon: BookOpen, path: "/profesor/cursos" },
  { name: "Asignaciones", icon: GraduationCap, path: "/profesor/asignaciones" },
  { name: "Monitor", icon: Monitor, path: "/profesor/monitor" },
  { name: "Logros", icon: Star, path: "/profesor/logros" },
];

export const studentNavigation = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/estudiante/principal" },
  { name: "Mis Cursos", icon: BookOpen, path: "/estudiante/cursos" },
  { name:"Mis Logros", icon: Star, path: "/estudiante/logros"}
];
