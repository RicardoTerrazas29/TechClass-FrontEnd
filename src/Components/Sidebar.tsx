import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type NavItem = {
  name: string;
  icon: React.ElementType;
  path: string;
};

type SidebarProps = {
  navigation: NavItem[];
};

export const Sidebar = ({ navigation }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-gradient-to-b from-yellow-200 via-yellow-100 to-yellow-50 h-screen fixed left-0 top-0 shadow-2xl font-[Comic_Neue] border-r-4 border-yellow-300">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-10">
          <BookOpen className="h-8 w-8 text-yellow-500 animate-bounce" />
          <Link
            to="/"
            className="text-2xl font-extrabold text-yellow-600 tracking-wide hover:text-yellow-500 transition"
          >
            TechClass ☀️
          </Link>
        </div>

        <nav className="space-y-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-3 rounded-full text-lg font-bold shadow-md transition-all duration-300 transform ${
                  isActive
                    ? "bg-yellow-400 text-yellow-900 scale-105"
                    : "bg-yellow-100 text-yellow-800 hover:bg-yellow-300 hover:scale-105"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="whitespace-nowrap">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};


