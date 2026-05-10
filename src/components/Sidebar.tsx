import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Baby,
  Users,
  LogOut,
  UserPlus,
  PlusCircle,
  ShieldCheck
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/cn";

const menus = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Data Balita",
    path: "/balita",
    icon: Baby,
    subPaths: ["/balita/add", "/balita/edit"], // Biar tetep nyala pas di sub-page
  },
  {
    name: "Data Lansia",
    path: "/lansia",
    icon: Users,
    subPaths: ["/lansia/add", "/lansia/edit"],
  },
  {
    name: "Petugas",
    path: "/users",
    icon: ShieldCheck, // Biar kerasa "Otoritas" Petugas
  },
];

export const Sidebar = () => {
  const { pathname } = useLocation();
  const { handleLogout } = useAuth();

  // Logic Active Link Adamantium
  const isActive = (path: string, subPaths?: string[]) => {
    if (pathname === path) return true;
    if (subPaths) {
      return subPaths.some((sub) => pathname.startsWith(sub));
    }
    return false;
  };

  return (
    <aside className="w-64 bg-white border-r border-slate-100 h-screen sticky top-0 flex flex-col z-40 shadow-sm">
      {/* Brand Logo USM Section */}
      <div className="p-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-200 rotate-3 group-hover:rotate-0 transition-transform">
            USM
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tighter leading-none">
              Posyandu
            </h1>
            <span className="text-primary font-bold italic text-sm tracking-widest">
              Kuncup Harapan
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Menu Utama
        </p>

        {menus.map((menu) => {
          const active = isActive(menu.path, menu.subPaths);

          return (
            <Link
              key={menu.path}
              to={menu.path}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group",
                active
                  ? "bg-primary text-white shadow-xl shadow-emerald-100 translate-x-2"
                  : "text-slate-400 hover:bg-slate-50 hover:text-primary",
              )}>
              <div className="flex items-center gap-3">
                <menu.icon
                  size={20}
                  className={cn(
                    "transition-transform",
                    active ? "scale-110" : "group-hover:scale-110",
                  )}
                />
                <span className="tracking-tight">{menu.name}</span>
              </div>

              {active && pathname !== menu.path && (
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              )}
            </Link>
          );
        })}

        {/* Separator Section */}
        <div className="my-6 border-t border-slate-50 mx-4" />

        <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
          Akses Cepat
        </p>
        <Link
          to="/balita/add"
          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
          <PlusCircle size={18} />
          Input Data Balita
        </Link>
        <Link
          to="/lansia/add"
          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors">
          <UserPlus size={18} />
          Input Data Lansia
        </Link>
      </nav>

      {/* Footer / Logout */}
      <div className="p-4 bg-slate-50/50">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-4 w-full text-rose-500 hover:bg-rose-500 hover:text-white rounded-2xl transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-sm hover:shadow-rose-200">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
};
