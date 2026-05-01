import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 0,

  use: {
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium-ui',
      testMatch: '**/car-rental.spec.ts',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.booking.com',
        headless: false,
      },
    },
    {
      name: 'api',
      testMatch: '**/api.spec.ts',
    },
  ],
});