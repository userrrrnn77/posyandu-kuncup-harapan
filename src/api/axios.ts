import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_CORE_URL,
  withCredentials: true,
});

// 📍 Request Interceptor (Udah gak perlu narik token dari localstorage!)
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

// 📍 Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Karena gak ada token di localstorage, kita cuma perlu bersihin state user di Zustand
      // (State user ini cuma buat UI, bukan buat security/token)

      if (!window.location.pathname.includes("/login")) {
        // trigger fungsi logout di store lu nanti
        toast.error("Sesi Berakhir", {
          description:
            "Token kadaluarsa atau lu gak punya akses, login lagi bre!",
        });

        // Kasih delay dikit biar user sempet baca toast
        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
