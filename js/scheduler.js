"use strict";
window.KanaScheduler = function (P, FSRS, DAY, clamp, ALL_KANA) {
  function srsUpdate(k, rating) {   // rating: 1=Again(✗) / 3=Good(✓) / 4=Easy
    const now = Date.now();
    const s = P.srs[k] || (P.srs[k] = { D: 5, S: 0, last: 0, reps: 0, lapses: 0 });
    if (s.reps === 0) {
      s.D = clamp(6 - (rating - 3), 1, 10);
      s.S = FSRS.S0[rating] || FSRS.S0[3];
    } else {
      const elapsed = (now - s.last) / DAY;
      const R = Math.exp(Math.log(0.9) * elapsed / Math.max(s.S, 0.01)); // 可提取度
      if (rating === 1) { s.S = Math.max(0.2, s.S * 0.3); s.D = clamp(s.D + 1, 1, 10); s.lapses++; }
      else { s.S = s.S * (1 + FSRS.G * (1 - R) * (11 - s.D) / 10); s.D = clamp(s.D - 0.3, 1, 10); } // R 越低成長越大＝合宜困難度
    }
    s.last = now;
    // 失敗（Again）當日重練：due 設為現在，立即回到今日複習佇列；成功則依穩定度排程
    s.due = rating === 1 ? now : now + s.S * DAY;
    s.reps++;
  }
  function dueOf(k) {
    const s = P.srs[k];
    if (!s || s.reps === 0) return Infinity;
    return s.due != null ? s.due : s.last + s.S * DAY;  // 舊存檔無 due 時回退
  }
  function isMastered(k) { const s = P.srs[k]; return !!(s && s.S >= FSRS.MASTER_S); }
  function masteredCount() { return ALL_KANA.reduce((n, x) => n + (isMastered(x.k) ? 1 : 0), 0); }

return {srsUpdate,dueOf,isMastered,masteredCount};
};
