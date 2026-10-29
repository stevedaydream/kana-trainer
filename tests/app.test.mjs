import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function harness() {
  let html = '', nodes = {}, timers = new Map(), next = 0, now = 1000000;
  const element = () => ({ style: {}, dataset: {}, classList: { add() {}, remove() {}, toggle() {} }, focus() {}, setAttribute() {}, addEventListener(n, f) { this[n] = f; }, removeEventListener() {} });
  const app = {
    get innerHTML() { return html; },
    set innerHTML(v) { html = v; nodes = {}; for (const m of v.matchAll(/id="([^"]+)"/g)) nodes['#' + m[1]] = element(); },
    querySelector(k) { return nodes[k] || null; }, querySelectorAll() { return []; }
  };
  const clock = {
    setTimeout(fn, ms) { timers.set(++next, { fn, ms, interval: false }); return next; },
    clearTimeout(id) { timers.delete(id); },
    setInterval(fn, ms) { timers.set(++next, { fn, ms, interval: true }); return next; },
    clearInterval(id) { timers.delete(id); }
  };
  const values = new Map();
  const window = { ...clock, localStorage: { getItem(k) { return values.get(k); }, setItem(k, v) { values.set(k, v); }, removeItem(k) { values.delete(k); } } };
  const FakeDate = class extends Date { static now() { return now; } };
  const math = Object.create(Math); math.random = () => 0.999;
  const context = { window, ...clock, document: { getElementById() { return app; }, querySelector() { return null; } }, location: { search: '?notts=1' }, navigator: {}, URLSearchParams, console, Date: FakeDate, Math: math, Set, Map };
  vm.createContext(context);
  for (const file of ['data/levels.js', 'data/news/index.js', 'js/session.js', 'js/storage.js', 'js/scheduler.js', 'js/audio.js', 'js/exam.js', 'js/news.js']) {
    if (fs.existsSync(file)) vm.runInContext(fs.readFileSync(file, 'utf8'), context);
  }
  const source = fs.existsSync('js/app.js') ? fs.readFileSync('js/app.js', 'utf8') : fs.readFileSync('index.html', 'utf8').split('<script>')[1];
  const code = source.slice(source.indexOf('"use strict";'), source.indexOf('  /* =====================  啟動'));
  vm.runInContext(code + 'window.test={P,initKeys,importSaved,examScreen,render,markInput,newsInput,speakUnlocked,snapshot};})();', context);
  const api = window.test; api.initKeys();
  return { api, app, nodes: () => nodes, window, values, advance(ms) { now += ms; }, fire(ms) { for (const [id, t] of [...timers]) if (t.ms === ms) { if (!t.interval) timers.delete(id); t.fn(); } } };
}

test('invalid imports leave all current progress intact', async () => {
  const h = harness(), before = JSON.stringify(h.api.snapshot());
  for (const invalid of [{ weights: 'invalid' }, { srs: { 'あ': null } }, { unlocked: 0 }, { weights: { 'あ': 100 } }, { unlocked: 1, plan: { progress: null } }]) {
    try { await h.api.importSaved(invalid); } catch (_) {}
    assert.equal(JSON.stringify(h.api.snapshot()), before);
  }
});
test('leaving an exam cancels delayed answer navigation', () => {
  const h = harness(), all = h.window.KANA_DATA.levels[0].hira.concat(h.window.KANA_DATA.levels[0].kata);
  h.api.examScreen({ title: 'test', set: all, poolAll: all, bestKey: 'test', allowType: true, onBack() { h.api.render('LEFT EXAM'); } });
  h.nodes()['#tin'].value = 'wrong'; h.nodes()['#typef'].submit({ preventDefault() {} });
  h.nodes()['#quit'].click(); h.fire(950);
  assert.equal(h.app.innerHTML, 'LEFT EXAM');
});
test('timed exam ends at deadline even when interval is delayed', () => {
  const h = harness(), all = h.window.KANA_DATA.levels[0].hira.concat(h.window.KANA_DATA.levels[0].kata);
  h.api.examScreen({ title: 'test', set: all, poolAll: all, bestKey: 'test', allowType: true });
  h.advance(61000); h.fire(1000);
  assert.match(h.app.innerHTML, /result-box/);
});
test('different news packs on the same date do not share progress', () => {
  const h = harness(), a = { id: 'a', date: '2026-10-29' }, b = { id: 'b', date: '2026-10-29' };
  h.api.markInput(a, 'listen');
  assert.equal(h.api.newsInput(b.id).listen, undefined);
  assert.equal(h.api.newsInput(a.id).listen, true);
});
test('article difficulty does not substitute for learner proficiency', () => {
  const h = harness();
  assert.equal(h.api.speakUnlocked({ id: 'hard', date: '2026-10-29', level: 'N1' }), false);
});
