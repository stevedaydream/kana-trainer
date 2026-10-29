const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  use: { baseURL: 'http://127.0.0.1:54322', trace: 'retain-on-failure', launchOptions: process.env.PLAYWRIGHT_EXECUTABLE_PATH ? { executablePath: process.env.PLAYWRIGHT_EXECUTABLE_PATH } : {} },
  webServer: { command: 'node scripts/serve.mjs', url: 'http://127.0.0.1:54322', reuseExistingServer: !process.env.CI },
  projects: [{ name: 'mobile-chromium', use: { browserName: 'chromium', viewport: { width: 390, height: 844 } } }, { name: 'desktop-chromium', use: { browserName: 'chromium', viewport: { width: 1280, height: 900 } } }]
});
