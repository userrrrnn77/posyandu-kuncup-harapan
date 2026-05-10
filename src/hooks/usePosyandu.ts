import { useEffect } from "react";
import { usePosyanduStore } from "../store/posyanduStore";
import { useAuthStore } from "../store/authStore";

export const usePosyandu = (type?: "balita" | "lansia") => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { balitas, lansias, isFetching, fetchBalitas, fetchLansias } =
    usePosyanduStore();

  useEffect(() => {
    if (isAuthenticated) {
      if (type === "balita") {
        fetchBalitas();
      } else if (type === "lansia") {
        fetchLansias();
      } else {
        fetchBalitas();
        fetchLansias();
      }
    }
  }, [type, isAuthenticated, fetchBalitas, fetchLansias]);

  const getTodayKunjungan = () => {
    const today = new Date().toISOString().split("T")[0]; // Format: YYYY-MM-DD

    // Filter Balita yang dibuat hari ini
    const balitaToday = balitas.filter(
      (b) => b.createdAt && b.createdAt.toString().split("T")[0] === today,
    ).length;

    // Filter Lansia yang diperiksa hari ini
    const lansiaToday = lansias.filter(
      (l) =>
        l.tanggalPemeriksaan &&
        l.tanggalPemeriksaan.toString().split("T")[0] === today,
    ).length;

    return balitaToday + lansiaToday;
  };

  return {
    balitas: balitas || [], 
    lansias: lansias || [],
    isFetching,
    fetchBalitas,
    fetchLansias,
    totalBalita: balitas?.length || 0,
    totalLansia: lansias?.length || 0,
    totalKunjungan: getTodayKunjungan,
  };
};
