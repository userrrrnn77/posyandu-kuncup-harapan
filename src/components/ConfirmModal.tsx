import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  isLoading?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Hapus Data?",
  message = "Data yang dihapus nggak bisa dikembalikan lagi, yakin nih?",
  isLoading = false,
}: ConfirmModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="">
      <div className="flex flex-col items-center text-center p-2 sm:p-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 animate-bounce-short">
          <AlertTriangle size={32} className="sm:size-10" />
        </div>

        <h3 className="text-xl sm:text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-sm sm:text-base text-slate-500 font-medium mb-6 sm:mb-8 max-w-70 sm:max-w-md">
          {message}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-full sm:flex-1 order-2 sm:order-1 px-6 py-3 sm:py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all disabled:opacity-50">
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="w-full sm:flex-1 order-1 sm:order-2 px-6 py-3 sm:py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? "Menghapus..." : "Ya, Hapus!"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
