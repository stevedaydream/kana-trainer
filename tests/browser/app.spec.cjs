const { test, expect } = require('@playwright/test');
test('learning, keyboard reveal and safe import work without a build step', async ({ page }) => {
  const errors = []; page.on('pageerror', error => errors.push(error.message));
  await page.goto('/?notts=1');
  await expect(page.locator('h1')).toHaveText('五十音練習器');
  await expect(page.locator('button.level-row')).toHaveCount(14);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('#continue').click(); await page.locator('[data-part="1"]').click();
  await page.locator('#card').focus(); await page.keyboard.press('Space');
  await expect(page.locator('#hit')).toBeVisible(); await page.locator('#hit').click();
  await page.locator('#quit').click(); await page.locator('#back').click();
  await page.locator('#settings').click();
  const before = await page.evaluate(() => localStorage.getItem('kana_trainer_v1'));
  await page.locator('#pastebox').fill('{"weights":"invalid"}'); await page.locator('#pasteimport').click();
  await expect(page.locator('#bknote')).toContainText('匯入失敗');
  expect(await page.evaluate(() => localStorage.getItem('kana_trainer_v1'))).toBe(before);
  const saved = JSON.parse(before); saved.unlocked = 2;
  await page.locator('#pastebox').fill(JSON.stringify(saved)); await page.locator('#pasteimport').click();
  await expect(page.locator('#continue')).toContainText('第 2 級');
  await page.locator('#settings').click(); await page.locator('#recover').click();
  await expect(page.locator('#continue')).toContainText('第 1 級');
  await page.locator('summary').click(); await page.locator('#news').click();
  await expect(page.locator('.news-row')).toHaveCount(60);
  await page.locator('.news-row').first().click(); await expect(page.getByRole('link', { name: '閱讀原文' })).toBeVisible();
  expect(errors).toEqual([]);
});
test('installed PWA starts offline and missing data never falls back to HTML', async ({ page, context }) => {
  await page.goto('/?notts=1');
  await page.evaluate(() => navigator.serviceWorker.ready);
  await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload(); await expect(page.locator('#continue')).toBeVisible();
  const missing = await page.evaluate(async () => { const r = await fetch('/data/missing.js'); return { status: r.status, type: r.headers.get('content-type'), body: await r.text() }; });
  expect(missing.status).toBe(503); expect(missing.type).toContain('javascript'); expect(missing.body).not.toContain('<html');
});
test('corrupt saved progress is preserved on startup', async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem('kana_trainer_v1', '{broken-json'));
  await page.goto('/?notts=1');
  await expect(page.locator('#storage-status')).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('kana_trainer_v1'))).toBe('{broken-json');
});
test('late microphone permission resolution releases the stream after leaving', async ({ page }) => {
  await page.addInitScript(() => {
    window.stoppedTracks = 0;
    Object.defineProperty(navigator, 'mediaDevices', { value: { getUserMedia: () => new Promise(resolve => { window.resolveMicrophone = () => resolve({ getTracks: () => [{ stop() { window.stoppedTracks++; } }] }); }) } });
    window.MediaRecorder = class {};
  });
  await page.goto('/?notts=1'); await page.locator('summary').click(); await page.locator('#news').click();
  await page.locator('.news-row').first().click(); await page.locator('[data-go="speak"]').click();
  for (let i = 0; i < 5; i++) await page.locator('#next').click();
  await page.locator('#recbtn').click(); await expect(page.locator('#recbtn')).toBeDisabled();
  await page.locator('#quit').click(); await page.evaluate(() => window.resolveMicrophone());
  await expect.poll(() => page.evaluate(() => window.stoppedTracks)).toBe(1);
});
