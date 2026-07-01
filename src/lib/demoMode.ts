// src/lib/demoMode.ts
// Mode demo: aktif via query param ?demo=true di URL manapun.
// Dipake buat: (1) tembus AuthGuard tanpa login, (2) switch ke endpoint demo
// yang publik & read-only, (3) block aksi tulis (add/edit/delete) di FE.
// Masking data (NIK, alamat) dikerjain di backend (lihat core/src/utils/maskDemo.ts)
// biar data asli emang gak pernah dikirim ke browser sama sekali.

const STORAGE_KEY = "posyandu-demo-mode";

// Begitu ?demo=true kedetek sekali di URL, disimpen ke sessionStorage.
// Jadi walau user pindah halaman lewat Sidebar/Link biasa (yang gak nge-carry
// query string), mode demo tetep nyala sepanjang tab session itu terbuka.
// Reset otomatis begitu tab ditutup, atau bisa dimatiin manual: sessionStorage.removeItem("posyandu-demo-mode")
export const isDemoMode = (): boolean => {
  if (typeof window === "undefined") return false;

  const fromUrl =
    new URLSearchParams(window.location.search).get("demo") === "true";

  if (fromUrl) {
    sessionStorage.setItem(STORAGE_KEY, "true");
    return true;
  }

  return sessionStorage.getItem(STORAGE_KEY) === "true";
};
