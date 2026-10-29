
"use strict";
/* =====================================================================
 * 五十音練習器 主程式
 * 只透過 window.KANA_DATA 取資料；題庫更換零修改。
 * =================================================================== */
(function () {
  const $app = document.getElementById("app");
  const params = new URLSearchParams(location.search);

  /* ---------- 題庫載入防護 ---------- */
  const DATA = (window.KANA_DATA && Array.isArray(window.KANA_DATA.levels) && window.KANA_DATA.levels.length)
    ? window.KANA_DATA : null;
  if (!DATA) {
    $app.innerHTML =
      '<div class="topbar"><div><h1>五十音練習器</h1></div></div>' +
      '<div class="banner err"><b>題庫未載入</b><br>' +
      '找不到 <code>data/levels.js</code> 或其中沒有 <code>window.KANA_DATA</code>。<br>' +
      '請確認檔案存在後重新整理頁面。</div>';
    return;
  }
  const LEVELS = DATA.levels;
  const ALL_KANA = [];
  const BY_K = {};
  LEVELS.forEach(lv => (lv.hira.concat(lv.kata)).forEach(x => { ALL_KANA.push(x); BY_K[x.k] = x; }));

  /* ---------- 儲存層：window.storage → localStorage → 記憶體 ---------- */
  const STORE_KEY = "kana_trainer_v1";
  let storageMessage = "", storageBlocked = false;
  function storageError(message) {
    storageMessage = message;
    const status = document.getElementById("storage-status");
    if (status) { status.textContent = message; status.hidden = false; }
  }
  const store = window.KanaStorage.create(window, STORE_KEY, storageError);

  /* ---------- 進度狀態 ---------- */
  const DAY = 86400000;
  // FSRS-lite：DSR 模型（難度/穩定度/可提取度），目標留存 90%；不做梯度下降，208 音規模足夠。
  const FSRS = { G: 3, S0: { 1: 0.5, 3: 2, 4: 4 }, MASTER_S: 21 };
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const P = {
    weights: {}, streak: {}, best: {}, unlocked: 1, warmup: false,
    srs: {}, daily: { lastActiveDate: "", streakDays: 0, todayCount: 0, goal: 30 },
    tts: { persona: "default", voiceURI: "", rate: 0.85, pitch: 1.0, gender: "" },
    star: {},
    plan: { intensity: "normal", casualRandom: true, progress: { date: "", level: 0, weak: 0, random: 0, write: 0 } },
    news: { userLevel: "N5", level: "N5", furigana: true, doneDays: {}, quizBest: {}, inputDone: {} },
    wb: {}   // 辭庫自訂層：{ "<假名>": { add: [{w,zh}], hide: ["<被隱藏的內建詞>"] } }
  };
  const DEFAULTS = JSON.parse(JSON.stringify(P));
  const NEWS = (window.KANA_NEWS_INDEX && Array.isArray(window.KANA_NEWS_INDEX.packs) && window.KANA_NEWS_INDEX.packs.length)
    ? window.KANA_NEWS_INDEX.packs : null;
  let newsLoader = null;
  const WORDBANK = (window.KANA_WORDBANK && typeof window.KANA_WORDBANK === "object") ? window.KANA_WORDBANK : {};
  /* ---------- 讀音辭庫（內建內容檔 + 使用者自訂層） ----------
   * data/wordbank.js 是唯讀內容檔；使用者在設定裡的增刪只寫進存檔的 P.wb，
   * 所以換辭庫內容檔不會沖掉自訂，自訂也會一起進備份 JSON。
   * 詞首規則比照題庫：這些音不作詞首，改為「詞中含該假名」。 */
  const WB_PREFIX_FREE = new Set(["を", "ん", "ヲ", "ン", "ぢ", "づ", "ヂ", "ヅ"]);
  const WB_KANA_ONLY = /^[ぁ-ゖゝゞァ-ヺー-ヾ]+$/;   // 平/片假名＋長音符・繰り返し記号
  function wbBase(k) { const l = WORDBANK[k]; return Array.isArray(l) ? l.filter(c => c && c.w && c.zh) : []; }
  function wbOwn(k) { const e = P.wb[k]; return (e && Array.isArray(e.add)) ? e.add.filter(c => c && c.w && c.zh) : []; }
  function wbHidden(k) { const e = P.wb[k]; return new Set((e && Array.isArray(e.hide)) ? e.hide : []); }
  function wbEnsure(k) {
    const e = P.wb[k] || (P.wb[k] = { add: [], hide: [] });
    if (!Array.isArray(e.add)) e.add = [];
    if (!Array.isArray(e.hide)) e.hide = [];
    return e;
  }
  function wbList(k) {   // 合併結果：內建（扣掉隱藏）＋ 自訂；同 w 的自訂覆蓋內建（可改中文）
    const hide = wbHidden(k), own = wbOwn(k), ownMap = new Map(own.map(c => [c.w, c]));
    const out = [];
    wbBase(k).forEach(c => { if (!hide.has(c.w)) out.push(ownMap.get(c.w) || c); });
    own.forEach(c => { if (!hide.has(c.w) && !out.some(o => o.w === c.w)) out.push(c); });
    return out;
  }
  function wbCustomised(k) { const e = P.wb[k]; return !!(e && ((e.add && e.add.length) || (e.hide && e.hide.length))); }
  function wbValidate(k, w, zh, ignoreW) {   // ignoreW：編輯時排除自己，才能只改中文
    if (!w) return "請輸入單詞。";
    if (!zh) return "請輸入中文意思。";
    if (!WB_KANA_ONLY.test(w)) return "單詞請只用假名（可含長音符「ー」），不要漢字或空白。";
    if (WB_PREFIX_FREE.has(k)) { if (w.indexOf(k) < 0) return "「" + k + "」不作詞首，單詞須「包含」" + k + "。"; }
    else if (w.indexOf(k) !== 0) return "單詞必須以「" + k + "」開頭。";
    if (w !== ignoreW && wbList(k).some(c => c.w === w)) return "「" + w + "」已經在這個音的辭庫裡了。";
    return "";
  }
  function wbAdd(k, w, zh) {   // 新增或覆寫（同 w 視為改中文）
    const e = wbEnsure(k);
    const i = e.hide.indexOf(w); if (i >= 0) e.hide.splice(i, 1);   // 曾隱藏的內建詞：加回來＝取消隱藏
    const base = wbBase(k).find(c => c.w === w);
    const j = e.add.findIndex(c => c.w === w);
    if (base && base.zh === zh) { if (j >= 0) e.add.splice(j, 1); } // 改回跟內建一樣就不用存
    else if (j >= 0) e.add[j] = { w, zh };
    else e.add.push({ w, zh });
    save();
  }
  function wbRemove(k, w) {
    const e = wbEnsure(k);
    const j = e.add.findIndex(c => c.w === w); if (j >= 0) e.add.splice(j, 1);
    // 內建詞不能真的刪（內容檔唯讀），改記在 hide；純自訂詞上面已移除
    if (wbBase(k).some(c => c.w === w) && !e.hide.includes(w)) e.hide.push(w);
    save();
  }
  function wbReset(k) { delete P.wb[k]; save(); }
  // 練習揭曉：某假名若有多詞則隨機抽一個，全被隱藏或本來就沒有時退回題庫單一 w/zh
  function pickWord(x) {
    const list = wbList(x.k);
    if (list.length) { const c = list[Math.floor(Math.random() * list.length)]; if (c && c.w) return c; }
    return { w: x.w, zh: x.zh };
  }
  // 學習強度預設：每日新級數、弱項頻率、隨機考次數、每 N 天一級
  const INTENSITY = {
    high: { id: "high", label: "高強度", levelsPerDay: 2, weakDaily: true, randomPerDay: 2, levelEveryNDays: 1 },
    normal: { id: "normal", label: "一般", levelsPerDay: 1, weakDaily: true, randomPerDay: 1, levelEveryNDays: 1 },
    casual: { id: "casual", label: "休閒", levelsPerDay: 1, weakDaily: "alt", randomPerDay: 1, levelEveryNDays: 2 }
  };
  function initKeys() {
    ALL_KANA.forEach(x => {
      if (!(x.k in P.weights)) P.weights[x.k] = 1;   // 新假名自動補 1
      if (!(x.k in P.streak)) P.streak[x.k] = 0;
      if (!(x.k in P.srs)) P.srs[x.k] = { D: 5, S: 0, last: 0, reps: 0, lapses: 0 };
    });
  }
  function snapshot() { return JSON.parse(JSON.stringify(Object.assign({ schemaVersion: window.KanaStorage.VERSION }, P))); }
  function save() { return storageBlocked ? Promise.resolve(false) : store.set(snapshot()); }

  /* ----- FSRS-lite 間隔重複排程 ----- */
  const { srsUpdate, dueOf, isMastered, masteredCount } = window.KanaScheduler(P, FSRS, DAY, clamp, ALL_KANA);

  /* ----- 每日目標 / 連續天數（呼應 24 小時鞏固循環） ----- */
  function dayKey(ts) {
    const d = new Date(ts), m = String(d.getMonth() + 1).padStart(2, "0"), dd = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + dd;
  }
  function bumpDaily() {
    const t = dayKey(Date.now());
    if (P.daily.lastActiveDate !== t) {
      const prev = P.daily.lastActiveDate;
      const gap = prev ? Math.round((Date.parse(t) - Date.parse(prev)) / DAY) : Infinity;
      P.daily.streakDays = gap === 1 ? (P.daily.streakDays || 0) + 1 : 1;
      P.daily.lastActiveDate = t;
      P.daily.todayCount = 0;
    }
    P.daily.todayCount++;
  }

  function markMiss(k) {
    P.weights[k] = Math.min(16, (P.weights[k] || 1) * 4); P.streak[k] = 0;
    srsUpdate(k, 1); bumpDaily(); save();
  }
  function markHit(k, easy) {
    P.streak[k] = (P.streak[k] || 0) + 1;
    P.weights[k] = P.streak[k] >= 2 ? 1 : Math.max(1, (P.weights[k] || 1) / 2);
    srsUpdate(k, easy ? 4 : 3); bumpDaily(); save();
  }

  /* ---------- 語音人格預設（程式資產）：以音高/語速近似，依裝置語音自動挑性別 ---------- */
  const PERSONAS = [
    { id: "default", label: "標準", pitch: 1.0, rate: 0.85, gender: "" },
    { id: "cute_f", label: "可愛女聲", pitch: 1.6, rate: 1.0, gender: "f" },
    { id: "sexy_f", label: "性感女聲", pitch: 0.9, rate: 0.78, gender: "f" },
    { id: "sunny_m", label: "陽光男聲", pitch: 1.15, rate: 1.08, gender: "m" },
    { id: "deep_m", label: "低沉男聲", pitch: 0.55, rate: 0.85, gender: "m" }
  ];
  const FEMALE_RE = /kyoko|o-?ren|haruka|nanami|ayumi|sayaka|mizuki|hana|kanade|female|woman|women|女/i;
  const MALE_RE = /otoya|ichiro|daichi|takeshi|hattori|male|man|男/i;

  /* ---------- 語音（無 speechSynthesis 時靜音降級，絕不拋錯） ---------- */
  const TTS = window.KanaAudio(params, FEMALE_RE, MALE_RE);
  const speakable = w => String(w || "").replace(/（[^）]*）/g, "");

  /* ---------- 內建 SVG（程式資產；缺 SVG 退 emoji） ---------- */
  const SVGS = {
    asa: '<svg viewBox="0 0 96 96"><rect x="8" y="60" width="80" height="6" fill="#1f4788"/><circle cx="48" cy="58" r="20" fill="#eb6101"/><g stroke="#eb6101" stroke-width="4" stroke-linecap="round"><line x1="48" y1="22" x2="48" y2="10"/><line x1="22" y1="34" x2="14" y2="26"/><line x1="74" y1="34" x2="82" y2="26"/></g></svg>',
    inu: '<svg viewBox="0 0 96 96"><ellipse cx="48" cy="62" rx="26" ry="20" fill="#c8905c"/><circle cx="48" cy="36" r="18" fill="#c8905c"/><ellipse cx="34" cy="22" rx="7" ry="12" fill="#8a5a30"/><ellipse cx="62" cy="22" rx="7" ry="12" fill="#8a5a30"/><circle cx="42" cy="34" r="2.5" fill="#2b2b2b"/><circle cx="54" cy="34" r="2.5" fill="#2b2b2b"/><ellipse cx="48" cy="42" rx="4" ry="3" fill="#2b2b2b"/></svg>',
    umi: '<svg viewBox="0 0 96 96"><path d="M4 58 Q16 44 28 58 T52 58 T76 58 T96 58 V88 H4 Z" fill="#3a6bb5"/><path d="M4 70 Q16 58 28 70 T52 70 T76 70 T96 70 V92 H4 Z" fill="#1f4788"/><circle cx="72" cy="26" r="10" fill="#eb6101"/></svg>',
    eki: '<svg viewBox="0 0 96 96"><rect x="14" y="38" width="68" height="34" rx="4" fill="#1f4788"/><rect x="22" y="46" width="14" height="12" fill="#fffdf7"/><rect x="60" y="46" width="14" height="12" fill="#fffdf7"/><rect x="10" y="72" width="76" height="6" fill="#2b2b2b"/><path d="M14 38 L48 18 L82 38 Z" fill="#eb6101"/></svg>',
    onigiri: '<svg viewBox="0 0 96 96"><path d="M48 14 Q60 14 74 42 Q84 62 76 72 Q66 80 48 80 Q30 80 20 72 Q12 62 22 42 Q36 14 48 14 Z" fill="#fffdf7" stroke="#d8d2c4" stroke-width="2"/><rect x="36" y="56" width="24" height="22" rx="3" fill="#2b2b2b"/></svg>',
    aisu: '<svg viewBox="0 0 96 96"><path d="M30 44 L48 88 L66 44 Z" fill="#c8905c"/><circle cx="48" cy="34" r="18" fill="#fde8ef"/><circle cx="36" cy="40" r="10" fill="#fbd0de"/><circle cx="60" cy="40" r="10" fill="#fbd0de"/></svg>',
    inku: '<svg viewBox="0 0 96 96"><rect x="30" y="40" width="36" height="36" rx="6" fill="#1f4788"/><rect x="38" y="28" width="20" height="12" rx="2" fill="#2b2b2b"/><path d="M70 20 L78 28 L58 48 L50 48 L50 40 Z" fill="#eb6101"/></svg>',
    uuru: '<svg viewBox="0 0 96 96"><circle cx="48" cy="48" r="28" fill="#e8e0f5"/><g fill="none" stroke="#9b7fd4" stroke-width="3"><path d="M24 40 Q48 28 72 40"/><path d="M22 52 Q48 40 74 52"/><path d="M26 64 Q48 52 70 64"/></g><line x1="70" y1="66" x2="88" y2="80" stroke="#9b7fd4" stroke-width="3"/></svg>',
    ebi: '<svg viewBox="0 0 96 96"><path d="M22 34 Q48 12 74 34 Q86 46 74 58 Q60 70 44 66" fill="none" stroke="#eb6101" stroke-width="12" stroke-linecap="round"/><path d="M44 66 L30 82 M44 66 L48 84" stroke="#eb6101" stroke-width="5" stroke-linecap="round"/><circle cx="26" cy="34" r="3" fill="#2b2b2b"/><path d="M20 30 L8 20 M22 26 L14 12" stroke="#eb6101" stroke-width="3" stroke-linecap="round"/></svg>',
    orenji: '<svg viewBox="0 0 96 96"><circle cx="48" cy="54" r="28" fill="#f5a623"/><circle cx="48" cy="54" r="20" fill="#fbc775"/><g stroke="#f5a623" stroke-width="3"><line x1="48" y1="34" x2="48" y2="74"/><line x1="28" y1="54" x2="68" y2="54"/><line x1="34" y1="40" x2="62" y2="68"/><line x1="62" y1="40" x2="34" y2="68"/></g><path d="M48 26 Q56 14 66 18 Q60 28 48 26" fill="#2e7d32"/></svg>'
  };

  /* 圖片載入優先序：img/{key}.png → 內建 SVG → emoji */
  function visualEl(x) {
    const box = document.createElement("div");
    box.className = "visual";
    const fallback = () => {
      if (SVGS[x.img]) box.innerHTML = SVGS[x.img];
      else box.innerHTML = '<span class="emoji">' + (x.emoji || "❔") + "</span>";
    };
    const im = new Image();
    im.alt = x.zh || "";
    im.onload = () => { box.innerHTML = ""; box.appendChild(im); };
    im.onerror = fallback;
    im.src = window.KANA_ILLUSTRATIONS?.[x.img] || "img/" + x.img + ".png";
    fallback(); // 先放退回內容，圖檔載到再替換
    return box;
  }

  /* ---------- 工具 ---------- */
  const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  function weightedPick(set, excludeK) {
    let pool = set.filter(x => x.k !== excludeK);
    if (!pool.length) pool = set;
    let total = 0;
    const cum = pool.map(x => (total += (P.weights[x.k] || 1)));
    const r = Math.random() * total;
    for (let i = 0; i < pool.length; i++) if (r < cum[i]) return pool[i];
    return pool[pool.length - 1];
  }
  function kanaSizeClass(k) { return k.length > 1 ? "kana-big multi" : "kana-big"; }
  function unlockedLevels() { return LEVELS.filter(lv => lv.id <= P.unlocked); }
  function unlockedKana() { const out = []; unlockedLevels().forEach(lv => out.push(...lv.hira, ...lv.kata)); return out; }
  // 「已練習」＝該級至少有一個假名被自評或考過（srs.reps > 0）。
  // 剛考完 N 級解鎖 N+1 級、但還沒練過 N+1 級時，隨機考不該把 N+1 級算進去。
  function isLevelStudied(lv) { return lv.hira.concat(lv.kata).some(x => { const s = P.srs[x.k]; return !!(s && s.reps > 0); }); }
  function studiedLevels() {
    const out = unlockedLevels().filter(isLevelStudied);
    return out.length ? out : unlockedLevels().slice(0, 1);   // 全新使用者：至少給第 1 級，避免空池
  }
  function studiedKana() { const out = []; studiedLevels().forEach(lv => out.push(...lv.hira, ...lv.kata)); return out; }
  function rangeKana(loId, hiId, kinds) {   // kinds: "hira" | "kata" | "both"
    const out = [];
    LEVELS.forEach(lv => {
      if (lv.id < loId || lv.id > hiId) return;
      if (kinds !== "kata") out.push(...lv.hira);
      if (kinds !== "hira") out.push(...lv.kata);
    });
    return out;
  }
  function reviewQueue() {   // 已解鎖範圍內到期複習，依最該複習優先，上限 40（CLT 保護工作記憶）
    const now = Date.now();
    return unlockedKana().filter(x => dueOf(x.k) <= now)
      .sort((a, b) => dueOf(a.k) - dueOf(b.k)).slice(0, 40);
  }

  /* ----- 弱項池（權重 / 忘記次數 / 星號） ----- */
  function forgetCount(k) { const s = P.srs[k]; return s ? (s.lapses || 0) : 0; }
  function isWeak(k) { return (P.weights[k] || 1) > 1 || !!P.star[k] || forgetCount(k) > 0; }
  function weakScore(k) { return (P.star[k] ? 1000 : 0) + (P.weights[k] || 1) * 100 + forgetCount(k) * 10; }
  function weakPool() { return unlockedKana().filter(x => isWeak(x.k)).sort((a, b) => weakScore(b.k) - weakScore(a.k)); }

  /* ----- 學習強度：今日計畫（App 內提醒） ----- */
  function planReset() {
    const t = dayKey(Date.now());
    if (P.plan.progress.date !== t) { P.plan.progress = { date: t, level: 0, weak: 0, random: 0, write: 0 }; save(); }
  }
  function bumpPlan(kind) { planReset(); if (kind && kind in P.plan.progress) { P.plan.progress[kind]++; save(); } }
  function planTasks() {
    planReset();
    const cfg = INTENSITY[P.plan.intensity] || INTENSITY.normal;
    const epochDay = Math.floor(Date.parse(P.plan.progress.date) / DAY);
    const levelDay = (epochDay % cfg.levelEveryNDays) === 0;
    const pr = P.plan.progress;
    const tasks = [];
    if (levelDay) tasks.push({ kind: "level", label: "練習 " + cfg.levelsPerDay + " 級", need: cfg.levelsPerDay, done: pr.level });
    const weakNeed = cfg.weakDaily === true ? 1 : (cfg.weakDaily === "alt" ? (levelDay ? 0 : 1) : 0);
    if (weakNeed) tasks.push({ kind: "weak", label: "弱項鍛鍊", need: weakNeed, done: pr.weak });
    let rnd = cfg.randomPerDay;
    if (P.plan.intensity === "casual" && !P.plan.casualRandom) rnd = 0;
    if (rnd) tasks.push({ kind: "random", label: "每日隨機考" + (rnd > 1 ? " ×" + rnd : ""), need: rnd, done: pr.random });
    return tasks;
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c])); }

  /* ----- 易混淆假名（Noticing the Gap）：程式資產，非題庫 ----- */
  const CONFUSE_GROUPS = [
    ["シ", "ツ", "ソ", "ン"], ["ね", "れ", "わ"], ["は", "ほ", "ま", "も"], ["る", "ろ"],
    ["ク", "ワ", "タ", "ケ", "フ"], ["コ", "ユ", "ヨ"], ["ぬ", "め", "れ"], ["あ", "お"],
    ["き", "さ", "ち"], ["ウ", "ワ", "ヲ", "ラ"], ["ナ", "メ", "ヌ", "ス"], ["ア", "マ"]
  ];
  const CONFUSABLES = {};
  CONFUSE_GROUPS.forEach(g => g.forEach(k => { CONFUSABLES[k] = (CONFUSABLES[k] || []).concat(g.filter(o => o !== k)); }));
  function confusablePool(pool, correctK) {   // pool 中與正解形近者，供考試優先干擾
    const set = CONFUSABLES[correctK]; if (!set) return null;
    const hit = pool.filter(o => set.indexOf(o.k) >= 0);
    return hit.length ? hit : null;
  }
  function distractors(pool, correct, n, key, priorityPool) {
    const c = key(correct);
    let cand = priorityPool ? shuffle([...new Set(priorityPool.map(key))].filter(v => v !== c)) : [];
    const rest = shuffle([...new Set(pool.map(key))].filter(v => v !== c && cand.indexOf(v) < 0));
    cand = cand.concat(rest).slice(0, n);
    return shuffle(cand.concat([c]));
  }

  /* ----- 羅馬音容錯比對（產出型輸入）：hepburn 標準 + 常見替代拼法 ----- */
  const ROMAJI_ALIASES = {
    si: "shi", ti: "chi", tu: "tsu", hu: "fu", zi: "ji", di: "ji", du: "zu",
    sya: "sha", syu: "shu", syo: "sho", tya: "cha", tyu: "chu", tyo: "cho",
    zya: "ja", zyu: "ju", zyo: "jo", jya: "ja", jyu: "ju", jyo: "jo"
  };
  function romajiEq(input, answer) {
    const v = String(input || "").trim().toLowerCase().replace(/[^a-z]/g, "");
    return !!v && (v === answer || ROMAJI_ALIASES[v] === answer);
  }

  /* ----- 課後總結 ----- */
  function sessionSummary(s) {
    const acc = s.total ? Math.round(s.correct / s.total * 100) : 0;
    const secs = Math.max(1, Math.round((Date.now() - s.startTs) / 1000));
    const weak = Object.keys(s.missed || {}).sort((a, b) => s.missed[b] - s.missed[a]).slice(0, 3);
    const goalTxt = "今日 " + P.daily.todayCount + " / " + P.daily.goal + (P.daily.todayCount >= P.daily.goal ? " ✅ 達標" : "");
    return '<div class="summary">' +
      '<div class="srow"><span>正確率</span><b>' + acc + "%</b></div>" +
      '<div class="srow"><span>用時</span><b>' + secs + " 秒</b></div>" +
      (weak.length ? '<div class="srow"><span>最弱</span><b>' + weak.map(esc).join("　") + "</b></div>" : "") +
      '<div class="srow"><span>連續</span><b>🔥 ' + (P.daily.streakDays || 0) + " 天</b></div>" +
      '<div class="srow"><span>目標</span><b>' + goalTxt + "</b></div></div>";
  }

  let activeScope = null;
  function clearTimers() { if (activeScope) activeScope.dispose(); TTS.stop(); }
  function render(html, scope) {
    if (!scope || scope !== activeScope) clearTimers();
    activeScope = scope || window.KanaSession.create();
    TTS.stop(); $app.innerHTML = html;
    $app.querySelectorAll(".n-ja,.n-furi,.nt-ja,.nt-furi,.kana-big,.kana-mid,.word,.wk,.g,.k,.warm-grid span,.vr,.ww").forEach(el => el.setAttribute("lang", "ja"));
    const labels = { pitch: "語音音高", rate: "語音語速", voice: "日語語音", tin: "作答內容", pastebox: "貼上進度 JSON", importfile: "選擇進度 JSON 檔案", wplay: "播放假名讀音", settings: "設定" };
    for (const [id, label] of Object.entries(labels)) { const el = $app.querySelector("#" + id); if (el) el.setAttribute("aria-label", label); }
    $app.querySelectorAll("#card").forEach(el => {
      el.setAttribute("role", "button"); el.setAttribute("tabindex", "0"); el.setAttribute("aria-label", "揭曉答案");
      el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); } });
    });
    const heading = $app.querySelector("h1,.q-prompt,.result-box");
    if (heading) { heading.setAttribute("tabindex", "-1"); heading.focus({ preventScroll: true }); }
    const status = document.getElementById("screen-status");
    if (status && heading) status.textContent = heading.textContent;
  }

  /* =====================  首頁  ===================== */
  function homeScreen() {
    if (P.daily.lastActiveDate !== dayKey(Date.now())) P.daily.todayCount = 0;
    const due = reviewQueue().length;
    const rows = LEVELS.map(lv => {
      const locked = lv.id > P.unlocked;
      const best = P.best[lv.id];
      const count = lv.hira.length + lv.kata.length;
      const mastered = lv.hira.concat(lv.kata).every(x => isMastered(x.k));
      return '<button class="level-row' + (locked ? " locked" : "") + '" data-lv="' + lv.id + '"' + (locked ? ' disabled' : '') + '>' +
        '<div class="badge">' + (locked ? "🔒" : (mastered ? "✓" : lv.id)) + "</div>" +
        '<div class="info"><div class="name">' + esc(lv.name) + "</div>" +
        '<div class="meta">' + count + " 音 ・ 平假名／片假名／混合／考試</div></div>" +
        (best != null ? '<div class="score">最佳 ' + best + " 題</div>" :
          (locked ? '<div class="meta">前一級考試 ≥ 12 題解鎖</div>' : "")) +
        "</button>";
    }).join("");

    // 弱項榜（權重 + 忘記次數 + 星號）
    const weak = weakPool().slice(0, 8);
    const weakHtml = weak.length
      ? '<div class="weak-list">' + weak.map(x => {
          const f = forgetCount(x.k), w = Math.round(P.weights[x.k] || 1);
          return '<span class="weak-chip' + (P.star[x.k] ? " starred" : "") + '">' + (P.star[x.k] ? "★" : "") + esc(x.k) +
            (w > 1 ? ' <b>×' + w + "</b>" : "") + (f > 0 ? ' <i>忘' + f + "</i>" : "") + "</span>";
        }).join("") + "</div>"
      : '<div class="progress-note">目前沒有弱項，太棒了！練習中按「✗忘了」或在揭曉卡點「☆ 標記易忘」都會列入這裡。</div>';

    // 今日計畫（依學習強度）
    const tasks = planTasks();
    const planHtml = tasks.length
      ? '<div class="panel plan"><h2>📋 今日計畫（' + esc((INTENSITY[P.plan.intensity] || INTENSITY.normal).label) + '）</h2>' +
        tasks.map(t => {
          const ok = t.done >= t.need;
          return '<button class="task' + (ok ? " ok" : "") + '" data-kind="' + t.kind + '">' +
            '<span class="tk">' + (ok ? "✅" : "⬜") + " " + esc(t.label) + "</span>" +
            '<span class="tp">' + t.done + " / " + t.need + "</span></button>";
        }).join("") +
        "</div>"
      : "";
    const planUndone = tasks.some(t => t.done < t.need);

    const goalPct = Math.min(100, Math.round(P.daily.todayCount / P.daily.goal * 100));
    render(
      '<div class="topbar"><div><h1>五十音練習器</h1>' +
      '<div class="sub">FSRS 間隔重複 ・ 提取練習 ・ 14 級</div></div>' +
      '<div class="topright"><div class="streak">🔥 ' + (P.daily.streakDays || 0) + ' 天</div>' +
      '<button class="iconbtn" id="settings" title="設定">⚙️</button></div></div>' +
      '<div class="goalbar"><i style="width:' + goalPct + '%"></i><span>今日 ' + P.daily.todayCount + ' / ' + P.daily.goal + ' 題</span></div>' +
      (!TTS.enabled ? '<div class="banner">🔇 此環境不支援語音，已切換靜音模式：考試將不出聽選題。</div>' : "") +
      (planUndone ? '<div class="banner due">📌 今日計畫尚未完成，點下方任務開始吧！</div>' : "") +
      planHtml +
      '<div class="actions">' +
      '<button class="act primary" id="continue">繼續學習<span class="cnt">第 ' + P.unlocked + ' 級</span></button>' +
      '<button class="act" id="review"' + (due ? "" : " disabled") + '>📅 今日複習<span class="cnt">' + (due ? due + " 張到期" : "已完成 ✅") + '</span></button>' +
      '</div><details class="practice-menu"><summary>更多練習與每日新聞</summary><div class="actions">' +
      '<button class="act" id="random">🎲 每日隨機考<span class="cnt">' + esc(randomExamLevelLabel()) + ' ・ 60 題 ・ 45 及格</span></button>' +
      '<button class="act" id="weak">💪 弱項鍛鍊</button>' +
      '<button class="act" id="challenge">🎯 總複習 / 挑戰</button>' +
      '<button class="act" id="confuse">🔀 易混淆特訓</button>' +
      '<button class="act" id="write">✍️ 書寫練習</button>' +
      (NEWS ? '<button class="act" id="news">📰 每日新聞<span class="cnt">聽・讀・說</span></button>' : "") +
      (TTS.enabled ? '<button class="act" id="audio">🔊 聽音辨形</button><button class="act" id="shadow">🗣️ 跟讀練習</button>' : "") +
      "</div></details>" +
      '<div class="levels">' + rows + "</div>" +
      '<div class="panel"><h2>弱項榜 ・ 已精熟 ' + masteredCount() + " / " + ALL_KANA.length + " 音</h2>" + weakHtml +
        (weak.length ? '<button class="ghost small" id="weakdrill" style="margin-top:10px">💪 開始弱項鍛鍊</button>' : "") + "</div>"
    );
    $app.querySelector("#continue").addEventListener("click", () => levelScreen(P.unlocked));
    const rv = $app.querySelector("#review");
    rv.addEventListener("click", () => {
      const q = reviewQueue();
      if (!q.length) return;
      practiceScreen({ title: "今日複習", sub: "間隔重複到期", set: q, onBack: homeScreen, rounds: 1 });
    });
    $app.querySelector("#settings").addEventListener("click", settingsScreen);
    $app.querySelector("#random").addEventListener("click", dailyRandomExam);
    $app.querySelector("#weak").addEventListener("click", weakDrill);
    $app.querySelector("#challenge").addEventListener("click", challengeSetupScreen);
    $app.querySelector("#confuse").addEventListener("click", confuseDrill);
    $app.querySelector("#write").addEventListener("click", writeScreen);
    const nb = $app.querySelector("#news"); if (nb) nb.addEventListener("click", newsListScreen);
    const ab = $app.querySelector("#audio"); if (ab) ab.addEventListener("click", audioFirstScreen);
    const sb = $app.querySelector("#shadow"); if (sb) sb.addEventListener("click", shadowScreen);
    const wd = $app.querySelector("#weakdrill"); if (wd) wd.addEventListener("click", weakDrill);
    // 今日計畫任務點擊 → 對應模式
    const TASK_GO = { level: () => { const nx = LEVELS.find(l => l.id <= P.unlocked && !l.hira.concat(l.kata).every(x => isMastered(x.k))) || LEVELS[0]; levelScreen(nx.id); }, weak: weakDrill, random: dailyRandomExam };
    $app.querySelectorAll(".task").forEach(el => el.addEventListener("click", () => { const go = TASK_GO[el.dataset.kind]; if (go) go(); }));
    $app.querySelectorAll(".level-row:not(.locked)").forEach(el =>
      el.addEventListener("click", () => levelScreen(+el.dataset.lv)));
  }

  /* =====================  級別頁  ===================== */
  function levelScreen(id) {
    const lv = LEVELS.find(l => l.id === id);
    if (!lv) return homeScreen();
    const best = P.best[id];
    render(
      '<div class="topbar"><div><h1>' + esc(lv.name) + "</h1>" +
      '<div class="sub">' + (best != null ? "考試最佳成績：" + best + " 題" : "尚未通過考試") + "</div></div>" +
      '<button class="ghost small" id="back">← 返回</button></div>' +
      '<div class="part-list">' +
      '<button data-part="1">Part 1 平假名練習 <span class="tag">' + lv.hira.length + ' 音</span></button>' +
      '<button data-part="2">Part 2 片假名練習 <span class="tag">' + lv.kata.length + ' 音</span></button>' +
      '<button data-part="3">Part 3 平片混合練習 <span class="tag">' + (lv.hira.length + lv.kata.length) + ' 音</span></button>' +
      '<button data-part="4" class="exam">Part 4 考試（60 秒） <span class="tag">≥12 題解鎖下一級</span></button>' +
      "</div>" +
      '<label class="check-row"><input type="checkbox" id="warm"' +
      (P.warmup ? " checked" : "") + (TTS.enabled ? "" : " disabled") + ">" +
      "熱身：練習開始前，每個假名先播放跟讀一輪" + (TTS.enabled ? "" : "（需要語音支援）") + "</label>"
    );
    $app.querySelector("#back").addEventListener("click", homeScreen);
    $app.querySelector("#warm").addEventListener("change", e => { P.warmup = e.target.checked; save(); });
    $app.querySelectorAll("[data-part]").forEach(btn => btn.addEventListener("click", () => {
      const part = +btn.dataset.part;
      if (part === 4) return examScreen(levelExamCfg(lv));
      const set = part === 1 ? lv.hira : part === 2 ? lv.kata : lv.hira.concat(lv.kata);
      const partName = part === 1 ? "平假名" : part === 2 ? "片假名" : "平片混合";
      const cfg = { title: lv.name, sub: "Part " + part + " " + partName, set, onBack: () => levelScreen(lv.id), planKind: "level" };
      if (P.warmup && TTS.enabled) warmupScreen(cfg); else practiceScreen(cfg);
    }));
  }

  /* =====================  熱身（可跳過） ===================== */
  function warmupScreen(cfg) {
    const set = cfg.set;
    render(
      '<div class="topbar"><div><h1>熱身跟讀</h1>' +
      '<div class="sub">' + esc(cfg.title) + " ・ 跟著唸一遍</div></div>" +
      '<button class="ghost small" id="skip">跳過 →</button></div>' +
      '<div class="warm-grid">' + set.map((x, i) =>
        '<span id="wk' + i + '">' + esc(x.k) + "</span>").join("") + "</div>" +
      '<div class="center progress-note" id="wnote">準備開始…</div>'
    );
    let i = 0, cancelled = false, timeout = null;
    const go = () => { cancelled = true; if (timeout) clearTimeout(timeout); practiceScreen(cfg); };
    $app.querySelector("#skip").addEventListener("click", go);
    (function step() {
      if (cancelled) return;
      if (i >= set.length) return go();
      $app.querySelectorAll(".warm-grid span").forEach(s => s.classList.remove("now"));
      const el = $app.querySelector("#wk" + i);
      if (el) el.classList.add("now");
      const note = $app.querySelector("#wnote");
      if (note) note.textContent = set[i].k + "（" + set[i].r + "）";
      TTS.speak(set[i].k);
      i++;
      timeout = activeScope.timeout(step, 1600);
    })();
  }

  /* =====================  翻牌練習（通用；支援 audioFront 音先於形） ===================== */
  function practiceScreen(cfg) {
    const set = cfg.set;
    const backTo = cfg.onBack || homeScreen;
    if (!set || !set.length) return backTo();
    const total = cfg.total || set.length * (cfg.rounds || 2);
    const audioFront = cfg.audioFront && TTS.enabled;
    let done = 0, lastK = null, hits = 0;
    const missed = {}, startTs = Date.now();

    function head() {
      return '<div class="topbar"><div><h1>' + esc(cfg.title) + "</h1>" +
        '<div class="sub">' + (cfg.sub ? esc(cfg.sub) + " ・ " : "") + "第 " + (done + 1) + " / " + total + ' 張</div></div>' +
        '<button class="ghost small" id="quit">結束</button></div>';
    }

    function nextCard() {
      if (done >= total) return practiceDone();
      const x = weightedPick(set, lastK);
      lastK = x.k;
      const front = audioFront
        ? '<button class="shu" id="playf">🔊 播放發音</button><div class="tap-hint">聽發音、回想字形，再點卡揭曉</div>'
        : '<span class="' + kanaSizeClass(x.k) + '">' + esc(x.k) + '</span><div class="tap-hint">先在心裡唸出來，再點卡揭曉</div>';
      render(head() + '<div class="card-stage"><div class="tazuke" id="card">' + front + "</div></div>");
      $app.querySelector("#quit").addEventListener("click", backTo);
      const pf = $app.querySelector("#playf");
      if (pf) { pf.addEventListener("click", e => { e.stopPropagation(); TTS.speak(x.k); }); TTS.speak(x.k); }
      $app.querySelector("#card").addEventListener("click", () => revealCard(x), { once: true });
    }

    function revealCard(x) {
      const mastered = isMastered(x.k);   // 去中介化：精熟後字源預設收合
      const word = pickWord(x);           // 讀音辭庫：每次隨機抽一個單詞
      render(
        head() +
        '<div class="card-stage"><div class="reveal">' +
        '<div class="romaji">' + esc(x.r) + '</div>' +
        (cfg.pairCompare
          ? '<div class="pairwrap">' +
              '<div class="pcell main"><span class="g">' + esc(x.k) + '</span><span class="plabel">' + (cfg.primary === "hira" ? "平假名" : "片假名") + '</span></div>' +
              '<div class="psep">↔</div>' +
              '<div class="pcell sub"><span class="g">' + esc(x.pair) + '</span><span class="plabel">' + (cfg.primary === "hira" ? "片假名" : "平假名") + '</span></div>' +
            '</div>'
          : '<div class="kana-mid">' + esc(x.k) + '</div>') +
        (mastered
          ? '<button class="linkbtn" id="showorigin">顯示字源</button><div class="origin" id="origin" hidden>' + esc(x.origin) + "</div>"
          : '<div class="origin">' + esc(x.origin) + "</div>") +
        '<div class="visual" id="vslot"></div>' +
        (word.w !== x.w ? '<div class="progress-note">聯想圖：<span lang="ja">' + esc(x.w) + '</span></div>' : "") +
        '<div class="word">' + esc(word.w) + "</div>" +
        '<div class="zh">' + esc(word.zh) + "</div>" +
        '<div class="reveal-tools">' +
        '<button class="ghost small starbtn" id="star">' + (P.star[x.k] ? "★ 已標記" : "☆ 標記易忘") + "</button>" +
        (TTS.enabled ? '<button class="ghost small" id="replay">🔊 再聽一次</button>' : "") +
        "</div></div>" +
        '<div class="grade-btns">' +
        '<button class="shu" id="miss">✗ 忘了</button>' +
        '<button id="hit">✓ 記得</button></div></div>'
      );
      $app.querySelector("#vslot").replaceWith(visualEl(x));
      TTS.speak(x.k + "。" + speakable(word.w));
      $app.querySelector("#quit").addEventListener("click", backTo);
      const so = $app.querySelector("#showorigin");
      if (so) so.addEventListener("click", () => { so.remove(); const o = $app.querySelector("#origin"); if (o) o.hidden = false; });
      const st = $app.querySelector("#star");
      st.addEventListener("click", () => {
        if (P.star[x.k]) delete P.star[x.k]; else P.star[x.k] = true;
        st.textContent = P.star[x.k] ? "★ 已標記" : "☆ 標記易忘";
        st.classList.toggle("on", !!P.star[x.k]);
        save();
      });
      if (P.star[x.k]) st.classList.add("on");
      const rp = $app.querySelector("#replay");
      if (rp) rp.addEventListener("click", () => TTS.speak(x.k + "。" + speakable(word.w)));
      $app.querySelector("#hit").addEventListener("click", () => { markHit(x.k); hits++; done++; nextCard(); });
      $app.querySelector("#miss").addEventListener("click", () => { markMiss(x.k); missed[x.k] = (missed[x.k] || 0) + 1; done++; nextCard(); });
    }

    function practiceDone() {
      if (cfg.planKind) bumpPlan(cfg.planKind);
      render(
        '<div class="result-box"><div class="big">🎉</div>' +
        '<div class="msg">' + esc(cfg.title) + " 練習完成！</div>" +
        sessionSummary({ correct: hits, total: done, missed, startTs }) +
        '<div class="btn-col">' +
        '<button id="again">再練一輪</button>' +
        '<button class="ghost" id="back">返回</button></div></div>'
      );
      $app.querySelector("#again").addEventListener("click", () => practiceScreen(cfg));
      $app.querySelector("#back").addEventListener("click", backTo);
    }
    nextCard();
  }

  /* =====================  考試（60 秒；通用 config） =====================
   * config = { title, set, poolAll, bestKey, onBack, onPass?, allowType? }
   * 題型：聽選 / 讀選 / 平片配對 /（allowType）鍵入羅馬音（產出型）。
   * 選項干擾優先取形近字（Noticing the Gap）。答錯播正確音、餵入權重與 SRS。
   * =================================================================== */
  function examScreen(cfg) {
    return window.KanaExam({ $app, P, TTS, BY_K, weightedPick, distractors, confusablePool, esc, romajiEq, markHit, markMiss, bumpPlan, save, sessionSummary, homeScreen, render }, cfg);
  }

  // 各級考試 config：題組=當級、干擾池=已解鎖、通過解鎖下一級（行為與原本一致）
  function levelExamCfg(lv) {
    const poolAll = [];
    LEVELS.filter(l => l.id <= Math.max(P.unlocked, lv.id)).forEach(l => poolAll.push(...l.hira, ...l.kata));
    return {
      title: lv.name + " 考試", set: lv.hira.concat(lv.kata), poolAll, bestKey: lv.id,
      onBack: () => levelScreen(lv.id),
      onPass: (score) => {
        if (score >= 12) {
          const next = lv.id + 1;
          if (next <= LEVELS.length && P.unlocked < next) { P.unlocked = next; return '<div class="unlock">🎊 已解鎖 ' + esc(LEVELS[next - 1].name) + "！</div>"; }
          if (next > LEVELS.length) return '<div class="unlock">🏆 你已完成全部級別！</div>';
        }
        return "";
      }
    };
  }

  /* =====================  總複習 / 挑戰（跨級交錯） ===================== */
  function challengeSetupScreen() {
    const maxLv = P.unlocked;
    const STAGES = [{ label: "1–5 級", lo: 1, hi: 5 }, { label: "6–10 級", lo: 6, hi: 10 },
      { label: "11–14 級", lo: 11, hi: 14 }, { label: "全部", lo: 1, hi: maxLv }]
      .filter(s => s.lo <= maxLv).map(s => ({ label: s.label, lo: s.lo, hi: Math.min(s.hi, maxLv) }));
    const kindsOpts = [{ label: "平+片", v: "both" }, { label: "只平假", v: "hira" }, { label: "只片假", v: "kata" }];
    const modeOpts = [{ label: "翻牌複習", v: "flash" }, { label: "60 秒挑戰", v: "exam" }];
    let rangeIdx = STAGES.length - 1, kindsIdx = 0, modeIdx = 0, input = false;

    function segHtml(id, opts, cur) {
      return '<div class="seg" data-seg="' + id + '">' + opts.map((o, i) =>
        '<button class="' + (i === cur ? "on" : "") + '" data-i="' + i + '">' + esc(o.label) + "</button>").join("") + "</div>";
    }
    function draw() {
      render(
        '<div class="topbar"><div><h1>總複習 / 挑戰</h1><div class="sub">跨級交錯練習（強化編碼變異）</div></div>' +
        '<button class="ghost small" id="back">← 返回</button></div>' +
        '<div class="setup">' +
        '<div class="setlabel">範圍</div>' + segHtml("range", STAGES, rangeIdx) +
        '<div class="setlabel">假名種類</div>' + segHtml("kinds", kindsOpts, kindsIdx) +
        '<div class="setlabel">模式</div>' + segHtml("mode", modeOpts, modeIdx) +
        (modeOpts[modeIdx].v === "exam"
          ? '<label class="check-row"><input type="checkbox" id="inp"' + (input ? " checked" : "") + ">輸入模式：鍵入羅馬音（產出型回憶，較深編碼）</label>" : "") +
        '<button class="start" id="start" style="margin-top:18px;width:100%">開始</button></div>'
      );
      $app.querySelector("#back").addEventListener("click", homeScreen);
      $app.querySelectorAll('[data-seg="range"] button').forEach(b => b.addEventListener("click", () => { rangeIdx = +b.dataset.i; draw(); }));
      $app.querySelectorAll('[data-seg="kinds"] button').forEach(b => b.addEventListener("click", () => { kindsIdx = +b.dataset.i; draw(); }));
      $app.querySelectorAll('[data-seg="mode"] button').forEach(b => b.addEventListener("click", () => { modeIdx = +b.dataset.i; draw(); }));
      const inp = $app.querySelector("#inp"); if (inp) inp.addEventListener("change", e => { input = e.target.checked; });
      $app.querySelector("#start").addEventListener("click", start);
    }
    function start() {
      const rg = STAGES[rangeIdx], kinds = kindsOpts[kindsIdx].v, mode = modeOpts[modeIdx].v;
      const set = rangeKana(rg.lo, rg.hi, kinds);
      if (!set.length) return;
      const title = "挑戰 " + rg.label;
      if (mode === "flash") return practiceScreen({ title, sub: kindsOpts[kindsIdx].label, set, onBack: challengeSetupScreen, rounds: 1 });
      examScreen({ title, set, poolAll: rangeKana(rg.lo, rg.hi, "both"),
        bestKey: "challenge:" + rg.lo + "-" + rg.hi + ":" + kinds + (input ? ":type" : ""),
        onBack: challengeSetupScreen, allowType: input });
    }
    draw();
  }

  /* =====================  易混淆特訓（Noticing the Gap） ===================== */
  function confuseDrill() {
    const pool = unlockedKana();
    const set = pool.filter(x => CONFUSABLES[x.k]);
    if (!set.length) return homeScreen();
    examScreen({ title: "易混淆特訓", set, poolAll: pool, bestKey: "confuse", onBack: homeScreen });
  }

  /* =====================  弱項鍛鍊（權重 / 忘記次數 / 星號池） ===================== */
  function weakDrill() {
    const set = weakPool();
    if (!set.length) return homeScreen();
    practiceScreen({ title: "弱項鍛鍊", sub: "依權重・忘記次數・星號加權", set, onBack: homeScreen, rounds: 1, planKind: "weak" });
  }

  /* =====================  每日隨機考（已練習級別隨機 60 題，≥45 及格） ===================== */
  function randomExamLevelLabel() {
    const ids = studiedLevels().map(lv => lv.id);
    if (ids.length === 1) return "第 " + ids[0] + " 級";
    const contiguous = ids[ids.length - 1] - ids[0] + 1 === ids.length;   // 跳級練習時可能不連續
    return contiguous ? ids[0] + "–" + ids[ids.length - 1] + " 級" : "已練習 " + ids.length + " 級";
  }
  function dailyRandomExam() {
    const pool = studiedKana();   // 只考已練習過的級別；剛解鎖還沒練的級別不納入
    examScreen({ title: "每日隨機考", set: pool, poolAll: pool, qTotal: 60, passN: 45, bestKey: "daily-random", onBack: homeScreen, planKind: "random" });
  }

  /* =====================  設定中心（學習強度 / 語音 / 辭庫 / 備份還原） ===================== */
  let importError = "";
  async function importSaved(obj, recovery = false) {
    try {
      const candidate = window.KanaStorage.validate(obj, Object.assign({}, DEFAULTS, { maxLevel: LEVELS.length }), ALL_KANA, NEWS);
      if (!recovery) await store.backup(snapshot());
      if (!await store.set(candidate)) throw Error("新進度無法儲存；現有進度未變更。");
      Object.assign(P, candidate); initKeys(); storageBlocked = false; TTS.configure(P.tts);
      const status = document.getElementById("storage-status"); if (status) status.hidden = true;
      importError = ""; return true;
    } catch (error) { importError = error.message; return false; }
  }
  function downloadJSON(filename, text) {
    try {
      const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
      const a = document.createElement("a"); a.href = url; a.download = filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000); return true;
    } catch (e) { return false; }
  }

  function settingsScreen() {
    const voices = TTS.voices();
    function applyVoice() { TTS.configure(P.tts); save(); }
    const setNote = (id, msg, err) => { const n = $app.querySelector(id); if (n) { n.textContent = msg; n.className = "note" + (err ? " err" : ""); } };
    // 辭庫管理的區域狀態：只重繪 #wbpanel，不整頁 redraw（設定頁很長，整頁重繪會跳回頂端）
    let wbLv = LEVELS[0].id, wbK = LEVELS[0].hira[0].k, wbEditing = "", wbArmed = false;
    function wbLevelKana(id) { const lv = LEVELS.find(l => l.id === id) || LEVELS[0]; return lv.hira.concat(lv.kata); }
    function drawWb(msg, err) {
      const box = $app.querySelector("#wbpanel"); if (!box) return;
      const kanaList = wbLevelKana(wbLv);
      if (!kanaList.some(x => x.k === wbK)) wbK = kanaList[0].k;
      const list = wbList(wbK), hiddenN = wbHidden(wbK).size;
      const ownW = new Set(wbOwn(wbK).map(c => c.w));
      const ownN = list.filter(c => ownW.has(c.w)).length;
      const customLv = ALL_KANA.reduce((n, x) => n + (wbCustomised(x.k) ? 1 : 0), 0);
      const status = msg || ("共 " + list.length + " 詞（內建 " + (list.length - ownN) + " ・ 自訂 " + ownN +
        (hiddenN ? " ・ 已隱藏 " + hiddenN : "") + "）");
      box.innerHTML =
        '<div class="wb-sel">' +
        '<select id="wblv" aria-label="級別">' + LEVELS.map(l =>
          '<option value="' + l.id + '"' + (l.id === wbLv ? " selected" : "") + ">" + esc(l.name) + "</option>").join("") + "</select>" +
        '<select id="wbk" aria-label="假名">' + kanaList.map(x =>
          '<option value="' + esc(x.k) + '"' + (x.k === wbK ? " selected" : "") + ">" + esc(x.k) + "（" + esc(x.r) + "）・" +
          wbList(x.k).length + " 詞" + (wbCustomised(x.k) ? " ✎" : "") + "</option>").join("") + "</select>" +
        "</div>" +
        (list.length
          ? list.map(c =>
              '<div class="wb-row" data-w="' + esc(c.w) + '">' +
              '<span class="ww">' + esc(c.w) + "</span>" +
              '<span class="src ' + (ownW.has(c.w) ? "own\">自訂" : "std\">內建") + "</span>" +
              '<span class="wz">' + esc(c.zh) + "</span>" +
              '<button class="ghost" data-act="say" title="試聽">🔊</button>' +
              '<button class="ghost" data-act="edit" title="編輯">✎</button>' +
              '<button class="ghost" data-act="del" title="' + (ownW.has(c.w) ? "刪除" : "隱藏") + '">✕</button>' +
              "</div>").join("")
          : '<div class="wb-empty">這個音沒有辭庫詞，練習時會退回題庫預設單詞。</div>') +
        '<div class="wb-add">' +
        '<input id="wbw" placeholder="單詞（假名）" autocomplete="off">' +
        '<input id="wbz" placeholder="中文" autocomplete="off">' +
        '<button class="shu" id="wbadd">' + (wbEditing ? "✓" : "＋") + "</button></div>" +
        '<div class="note' + (err ? " err" : "") + '" id="wbnote">' + esc(status) + "</div>" +
        '<div class="btn-row">' +
        '<button class="ghost" id="wbreset"' + (wbCustomised(wbK) ? "" : " disabled") + ">↩︎ 還原此音</button>" +
        '<button class="ghost" id="wbresetall"' + (customLv ? "" : " disabled") + ">" +
        (wbArmed ? "⚠︎ 再按一次確定" : "↩︎ 全部還原（" + customLv + " 音）") + "</button></div>";

      $app.querySelector("#wblv").addEventListener("change", e => { wbLv = +e.target.value; wbEditing = ""; drawWb(); });
      $app.querySelector("#wbk").addEventListener("change", e => { wbK = e.target.value; wbEditing = ""; drawWb(); });
      const wIn = $app.querySelector("#wbw"), zIn = $app.querySelector("#wbz");
      if (wbEditing) {
        const cur = list.find(c => c.w === wbEditing);
        if (cur) { wIn.value = cur.w; zIn.value = cur.zh; }
      }
      $app.querySelectorAll(".wb-row").forEach(row => row.querySelectorAll("button").forEach(b =>
        b.addEventListener("click", () => {
          const w = row.dataset.w;
          wbArmed = false;
          if (b.dataset.act === "say") return TTS.speak(w);
          if (b.dataset.act === "edit") { wbEditing = w; return drawWb("改好後按 ✓ 儲存（內建詞會轉為自訂詞，隨時可還原）。"); }
          const wasOwn = ownW.has(w);
          wbRemove(wbK, w); wbEditing = "";
          drawWb((wasOwn ? "已刪除自訂詞「" : "已隱藏內建詞「") + w + "」。");
        })));
      function keepDraw(m, w, zh) {   // 驗證失敗：重繪後把使用者打的字填回去
        drawWb(m, true);
        const a = $app.querySelector("#wbw"), b2 = $app.querySelector("#wbz");
        if (a) a.value = w; if (b2) b2.value = zh;
      }
      function submit() {
        const w = wIn.value.trim(), zh = zIn.value.trim();
        wbArmed = false;
        const bad = wbValidate(wbK, w, zh, wbEditing);
        if (bad) return keepDraw(bad, w, zh);
        if (wbEditing && wbEditing !== w) wbRemove(wbK, wbEditing);   // 改了單詞本身：舊的移掉
        wbAdd(wbK, w, zh);
        const was = wbEditing; wbEditing = "";
        drawWb(was ? "已更新「" + w + "」。" : "已加入「" + w + "」。");
      }
      $app.querySelector("#wbadd").addEventListener("click", submit);
      [wIn, zIn].forEach(el => el.addEventListener("keydown", ev => { if (ev.key === "Enter") { ev.preventDefault(); submit(); } }));
      $app.querySelector("#wbreset").addEventListener("click", () => {
        wbReset(wbK); wbEditing = ""; wbArmed = false; drawWb("已還原「" + wbK + "」的內建辭庫。");
      });
      $app.querySelector("#wbresetall").addEventListener("click", () => {
        if (!wbArmed) { wbArmed = true; return drawWb("這會清掉所有假名的自訂與隱藏紀錄，再按一次確定。", true); }
        P.wb = {}; save(); wbEditing = ""; wbArmed = false; drawWb("已全部還原為內建辭庫。");
      });
    }
    function draw() {
      const curP = P.tts.persona, inten = P.plan.intensity;
      const voiceOpts = '<option value="">自動（依人格挑選）</option>' +
        voices.map(v => '<option value="' + esc(v.voiceURI) + '"' + (P.tts.voiceURI === v.voiceURI ? " selected" : "") + ">" + esc(v.name) + "</option>").join("");
      render(
        '<div class="topbar"><div><h1>設定</h1><div class="sub">學習強度 ・ 語音 ・ 辭庫 ・ 備份還原</div></div>' +
        '<button class="ghost small" id="back">← 返回</button></div>' +
        '<div class="settings">' +
        // ---- 學習強度 ----
        '<div class="sec-h">🎯 學習強度</div>' +
        '<div class="seg" data-seg="inten">' +
          Object.values(INTENSITY).map(it => '<button class="' + (it.id === inten ? "on" : "") + '" data-id="' + it.id + '">' + esc(it.label) + "</button>").join("") +
        "</div>" +
        '<div class="note">' + intensityDesc(inten) + "</div>" +
        (inten === "casual"
          ? '<label class="check-row"><input type="checkbox" id="casualrnd"' + (P.plan.casualRandom ? " checked" : "") + ">休閒模式仍要每日隨機考</label>" : "") +
        // ---- 語音 ----
        '<div class="sec-h">🔊 語音</div>' +
        (!TTS.enabled ? '<div class="banner">🔇 此環境未啟用語音，設定暫不發聲。</div>' : "") +
        '<div class="setlabel">人格</div>' +
        '<div class="seg" data-seg="persona">' +
          PERSONAS.map(p => '<button class="' + (p.id === curP ? "on" : "") + '" data-id="' + p.id + '">' + esc(p.label) + "</button>").join("") +
          '<button class="' + (curP === "custom" ? "on" : "") + '" data-id="custom">自訂</button>' +
        "</div>" +
        '<div class="setlabel">語音</div>' +
        '<select id="voice"' + (voices.length ? "" : " disabled") + ">" + voiceOpts + "</select>" +
        (voices.length ? "" : '<div class="note">此裝置未提供日語語音；仍會套用下方音高／語速。</div>') +
        '<div class="setlabel rowval">音高 <b id="pv">' + P.tts.pitch.toFixed(2) + "</b></div>" +
        '<input type="range" id="pitch" min="0.4" max="1.8" step="0.05" value="' + P.tts.pitch + '">' +
        '<div class="setlabel rowval">語速 <b id="rv">' + P.tts.rate.toFixed(2) + "</b></div>" +
        '<input type="range" id="rate" min="0.5" max="1.3" step="0.05" value="' + P.tts.rate + '">' +
        '<button class="shu preview" id="preview">🔊 試聽</button>' +
        // ---- 讀音辭庫 ----
        '<div class="sec-h">🔤 讀音辭庫</div>' +
        '<div class="note">翻牌揭曉時會從這裡隨機抽一個單詞。增刪只存在你的進度檔（會跟著備份 JSON 走），不會改動 <code>data/wordbank.js</code>；內建詞只能「隱藏」，隨時可還原。</div>' +
        '<div id="wbpanel"></div>' +
        // ---- 備份還原 ----
        '<div class="sec-h">💾 備份還原</div>' +
        '<div class="note">進度僅存在本機。跨瀏覽器或未來 APK 之間，請用下方匯出/匯入 JSON 手動搬遷。</div>' +
        '<div class="btn-row"><button id="export">⬇️ 匯出進度</button><button class="ghost" id="copy">📋 複製</button></div>' +
        '<div class="btn-row"><button class="ghost" id="importbtn">⬆️ 從檔案匯入</button><button class="ghost" id="recover">還原匯入前備份</button></div>' +
        '<input type="file" id="importfile" accept="application/json,.json" hidden>' +
        '<textarea id="pastebox" placeholder="或在此貼上進度 JSON…"></textarea>' +
        '<button class="ghost" id="pasteimport" style="width:100%">從貼上內容還原</button>' +
        '<div class="note" id="bknote"></div>' +
        "</div>"
      );
      $app.querySelector("#back").addEventListener("click", homeScreen);
      // 學習強度
      $app.querySelectorAll('[data-seg="inten"] button').forEach(b => b.addEventListener("click", () => {
        P.plan.intensity = b.dataset.id; save(); draw();
      }));
      const cr = $app.querySelector("#casualrnd");
      if (cr) cr.addEventListener("change", () => { P.plan.casualRandom = cr.checked; save(); });
      // 語音
      $app.querySelectorAll('[data-seg="persona"] button').forEach(b => b.addEventListener("click", () => {
        const id = b.dataset.id;
        if (id === "custom") { P.tts.persona = "custom"; applyVoice(); return draw(); }
        const p = PERSONAS.find(x => x.id === id);
        P.tts.persona = p.id; P.tts.pitch = p.pitch; P.tts.rate = p.rate; P.tts.gender = p.gender; P.tts.voiceURI = "";
        applyVoice(); draw(); TTS.speak("こんにちは");
      }));
      const vsel = $app.querySelector("#voice");
      if (vsel) vsel.addEventListener("change", () => { P.tts.voiceURI = vsel.value; applyVoice(); TTS.speak("こんにちは"); });
      const pit = $app.querySelector("#pitch"), rat = $app.querySelector("#rate");
      pit.addEventListener("input", () => { P.tts.pitch = +pit.value; P.tts.persona = "custom"; $app.querySelector("#pv").textContent = P.tts.pitch.toFixed(2); applyVoice(); });
      rat.addEventListener("input", () => { P.tts.rate = +rat.value; P.tts.persona = "custom"; $app.querySelector("#rv").textContent = P.tts.rate.toFixed(2); applyVoice(); });
      $app.querySelector("#preview").addEventListener("click", () => TTS.speak("こんにちは。あいうえお。"));
      // 辭庫管理
      drawWb();
      // 備份還原
      const exportText = () => JSON.stringify(snapshot());
      $app.querySelector("#export").addEventListener("click", () => {
        const ok = downloadJSON("kana-progress-" + dayKey(Date.now()) + ".json", exportText());
        setNote("#bknote", ok ? "已匯出 JSON 檔。" : "此環境無法下載，請改用「複製」。", !ok);
      });
      $app.querySelector("#copy").addEventListener("click", async () => {
        try { await navigator.clipboard.writeText(exportText()); setNote("#bknote", "已複製進度 JSON 到剪貼簿。"); }
        catch (e) { const t = $app.querySelector("#pastebox"); t.value = exportText(); t.select(); setNote("#bknote", "已填入下方文字框，請手動複製。"); }
      });
      $app.querySelector("#importbtn").addEventListener("click", () => $app.querySelector("#importfile").click());
      $app.querySelector("#recover").addEventListener("click", async () => {
        try {
          const previous = await store.recovery();
          if (!previous) return setNote("#bknote", "尚無匯入前備份。", true);
          if (!await importSaved(previous, true)) return setNote("#bknote", importError, true);
          homeScreen();
        } catch (_) { setNote("#bknote", "備份讀取失敗，請從 JSON 檔案還原。", true); }
      });
      $app.querySelector("#importfile").addEventListener("change", e => {
        const f = e.target.files && e.target.files[0]; if (!f) return;
        if (f.size > 2 * 1024 * 1024) return setNote("#bknote", "檔案超過 2 MB，請確認是否選擇正確的進度檔。", true);
        const r = new FileReader();
        r.onload = () => { tryImport(String(r.result)); };
        r.onerror = () => setNote("#bknote", "讀取檔案失敗。", true);
        r.readAsText(f);
      });
      $app.querySelector("#pasteimport").addEventListener("click", () => tryImport($app.querySelector("#pastebox").value));
      async function tryImport(text) {
        if (text.length > 2 * 1024 * 1024) return setNote("#bknote", "進度內容超過 2 MB。", true);
        let obj; try { obj = JSON.parse(text); } catch (e) { return setNote("#bknote", "匯入失敗：JSON 格式錯誤。", true); }
        if (!await importSaved(obj)) return setNote("#bknote", "匯入失敗：" + importError, true);
        homeScreen();
      }
    }
    draw();
  }
  function intensityDesc(id) {
    if (id === "high") return "每天 2 級 ＋ 弱項鍛鍊 ＋ 每日隨機考 ×2。";
    if (id === "casual") return "每 2 天 1 級（與弱項交錯）＋ 每日隨機考（可取消）。";
    return "每天 1 級 ＋ 弱項鍛鍊 ＋ 每日隨機考 ×1。";
  }

  /* =====================  聽音辨形（音先於形；平/片對照） ===================== */
  function audioFirstScreen() {
    // 先選主副方向：聽到發音 → 回想主字形，揭曉時同時對照另一套
    render(
      '<div class="topbar"><div><h1>聽音辨形</h1><div class="sub">聽發音回想字形，揭曉平/片對照</div></div>' +
      '<button class="ghost small" id="back">← 返回</button></div>' +
      '<div class="setup"><div class="setlabel">選擇主／副字種</div>' +
      '<div class="part-list">' +
      '<button data-primary="hira">平主片副 <span class="tag">主：平假名</span></button>' +
      '<button data-primary="kata">片主平副 <span class="tag">主：片假名</span></button>' +
      "</div></div>"
    );
    $app.querySelector("#back").addEventListener("click", homeScreen);
    $app.querySelectorAll("[data-primary]").forEach(btn => btn.addEventListener("click", () => {
      const primary = btn.dataset.primary;
      const set = rangeKana(1, P.unlocked, primary);
      practiceScreen({
        title: "聽音辨形", sub: primary === "hira" ? "平主片副" : "片主平副",
        set, onBack: audioFirstScreen, audioFront: true, pairCompare: true, primary, rounds: 1
      });
    }));
  }

  /* =====================  跟讀練習（影子跟讀簡化：聽→哼→影子） ===================== */
  function shadowScreen() {
    const set = unlockedKana();
    let i = 0;
    function show() {
      if (i >= set.length) return homeScreen();
      const x = set[i];
      render(
        '<div class="topbar"><div><h1>跟讀練習</h1><div class="sub">已解鎖假名 ・ ' + (i + 1) + " / " + set.length + "</div></div>" +
        '<button class="ghost small" id="quit">結束</button></div>' +
        '<div class="card-stage"><div class="reveal">' +
        '<div class="kana-mid" style="font-size:3.4rem">' + esc(x.k) + "</div>" +
        '<div class="romaji" style="font-size:1.4rem">' + esc(x.r) + "</div>" +
        '<div class="word">' + esc(x.w) + '</div><div class="zh">' + esc(x.zh) + "</div>" +
        '<div class="progress-note" style="margin-top:8px">① 聽　② 小聲哼　③ 像影子一樣跟著唸</div>' +
        '<button class="ghost small replay-btn" id="replay" style="margin-top:10px">🔊 再聽一次</button></div>' +
        '<div class="grade-btns"><button id="next">下一個 →</button></div></div>'
      );
      $app.querySelector("#quit").addEventListener("click", homeScreen);
      $app.querySelector("#replay").addEventListener("click", () => TTS.speak(x.k + "。" + speakable(x.w)));
      $app.querySelector("#next").addEventListener("click", () => { i++; show(); });
      TTS.speak(x.k + "。" + speakable(x.w));
    }
    show();
  }

  /* =====================  書寫練習（田字格 canvas 描寫；無辨識） ===================== */
  function writeScreen() {
    const set = unlockedKana();
    if (!set.length) return homeScreen();
    let i = 0, counted = false;
    function show() {
      if (i >= set.length) { render('<div class="result-box"><div class="big">✍️</div><div class="msg">書寫練習完成！</div>' +
        '<div class="btn-col"><button id="again">再寫一輪</button><button class="ghost" id="back">回首頁</button></div></div>');
        $app.querySelector("#again").addEventListener("click", () => { i = 0; counted = false; show(); });
        $app.querySelector("#back").addEventListener("click", homeScreen); return; }
      const x = set[i];
      render(
        '<div class="topbar"><div><h1>書寫練習</h1><div class="sub">田字格描寫 ・ ' + (i + 1) + " / " + set.length + "</div></div>" +
        '<button class="ghost small" id="quit">結束</button></div>' +
        '<div class="write-info"><span class="wk">' + esc(x.k) + '</span><span class="wr">' + esc(x.r) + "</span>" +
        (TTS.enabled ? '<button class="ghost small" id="wplay">🔊</button>' : "") + "</div>" +
        '<div class="write-stage"><canvas id="pad" width="320" height="320"></canvas></div>' +
        '<div class="grade-btns"><button class="shu" id="clear">清除</button><button id="next">完成 →</button></div>'
      );
      $app.querySelector("#quit").addEventListener("click", homeScreen);
      const wp = $app.querySelector("#wplay"); if (wp) wp.addEventListener("click", () => TTS.speak(x.k));
      TTS.speak(x.k);
      const cv = $app.querySelector("#pad"), ctx = cv.getContext("2d");
      function paintGuide() {
        ctx.clearRect(0, 0, cv.width, cv.height);
        // 田字格
        ctx.strokeStyle = "#e0dccf"; ctx.lineWidth = 1;
        ctx.strokeRect(6, 6, cv.width - 12, cv.height - 12);
        ctx.save(); ctx.setLineDash([8, 8]); ctx.strokeStyle = "#c9d4e6";
        ctx.beginPath(); ctx.moveTo(cv.width / 2, 8); ctx.lineTo(cv.width / 2, cv.height - 8);
        ctx.moveTo(8, cv.height / 2); ctx.lineTo(cv.width - 8, cv.height / 2); ctx.stroke(); ctx.restore();
        // 描紅字（淡）
        ctx.fillStyle = "#eadfae"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.font = (x.k.length > 1 ? 170 : 230) + 'px "Hiragino Sans","Noto Sans JP",sans-serif';
        ctx.fillText(x.k, cv.width / 2, cv.height / 2 + 10);
      }
      paintGuide();
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      let drawing = false, drawingPointer = null;
      const pos = e => { const r = cv.getBoundingClientRect(); const p = e.touches ? e.touches[0] : e; return { x: (p.clientX - r.left) * cv.width / r.width, y: (p.clientY - r.top) * cv.height / r.height }; };
      const start = e => { if (drawing) return; e.preventDefault(); drawing = true; drawingPointer = e.pointerId; cv.setPointerCapture(e.pointerId); const p = pos(e); ctx.strokeStyle = "#1f4788"; ctx.lineWidth = 12; ctx.beginPath(); ctx.moveTo(p.x, p.y); };
      const move = e => { if (!drawing || e.pointerId !== drawingPointer) return; e.preventDefault(); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); };
      const end = () => { drawing = false; if (drawingPointer != null && cv.hasPointerCapture(drawingPointer)) cv.releasePointerCapture(drawingPointer); drawingPointer = null; };
      cv.addEventListener("pointerdown", start); cv.addEventListener("pointermove", move);
      ["pointerup", "pointercancel", "lostpointercapture"].forEach(name => cv.addEventListener(name, end));
      activeScope.listen(window, "blur", end); activeScope.cleanup(end);
      $app.querySelector("#clear").addEventListener("click", paintGuide);
      $app.querySelector("#next").addEventListener("click", () => { if (!counted) { bumpPlan("write"); counted = true; } i++; show(); });
    }
    show();
  }

  /* =====================  每日新聞（聽/聽寫/讀/小考/口說七步） ===================== */
  function safeSourceURL(value) { try { return /^https?:$/.test(new URL(value).protocol); } catch (_) { return false; } }
  async function openNews(entry) {
    if (!entry) return newsListScreen();
    render('<div class="topbar"><h1>載入新聞</h1><button class="ghost small" id="back">← 返回列表</button></div><div class="banner" role="status">正在載入「' + esc(entry.title.zh) + '」；下載後可離線重讀。</div>');
    const scope = activeScope;
    $app.querySelector("#back").addEventListener("click", newsListScreen);
    try {
      if (!newsLoader) newsLoader = window.KanaNewsLoader.create(NEWS);
      const pack = await newsLoader.load(entry.id);
      if (!scope.disposed) newsScreen(pack);
    } catch (_) {
      if (scope.disposed) return;
      render('<div class="topbar"><h1>新聞尚未載入</h1><button class="ghost small" id="back">← 返回列表</button></div><div class="banner err" role="alert">這篇新聞未下載完成。請確認網路後重試；已快取的文章仍可離線閱讀。</div><button id="retry">重新載入</button>');
      $app.querySelector("#back").addEventListener("click", newsListScreen);
      $app.querySelector("#retry").addEventListener("click", () => openNews(entry));
    }
  }

  // 新聞列表（歷史累積，可重複學習）
  function newsListScreen() {
    if (!NEWS) return homeScreen();
    const packs = NEWS.slice().sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
    const rows = packs.map(p => {
      const d = newsInput(p.id);
      const done = [d.listen, d.dictation, d.quizPassed].filter(Boolean).length;
      return '<button class="level-row news-row" data-id="' + esc(p.id) + '">' +
        '<div class="badge">📰</div>' +
        '<div class="info"><div class="name">' + esc(p.title.zh) + "</div>" +
        '<div class="meta">' + esc(p.date) + " ・ " + esc(p.level) + " ・ " + esc(p.title.ja) + "</div></div>" +
        '<div class="score">' + (done >= 3 ? "✓ 完成" : done + "/3") + "</div></button>";
    }).join("");
    render(
      '<div class="topbar"><div><h1>📰 每日新聞</h1><div class="sub">共 ' + packs.length + " 則 ・ 可重複學習</div></div>" +
      '<button class="ghost small" id="back">← 返回</button></div>' +
      '<label class="setlabel" for="learner-level">我的日語程度</label><select id="learner-level">' + ['N5','N4','N3','N2','N1'].map(l => '<option' + (P.news.userLevel === l ? ' selected' : '') + '>' + l + '</option>').join('') + '</select>' +
      '<div class="levels">' + rows + "</div>"
    );
    $app.querySelector("#back").addEventListener("click", homeScreen);
    $app.querySelector("#learner-level").addEventListener("change", e => { P.news.userLevel = e.target.value; save(); });
    $app.querySelectorAll(".news-row").forEach(el => el.addEventListener("click", () => {
      const p = NEWS.find(x => x.id === el.dataset.id);
      if (p) openNews(p);
    }));
  }
  const levelRank = l => ({ N5: 1, N4: 2, N3: 3, N2: 4, N1: 5 }[l] || 1);
  function newsInput(id) { return window.KanaNews.input(P.news, id); }
  function markInput(pack, key) {
    window.KanaNews.mark(P.news, pack, key); save();
  }
  function inputMastered(pack) { const d = newsInput(pack.id); return !!(d.listen && d.dictation && d.quizPassed); }
  function speakUnlocked(pack) { return window.KanaNews.unlocked(P.news, pack); }  // N3+ 或輸入達標
  const normJa = s => String(s || "").replace(/[\s、。，．,.!！?？「」『』・]/g, "");

  function newsScreen(pack) {
    if (!pack) return homeScreen();
    const d = newsInput(pack.id);
    const tick = ok => ok ? ' <span class="done">✓</span>' : "";
    const qb = P.news.quizBest[pack.id];
    render(
      '<div class="topbar"><div><h1>📰 每日新聞</h1><div class="sub">' + esc(pack.date) + " ・ " + esc(pack.level) + "</div></div>" +
      '<button class="ghost small" id="back">← 返回</button></div>' +
      '<div class="news-title"><div class="nt-ja">' + esc(pack.title.ja) + "</div>" +
      (P.news.furigana ? '<div class="nt-furi">' + esc(pack.title.furigana) + "</div>" : "") +
      '<div class="nt-zh">' + esc(pack.title.zh) + "</div></div>" +
      (!pack.source.publishedAt ? '<div class="banner">歷史教材：來源發布時間尚未重新查核，教材日期不代表事件發生日。</div>' : '<div class="progress-note">來源發布：' + esc(pack.source.publishedAt.slice(0, 10)) + '</div>') +
      '<div class="banner">📥 建議順序：聽 → 聽寫 → 讀（含小考）→ 口說。口說的「脫稿」需先完成輸入才解鎖。</div>' +
      '<div class="part-list">' +
      '<button data-go="listen">📻 聽力' + tick(d.listen) + ' <span class="tag">' + pack.summary.length + ' 句</span></button>' +
      '<button data-go="dictation">✍️ 聽寫' + tick(d.dictation) + ' <span class="tag">' + pack.dictation.length + ' 句</span></button>' +
      '<button data-go="read">📖 閱讀（單字・文法）</button>' +
      '<button data-go="quiz" class="exam">📝 小考 5 題' + tick(d.quizPassed) + (qb != null ? ' <span class="tag">最佳 ' + qb + "/5</span>" : ' <span class="tag">≥3 及格</span>') + "</button>" +
      '<button data-go="speak">🗣️ 口說（七步跟讀）' + (speakUnlocked(pack) ? "" : ' <span class="tag lock">🔒 脫稿</span>') + "</button>" +
      "</div>" +
      '<div class="panel"><div class="progress-note">摘要改寫自：' + esc(pack.source.publisher) + "。" + esc(pack.source.note) + (safeSourceURL(pack.source.url) ? ' <a href="' + esc(pack.source.url) + '" target="_blank" rel="noopener noreferrer">閱讀原文</a>' : "") + "</div></div>"
    );
    $app.querySelector("#back").addEventListener("click", newsListScreen);
    const GO = { listen: newsListen, dictation: newsDictation, read: newsRead, quiz: newsQuiz, speak: newsSpeak };
    $app.querySelectorAll("[data-go]").forEach(b => b.addEventListener("click", () => GO[b.dataset.go](pack)));
  }

  function newsListen(pack) {
    const set = pack.summary; let i = 0;
    function show() {
      if (i >= set.length) { markInput(pack, "listen"); return newsScreen(pack); }
      const s = set[i];
      render(
        '<div class="topbar"><div><h1>📻 聽力</h1><div class="sub">第 ' + (i + 1) + " / " + set.length + " 句</div></div>" +
        '<button class="ghost small" id="quit">結束</button></div>' +
        '<div class="card-stage"><div class="tazuke" id="card"><button class="shu" id="playf">🔊 播放</button>' +
        '<div class="tap-hint">先聽，再點卡看文字</div></div></div>'
      );
      $app.querySelector("#quit").addEventListener("click", () => newsScreen(pack));
      const pf = $app.querySelector("#playf");
      pf.addEventListener("click", e => { e.stopPropagation(); TTS.speak(s.ja); });
      TTS.speak(s.ja);
      $app.querySelector("#card").addEventListener("click", () => {
        render(
          '<div class="topbar"><div><h1>📻 聽力</h1><div class="sub">第 ' + (i + 1) + " / " + set.length + " 句</div></div>" +
          '<button class="ghost small" id="quit">結束</button></div>' +
          '<div class="card-stage"><div class="reveal news-reveal">' +
          '<div class="n-ja">' + esc(s.ja) + "</div>" +
          (P.news.furigana ? '<div class="n-furi">' + esc(s.furigana) + "</div>" : "") +
          '<div class="n-zh">' + esc(s.zh) + "</div><div class=\"n-en\">" + esc(s.en) + "</div>" +
          '<button class="ghost small replay-btn" id="replay" style="margin-top:10px">🔊 再聽一次</button></div>' +
          '<div class="grade-btns"><button id="next">' + (i + 1 >= set.length ? "完成" : "下一句 →") + "</button></div></div>"
        );
        $app.querySelector("#quit").addEventListener("click", () => newsScreen(pack));
        $app.querySelector("#replay").addEventListener("click", () => TTS.speak(s.ja));
        $app.querySelector("#next").addEventListener("click", () => { i++; show(); });
      }, { once: true });
    }
    show();
  }

  function newsDictation(pack) {
    const set = pack.dictation; let i = 0;
    function show() {
      if (i >= set.length) { markInput(pack, "dictation"); return newsScreen(pack); }
      const d = set[i];
      render(
        '<div class="topbar"><div><h1>✍️ 聽寫</h1><div class="sub">第 ' + (i + 1) + " / " + set.length + " 句</div></div>" +
        '<button class="ghost small" id="quit">結束</button></div>' +
        '<div class="q-prompt"><div class="label">聽發音，打出聽到的句子（假名即可）</div>' +
        '<button class="shu" id="playq">🔊 播放</button>' + (d.hint ? '<div class="progress-note">提示：' + esc(d.hint) + "</div>" : "") + "</div>" +
        '<form class="typebox" id="typef"><input id="tin" type="text" autocomplete="off" placeholder="在此打字…"><button class="shu" type="submit">送出</button></form>' +
        '<div id="dresult"></div>'
      );
      $app.querySelector("#quit").addEventListener("click", () => newsScreen(pack));
      $app.querySelector("#playq").addEventListener("click", () => TTS.speak(d.ja));
      TTS.speak(d.ja);
      const inp = $app.querySelector("#tin"); inp.focus();
      $app.querySelector("#typef").addEventListener("submit", e => {
        e.preventDefault();
        const v = normJa(inp.value);
        const ok = !!v && (normJa(d.ja) === v || (d.accept || []).some(a => normJa(a) === v));
        $app.querySelector("#dresult").innerHTML =
          '<div class="summary"><div class="srow"><span>' + (ok ? "✅ 正確" : "❌ 再聽一次") + '</span></div>' +
          '<div class="srow"><span>正解</span><b>' + esc(d.ja) + "</b></div></div>" +
          '<div class="grade-btns"><button class="shu" id="replay2">🔊 再聽</button><button id="next">' + (i + 1 >= set.length ? "完成" : "下一句 →") + "</button></div>";
        inp.disabled = true;
        $app.querySelector("#replay2").addEventListener("click", () => TTS.speak(d.ja));
        $app.querySelector("#next").addEventListener("click", () => { i++; show(); });
      });
    }
    show();
  }

  function newsRead(pack) {
    let showZh = true, showEn = false;
    function draw() {
      const paras = pack.summary.map(s =>
        '<div class="rd-para"><div class="n-ja">' + esc(s.ja) + "</div>" +
        (P.news.furigana ? '<div class="n-furi">' + esc(s.furigana) + "</div>" : "") +
        (showZh ? '<div class="n-zh">' + esc(s.zh) + "</div>" : "") +
        (showEn ? '<div class="n-en">' + esc(s.en) + "</div>" : "") + "</div>").join("");
      const vocab = '<div class="sec-h">單字</div>' + pack.vocab.map((v, i) =>
        '<div class="vocab-row" data-vi="' + i + '"><span class="vw">' + esc(v.word) + '</span><span class="vr">' + esc(v.reading) + '</span><span class="vz">' + esc(v.zh) + " <i>" + esc(v.jlpt) + "</i></span></div>").join("");
      const grammar = '<div class="sec-h">文法重點</div>' + pack.grammar.map(g =>
        '<div class="gram-row"><b>' + esc(g.point) + "</b> " + esc(g.zh) + '<div class="progress-note">' + esc(g.example.ja) + "　" + esc(g.example.zh) + "</div></div>").join("");
      render(
        '<div class="topbar"><div><h1>📖 閱讀</h1><div class="sub">' + esc(pack.title.zh) + "</div></div>" +
        '<button class="ghost small" id="quit">結束</button></div>' +
        '<div class="seg toggles">' +
        '<button class="' + (showZh ? "on" : "") + '" id="tzh">中文</button>' +
        '<button class="' + (showEn ? "on" : "") + '" id="ten">英文</button>' +
        '<button class="' + (P.news.furigana ? "on" : "") + '" id="tfu">振假名</button></div>' +
        '<div class="read-body">' + paras + vocab + grammar + "</div>"
      );
      $app.querySelector("#quit").addEventListener("click", () => newsScreen(pack));
      $app.querySelector("#tzh").addEventListener("click", () => { showZh = !showZh; draw(); });
      $app.querySelector("#ten").addEventListener("click", () => { showEn = !showEn; draw(); });
      $app.querySelector("#tfu").addEventListener("click", () => { P.news.furigana = !P.news.furigana; save(); draw(); });
      $app.querySelectorAll(".vocab-row").forEach(r => r.addEventListener("click", () => {
        const v = pack.vocab[+r.dataset.vi];
        alert(v.word + "（" + v.reading + "）\n" + v.zh + " / " + v.en + "\n例：" + v.example.ja + "　" + v.example.zh);
      }));
    }
    draw();
  }

  function newsQuiz(pack) {
    const qs = pack.quiz; let i = 0, score = 0, locked = false;
    function show() {
      if (i >= qs.length) return finish();
      const q = qs[i]; locked = false;
      const promptHtml = q.type === "listening"
        ? '<div class="label">' + esc(q.prompt.zh) + '</div><button class="shu" id="playq">🔊 播放發音</button>'
        : '<div class="label">' + esc(q.prompt.zh) + "</div>" + (q.prompt.ja ? '<div class="k" style="font-size:1.4rem">' + esc(q.prompt.ja) + "</div>" : "");
      render(
        '<div class="exam-head"><div class="exam-score">得分 ' + score + " / " + qs.length + "</div>" +
        '<div class="progress-note">第 ' + (i + 1) + " / " + qs.length + " 題</div>" +
        '<button class="ghost small" id="quit">放棄</button></div>' +
        '<div class="q-prompt">' + promptHtml + "</div>" +
        '<div class="opts">' + q.options.map((o, oi) => '<button data-oi="' + oi + '">' + esc(o) + "</button>").join("") + "</div>" +
        '<div id="qexplain"></div>'
      );
      $app.querySelector("#quit").addEventListener("click", () => newsScreen(pack));
      const pq = $app.querySelector("#playq");
      if (pq) { pq.addEventListener("click", () => TTS.speak(q.audioText)); TTS.speak(q.audioText); }
      $app.querySelectorAll(".opts button").forEach(b => b.addEventListener("click", () => {
        if (locked) return; locked = true;
        const pick = +b.dataset.oi, right = pick === q.answer;
        if (right) { score++; b.classList.add("hit"); }
        else { b.classList.add("miss"); $app.querySelectorAll(".opts button").forEach((x, xi) => { if (xi === q.answer) x.classList.add("hit"); }); }
        $app.querySelector(".exam-score").textContent = "得分 " + score + " / " + qs.length;
        $app.querySelector("#qexplain").innerHTML =
          '<div class="summary"><div class="srow"><span>' + (right ? "✅ 答對" : "❌ 答錯") + "</span></div>" +
          '<div class="srow"><span>解說</span><b>' + esc(q.explain.zh) + "</b></div></div>" +
          '<div class="grade-btns"><button id="next">' + (i + 1 >= qs.length ? "看結果" : "下一題 →") + "</button></div>";
        $app.querySelector("#next").addEventListener("click", () => { i++; show(); });
      }));
    }
    function finish() {
      const pass = score >= 3;
      const prev = P.news.quizBest[pack.id];
      if (prev == null || score > prev) P.news.quizBest[pack.id] = score;
      if (pass) markInput(pack, "quizPassed"); else save();
      render(
        '<div class="result-box"><div class="big">' + score + " / 5</div>" +
        '<div class="msg">' + (pass ? "🎉 通過！（≥ 3 題）" + (speakUnlocked(pack) ? "<br>口說「脫稿」已解鎖。" : "") : "未達 3 題，再試一次！") + "</div>" +
        '<div class="btn-col"><button class="shu" id="again">再考一次</button><button class="ghost" id="back">回新聞</button></div></div>'
      );
      $app.querySelector("#again").addEventListener("click", () => newsQuiz(pack));
      $app.querySelector("#back").addEventListener("click", () => newsScreen(pack));
    }
    show();
  }

  function newsSpeak(pack) {
    const lines = pack.speaking;
    const STEPS = ["音韻浸潤", "語音標記", "視讀哼唱", "盲聽節奏", "語意融合", "錄音診斷", "脫稿演繹"];
    const HINT = ["整段聽 2–3 次，只感受語調與節奏（不看字）。", "看著文字與標記，注意連音／弱化／停頓。",
      "看著文字小聲哼跟。", "不看字，像影子一樣緊跟原聲的節奏。", "一邊跟讀一邊想著中文意思。",
      "錄下自己朗讀，跟原聲比對，自評語調與停頓。", "關掉原聲，只看中文提示，憑記憶說出來。"];
    let step = 1, rec = null, mediaURL = null, recordingRequest = 0;
    const playAll = () => { const t = lines.map(l => l.ja).join("。"); TTS.speak(t); };
    function draw() {
      const s = STEPS[step - 1], hint = HINT[step - 1];
      const showText = step === 2 || step === 3 || step === 5;
      const bodyLines = lines.map(l =>
        '<div class="sp-line"><div class="n-ja">' + esc(l.ja) + "</div>" +
        (P.news.furigana ? '<div class="n-furi">' + esc(l.furigana) + "</div>" : "") +
        (step === 2 && l.linking ? '<div class="n-link">🔎 ' + esc(l.linking) + "</div>" : "") +
        (step === 5 ? '<div class="n-zh">' + esc(l.zh) + "</div>" : "") + "</div>").join("");
      const zhHints = lines.map(l => '<div class="n-zh">・' + esc(l.zh) + "</div>").join("");
      let mid;
      if (step === 6) {
        mid = '<div class="rec-box"><button class="shu" id="playorig">🔊 播放原聲</button>' +
          '<button id="recbtn">● 開始錄音</button><audio id="myaudio" controls style="display:none;width:100%;margin-top:10px"></audio>' +
          '<div class="progress-note" id="recnote"></div></div>';
      } else if (step === 7 && !speakUnlocked(pack)) {
        mid = '<div class="banner">🔒 脫稿演繹尚未解鎖。先完成 <b>聽力＋聽寫＋小考(≥3)</b>，或程度達 N3 以上。目前先做前面的步驟即可。</div>';
      } else if (step === 7) {
        mid = '<div class="sp-body">' + zhHints + '<button class="ghost small replay-btn" id="peek" style="margin-top:10px">👁️ 看一眼日文</button></div>';
      } else {
        mid = '<div class="sp-body">' + (showText ? bodyLines : '<div class="progress-note">（此步不看字，專心聽/跟）</div>') +
          '<button class="shu replay-btn" id="playall" style="margin-top:12px">🔊 播放</button></div>';
      }
      render(
        '<div class="topbar"><div><h1>🗣️ 口說七步</h1><div class="sub">第 ' + step + " / 7 步 ・ " + esc(s) + "</div></div>" +
        '<button class="ghost small" id="quit">結束</button></div>' +
        '<div class="stepper">' + STEPS.map((_, k) => '<span class="' + (k + 1 === step ? "now" : (k + 1 < step ? "past" : "")) + '"></span>').join("") + "</div>" +
        '<div class="banner">' + esc(hint) + "</div>" + mid +
        '<div class="grade-btns">' + (step > 1 ? '<button class="ghost" id="prev">← 上一步</button>' : "") +
        '<button id="next">' + (step >= 7 ? "完成" : "下一步 →") + "</button></div>"
      );
      activeScope.cleanup(() => {
        stopRec();
        if (mediaURL) { URL.revokeObjectURL(mediaURL); mediaURL = null; }
      });
      $app.querySelector("#quit").addEventListener("click", () => { stopRec(); newsScreen(pack); });
      const pa = $app.querySelector("#playall"); if (pa) { pa.addEventListener("click", playAll); if (step === 1 || step === 4) playAll(); }
      const po = $app.querySelector("#playorig"); if (po) po.addEventListener("click", playAll);
      const pk = $app.querySelector("#peek"); if (pk) pk.addEventListener("click", () => alert(lines.map(l => l.ja).join("\n")));
      const rb = $app.querySelector("#recbtn"); if (rb) rb.addEventListener("click", toggleRec);
      const pv = $app.querySelector("#prev"); if (pv) pv.addEventListener("click", () => { stopRec(); step--; draw(); });
      $app.querySelector("#next").addEventListener("click", () => { stopRec(); if (step >= 7) return newsScreen(pack); step++; draw(); });
    }
    function stopRec() {
      recordingRequest++;
      try { if (rec && rec.state !== "inactive") rec.stop(); } catch (_) {}
      if (rec) rec.stream.getTracks().forEach(t => t.stop());
      rec = null;
    }
    function toggleRec() {
      const note = $app.querySelector("#recnote"), btn = $app.querySelector("#recbtn");
      if (rec && rec.state === "recording") { rec.stop(); return; }
      if (!navigator.mediaDevices || !window.MediaRecorder) { note.textContent = "此裝置無法錄音；可改為自己聽原聲、跟著唸並自評。"; return; }
      const scope = activeScope, request = ++recordingRequest;
      btn.disabled = true; note.textContent = "正在取得麥克風…";
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        if (scope.disposed || request !== recordingRequest) { stream.getTracks().forEach(t => t.stop()); return; }
        let recorder;
        try { recorder = new MediaRecorder(stream); }
        catch (error) { stream.getTracks().forEach(t => t.stop()); throw error; }
        const chunks = []; rec = recorder;
        recorder.ondataavailable = e => chunks.push(e.data);
        recorder.onstop = () => {
          try { stream.getTracks().forEach(t => t.stop()); } catch (e) {}
          if (scope.disposed || request !== recordingRequest) return;
          const url = URL.createObjectURL(new Blob(chunks, { type: recorder.mimeType || chunks[0]?.type || "audio/webm" }));
          if (mediaURL) URL.revokeObjectURL(mediaURL); mediaURL = url;
          const au = $app.querySelector("#myaudio"); if (au) { au.src = url; au.style.display = "block"; }
          if (btn) btn.textContent = "● 重新錄音"; if (note) note.textContent = "錄好了！播放上方自錄，與原聲比對。";
        };
        recorder.start(); btn.disabled = false; btn.textContent = "■ 停止錄音"; note.textContent = "錄音中…唸完再按停止。";
      }).catch(() => { if (!scope.disposed) { btn.disabled = false; note.textContent = "無法開始錄音；可改為聽原聲、跟著唸並自評。"; } });
    }
    draw();
  }

  /* =====================  啟動  ===================== */
  (async function boot() {
    try {
      const saved = await store.get();
      if (saved) Object.assign(P, window.KanaStorage.validate(saved, Object.assign({}, DEFAULTS, { maxLevel: LEVELS.length }), ALL_KANA, NEWS));
    } catch (e) { storageBlocked = true; storageError("進度檔格式異常，原檔已保留。請到設定匯入有效備份。"); }
    initKeys();
    TTS.configure(P.tts);   // 套用已存語音設定
    if (params.get("unlock") === "all") { P.unlocked = LEVELS.length; }   // 測試後門
    P.unlocked = Math.min(Math.max(1, P.unlocked), LEVELS.length);
    homeScreen();
  })();

  /* ---------- PWA：file:// 開啟時自動略過，不影響運作 ---------- */
  function updateBanner(worker) {
    if (document.querySelector(".updatebar")) return;   // 已經提示過就不重複
    const bar = document.createElement("div");
    bar.className = "updatebar";
    bar.innerHTML = '<span>🆕 有新版本</span><button class="go">立即更新</button><button class="later">稍後</button>';
    bar.querySelector(".go").addEventListener("click", () => {
      bar.querySelector(".go").textContent = "更新中…";
      worker.postMessage({ type: "SKIP_WAITING" });   // 接管後 controllerchange 會觸發重新載入
    });
    bar.querySelector(".later").addEventListener("click", () => bar.remove());
    document.body.appendChild(bar);
  }
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    const hadController = !!navigator.serviceWorker.controller;   // 首次安裝不該提示、也不該自動重整
    let reloading = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!hadController || reloading) return;
      reloading = true; location.reload();
    });
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then(reg => {
        if (reg.waiting && hadController) updateBanner(reg.waiting);   // 上次沒按「立即更新」
        reg.addEventListener("updatefound", () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener("statechange", () => {
            if (sw.state === "installed" && navigator.serviceWorker.controller) updateBanner(sw);
          });
        });
        // 長時間開著同一頁的情況：切回前景時再問一次有沒有新版
        document.addEventListener("visibilitychange", () => {
          if (!document.hidden) reg.update().catch(() => {});
        });
      }).catch(() => {});
    });
  }
})();
