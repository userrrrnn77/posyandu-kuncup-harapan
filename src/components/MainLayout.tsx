import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { Navbar } from "../components/Navbar";

export const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-base">
      {/* 1. SIDEBAR (Fixed di mobile via portal-like logic, sticky di desktop) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 2. WRAPPER KONTEN (Kanan) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* 3. NAVBAR (Atas) - Kirim fungsi buat buka menu */}
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        {/* 4. MAIN CONTAINER (Tengah) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
