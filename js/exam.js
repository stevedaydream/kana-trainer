"use strict";
window.KanaExam = function (ctx, cfg) {
    const { $app, P, TTS, BY_K, weightedPick, distractors, confusablePool, esc, romajiEq, markHit, markMiss, bumpPlan, save, sessionSummary, homeScreen, render } = ctx;
    const scope = window.KanaSession.create();
    let ended = false, ticking = false;
    const draw = html => render(html, scope);
    const EXAM_SEC = 60;
    const countMode = typeof cfg.qTotal === "number";   // 題數模式（如每日隨機 60 題）；否則 60 秒計時
    const passN = cfg.passN != null ? cfg.passN : 12;
    const set = cfg.set, poolAll = cfg.poolAll;
    const types = [];
    if (TTS.enabled) types.push("listen");        // 無語音剔除聽選
    types.push("read", "match");
    if (cfg.allowType) types.push("type");         // 產出型回憶（Pushed Output）
    const backTo = cfg.onBack || homeScreen;
    if (!cfg.set || !cfg.set.length || !cfg.poolAll || !cfg.poolAll.length) return backTo();

    let score = 0, answered = 0, remain = EXAM_SEC, lastK = null, locked = false, hits = 0;
    const missed = {}, startTs = Date.now();
    const deadline = startTs + EXAM_SEC * 1000;
    const timeUp = () => !countMode && Date.now() >= deadline;
    const finished = () => countMode ? answered >= cfg.qTotal : timeUp();

    function makeQuestion() {
      const type = types[Math.floor(Math.random() * types.length)];
      const x = weightedPick(set, lastK);
      lastK = x.k;
      if (type === "read") return { type, x, answer: x.r, options: distractors(poolAll, x, 3, o => o.r) };
      if (type === "type") return { type, x, answer: x.r };
      if (type === "listen") {
        const sameType = poolAll.filter(o => o.type === x.type);
        return { type, x, answer: x.k, options: distractors(sameType, x, 3, o => o.k, confusablePool(sameType, x.k)) };
      }
      // match：平片配對（雙向）
      const oppo = poolAll.filter(o => o.type !== x.type);
      const correct = BY_K[x.pair] || { k: x.pair };
      return { type, x, answer: correct.k, options: distractors(oppo, correct, 3, o => o.k, confusablePool(oppo, correct.k)) };
    }

    function header() {
      const right = countMode
        ? '<div class="progress-note">第 <b>' + Math.min(answered + 1, cfg.qTotal) + "</b> / " + cfg.qTotal + " 題</div>"
        : '<div class="progress-note">剩餘 <b id="sec">' + remain + '</b> 秒</div>';
      const barW = countMode ? (answered / cfg.qTotal * 100) : (remain / EXAM_SEC * 100);
      return '<div class="exam-head"><div class="exam-score">得分 ' + score + " 題</div>" + right +
        '<button class="ghost small" id="quit">放棄</button></div>' +
        '<div class="timerbar"><i id="bar" style="width:' + barW + '%"></i></div>';
    }

    function grade(right, q, btn) {
      if (locked || ended || scope.disposed) return;
      if (timeUp()) return finish();
      locked = true; answered++;
      if (right) { score++; hits++; markHit(q.x.k); if (btn) btn.classList.add("hit"); }
      else {
        markMiss(q.x.k);                 // 答錯餵入權重 + SRS
        missed[q.x.k] = (missed[q.x.k] || 0) + 1;
        TTS.speak(q.x.k);                // 答錯播正確音
        if (btn) btn.classList.add("miss");
        $app.querySelectorAll(".opts button").forEach(b => { if (b.dataset.v === q.answer) b.classList.add("hit"); });
        const tin = $app.querySelector("#tin");
        if (tin) { tin.classList.add("wrong"); tin.value = q.answer; tin.disabled = true; }
      }
      const scoreEl = $app.querySelector(".exam-score");
      if (scoreEl) scoreEl.textContent = "得分 " + score + " 題";
      if (countMode) { const b = $app.querySelector("#bar"); if (b) b.style.width = (answered / cfg.qTotal * 100) + "%"; }
      scope.timeout(() => { if (finished()) finish(); else showQuestion(); }, right ? 350 : 950);
    }

    function showQuestion() {
      if (ended || scope.disposed) return;
      if (finished()) return finish();
      locked = false;
      const q = makeQuestion();
      const kCls = q.x.k.length > 1 ? "k multi" : "k";
      let promptHtml;
      if (q.type === "listen") {
        promptHtml = '<div class="label">聽發音，選出正確的假名</div><button class="shu" id="playq">🔊 播放發音</button>';
      } else if (q.type === "read") {
        promptHtml = '<div class="label">這個假名的羅馬音是？</div><div class="' + kCls + '">' + esc(q.x.k) + "</div>";
      } else if (q.type === "type") {
        promptHtml = '<div class="label">鍵入這個假名的羅馬音</div><div class="' + kCls + '">' + esc(q.x.k) + "</div>";
      } else {
        promptHtml = '<div class="label">' + (q.x.type === "hira" ? "選出對應的片假名" : "選出對應的平假名") +
          '</div><div class="' + kCls + '">' + esc(q.x.k) + "</div>";
      }
      const answerHtml = q.type === "type"
        ? '<form class="typebox" id="typef"><input id="tin" type="text" inputmode="latin" autocomplete="off" autocapitalize="off" spellcheck="false" placeholder="羅馬音…"><button class="shu" type="submit">送出</button></form>'
        : '<div class="opts">' + q.options.map(o => '<button data-v="' + esc(o) + '">' + esc(o) + "</button>").join("") + "</div>";
      draw(header() + '<div class="q-prompt">' + promptHtml + "</div>" + answerHtml);
      startTick();
      $app.querySelector("#quit").addEventListener("click", backTo);
      const pq = $app.querySelector("#playq");
      if (pq) { pq.addEventListener("click", () => TTS.speak(q.x.k)); TTS.speak(q.x.k); }
      if (q.type === "type") {
        const inp = $app.querySelector("#tin");
        inp.focus();
        $app.querySelector("#typef").addEventListener("submit", e => { e.preventDefault(); grade(romajiEq(inp.value, q.answer), q, null); });
      } else {
        $app.querySelectorAll(".opts button").forEach(btn =>
          btn.addEventListener("click", () => grade(btn.dataset.v === q.answer, q, btn)));
      }
    }

    function startTick() {
      if (countMode || ticking) return;   // 題數模式不計時
      ticking = true;
      scope.interval(() => {
        remain = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        const s = $app.querySelector("#sec"), b = $app.querySelector("#bar");
        if (s) s.textContent = remain;
        if (b) b.style.width = (Math.max(0, remain) / EXAM_SEC * 100) + "%";
        if (remain <= 0) finish();
      }, 1000);
    }

    function finish() {
      if (ended || scope.disposed) return;
      ended = true; scope.dispose();
      const prevBest = P.best[cfg.bestKey];
      if (prevBest == null || score > prevBest) P.best[cfg.bestKey] = score;
      const passHtml = cfg.onPass ? cfg.onPass(score) : "";
      if (cfg.planKind) bumpPlan(cfg.planKind);
      save();
      const passLine = cfg.onPass
        ? "<br>" + (score >= 12 ? "通過標準（≥ 12 題）！" : "還差 " + (12 - score) + " 題就能解鎖下一級，加油！")
        : (countMode ? "<br>" + (score >= passN ? "🎉 通過！（≥ " + passN + " 題）" : "未達標準（需 ≥ " + passN + " 題），再挑戰一次！") : "");
      render(
        '<div class="result-box"><div class="big">' + score + ' 題</div>' +
        '<div class="msg">' + esc(cfg.title) + " 結束（作答 " + answered + " 題）" + passLine + "</div>" +
        passHtml +
        sessionSummary({ correct: hits, total: answered, missed, startTs }) +
        '<div class="btn-col">' +
        '<button class="shu" id="again">再考一次</button>' +
        '<button class="ghost" id="back">返回</button>' +
        '<button class="ghost" id="home">回首頁</button></div></div>'
      );
      $app.querySelector("#again").addEventListener("click", () => window.KanaExam(ctx, cfg));
      $app.querySelector("#back").addEventListener("click", backTo);
      $app.querySelector("#home").addEventListener("click", homeScreen);
    }

    showQuestion();
  }

