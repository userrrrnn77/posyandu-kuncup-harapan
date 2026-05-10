import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "../lib/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        <label className="text-sm font-semibold text-slate-700 ml-1">
          {label}
        </label>
        <input
          ref={ref}
          className={cn(
            "input-posyandu", // Pakai class dari index.css tadi
            error && "border-rose-500 focus:ring-rose-200",
            className,
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-rose-500 font-medium ml-1">{error}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
