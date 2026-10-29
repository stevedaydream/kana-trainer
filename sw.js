/* Versioned shell, network-first data, no forced reload during practice. */
"use strict";
importScripts("data/illustrations.js");
const PREFIX = "kana-trainer-";
const VERSION = PREFIX + "v12";
const SHELL = [".", "index.html", "css/app.css", "js/session.js", "js/storage.js", "js/scheduler.js", "js/audio.js", "js/exam.js", "js/news.js", "js/news-loader.js", "js/app.js", "data/levels.js", "data/wordbank.js", "data/news/index.js", "data/illustrations.js", "manifest.webmanifest", "icon.svg", "img/icon-192.png", "img/icon-512.png", ...Object.values(self.KANA_ILLUSTRATIONS).filter(p => p.endsWith('.svg'))];
const NEWS_CACHE = PREFIX + "news-v1";
const SHELL_URL = new URL("index.html", self.location).href;
const scope = new URL(".", self.location).href;
const shellKeys = new Set(SHELL.map(p => new URL(p, self.location).href));
self.addEventListener("install", event => event.waitUntil((async () => {
  const cache = await caches.open(VERSION);
  await cache.addAll(SHELL);
  const response = await cache.match(new URL("data/news/index.js", self.location).href);
  const text = await response.text();
  const marker = "window.KANA_NEWS_INDEX = ";
  if (!text.includes(marker)) throw Error("Invalid news index");
  const index = JSON.parse(text.slice(text.indexOf(marker) + marker.length).trim().replace(/;$/, ""));
  if (index.schemaVersion !== 1 || !Array.isArray(index.packs)) throw Error("Invalid news catalogue");
  const articles = index.packs.slice(0, 3).map(entry => {
    if (!/^[A-Za-z0-9-]+$/.test(entry.id) || !/^[a-f0-9]{64}$/.test(entry.sha256) || entry.file !== `packs/${entry.id}-${entry.sha256.slice(0, 16)}.js`) throw Error("Invalid news path");
    return new Request(new URL("data/news/" + entry.file, self.location).href, { integrity: "sha256-" + btoa(String.fromCharCode(...entry.sha256.match(/../g).map(h => parseInt(h, 16)))) });
  });
  const contentCache = await caches.open(NEWS_CACHE);
  await contentCache.addAll(articles);
  await trimArticles(contentCache);
})()));
self.addEventListener("activate", event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith(PREFIX) && k !== VERSION && k !== NEWS_CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("message", event => { if (event.data?.type === "SKIP_WAITING") self.skipWaiting(); });
function keep(event, key, response, content = false) {
  const copy = response.clone();
  event.waitUntil((async () => {
    const cache = await caches.open(content ? NEWS_CACHE : VERSION);
    await cache.put(key, copy);
    if (content) await trimArticles(cache);
  })().catch(() => {}));
}
async function trimArticles(cache) {
  const keys = await cache.keys();
  await Promise.all(keys.slice(0, Math.max(0, keys.length - 60)).map(request => cache.delete(request)));
}
async function cached(key, content = false) { return (await caches.open(content ? NEWS_CACHE : VERSION)).match(key, { ignoreSearch: true }); }
async function network(request) {
  const controller = new AbortController(), timer = setTimeout(() => controller.abort(), 5000);
  try { const response = await fetch(request, { signal: controller.signal }); if (!response.ok) throw Error("HTTP " + response.status); return response; }
  finally { clearTimeout(timer); }
}
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (!url.href.startsWith(scope) || url.origin !== self.location.origin) return;
  const key = url.origin + url.pathname, navigation = request.mode === "navigate", data = /\/data\/(?:news\/index|[^/]+)\.js$/.test(url.pathname);
  const article = /\/data\/news\/packs\/[A-Za-z0-9-]+-[a-f0-9]{16}\.js$/.test(url.pathname);
  if (navigation) {
    event.respondWith((async () => {
      const hit = await cached(SHELL_URL);
      if (hit) return hit;
      try { const response = await network(request); keep(event, SHELL_URL, response); return response; }
      catch (_) { return new Response("離線資源尚未準備完成，請連線後重新整理。", { status: 503 }); }
    })()); return;
  }
  if (article) {
    event.respondWith((async () => {
      const hit = await cached(key, true); if (hit) return hit;
      try {
        const response = await network(request);
        if (!/(javascript|ecmascript)/i.test(response.headers.get("content-type") || "")) throw Error("Invalid article type");
        keep(event, key, response, true); return response;
      } catch (_) { return new Response("/* Article not downloaded. Reconnect and retry. */", { status: 503, headers: { "Content-Type": "application/javascript; charset=utf-8" } }); }
    })()); return;
  }
  if (navigation || data) {
    event.respondWith((async () => {
      try {
        const response = await network(request), type = response.headers.get("content-type") || "";
        if (data && !/(javascript|ecmascript)/i.test(type)) throw Error("Invalid data content type");
        keep(event, navigation ? SHELL_URL : key, response); return response;
      } catch (_) {
        const hit = await cached(navigation ? SHELL_URL : key);
        return hit || new Response(navigation ? "離線資源尚未準備完成，請連線後重新整理。" : "/* Offline data unavailable */", { status: 503, headers: { "Content-Type": navigation ? "text/plain; charset=utf-8" : "application/javascript; charset=utf-8" } });
      }
    })()); return;
  }
  // CSS and JS stay coherent with the installed shell; update all via a new worker.
  if (shellKeys.has(key) || /\/img\//.test(url.pathname)) event.respondWith((async () => {
    const hit = await cached(key); if (hit) return hit;
    const response = await fetch(request); if (response.ok) keep(event, key, response); return response;
  })());
});
