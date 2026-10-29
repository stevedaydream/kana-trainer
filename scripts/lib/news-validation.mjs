export function validateNews(data, { strict = false } = {}) {
  const errors = [];
  const object = value => value && typeof value === 'object' && !Array.isArray(value);
  const text = value => typeof value === 'string' && value.trim().length > 0;
  const check = (ok, message) => { if (!ok) errors.push(message); };
  const requireText = (value, where) => check(text(value), where + ' 需為非空字串');
  const tri = (value, where) => ['ja', 'zh', 'en'].forEach(k => requireText(value?.[k], where + '.' + k));
  const kana = value => text(value) && /^[\p{Script=Hiragana}\p{Script=Katakana}ー\s、。！？・「」『』（）()〜～…,.!?：:「」\d]+$/u.test(value);
  if (!object(data) || !Array.isArray(data.packs) || !data.packs.length) return ['packs 需為非空陣列'];
  const ids = new Set();
  data.packs.forEach((p, i) => {
    const w = 'pack[' + i + ']';
    if (!object(p)) { errors.push(w + ' 需為物件'); return; }
    requireText(p.id, w + '.id'); check(!ids.has(p.id), w + '.id 重複'); ids.add(p.id);
    const stamp = Date.parse(p.date);
    check(typeof p.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(p.date) && Number.isFinite(stamp) && new Date(stamp).toISOString().slice(0, 10) === p.date, w + '.date 不合法');
    check(['N5', 'N4', 'N3', 'N2', 'N1'].includes(p.level), w + '.level 不合法'); tri(p.title, w + '.title');
    requireText(p.source?.note, w + '.source.note');
    if (strict) {
      for (const key of ['title', 'publisher', 'url', 'publishedAt', 'fetchedAt']) requireText(p.source?.[key], w + '.source.' + key);
      let sourceURL; try { sourceURL = new URL(p.source?.url); } catch (_) {}
      check(sourceURL?.protocol === 'https:', w + '.source.url 需 HTTPS');
      check(Number.isFinite(Date.parse(p.source?.publishedAt)) && Number.isFinite(Date.parse(p.source?.fetchedAt)), w + '.source 日期不合法');
      check(kana(p.title?.furigana), w + '.title.furigana 需為假名讀音');
    }
    for (const key of ['summary', 'vocab', 'dictation', 'speaking']) check(Array.isArray(p[key]) && p[key].length > 0, w + '.' + key + ' 需為非空陣列');
    if (Array.isArray(p.summary)) p.summary.forEach((s, j) => { tri(s, w + '.summary[' + j + ']'); if (strict) check(kana(s?.furigana), w + '.summary 讀音不合法'); });
    if (Array.isArray(p.vocab)) p.vocab.forEach((v, j) => { for (const k of ['word', 'reading', 'zh', 'en', 'pos', 'jlpt']) requireText(v?.[k], w + '.vocab[' + j + '].' + k); check(kana(v?.reading), w + '.vocab.reading 不合法'); if (strict) { requireText(v?.example?.ja, w + '.vocab.example.ja'); requireText(v?.example?.zh, w + '.vocab.example.zh'); } });
    if (strict) check(Array.isArray(p.grammar) && p.grammar.length > 0, w + '.grammar 不可空');
    if (Array.isArray(p.grammar)) p.grammar.forEach(g => { requireText(g?.point, w + '.grammar.point'); requireText(g?.zh, w + '.grammar.zh'); if (strict) { requireText(g?.en, w + '.grammar.en'); requireText(g?.example?.ja, w + '.grammar.example.ja'); requireText(g?.example?.zh, w + '.grammar.example.zh'); } });
    check(Array.isArray(p.quiz) && p.quiz.length === 5, w + '.quiz 需恰 5 題');
    if (Array.isArray(p.quiz)) p.quiz.forEach(q => {
      check(['listening', 'reading', 'vocab', 'grammar', 'cloze'].includes(q?.type), w + '.quiz.type 不合法');
      check(Array.isArray(q?.options) && q.options.length >= 2 && q.options.every(text) && new Set(q.options).size === q.options.length, w + '.quiz.options 不合法');
      check(Number.isInteger(q?.answer) && q.answer >= 0 && q.answer < (q.options?.length || 0), w + '.quiz.answer 不合法');
      requireText(q?.explain?.zh, w + '.quiz.explain.zh');
      if (q?.type === 'listening') requireText(q.audioText, w + '.quiz.audioText');
      if (strict) requireText(q?.prompt?.zh, w + '.quiz.prompt.zh');
    });
    if (Array.isArray(p.dictation)) p.dictation.forEach(d => { requireText(d?.ja, w + '.dictation.ja'); check(Array.isArray(d?.accept) && d.accept.length > 0 && d.accept.every(text), w + '.dictation.accept 不合法'); if (strict) check(kana(d?.furigana), w + '.dictation.furigana 不合法'); });
    if (Array.isArray(p.speaking)) p.speaking.forEach(s => { requireText(s?.ja, w + '.speaking.ja'); requireText(s?.furigana, w + '.speaking.furigana'); if (strict) { check(kana(s?.furigana), w + '.speaking.furigana 不合法'); requireText(s?.zh, w + '.speaking.zh'); } });
  });
  return errors;
}
