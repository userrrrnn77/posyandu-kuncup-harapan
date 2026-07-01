// src/hooks/useBalitaActions.ts

import { useState } from "react";
import { posyanduService } from "../api/layanan";
import { toast } from "sonner";
import axios from "axios";
import type { IBalita } from "../types";
import { isDemoMode } from "../lib/demoMode";

const blockInDemo = () => {
  toast.error("Mode Demo", {
    description: "Aksi ini dinonaktifkan di mode demo, Bre!",
  });
};

export const useBalitaActions = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addBalita = async (payload: Omit<IBalita, "_id">) => {
    if (isDemoMode()) {
      blockInDemo();
      return false;
    }
    setIsSubmitting(true);
    try {
      await posyanduService.createBalita(payload);
      toast.success("Data Balita Disimpan!", {
        description: "Siap dipantau perkembangannya!",
      });
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

  const updateBalita = async (id: string, payload: Partial<IBalita>) => {
    if (isDemoMode()) {
      blockInDemo();
      return false;
    }
    setIsSubmitting(true);
    try {
      await posyanduService.updateBalita(id, payload);
      toast.success("Data Balita Diperbarui!", {
        description: "Data sudah sinkron!",
      });
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

  const removeBalita = async (id: string) => {
    if (isDemoMode()) {
      blockInDemo();
      return false;
    }
    try {
      await posyanduService.deleteBalita(id);
      toast.success("Data Terhapus");
      return true;
    } catch (error) {
      console.log(error);
      toast.error("Gagal Hapus Data");
      return false;
    }
  };

  return { addBalita, updateBalita, removeBalita, isSubmitting };
};
