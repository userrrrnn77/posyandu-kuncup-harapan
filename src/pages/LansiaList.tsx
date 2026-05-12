import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit2, Trash2, Eye, Download } from "lucide-react";
import * as XLSX from "xlsx";
import { usePosyandu } from "../hooks/usePosyandu";
import { useLansiaActions } from "../hooks/useLansiaActions";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { useDebounce } from "../hooks/useDebounce";
import type { ILansia } from "../types";
import { cn } from "../lib/cn";
import { ConfirmModal } from "../components/ConfirmModal";

const LansiaList = () => {
  const { lansias, isFetching, fetchLansias } = usePosyandu("lansia");
  const { removeLansia } = useLansiaActions();

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);

  const [selectedLansia, setSelectedLansia] = useState<ILansia | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData = [...lansias]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    })
    .filter(
      (l) =>
        l.namaLengkapLansia
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        l.nomorIndukKependudukan?.includes(debouncedSearch),
    );

  const exportToExcel = () => {
    const dataToExport = filteredData.map((l) => ({
      "Nama Lansia": l.namaLengkapLansia,
      NIK: l.nomorIndukKependudukan,
      RT: l.rukunTetangga,
      "TD (mmHg)": l.tekananDarahSistolikDiastolik,
      "GDS (mg/dL)": l.kadarGulaDarahSewaktuMgdl,
      "AU (mg/dL)": l.kadarAsamUratDarahMgdl,
      Kolesterol: l.kadarKolesterolTotalMgdl,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Lansia");
    XLSX.writeFile(
      workbook,
      `Data_Lansia_USM_${new Date().toLocaleDateString()}.xlsx`,
    );
  };

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    const success = await removeLansia(deleteId);
    if (success) {
      fetchLansias();
      setDeleteId(null);
    }
    setIsDeleting(false);
  };

  return (
    <div className="space-y-4 md:space-y-6 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight uppercase">
            DATA LANSIA
          </h1>
          <p className="text-xs md:text-sm text-slate-500 font-medium italic">
            Pemantauan Kesehatan Warga Senior
          </p>
        </div>
        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
          <button
            onClick={exportToExcel}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all shadow-sm text-sm">
            <Download size={18} /> Export
          </button>
          <Link
            to="/lansia/add"
            className="btn-josjis flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 py-2.5 text-sm">
            <Plus size={20} /> Tambah Data
          </Link>
        </div>
      </div>

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

      <DataTable
        headers={["Nama Lengkap", "NIK", "Tekanan Darah", "GDS", "Aksi"]}
        data={filteredData}
        isLoading={isFetching}
        renderRow={(lansia) => (
          <tr
            key={lansia._id}
            className="hover:bg-slate-50/50 transition-colors">
            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
              <p className="font-bold text-slate-800 text-sm md:text-base">
                {lansia.namaLengkapLansia}
              </p>
              <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase">
                RT {lansia.rukunTetangga}
              </p>
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap font-mono text-xs md:text-sm text-slate-500">
              {lansia.nomorIndukKependudukan}
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap font-bold text-primary text-sm md:text-base">
              {lansia.tekananDarahSistolikDiastolik}{" "}
              <span className="text-[9px] md:text-[10px] font-normal text-slate-400">
                mmHg
              </span>
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
              <span
                className={cn(
                  "px-2 py-1 rounded-md text-[10px] md:text-xs font-bold",
                  lansia.kadarGulaDarahSewaktuMgdl > 200
                    ? "bg-rose-100 text-rose-600"
                    : "bg-emerald-100 text-emerald-600",
                )}>
                {lansia.kadarGulaDarahSewaktuMgdl} mg/dL
              </span>
            </td>
            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setSelectedLansia(lansia);
                    setIsModalOpen(true);
                  }}
                  className="p-2 text-slate-400 hover:text-primary">
                  <Eye size={18} />
                </button>
                <Link
                  to={`/lansia/edit/${lansia._id}`}
                  className="p-2 text-slate-400 hover:text-amber-500">
                  <Edit2 size={18} />
                </Link>
                <button
                  onClick={() => setDeleteId(lansia._id!)}
                  className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                  <Trash2 size={18} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Detail Kesehatan Lansia">
        {selectedLansia && (
          <div className="space-y-4 md:space-y-6">
            <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Identitas
              </p>
              <p className="font-bold text-primary-dark text-sm md:text-base">
                <span className="text-gray-400">Nama</span>{" "}
                {selectedLansia.namaLengkapLansia}
              </p>
              <p className="text-xs md:text-sm text-slate-500 font-medium font-mono">
                NIK {selectedLansia.nomorIndukKependudukan}
              </p>
            </div>

            <div className="p-3 md:p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-1">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Domisili
              </p>
              <p className="font-bold text-slate-800 text-sm md:text-base">
                {selectedLansia.alamatLengkapDomisili}
              </p>
              <p className="text-xs md:text-sm text-slate-500 font-medium italic">
                RT {selectedLansia.rukunTetangga}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <HealthCard
                label="Asam Urat"
                value={selectedLansia.kadarAsamUratDarahMgdl}
                unit="mg/dL"
              />
              <HealthCard
                label="Kolesterol"
                value={selectedLansia.kadarKolesterolTotalMgdl}
                unit="mg/dL"
              />
              <HealthCard
                label="Berat Badan"
                value={selectedLansia.beratBadanKilogram}
                unit="kg"
              />
              <HealthCard
                label="Tinggi"
                value={selectedLansia.tinggiBadanSentimeter}
                unit="cm"
              />
            </div>

            <div className="pt-2">
              <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">
                Catatan Tambahan
              </p>
              <div className="p-3 md:p-4 bg-amber-50 border border-amber-100 rounded-xl text-xs md:text-sm text-amber-800 italic">
                "
                {selectedLansia.catatanKesehatanTambahan ||
                  "Tidak ada catatan."}
                "
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

const HealthCard = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) => (
  <div className="p-3 border border-slate-100 rounded-xl bg-white shadow-sm">
    <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-tight">
      {label}
    </p>
    <p className=" md:text-lg font-black text-slate-800">
      {value}{" "}
      <span className="text-[10px] md:text-xs font-normal text-slate-400">
        {unit}
      </span>
    </p>
  </div>
);

export default LansiaList;
