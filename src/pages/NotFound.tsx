import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4 md:p-6 text-center">
      <div className="max-w-md w-full space-y-5 md:space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Icon Area - Ukuran adaptif */}
        <div className="relative inline-flex">
          <div className="p-5 md:p-6 bg-rose-50 text-rose-500 rounded-full shadow-inner">
            <AlertCircle size={60} className="md:size-20" strokeWidth={1.5} />
          </div>
          <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-white px-2 py-0.5 md:px-3 md:py-1 rounded-full shadow-sm border border-slate-100 text-xl md:text-3xl font-black text-slate-800">
            404
          </span>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase px-4 leading-tight">
            Halamannya <span className="text-rose-500">Ghoib</span>, Nih!
          </h1>
          <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed px-4">
            Waduh, sepertinya halaman yang lu cari udah pindah ke dimensi lain
            atau lu salah ketik rute nih. Cek lagi URL-nya, Arsitek!
          </p>
        </div>

        {/* Button Area */}
        <div className="pt-4 flex flex-col gap-3 px-4 md:px-0">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn-josjis w-full py-3.5 md:py-4 flex items-center justify-center gap-2 text-base md:text-lg shadow-lg shadow-emerald-100 active:scale-95 transition-transform">
            <Home size={20} />
            Balik ke Mabes
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-slate-600 font-semibold text-xs md:text-sm transition-colors py-2">
            Kembali ke halaman sebelumnya
          </button>
        </div>

        {/* Footer Lucu-lucuan */}
        <p className="text-[9px] md:text-[10px] text-slate-300 uppercase tracking-[0.15em] md:tracking-[0.2em] pt-6 md:pt-8">
          Posyandu USM • Security System Active
        </p>
      </div>
    </div>
  );
};

export default NotFound;
