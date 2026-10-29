import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { loadCatalogue, publishCatalogue, validateIndex } from '../scripts/lib/news-store.mjs';
const sample = loadCatalogue('data/news').packs.slice(0, 2);
const directory = t => { const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'kana-store-')); t.after(() => fs.rmSync(dir, { recursive: true })); return dir; };

test('split publication preserves content and leaves unchanged articles untouched', t => {
  const dir = directory(t), first = publishCatalogue(dir, sample);
  assert.deepEqual(loadCatalogue(dir).packs, sample);
  const file = path.join(dir, first.packs[0].file), stamp = fs.statSync(file).mtimeMs;
  const changed = structuredClone(sample); changed[1].title.zh += '（修訂）';
  const second = publishCatalogue(dir, changed);
  assert.equal(second.packs[0].file, first.packs[0].file); assert.equal(fs.statSync(file).mtimeMs, stamp);
  assert.notEqual(second.packs[1].file, first.packs[1].file);
  assert.equal(fs.existsSync(path.join(dir, first.packs[1].file)), true);
});
test('bad article or duplicate id cannot replace the published index', t => {
  const dir = directory(t); publishCatalogue(dir, sample);
  const index = path.join(dir, 'index.js'), before = fs.readFileSync(index, 'utf8');
  assert.throws(() => publishCatalogue(dir, [sample[0], sample[0]]));
  const bad = structuredClone(sample); bad[0].quiz[0].answer = 999;
  assert.throws(() => publishCatalogue(dir, bad));
  assert.equal(fs.readFileSync(index, 'utf8'), before);
});
test('reader rejects traversal, tampering and an orphaned directory without an index', t => {
  const dir = directory(t), index = publishCatalogue(dir, sample);
  const invalid = structuredClone(index); invalid.packs[0].file = '../outside.js'; assert.ok(validateIndex(invalid).length);
  fs.appendFileSync(path.join(dir, index.packs[0].file), '\n/* tampered */');
  assert.throws(() => loadCatalogue(dir), /雜湊不符/);
  const other = path.join(dir, 'orphan'); fs.mkdirSync(other); fs.writeFileSync(path.join(other, 'article.js'), 'orphan');
  assert.throws(() => loadCatalogue(other, { allowMissing: true }), /缺少索引/);
});
test('one-time migration compares every article before removing the legacy bundle', t => {
  const dir = directory(t), legacy = path.join(dir, 'legacy.js'), output = path.join(dir, 'split');
  fs.writeFileSync(legacy, 'window.KANA_NEWS = ' + JSON.stringify({ packs: sample }) + ';');
  const args = ['scripts/migrate-news.mjs', '--source=' + legacy, '--output=' + output, '--remove-legacy'];
  const result = spawnSync(process.execPath, args, { encoding: 'utf8' });
  assert.equal(result.status, 0, result.stderr); assert.equal(fs.existsSync(legacy), false);
  assert.deepEqual(loadCatalogue(output).packs, sample);
});
