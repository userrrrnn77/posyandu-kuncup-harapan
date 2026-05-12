import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, type, ...props }, ref) => {
    // State buat toggle fitur intip password
    const [showPassword, setShowPassword] = useState(false);

    // Cek apakah tipenya password biar button matanya nongol
    const isPassword = type === "password";

    // Logic ganti tipe input: kalo lagi diintip jadi 'text', kalo kaga balik 'password'
    const inputType = isPassword ? (showPassword ? "text" : "password") : type;

    return (
      <div className="w-full space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>

        <div className="relative group">
          <input
            ref={ref}
            type={inputType}
            className={cn(
              "input-posyandu pr-11 transition-all duration-200",
              error && "border-rose-500 focus:ring-rose-200 bg-rose-50/10",
              className,
            )}
            {...props}
          />

          {/* Button Matanya di sini Bre */}
          {isPassword && (
            <button
              type="button" // Wajib type button biar kaga submit form pas di-klik
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-primary transition-all active:scale-90 focus:outline-none"
              tabIndex={-1} // Biar kaga kena fokus tab pas user lagi ngetik
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="animate-in fade-in zoom-in duration-200"
                />
              ) : (
                <Eye
                  size={18}
                  className="animate-in fade-in zoom-in duration-200"
                />
              )}
            </button>
          )}
        </div>

        {error && (
          <p className="text-xs text-rose-500 font-medium ml-1 animate-in slide-in-from-top-1">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
