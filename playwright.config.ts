import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests",
  fullyParallel: false, // CRUD & shared login state -> jalan sequential biar aman
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  timeout: 45_000, // ⚡ naikin dari default 30s, biar gak kepotong duluan sebelum backend Vercel selesai cold start
  reporter: [["html", { open: "never" }], ["list"]],

  use: {
    baseURL: "https://posyandu-kuncup-harapan.netlify.app",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
