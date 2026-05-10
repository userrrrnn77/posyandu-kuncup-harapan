import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronLeft,
  Save,
  Baby,
  Ruler,
  Activity,
  Loader2,
  Lock,
} from "lucide-react";
import { useBalitaActions } from "../hooks/useBalitaActions";
import { usePosyanduStore } from "../store/posyanduStore";
import { Input } from "../components/Input";
import type { IBalita } from "../types";

const balitaSchema = z.object({
  namaBalita: z.string(),
  namaOrangTua: z.string().min(3, "Nama Orang Tua wajib diisi!"),
  nomorIndukKependudukan: z.string().optional(),
  anakKe: z.coerce.number().min(1),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]),
  alamatLengkap: z.string().min(5, "Alamat kurang lengkap"),
  rukunTetangga: z.string().min(1, "RT wajib diisi"),
  tanggalLahir: z.string().min(1),
  antropometri: z.object({
    beratBadan: z.coerce.number().min(0.1, "BB tidak valid"),
    tinggiBadan: z.coerce.number().min(1, "TB tidak valid"),
    lingkarLenganAtas: z.coerce.number().min(1, "LiLA tidak valid"),
    lingkarKepala: z.coerce.number().min(1, "LiKa tidak valid"),
  }),
  keterangan: z.string().optional(),
});

type BalitaFormInput = z.input<typeof balitaSchema>;
type BalitaFormData = z.output<typeof balitaSchema>;

const BalitaEdit = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { updateBalita, isSubmitting } = useBalitaActions();

  const { balitas, isFetching } = usePosyanduStore();
  const currentBalita = balitas.find((b) => b._id === id);

  const form = useForm<BalitaFormInput, unknown, BalitaFormData>({
    resolver: zodResolver(balitaSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  useEffect(() => {
    if (currentBalita) {
      reset({
        namaBalita: currentBalita.namaBalita,
        namaOrangTua: currentBalita.namaOrangTua,
        nomorIndukKependudukan: currentBalita.nomorIndukKependudukan || "",
        anakKe: currentBalita.anakKe,
        jenisKelamin: currentBalita.jenisKelamin,
        alamatLengkap: currentBalita.alamatLengkap,
        rukunTetangga: currentBalita.rukunTetangga,
        tanggalLahir:
          typeof currentBalita.tanggalLahir === "string"
            ? currentBalita.tanggalLahir.split("T")[0]
            : "",
        antropometri: {
          beratBadan: currentBalita.antropometri.beratBadan,
          tinggiBadan: currentBalita.antropometri.tinggiBadan,
          lingkarLenganAtas: currentBalita.antropometri.lingkarLenganAtas,
          lingkarKepala: currentBalita.antropometri.lingkarKepala,
        },
        keterangan: currentBalita.keterangan || "",
      });
    }
  }, [currentBalita, reset]);

  const onSubmit = async (data: BalitaFormData) => {
    if (!id) return;
    // Identitas statis tetep dikirim atau di-filter sesuai kebutuhan API lu
    const success = await updateBalita(id, data as unknown as Partial<IBalita>);
    if (success) navigate("/balita");
  };

  if (isFetching && !currentBalita) {
    return (
      <div className="h-96 flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin" size={40} />
        <p className="font-bold">Sync data Adamantium...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/balita")}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold">
          <ChevronLeft size={20} /> Kembali
        </button>
        <div className="text-right">
          <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">
            Update Data
          </h1>
          <p className="text-[10px] text-amber-500 font-black tracking-widest uppercase italic">
            Identitas Primer Terkunci
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* IDENTITAS SECTION (READ-ONLY) */}
        <div className="card-titanium space-y-6 bg-slate-50/50 border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-2">
              <Baby className="text-slate-400" size={24} />
              <h2 className="font-bold text-slate-500 uppercase text-sm">
                Identitas Primer
              </h2>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-200 rounded-full text-[10px] font-black text-slate-600 uppercase">
              <Lock size={12} /> Terkunci
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
            <Input
              label="Nama Lengkap Balita"
              {...register("namaBalita")}
              readOnly
              className="bg-slate-100 cursor-not-allowed border-slate-200 font-bold"
            />
            <Input
              label="NIK (Nomor Induk Kependudukan)"
              {...register("nomorIndukKependudukan")}
              readOnly
              className="bg-slate-100 cursor-not-allowed border-slate-200 font-mono"
            />
          </div>
        </div>

        {/* EDITABLE SECTION */}
        <div className="card-titanium space-y-6 border-t-4 border-t-amber-500">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
            <Activity className="text-amber-500" size={20} />
            <h2 className="font-bold text-slate-800 uppercase text-sm">
              Informasi Wali & Domisili
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Nama Ibu / Wali"
              {...register("namaOrangTua")}
              error={errors.namaOrangTua?.message}
            />
            <Input
              label="Tanggal Lahir"
              type="date"
              {...register("tanggalLahir")}
              error={errors.tanggalLahir?.message}
            />
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Jenis Kelamin
              </label>
              <select
                {...register("jenisKelamin")}
                className="input-posyandu bg-white text-sm">
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </div>
            <Input
              label="Anak Ke-"
              type="number"
              {...register("anakKe")}
              error={errors.anakKe?.message}
            />
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Input
                  label="Alamat Lengkap"
                  {...register("alamatLengkap")}
                  error={errors.alamatLengkap?.message}
                />
              </div>
              <Input
                label="RT"
                {...register("rukunTetangga")}
                error={errors.rukunTetangga?.message}
              />
            </div>
          </div>
        </div>

        {/* ANTROPOMETRI SECTION */}
        <div className="card-titanium bg-slate-900 text-white space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none text-white">
            <Ruler size={120} />
          </div>
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <div className="p-2 bg-white/10 text-amber-400 rounded-lg">
              <Activity size={20} />
            </div>
            <h2 className="font-bold uppercase text-sm tracking-widest text-white">
              Update Hasil Pengukuran
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
            <Input
              label="BB (kg)"
              type="number"
              step="0.01"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("antropometri.beratBadan")}
              error={errors.antropometri?.beratBadan?.message}
            />
            <Input
              label="TB (cm)"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("antropometri.tinggiBadan")}
              error={errors.antropometri?.tinggiBadan?.message}
            />
            <Input
              label="LiLA (cm)"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("antropometri.lingkarLenganAtas")}
              error={errors.antropometri?.lingkarLenganAtas?.message}
            />
            <Input
              label="LiKa (cm)"
              type="number"
              step="0.1"
              className="bg-slate-800 border-slate-700 text-white"
              {...register("antropometri.lingkarKepala")}
              error={errors.antropometri?.lingkarKepala?.message}
            />
          </div>
        </div>

        <div className="card-titanium space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase ml-1">
            Catatan Medis Terbaru
          </label>
          <textarea
            {...register("keterangan")}
            className="input-posyandu min-h-25 pt-3 bg-slate-50"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate("/balita")}
            className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all">
            Batalkan
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-2 bg-amber-500 hover:bg-amber-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-amber-100 flex items-center justify-center gap-2 transition-all disabled:opacity-50">
            <Save size={20} />{" "}
            {isSubmitting ? "Syncing..." : "Simpan Perubahan Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BalitaEdit;
