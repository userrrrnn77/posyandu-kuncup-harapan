import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_CORE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (!window.location.pathname.includes("/login")) {
        toast.error("Sesi Berakhir", {
          description:
            "Token kadaluarsa atau lu gak punya akses, login lagi bre!",
        });

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
