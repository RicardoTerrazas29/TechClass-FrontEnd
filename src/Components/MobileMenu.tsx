import { useState } from "react";
import { Link } from "react-router-dom";
import { NavItem } from "../const/profile";
import { Drawer, DrawerTrigger, DrawerContent } from "@/components/ui/drawer";
import { Menu, X, LogOut } from "lucide-react";
import { useUser } from "../Providers/UserProvider";
import {
  adminNavigation,
  professorNavigation,
  studentNavigation,
} from "../const/profile";
const MobileMenu = ({
  navigation,
  onClose,
}: {
  navigation: NavItem[];
  onClose: () => void;
}) => {
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
          className="p-2 rounded-md bg-[#70A1FF] text-white hover:bg-[#1E90FF] transition"
        >
          <Menu className="h-6 w-6" />
        </button>
      </DrawerTrigger>

      {/* Contenido del menú */}
      <DrawerContent
        side="left"
        className="bg-gradient-to-b from-[#7ED6DF] to-[#70A1FF] text-white w-64 h-screen shadow-lg"
      >
        {/* Parte superior: Perfil y navegación */}
        <div className="p-6">
          {/* Encabezado */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md hover:bg-[#495057] transition"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-xl font-bold">Menú</h2>
          </div>

          {/* Perfil de usuario */}
          <div className="flex items-center gap-3 mb-8">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Perfil"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold">
                {localStorage.getItem("name") || "Usuario"}
              </p>
              <p className="text-xs capitalize">{role?.toLowerCase()}</p>
            </div>
          </div>

          {/* Navegación */}
          <nav className="space-y-4">
            {userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-2 rounded-md hover:bg-[#495057] transition"
                onClick={() => setIsOpen(false)} // Cierra el menú al hacer clic
              >
                <div className="flex items-center gap-3">
                  <item.icon className="h-5 w-5 text-[#FF6B81]" />
                  <span className="font-medium">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>

        {/* Parte inferior: Cerrar sesión */}
        <div className="p-6 border-t border-white/20">
          <button
            onClick={cerrarSesion}
            className="flex items-center gap-3 text-red-100 hover:text-white transition"
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
