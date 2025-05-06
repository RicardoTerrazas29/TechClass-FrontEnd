// src/navegador/ProtectedRoute.tsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../Providers/UserProvider";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { role } = useUser();
  const location = useLocation();

  if (!role) {
    // Si no hay rol definido, redirige al login
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Si el rol no es permitido, redirige a una página de acceso denegado o login
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
