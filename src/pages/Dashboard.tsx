import { usePosyandu } from "../hooks/usePosyandu";
import { StatCard } from "../components/StatCard";
import { Baby, Users, Activity, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { totalBalita, totalLansia, isFetching, totalKunjungan } =
    usePosyandu();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Selamat Datang 👋
        </h1>
        <p className="text-slate-500">
          Berikut ringkasan data Posyandu hari ini.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Balita"
          value={isFetching ? "..." : totalBalita}
          icon={Baby}
          colorClass="bg-emerald-500 shadow-emerald-200"
        />
        <StatCard
          title="Total Lansia"
          value={isFetching ? "..." : totalLansia}
          icon={Users}
          colorClass="bg-rose-500 shadow-rose-200"
        />
        <StatCard
          title="Kunjungan"
          value={isFetching ? "..." : totalKunjungan()}
          icon={Activity}
          colorClass="bg-amber-500 shadow-amber-200"
        />
      </div>

      {/* Quick Actions (Biar sat-set) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          to="/balita/add"
          className="p-6 bg-white border border-dashed border-slate-300 rounded-titanium flex items-center justify-between hover:border-primary hover:bg-emerald-50 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 text-emerald-600 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800">Tambah Data Balita</h3>
              <p className="text-sm text-slate-500">
                Input data tumbuh kembang anak baru.
              </p>
            </div>
          </div>
        </Link>

        <Link
          to="/lansia/add"
          className="p-6 bg-white border border-dashed border-slate-300 rounded-titanium flex items-center justify-between hover:border-primary hover:bg-rose-50 transition-all group">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-100 text-rose-600 rounded-xl group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <Plus size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800">Tambah Data Lansia</h3>
              <p className="text-sm text-slate-500">
                Input hasil pemeriksaan lansia baru.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
