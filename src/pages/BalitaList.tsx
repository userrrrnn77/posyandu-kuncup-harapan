import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit2, Trash2, Eye, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { usePosyandu } from "../hooks/usePosyandu";
import { useBalitaActions } from "../hooks/useBalitaActions";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../lib/cn";
import type { IBalita } from "../types";
import { ConfirmModal } from "../components/ConfirmModal";

const BalitaList = () => {
  const { balitas, isFetching, fetchBalitas } = usePosyandu("balita");
  const { removeBalita } = useBalitaActions();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [selectedBalita, setSelectedBalita] = useState<IBalita | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = [...balitas]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .filter(
      (b) =>
        b.namaBalita.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        b.nomorIndukKependudukan?.includes(debouncedSearch),
    );

  const exportToExcel = () => {
    const dataToExport = filteredData.map((b) => ({
      "Nama Balita": b.namaBalita,
      "Nama Orang Tua": b.namaOrangTua,
      NIK: b.nomorIndukKependudukan || "-",
      "Jenis Kelamin": b.jenisKelamin,
      RT: b.rukunTetangga,
      "BB (kg)": b.antropometri.beratBadan,
      "TB (cm)": b.antropometri.tinggiBadan,
      Keterangan: b.keterangan || "-",
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // 🔥 Jurus Auto-Fit Vibranium
    const headers = Object.keys(dataToExport[0]);
    const wscols = headers.map((header) => {
      // 1. Cek panjang header
      let maxLen = header.length;

      // 2. Loop semua data di kolom ini buat cari yang terpanjang
      dataToExport.forEach((row) => {
        const cellValue = row[header as keyof typeof row]?.toString() || "";
        if (cellValue.length > maxLen) {
          maxLen = cellValue.length;
        }
      });

      // 3. Balikin lebar kolom (ditambah 3 buat padding biar gak mepet)
      return { wch: maxLen + 3 };
    });

    worksheet["!cols"] = wscols;

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Balita");
    XLSX.writeFile(
      workbook,
      `Data_Balita_Posyandu_${new Date().toLocaleDateString()}.xlsx`,
    );
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await removeBalita(deleteId);
    if (success) {
      fetchBalitas();
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500 pb-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">
            DATA BALITA
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium italic">
            Manajemen & Monitoring Tumbuh Kembang
          </p>
        </div>
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm text-sm">
            <Download size={18} />
            Export
          </button>
          <Link
            to="/balita/add"
            className="btn-josjis flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 py-2.5 text-sm">
            <Plus size={20} />
            Tambah Data
          </Link>
        </div>
      </div>

      {/* Search Bar Area */}
      <div className="relative w-full md:max-w-md">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          placeholder="Cari nama atau NIK..."
          className="input-posyandu pl-11 h-11 md:h-12 shadow-sm text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Tabel Data */}
      <DataTable
        headers={["Nama Lengkap", "Orang Tua", "NIK", "Aksi"]}
        data={filteredData}
        isLoading={isFetching}
        renderRow={(balita) => (
          <tr
            key={balita._id}
            className="hover:bg-slate-50/50 transition-colors group">
            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                {balita.namaBalita}
              </p>
              <span
                className={cn(
                  "text-[9px] md:text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider",
                  balita.jenisKelamin === "Laki-laki"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-rose-100 text-rose-600",
                )}>
                {balita.jenisKelamin}
              </span>
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap font-medium text-slate-600 text-sm">
              {balita.namaOrangTua}
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap font-mono text-xs md:text-sm text-slate-400 uppercase">
              {balita.nomorIndukKependudukan || "---"}
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedBalita(balita);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-slate-400 hover:text-primary hover:bg-emerald-50 rounded-lg transition-all">
                  <Eye size={18} />
                </button>
                <Link
                  to={`/balita/edit/${balita._id}`}
                  className="p-2 text-slate-400 hover:text-amber-500 hover:bg-amber-50 rounded-lg transition-all">
                  <Edit2 size={18} />
                </Link>
                <button
                  onClick={() => setDeleteId(balita._id!)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      {/* Modal Detail */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Informasi Detail Balita">
        {selectedBalita && (
          <div className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">
                  Nama
                </p>
                <p className="text-lg md:text-xl font-bold text-slate-800 truncate">
                  {selectedBalita.namaBalita}
                </p>
              </div>
              <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">
                  NIK
                </p>
                <p className="text-lg md:text-xl font-bold text-slate-800 font-mono tracking-tight">
                  {selectedBalita.nomorIndukKependudukan || "---"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">
                  Anak Ke
                </p>
                <p className="text-lg md:text-xl font-bold text-slate-800">
                  {selectedBalita.anakKe}
                </p>
              </div>
              <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">
                  Wilayah
                </p>
                <p className="text-lg md:text-xl font-bold text-slate-800 uppercase italic">
                  RT {selectedBalita.rukunTetangga}
                </p>
              </div>
            </div>

            <div className="space-y-1 px-1">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase">
                Alamat Domisili
              </p>
              <p className="text-sm md:text-base text-slate-700 font-medium leading-relaxed italic">
                {selectedBalita.alamatLengkap}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <h4 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-sm md:text-base">
                <div className="w-1.5 h-4 bg-primary rounded-full"></div>
                Data Antropometri Terakhir
              </h4>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="p-3 md:p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">
                    Berat Badan
                  </p>
                  <p className="text-xl md:text-2xl font-black text-slate-800">
                    {selectedBalita.antropometri.beratBadan}{" "}
                    <span className="text-xs md:text-sm font-normal text-slate-400">
                      kg
                    </span>
                  </p>
                </div>
                <div className="p-3 md:p-4 border border-slate-100 rounded-2xl bg-white shadow-sm">
                  <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase">
                    Tinggi Badan
                  </p>
                  <p className="text-xl md:text-2xl font-black text-slate-800">
                    {selectedBalita.antropometri.tinggiBadan}{" "}
                    <span className="text-xs md:text-sm font-normal text-slate-400">
                      cm
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">
                Catatan Medis
              </p>
              <div className="p-3 md:p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs md:text-sm text-amber-800 italic">
                "{selectedBalita.keterangan || "Tidak ada catatan."}"
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={!!deleteId}
        isLoading={isDeleting}
        onClose={() => setDeleteId(null)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default BalitaList;
