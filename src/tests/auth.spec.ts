// src/tests/auth.spec.ts
import { test, expect } from "../fixtures/auth.fixture";
import { loginAs } from "../fixtures/auth.fixture";
import { CREDENTIALS } from "../fixtures/test-data";

test.describe("Auth Flow", () => {
  test("berhasil login dengan kredensial valid", async ({ page }) => {
    await loginAs(page);
    await expect(page).toHaveURL(/\/dashboard/);
    await expect(page.getByText(/Selamat Datang/i)).toBeVisible();
  });

  test("gagal login dengan password salah", async ({ page }) => {
    await page.goto("/login");
    // 🔥 Pake placeholder biar gak kena trap timeout!
    await page.getByPlaceholder("081234567xxx").fill(CREDENTIALS.phone);
    await page.getByPlaceholder("••••••••").fill("passwordsalahbanget");
    await page.getByRole("button", { name: /Masuk Sekarang/i }).click();

    await expect(page.getByText(/Gagal Login/i)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/\/login/);
  });

  test("validasi form kosong menampilkan pesan error", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: /Masuk Sekarang/i }).click();

    await expect(page.getByText(/Nomor HP minimal 10 angka/i)).toBeVisible();
    await expect(page.getByText(/Password minimal 6 karakter/i)).toBeVisible();
  });

  test("berhasil logout dan kembali ke halaman login", async ({
    authenticatedPage,
  }) => {
    const page = authenticatedPage;

    // Menembak tombol logout di sidebar/navbar yang berisi ikon kelaur/logout
    const logoutTrigger = page.getByRole("button", { name: /keluar|logout/i });
    await logoutTrigger.click();

    await expect(page.getByText(/Berhasil Keluar/i)).toBeVisible({
      timeout: 10_000,
    });
    await expect(page).toHaveURL(/\/login/, { timeout: 10_000 });
  });
});
