import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { readWindowData, atomicWrite } from './content-files.mjs';
import { validateNews } from './news-validation.mjs';

export const INDEX_HEADER = '/* Small news catalogue. Articles load on demand. */\nwindow.KANA_NEWS_INDEX = ';
export function validateIndex(index) {
  const errors = [], ids = new Set();
  if (index?.schemaVersion !== 1 || !Array.isArray(index.packs)) return ['新聞索引版本或 packs 格式錯誤'];
  for (const entry of index.packs) {
    if (!entry || typeof entry.id !== 'string' || !/^[A-Za-z0-9-]+$/.test(entry.id) || ids.has(entry.id)) { errors.push('新聞索引 id 錯誤或重複'); continue; }
    ids.add(entry.id);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(entry.date || '') || !Number.isFinite(Date.parse(entry.date)) || new Date(entry.date).toISOString().slice(0, 10) !== entry.date) errors.push(entry.id + ' 日期錯誤');
    if (!['N5', 'N4', 'N3', 'N2', 'N1'].includes(entry.level)) errors.push(entry.id + ' level 錯誤');
    if (typeof entry.title?.ja !== 'string' || !entry.title.ja || typeof entry.title?.zh !== 'string' || !entry.title.zh) errors.push(entry.id + ' 標題錯誤');
    if (typeof entry.sha256 !== 'string' || !/^[a-f0-9]{64}$/.test(entry.sha256) || entry.file !== `packs/${entry.id}-${entry.sha256.slice(0, 16)}.js`) errors.push(entry.id + ' 檔案路徑或雜湊錯誤');
    if (typeof entry.sourceURL !== 'string') errors.push(entry.id + ' sourceURL 錯誤');
  }
  return errors;
}
export function loadCatalogue(directory, { allowMissing = false, strict = false } = {}) {
  const indexPath = path.join(directory, 'index.js');
  if (allowMissing && !fs.existsSync(indexPath)) {
    if (fs.existsSync(directory) && fs.readdirSync(directory).length) throw Error('新聞目錄已有資料但缺少索引，停止寫入');
    return { index: { schemaVersion: 1, packs: [] }, packs: [] };
  }
  const index = readWindowData(indexPath, 'KANA_NEWS_INDEX'), errors = validateIndex(index);
  if (errors.length) throw Error(errors.join('；'));
  const packs = index.packs.map(entry => {
    const file = path.join(directory, entry.file), content = fs.readFileSync(file, 'utf8');
    if (createHash('sha256').update(content).digest('hex') !== entry.sha256) throw Error('新聞檔案雜湊不符：' + entry.id);
    const data = readWindowData(file, 'KANA_NEWS_PACKS'), pack = data[entry.id];
    if (!pack || Object.keys(data).length !== 1 || pack.id !== entry.id || pack.date !== entry.date || pack.level !== entry.level || pack.title?.ja !== entry.title.ja || pack.title?.zh !== entry.title.zh || (pack.source?.url || '') !== entry.sourceURL) throw Error('新聞與索引不一致：' + entry.id);
    const invalid = validateNews({ packs: [pack] }, { strict });
    if (invalid.length) throw Error(invalid.join('；'));
    return pack;
  });
  return { index, packs };
}
export function publishCatalogue(directory, packs) {
  if (!Array.isArray(packs) || !packs.length) throw Error('不可發布空新聞包');
  const errors = validateNews({ packs });
  if (errors.length) throw Error(errors.join('；'));
  if (packs.some(p => !/^[A-Za-z0-9-]+$/.test(p.id))) throw Error('新聞 id 不可用作檔名');
  const plans = packs.map(pack => {
    const content = '/* Immutable news article. */\nwindow.KANA_NEWS_PACKS = window.KANA_NEWS_PACKS || {};\nwindow.KANA_NEWS_PACKS[' + JSON.stringify(pack.id) + '] = ' + JSON.stringify(pack, null, 2) + ';\n';
    const sha256 = createHash('sha256').update(content).digest('hex');
    const entry = { id: pack.id, date: pack.date, level: pack.level, title: { ja: pack.title.ja, zh: pack.title.zh }, file: `packs/${pack.id}-${sha256.slice(0, 16)}.js`, sha256, sourceURL: pack.source?.url || '' };
    return { content, entry };
  });
  const index = { schemaVersion: 1, packs: plans.map(p => p.entry) };
  const invalid = validateIndex(index); if (invalid.length) throw Error(invalid.join('；'));
  fs.mkdirSync(path.join(directory, 'packs'), { recursive: true });
  for (const { content, entry } of plans) {
    const file = path.join(directory, entry.file);
    if (!fs.existsSync(file)) atomicWrite(file, content);
    else if (fs.readFileSync(file, 'utf8') !== content) throw Error('同名不可變新聞檔遭修改：' + entry.id);
  }
  // Publish the pointer last. An interruption can leave an unused article, never a broken index.
  atomicWrite(path.join(directory, 'index.js'), INDEX_HEADER + JSON.stringify(index, null, 2) + ';\n');
  return index;
}
