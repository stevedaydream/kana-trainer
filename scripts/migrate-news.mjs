#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readWindowData } from './lib/content-files.mjs';
import { loadCatalogue, publishCatalogue } from './lib/news-store.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = process.argv.find(a => a.startsWith('--source='))?.slice(9) || path.join(root, 'data/news.js');
const output = process.argv.find(a => a.startsWith('--output='))?.slice(9) || path.join(root, 'data/news');
try {
  if (fs.existsSync(path.join(output, 'index.js'))) throw Error('新聞索引已存在，避免覆寫；本工具只供一次遷移');
  const legacy = readWindowData(source, 'KANA_NEWS');
  publishCatalogue(output, legacy.packs);
  const migrated = loadCatalogue(output);
  if (JSON.stringify(migrated.packs) !== JSON.stringify(legacy.packs)) throw Error('遷移比對失敗，保留原檔');
  if (process.argv.includes('--remove-legacy')) fs.unlinkSync(source);
  console.log(`✅ ${migrated.packs.length} 包完整遷移，內容逐包比對一致`);
} catch (error) { console.error('❌ ' + error.message); process.exitCode = 1; }
