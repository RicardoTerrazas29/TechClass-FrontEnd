import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, LogOut } from "lucide-react";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { useUser } from "../Providers/UserProvider";

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
    <nav className="h-16 bg-yellow-100 fixed top-0 right-0 left-64 z-10 shadow-md font-[Comic_Neue] border-b-4 border-yellow-300">
      <div className="h-full px-6 flex items-center justify-end gap-6">
        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            className="relative flex items-center gap-2 text-yellow-800 hover:scale-110 transition-transform duration-200"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell className="h-6 w-6 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center shadow-lg">
              3
            </span>
          </button>
          {showNotifications && (
            <NotificationsDropdown onClose={() => setShowNotifications(false)} />
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
              className="w-10 h-10 rounded-full border-2 border-yellow-400 shadow-md"
            />
            <span className="text-md font-bold text-yellow-900">
              {localStorage.getItem("name")}
            </span>
          </button>
          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-yellow-200 py-1 z-20">
              <button
                onClick={() => cerrarSesion()}
                className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-yellow-100 hover:text-red-700 transition"
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


