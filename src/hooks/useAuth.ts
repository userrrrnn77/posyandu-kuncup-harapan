import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import type { IUser } from "../types";

export const useAuth = () => {
  const navigate = useNavigate();
  const { login, logout, user, isAuthenticated, isLoading } = useAuthStore();

  const handleLogin = async (payload: Pick<IUser, "phone" | "password">) => {
    try {
      await login(payload);
      toast.success("Berhasil Masuk!", {
        description: "Selamat bertugas di Mabes Posyandu.",
      });
      navigate("/dashboard");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error("Gagal Login", {
          description:
            error.response?.data?.message || "Cek sinyal atau password Anda!",
        });
      } else {
        toast.error("Ada Masalah Internal", {
          description: "Waduh, ada error ghoib di luar urusan API nih!",
        });
      }
    }
  };

  const handleLogout = async () => {
    await logout();
    toast.info("Berhasil Keluar", {
      description: "Sampai jumpa lagi, Arsitek!",
    });
    navigate("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    handleLogin,
    handleLogout,
  };
};
