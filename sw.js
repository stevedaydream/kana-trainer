/* =========================================================
 * sw.js — PWA Service Worker
 * App shell 採 cache-first（安裝時預快取，離線可完整運作）；
 * img/*.png 配圖採 runtime cache（缺檔不影響，主程式會退回 SVG/emoji）。
 * 更新題庫或程式後，調高 VERSION 即可讓所有用戶端換新快取。
 * ========================================================= */
const VERSION = "kana-trainer-v5";
const SHELL = [
  ".",
  "index.html",
  "data/levels.js",
  "manifest.webmanifest",
  "icon.svg",
  "img/icon-192.png",
  "img/icon-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        // 只快取同源的成功回應（配圖等執行期資源）
        if (res.ok && new URL(req.url).origin === self.location.origin) {
          const copy = res.clone();
          caches.open(VERSION).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match("index.html", { ignoreSearch: true }));
    })
  );
});
