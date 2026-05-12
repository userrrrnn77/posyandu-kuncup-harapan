import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Save, Trash2, Baby, Ruler, Activity } from "lucide-react";
import { useBalitaActions } from "../hooks/useBalitaActions";
import { useFormDraft } from "../hooks/useFormDraft";
import { Input } from "../components/Input";
import type { IBalita } from "../types";

const balitaSchema = z.object({
  namaBalita: z.string().min(3, "Nama terlalu pendek!"),
  namaOrangTua: z.string().min(3, "Nama Orang Tua wajib diisi!"),
  nomorIndukKependudukan: z
    .string()
    .length(16, "NIK harus 16 digit!")
    .optional()
    .or(z.literal("")),
  anakKe: z.coerce.number().min(1, "Minimal anak ke-1"),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"]),
  alamatLengkap: z.string().min(5, "Alamat kurang lengkap"),
  rukunTetangga: z.string().min(1, "RT wajib diisi"),
  tanggalLahir: z.string().min(1, "Tanggal lahir wajib diisi"),
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

const BalitaAdd = () => {
  const navigate = useNavigate();
  const { addBalita, isSubmitting } = useBalitaActions();

  const form = useForm<BalitaFormInput, unknown, BalitaFormData>({
    resolver: zodResolver(balitaSchema),
    defaultValues: {
      namaBalita: "",
      namaOrangTua: "",
      nomorIndukKependudukan: "",
      anakKe: 1,
      jenisKelamin: "Laki-laki",
      alamatLengkap: "",
      rukunTetangga: "",
      tanggalLahir: "",
      antropometri: {
        beratBadan: 0,
        tinggiBadan: 0,
        lingkarLenganAtas: 0,
        lingkarKepala: 0,
      },
      keterangan: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;
  const { clearDraft } = useFormDraft(form, "draft-balita-add");

  const onSubmit = async (data: BalitaFormData) => {
    const success = await addBalita(data as unknown as Omit<IBalita, "_id">);
    if (success) {
      clearDraft();
      reset();
      navigate("/balita");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-4">
        <button
          onClick={() => navigate("/balita")}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-bold text-sm">
          <ChevronLeft size={20} /> List Data
        </button>
        <div className="flex items-center gap-3">
          <div className="h-10 w-1 bg-emerald-500 rounded-full hidden xs:block"></div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 tracking-tight uppercase">
              Registrasi Balita
            </h1>
            <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">
              Mabes Posyandu USM
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8">
        {/* IDENTITAS */}
        <div className="card-titanium space-y-6 p-4 md:p-8">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <Baby size={20} />
            </div>
            <h2 className="font-bold text-slate-800 uppercase text-xs md:text-sm tracking-wide">
              Informasi Identitas
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <Input
              label="Nama Lengkap Balita"
              {...register("namaBalita")}
              error={errors.namaBalita?.message}
            />
            <Input
              label="NIK (16 Digit)"
              {...register("nomorIndukKependudukan")}
              error={errors.nomorIndukKependudukan?.message}
            />
            <Input
              label="Nama Ibu / Wali"
              {...register("namaOrangTua")}
              error={errors.namaOrangTua?.message}
            />
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">
                Jenis Kelamin
              </label>
              <select
                {...register("jenisKelamin")}
                className="input-posyandu bg-white text-sm cursor-pointer">
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
            <Input
              label="Tanggal Lahir"
              type="date"
              {...register("tanggalLahir")}
              error={errors.tanggalLahir?.message}
            />
          </div>
        </div>

        {/* DOMISILI */}
        <div className="card-titanium space-y-6 p-4 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="md:col-span-2">
              <Input
                label="Alamat Domisili"
                placeholder="Jl. Gajahmada..."
                {...register("alamatLengkap")}
                error={errors.alamatLengkap?.message}
              />
            </div>
            <Input
              label="RT / Wilayah"
              placeholder="005"
              {...register("rukunTetangga")}
              error={errors.rukunTetangga?.message}
            />
          </div>
        </div>

        {/* ANTROPOMETRI */}
        <div className="card-titanium bg-slate-900 text-white space-y-6 md:space-y-8 relative overflow-hidden p-4 md:p-8">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none hidden md:block">
            <Activity size={120} />
          </div>
          <div className="flex items-center gap-2 border-b border-white/10 pb-4">
            <div className="p-2 bg-white/10 text-emerald-400 rounded-lg">
              <Ruler size={18}  />
            </div>
            <h2 className="font-bold uppercase text-xs md:text-sm tracking-widest text-white">
              Hasil Pengukuran
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
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

        <div className="card-titanium space-y-4 p-4 md:p-8">
          <div className="flex items-center gap-2 border-b border-slate-50 pb-4">
            <Activity className="text-amber-500" size={24} />
            <h2 className="font-bold text-slate-800 uppercase text-xs md:text-sm">
              Catatan Kesehatan
            </h2>
          </div>
          <textarea
            {...register("keterangan")}
            placeholder="Keluhan / Rekomendasi..."
            className="input-posyandu min-h-24 pt-3 bg-slate-50 text-sm"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            type="button"
            onClick={() => {
              clearDraft();
              reset();
              navigate("/balita");
            }}
            className="w-full sm:flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 text-sm">
            <Trash2 size={18} /> Batalkan
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:flex-1 btn-josjis py-4 text-sm md:text-lg shadow-xl shadow-emerald-100 disabled:opacity-50 flex items-center justify-center gap-2">
            <Save size={18} /> {isSubmitting ? "Menyimpan..." : "Simpan Data"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BalitaAdd;
