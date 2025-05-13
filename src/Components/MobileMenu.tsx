import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer, DrawerTrigger, DrawerContent } from "./ui/drawer";
import { Menu, X, LogOut } from "lucide-react";
import { useUser } from "../Providers/UserProvider";
import {
  adminNavigation,
  professorNavigation,
  studentNavigation,
} from "../const/profile";
import AvatarUsuario from "./AvatarUsuario";
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { role, setRole } = useUser();

  const userNavigation =
    role === "ADMIN"
      ? adminNavigation
      : role === "PROFESOR"
      ? professorNavigation
      : role === "ESTUDIANTE"
      ? studentNavigation
      : [];

  const cerrarSesion = () => {
    localStorage.clear();
    setRole(null);
    setIsOpen(false);
    window.location.href = "/"; // o usa navigate si estás dentro de un componente con hook
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      {/* Trigger para abrir el menú */}
      <DrawerTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-md bg-green-500 text-white transition block lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>

      {/* Contenido del menú */}
      <DrawerContent
        className="bg-gradient-to-br 
    from-yellow-200 to-lime-200 text-white w-full max-w-xs h-screen flex flex-col justify-between overflow-hidden [&>div:first-child]:hidden"
      >
        {/* Parte superior: Perfil y navegación */}
        <div className="p-6">
          {/* Perfil de usuario */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {/* Imagen de perfil */}
            <AvatarUsuario />
            <div className="flex flex-col mt-3">
              <p className="text-sm font-semibold text-green-700">
                {localStorage.getItem("name") || "Usuario"}
              </p>
              <p className="text-xs capitalize text-green-700">
                {role?.toLowerCase()}
              </p>
            </div>
            <div className="flex ml-auto mb-6">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md hover:bg-[#495057] transition"
              >
                <X className="h-6 w-6 text-red-700" />
              </button>
            </div>
          </div>

          {/* Navegación */}
          <nav className="space-y-4">
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition font-medium no-underline text-decoration-none"
              >
                <item.icon className="h-5 w-5 text-green-500" />
                <span className="hover:text-white">{item.name}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Parte inferior: Cerrar sesión */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-3 text-red-700 hover:text-white transition"
          >
            <LogOut className="h-5 w-5" />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
