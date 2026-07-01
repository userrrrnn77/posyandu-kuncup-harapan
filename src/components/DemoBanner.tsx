// src/components/DemoBanner.tsx
import { Eye } from "lucide-react";
import { isDemoMode } from "../lib/demoMode";

export const DemoBanner = () => {
  if (!isDemoMode()) return null;

  return (
    <div className="flex items-center justify-center gap-2 bg-amber-400 text-amber-950 text-xs md:text-sm font-bold px-4 py-2 text-center">
      <Eye size={16} />
      MODE DEMO — Data NIK & alamat disamarkan, aksi tambah/edit/hapus
      dinonaktifkan
    </div>
  );
};
