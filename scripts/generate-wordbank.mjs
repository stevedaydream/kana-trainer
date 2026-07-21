#!/usr/bin/env node
/* =========================================================
 * scripts/generate-wordbank.mjs — 讀音辭庫產生器（每音 5 詞）
 *
 * 讀 data/levels.js 的假名清單，對「尚未湊滿 5 詞」的假名呼叫 Gemini
 * 產生 5 個以該假名開頭的常用單詞（含中文），合併寫回 data/wordbank.js。
 *
 * 用法：
 *   GEMINI_API_KEY=xxx node scripts/generate-wordbank.mjs [--all] [--chunk=20]
 *   node scripts/generate-wordbank.mjs --mock          # 離線：驗證合併/寫檔水路
 * ========================================================= */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { geminiJSON, hasKey } from "./lib/gemini.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WB_PATH = path.join(ROOT, "data", "wordbank.js");
const TARGET = 5;
const argv = Object.fromEntries(process.argv.slice(2).map(a => { const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true]; }));
const CHUNK = Number(argv.chunk) || 12;
const WHITELIST = new Set(["を", "ん", "ヲ", "ン", "ぢ", "づ", "ヂ", "ヅ"]);

const HEADER = `/* =========================================================
 * data/wordbank.js — 每音讀音辭庫（每假名多詞，翻牌隨機抽一個）
 * 由 scripts/generate-wordbank.mjs 產生/累積；前端只渲染。
 * 介面：window.KANA_WORDBANK = { "<假名>": [ { w, zh }, … ], … }
 * ========================================================= */
window.KANA_WORDBANK = `;

const load = (rel, key) => { const win = {}; new Function("window", fs.readFileSync(path.join(ROOT, rel), "utf8"))(win); return win[key]; };

function kanaList() {
  const DATA = load("data/levels.js", "KANA_DATA");
  const out = [];
  DATA.levels.forEach(lv => lv.hira.concat(lv.kata).forEach(x => out.push({ k: x.k, r: x.r })));
  return out;
}
function loadWB() { try { return load("data/wordbank.js", "KANA_WORDBANK") || {}; } catch { return {}; } }

function prompt(batch) {
  return [
    "你是日語教材編輯。為下列每個假名，各產出 5 個【以該假名開頭】的常用初級單詞（可含該行以外假名）。",
    "規則：單詞用假名或含漢字皆可，但必須以指定假名開頭；附繁體中文意思；同一假名的 5 詞不重複；避免髒話與艱澀詞。",
    "只輸出 JSON 物件，key 為假名，value 為 5 個 {w, zh} 的陣列。例：",
    '{"か":[{"w":"かさ","zh":"雨傘"},{"w":"かお","zh":"臉"}]}',
    "",
    "假名清單：" + batch.map(b => b.k + "(" + b.r + ")").join("、")
  ].join("\n");
}
function mock(batch) {
  const o = {};
  batch.forEach(b => { o[b.k] = [1, 2, 3, 4, 5].map(i => ({ w: b.k + "サンプル" + i, zh: "樣本" + i })); });
  return o;
}
function validMerge(k, list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set(), out = [];
  for (const c of list) {
    if (!c || typeof c.w !== "string" || typeof c.zh !== "string" || !c.w || !c.zh) continue;
    if (!WHITELIST.has(k) && !c.w.startsWith(k)) continue;   // 必須以該假名開頭
    if (seen.has(c.w)) continue; seen.add(c.w);
    out.push({ w: c.w, zh: c.zh });
    if (out.length >= TARGET) break;
  }
  return out;
}

async function main() {
  const kanas = kanaList();
  const wb = loadWB();
  const todo = kanas.filter(x => argv.all || !(Array.isArray(wb[x.k]) && wb[x.k].length >= TARGET));
  if (!todo.length) { console.log("辭庫已完整，無需產生。"); return; }
  console.log(`待補 ${todo.length} 音（每音 ${TARGET} 詞，每批 ${CHUNK}）…`);

  const nBatches = Math.ceil(todo.length / CHUNK);
  let okBatches = 0, failBatches = 0;
  for (let i = 0; i < todo.length; i += CHUNK) {
    const batch = todo.slice(i, i + CHUNK), n = i / CHUNK + 1;
    try {
      let map;
      if (argv.mock || (!hasKey() && argv["allow-nokey"])) map = mock(batch);
      else { console.log(`  Gemini 批次 ${n}/${nBatches}…`); map = await geminiJSON(prompt(batch), { temperature: 0.8 }); }
      let got = 0;
      batch.forEach(b => { const m = validMerge(b.k, map[b.k]); if (m.length) { wb[b.k] = m; got++; } });
      okBatches++;
      console.log(`    批次 ${n} 完成（${got}/${batch.length} 音）`);
    } catch (e) {
      failBatches++;
      console.warn(`    ⚠ 批次 ${n} 失敗，略過：${e.message}`);
    }
  }

  // 依題庫順序輸出，穩定 diff；即使部分批次失敗也寫入已成功者（re-run 會續補）
  const ordered = {};
  kanas.forEach(x => { if (wb[x.k]) ordered[x.k] = wb[x.k]; });
  fs.writeFileSync(WB_PATH, HEADER + JSON.stringify(ordered, null, 2) + ";\n");
  execFileSync("node", [path.join(ROOT, "scripts", "validate-wordbank.mjs")], { stdio: "inherit" });
  const filled = Object.values(ordered).filter(l => l.length >= TARGET).length;
  console.log(`✅ 辭庫：${Object.keys(ordered).length} 音（滿 ${TARGET} 詞 ${filled} 音）；批次 成功 ${okBatches} / 失敗 ${failBatches}。`);
  if (filled < kanas.length) console.log("（尚有未滿 5 詞者，可再次觸發同 workflow 續補。）");
}
main().catch(e => { console.error("❌ " + e.message); process.exit(1); });
