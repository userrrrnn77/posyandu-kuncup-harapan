import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Save,
  HeartPulse,
  Activity,
  Lock,
  Loader2,
} from "lucide-react";
import { useLansiaActions } from "../hooks/useLansiaActions";
import { usePosyanduStore } from "../store/posyanduStore";
import { useFormDraft } from "../hooks/useFormDraft";
import { Input } from "../components/Input";
import type { ILansia } from "../types";

const lansiaSchema = z.object({
  namaLengkapLansia: z.string(),
  nomorIndukKependudukan: z.string(),
  alamatLengkapDomisili: z.string().min(5, "Alamat kurang lengkap"),
  rukunTetangga: z.string().min(1, "RT wajib diisi"),
  tanggalLahirLansia: z.string().min(1),
  beratBadanKilogram: z.coerce.number().min(20),
  tinggiBadanSentimeter: z.coerce.number().min(100),
  tekananDarahSistolikDiastolik: z
    .string()
    .regex(/^\d+\/\d+$/, "Format: 120/80"),
  kadarGulaDarahSewaktuMgdl: z.coerce.number().min(10),
  kadarAsamUratDarahMgdl: z.coerce.number().min(1),
  kadarKolesterolTotalMgdl: z.coerce.number().min(50),
  catatanKesehatanTambahan: z.string().optional(),
  tanggalPemeriksaan: z.string().min(1),
});

type LansiaFormInput = z.input<typeof lansiaSchema>;
type LansiaFormData = z.output<typeof lansiaSchema>;

const LansiaEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateLansia, isSubmitting } = useLansiaActions();

  const { lansias, isFetching } = usePosyanduStore();
  const currentLansia = lansias.find((l) => l._id === id);

  const form = useForm<LansiaFormInput, unknown, LansiaFormData>({
    resolver: zodResolver(lansiaSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const { clearDraft } = useFormDraft(form, `draft-lansia-edit-${id}`);

  useEffect(() => {
    if (currentLansia) {
      reset({
        namaLengkapLansia: currentLansia.namaLengkapLansia,
        nomorIndukKependudukan: currentLansia.nomorIndukKependudukan,
        alamatLengkapDomisili: currentLansia.alamatLengkapDomisili,
        rukunTetangga: currentLansia.rukunTetangga,
        tanggalLahirLansia:
          typeof currentLansia.tanggalLahirLansia === "string"
            ? currentLansia.tanggalLahirLansia.split("T")[0]
            : "",
        beratBadanKilogram: currentLansia.beratBadanKilogram,
        tinggiBadanSentimeter: currentLansia.tinggiBadanSentimeter,
        tekananDarahSistolikDiastolik:
          currentLansia.tekananDarahSistolikDiastolik,
        kadarGulaDarahSewaktuMgdl: currentLansia.kadarGulaDarahSewaktuMgdl,
        kadarAsamUratDarahMgdl: currentLansia.kadarAsamUratDarahMgdl,
        kadarKolesterolTotalMgdl: currentLansia.kadarKolesterolTotalMgdl,
        catatanKesehatanTambahan: currentLansia.catatanKesehatanTambahan || "",
        tanggalPemeriksaan:
          typeof currentLansia.tanggalPemeriksaan === "string"
            ? currentLansia.tanggalPemeriksaan.split("T")[0]
            : "",
      });
    }
  }, [currentLansia, reset]);

  const onSubmit = async (data: LansiaFormData) => {
    if (!id) return;
    const success = await updateLansia(id, data as unknown as Partial<ILansia>);
    if (success) {
      clearDraft();
      navigate("/lansia");
    }
  };

  if (isFetching && !currentLansia) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-slate-400 gap-3 italic font-bold">
        <Loader2 className="animate-spin text-primary" size={40} />
        Syncing Lansia Data...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/lansia")}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold transition-all">
          <ChevronLeft size={20} /> Kembali
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Update Medis
          </h1>
          <p className="text-[10px] text-rose-500 font-black tracking-widest uppercase italic">
            Lansia: {currentLansia?.namaLengkapLansia}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* IDENTITAS TERKUNCI */}
        <div className="card-titanium bg-slate-50/50 border-slate-200 opacity-80">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
            <div className="flex items-center gap-2 text-slate-500">
              <Lock size={18} />
              <h2 className="font-bold uppercase text-xs">
                Identitas Permanen
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama Lengkap"
              {...register("namaLengkapLansia")}
              readOnly
              className="bg-slate-100 cursor-not-allowed font-bold"
            />
            <Input
              label="NIK"
              {...register("nomorIndukKependudukan")}
              readOnly
              className="bg-slate-100 cursor-not-allowed font-mono"
            />
          </div>
        </div>

        {/* DATA EDITABLE */}
        <div className="card-titanium space-y-6 border-t-4 border-t-rose-500">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4 text-rose-500">
            <HeartPulse size={24} />
            <h2 className="font-bold uppercase text-sm tracking-widest text-slate-800">
              Update Kondisi & Domisili
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              label="Tanggal Pemeriksaan Baru"
              type="date"
              {...register("tanggalPemeriksaan")}
              error={errors.tanggalPemeriksaan?.message}
            />
          </div>
        </div>

        {/* MEDIS SECTION */}
        <div className="card-titanium bg-slate-900 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 text-white pointer-events-none">
            <Activity size={120} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            <Input
              label="TD (mmHg)"
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
              label="Asam Urat"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("kadarAsamUratDarahMgdl")}
              error={errors.kadarAsamUratDarahMgdl?.message}
            />
            <Input
              label="Kolesterol"
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

        <div className="card-titanium space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase ml-1">
            Catatan Medis Terbaru
          </label>
          <textarea
            {...register("catatanKesehatanTambahan")}
            className="input-posyandu min-h-25 pt-3 bg-slate-50"
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/lansia")}
            className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50">
            Batalkan
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-2 bg-rose-600 hover:bg-rose-700 text-white font-black py-4 rounded-2xl shadow-xl shadow-rose-100 flex items-center justify-center gap-2 disabled:opacity-50 transition-all">
            <Save size={20} />{" "}
            {isSubmitting ? "Syncing..." : "Update Data Medis"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LansiaEdit;
