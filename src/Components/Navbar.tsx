import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const { role } = useUser();

  const cerrarSesion = () => {
    localStorage.clear();
    setRole(null);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        notificationRef.current &&
        !notificationRef.current.contains(target)
      ) {
        setShowNotifications(false);
      }
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
    <nav
      className="flex items-center justify-between h-16 bg-gradient-to-br 
    from-yellow-200 to-lime-200 fixed top-0 right-0 left-0 z-10 shadow-md 
    font-[Comic_Neue] px-4 border-b-4 border-lime-300"
    >
      {/* Mobile: Menú hamburguesa y título centrado */}
      <div className="lg:hidden flex justify-between items-center w-full">
        {/* Izquierda: Burger */}
        <div className="w-10 flex justify-start">
          <MobileMenu />
        </div>

        {/* Centro: Título */}
        <div className="flex-1 text-center">
          <Link
            to={`/${role?.toLowerCase()}/principal`}
            className="text-2xl font-extrabold text-green-700 tracking-wide hover:text-green-500 transition duration-300 text-decoration-none" // Agregado text-decoration-none aquí
          >
            AprendeGenial
          </Link>
        </div>
        {/* Derecha: Espacio vacío para balance visual (mismo ancho que burger) */}
        <div className="w-10" />
      </div>
      {/* Desktop: Oculta el título y hamburguesa, solo íconos a la derecha */}
      <div className="hidden lg:flex flex-1 justify-end items-center gap-4 pr-2">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative flex items-center gap-2 text-green-800 hover:scale-110 transition-transform duration-200"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-6 w-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center shadow-lg">
              3
            </span>
          </button>
          {showNotifications && (
            <NotificationsDropdown
              onClose={() => setShowNotifications(false)}
            />
          )}
        </div>

        {/* Profile */}
        <div className="relative pr-4" ref={profileRef}>
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-3 hover:scale-110 transition-transform duration-200"
          >
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-lime-400 shadow-md"
            />
            <span className="text-sm font-medium text-green-900 hidden sm:block">
              {localStorage.getItem("name")}
            </span>
          </button>
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-lime-200 py-1 z-20">
              <button
                onClick={() => cerrarSesion()}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-lime-100 hover:text-red-700 transition"
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
