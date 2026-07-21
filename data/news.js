/* =========================================================
 * data/news.js — 每日新聞資料包（MVP 內建範例；唯一內容來源）
 * 介面契約：window.KANA_NEWS = { packs: [ …每日包… ] }
 * 程式只渲染；換內容＝換這個檔（未來由離線 AI 管線產生，見 docs/ai-news-module-design.md）。
 *
 * 每個包欄位：
 *   id, date, level(N5..N1),
 *   source { title, publisher, url, note }   // 出處；本範例為原創教學短文
 *   title   { ja, furigana, zh, en }
 *   summary [{ ja, furigana, zh, en }]        // 逐段平行文本
 *   vocab   [{ word, reading(全假名), zh, en, pos, jlpt, example{ja,zh} }]
 *   grammar [{ point, zh, en, example{ja,zh}, note }]
 *   quiz    [5]{ type(listening|reading|vocab|grammar|cloze), prompt{ja,zh},
 *               audioText?(聽選朗讀), options[], answer(索引), explain{zh} }
 *   dictation [{ ja, furigana, accept[](容錯答案), hint }]
 *   speaking  [{ ja, furigana, zh, focus, linking? }]   // 七步跟讀用
 * ========================================================= */
window.KANA_NEWS = {
  packs: [
    {
      id: "sample-panda",
      date: "2026-07-21",
      level: "N5",
      source: {
        title: "（教學範例）上野動物園のパンダ",
        publisher: "五十音練習器・原創教學素材",
        url: "",
        note: "本則為原創、分級改寫之新聞式短文，非重製任何特定報導。"
      },
      title: {
        ja: "上野動物園に赤ちゃんパンダ",
        furigana: "うえのどうぶつえんに あかちゃんパンダ",
        zh: "上野動物園有了熊貓寶寶",
        en: "A baby panda at Ueno Zoo"
      },
      summary: [
        {
          ja: "東京の上野動物園で、赤ちゃんパンダが生まれました。",
          furigana: "とうきょうの うえのどうぶつえんで、あかちゃんパンダが うまれました。",
          zh: "在東京的上野動物園，誕生了一隻熊貓寶寶。",
          en: "A baby panda was born at Ueno Zoo in Tokyo."
        },
        {
          ja: "赤ちゃんはとても小さくて、体重は二百グラムです。",
          furigana: "あかちゃんは とても ちいさくて、たいじゅうは にひゃくグラムです。",
          zh: "寶寶非常小，體重是兩百公克。",
          en: "The baby is very small and weighs 200 grams."
        },
        {
          ja: "動物園は十二月に赤ちゃんの名前を発表します。",
          furigana: "どうぶつえんは じゅうにがつに あかちゃんの なまえを はっぴょうします。",
          zh: "動物園將在十二月公布寶寶的名字。",
          en: "The zoo will announce the baby's name in December."
        },
        {
          ja: "たくさんの人が赤ちゃんパンダを見に来るでしょう。",
          furigana: "たくさんの ひとが あかちゃんパンダを みに くるでしょう。",
          zh: "應該會有很多人來看熊貓寶寶吧。",
          en: "Many people will probably come to see the baby panda."
        }
      ],
      vocab: [
        { word: "動物園", reading: "どうぶつえん", zh: "動物園", en: "zoo", pos: "名詞", jlpt: "N5", example: { ja: "日曜日に動物園へ行きます。", zh: "星期日要去動物園。" } },
        { word: "赤ちゃん", reading: "あかちゃん", zh: "嬰兒、寶寶", en: "baby", pos: "名詞", jlpt: "N5", example: { ja: "赤ちゃんが寝ています。", zh: "寶寶正在睡覺。" } },
        { word: "生まれる", reading: "うまれる", zh: "出生", en: "to be born", pos: "動詞", jlpt: "N5", example: { ja: "子供が生まれました。", zh: "孩子出生了。" } },
        { word: "体重", reading: "たいじゅう", zh: "體重", en: "body weight", pos: "名詞", jlpt: "N4", example: { ja: "体重をはかります。", zh: "量體重。" } },
        { word: "名前", reading: "なまえ", zh: "名字", en: "name", pos: "名詞", jlpt: "N5", example: { ja: "名前を書いてください。", zh: "請寫名字。" } },
        { word: "発表", reading: "はっぴょう", zh: "發表、公布", en: "announcement", pos: "名詞", jlpt: "N4", example: { ja: "結果を発表します。", zh: "公布結果。" } }
      ],
      grammar: [
        { point: "〜でしょう", zh: "應該～吧（推測）", en: "probably / will likely", example: { ja: "あしたは雨でしょう。", zh: "明天應該會下雨吧。" }, note: "對未確定的事表示推測。" },
        { point: "〜を見に行く／来る", zh: "去／來看～（目的）", en: "go/come to see ~", example: { ja: "映画を見に行きます。", zh: "去看電影。" }, note: "動詞ます形＋に＋行く/来る，表示移動的目的。" }
      ],
      quiz: [
        { type: "listening", prompt: { ja: "", zh: "聽發音，選出正確的意思" }, audioText: "あかちゃんパンダが うまれました。",
          options: ["誕生了熊貓寶寶", "熊貓寶寶生病了", "熊貓寶寶睡著了", "熊貓寶寶不見了"], answer: 0,
          explain: { zh: "「生まれました」是「生まれる（出生）」的過去式。" } },
        { type: "reading", prompt: { ja: "赤ちゃんパンダは どこで 生まれましたか。", zh: "熊貓寶寶在哪裡出生？" },
          options: ["上野動物園", "京都", "北海道", "富士山"], answer: 0,
          explain: { zh: "短文第一句：東京の上野動物園で生まれました。" } },
        { type: "vocab", prompt: { ja: "「体重」の意味は？", zh: "「体重」的意思是？" },
          options: ["體重", "身高", "年齡", "名字"], answer: 0,
          explain: { zh: "体重（たいじゅう）＝體重。" } },
        { type: "grammar", prompt: { ja: "あしたは 雨（　）。", zh: "選出正確的推測說法" },
          options: ["でしょう", "でした", "ますか", "ください"], answer: 0,
          explain: { zh: "推測用「〜でしょう」：應該～吧。" } },
        { type: "cloze", prompt: { ja: "パンダ（　）見に 行きます。", zh: "選出正確的助詞" },
          options: ["を", "に", "で", "と"], answer: 0,
          explain: { zh: "受詞＋を＋見に行く：を見に行く。" } }
      ],
      dictation: [
        { ja: "あかちゃんは とても ちいさいです。", furigana: "あかちゃんは とても ちいさいです。",
          accept: ["あかちゃんはとてもちいさいです", "赤ちゃんはとても小さいです"], hint: "寶寶很小。" },
        { ja: "どうぶつえんへ いきます。", furigana: "どうぶつえんへ いきます。",
          accept: ["どうぶつえんへいきます", "動物園へ行きます", "どうぶつえんにいきます"], hint: "去動物園。" }
      ],
      speaking: [
        { ja: "赤ちゃんパンダが 生まれました。", furigana: "あかちゃんパンダが うまれました。", zh: "誕生了熊貓寶寶。", focus: "intonation", linking: "「が」輕、句尾「ました」下降。" },
        { ja: "とても 小さくて かわいいです。", furigana: "とても ちいさくて かわいいです。", zh: "又小又可愛。", focus: "pacing", linking: "「小さくて」在て處微停。" },
        { ja: "動物園へ 見に 行きたいです。", furigana: "どうぶつえんへ みに いきたいです。", zh: "想去動物園看。", focus: "intonation", linking: "「見に行きたい」一氣呵成。" }
      ]
    }
  ]
};
