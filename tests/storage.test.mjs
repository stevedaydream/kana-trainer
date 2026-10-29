import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function api() { const sandbox = { window: {} }; vm.runInNewContext(fs.readFileSync('js/storage.js', 'utf8'), sandbox); return sandbox.window.KanaStorage; }
const defaults = { weights: {}, streak: {}, best: {}, srs: {}, star: {}, wb: {}, unlocked: 1, warmup: false, daily: { goal: 30 }, tts: { rate: 1, pitch: 1 }, plan: { intensity: 'normal', progress: { date: '', level: 0 } }, news: { level: 'N5', userLevel: 'N5', furigana: true, inputDone: {}, quizBest: {}, doneDays: {} } };
test('legacy news dates migrate only when the article is unambiguous', () => {
  const saved = { unlocked: 1, news: { inputDone: { '2026-10-28': { listen: true }, '2026-10-29': { listen: true } } } };
  const value = api().validate(saved, defaults, [], [{ id: 'single', date: '2026-10-28' }, { id: 'a', date: '2026-10-29' }, { id: 'b', date: '2026-10-29' }]);
  assert.equal(value.news.inputDone.single.listen, true); assert.equal(value.news.inputDone.a, undefined); assert.equal(value.schemaVersion, 2);
});
test('asynchronous storage writes remain ordered and snapshot the submitted state', async () => {
  const writes = [], state = { n: 1 };
  const store = api().create({ storage: { getItem() {}, async setItem(k, value) { await new Promise(resolve => setTimeout(resolve, JSON.parse(value).n === 1 ? 20 : 0)); writes.push(JSON.parse(value).n); } } }, 'key', () => {});
  const first = store.set(state); state.n = 2; const second = store.set(state);
  await Promise.all([first, second]); assert.deepEqual(writes, [1, 2]);
});
test('storage failures return false and announce a recoverable warning', async () => {
  const warnings = [], store = api().create({ storage: { getItem() {}, async setItem() { throw Error('quota'); } } }, 'key', message => warnings.push(message));
  assert.equal(await store.set({ n: 1 }), false); assert.equal(warnings.length, 1);
});
