/* =========================================================
 * scripts/lib/gemini.mjs — 最小 Gemini API 呼叫（給離線內容管線用）
 * 金鑰讀環境變數 GEMINI_API_KEY（請放 GitHub Secrets，切勿寫進 repo）。
 * 模型可用 GEMINI_MODEL 覆寫，預設 gemini-2.5-flash。
 * 回傳：解析後的 JSON 物件（要求 responseMimeType=application/json）。
 * ========================================================= */
const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";
const ENDPOINT = m => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

export function hasKey() { return !!process.env.GEMINI_API_KEY; }

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function callOnce(prompt, { temperature, maxOutputTokens }) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("缺少 GEMINI_API_KEY 環境變數（請於 GitHub Secrets 設定）");
  const res = await fetch(ENDPOINT(MODEL) + "?key=" + encodeURIComponent(key), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature, maxOutputTokens, responseMimeType: "application/json",
        // 2.5 系列預設會用「思考」吃掉輸出額度 → 關閉，把 token 全留給 JSON，避免截斷
        thinkingConfig: { thinkingBudget: 0 }
      }
    })
  });
  if (!res.ok) { const t = await res.text(); const e = new Error(`Gemini API ${res.status}: ${t.slice(0, 300)}`); e.status = res.status; throw e; }
  const data = await res.json();
  const cand = data?.candidates?.[0];
  const text = cand?.content?.parts?.map(p => p.text).join("") || "";
  if (!text) throw new Error("Gemini 回應為空（finishReason=" + (cand?.finishReason || "?") + "）：" + JSON.stringify(data).slice(0, 300));
  if (cand?.finishReason && cand.finishReason !== "STOP") {
    // MAX_TOKENS 等：內容可能被截斷；標記讓上層重試（提高 token）
    const e = new Error("回應未正常結束（finishReason=" + cand.finishReason + "）");
    e.truncated = true; throw e;
  }
  try { return JSON.parse(text); }
  catch (_) { const m = text.match(/\{[\s\S]*\}/); if (m) { try { return JSON.parse(m[0]); } catch (__) {} } const e = new Error("回應非合法 JSON：" + text.slice(-200)); e.truncated = true; throw e; }
}

// 重試：解析失敗/截斷時提高 maxOutputTokens 再試；429/5xx 退避重試。
export async function geminiJSON(prompt, { temperature = 0.7, maxOutputTokens = 16384, retries = 3 } = {}) {
  let tokens = maxOutputTokens, lastErr;
  for (let i = 0; i < retries; i++) {
    try { return await callOnce(prompt, { temperature, maxOutputTokens: tokens }); }
    catch (e) {
      lastErr = e;
      if (e.truncated) tokens = Math.min(tokens * 2, 65536);        // 截斷 → 加大額度
      else if (e.status && e.status !== 429 && e.status < 500) throw e; // 4xx（非限流）直接失敗
      await sleep(1500 * (i + 1));
    }
  }
  throw lastErr;
}
