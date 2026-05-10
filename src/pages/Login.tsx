import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; // Cannot find module '@hookform/resolvers/zod' or its corresponding type declarations.
import * as z from "zod";
import { useAuth } from "../hooks/useAuth";
import { Input } from "../components/Input";
import { LogIn, ShieldCheck } from "lucide-react";

const loginSchema = z.object({
  phone: z.string().min(10, "Nomor HP minimal 10 angka!"),
  password: z.string().min(6, "Password minimal 6 karakter!"),
});

type LoginData = z.infer<typeof loginSchema>;

const Login = () => {
  const { handleLogin, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  return (
    <div className="min-h-screen bg-base flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-white rounded-3xl shadow-sm border border-slate-50 mb-4 text-primary">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">
            MABES <span className="text-primary">POSYANDU</span>
          </h1>
          <p className="text-slate-500 font-medium">
            Sistem Informasi Terintegrasi USM
          </p>
        </div>

        <div className="bg-white p-8 rounded-titanium shadow-xl shadow-slate-200/50 border border-slate-100">
          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <Input
              label="Nomor WhatsApp"
              placeholder="081234567xxx"
              {...register("phone")}
              error={errors.phone?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              error={errors.password?.message}
            />

            <button
              type="submit"
              disabled={isLoading}
              className="btn-josjis w-full mt-2 py-3 disabled:opacity-50">
              {isLoading ? (
                "Loading Bentar.."
              ) : (
                <>
                  <LogIn size={20} />
                  Masuk Sekarang
                </>
              )}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            Lupa password? Hubungi Admin Arsitek Titanium.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
