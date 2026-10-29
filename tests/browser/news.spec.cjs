const { test, expect } = require('@playwright/test');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

test('home and list load only the index; selecting an article downloads it once', async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  try {
    const page = await context.newPage(), articles = [];
    page.on('request', request => { if (request.url().includes('/data/news/packs/')) articles.push(request.url()); });
    await page.goto('http://127.0.0.1:54322/?notts=1');
    expect(articles).toHaveLength(0);
    expect(await page.evaluate(() => Object.keys(window.KANA_NEWS_PACKS || {}).length)).toBe(0);
    await page.locator('summary').click(); await page.locator('#news').click(); expect(articles).toHaveLength(0);
    await page.locator('.news-row').first().click(); await expect(page.locator('[data-go="listen"]')).toBeVisible(); expect(articles).toHaveLength(1);
    await page.locator('#back').click(); await page.locator('.news-row').first().click();
    await expect(page.locator('[data-go="listen"]')).toBeVisible(); expect(articles).toHaveLength(1);
  } finally { await context.close(); }
});
test('late article completion does not replace the list after navigating back', async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  try {
    const page = await context.newPage(); let release;
    const wait = new Promise(resolve => { release = resolve; });
    await page.route('**/data/news/packs/**', async route => { await wait; await route.continue(); });
    await page.goto('http://127.0.0.1:54322/?notts=1'); await page.locator('summary').click(); await page.locator('#news').click();
    await page.locator('.news-row').first().click(); await expect(page.locator('h1')).toHaveText('載入新聞');
    await page.locator('#back').click(); release();
    await page.waitForFunction(() => Object.keys(window.KANA_NEWS_PACKS || {}).length > 0);
    await expect(page.locator('.news-row')).toHaveCount(60); await expect(page.locator('h1')).toHaveText('📰 每日新聞');
  } finally { await context.close(); }
});
test('a failed article download offers a working retry', async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  try {
    const page = await context.newPage(); let fail = true;
    await page.route('**/data/news/packs/**', route => fail ? route.abort() : route.continue());
    await page.goto('http://127.0.0.1:54322/?notts=1'); await page.locator('summary').click(); await page.locator('#news').click();
    await page.locator('.news-row').first().click(); await expect(page.getByRole('alert')).toContainText('未下載完成');
    fail = false; await page.locator('#retry').click(); await expect(page.locator('[data-go="listen"]')).toBeVisible();
  } finally { await context.close(); }
});
test('recent articles are offline-ready; unseen older articles explain the missing download', async ({ page, context }) => {
  await page.goto('/?notts=1'); await page.evaluate(() => navigator.serviceWorker.ready); await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller); await context.setOffline(true);
  await page.locator('summary').click(); await page.locator('#news').click(); await page.locator('.news-row').first().click();
  await expect(page.locator('[data-go="listen"]')).toBeVisible(); await page.locator('#back').click();
  await page.locator('.news-row').nth(10).click(); await expect(page.getByRole('alert')).toContainText('未下載完成');
});
test('independent article scripts also work when opened with file://', async ({ page }) => {
  await page.goto(pathToFileURL(path.resolve('index.html')).href + '?notts=1');
  await page.locator('summary').click(); await page.locator('#news').click(); await page.locator('.news-row').first().click();
  await expect(page.locator('[data-go="listen"]')).toBeVisible();
});
test('SRI rejects a modified article and retry can fetch the correct bytes', async ({ browser }) => {
  const context = await browser.newContext({ serviceWorkers: 'block' });
  try {
    const page = await context.newPage(); let tamper = true;
    await page.route('**/data/news/packs/**', async route => {
      if (!tamper) return route.continue();
      const response = await route.fetch();
      await route.fulfill({ response, body: await response.text() + '\n/* modified bytes */' });
    });
    await page.goto('http://127.0.0.1:54322/?notts=1'); await page.locator('summary').click(); await page.locator('#news').click();
    await page.locator('.news-row').first().click(); await expect(page.getByRole('alert')).toContainText('未下載完成');
    expect(await page.evaluate(() => Object.keys(window.KANA_NEWS_PACKS || {}).length)).toBe(0);
    tamper = false; await page.locator('#retry').click(); await expect(page.locator('[data-go="listen"]')).toBeVisible();
  } finally { await context.close(); }
});
test('a previously read older article remains available offline after a full reload', async ({ page, context }) => {
  await page.goto('/?notts=1'); await page.evaluate(() => navigator.serviceWorker.ready); await page.reload();
  await page.waitForFunction(() => navigator.serviceWorker.controller);
  await page.locator('summary').click(); await page.locator('#news').click(); await page.locator('.news-row').nth(10).click();
  await expect(page.locator('[data-go="listen"]')).toBeVisible();
  await context.setOffline(true); await page.reload();
  await page.locator('summary').click(); await page.locator('#news').click(); await page.locator('.news-row').nth(10).click();
  await expect(page.locator('[data-go="listen"]')).toBeVisible();
});
