import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-base">
      {/* 1. FIXED SIDEBAR (Kiri) */}
      <Sidebar />

      {/* 2. WRAPPER KONTEN (Kanan) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* 3. NAVBAR (Atas) */}
        <Navbar />

        {/* 4. MAIN CONTAINER (Tengah) */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Di sinilah semua Page (Dashboard, Balita, dll) 
              bakal dirender secara dinamis oleh RRD 
            */}
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
