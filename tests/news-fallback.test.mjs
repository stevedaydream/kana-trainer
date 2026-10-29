import test from 'node:test';
import assert from 'node:assert/strict';
import { generateWithFallback } from '../scripts/lib/news-ai.mjs';
const validate = pack => { if (!pack.valid) throw Error('invalid'); };

test('auto mode tries local first and avoids a cloud call when valid', async () => {
  let cloud = 0;
  const result = await generateWithFallback({ local: async () => ({ valid: true }), cloud: async () => { cloud++; }, validate, env: {} });
  assert.equal(result.provider, 'openai'); assert.equal(result.isFallback, false); assert.equal(cloud, 0);
});
for (const failure of ['offline', 'invalid', 'skip']) test('auto mode uses validated cloud backup after local ' + failure, async () => {
  let calls = 0, warnings = [];
  const result = await generateWithFallback({
    local: async () => { calls++; if (failure === 'offline') throw Error('private endpoint secret'); return { valid: false }; },
    cloud: async () => ({ valid: true }), validate, env: { LOCAL_AI_SKIP: failure === 'skip' ? '1' : '0' }, report: warning => warnings.push(warning)
  });
  assert.equal(result.provider, 'gemini'); assert.equal(result.isFallback, true);
  assert.equal(calls, failure === 'skip' ? 0 : 1); assert.equal(warnings.length, 1); assert.ok(!warnings[0].includes('secret'));
});
test('both providers must pass validation, otherwise no result is published', async () => {
  await assert.rejects(generateWithFallback({ local: async () => ({ valid: false }), cloud: async () => ({ valid: false }), validate, env: {}, report() {} }), /皆未產出有效教材/);
});
test('fallback can be disabled for local-only diagnostics', async () => {
  let cloud = 0;
  await assert.rejects(generateWithFallback({ local: async () => { throw Error('offline'); }, cloud: async () => { cloud++; }, validate, env: { NEWS_AI_FALLBACK: 'none' } }), /未啟用雲端備援/);
  assert.equal(cloud, 0);
});
