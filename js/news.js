"use strict";
window.KanaNews = {
  input(state, id) { return state.inputDone[id] || {}; },
  mark(state, pack, key) { const d = state.inputDone[pack.id] || (state.inputDone[pack.id] = {}); d[key] = true; },
  mastered(state, pack) { const d = this.input(state, pack.id); return !!(d.listen && d.dictation && d.quizPassed); },
  unlocked(state, pack) { return this.mastered(state, pack) || ["N3", "N2", "N1"].includes(state.userLevel); }
};
