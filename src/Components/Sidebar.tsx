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
    <div className="w-64 bg-[#343a40] border-r h-screen fixed left-0 top-0 ">
      <div className="p-6 ">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">
            <Link to="/" className="text-white text-decoration-none">
              TechClass
            </Link>
          </span>
        </div>
        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname.split("/")[2] === item.path;

            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-decoration-none ${
                  isActive
                    ? "bg-[#495057] text-white"
                    : "text-[#adb5bd] hover:bg-[#495057] hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
