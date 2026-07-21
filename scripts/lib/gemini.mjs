/* =========================================================
 * scripts/lib/gemini.mjs — 最小 Gemini API 呼叫（給離線內容管線用）
 * 金鑰讀環境變數 GEMINI_API_KEY（請放 GitHub Secrets，切勿寫進 repo）。
 * 模型可用 GEMINI_MODEL 覆寫，預設 gemini-2.0-flash。
 * 回傳：解析後的 JSON 物件（要求 responseMimeType=application/json）。
 * ========================================================= */
const MODEL = process.env.GEMINI_MODEL || "gemini-2.0-flash";
const ENDPOINT = m => `https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`;

export function hasKey() { return !!process.env.GEMINI_API_KEY; }

export async function geminiJSON(prompt, { temperature = 0.7, maxOutputTokens = 8192 } = {}) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("缺少 GEMINI_API_KEY 環境變數（請於 GitHub Secrets 設定）");
  const res = await fetch(ENDPOINT(MODEL) + "?key=" + encodeURIComponent(key), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { temperature, maxOutputTokens, responseMimeType: "application/json" }
    })
  });
  if (!res.ok) throw new Error(`Gemini API ${res.status}: ${(await res.text()).slice(0, 500)}`);
  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("") || "";
  if (!text) throw new Error("Gemini 回應為空：" + JSON.stringify(data).slice(0, 500));
  try { return JSON.parse(text); }
  catch (e) {
    const m = text.match(/\{[\s\S]*\}/); // 容錯：抓出第一個 JSON 區塊
    if (m) return JSON.parse(m[0]);
    throw new Error("Gemini 回應非合法 JSON：" + text.slice(0, 500));
  }
}
