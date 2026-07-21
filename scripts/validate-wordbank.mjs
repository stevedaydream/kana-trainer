#!/usr/bin/env node
/* =========================================================
 * scripts/validate-wordbank.mjs — 讀音辭庫驗證
 * 用法：node scripts/validate-wordbank.mjs
 * 檢查 data/wordbank.js：鍵須為題庫存在的假名；每筆 {w,zh} 非空；
 * w 須以該假名開頭（を/ん/ヲ/ン 白名單例外）。目標每音 5 詞（不足僅警告）。
 * ========================================================= */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const load = (rel, key) => { const win = {}; new Function("window", fs.readFileSync(path.join(ROOT, rel), "utf8"))(win); return win[key]; };

const W_PREFIX_WHITELIST = new Set(["を", "ん", "ヲ", "ン", "ぢ", "づ", "ヂ", "ヅ"]);
const TARGET = 5;
const fails = [], warns = [];

let DATA, WB;
try { DATA = load("data/levels.js", "KANA_DATA"); } catch (e) { fails.push("無法載入 data/levels.js：" + e.message); }
try { WB = load("data/wordbank.js", "KANA_WORDBANK"); } catch (e) { fails.push("無法載入 data/wordbank.js：" + e.message); }

if (DATA && WB) {
  const validKana = new Set();
  DATA.levels.forEach(lv => lv.hira.concat(lv.kata).forEach(x => validKana.add(x.k)));
  const keys = Object.keys(WB);
  let totalWords = 0;
  keys.forEach(k => {
    if (!validKana.has(k)) { fails.push(`辭庫鍵「${k}」不是題庫中的假名`); return; }
    const list = WB[k];
    if (!Array.isArray(list) || !list.length) { fails.push(`「${k}」：需為非空陣列`); return; }
    if (list.length < TARGET) warns.push(`「${k}」：只有 ${list.length} 詞（目標 ${TARGET}）`);
    const seen = new Set();
    list.forEach((c, i) => {
      const tag = `「${k}」[${i}]`;
      if (typeof c?.w !== "string" || !c.w) fails.push(`${tag}：w 缺漏`);
      if (typeof c?.zh !== "string" || !c.zh) fails.push(`${tag}：zh 缺漏`);
      if (typeof c?.w === "string") {
        if (!W_PREFIX_WHITELIST.has(k) && !c.w.startsWith(k)) fails.push(`${tag}：單詞「${c.w}」未以「${k}」開頭`);
        if (seen.has(c.w)) fails.push(`${tag}：單詞「${c.w}」在同音下重複`); else seen.add(c.w);
      }
      totalWords++;
    });
  });
  console.log(`辭庫統計：${keys.length} 音、共 ${totalWords} 詞（題庫 ${validKana.size} 音）`);
}

if (warns.length) { console.log("\n⚠ 警告（不影響上線）："); warns.slice(0, 30).forEach(w => console.log("  - " + w)); if (warns.length > 30) console.log(`  …共 ${warns.length} 則`); }
if (fails.length) { console.log(`\n❌ FAIL：${fails.length} 項`); fails.forEach(f => console.log("  - " + f)); process.exit(1); }
else { console.log("\n✅ PASS：辭庫檢查通過"); }
