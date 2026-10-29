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
import { readWindowData, atomicWrite } from "./lib/content-files.mjs";
import { validateWordbank } from "./lib/wordbank-validation.mjs";
import { geminiJSON, hasKey } from "./lib/gemini.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const WB_PATH = path.resolve(process.argv.find(a => a.startsWith("--output="))?.slice(9) || path.join(ROOT, "data", "wordbank.js"));
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

const load = (rel, key) => readWindowData(path.join(ROOT, rel), key);

function kanaList() {
  const DATA = load("data/levels.js", "KANA_DATA");
  const out = [];
  DATA.levels.forEach(lv => lv.hira.concat(lv.kata).forEach(x => out.push({ k: x.k, r: x.r })));
  return out;
}
function loadWB() { return fs.existsSync(WB_PATH) ? readWindowData(WB_PATH, "KANA_WORDBANK") : {}; }

function prompt(batch) {
  return [
    "你是日語教材編輯。為下列每個假名，各產出 5 個【以該假名開頭】的常用初級單詞（可含該行以外假名）。",
    "規則：單詞只用假名（可含長音符）。を/ん/ヲ/ン/ぢ/づ/ヂ/ヅ 改為詞中包含該假名，其餘以指定假名開頭；附繁體中文意思；同一假名的 5 詞不重複；避免髒話與艱澀詞。",
    "只輸出 JSON 物件，key 為假名，value 為 5 個 {w, zh} 的陣列。例：",
    '{"か":[{"w":"かさ","zh":"雨傘"},{"w":"かお","zh":"臉"}]}',
    "",
    "假名清單：" + batch.map(b => b.k + "(" + b.r + ")").join("、")
  ].join("\n");
}
function mock(batch) {
  const o = {};
  batch.forEach(b => { o[b.k] = ["あ", "い", "う", "え", "お"].map(i => ({ w: b.k + i, zh: "測試樣本" })); });
  return o;
}
function validMerge(k, list) {
  if (!Array.isArray(list)) return [];
  const seen = new Set(), out = [];
  for (const c of list) {
    if (!c || typeof c.w !== "string" || typeof c.zh !== "string" || !c.w || !c.zh) continue;
    if (!/^[ぁ-ゖゝゞァ-ヺー-ヾ]+$/.test(c.w)) continue;
    if (WHITELIST.has(k) ? !c.w.includes(k) : !c.w.startsWith(k)) continue;   // 必須以該假名開頭
    if (seen.has(c.w)) continue; seen.add(c.w);
    out.push({ w: c.w, zh: c.zh });
    if (out.length >= TARGET) break;
  }
  return out;
}

async function main() {
  if (argv.mock && !argv.output) throw Error("--mock 需指定 --output，避免覆寫正式辭庫");
  if (!Number.isInteger(CHUNK) || CHUNK < 1 || CHUNK > 100) throw Error("chunk 需為 1..100 的整數");
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
      batch.forEach(b => { const m = validMerge(b.k, [...(!argv.all ? (wb[b.k] || []) : []), ...(Array.isArray(map[b.k]) ? map[b.k] : [])]); if (m.length) { wb[b.k] = m; got++; } });
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
  const { errors } = validateWordbank(load("data/levels.js", "KANA_DATA"), ordered);
  if (errors.length) throw Error("辭庫驗證失敗，保留正式檔：" + errors.slice(0, 5).join("；"));
  atomicWrite(WB_PATH, HEADER + JSON.stringify(ordered, null, 2) + ";\n");
  const filled = Object.values(ordered).filter(l => l.length >= TARGET).length;
  console.log(`✅ 辭庫：${Object.keys(ordered).length} 音（滿 ${TARGET} 詞 ${filled} 音）；批次 成功 ${okBatches} / 失敗 ${failBatches}。`);
  if (filled < kanas.length) console.log("（尚有未滿 5 詞者，可再次觸發同 workflow 續補。）");
  if (failBatches > 0) process.exitCode = 1; // A failed provider batch must not look like a healthy CI run.
}
main().catch(e => { console.error("❌ " + e.message); process.exit(1); });
