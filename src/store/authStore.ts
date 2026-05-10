import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IUser } from "../types";
import { authService } from "../api/layanan";

interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: Pick<IUser, "phone" | "password">) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (payload) => {
        set({ isLoading: true });
        try {
          const res = await authService.login(payload);
          set({ user: res.data, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await authService.logout();
        } finally {
          set({ user: null, isAuthenticated: false });
          // Bersihin sisa-sisa di storage
          localStorage.removeItem("posyandu-auth");
        }
      },

      checkAuth: async () => {
        try {
          const res = await authService.getAllUsers(); // Atau bikin endpoint /me
          if (res.success) set({ isAuthenticated: true });
        } catch {
          set({ isAuthenticated: false, user: null });
        }
      },
    }),
    { name: "posyandu-auth" },
  ),
);
