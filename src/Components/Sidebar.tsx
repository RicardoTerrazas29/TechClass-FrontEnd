import Lottie from "lottie-react";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import studyAnimation from "../assets/lotties/study-boy.json";
import { NavItem } from "../const/profile";

type SidebarProps = {
  navigation: NavItem[];
};

export const Sidebar = ({ navigation }: SidebarProps) => {
  const location = useLocation();

  return (
    <div className="w-64 bg-[#7ED6DF] border-r border-[#70A1FF] h-screen fixed left-0 top-0 flex flex-col justify-between">
      {/* Encabezado y navegación */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-6 w-6 text-[#FF6B81]" />
          <span className="text-xl font-semibold">
            <Link
              to="/estudiante/principal"
              className="text-white text-decoration-none"
            >
              TechClass
            </Link>
          </span>
        </div>

        <nav className="space-y-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon: any = item.icon;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-decoration-none ${
                  isActive
                    ? "bg-[#495057] text-white"
                    : "text-white hover:bg-[#495057]"
                }`}
              >
                <Icon className="h-5 w-5 text-[#FF6B81]" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Animación al fondo */}
      <div>
        <Lottie
          animationData={studyAnimation}
          loop
          autoplay
          className="w-60 h-60 mx-auto"
        />
      </div>
    </div>
  );
};
