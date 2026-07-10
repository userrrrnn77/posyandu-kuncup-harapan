// src/fixtures/auth.fixture.ts
import { test as base, expect, type Page } from "@playwright/test";
import { CREDENTIALS } from "./test-data";

type AuthFixtures = {
  authenticatedPage: Page;
};

export async function loginAs(
  page: Page,
  phone: string = CREDENTIALS.phone,
  password: string = CREDENTIALS.password,
) {
  await page.goto("/login");

  // 🔥 TRICK VIBRANIUM: Tembak pake placeholder murni bawaan Login.tsx lu, kebal struktur label!
  await page.getByPlaceholder("081234567xxx").fill(phone);
  await page.getByPlaceholder("••••••••").fill(password);

  // Klik tombol masuk berdasarkan role button yang berisi teks "Masuk Sekarang"
  await page.getByRole("button", { name: /Masuk Sekarang/i }).click();

  // Tunggu sampai URL berubah ke dashboard
  await expect(page).toHaveURL(/\/dashboard/, { timeout: 15_000 });
}

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await loginAs(page);
    // eslint-disable-next-line react-hooks/rules-of-hooks -- ini parameter fixture Playwright, bukan React Hook
    await use(page);
  },
});

export { expect };
