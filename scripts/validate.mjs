#!/usr/bin/env node
/* =========================================================
 * scripts/validate.mjs — 題庫驗證腳本
 * 用法：node scripts/validate.mjs
 * 檢查 data/levels.js，輸出 PASS/FAIL 報告；
 * 另列出「題庫有鍵但缺圖檔」清單（缺圖可上線，僅警告）。
 * ========================================================= */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const LEVELS_PATH = path.join(ROOT, "data", "levels.js");
const IMG_DIR = path.join(ROOT, "img");

/* ---------- 資料驅動規則表（第二階段擴充只改這裡） ---------- */

// 羅馬音完整對照表：平假名 + 片假名 清音（含特例 し/ち/つ/ふ/を/ん）
const ROMAJI_TABLE = {
  "あ":"a","い":"i","う":"u","え":"e","お":"o",
  "か":"ka","き":"ki","く":"ku","け":"ke","こ":"ko",
  "さ":"sa","し":"shi","す":"su","せ":"se","そ":"so",
  "た":"ta","ち":"chi","つ":"tsu","て":"te","と":"to",
  "な":"na","に":"ni","ぬ":"nu","ね":"ne","の":"no",
  "は":"ha","ひ":"hi","ふ":"fu","へ":"he","ほ":"ho",
  "ま":"ma","み":"mi","む":"mu","め":"me","も":"mo",
  "や":"ya","ゆ":"yu","よ":"yo",
  "ら":"ra","り":"ri","る":"ru","れ":"re","ろ":"ro",
  "わ":"wa","を":"o","ん":"n",
  "ア":"a","イ":"i","ウ":"u","エ":"e","オ":"o",
  "カ":"ka","キ":"ki","ク":"ku","ケ":"ke","コ":"ko",
  "サ":"sa","シ":"shi","ス":"su","セ":"se","ソ":"so",
  "タ":"ta","チ":"chi","ツ":"tsu","テ":"te","ト":"to",
  "ナ":"na","ニ":"ni","ヌ":"nu","ネ":"ne","ノ":"no",
  "ハ":"ha","ヒ":"hi","フ":"fu","ヘ":"he","ホ":"ho",
  "マ":"ma","ミ":"mi","ム":"mu","メ":"me","モ":"mo",
  "ヤ":"ya","ユ":"yu","ヨ":"yo",
  "ラ":"ra","リ":"ri","ル":"ru","レ":"re","ロ":"ro",
  "ワ":"wa","ヲ":"o","ン":"n",
  // ---- 第二階段預留（濁音/半濁音/拗音特例，屆時直接補齊） ----
  "が":"ga","じ":"ji","ぢ":"ji","づ":"zu","ば":"ba","ぱ":"pa",
  "きゃ":"kya","しゃ":"sha","ちゃ":"cha","じゃ":"ja","にゃ":"nya"
};

// 每級應有的每列假名數（hira 與 kata 各自的數量）
const LEVEL_SIZE = { 1:5, 2:5, 3:5, 4:5, 5:5, 6:5, 7:5, 8:3, 9:5, 10:3,
  /* 第二階段預留 */ 11:15, 12:10, 13:15, 14:18 };

// w 不必以該假名開頭的白名單（撥音/助詞性質）
const W_PREFIX_WHITELIST = new Set(["を","ん","ヲ","ン"]);

const REQUIRED_FIELDS = ["k","r","type","origin","w","zh","img","emoji","pair"];

/* ---------- 載入題庫（模擬瀏覽器 window） ---------- */
const fails = [];
const warns = [];
let data = null;
try {
  const code = fs.readFileSync(LEVELS_PATH, "utf8");
  const win = {};
  new Function("window", code)(win);
  data = win.KANA_DATA;
} catch (e) {
  fails.push(`無法載入 ${LEVELS_PATH}：${e.message}`);
}
if (data && (!Array.isArray(data.levels) || !data.levels.length)) {
  fails.push("KANA_DATA.levels 不存在或為空陣列");
  data = null;
}

/* ---------- 檢查 ---------- */
if (data) {
  const all = [];
  const byK = new Map();
  const imgKeys = new Map();

  for (const lv of data.levels) {
    const where = `第 ${lv.id} 級（${lv.name ?? "未命名"}）`;
    if (!Number.isInteger(lv.id)) fails.push(`${where}：id 不是整數`);
    if (typeof lv.name !== "string" || !lv.name) fails.push(`${where}：缺 name`);

    for (const side of ["hira", "kata"]) {
      const arr = lv[side];
      if (!Array.isArray(arr)) { fails.push(`${where}：缺 ${side} 陣列`); continue; }
      const expect = LEVEL_SIZE[lv.id];
      if (expect != null && arr.length !== expect)
        fails.push(`${where}：${side} 應為 ${expect} 筆，實際 ${arr.length} 筆`);

      for (const x of arr) {
        const tag = `${where} ${side} 「${x?.k ?? "?"}」`;
        // 欄位齊全 + 型別
        for (const f of REQUIRED_FIELDS) {
          if (typeof x?.[f] !== "string" || x[f] === "")
            fails.push(`${tag}：欄位 ${f} 缺漏或不是非空字串`);
        }
        if (typeof x?.k !== "string") continue;
        // type 只能 hira/kata，且要放對陣列
        if (x.type !== "hira" && x.type !== "kata")
          fails.push(`${tag}：type 必須是 "hira" 或 "kata"（實際 "${x.type}"）`);
        else if (x.type !== side)
          fails.push(`${tag}：放在 ${side} 陣列但 type 是 "${x.type}"`);
        // 羅馬音對照（含特例）
        const expectR = ROMAJI_TABLE[x.k];
        if (expectR == null) warns.push(`${tag}：羅馬音表沒有此假名，無法驗證 r="${x.r}"`);
        else if (x.r !== expectR) fails.push(`${tag}：羅馬音應為 "${expectR}"，實際 "${x.r}"`);
        // w 以該假名開頭（白名單例外）
        if (typeof x.w === "string" && !W_PREFIX_WHITELIST.has(x.k) && !x.w.startsWith(x.k))
          fails.push(`${tag}：單詞 "${x.w}" 未以 "${x.k}" 開頭`);
        // img 全域唯一
        if (typeof x.img === "string") {
          if (imgKeys.has(x.img)) fails.push(`${tag}：img 鍵 "${x.img}" 與 ${imgKeys.get(x.img)} 重複`);
          else imgKeys.set(x.img, tag);
        }
        if (byK.has(x.k)) fails.push(`${tag}：假名重複出現（另見 ${byK.get(x.k)}）`);
        else byK.set(x.k, tag);
        all.push(x);
      }
    }
  }

  // pair 雙向對稱
  for (const x of all) {
    if (typeof x.pair !== "string") continue;
    const p = all.find(o => o.k === x.pair);
    if (!p) { fails.push(`「${x.k}」的 pair "${x.pair}" 不存在於題庫`); continue; }
    if (p.pair !== x.k) fails.push(`pair 不對稱：${x.k}.pair="${x.pair}" 但 ${p.k}.pair="${p.pair}"`);
    if (p.type === x.type) fails.push(`「${x.k}」與 pair "${x.pair}" 的 type 相同（應為平↔片）`);
  }

  // 缺圖檔清單（僅警告，缺圖會自動退回 SVG/emoji）
  let existing = new Set();
  try { existing = new Set(fs.readdirSync(IMG_DIR)); } catch { /* img/ 可以不存在 */ }
  const missing = [...imgKeys.keys()].filter(k => !existing.has(k + ".png"));
  if (missing.length)
    warns.push(`缺圖檔 ${missing.length}/${imgKeys.size} 張（會自動退回 SVG/emoji）：${missing.join(", ")}`);

  console.log(`題庫統計：${data.levels.length} 級、共 ${all.length} 筆假名`);
}

/* ---------- 報告 ---------- */
if (warns.length) {
  console.log("\n⚠ 警告（不影響上線）：");
  for (const w of warns) console.log("  - " + w);
}
if (fails.length) {
  console.log(`\n❌ FAIL：${fails.length} 項問題`);
  for (const f of fails) console.log("  - " + f);
  process.exit(1);
} else {
  console.log("\n✅ PASS：題庫全部檢查通過");
}
