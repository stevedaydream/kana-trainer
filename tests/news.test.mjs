import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import { localJSON } from '../scripts/lib/local-ai.mjs';
import { parseRSS, chooseSource, fetchSource } from '../scripts/lib/news-source.mjs';
import { validateNews } from '../scripts/lib/news-validation.mjs';
import { loadCatalogue } from '../scripts/lib/news-store.mjs';
import { generateWithFallback } from '../scripts/lib/news-ai.mjs';

const now = Date.parse('2026-10-29T00:00:00Z');
function rss(date = '2026-10-28T12:00:00Z') { return `<rss><channel><title>Official feed</title><item><title>Culture &amp; science</title><link>https://example.com/news</link><description><![CDATA[This source contains a sufficiently long factual description for a short Japanese lesson.]]></description><pubDate>${date}</pubDate></item></channel></rss>`; }

test('RSS source selection rejects stale, duplicate and unrelated articles', () => {
  const items = parseRSS(rss());
  assert.equal(items[0].title, 'Culture & science');
  assert.equal(chooseSource(items, { now }).url, 'https://example.com/news');
  assert.throws(() => chooseSource(items, { now: now + 10 * 86400000 }));
  assert.throws(() => chooseSource(items, { now, usedURLs: ['https://example.com/news'] }));
  assert.throws(() => chooseSource(items, { now, topic: 'nonexistent' }));
  assert.throws(() => parseRSS('<!DOCTYPE rss><rss/>'));
});
test('RSS fetch retains provenance rather than asking the model to invent it', async () => {
  const source = await fetchSource({ now, fetchImpl: async () => new Response(rss()) });
  assert.equal(source.publisher, 'Official feed'); assert.ok(source.fetchedAt);
});
test('managed gateway uses authenticated non-streaming JSON chat', async () => {
  let request;
  const value = await localJSON('source facts', { env: { LOCAL_AI_API_KEY: 'test-only', LOCAL_AI_BASE_URL: 'https://gateway.example/v1', LOCAL_AI_MODEL: 'local/model' }, fetchImpl: async (url, options) => {
    request = { url, ...options };
    return Response.json({ choices: [{ finish_reason: 'stop', message: { content: '{"ok":true}' } }] });
  } });
  assert.equal(value.ok, true); assert.equal(request.url, 'https://gateway.example/v1/chat/completions');
  assert.equal(request.headers.Authorization, 'Bearer test-only');
  const body = JSON.parse(request.body);
  assert.equal(body.model, 'local/model'); assert.equal(body.stream, false); assert.equal(body.chat_template_kwargs.enable_thinking, false);
  assert.equal(body.response_format.type, 'json_object'); assert.equal(request.redirect, 'error');
});
test('gateway rejects truncated responses and never includes credentials in errors', async () => {
  const options = { retries: 1, env: { LOCAL_AI_API_KEY: 'test-secret' }, fetchImpl: async () => Response.json({ choices: [{ finish_reason: 'length', message: { content: '{}' } }] }) };
  await assert.rejects(localJSON('facts', options), error => !error.message.includes('test-secret'));
  await assert.rejects(localJSON('facts', { ...options, fetchImpl: async () => new Response('private body test-secret', { status: 401 }) }), /HTTP 401/);
});
test('local timeout falls back without retrying an inference that may still be queued', async () => {
  let calls = 0;
  await assert.rejects(localJSON('facts', { retries: 3, env: { LOCAL_AI_API_KEY: 'test-only' }, fetchImpl: async () => { calls++; const error = Error('timeout'); error.name = 'TimeoutError'; throw error; } }), error => error.code === 'LOCAL_AI_TIMEOUT');
  assert.equal(calls, 1);
});
test('offline generation is isolated; invalid content does not overwrite an existing file', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kana-news-')); t.after(() => fs.rmSync(dir, { recursive: true }));
  const output = path.join(dir, 'news');
  const generated = spawnSync(process.execPath, ['scripts/generate-news.mjs', '--mock', '--output=' + output], { encoding: 'utf8' });
  assert.equal(generated.status, 0, generated.stderr);
  const data = loadCatalogue(output); assert.deepEqual(validateNews(data, { strict: true }), []);
  const invalid = structuredClone(data); invalid.packs[0].quiz[0].options = ['same', 'same'];
  assert.ok(validateNews(invalid).some(e => e.includes('options')));
  invalid.packs[0].date = '2026-99-99'; assert.ok(validateNews(invalid).some(e => e.includes('date')));
  const index = path.join(output, 'index.js');
  fs.writeFileSync(index, 'window.KANA_NEWS_INDEX = null;');
  const before = fs.readFileSync(path.join(output, 'index.js'), 'utf8');
  const result = spawnSync(process.execPath, ['scripts/generate-news.mjs', '--mock', '--output=' + output], { encoding: 'utf8' });
  assert.notEqual(result.status, 0); assert.equal(fs.readFileSync(path.join(output, 'index.js'), 'utf8'), before);
});
test('full local pipeline pins fetched provenance and preserves published data on invalid AI output', t => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kana-pipeline-')); t.after(() => fs.rmSync(dir, { recursive: true }));
  const output = path.join(dir, 'news'), fixture = path.join(dir, 'pack.json'), preload = path.join(dir, 'fetch.mjs');
  const mock = spawnSync(process.execPath, ['scripts/generate-news.mjs', '--mock', '--output=' + output], { encoding: 'utf8' });
  assert.equal(mock.status, 0, mock.stderr);
  const before = fs.readFileSync(path.join(output, 'index.js'), 'utf8'), pack = loadCatalogue(output).packs[0];
  pack.source.url = 'https://invented.invalid/model-source'; fs.writeFileSync(fixture, JSON.stringify(pack));
  fs.writeFileSync(preload, `import fs from 'node:fs';
    let cloudCalls = 0;
    globalThis.fetch = async (url, options) => {
      if (String(url).endsWith('/chat/completions')) {
        if (['backup', 'repair', 'both-fail'].includes(process.env.NEWS_TEST_MODE)) return new Response('private body', {status:401});
        const pack = JSON.parse(fs.readFileSync(process.env.NEWS_TEST_FIXTURE, 'utf8'));
        if (process.env.NEWS_TEST_MODE === 'invalid') pack.quiz[0].options = ['same','same'];
        return Response.json({choices:[{finish_reason:'stop',message:{content:JSON.stringify(pack)}}]});
      }
      if (String(url).includes(':generateContent')) {
        if (options.headers['x-goog-api-key'] !== 'test-cloud') throw Error('missing cloud key');
        const pack = JSON.parse(fs.readFileSync(process.env.NEWS_TEST_FIXTURE, 'utf8'));
        if (process.env.NEWS_TEST_MODE === 'repair' && cloudCalls++ === 0) pack.title.furigana = 'AI';
        if (process.env.NEWS_TEST_MODE === 'both-fail') pack.quiz[0].options = ['same','same'];
        return Response.json({candidates:[{finishReason:'STOP',content:{parts:[{text:JSON.stringify(pack)}]}}]});
      }
      return new Response('<rss><channel><title>Verified publisher</title><item><title>Verified source</title><link>https://example.com/real-source</link><description>This description contains verified source facts sufficient for a short learning material.</description><pubDate>'+new Date().toISOString()+'</pubDate></item></channel></rss>');
    };`);
  const env = { ...process.env, LOCAL_AI_API_KEY: 'test-only', NEWS_AI_PROVIDER: 'openai', NEWS_TEST_FIXTURE: fixture };
  const args = ['--import', pathToFileURL(preload).href, 'scripts/generate-news.mjs', '--output=' + output, '--force'];
  const success = spawnSync(process.execPath, args, { env, encoding: 'utf8' }); assert.equal(success.status, 0, success.stderr);
  const actual = loadCatalogue(output).packs.find(p => p.id.startsWith('daily-'));
  assert.equal(actual.source.url, 'https://example.com/real-source'); assert.equal(actual.source.publisher, 'Verified publisher');
  fs.writeFileSync(path.join(output, 'index.js'), before);
  const failure = spawnSync(process.execPath, args, { env: { ...env, NEWS_TEST_MODE: 'invalid' }, encoding: 'utf8' });
  assert.notEqual(failure.status, 0); assert.match(failure.stderr, /未啟用雲端備援/); assert.equal(fs.readFileSync(path.join(output, 'index.js'), 'utf8'), before);
  const backupEnv = { ...env, NEWS_AI_PROVIDER: 'auto', NEWS_AI_FALLBACK: 'gemini', GEMINI_API_KEY: 'test-cloud', NEWS_TEST_MODE: 'backup' };
  const backup = spawnSync(process.execPath, args, { env: backupEnv, encoding: 'utf8' });
  assert.equal(backup.status, 0, backup.stderr);
  const cloudPack = loadCatalogue(output).packs.find(p => p.id.startsWith('daily-'));
  assert.equal(cloudPack.generation.provider, 'gemini'); assert.equal(cloudPack.generation.isFallback, true);
  assert.equal(cloudPack.source.url, 'https://example.com/real-source');
  const repaired = spawnSync(process.execPath, args, { env: { ...backupEnv, NEWS_TEST_MODE: 'repair' }, encoding: 'utf8' });
  assert.equal(repaired.status, 0, repaired.stderr);
  assert.match(repaired.stderr, /重新生成一次/);
  assert.deepEqual(validateNews(loadCatalogue(output), { strict: true }), []);
  fs.writeFileSync(path.join(output, 'index.js'), before);
  const both = spawnSync(process.execPath, args, { env: { ...backupEnv, NEWS_TEST_MODE: 'both-fail' }, encoding: 'utf8' });
  assert.notEqual(both.status, 0); assert.match(both.stderr, /皆未產出有效教材/);
  assert.equal(fs.readFileSync(path.join(output, 'index.js'), 'utf8'), before);
});
