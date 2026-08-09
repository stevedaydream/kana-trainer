#!/usr/bin/env node
/* =========================================================
 * scripts/check-image-list.mjs — 配圖待補清單防漂移檢查
 * 用法：node scripts/check-image-list.mjs
 *
 * docs/image-download-list.md 的「日文搜尋關鍵字」欄是手工調校過的，
 * 所以這支腳本只「檢查」不「重寫」：比對三方是否一致——
 *   data/levels.js 的 img 鍵 × img/ 實際檔案 × 清單文件列出的檔名
 * 圖片補進 img/ 後若忘了從清單移除，或題庫新增假名卻沒進清單，這裡會 FAIL。
 * ========================================================= */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DOC = "docs/image-download-list.md";

const win = {};
new Function("window", fs.readFileSync(path.join(ROOT, "data/levels.js"), "utf8"))(win);

const all = [];
win.KANA_DATA.levels.forEach(lv => lv.hira.concat(lv.kata).forEach(x => all.push(x)));
const have = new Set(fs.readdirSync(path.join(ROOT, "img")));
const missing = all.filter(x => !have.has(x.img + ".png")).map(x => x.img);

const md = fs.readFileSync(path.join(ROOT, DOC), "utf8");
const listed = [...md.matchAll(/`([a-z0-9_]+)\.png`/g)].map(m => m[1]);
const missingSet = new Set(missing), listedSet = new Set(listed);

const stale = listed.filter(k => !missingSet.has(k));      // 圖已補進 img/，清單卻還留著
const absent = missing.filter(k => !listedSet.has(k));     // 缺圖但清單沒列
const dupes = listed.filter((k, i) => listed.indexOf(k) !== i);

const fails = [];
if (stale.length) fails.push(`清單列了 ${stale.length} 個「已經有圖」的項目，應移除：${stale.join(", ")}`);
if (absent.length) fails.push(`有 ${absent.length} 個缺圖未列入 ${DOC}：${absent.join(", ")}`);
if (dupes.length) fails.push(`清單中重複列出：${[...new Set(dupes)].join(", ")}`);

// 標題的「目前缺圖：N 張」也一起對帳
const headed = md.match(/目前缺圖：\s*(\d+)\s*張/);
if (headed && Number(headed[1]) !== missing.length) {
  fails.push(`${DOC} 標題寫「缺圖 ${headed[1]} 張」，實際為 ${missing.length} 張`);
}

console.log(`配圖統計：題庫 ${all.length} 音、img/ 已有 ${all.length - missing.length} 張、待補 ${missing.length} 張`);

if (fails.length) {
  console.log(`\n❌ FAIL：${fails.length} 項`);
  fails.forEach(f => console.log("  - " + f));
  process.exit(1);
}
console.log(`\n✅ PASS：${DOC} 與 img/ 一致`);
