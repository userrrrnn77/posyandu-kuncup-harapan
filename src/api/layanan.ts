// src/api/layanan.ts
import api from "./axios";
import type { IBalita, ILansia, IUser, ApiResponse } from "../types";

class AuthService {
  async login(
    payload: Pick<IUser, "phone" | "password">,
  ): Promise<ApiResponse<IUser>> {
    const { data } = await api.post("/auth/login", payload);
    return data;
  }

  async register(payload: IUser): Promise<ApiResponse<IUser>> {
    const { data } = await api.post("/auth/register", payload);
    return data;
  }

  async logout(): Promise<ApiResponse<null>> {
    const { data } = await api.post("/auth/logout");
    return data;
  }

  async getAllUsers(): Promise<ApiResponse<IUser[]>> {
    const { data } = await api.get("/auth/users");
    return data;
  }

  async updateUser(
    id: string,
    payload: Partial<IUser>,
  ): Promise<ApiResponse<IUser>> {
    const { data } = await api.patch(`/auth/users/${id}`, payload);
    return data;
  }
}

class PosyanduService {
  // --- DEMO (publik, read-only, data di-mask dari backend) ---
  async getBalitaDemo(): Promise<ApiResponse<IBalita[]>> {
    const { data } = await api.get("/posyandu/demo/balita");
    return data;
  }

  async getLansiaDemo(): Promise<ApiResponse<ILansia[]>> {
    const { data } = await api.get("/posyandu/demo/lansia");
    return data;
  }

  // --- BALITA ---
  async getBalita(): Promise<ApiResponse<IBalita[]>> {
    const { data } = await api.get("/posyandu/balita");
    return data;
  }

  async createBalita(
    payload: Omit<IBalita, "_id">,
  ): Promise<ApiResponse<IBalita>> {
    const { data } = await api.post("/posyandu/balita", payload);
    return data;
  }

  async updateBalita(
    id: string,
    payload: Partial<IBalita>,
  ): Promise<ApiResponse<IBalita>> {
    const { data } = await api.put(`/posyandu/balita/${id}`, payload);
    return data;
  }

  async deleteBalita(id: string): Promise<ApiResponse<null>> {
    const { data } = await api.delete(`/posyandu/balita/${id}`);
    return data;
  }

  // --- LANSIA ---
  async getLansia(): Promise<ApiResponse<ILansia[]>> {
    const { data } = await api.get("/posyandu/lansia");
    return data;
  }

  async createLansia(
    payload: Omit<ILansia, "_id">,
  ): Promise<ApiResponse<ILansia>> {
    const { data } = await api.post("/posyandu/lansia", payload);
    return data;
  }

  async updateLansia(
    id: string,
    payload: Partial<ILansia>,
  ): Promise<ApiResponse<ILansia>> {
    const { data } = await api.put(`/posyandu/lansia/${id}`, payload);
    return data;
  }

  async deleteLansia(id: string): Promise<ApiResponse<null>> {
    const { data } = await api.delete(`/posyandu/lansia/${id}`);
    return data;
  }
}

export const authService = new AuthService();
export const posyanduService = new PosyanduService();
