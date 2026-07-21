#!/usr/bin/env node
/* =========================================================
 * scripts/validate-news.mjs — 新聞包驗證（比照 validate.mjs 的紀律）
 * 用法：node scripts/validate-news.mjs
 * 檢查 data/news.js 的 window.KANA_NEWS.packs，輸出 PASS/FAIL。
 * ========================================================= */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NEWS_PATH = path.join(ROOT, "data", "news.js");

const LEVELS = new Set(["N5", "N4", "N3", "N2", "N1"]);
const KANA_RE = /^[぀-ゟ゠-ヿーー・、。！？]+$/; // 平/片假名（含長音、標點）
const fails = [];
const warns = [];

let data = null;
try {
  const code = fs.readFileSync(NEWS_PATH, "utf8");
  const win = {};
  new Function("window", code)(win);
  data = win.KANA_NEWS;
} catch (e) {
  fails.push(`無法載入 ${NEWS_PATH}：${e.message}`);
}
if (data && (!Array.isArray(data.packs) || !data.packs.length)) {
  fails.push("KANA_NEWS.packs 不存在或為空陣列");
  data = null;
}

function reqStr(obj, keyPath, where) {
  const v = keyPath.split(".").reduce((o, k) => (o == null ? o : o[k]), obj);
  if (typeof v !== "string" || v === "") fails.push(`${where}：欄位 ${keyPath} 缺漏或非空字串`);
}
function triLang(obj, where) {
  ["ja", "zh", "en"].forEach(l => reqStr(obj, l, where));
}

if (data) {
  const ids = new Set();
  data.packs.forEach((p, pi) => {
    const w = `第 ${pi + 1} 包（${p?.id ?? "?"}）`;
    reqStr(p, "id", w); reqStr(p, "date", w);
    if (!LEVELS.has(p?.level)) fails.push(`${w}：level 必須是 N5..N1（實際 "${p?.level}"）`);
    if (p?.id) { if (ids.has(p.id)) fails.push(`${w}：id 重複`); else ids.add(p.id); }
    if (!p?.source || typeof p.source !== "object") fails.push(`${w}：缺 source 出處`);
    else reqStr(p, "source.note", w);

    if (!p?.title) fails.push(`${w}：缺 title`); else triLang(p.title, `${w} title`);

    if (!Array.isArray(p?.summary) || !p.summary.length) fails.push(`${w}：summary 需為非空陣列`);
    else p.summary.forEach((s, i) => triLang(s, `${w} summary[${i}]`));

    if (!Array.isArray(p?.vocab) || !p.vocab.length) fails.push(`${w}：vocab 需為非空陣列`);
    else p.vocab.forEach((v, i) => {
      const vw = `${w} vocab[${i}]（${v?.word ?? "?"}）`;
      ["word", "reading", "zh", "en", "pos", "jlpt"].forEach(k => reqStr(v, k, vw));
      if (typeof v?.reading === "string" && !KANA_RE.test(v.reading)) fails.push(`${vw}：reading「${v.reading}」需為全假名`);
    });

    if (!Array.isArray(p?.grammar) || !p.grammar.length) warns.push(`${w}：grammar 為空`);
    else p.grammar.forEach((g, i) => { reqStr(g, "point", `${w} grammar[${i}]`); reqStr(g, "zh", `${w} grammar[${i}]`); });

    // 小考：恰 5 題
    if (!Array.isArray(p?.quiz) || p.quiz.length !== 5) fails.push(`${w}：quiz 需恰 5 題（實際 ${p?.quiz?.length}）`);
    else p.quiz.forEach((q, i) => {
      const qw = `${w} quiz[${i}]`;
      if (!["listening", "reading", "vocab", "grammar", "cloze"].includes(q?.type)) fails.push(`${qw}：type 不合法（${q?.type}）`);
      if (!Array.isArray(q?.options) || q.options.length < 2) fails.push(`${qw}：options 至少 2 個`);
      if (!Number.isInteger(q?.answer) || q.answer < 0 || (Array.isArray(q?.options) && q.answer >= q.options.length)) fails.push(`${qw}：answer 索引不合法（${q?.answer}）`);
      if (q?.type === "listening") reqStr(q, "audioText", qw);
      reqStr(q, "explain.zh", qw);
    });

    if (!Array.isArray(p?.dictation) || !p.dictation.length) fails.push(`${w}：dictation 需為非空陣列`);
    else p.dictation.forEach((d, i) => {
      const dw = `${w} dictation[${i}]`;
      reqStr(d, "ja", dw);
      if (!Array.isArray(d?.accept) || !d.accept.length) fails.push(`${dw}：accept 需為非空陣列`);
    });

    if (!Array.isArray(p?.speaking) || !p.speaking.length) fails.push(`${w}：speaking 需為非空陣列`);
    else p.speaking.forEach((s, i) => { reqStr(s, "ja", `${w} speaking[${i}]`); reqStr(s, "furigana", `${w} speaking[${i}]`); });
  });
  console.log(`新聞統計：${data.packs.length} 包`);
}

if (warns.length) { console.log("\n⚠ 警告："); warns.forEach(x => console.log("  - " + x)); }
if (fails.length) {
  console.log(`\n❌ FAIL：${fails.length} 項問題`);
  fails.forEach(f => console.log("  - " + f));
  process.exit(1);
} else {
  console.log("\n✅ PASS：新聞包全部檢查通過");
}
