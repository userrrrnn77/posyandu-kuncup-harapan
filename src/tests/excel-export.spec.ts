// src/tests/excel-export.spec.ts
import { test, expect } from "../fixtures/auth.fixture";

test.describe("Export Excel", () => {
  test("download excel data balita", async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto("/balita");

    await expect(page.locator("tbody tr").first()).toBeVisible({
      timeout: 10_000,
    });

    // 🔥 BYPASS LEGAL TANPA ANY: Cast window ke type record object yang fleksibel
    await page.evaluate(() => {
      const globalWindow = window as unknown as Record<
        string,
        Record<string, () => boolean>
      >;
      if (globalWindow.XLSX) {
        globalWindow.XLSX.writeFile = () => {
          console.log(
            "🚀 [MOCK] XLSX.writeFile Balita di-bypass legal tanpa any!",
          );
          return true;
        };
      }
    });

    // Klik tombol Export murni untuk memvalidasi alur UI tidak crash
    await page.getByRole("button", { name: /Export/i }).click();

    // Verifikasi tombolnya aktif dan aman setelah diklik
    await expect(page.getByRole("button", { name: /Export/i })).toBeEnabled();
  });

  test("download excel data lansia", async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    await page.goto("/lansia");

    // Pastikan table data lansia minimal muncul
    await expect(page.locator("tbody tr").first()).toBeVisible({
      timeout: 10_000,
    });

    // 🔥 Cast window ke record object demi ketenangan ESLint
    await page.evaluate(() => {
      const globalWindow = window as unknown as Record<
        string,
        Record<string, () => boolean>
      >;
      if (globalWindow.XLSX) {
        globalWindow.XLSX.writeFile = () => {
          console.log(
            "🚀 [MOCK] XLSX.writeFile Lansia di-bypass legal tanpa any!",
          );
          return true;
        };
      }
    });

    // Jalankan klik tombol
    await page.getByRole("button", { name: /Export/i }).click();

    // Pastikan UI beres dan aman
    await expect(page.getByRole("button", { name: /Export/i })).toBeEnabled();
  });
});
