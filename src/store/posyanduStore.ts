// src/store/posyanduStore.ts

import { create } from "zustand";
import type { ApiResponse, IBalita, ILansia } from "../types";
import { posyanduService } from "../api/layanan";
import { isDemoMode } from "../lib/demoMode";

interface PosyanduState {
  balitas: IBalita[];
  lansias: ILansia[];
  isFetching: boolean;

  fetchBalitas: () => Promise<void>;
  fetchLansias: () => Promise<void>;
}

export const usePosyanduStore = create<PosyanduState>((set) => ({
  balitas: [],
  lansias: [],
  isFetching: false,

  fetchBalitas: async () => {
    set({ isFetching: true });
    try {
      const res = isDemoMode()
        ? await posyanduService.getBalitaDemo()
        : await posyanduService.getBalita();

      const arrayBalita = Array.isArray(res)
        ? res
        : (res as ApiResponse<IBalita[]>).data;

      set({ balitas: arrayBalita || [] });
    } catch (error) {
      console.error("❌ Gagal total:", error);
      set({ balitas: [] });
    } finally {
      set({ isFetching: false });
    }
  },

  fetchLansias: async () => {
    set({ isFetching: true });
    try {
      const res = isDemoMode()
        ? await posyanduService.getLansiaDemo()
        : await posyanduService.getLansia();

      const arrayLansia = Array.isArray(res)
        ? res
        : (res as ApiResponse<ILansia[]>).data;

      set({ lansias: arrayLansia || [] });
    } catch (error) {
      console.error("❌ Gagal total:", error);
      set({ lansias: [] });
    } finally {
      set({ isFetching: false });
    }
  },
}));
