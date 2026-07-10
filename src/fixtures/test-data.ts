// src/fixtures/test-data.ts

export const CREDENTIALS = {
  phone: "081234567890",
  password: "posyandu5",
};

function generateNik(): string {
  const timestamp = Date.now().toString().slice(-10);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");

  return `33${timestamp}${random}`.slice(0, 16).padEnd(16, "0");
}

function generateSuffix(): string {
  return Date.now().toString().slice(-6);
}

export function createBalitaPayload() {
  const suffix = generateSuffix();
  return {
    namaBalita: `Test Balita ${suffix}`,
    namaOrangTua: `Test Ortu ${suffix}`,
    nomorIndukKependudukan: generateNik(),
    anakKe: "1",
    jenisKelamin: "Laki-laki" as const,
    alamatLengkap: `Jl. Testing Playwright No. ${suffix}`,
    rukunTetangga: "005",
    tanggalLahir: "2023-05-15",
    antropometri: {
      beratBadan: "12.5",
      tinggiBadan: "85.5",
      lingkarLenganAtas: "14.2",
      lingkarKepala: "46.5",
    },
    keterangan: `Catatan otomatis dari Playwright test ${suffix}`,
  };
}

export function createBalitaUpdatePayload() {
  const suffix = generateSuffix();
  return {
    namaOrangTua: `Test Ortu Updated ${suffix}`,
    alamatLengkap: `Jl. Updated Playwright No. ${suffix}`,
    antropometri: {
      beratBadan: "13.8",
      tinggiBadan: "88.0",
      lingkarLenganAtas: "15.0",
      lingkarKepala: "47.0",
    },
    keterangan: `Catatan sudah diupdate oleh Playwright ${suffix}`,
  };
}

export function createLansiaPayload() {
  const suffix = generateSuffix();
  return {
    namaLengkapLansia: `Test Lansia ${suffix}`,
    nomorIndukKependudukan: generateNik(),
    alamatLengkapDomisili: `Jl. Testing Lansia No. ${suffix}`,
    rukunTetangga: "007",
    tanggalLahirLansia: "1958-03-20",
    tanggalPemeriksaan: new Date().toISOString().split("T")[0],
    beratBadanKilogram: "58",
    tinggiBadanSentimeter: "155",
    tekananDarahSistolikDiastolik: "120/80",
    kadarGulaDarahSewaktuMgdl: "110",
    kadarAsamUratDarahMgdl: "5.5",
    kadarKolesterolTotalMgdl: "180",
    catatanKesehatanTambahan: `Catatan otomatis dari Playwright test ${suffix}`,
  };
}

export function createLansiaUpdatePayload() {
  const suffix = generateSuffix();
  return {
    alamatLengkapDomisili: `Jl. Updated Lansia No. ${suffix}`,
    tekananDarahSistolikDiastolik: "130/85",
    kadarGulaDarahSewaktuMgdl: "125",
    catatanKesehatanTambahan: `Catatan medis sudah diupdate ${suffix}`,
  };
}
