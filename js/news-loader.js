/* Classic script loading preserves double-click file:// use. */
"use strict";
window.KanaNewsLoader = {
  create(entries, { document: doc = document, timeout = 12000 } = {}) {
    const catalogue = new Map(entries.map(entry => [entry.id, entry]));
    const memory = new Map(), pending = new Map();
    const base = new URL('data/news/', doc.baseURI);
    function load(id) {
      const entry = catalogue.get(id);
      if (!entry || !/^[A-Za-z0-9-]+$/.test(entry.id) || !/^[a-f0-9]{64}$/.test(entry.sha256 || '') || entry.file !== 'packs/' + entry.id + '-' + entry.sha256.slice(0, 16) + '.js') return Promise.reject(Error('新聞索引格式錯誤'));
      if (memory.has(entry.file)) return Promise.resolve(memory.get(entry.file));
      if (pending.has(entry.file)) return pending.get(entry.file);
      const promise = new Promise((resolve, reject) => {
        const script = doc.createElement('script');
        let settled = false;
        const finish = (error, pack) => {
          if (settled) return; settled = true;
          clearTimeout(timer); script.remove();
          if (error) reject(error);
          else { memory.set(entry.file, pack); resolve(pack); }
        };
        const timer = setTimeout(() => finish(Error('新聞載入逾時')), timeout);
        script.async = true;
        script.src = new URL(entry.file, base).href;
        // Browser checks the immutable file against the index on HTTP(S).
        // file:// has no CORS origin, so integrity is verified by the offline publisher instead.
        if (base.protocol !== 'file:') script.integrity = 'sha256-' + btoa(String.fromCharCode(...entry.sha256.match(/../g).map(h => parseInt(h, 16))));
        script.onload = () => {
          const pack = window.KANA_NEWS_PACKS?.[entry.id];
          if (!pack || pack.id !== entry.id || pack.date !== entry.date || pack.level !== entry.level || pack.title?.ja !== entry.title.ja || pack.title?.zh !== entry.title.zh || !['summary', 'vocab', 'quiz', 'dictation', 'speaking'].every(key => Array.isArray(pack[key]) && pack[key].length)) return finish(Error('新聞內容與索引不符'));
          finish(null, pack);
        };
        script.onerror = () => finish(Error('無法下載這篇新聞'));
        doc.head.appendChild(script);
      });
      pending.set(entry.file, promise);
      promise.then(() => pending.delete(entry.file), () => pending.delete(entry.file));
      return promise;
    }
    return { load };
  }
};
