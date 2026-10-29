#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readWindowData } from './lib/content-files.mjs';
import { validateWordbank } from './lib/wordbank-validation.mjs';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
try {
  const data = readWindowData(path.join(root, 'data/levels.js'), 'KANA_DATA');
  const wb = readWindowData(path.join(root, 'data/wordbank.js'), 'KANA_WORDBANK');
  const {errors,warnings} = validateWordbank(data, wb);
  if (errors.length) throw Error(errors.join('\n'));
  warnings.forEach(w => console.warn('⚠ ' + w));
  console.log(`✅ PASS：辭庫 ${Object.keys(wb).length} 音、${Object.values(wb).reduce((n, l) => n + l.length, 0)} 詞`);
} catch (error) { console.error('❌ FAIL：' + error.message); process.exitCode = 1; }
