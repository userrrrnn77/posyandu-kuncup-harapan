import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Save,
  Trash2,
  HeartPulse,
  Activity,
  User,
} from "lucide-react";
import { useLansiaActions } from "../hooks/useLansiaActions";
import { useFormDraft } from "../hooks/useFormDraft";
import { Input } from "../components/Input";
import type { ILansia } from "../types";

// 🛡️ Schema Adamantium untuk Lansia
const lansiaSchema = z.object({
  namaLengkapLansia: z.string().min(3, "Nama terlalu pendek!"),
  nomorIndukKependudukan: z.string().length(16, "NIK harus 16 digit!"),
  alamatLengkapDomisili: z.string().min(5, "Alamat kurang lengkap"),
  rukunTetangga: z.string().min(1, "RT wajib diisi"),
  tanggalLahirLansia: z.string().min(1, "Tanggal lahir wajib diisi"),
  beratBadanKilogram: z.coerce.number().min(20, "BB tidak valid"),
  tinggiBadanSentimeter: z.coerce.number().min(100, "TB tidak valid"),
  tekananDarahSistolikDiastolik: z
    .string()
    .regex(/^\d+\/\d+$/, "Format TD harus (contoh: 120/80)"),
  kadarGulaDarahSewaktuMgdl: z.coerce.number().min(10, "GDS tidak valid"),
  kadarAsamUratDarahMgdl: z.coerce.number().min(1, "Asam Urat tidak valid"),
  kadarKolesterolTotalMgdl: z.coerce.number().min(50, "Kolesterol tidak valid"),
  catatanKesehatanTambahan: z.string().optional(),
  tanggalPemeriksaan: z.string().min(1, "Tanggal pemeriksaan wajib diisi"),
});

type LansiaFormInput = z.input<typeof lansiaSchema>;
type LansiaFormData = z.output<typeof lansiaSchema>;

const LansiaAdd = () => {
  const navigate = useNavigate();
  const { addLansia, isSubmitting } = useLansiaActions();

  const form = useForm<LansiaFormInput, unknown, LansiaFormData>({
    resolver: zodResolver(lansiaSchema),
    defaultValues: {
      namaLengkapLansia: "",
      nomorIndukKependudukan: "",
      alamatLengkapDomisili: "",
      rukunTetangga: "",
      tanggalLahirLansia: "",
      beratBadanKilogram: 0,
      tinggiBadanSentimeter: 0,
      tekananDarahSistolikDiastolik: "",
      kadarGulaDarahSewaktuMgdl: 0,
      kadarAsamUratDarahMgdl: 0,
      kadarKolesterolTotalMgdl: 0,
      catatanKesehatanTambahan: "",
      tanggalPemeriksaan: new Date().toISOString().split("T")[0],
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const { clearDraft } = useFormDraft(form, "draft-lansia-add");

  const onSubmit = async (data: LansiaFormData) => {
    const success = await addLansia(data as unknown as Omit<ILansia, "_id">);
    if (success) {
      clearDraft();
      reset();
      navigate("/lansia");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/lansia")}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-all">
          <ChevronLeft size={20} /> Kembali
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
            Registrasi Lansia
          </h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            Kesehatan Warga Senior
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* IDENTITAS */}
        <div className="card-titanium space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
            <User className="text-primary" size={24} />
            <h2 className="font-bold text-slate-800 uppercase text-sm">
              Informasi Personal
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama Lengkap Lansia"
              {...register("namaLengkapLansia")}
              error={errors.namaLengkapLansia?.message}
            />
            <Input
              label="NIK (16 Digit)"
              {...register("nomorIndukKependudukan")}
              error={errors.nomorIndukKependudukan?.message}
            />
            <Input
              label="Tanggal Lahir"
              type="date"
              {...register("tanggalLahirLansia")}
              error={errors.tanggalLahirLansia?.message}
            />
            <Input
              label="Alamat Domisili"
              {...register("alamatLengkapDomisili")}
              error={errors.alamatLengkapDomisili?.message}
            />
            <Input
              label="RT"
              {...register("rukunTetangga")}
              error={errors.rukunTetangga?.message}
            />
            <Input
              label="Tanggal Pemeriksaan"
              type="date"
              {...register("tanggalPemeriksaan")}
              error={errors.tanggalPemeriksaan?.message}
            />
          </div>
        </div>

        {/* DATA VITAL & MEDIS */}
        <div className="card-titanium bg-slate-900 text-white space-y-8">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <HeartPulse className="text-rose-400" size={24} />
            <h2 className="font-bold uppercase text-sm tracking-widest text-white">
              Parameter Kesehatan
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Input
              label="TD (Sistol/Diastol)"
              placeholder="120/80"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("tekananDarahSistolikDiastolik")}
              error={errors.tekananDarahSistolikDiastolik?.message}
            />
            <Input
              label="GDS (mg/dL)"
              type="number"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("kadarGulaDarahSewaktuMgdl")}
              error={errors.kadarGulaDarahSewaktuMgdl?.message}
            />
            <Input
              label="Asam Urat (mg/dL)"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("kadarAsamUratDarahMgdl")}
              error={errors.kadarAsamUratDarahMgdl?.message}
            />
            <Input
              label="Kolesterol (mg/dL)"
              type="number"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("kadarKolesterolTotalMgdl")}
              error={errors.kadarKolesterolTotalMgdl?.message}
            />
            <Input
              label="BB (kg)"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("beratBadanKilogram")}
              error={errors.beratBadanKilogram?.message}
            />
            <Input
              label="TB (cm)"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("tinggiBadanSentimeter")}
              error={errors.tinggiBadanSentimeter?.message}
            />
          </div>
        </div>

        {/* CATATAN */}
        <div className="card-titanium space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
            <Activity className="text-amber-500" size={24} />
            <h2 className="font-bold text-slate-800 uppercase text-sm">
              Catatan Kesehatan
            </h2>
          </div>
          <textarea
            {...register("catatanKesehatanTambahan")}
            placeholder="Tambahkan keluhan atau rekomendasi di sini..."
            className="input-posyandu min-h-30 pt-3 bg-slate-50"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/lansia")}
            className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
            <Trash2 size={20} /> Batalkan
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-2 btn-josjis py-4 text-lg shadow-xl shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-2">
            <Save size={20} />{" "}
            {isSubmitting ? "Menyimpan..." : "Simpan Data Lansia"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LansiaAdd;
