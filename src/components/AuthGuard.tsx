import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Kalau belum login, lempar ke login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Kalau udah login, izinin lewat (render children routes)
  return <Outlet />;
};
