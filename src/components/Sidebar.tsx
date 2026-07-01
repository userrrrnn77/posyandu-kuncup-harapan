import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Baby,
  Users,
  LogOut,
  UserPlus,
  PlusCircle,
  ShieldCheck,
  X,
  DoorOpen,
} from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/cn";
import { isDemoMode } from "../lib/demoMode";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menus = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  {
    name: "Data Balita",
    path: "/balita",
    icon: Baby,
    subPaths: ["/balita/add", "/balita/edit"],
  },
  {
    name: "Data Lansia",
    path: "/lansia",
    icon: Users,
    subPaths: ["/lansia/add", "/lansia/edit"],
  },
  { name: "Petugas", path: "/users", icon: ShieldCheck },
];

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  const demoActive = isDemoMode();

  const isActive = (path: string, subPaths?: string[]) => {
    if (pathname === path) return true;
    if (subPaths) return subPaths.some((sub) => pathname.startsWith(sub));
    return false;
  };

  const handleExit = () => {
    if (demoActive) {
      sessionStorage.removeItem("posyandu-demo-mode");
      navigate("/login", { replace: true });
      return;
    }
    handleLogout();
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-100 flex flex-col z-50 shadow-2xl md:shadow-sm transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-2xl flex items-center justify-center text-white font-black shadow-lg shadow-emerald-200 rotate-3">
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

          <button
            onClick={onClose}
            className="md:hidden p-2 text-slate-400 hover:text-rose-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Menu Utama
          </p>
          {menus.map((menu) => (
            <Link
              key={menu.path}
              to={menu.path}
              onClick={() => {
                if (window.innerWidth < 768) onClose();
              }}
              className={cn(
                "flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 font-bold group",
                isActive(menu.path, menu.subPaths)
                  ? "bg-primary text-white shadow-xl shadow-emerald-100 translate-x-1"
                  : "text-slate-400 hover:bg-slate-50 hover:text-primary",
              )}>
              <div className="flex items-center gap-3">
                <menu.icon size={20} />
              </div>
            </Link>
          ))}

          <div className="my-6 border-t border-slate-50 mx-4" />
          <p className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
            Akses Cepat
          </p>
          <Link
            to="/balita/add"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-emerald-600 transition-colors">
            <PlusCircle size={18} /> Input Data Balita
          </Link>
          <Link
            to="/lansia/add"
            onClick={onClose}
            className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-slate-500 hover:text-rose-600 transition-colors">
            <UserPlus size={18} /> Input Data Lansia
          </Link>
        </nav>

        <div className="p-4 bg-slate-50/50">
          <button
            onClick={handleExit}
            className={cn(
              "flex items-center gap-3 px-4 py-4 w-full rounded-2xl transition-all duration-300 font-black text-sm uppercase tracking-widest shadow-sm",
              demoActive
                ? "text-amber-600 hover:bg-amber-500 hover:text-white"
                : "text-rose-500 hover:bg-rose-500 hover:text-white",
            )}>
            {demoActive ? <DoorOpen size={18} /> : <LogOut size={18} />}
            {demoActive ? "Keluar Demo" : "Logout"}
          </button>
        </div>
      </aside>
    </>
  );
};
