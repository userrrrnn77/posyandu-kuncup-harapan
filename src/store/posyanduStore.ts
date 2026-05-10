// src/store/posyanduStore.ts

import { create } from "zustand";
import type { ApiResponse, IBalita, ILansia } from "../types";
import { posyanduService } from "../api/layanan";

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

  // src/store/posyanduStore.ts

  fetchBalitas: async () => {
    set({ isFetching: true });
    try {
      const res = await posyanduService.getBalita();

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
      const res = await posyanduService.getLansia();

      const arrayLansia = Array.isArray(res)
        ? res
        : (res as ApiResponse<ILansia[]>).data;

      set({ lansias: arrayLansia || [] });
    } catch (error) {
      console.error("❌ Gagal total:", error);
      set({ balitas: [] });
    } finally {
      set({ isFetching: false });
    }
  },
}));
