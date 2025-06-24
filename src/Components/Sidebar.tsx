import { useEffect, useState } from "react";
import { NavItem } from "../const/profile";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

type SidebarProps = {
  navigation: NavItem[];
};

const motivationalMessages = [
  "🍄 ¡Hola! ¿Listo para aprender algo nuevo?",
  "📚 ¡Estás haciendo un gran trabajo!",
  "✨ Recuerda repasar si tienes dudas.",
  "🧠 Cada pregunta te hace más sabio.",
  "🚀 ¡Sigue así, pequeño genio!",
];

const hongoGif = "/imagenes/hongo.gif";

export const Sidebar = ({ navigation }: SidebarProps) => {
  const location = useLocation();
  const { role } = useUser();

  const [currentMessage, setCurrentMessage] = useState(motivationalMessages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const nextIndex =
          (motivationalMessages.indexOf(prev) + 1) % motivationalMessages.length;
        return motivationalMessages[nextIndex];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-64 bg-gradient-to-br from-yellow-200 to-lime-200 h-screen fixed left-0 top-0 shadow-xl font-[Comic_Neue] border-r-4 border-lime-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="h-9 w-9 text-green-500 animate-pulse" />
          <Link
            to={`/${role?.toLowerCase()}/principal`}
            className="text-2xl font-extrabold text-green-700 tracking-wide hover:text-green-500 transition duration-300 text-decoration-none"
          >
            AprendeGenial
          </Link>
        </div>

          <div className="flex flex-col items-center justify-between h-full w-full">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`flex items-center gap-4 px-4 py-2 rounded-lg text-lg font-semibold transition-all duration-300 transform bg-gradient-to-r from-green-400 to-yellow-500 text-white shadow-md text-decoration-none ${
                      isActive
                        ? "scale-105 ring-2 ring-green-300"
                        : "hover:scale-105 hover:shadow-sm opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Icon className="h-6 w-6 text-red-600" />
                    <span className="whitespace-nowrap">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="relative mt-3 px-4 text-center">
              {/* Nube */}
              <div className="relative inline-block bg-white text-green-800 font-bold text-base py-3 px-6 rounded-2xl shadow-lg border border-green-300 animate-fade-in">
                <span>{currentMessage}</span>
                {/* Triángulo de la nube */}
                <div className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white"></div>
              </div>
              {/* Imagen del hongo */}
              <img
                src={hongoGif}
                alt="Hongo motivador"
                className="w-44 h-44 mx-auto mt-6 rounded-full shadow-md"
              />
            </div>
          </div>
      </div>
    </div>
  );
};






