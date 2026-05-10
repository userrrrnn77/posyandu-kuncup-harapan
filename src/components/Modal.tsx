import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { cn } from "../lib/cn";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop / Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div
        className={cn(
          "relative bg-white w-full max-w-lg rounded-titanium shadow-2xl border border-slate-100",
          "animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]",
          className,
        )}>
        {/* Header Modal */}
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body Modal (Bisa Scroll kalau form kepanjangan) */}
        <div className="p-6 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
};
