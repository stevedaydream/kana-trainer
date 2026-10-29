"use strict";
window.KanaStorage = (() => {
  const VERSION = 2;
  const record = o => !!o && typeof o === "object" && !Array.isArray(o);
  const clone = o => JSON.parse(JSON.stringify(o));
  function validate(saved, defaults, kana, packs) {
    if (!record(saved) || !(saved.srs || saved.weights || typeof saved.unlocked === "number")) throw Error("不是有效的進度檔。");
    if (saved.schemaVersion != null && (!Number.isInteger(saved.schemaVersion) || saved.schemaVersion < 1 || saved.schemaVersion > VERSION)) throw Error("此進度檔版本不支援。");
    const out = clone(defaults), validKana = new Set(kana.map(x => x.k));
    const fail = field => { throw Error("進度欄位格式錯誤：" + field); };
    function number(v, lo, hi, path, integer = false) {
      if (typeof v !== "number" || !Number.isFinite(v) || v < lo || v > hi || (integer && !Number.isInteger(v))) fail(path);
      return v;
    }
    function merge(target, input, path) {
      if (!record(input)) fail(path);
      for (const [key, value] of Object.entries(input)) {
        if (["__proto__", "constructor", "prototype"].includes(key)) fail(path);
        if (!(key in target)) continue;
        if (record(target[key])) merge(target[key], value, path + "." + key);
        else if (typeof value !== typeof target[key]) fail(path + "." + key);
        else if (typeof value === "number") target[key] = number(value, 0, Number.MAX_SAFE_INTEGER, path + "." + key);
        else target[key] = value;
      }
    }
    for (const field of ["weights", "streak", "best", "srs", "star", "wb"]) {
      if (saved[field] == null) { if (field in saved) fail(field); continue; }
      if (!record(saved[field])) fail(field);
      out[field] = {};
      for (const [k, value] of Object.entries(saved[field])) {
        if (["__proto__", "constructor", "prototype"].includes(k)) fail(field);
        if (field !== "best" && !validKana.has(k)) continue;
        const p = field + "." + k;
        if (field === "weights") out[field][k] = number(value, 1, 16, p);
        if (field === "streak" || field === "best") out[field][k] = number(value, 0, 1e9, p, true);
        if (field === "star") { if (typeof value !== "boolean") fail(p); out[field][k] = value; }
        if (field === "srs") {
          if (!record(value)) fail(p);
          const s = {};
          for (const key of ["D", "S", "last", "reps", "lapses"]) {
            s[key] = number(value[key], key === "D" ? 1 : 0, key === "D" ? 10 : Number.MAX_SAFE_INTEGER, p + "." + key, ["reps", "lapses"].includes(key));
          }
          if (value.due != null) s.due = number(value.due, 0, Number.MAX_SAFE_INTEGER, p + ".due");
          out[field][k] = s;
        }
        if (field === "wb") {
          if (!record(value) || !Array.isArray(value.add) || !Array.isArray(value.hide)) fail(p);
          if (value.add.some(c => !record(c) || typeof c.w !== "string" || !c.w || typeof c.zh !== "string" || !c.zh) || value.hide.some(w => typeof w !== "string")) fail(p);
          out[field][k] = clone(value);
        }
      }
    }
    for (const field of ["daily", "tts", "plan"]) if (field in saved) merge(out[field], saved[field], field);
    if (!(out.plan.intensity in { high: 1, normal: 1, casual: 1 })) fail("plan.intensity");
    number(out.daily.goal, 1, 10000, "daily.goal", true);
    number(out.tts.rate, 0.1, 10, "tts.rate"); number(out.tts.pitch, 0, 2, "tts.pitch");
    if ("unlocked" in saved) out.unlocked = number(saved.unlocked, 1, defaults.maxLevel || 14, "unlocked", true);
    if ("warmup" in saved) { if (typeof saved.warmup !== "boolean") fail("warmup"); out.warmup = saved.warmup; }
    if ("news" in saved) {
      if (!record(saved.news)) fail("news");
      for (const key of ["level", "furigana"]) if (key in saved.news) {
        if (typeof saved.news[key] !== typeof out.news[key]) fail("news." + key);
        out.news[key] = saved.news[key];
      }
      if (!["N5", "N4", "N3", "N2", "N1"].includes(out.news.level)) fail("news.level");
      out.news.userLevel = saved.news.userLevel || "N5";
      if (!["N5", "N4", "N3", "N2", "N1"].includes(out.news.userLevel)) fail("news.userLevel");
      for (const key of ["inputDone", "quizBest", "doneDays"]) {
        const values = saved.news[key] || {};
        if (!record(values)) fail("news." + key);
        out.news[key] = {};
        for (const [id, value] of Object.entries(values)) {
          if (["__proto__", "constructor", "prototype"].includes(id)) fail("news." + key);
          if (key === "quizBest") number(value, 0, 5, "news.quizBest", true);
          else if (key === "inputDone") {
            if (!record(value) || Object.values(value).some(v => typeof v !== "boolean")) fail("news.inputDone");
          } else if (typeof value !== "boolean") fail("news.doneDays");
          // Legacy dates are ambiguous when multiple packs exist; migrate only unique matches.
          const matches = (packs || []).filter(p => p.date === id);
          const nextId = /^\d{4}-\d{2}-\d{2}$/.test(id) ? (matches.length === 1 ? matches[0].id : null) : id;
          if (nextId) out.news[key][nextId] = clone(value);
        }
      }
    }
    delete out.maxLevel; out.schemaVersion = VERSION;
    return out;
  }
  function create(win, key, onError) {
    let memory = null, backend = null, kind = "memory", queue = Promise.resolve();
    try {
      if (win.storage && typeof win.storage.getItem === "function" && typeof win.storage.setItem === "function") { backend = win.storage; kind = "claude"; }
      else { const t = key + "_probe"; win.localStorage.setItem(t, "1"); win.localStorage.removeItem(t); backend = win.localStorage; kind = "local"; }
    } catch (_) { onError("此環境無法永久儲存，請在離開前匯出進度。"); }
    return {
      kind,
      async get() {
        if (!backend) return memory;
        try { const v = await backend.getItem(key); return v ? JSON.parse(typeof v === "string" ? v : v.value) : null; }
        catch (error) { onError("進度讀取失敗，原始存檔已保留。請到設定還原備份。"); throw error; }
      },
      set(obj) {
        const serialized = JSON.stringify(obj);
        queue = queue.then(async () => {
          if (!backend) { memory = JSON.parse(serialized); return false; }
          try { await backend.setItem(key, serialized); return true; }
          catch (_) { onError("進度儲存失敗，請到設定匯出備份，避免遺失學習記錄。"); return false; }
        });
        return queue;
      },
      async backup(obj) {
        if (!backend) throw Error("無法建立匯入前備份，請先匯出目前進度。");
        await queue;
        await backend.setItem(key + "_before_import", JSON.stringify(obj));
      },
      async recovery() {
        if (!backend) return null;
        const v = await backend.getItem(key + "_before_import");
        return v ? JSON.parse(typeof v === "string" ? v : v.value) : null;
      }
    };
  }
  return { VERSION, validate, create };
})();
