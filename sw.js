/* =========================================================
 * sw.js — PWA Service Worker
 *
 * 快取策略分兩類：
 *   1. 會變動的內容（導覽請求、index.html、data/*.js）＝ network-first。
 *      連線時一律拿最新（每日新聞包、題庫、辭庫都會即時更新），離線才退回快取。
 *      這樣「忘了調 VERSION」不再會把使用者鎖在舊版。
 *   2. 不常變動的資源（圖示、img/*.png、manifest）＝ cache-first ＋ 執行期回寫。
 *      配圖缺檔不影響，主程式會退回內建 SVG / emoji。
 *
 * 更新流程：新版 SW 安裝完成後「不」自動接管（不呼叫 skipWaiting），
 * 改由主程式跳出「有新版本」橫幅，使用者按下才接管並重新載入——
 * 避免有人正在做 60 秒考試時被硬生生重整掉。
 *
 * VERSION 仍建議在改動 app shell 後調高：它會重建預快取、清掉舊快取。
 * ========================================================= */
const VERSION = "kana-trainer-v10";
const SHELL = [
  ".",
  "index.html",
  "data/levels.js",
  "data/wordbank.js",
  "data/news.js",
  "manifest.webmanifest",
  "icon.svg",
  "img/icon-192.png",
  "img/icon-512.png"
];
const SHELL_URL = new URL("index.html", self.location).href;

// 內容會變動的資源：主程式本身與 data/ 下的資料檔
function isFresh(url) {
  return url.pathname.endsWith("/index.html") || /\/data\/[^/]+\.js$/.test(url.pathname);
}

self.addEventListener("install", (e) => {
  // 不 skipWaiting：等使用者在主程式按下「立即更新」才接管
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(SHELL)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("message", (e) => {
  if (e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

function keep(key, res) {
  const copy = res.clone();
  caches.open(VERSION).then((c) => c.put(key, copy)).catch(() => {});
}

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  let url;
  try { url = new URL(req.url); } catch (err) { return; }
  if (url.origin !== self.location.origin) return;   // 外部資源不介入

  const navigating = req.mode === "navigate";
  if (navigating || isFresh(url)) {
    // network-first：拿得到就用最新的，順手更新快取；離線才退回
    e.respondWith(
      fetch(req)
        .then((res) => {
          // 導覽請求統一存在 index.html 這個鍵，才不會被 ?notts=1 之類的參數灌爆
          if (res.ok) keep(navigating ? SHELL_URL : req, res);
          return res;
        })
        .catch(() => caches.match(req, { ignoreSearch: true })
          .then((hit) => hit || caches.match(SHELL_URL)))
    );
    return;
  }

  // cache-first：圖示、配圖等
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => hit || fetch(req).then((res) => {
      if (res.ok) keep(req, res);
      return res;
    }))
  );
});
