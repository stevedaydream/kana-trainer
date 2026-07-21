#!/usr/bin/env node
/* =========================================================
 * scripts/generate-news.mjs — 每日新聞包產生器（離線內容管線）
 *
 * 流程：讀真實新聞主題 → Gemini 產出「重製摘要」分級新聞包 → 就地驗證
 *      → 累積寫回 data/news.js（保留最近 KEEP 天，供重複學習）。
 * 前端仍純渲染、零執行期 AI。
 *
 * 用法：
 *   GEMINI_API_KEY=xxx node scripts/generate-news.mjs [--date=YYYY-MM-DD] [--level=N5] [--topic="..."] [--force]
 *   node scripts/generate-news.mjs --mock            # 離線：用內建樣本驗證管線水路（不呼叫 Gemini）
 *
 * 授權界線：只重述事實、原創改寫、勿逐字複製版權原文、標註出處（見 docs/ai-news-module-design.md §9）。
 * ========================================================= */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";
import { geminiJSON, hasKey } from "./lib/gemini.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const NEWS_PATH = path.join(ROOT, "data", "news.js");
const KEEP = 60;                       // 保留最近幾則（歷史題庫）
const argv = Object.fromEntries(process.argv.slice(2).map(a => {
  const m = a.match(/^--([^=]+)(?:=(.*))?$/); return m ? [m[1], m[2] ?? true] : [a, true];
}));
const DATE = argv.date || new Date().toISOString().slice(0, 10);
const LEVEL = argv.level || "N5";

const HEADER = `/* =========================================================
 * data/news.js — 每日新聞資料包（唯一內容來源）
 * 由 scripts/generate-news.mjs 自動累積產生；前端只渲染。
 * schema 見 docs/ai-news-module-design.md §2。
 * ========================================================= */
window.KANA_NEWS = `;

function loadPacks() {
  try { const win = {}; new Function("window", fs.readFileSync(NEWS_PATH, "utf8"))(win); return (win.KANA_NEWS?.packs) || []; }
  catch { return []; }
}

function prompt() {
  return [
    "你是日語教材編輯。請閱讀近期真實新聞的「事實要點」，用你自己的話產出一則【原創重製摘要】的分級日語學習素材。",
    "嚴格規則：",
    "1) 只重述事實，禁止逐字或近乎逐字複製任何原文；不捏造未發生之事或真人不實引言。",
    `2) 目標難度 ${LEVEL}（JLPT）；日文句子須符合該程度（用字、漢字量、句長）。`,
    "3) 標註出處（媒體/連結，若用聚合主題可寫主題來源）。",
    argv.topic ? `4) 主題傾向：${argv.topic}` : "4) 主題自選當日一則適合初學者的軟性新聞（生活/科技/自然/文化）。",
    "",
    "只輸出 JSON，欄位如下（全部必填，ja/zh/en 皆非空；furigana 為整句假名讀音；quiz 恰 5 題）：",
    JSON.stringify({
      title: { ja: "", furigana: "", zh: "", en: "" },
      source: { title: "", publisher: "", url: "", note: "原創、分級改寫之摘要，非重製原文。" },
      summary: [{ ja: "", furigana: "", zh: "", en: "" }],
      vocab: [{ word: "", reading: "（全假名）", zh: "", en: "", pos: "", jlpt: "N5", example: { ja: "", zh: "" } }],
      grammar: [{ point: "", zh: "", en: "", example: { ja: "", zh: "" }, note: "" }],
      quiz: [{ type: "listening|reading|vocab|grammar|cloze", prompt: { ja: "", zh: "" }, audioText: "（listening 用）", options: ["", "", "", ""], answer: 0, explain: { zh: "" } }],
      dictation: [{ ja: "", furigana: "", accept: ["假名版", "漢字版"], hint: "" }],
      speaking: [{ ja: "", furigana: "", zh: "", focus: "intonation|pacing", linking: "連音/弱化提示" }]
    }, null, 0)
  ].join("\n");
}

function mockPack() {
  return {
    title: { ja: "（樣本）きょうのニュース", furigana: "（サンプル）きょうの ニュース", zh: "（樣本）今日新聞", en: "(sample) today's news" },
    source: { title: "樣本", publisher: "mock", url: "", note: "離線樣本，用於驗證管線水路。" },
    summary: [{ ja: "きょうは いい てんきです。", furigana: "きょうは いい てんきです。", zh: "今天天氣很好。", en: "It is nice weather today." }],
    vocab: [{ word: "天気", reading: "てんき", zh: "天氣", en: "weather", pos: "名詞", jlpt: "N5", example: { ja: "いい天気ですね。", zh: "天氣真好。" } }],
    grammar: [{ point: "〜です", zh: "是～（禮貌）", en: "polite copula", example: { ja: "がくせいです。", zh: "是學生。" }, note: "名詞句禮貌形。" }],
    quiz: [
      { type: "reading", prompt: { ja: "きょうの てんきは？", zh: "今天天氣如何？" }, options: ["好", "壞", "下雨", "下雪"], answer: 0, explain: { zh: "いい天気＝好天氣。" } },
      { type: "vocab", prompt: { ja: "「天気」の意味は？", zh: "「天気」意思？" }, options: ["天氣", "電器", "元氣", "人氣"], answer: 0, explain: { zh: "天気＝天氣。" } },
      { type: "grammar", prompt: { ja: "がくせい（　）。", zh: "選禮貌形" }, options: ["です", "でした", "ますか", "ください"], answer: 0, explain: { zh: "名詞＋です。" } },
      { type: "cloze", prompt: { ja: "いい てんき（　）ね。", zh: "選助詞" }, options: ["です", "ます", "から", "まで"], answer: 0, explain: { zh: "です＋ね。" } },
      { type: "listening", prompt: { ja: "", zh: "聽發音選意思" }, audioText: "きょうは いい てんきです。", options: ["今天天氣好", "今天下雨", "昨天天氣好", "明天放假"], answer: 0, explain: { zh: "きょう＝今天。" } }
    ],
    dictation: [{ ja: "いい てんきです。", furigana: "いい てんきです。", accept: ["いいてんきです", "いい天気です"], hint: "天氣很好。" }],
    speaking: [{ ja: "きょうは いい てんきです。", furigana: "きょうは いい てんきです。", zh: "今天天氣很好。", focus: "intonation", linking: "句尾です下降。" }]
  };
}

function sanity(p) {
  const bad = [];
  if (!p.title?.ja || !p.title?.zh) bad.push("title 缺 ja/zh");
  if (!Array.isArray(p.summary) || !p.summary.length) bad.push("summary 空");
  if (!Array.isArray(p.quiz) || p.quiz.length !== 5) bad.push("quiz 非 5 題");
  else p.quiz.forEach((q, i) => { if (!Array.isArray(q.options) || !Number.isInteger(q.answer) || q.answer < 0 || q.answer >= q.options.length) bad.push(`quiz[${i}] answer/options 不合法`); });
  if (!Array.isArray(p.dictation) || !p.dictation.length) bad.push("dictation 空");
  if (!Array.isArray(p.speaking) || !p.speaking.length) bad.push("speaking 空");
  if (bad.length) throw new Error("產出未通過基本檢查：" + bad.join("；"));
}

async function main() {
  const packs = loadPacks();
  const id = `daily-${DATE}-${LEVEL}`;
  if (packs.some(p => p.id === id) && !argv.force) {
    console.log(`已存在 ${id}，略過（--force 可覆蓋）。`); return;
  }
  let pack;
  if (argv.mock || (!hasKey() && argv["allow-nokey"])) {
    console.log("（mock）用內建樣本，不呼叫 Gemini。");
    pack = mockPack();
  } else {
    console.log(`呼叫 Gemini 產生 ${DATE} / ${LEVEL} …`);
    pack = await geminiJSON(prompt());
  }
  pack.id = id; pack.date = DATE; pack.level = LEVEL;
  pack.source = pack.source || { note: "原創、分級改寫之摘要，非重製原文。" };
  if (!pack.source.note) pack.source.note = "原創、分級改寫之摘要，非重製原文。";
  sanity(pack);

  const next = [pack, ...packs.filter(p => p.id !== id)].slice(0, KEEP);
  fs.writeFileSync(NEWS_PATH, HEADER + JSON.stringify({ packs: next }, null, 2) + ";\n");
  // 用正式驗證器把關（失敗則 exit 非 0，CI 不會 commit 壞資料）
  execFileSync("node", [path.join(ROOT, "scripts", "validate-news.mjs")], { stdio: "inherit" });
  console.log(`✅ 已寫入 ${id}，目前共 ${next.length} 則。`);
}

main().catch(e => { console.error("❌ " + e.message); process.exit(1); });
