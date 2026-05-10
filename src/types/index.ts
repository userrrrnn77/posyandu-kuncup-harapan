// src/types/index.ts

export interface Antropometri {
  beratBadan: number;
  tinggiBadan: number;
  lingkarLenganAtas: number;
  lingkarKepala: number;
}

export interface IBalita {
  _id?: string;
  nomorIndukKependudukan?: string;
  namaBalita: string;
  namaOrangTua: string;
  anakKe: number;
  jenisKelamin: "Laki-laki" | "Perempuan";
  alamatLengkap: string;
  rukunTetangga: string;
  tanggalLahir: string | Date;
  antropometri: Antropometri;
  keterangan?: string;
  createdAt?: string;
}

export interface ILansia {
  _id?: string;
  nomorIndukKependudukan: string;
  namaLengkapLansia: string;
  alamatLengkapDomisili: string;
  rukunTetangga: string;
  tanggalLahirLansia: string | Date;
  beratBadanKilogram: number;
  tinggiBadanSentimeter: number;
  tekananDarahSistolikDiastolik: string;
  kadarGulaDarahSewaktuMgdl: number;
  kadarAsamUratDarahMgdl: number;
  kadarKolesterolTotalMgdl: number;
  catatanKesehatanTambahan?: string;
  tanggalPemeriksaan: string | Date;
  createdAt?: string;
}

export interface IUser {
  _id?: string;
  fullname: string;
  phone: string;
  password: string; // Optional karena biasanya gak dikirim balik dari API
}

// Helper buat Response API lu biar makin Josjis
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
