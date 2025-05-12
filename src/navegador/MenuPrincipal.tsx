import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar";
import { Sidebar } from "../Components/Sidebar";
import {
  adminNavigation,
  professorNavigation,
  studentNavigation,
} from "../const/profile";
import { useUser } from "../Providers/UserProvider";

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
    <div className="flex">
      {/* Sidebar solo en escritorio */}
      <div className="hidden lg:block fixed left-0 top-0 h-full w-64 z-20">
        <Sidebar navigation={navigation} />
      </div>

      {/* Contenedor principal (Navbar + contenido) */}
      <div className="flex flex-col flex-1 lg:ml-64">
        <Navbar />
        <main className="mt-16 ">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MenuBar;
