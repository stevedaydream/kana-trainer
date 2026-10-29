export const DEFAULT_FEED = 'https://news.web.nhk/n-data/conf/na/rss/cat3.xml';
const DAY = 86400000;
export function decodeXML(value) {
  return value.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').replace(/<[^>]+>/g, ' ').replace(/&(?:amp|lt|gt|quot|apos|#\d+|#x[\da-f]+);/gi, entity => {
    const named = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&apos;': "'" };
    if (named[entity]) return named[entity];
    const n = entity[2].toLowerCase() === 'x' ? parseInt(entity.slice(3), 16) : parseInt(entity.slice(2), 10);
    return Number.isInteger(n) && n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : '';
  }).replace(/\s+/g, ' ').trim();
}
export function parseRSS(xml) {
  if (xml.length > 2_000_000 || /<!DOCTYPE|<!ENTITY/i.test(xml)) throw Error('不支援此 RSS 格式或內容過大');
  const tag = (text, name) => decodeXML(text.match(new RegExp('<' + name + '(?:\\s[^>]*)?>([\\s\\S]*?)</' + name + '>', 'i'))?.[1] || '');
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].slice(0, 100).map(match => ({
    title: tag(match[1], 'title'), url: tag(match[1], 'link'), facts: tag(match[1], 'description'), publishedAt: tag(match[1], 'pubDate')
  }));
}
export function chooseSource(items, { now = Date.now(), maxAgeDays = 7, topic = '', usedURLs = [] } = {}) {
  const used = new Set(usedURLs);
  let eligible = items.filter(item => {
    let url; try { url = new URL(item.url); } catch (_) { return false; }
    const stamp = Date.parse(item.publishedAt), age = now - stamp;
    return url.protocol === 'https:' && item.title && item.facts.length >= 30 && Number.isFinite(stamp) && age >= -DAY && age <= maxAgeDays * DAY && !used.has(item.url);
  });
  if (topic) eligible = eligible.filter(item => (item.title + item.facts).toLowerCase().includes(topic.toLowerCase()));
  eligible.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
  if (!eligible.length) throw Error('沒有符合時效、主題與未使用條件的新聞來源；保留現有新聞包');
  return eligible[0];
}
export async function fetchSource({ feedURL = DEFAULT_FEED, fetchImpl = fetch, ...options } = {}) {
  const url = new URL(feedURL);
  if (url.protocol !== 'https:') throw Error('新聞 RSS 來源必須使用 HTTPS');
  const response = await fetchImpl(url, { signal: AbortSignal.timeout(20000), redirect: 'error' });
  if (!response.ok) throw Error('新聞來源 HTTP ' + response.status);
  const reader = response.body.getReader(); let bytes = 0, chunks = [];
  try { for (;;) { const { done, value } = await reader.read(); if (done) break; bytes += value.length; if (bytes > 2_000_000) throw Error('RSS 內容過大'); chunks.push(value); } }
  finally { await reader.cancel(); }
  const xml = Buffer.concat(chunks).toString('utf8');
  const item = chooseSource(parseRSS(xml), options);
  return { ...item, publisher: decodeXML(xml.match(/<channel>[\s\S]*?<title>([\s\S]*?)<\/title>/i)?.[1] || url.hostname), fetchedAt: new Date(options.now || Date.now()).toISOString(), feedURL: url.href };
}
