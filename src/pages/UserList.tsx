import { useEffect, useState } from "react";
import { authService } from "../api/layanan";
import { DataTable } from "../components/DataTable";
import { Modal } from "../components/Modal";
import { Input } from "../components/Input";
import { ShieldCheck, UserCog, Phone, User, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ApiResponse, IUser } from "../types";

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State buat Modal Edit
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [editForm, setEditForm] = useState({
    fullname: "",
    password: "",
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setIsLoading(true);
      try {
        const res = await authService.getAllUsers();
        const data = Array.isArray(res)
          ? res
          : (res as ApiResponse<IUser[]>).data;
        if (!cancelled) setUsers(data || []);
      } catch (error) {
        console.log(error);
        if (!cancelled) toast.error("Gagal ambil data petugas");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void load();
    return () => {
      cancelled = true;
    }; // biar ga error kalau komponen di-unmount pas lagi fetch
  }, [refreshKey]); // tiap refreshKey berubah, fetch ulang

  const handleEditClick = (user: IUser) => {
    setSelectedUser(user);
    setEditForm({ fullname: user.fullname, password: user.password });
  };

  const handleUpdate = async () => {
    if (!selectedUser?._id) return;
    setIsSubmitting(true);
    try {
      toast.success(`Data ${editForm.fullname} Berhasil Diperbarui!`);
      setSelectedUser(null);
      setRefreshKey((k) => k + 1); // ← ganti fetchUsers() dengan ini
    } catch (error) {
      console.log(error);
      toast.error("Gagal update petugas");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 text-primary rounded-2xl">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight uppercase">
            Petugas Posyandu
          </h1>
          <p className="text-sm text-slate-500 font-medium italic">
            Manajemen Akses Mabes Kuncup Harapan
          </p>
        </div>
      </div>

      <DataTable
        headers={["Nama Lengkap", "Nomor Telepon", "Aksi"]}
        data={users}
        isLoading={isLoading}
        renderRow={(user) => (
          <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                  <User size={20} />
                </div>
                <p className="font-bold text-slate-800">{user.fullname}</p>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center gap-2 text-slate-500 font-mono">
                <Phone size={14} />
                {user.phone}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <button
                onClick={() => handleEditClick(user)}
                className="btn-secondary py-2 px-4 flex items-center gap-2 text-xs">
                <UserCog size={16} /> Edit Akses
              </button>
            </td>
          </tr>
        )}
      />

      {/* MODAL EDIT JOSJIS */}
      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Edit Profil Petugas">
        <div className="space-y-5 p-2">
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-xl mb-4">
            <p className="text-xs text-amber-800 font-medium">
              ⚠️ Perubahan data ini akan langsung mempengaruhi akses login
              petugas yang bersangkutan.
            </p>
          </div>

          <Input
            label="Nama Lengkap"
            value={editForm.fullname}
            onChange={(e) =>
              setEditForm({ ...editForm, fullname: e.target.value })
            }
          />

          <Input
            label="Password kosongkan jika tidak di ganti"
            value={editForm.password}
            onChange={(e) =>
              setEditForm({ ...editForm, password: e.target.value })
            }
          />

          <div className="pt-4 flex gap-3">
            <button
              onClick={() => setSelectedUser(null)}
              className="flex-1 px-4 py-3 border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all">
              Batal
            </button>
            <button
              onClick={handleUpdate}
              disabled={isSubmitting}
              className="flex-2 btn-josjis py-3 flex items-center justify-center gap-2">
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <Save size={18} />
              )}
              Simpan Perubahan
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserList;
