"use strict";
window.KanaAudio = function (params, FEMALE_RE, MALE_RE) {
    let ok = false;
    try { ok = !params.has("notts") && "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function"; } catch (e) { ok = false; }
    const cfg = { voiceURI: "", pitch: 1.0, rate: 0.85, gender: "" };
    let voice = null;
    function jaVoices() {
      try { return (window.speechSynthesis.getVoices() || []).filter(v => /^ja/i.test(v.lang)); }
      catch (e) { return []; }
    }
    function resolveVoice() {
      const vs = jaVoices();
      if (!vs.length) { voice = null; return; }
      // 1) 使用者手選的語音優先
      if (cfg.voiceURI) { const hit = vs.find(v => v.voiceURI === cfg.voiceURI); if (hit) { voice = hit; return; } }
      // 2) 依人格性別偏好挑一個相符語音
      if (cfg.gender === "f") { const f = vs.find(v => FEMALE_RE.test(v.name) && !MALE_RE.test(v.name)); if (f) { voice = f; return; } }
      if (cfg.gender === "m") { const m = vs.find(v => MALE_RE.test(v.name) && !FEMALE_RE.test(v.name)); if (m) { voice = m; return; } }
      // 3) 回退第一個 ja 語音
      voice = vs[0];
    }
    if (ok) {
      resolveVoice();
      try { window.speechSynthesis.onvoiceschanged = resolveVoice; } catch (e) {}
    }
    return {
      enabled: ok,
      voices() { return ok ? jaVoices() : []; },
      configure(t) {
        if (!t) return;
        if (typeof t.voiceURI === "string") cfg.voiceURI = t.voiceURI;
        if (typeof t.pitch === "number") cfg.pitch = t.pitch;
        if (typeof t.rate === "number") cfg.rate = t.rate;
        if (typeof t.gender === "string") cfg.gender = t.gender;
        if (ok) resolveVoice();
      },
      speak(text, rateOverride) {
        if (!ok || !text) return;
        try {
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.lang = "ja-JP";
          if (voice) u.voice = voice;
          u.pitch = cfg.pitch;
          u.rate = rateOverride || cfg.rate;
          window.speechSynthesis.speak(u);
        } catch (e) {}
      },
      stop() { if (ok) { try { window.speechSynthesis.cancel(); } catch (e) {} } }
    };
};
