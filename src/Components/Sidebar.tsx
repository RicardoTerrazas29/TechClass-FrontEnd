import Lottie from "lottie-react";
import studyAnimation from "../assets/lotties/study-boy.json";
import { NavItem } from "../const/profile";
import { BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

type SidebarProps = {
    navigation: NavItem[];
};

export const Sidebar = ({ navigation }: SidebarProps) => {
    const location = useLocation();
    const { role } = useUser();

    return (
        <div className="w-64 bg-gradient-to-br from-yellow-200 to-lime-200 h-screen fixed left-0 top-0 shadow-xl font-[Comic_Neue] border-r-4 border-lime-300">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-10">
                    <BookOpen className="h-9 w-9 text-green-500 animate-pulse" />
                    <Link
                        to={`/${role?.toLowerCase()}/principal`}
                        className="text-2xl font-extrabold text-green-700 tracking-wide hover:text-green-500 transition duration-300 text-decoration-none" // Agregado text-decoration-none aquí
                    >
                        AprendeGenial
                    </Link>
                </div>

                <nav className="space-y-3">
                    {navigation.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon:any = item.icon;

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center gap-4 px-5 py-3 rounded-lg text-lg font-semibold transition-all duration-300 transform bg-gradient-to-r from-green-400 to-yellow-500 text-white shadow-md text-decoration-none ${ // Agregado text-decoration-none aquí
                                    isActive
                                        ? "scale-105 ring-2 ring-green-300"
                                        : "hover:scale-105 hover:shadow-sm opacity-80 hover:opacity-100"
                                }`}
                            >
                                <Icon className="h-6 w-6 text-lime-600" />
                                <span className="whitespace-nowrap">{item.name}</span>
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
            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-1/4 overflow-hidden flex items-center justify-around">
                <div className="w-10 h-10 rounded-full bg-lime-300 animate-pulse opacity-40"></div>
                <div className="w-8 h-8 rounded-full bg-green-300 animate-bounce opacity-50"></div>
                <div className="w-12 h-12 rounded-full bg-lime-400 animate-float opacity-30"></div>
            </div>
        </div>
    );
};



