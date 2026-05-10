import { useNavigate } from "react-router-dom";
import { Home, AlertCircle } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-6 text-center">
      <div className="max-w-md w-full space-y-6 animate-in fade-in zoom-in duration-300">
        {/* Icon Area */}
        <div className="relative inline-flex">
          <div className="p-6 bg-rose-50 text-rose-500 rounded-full">
            <AlertCircle size={80} strokeWidth={1.5} />
          </div>
          <span className="absolute -top-2 -right-2 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 text-3xl font-bold text-slate-800">
            404
          </span>
        </div>

        {/* Text Area */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
            Halamannya <span className="text-rose-500">Ghoib</span>, Nih!
          </h1>
          <p className="text-slate-500 font-medium leading-relaxed">
            Waduh, sepertinya halaman yang lu cari udah pindah ke dimensi lain
            atau lu salah ketik rute nih. Cek lagi URL-nya, Arsitek!
          </p>
        </div>

        {/* Button Area */}
        <div className="pt-4 flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="btn-josjis w-full py-4 flex items-center justify-center gap-2 text-lg shadow-lg shadow-emerald-100">
            <Home size={20} />
            Balik ke Mabes
          </button>

          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-slate-600 font-semibold text-sm transition-colors">
            Kembali ke halaman sebelumnya
          </button>
        </div>

        {/* Footer Lucu-lucuan */}
        <p className="text-[10px] text-slate-300 uppercase tracking-[0.2em] pt-8">
          Posyandu USM • Security System Active
        </p>
      </div>
    </div>
  );
};

export default NotFound;
