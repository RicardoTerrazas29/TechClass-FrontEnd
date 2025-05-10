import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { useUser } from "../Providers/UserProvider";
import MobileMenu from "./MobileMenu";

export const Navbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { setRole } = useUser();
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const cerrarSesion = () => {
    localStorage.clear();
    setRole(null);
    navigate("/");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      // Cierra las notificaciones si el clic fue fuera de su contenedor
      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
      // Cierra el menú de perfil si el clic fue fuera de su contenedor
      if (profileRef.current && !profileRef.current.contains(target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="h-16 bg-[#70A1FF] px-4 shadow-md fixed top-0 left-0 right-0 z-10 flex items-center justify-between">
      {/* Mobile: Menú hamburguesa y título centrado */}
      <div className="lg:hidden flex justify-between items-center w-full">
        {/* Izquierda: Burger */}
        <div className="w-10 flex justify-start">
          <MobileMenu />
        </div>

        {/* Centro: Título */}
        <div className="flex-1 text-center">
          <h3 className="text-2xl font-bold text-white">TechClass</h3>
        </div>
        {/* Derecha: Espacio vacío para balance visual (mismo ancho que burger) */}
        <div className="w-10" />
      </div>
      {/* Desktop: Oculta el título y hamburguesa, solo íconos a la derecha */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-4 pr-2">
        <div className="relative" ref={notificationRef}>
          <button
            className="relative flex items-center gap-2 text-white"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-5 w-5 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
              3
            </span>
          </button>
          {showNotifications && (
            <NotificationsDropdown
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-sm font-medium text-white hidden sm:block">
              {localStorage.getItem("name")}
            </span>
          </button>
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg border py-1">
              <button
                onClick={cerrarSesion}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
