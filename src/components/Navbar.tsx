import { Bell, UserCircle } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { cn } from "../lib/cn";

export const Navbar = () => {
  // Ambil data user dari store vibranium lu
  const user = useAuthStore((state) => state.user);

  return (
    <nav className="h-16 border-b border-slate-100 bg-white/80 backdrop-blur-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* 2. ACTIONS & PROFILE */}
      <div className="flex items-center gap-4 ml-auto">
        <button className="p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-px bg-slate-100 mx-2"></div>

        {/* Info User */}
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-none capitalize">
              {user?.fullname || "Admin Posyandu"}
            </p>
            <p className="text-[10px] font-medium text-emerald-600 mt-1 uppercase tracking-wider">
              {user?.phone ? "Petugas Verifikasi" : "Guest User"}
            </p>
          </div>

          <div
            className={cn(
              "w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20",
              "shadow-sm",
            )}>
            <UserCircle size={24} />
          </div>
        </div>
      </div>
    </nav>
  );
};
