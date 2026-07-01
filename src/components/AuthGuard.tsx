import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { isDemoMode } from "../lib/demoMode";

export const AuthGuard = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Demo mode tembus tanpa login — akun cuma 1 & gaada register,
  // jadi orang yang buka link demo emang gak punya kredensial buat login sendiri.
  if (!isAuthenticated && !isDemoMode()) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
