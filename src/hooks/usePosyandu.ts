import { useEffect } from "react";
import { usePosyanduStore } from "../store/posyanduStore";
import { useAuthStore } from "../store/authStore";
import { isDemoMode } from "../lib/demoMode";

export const usePosyandu = (type?: "balita" | "lansia") => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { balitas, lansias, isFetching, fetchBalitas, fetchLansias } =
    usePosyanduStore();

  useEffect(() => {
    if (isAuthenticated || isDemoMode()) {
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
    const today = new Date().toISOString().split("T")[0];

    const balitaToday = balitas.filter(
      (b) => b.createdAt && b.createdAt.toString().split("T")[0] === today,
    ).length;

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
