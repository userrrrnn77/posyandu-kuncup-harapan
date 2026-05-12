import { usePosyandu } from "../hooks/usePosyandu";
import { StatCard } from "../components/StatCard";
import { Baby, Users, Plus, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { balitas, lansias, totalBalita, totalLansia, isFetching } =
    usePosyandu();

  const recentBalita = [...balitas]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  const recentLansia = [...lansias]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .slice(0, 5);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 pb-10 font-sans">
      {/* Header Welcome */}
      <div className="flex flex-col gap-1">
        <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight">
          Selamat Datang 👋
        </h1>
        <p className="text-xs md:text-sm text-slate-500 font-medium">
          Berikut ringkasan data Posyandu hari ini.
        </p>
      </div>

      {/* Stats Grid - Tumpuk di Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
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
      </div>

      {/* Quick Actions - Tumpuk di Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <Link
          to="/balita/add"
          className="p-5 md:p-6 bg-white border border-dashed border-slate-300 rounded-titanium flex items-center justify-between hover:border-primary hover:bg-emerald-50/50 transition-all group shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2.5 md:p-3 bg-emerald-100 text-emerald-600 rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <Plus size={22} className="md:size-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800 text-sm md:text-primary">
                Tambah Data Balita
              </h3>
              <p className="text-[10px] md:text-sm text-slate-500">
                Input tumbuh kembang anak baru.
              </p>
            </div>
          </div>
          <ArrowRight
            className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all hidden xs:block"
            size={20}
          />
        </Link>

        <Link
          to="/lansia/add"
          className="p-5 md:p-6 bg-white border border-dashed border-slate-300 rounded-titanium flex items-center justify-between hover:border-rose-400 hover:bg-rose-50/50 transition-all group shadow-sm">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="p-2.5 md:p-3 bg-rose-100 text-rose-600 rounded-2xl group-hover:bg-rose-500 group-hover:text-white transition-all duration-300">
              <Plus size={22} className="md:size-6" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-slate-800 text-sm md:text-rose-600">
                Tambah Data Lansia
              </h3>
              <p className="text-[10px] md:text-sm text-slate-500">
                Input pemeriksaan lansia baru.
              </p>
            </div>
          </div>
          <ArrowRight
            className="text-slate-300 group-hover:text-rose-500 group-hover:translate-x-1 transition-all hidden xs:block"
            size={20}
          />
        </Link>
      </div>

      {/* Aktivitas Terbaru - Tumpuk di Tablet/Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Card Balita */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Clock size={18} className="text-emerald-600" />
            <h2 className="font-bold text-slate-800 tracking-tight text-sm md:text-primary">
              Balita Baru Terdaftar
            </h2>
          </div>
          <div className="bg-white rounded-titanium border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            {recentBalita.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {recentBalita.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 md:p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-xs md:text-sm">
                        {item.namaBalita}
                      </span>
                      <span className="text-[10px] md:text-[11px] text-slate-400 font-medium">
                        Ortu: {item.namaOrangTua}
                      </span>
                    </div>
                    <span className="px-2 md:px-2.5 py-0.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-[9px] md:text-[10px] font-black italic whitespace-nowrap ml-2">
                      RT {item.rukunTetangga}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 md:p-10 text-center">
                <p className="text-slate-400 text-xs md:text-sm font-medium italic">
                  Belum ada data balita hari ini.
                </p>
              </div>
            )}
            <Link
              to="/balita"
              className="block w-full py-3 text-center text-[10px] md:text-xs font-bold text-slate-400 hover:text-primary hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-widest">
              Lihat Semua Data Balita
            </Link>
          </div>
        </div>

        {/* Card Lansia */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Clock size={18} className="text-rose-600" />
            <h2 className="font-bold text-slate-800 tracking-tight text-sm md:text-rose-600">
              Lansia Baru Diperiksa
            </h2>
          </div>
          <div className="bg-white rounded-titanium border border-slate-100 shadow-xl shadow-slate-200/40 overflow-hidden">
            {recentLansia.length > 0 ? (
              <div className="divide-y divide-slate-50">
                {recentLansia.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 md:p-4 flex items-center justify-between hover:bg-slate-50/80 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-700 text-xs md:text-sm">
                        {item.namaLengkapLansia}
                      </span>
                      <span className="text-[10px] md:text-[11px] text-slate-400 font-medium">
                        TD: {item.tekananDarahSistolikDiastolik}
                      </span>
                    </div>
                    <span className="px-2 md:px-2.5 py-0.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-lg text-[9px] md:text-[10px] font-black italic whitespace-nowrap ml-2">
                      RT {item.rukunTetangga}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 md:p-10 text-center">
                <p className="text-slate-400 text-xs md:text-sm font-medium italic">
                  Belum ada data lansia hari ini.
                </p>
              </div>
            )}
            <Link
              to="/lansia"
              className="block w-full py-3 text-center text-[10px] md:text-xs font-bold text-slate-400 hover:text-rose-500 hover:bg-slate-50 transition-all border-t border-slate-50 uppercase tracking-widest">
              Lihat Semua Data Lansia
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
