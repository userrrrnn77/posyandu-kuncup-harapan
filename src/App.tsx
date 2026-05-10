import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";

// Layout & Guard
import { AuthGuard } from "./components/AuthGuard";
import { MainLayout } from "./components/MainLayout";

// Import Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BalitaList from "./pages/BalitaList";
import BalitaAdd from "./pages/BalitaAdd";
import BalitaEdit from "./pages/BalitaEdit";
import LansiaList from "./pages/LansiaList";
import LansiaAdd from "./pages/LansiaAdd";
import LansiaEdit from "./pages/LansiaEdit";
import NotFound from "./pages/NotFound";
import UserList from "./pages/UserList";

function App() {
  return (
    <BrowserRouter>
      {/* Toast notif biar Kader seneng pas simpan data */}
      <Toaster position="top-right" richColors closeButton />

      <Routes>
        {/* 1. Jalur Publik */}
        <Route path="/login" element={<Login />} />

        {/* 2. Jalur Terproteksi (Adamantium Guard) */}
        <Route element={<AuthGuard />}>
          <Route element={<MainLayout />}>
            {/* Redirect root ke Dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Dashboard Utama */}
            <Route path="/dashboard" element={<Dashboard />} />

            {/* 👶 Balita Section - Sinkron Sidebar path: "/balita" */}
            <Route path="/balita" element={<BalitaList />} />
            <Route path="/balita/add" element={<BalitaAdd />} />
            <Route path="/balita/edit/:id" element={<BalitaEdit />} />

            {/* 👵 Lansia Section - Sinkron Sidebar path: "/lansia" */}
            <Route path="/lansia" element={<LansiaList />} />
            <Route path="/lansia/add" element={<LansiaAdd />} />
            <Route path="/lansia/edit/:id" element={<LansiaEdit />} />

            {/* Tab User */}
            <Route path="/users" element={<UserList />} />
          </Route>
        </Route>

        {/* 3. Jalur Ghoib */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
