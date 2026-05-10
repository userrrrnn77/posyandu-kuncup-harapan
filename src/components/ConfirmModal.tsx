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
      <div className="flex flex-col items-center text-center p-2">
        {/* Icon Peringatan */}
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-6 animate-bounce-short">
          <AlertTriangle size={40} />
        </div>

        <h3 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">
          {title}
        </h3>
        <p className="text-slate-500 font-medium mb-8 max-w-70">{message}</p>

        <div className="flex items-center gap-3 w-full">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 px-6 py-4 border border-slate-200 text-slate-500 font-bold rounded-2xl hover:bg-slate-50 transition-all disabled:opacity-50">
            Batal
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 px-6 py-4 bg-rose-500 text-white font-bold rounded-2xl hover:bg-rose-600 shadow-xl shadow-rose-100 transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {isLoading ? "Menghapus..." : "Ya, Hapus!"}
          </button>
        </div>
      </div>
    </Modal>
  );
};
