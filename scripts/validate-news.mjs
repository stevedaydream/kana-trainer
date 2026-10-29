#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadCatalogue } from './lib/news-store.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
try {
  const directory = process.argv.find(a => a.startsWith('--dir='))?.slice(6) || path.join(root, 'data/news');
  const { packs } = loadCatalogue(directory, { strict: process.argv.includes('--strict') });
  if (!packs.length) throw Error('新聞索引不可空');
  console.log(`✅ PASS：新聞索引＋${packs.length} 篇獨立檔案，內容、路徑、雜湊與索引一致`);
} catch (error) { console.error('❌ FAIL：' + error.message); process.exitCode = 1; }
