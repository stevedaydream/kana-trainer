export function validateWordbank(data, wordbank) {
  const errors = [], warnings = [], kanas = new Set(data.levels.flatMap(l => [...l.hira, ...l.kata]).map(x => x.k));
  const free = new Set(['を', 'ん', 'ヲ', 'ン', 'ぢ', 'づ', 'ヂ', 'ヅ']);
  const rare = new Set(['みゅ', 'ぴゃ', 'ピャ']);
  if (!wordbank || typeof wordbank !== 'object' || Array.isArray(wordbank)) return { errors: ['辭庫需為物件'], warnings };
  for (const k of kanas) if (!Array.isArray(wordbank[k]) || wordbank[k].length === 0) errors.push('缺少假名：' + k);
  for (const [k, list] of Object.entries(wordbank)) {
    if (!kanas.has(k)) { errors.push('未知假名：' + k); continue; }
    if (!Array.isArray(list)) continue;
    if (list.length < (rare.has(k) ? 2 : 5)) warnings.push(k + ' 未滿目標詞數');
    const seen = new Set();
    for (const c of list) {
      if (!c || typeof c.w !== 'string' || !/^[ぁ-ゖゝゞァ-ヺー-ヾ]+$/.test(c.w) || typeof c.zh !== 'string' || !c.zh.trim()) { errors.push(k + ' 詞格式錯誤'); continue; }
      if (free.has(k) ? !c.w.includes(k) : !c.w.startsWith(k)) errors.push(k + ' 詞首／包含規則錯誤');
      if (seen.has(c.w)) errors.push(k + ' 重複詞：' + c.w);
      seen.add(c.w);
    }
  }
  return { errors, warnings };
}
