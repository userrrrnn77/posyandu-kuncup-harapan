import { useState } from "react";
import { posyanduService } from "../api/layanan";
import { toast } from "sonner";
import axios from "axios";
import type { ILansia } from "../types";

export const useLansiaActions = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addLansia = async (payload: Omit<ILansia, "_id">) => {
    setIsSubmitting(true);
    try {
      await posyanduService.createLansia(payload);
      toast.success("Data Lansia Disimpan!");
      return true;
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Gagal Simpan Data";
      toast.error(msg);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateLansia = async (id: string, payload: Partial<ILansia>) => {
    setIsSubmitting(true);
    try {
      await posyanduService.updateLansia(id, payload);
      toast.success("Data Lansia Diperbarui!");
      return true;
    } catch (error) {
      const msg = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Gagal Update Data";
      toast.error(msg);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeLansia = async (id: string) => {
    try {
      await posyanduService.deleteLansia(id);
      toast.success("Data Terhapus");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Gagal Hapus Data");
      return false;
    }
  };

  return { addLansia, updateLansia, removeLansia, isSubmitting };
};
