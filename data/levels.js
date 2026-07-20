/* =========================================================
 * data/levels.js — 五十音練習器題庫（唯一資料來源）
 * 介面契約：window.KANA_DATA = { levels: [...] }
 * 每筆假名欄位：
 *   k     假名（可為多字，如拗音 "きゃ"）
 *   r     羅馬音（Hepburn 式）
 *   type  "hira" | "kata"
 *   origin 字源聯想（濁音/拗音可改為規則說明）
 *   w     單詞（全假名書寫、以該假名開頭；を/ん/ヲ/ン 白名單例外）
 *   zh    單詞中文翻譯
 *   img   配圖鍵（全域唯一；對應 img/{key}.png，缺檔自動退回 SVG/emoji）
 *   emoji 最終退回顯示
 *   pair  對應的另一表記（平↔片，雙向對稱）
 * 換題庫＝只換這一個檔案，主程式零修改。
 * ========================================================= */
window.KANA_DATA = {
  levels: [
    {
      id: 1,
      name: "第一級 あ行",
      hira: [
        { k: "あ", r: "a", type: "hira", origin: "「安」的草書簡化 → あ", w: "あさ", zh: "早晨", img: "asa", emoji: "🌅", pair: "ア" },
        { k: "い", r: "i", type: "hira", origin: "「以」的草書簡化 → い", w: "いぬ", zh: "狗", img: "inu", emoji: "🐶", pair: "イ" },
        { k: "う", r: "u", type: "hira", origin: "「宇」的草書簡化 → う", w: "うみ", zh: "海", img: "umi", emoji: "🌊", pair: "ウ" },
        { k: "え", r: "e", type: "hira", origin: "「衣」的草書簡化 → え", w: "えき", zh: "車站", img: "eki", emoji: "🚉", pair: "エ" },
        { k: "お", r: "o", type: "hira", origin: "「於」的草書簡化 → お", w: "おにぎり", zh: "飯糰", img: "onigiri", emoji: "🍙", pair: "オ" }
      ],
      kata: [
        { k: "ア", r: "a", type: "kata", origin: "「阿」的左偏旁 → ア", w: "アイス", zh: "冰淇淋", img: "aisu", emoji: "🍦", pair: "あ" },
        { k: "イ", r: "i", type: "kata", origin: "「伊」的左偏旁 → イ", w: "インク", zh: "墨水", img: "inku", emoji: "🖋️", pair: "い" },
        { k: "ウ", r: "u", type: "kata", origin: "「宇」的上部 → ウ", w: "ウール", zh: "羊毛", img: "uuru", emoji: "🧶", pair: "う" },
        { k: "エ", r: "e", type: "kata", origin: "「江」的右半部 → エ", w: "エビ", zh: "蝦子", img: "ebi", emoji: "🦐", pair: "え" },
        { k: "オ", r: "o", type: "kata", origin: "「於」的左半部 → オ", w: "オレンジ", zh: "柳橙", img: "orenji", emoji: "🍊", pair: "お" }
      ]
    },
    {
      id: 2,
      name: "第二級 か行",
      hira: [
        { k: "か", r: "ka", type: "hira", origin: "「加」的草書簡化 → か", w: "かさ", zh: "雨傘", img: "kasa", emoji: "☂️", pair: "カ" },
        { k: "き", r: "ki", type: "hira", origin: "「幾」的草書簡化 → き", w: "きつね", zh: "狐狸", img: "kitsune", emoji: "🦊", pair: "キ" },
        { k: "く", r: "ku", type: "hira", origin: "「久」的草書簡化 → く", w: "くつ", zh: "鞋子", img: "kutsu", emoji: "👟", pair: "ク" },
        { k: "け", r: "ke", type: "hira", origin: "「計」的草書簡化 → け", w: "けむり", zh: "煙", img: "kemuri", emoji: "💨", pair: "ケ" },
        { k: "こ", r: "ko", type: "hira", origin: "「己」的草書簡化 → こ", w: "こども", zh: "小孩", img: "kodomo", emoji: "🧒", pair: "コ" }
      ],
      kata: [
        { k: "カ", r: "ka", type: "kata", origin: "「加」的左半部 → カ", w: "カメラ", zh: "相機", img: "kamera", emoji: "📷", pair: "か" },
        { k: "キ", r: "ki", type: "kata", origin: "「幾」的簡化 → キ", w: "キウイ", zh: "奇異果", img: "kiui", emoji: "🥝", pair: "き" },
        { k: "ク", r: "ku", type: "kata", origin: "「久」的上部 → ク", w: "クッキー", zh: "餅乾", img: "kukkii", emoji: "🍪", pair: "く" },
        { k: "ケ", r: "ke", type: "kata", origin: "「介」的簡化 → ケ", w: "ケーキ", zh: "蛋糕", img: "keeki", emoji: "🍰", pair: "け" },
        { k: "コ", r: "ko", type: "kata", origin: "「己」的上部 → コ", w: "コーヒー", zh: "咖啡", img: "koohii", emoji: "☕", pair: "こ" }
      ]
    },
    {
      id: 3,
      name: "第三級 さ行",
      hira: [
        { k: "さ", r: "sa", type: "hira", origin: "「左」的草書簡化 → さ", w: "さかな", zh: "魚", img: "sakana", emoji: "🐟", pair: "サ" },
        { k: "し", r: "shi", type: "hira", origin: "「之」的草書簡化 → し", w: "しんぶん", zh: "報紙", img: "shinbun", emoji: "📰", pair: "シ" },
        { k: "す", r: "su", type: "hira", origin: "「寸」的草書簡化 → す", w: "すいか", zh: "西瓜", img: "suika", emoji: "🍉", pair: "ス" },
        { k: "せ", r: "se", type: "hira", origin: "「世」的草書簡化 → せ", w: "せんせい", zh: "老師", img: "sensei", emoji: "🧑‍🏫", pair: "セ" },
        { k: "そ", r: "so", type: "hira", origin: "「曽」的草書簡化 → そ", w: "そら", zh: "天空", img: "sora", emoji: "🌤️", pair: "ソ" }
      ],
      kata: [
        { k: "サ", r: "sa", type: "kata", origin: "「散」的左上部 → サ", w: "サラダ", zh: "沙拉", img: "sarada", emoji: "🥗", pair: "さ" },
        { k: "シ", r: "shi", type: "kata", origin: "「之」的變形 → シ（點橫向）", w: "シャツ", zh: "襯衫", img: "shatsu", emoji: "👕", pair: "し" },
        { k: "ス", r: "su", type: "kata", origin: "「須」的右部簡化 → ス", w: "スープ", zh: "湯", img: "suupu", emoji: "🍲", pair: "す" },
        { k: "セ", r: "se", type: "kata", origin: "「世」的簡化 → セ", w: "セーター", zh: "毛衣", img: "seetaa", emoji: "🧥", pair: "せ" },
        { k: "ソ", r: "so", type: "kata", origin: "「曽」的上部 → ソ（點縱向）", w: "ソファ", zh: "沙發", img: "sofa", emoji: "🛋️", pair: "そ" }
      ]
    },
    {
      id: 4,
      name: "第四級 た行",
      hira: [
        { k: "た", r: "ta", type: "hira", origin: "「太」的草書簡化 → た", w: "たまご", zh: "雞蛋", img: "tamago", emoji: "🥚", pair: "タ" },
        { k: "ち", r: "chi", type: "hira", origin: "「知」的草書簡化 → ち", w: "ちず", zh: "地圖", img: "chizu", emoji: "🗺️", pair: "チ" },
        { k: "つ", r: "tsu", type: "hira", origin: "「川」的草書簡化 → つ", w: "つき", zh: "月亮", img: "tsuki", emoji: "🌙", pair: "ツ" },
        { k: "て", r: "te", type: "hira", origin: "「天」的草書簡化 → て", w: "てがみ", zh: "信", img: "tegami", emoji: "✉️", pair: "テ" },
        { k: "と", r: "to", type: "hira", origin: "「止」的草書簡化 → と", w: "とり", zh: "鳥", img: "tori", emoji: "🐦", pair: "ト" }
      ],
      kata: [
        { k: "タ", r: "ta", type: "kata", origin: "「多」的上部 → タ", w: "タクシー", zh: "計程車", img: "takushii", emoji: "🚕", pair: "た" },
        { k: "チ", r: "chi", type: "kata", origin: "「千」的變形 → チ", w: "チーズ", zh: "起司", img: "chiizu", emoji: "🧀", pair: "ち" },
        { k: "ツ", r: "tsu", type: "kata", origin: "「川」的變形 → ツ（點橫向）", w: "ツナ", zh: "鮪魚", img: "tsuna", emoji: "🐟", pair: "つ" },
        { k: "テ", r: "te", type: "kata", origin: "「天」的簡化 → テ", w: "テレビ", zh: "電視", img: "terebi", emoji: "📺", pair: "て" },
        { k: "ト", r: "to", type: "kata", origin: "「止」的右部 → ト", w: "トマト", zh: "番茄", img: "tomato", emoji: "🍅", pair: "と" }
      ]
    },
    {
      id: 5,
      name: "第五級 な行",
      hira: [
        { k: "な", r: "na", type: "hira", origin: "「奈」的草書簡化 → な", w: "なつ", zh: "夏天", img: "natsu", emoji: "☀️", pair: "ナ" },
        { k: "に", r: "ni", type: "hira", origin: "「仁」的草書簡化 → に", w: "にく", zh: "肉", img: "niku", emoji: "🍖", pair: "ニ" },
        { k: "ぬ", r: "nu", type: "hira", origin: "「奴」的草書簡化 → ぬ", w: "ぬいぐるみ", zh: "玩偶", img: "nuigurumi", emoji: "🧸", pair: "ヌ" },
        { k: "ね", r: "ne", type: "hira", origin: "「祢」的草書簡化 → ね", w: "ねこ", zh: "貓", img: "neko", emoji: "🐱", pair: "ネ" },
        { k: "の", r: "no", type: "hira", origin: "「乃」的草書簡化 → の", w: "のり", zh: "海苔", img: "nori", emoji: "🍘", pair: "ノ" }
      ],
      kata: [
        { k: "ナ", r: "na", type: "kata", origin: "「奈」的上部 → ナ", w: "ナイフ", zh: "刀子", img: "naifu", emoji: "🔪", pair: "な" },
        { k: "ニ", r: "ni", type: "kata", origin: "「二」直接借用 → ニ", w: "ニュース", zh: "新聞", img: "nyuusu", emoji: "📡", pair: "に" },
        { k: "ヌ", r: "nu", type: "kata", origin: "「奴」的右部 → ヌ", w: "ヌードル", zh: "麵條", img: "nuudoru", emoji: "🍜", pair: "ぬ" },
        { k: "ネ", r: "ne", type: "kata", origin: "「祢」的左偏旁 → ネ", w: "ネクタイ", zh: "領帶", img: "nekutai", emoji: "👔", pair: "ね" },
        { k: "ノ", r: "no", type: "kata", origin: "「乃」的一撇 → ノ", w: "ノート", zh: "筆記本", img: "nooto", emoji: "📓", pair: "の" }
      ]
    },
    {
      id: 6,
      name: "第六級 は行",
      hira: [
        { k: "は", r: "ha", type: "hira", origin: "「波」的草書簡化 → は", w: "はな", zh: "花", img: "hana", emoji: "🌸", pair: "ハ" },
        { k: "ひ", r: "hi", type: "hira", origin: "「比」的草書簡化 → ひ", w: "ひこうき", zh: "飛機", img: "hikouki", emoji: "✈️", pair: "ヒ" },
        { k: "ふ", r: "fu", type: "hira", origin: "「不」的草書簡化 → ふ", w: "ふゆ", zh: "冬天", img: "fuyu", emoji: "⛄", pair: "フ" },
        { k: "へ", r: "he", type: "hira", origin: "「部」的草書簡化 → へ", w: "へや", zh: "房間", img: "heya", emoji: "🚪", pair: "ヘ" },
        { k: "ほ", r: "ho", type: "hira", origin: "「保」的草書簡化 → ほ", w: "ほし", zh: "星星", img: "hoshi", emoji: "⭐", pair: "ホ" }
      ],
      kata: [
        { k: "ハ", r: "ha", type: "kata", origin: "「八」直接借用 → ハ", w: "ハンバーガー", zh: "漢堡", img: "hanbaagaa", emoji: "🍔", pair: "は" },
        { k: "ヒ", r: "hi", type: "kata", origin: "「比」的右半部 → ヒ", w: "ヒーター", zh: "暖爐", img: "hiitaa", emoji: "🔥", pair: "ひ" },
        { k: "フ", r: "fu", type: "kata", origin: "「不」的上部 → フ", w: "フォーク", zh: "叉子", img: "fooku", emoji: "🍴", pair: "ふ" },
        { k: "ヘ", r: "he", type: "kata", origin: "「部」的簡化 → ヘ（與平假名同形）", w: "ヘリコプター", zh: "直升機", img: "herikoputaa", emoji: "🚁", pair: "へ" },
        { k: "ホ", r: "ho", type: "kata", origin: "「保」的右下部 → ホ", w: "ホテル", zh: "飯店", img: "hoteru", emoji: "🏨", pair: "ほ" }
      ]
    },
    {
      id: 7,
      name: "第七級 ま行",
      hira: [
        { k: "ま", r: "ma", type: "hira", origin: "「末」的草書簡化 → ま", w: "まど", zh: "窗戶", img: "mado", emoji: "🪟", pair: "マ" },
        { k: "み", r: "mi", type: "hira", origin: "「美」的草書簡化 → み", w: "みず", zh: "水", img: "mizu", emoji: "💧", pair: "ミ" },
        { k: "む", r: "mu", type: "hira", origin: "「武」的草書簡化 → む", w: "むし", zh: "蟲", img: "mushi", emoji: "🐛", pair: "ム" },
        { k: "め", r: "me", type: "hira", origin: "「女」的草書簡化 → め", w: "めがね", zh: "眼鏡", img: "megane", emoji: "👓", pair: "メ" },
        { k: "も", r: "mo", type: "hira", origin: "「毛」的草書簡化 → も", w: "もも", zh: "桃子", img: "momo", emoji: "🍑", pair: "モ" }
      ],
      kata: [
        { k: "マ", r: "ma", type: "kata", origin: "「末」的下部簡化 → マ", w: "マスク", zh: "口罩", img: "masuku", emoji: "😷", pair: "ま" },
        { k: "ミ", r: "mi", type: "kata", origin: "「三」直接借用 → ミ", w: "ミルク", zh: "牛奶", img: "miruku", emoji: "🥛", pair: "み" },
        { k: "ム", r: "mu", type: "kata", origin: "「牟」的上部 → ム", w: "ムービー", zh: "電影", img: "muubii", emoji: "🎬", pair: "む" },
        { k: "メ", r: "me", type: "kata", origin: "「女」的簡化 → メ", w: "メロン", zh: "哈密瓜", img: "meron", emoji: "🍈", pair: "め" },
        { k: "モ", r: "mo", type: "kata", origin: "「毛」的簡化 → モ", w: "モップ", zh: "拖把", img: "moppu", emoji: "🧹", pair: "も" }
      ]
    },
    {
      id: 8,
      name: "第八級 や行",
      hira: [
        { k: "や", r: "ya", type: "hira", origin: "「也」的草書簡化 → や", w: "やま", zh: "山", img: "yama", emoji: "⛰️", pair: "ヤ" },
        { k: "ゆ", r: "yu", type: "hira", origin: "「由」的草書簡化 → ゆ", w: "ゆき", zh: "雪", img: "yuki", emoji: "❄️", pair: "ユ" },
        { k: "よ", r: "yo", type: "hira", origin: "「与」的草書簡化 → よ", w: "よる", zh: "夜晚", img: "yoru", emoji: "🌃", pair: "ヨ" }
      ],
      kata: [
        { k: "ヤ", r: "ya", type: "kata", origin: "「也」的簡化 → ヤ", w: "ヤギ", zh: "山羊", img: "yagi", emoji: "🐐", pair: "や" },
        { k: "ユ", r: "yu", type: "kata", origin: "「由」的下部簡化 → ユ", w: "ユニフォーム", zh: "制服", img: "yunifoomu", emoji: "🎽", pair: "ゆ" },
        { k: "ヨ", r: "yo", type: "kata", origin: "「与」的簡化 → ヨ", w: "ヨーグルト", zh: "優格", img: "yooguruto", emoji: "🥣", pair: "よ" }
      ]
    },
    {
      id: 9,
      name: "第九級 ら行",
      hira: [
        { k: "ら", r: "ra", type: "hira", origin: "「良」的草書簡化 → ら", w: "らくだ", zh: "駱駝", img: "rakuda", emoji: "🐫", pair: "ラ" },
        { k: "り", r: "ri", type: "hira", origin: "「利」的草書簡化 → り", w: "りんご", zh: "蘋果", img: "ringo", emoji: "🍎", pair: "リ" },
        { k: "る", r: "ru", type: "hira", origin: "「留」的草書簡化 → る", w: "るり", zh: "琉璃寶石", img: "ruri", emoji: "💎", pair: "ル" },
        { k: "れ", r: "re", type: "hira", origin: "「礼」的草書簡化 → れ", w: "れいぞうこ", zh: "冰箱", img: "reizouko", emoji: "🧊", pair: "レ" },
        { k: "ろ", r: "ro", type: "hira", origin: "「呂」的草書簡化 → ろ", w: "ろうそく", zh: "蠟燭", img: "rousoku", emoji: "🕯️", pair: "ロ" }
      ],
      kata: [
        { k: "ラ", r: "ra", type: "kata", origin: "「良」的上部 → ラ", w: "ラーメン", zh: "拉麵", img: "raamen", emoji: "🍜", pair: "ら" },
        { k: "リ", r: "ri", type: "kata", origin: "「利」的右部 → リ", w: "リボン", zh: "緞帶", img: "ribon", emoji: "🎀", pair: "り" },
        { k: "ル", r: "ru", type: "kata", origin: "「流」的右下部 → ル", w: "ルビー", zh: "紅寶石", img: "rubii", emoji: "💍", pair: "る" },
        { k: "レ", r: "re", type: "kata", origin: "「礼」的右部 → レ", w: "レモン", zh: "檸檬", img: "remon", emoji: "🍋", pair: "れ" },
        { k: "ロ", r: "ro", type: "kata", origin: "「呂」的上部 → ロ", w: "ロボット", zh: "機器人", img: "robotto", emoji: "🤖", pair: "ろ" }
      ]
    },
    {
      id: 10,
      name: "第十級 わ行・ん",
      hira: [
        { k: "わ", r: "wa", type: "hira", origin: "「和」的草書簡化 → わ", w: "わに", zh: "鱷魚", img: "wani", emoji: "🐊", pair: "ワ" },
        { k: "を", r: "o", type: "hira", origin: "「遠」的草書簡化 → を（受詞助詞）", w: "ほんをよむ", zh: "讀書", img: "wo", emoji: "📖", pair: "ヲ" },
        { k: "ん", r: "n", type: "hira", origin: "「无」的草書簡化 → ん（撥音）", w: "みかん", zh: "橘子", img: "mikan", emoji: "🍊", pair: "ン" }
      ],
      kata: [
        { k: "ワ", r: "wa", type: "kata", origin: "「和」的口部變形 → ワ", w: "ワイン", zh: "紅酒", img: "wain", emoji: "🍷", pair: "わ" },
        { k: "ヲ", r: "o", type: "kata", origin: "「乎」的簡化 → ヲ（極少使用）", w: "ホンヲヨム", zh: "讀書", img: "wo_kata", emoji: "📕", pair: "を" },
        { k: "ン", r: "n", type: "kata", origin: "「尔」的簡化 → ン（撥音）", w: "パン", zh: "麵包", img: "pan", emoji: "🍞", pair: "ん" }
      ]
    },
    {
      id: 11,
      name: "第十一級 濁音 が・ざ・だ行",
      hira: [
        { k: "が", r: "ga", type: "hira", origin: "か ＋ 濁點（゛）→ が", w: "がっこう", zh: "學校", img: "gakkou", emoji: "🏫", pair: "ガ" },
        { k: "ぎ", r: "gi", type: "hira", origin: "き ＋ 濁點（゛）→ ぎ", w: "ぎんこう", zh: "銀行", img: "ginkou", emoji: "🏦", pair: "ギ" },
        { k: "ぐ", r: "gu", type: "hira", origin: "く ＋ 濁點（゛）→ ぐ", w: "ぐんて", zh: "工作手套", img: "gunte", emoji: "🧤", pair: "グ" },
        { k: "げ", r: "ge", type: "hira", origin: "け ＋ 濁點（゛）→ げ", w: "げた", zh: "木屐", img: "geta", emoji: "🩴", pair: "ゲ" },
        { k: "ご", r: "go", type: "hira", origin: "こ ＋ 濁點（゛）→ ご", w: "ごはん", zh: "白飯", img: "gohan", emoji: "🍚", pair: "ゴ" },
        { k: "ざ", r: "za", type: "hira", origin: "さ ＋ 濁點（゛）→ ざ", w: "ざっし", zh: "雜誌", img: "zasshi", emoji: "📖", pair: "ザ" },
        { k: "じ", r: "ji", type: "hira", origin: "し ＋ 濁點（゛）→ じ", w: "じてんしゃ", zh: "腳踏車", img: "jitensha", emoji: "🚲", pair: "ジ" },
        { k: "ず", r: "zu", type: "hira", origin: "す ＋ 濁點（゛）→ ず", w: "ずかん", zh: "圖鑑", img: "zukan", emoji: "📚", pair: "ズ" },
        { k: "ぜ", r: "ze", type: "hira", origin: "せ ＋ 濁點（゛）→ ぜ", w: "ぜに", zh: "錢幣", img: "zeni", emoji: "🪙", pair: "ゼ" },
        { k: "ぞ", r: "zo", type: "hira", origin: "そ ＋ 濁點（゛）→ ぞ", w: "ぞう", zh: "大象", img: "zou", emoji: "🐘", pair: "ゾ" },
        { k: "だ", r: "da", type: "hira", origin: "た ＋ 濁點（゛）→ だ", w: "だんご", zh: "丸子", img: "dango", emoji: "🍡", pair: "ダ" },
        { k: "ぢ", r: "ji", type: "hira", origin: "ち ＋ 濁點（゛）→ ぢ（詞首罕見）", w: "はなぢ", zh: "流鼻血（含 ぢ）", img: "hanaji", emoji: "🤧", pair: "ヂ" },
        { k: "づ", r: "zu", type: "hira", origin: "つ ＋ 濁點（゛）→ づ（詞首罕見）", w: "みかづき", zh: "新月（含 づ）", img: "mikazuki", emoji: "🌙", pair: "ヅ" },
        { k: "で", r: "de", type: "hira", origin: "て ＋ 濁點（゛）→ で", w: "でんわ", zh: "電話", img: "denwa", emoji: "📞", pair: "デ" },
        { k: "ど", r: "do", type: "hira", origin: "と ＋ 濁點（゛）→ ど", w: "どんぐり", zh: "橡實", img: "donguri", emoji: "🌰", pair: "ド" }
      ],
      kata: [
        { k: "ガ", r: "ga", type: "kata", origin: "カ ＋ 濁點（゛）→ ガ", w: "ガム", zh: "口香糖", img: "gamu", emoji: "🍬", pair: "が" },
        { k: "ギ", r: "gi", type: "kata", origin: "キ ＋ 濁點（゛）→ ギ", w: "ギター", zh: "吉他", img: "gitaa", emoji: "🎸", pair: "ぎ" },
        { k: "グ", r: "gu", type: "kata", origin: "ク ＋ 濁點（゛）→ グ", w: "グローブ", zh: "手套", img: "guroobu", emoji: "🥎", pair: "ぐ" },
        { k: "ゲ", r: "ge", type: "kata", origin: "ケ ＋ 濁點（゛）→ ゲ", w: "ゲーム", zh: "遊戲", img: "geemu", emoji: "🎮", pair: "げ" },
        { k: "ゴ", r: "go", type: "kata", origin: "コ ＋ 濁點（゛）→ ゴ", w: "ゴリラ", zh: "大猩猩", img: "gorira", emoji: "🦍", pair: "ご" },
        { k: "ザ", r: "za", type: "kata", origin: "サ ＋ 濁點（゛）→ ザ", w: "ザリガニ", zh: "螯蝦", img: "zarigani", emoji: "🦞", pair: "ざ" },
        { k: "ジ", r: "ji", type: "kata", origin: "シ ＋ 濁點（゛）→ ジ", w: "ジュース", zh: "果汁", img: "juusu", emoji: "🧃", pair: "じ" },
        { k: "ズ", r: "zu", type: "kata", origin: "ス ＋ 濁點（゛）→ ズ", w: "ズボン", zh: "褲子", img: "zubon", emoji: "👖", pair: "ず" },
        { k: "ゼ", r: "ze", type: "kata", origin: "セ ＋ 濁點（゛）→ ゼ", w: "ゼリー", zh: "果凍", img: "zerii", emoji: "🍮", pair: "ぜ" },
        { k: "ゾ", r: "zo", type: "kata", origin: "ソ ＋ 濁點（゛）→ ゾ", w: "ゾンビ", zh: "殭屍", img: "zonbi", emoji: "🧟", pair: "ぞ" },
        { k: "ダ", r: "da", type: "kata", origin: "タ ＋ 濁點（゛）→ ダ", w: "ダンス", zh: "舞蹈", img: "dansu", emoji: "💃", pair: "だ" },
        { k: "ヂ", r: "ji", type: "kata", origin: "チ ＋ 濁點（゛）→ ヂ（詞首罕見）", w: "ラヂオ", zh: "收音機・舊寫（含 ヂ）", img: "radio_dji", emoji: "📻", pair: "ぢ" },
        { k: "ヅ", r: "zu", type: "kata", origin: "ツ ＋ 濁點（゛）→ ヅ（詞首罕見）", w: "ミカヅキ", zh: "新月・片假名（含 ヅ）", img: "mikazuki_k", emoji: "🌙", pair: "づ" },
        { k: "デ", r: "de", type: "kata", origin: "テ ＋ 濁點（゛）→ デ", w: "デパート", zh: "百貨公司", img: "depaato", emoji: "🏬", pair: "で" },
        { k: "ド", r: "do", type: "kata", origin: "ト ＋ 濁點（゛）→ ド", w: "ドーナツ", zh: "甜甜圈", img: "doonatsu", emoji: "🍩", pair: "ど" }
      ]
    },
    {
      id: 12,
      name: "第十二級 濁音 ば行・半濁音 ぱ行",
      hira: [
        { k: "ば", r: "ba", type: "hira", origin: "は ＋ 濁點（゛）→ ば", w: "ばなな", zh: "香蕉", img: "banana", emoji: "🍌", pair: "バ" },
        { k: "び", r: "bi", type: "hira", origin: "ひ ＋ 濁點（゛）→ び", w: "びん", zh: "瓶子", img: "bin", emoji: "🍾", pair: "ビ" },
        { k: "ぶ", r: "bu", type: "hira", origin: "ふ ＋ 濁點（゛）→ ぶ", w: "ぶた", zh: "豬", img: "buta", emoji: "🐷", pair: "ブ" },
        { k: "べ", r: "be", type: "hira", origin: "へ ＋ 濁點（゛）→ べ", w: "べんとう", zh: "便當", img: "bentou", emoji: "🍱", pair: "ベ" },
        { k: "ぼ", r: "bo", type: "hira", origin: "ほ ＋ 濁點（゛）→ ぼ", w: "ぼうし", zh: "帽子", img: "boushi", emoji: "👒", pair: "ボ" },
        { k: "ぱ", r: "pa", type: "hira", origin: "は ＋ 半濁點（゜）→ ぱ", w: "ぱくぱく", zh: "大口吃（擬態）", img: "pakupaku", emoji: "😋", pair: "パ" },
        { k: "ぴ", r: "pi", type: "hira", origin: "ひ ＋ 半濁點（゜）→ ぴ", w: "ぴかぴか", zh: "閃亮亮（擬態）", img: "pikapika", emoji: "✨", pair: "ピ" },
        { k: "ぷ", r: "pu", type: "hira", origin: "ふ ＋ 半濁點（゜）→ ぷ", w: "ぷりん", zh: "布丁", img: "purin", emoji: "🍮", pair: "プ" },
        { k: "ぺ", r: "pe", type: "hira", origin: "へ ＋ 半濁點（゜）→ ぺ", w: "ぺんき", zh: "油漆", img: "penki", emoji: "🎨", pair: "ペ" },
        { k: "ぽ", r: "po", type: "hira", origin: "ほ ＋ 半濁點（゜）→ ぽ", w: "ぽかぽか", zh: "暖洋洋（擬態）", img: "pokapoka", emoji: "♨️", pair: "ポ" }
      ],
      kata: [
        { k: "バ", r: "ba", type: "kata", origin: "ハ ＋ 濁點（゛）→ バ", w: "バス", zh: "公車", img: "basu", emoji: "🚌", pair: "ば" },
        { k: "ビ", r: "bi", type: "kata", origin: "ヒ ＋ 濁點（゛）→ ビ", w: "ビール", zh: "啤酒", img: "biiru", emoji: "🍺", pair: "び" },
        { k: "ブ", r: "bu", type: "kata", origin: "フ ＋ 濁點（゛）→ ブ", w: "ブドウ", zh: "葡萄", img: "budou", emoji: "🍇", pair: "ぶ" },
        { k: "ベ", r: "be", type: "kata", origin: "ヘ ＋ 濁點（゛）→ ベ", w: "ベッド", zh: "床", img: "beddo", emoji: "🛏️", pair: "べ" },
        { k: "ボ", r: "bo", type: "kata", origin: "ホ ＋ 濁點（゛）→ ボ", w: "ボール", zh: "球", img: "booru", emoji: "⚽", pair: "ぼ" },
        { k: "パ", r: "pa", type: "kata", origin: "ハ ＋ 半濁點（゜）→ パ", w: "パンダ", zh: "熊貓", img: "panda", emoji: "🐼", pair: "ぱ" },
        { k: "ピ", r: "pi", type: "kata", origin: "ヒ ＋ 半濁點（゜）→ ピ", w: "ピアノ", zh: "鋼琴", img: "piano", emoji: "🎹", pair: "ぴ" },
        { k: "プ", r: "pu", type: "kata", origin: "フ ＋ 半濁點（゜）→ プ", w: "プール", zh: "游泳池", img: "puuru", emoji: "🏊", pair: "ぷ" },
        { k: "ペ", r: "pe", type: "kata", origin: "ヘ ＋ 半濁點（゜）→ ペ", w: "ペン", zh: "筆", img: "pen", emoji: "🖊️", pair: "ぺ" },
        { k: "ポ", r: "po", type: "kata", origin: "ホ ＋ 半濁點（゜）→ ポ", w: "ポテト", zh: "薯條", img: "poteto", emoji: "🍟", pair: "ぽ" }
      ]
    },
    {
      id: 13,
      name: "第十三級 拗音 I（き・し・ち・に・ひ 系）",
      hira: [
        { k: "きゃ", r: "kya", type: "hira", origin: "き ＋ 小さい ゃ → きゃ", w: "きゃく", zh: "客人", img: "kyaku", emoji: "🙋", pair: "キャ" },
        { k: "きゅ", r: "kyu", type: "hira", origin: "き ＋ 小さい ゅ → きゅ", w: "きゅうり", zh: "小黃瓜", img: "kyuuri", emoji: "🥒", pair: "キュ" },
        { k: "きょ", r: "kyo", type: "hira", origin: "き ＋ 小さい ょ → きょ", w: "きょうりゅう", zh: "恐龍", img: "kyouryuu", emoji: "🦕", pair: "キョ" },
        { k: "しゃ", r: "sha", type: "hira", origin: "し ＋ 小さい ゃ → しゃ", w: "しゃしん", zh: "照片", img: "shashin", emoji: "🖼️", pair: "シャ" },
        { k: "しゅ", r: "shu", type: "hira", origin: "し ＋ 小さい ゅ → しゅ", w: "しゅくだい", zh: "作業", img: "shukudai", emoji: "📝", pair: "シュ" },
        { k: "しょ", r: "sho", type: "hira", origin: "し ＋ 小さい ょ → しょ", w: "しょうぼうしゃ", zh: "消防車", img: "shoubousha", emoji: "🚒", pair: "ショ" },
        { k: "ちゃ", r: "cha", type: "hira", origin: "ち ＋ 小さい ゃ → ちゃ", w: "ちゃわん", zh: "碗", img: "chawan", emoji: "🍵", pair: "チャ" },
        { k: "ちゅ", r: "chu", type: "hira", origin: "ち ＋ 小さい ゅ → ちゅ", w: "ちゅうしゃ", zh: "打針", img: "chuusha", emoji: "💉", pair: "チュ" },
        { k: "ちょ", r: "cho", type: "hira", origin: "ち ＋ 小さい ょ → ちょ", w: "ちょうちょ", zh: "蝴蝶", img: "choucho", emoji: "🦋", pair: "チョ" },
        { k: "にゃ", r: "nya", type: "hira", origin: "に ＋ 小さい ゃ → にゃ", w: "にゃんこ", zh: "貓咪", img: "nyanko", emoji: "🐈", pair: "ニャ" },
        { k: "にゅ", r: "nyu", type: "hira", origin: "に ＋ 小さい ゅ → にゅ", w: "にゅうがく", zh: "入學", img: "nyuugaku", emoji: "🎒", pair: "ニュ" },
        { k: "にょ", r: "nyo", type: "hira", origin: "に ＋ 小さい ょ → にょ", w: "にょうぼう", zh: "太太", img: "nyoubou", emoji: "👰", pair: "ニョ" },
        { k: "ひゃ", r: "hya", type: "hira", origin: "ひ ＋ 小さい ゃ → ひゃ", w: "ひゃく", zh: "一百", img: "hyaku", emoji: "💯", pair: "ヒャ" },
        { k: "ひゅ", r: "hyu", type: "hira", origin: "ひ ＋ 小さい ゅ → ひゅ", w: "ひゅうひゅう", zh: "呼呼（風聲）", img: "hyuuhyuu", emoji: "🌬️", pair: "ヒュ" },
        { k: "ひょ", r: "hyo", type: "hira", origin: "ひ ＋ 小さい ょ → ひょ", w: "ひょう", zh: "豹", img: "hyou", emoji: "🐆", pair: "ヒョ" }
      ],
      kata: [
        { k: "キャ", r: "kya", type: "kata", origin: "キ ＋ 小さい ャ → キャ", w: "キャベツ", zh: "高麗菜", img: "kyabetsu", emoji: "🥬", pair: "きゃ" },
        { k: "キュ", r: "kyu", type: "kata", origin: "キ ＋ 小さい ュ → キュ", w: "キューブ", zh: "立方體", img: "kyuubu", emoji: "🧊", pair: "きゅ" },
        { k: "キョ", r: "kyo", type: "kata", origin: "キ ＋ 小さい ョ → キョ", w: "キョロキョロ", zh: "東張西望（擬態）", img: "kyorokyoro", emoji: "👀", pair: "きょ" },
        { k: "シャ", r: "sha", type: "kata", origin: "シ ＋ 小さい ャ → シャ", w: "シャワー", zh: "淋浴", img: "shawaa", emoji: "🚿", pair: "しゃ" },
        { k: "シュ", r: "shu", type: "kata", origin: "シ ＋ 小さい ュ → シュ", w: "シュークリーム", zh: "泡芙", img: "shuukuriimu", emoji: "🧁", pair: "しゅ" },
        { k: "ショ", r: "sho", type: "kata", origin: "シ ＋ 小さい ョ → ショ", w: "ショール", zh: "披肩", img: "shooru", emoji: "🧣", pair: "しょ" },
        { k: "チャ", r: "cha", type: "kata", origin: "チ ＋ 小さい ャ → チャ", w: "チャイム", zh: "門鈴", img: "chaimu", emoji: "🔔", pair: "ちゃ" },
        { k: "チュ", r: "chu", type: "kata", origin: "チ ＋ 小さい ュ → チュ", w: "チューリップ", zh: "鬱金香", img: "chuurippu", emoji: "🌷", pair: "ちゅ" },
        { k: "チョ", r: "cho", type: "kata", origin: "チ ＋ 小さい ョ → チョ", w: "チョコレート", zh: "巧克力", img: "chokoreeto", emoji: "🍫", pair: "ちょ" },
        { k: "ニャ", r: "nya", type: "kata", origin: "ニ ＋ 小さい ャ → ニャ", w: "ニャー", zh: "喵（貓叫）", img: "nyaa", emoji: "🐱", pair: "にゃ" },
        { k: "ニュ", r: "nyu", type: "kata", origin: "ニ ＋ 小さい ュ → ニュ", w: "ニューヨーク", zh: "紐約", img: "nyuuyooku", emoji: "🗽", pair: "にゅ" },
        { k: "ニョ", r: "nyo", type: "kata", origin: "ニ ＋ 小さい ョ → ニョ", w: "ニョッキ", zh: "麵疙瘩", img: "nyokki", emoji: "🍝", pair: "にょ" },
        { k: "ヒャ", r: "hya", type: "kata", origin: "ヒ ＋ 小さい ャ → ヒャ", w: "ヒャクテン", zh: "一百分（片假名）", img: "hyakuten", emoji: "💯", pair: "ひゃ" },
        { k: "ヒュ", r: "hyu", type: "kata", origin: "ヒ ＋ 小さい ュ → ヒュ", w: "ヒューズ", zh: "保險絲", img: "hyuuzu", emoji: "🔌", pair: "ひゅ" },
        { k: "ヒョ", r: "hyo", type: "kata", origin: "ヒ ＋ 小さい ョ → ヒョ", w: "ヒョウ", zh: "豹（片假名）", img: "hyou_k", emoji: "🐆", pair: "ひょ" }
      ]
    },
    {
      id: 14,
      name: "第十四級 拗音 II（み・り・ぎ・じ・び・ぴ 系）",
      hira: [
        { k: "みゃ", r: "mya", type: "hira", origin: "み ＋ 小さい ゃ → みゃ", w: "みゃく", zh: "脈搏", img: "myaku", emoji: "💓", pair: "ミャ" },
        { k: "みゅ", r: "myu", type: "hira", origin: "み ＋ 小さい ゅ → みゅ", w: "みゅう", zh: "喵嗚（貓叫）", img: "myuu", emoji: "🐈", pair: "ミュ" },
        { k: "みょ", r: "myo", type: "hira", origin: "み ＋ 小さい ょ → みょ", w: "みょうじ", zh: "姓氏", img: "myouji", emoji: "📛", pair: "ミョ" },
        { k: "りゃ", r: "rya", type: "hira", origin: "り ＋ 小さい ゃ → りゃ", w: "りゃく", zh: "省略", img: "ryaku", emoji: "✂️", pair: "リャ" },
        { k: "りゅ", r: "ryu", type: "hira", origin: "り ＋ 小さい ゅ → りゅ", w: "りゅう", zh: "龍", img: "ryuu", emoji: "🐉", pair: "リュ" },
        { k: "りょ", r: "ryo", type: "hira", origin: "り ＋ 小さい ょ → りょ", w: "りょこう", zh: "旅行", img: "ryokou", emoji: "🧳", pair: "リョ" },
        { k: "ぎゃ", r: "gya", type: "hira", origin: "ぎ ＋ 小さい ゃ → ぎゃ", w: "ぎゃく", zh: "相反", img: "gyaku", emoji: "🔄", pair: "ギャ" },
        { k: "ぎゅ", r: "gyu", type: "hira", origin: "ぎ ＋ 小さい ゅ → ぎゅ", w: "ぎゅうにゅう", zh: "牛奶", img: "gyuunyuu", emoji: "🥛", pair: "ギュ" },
        { k: "ぎょ", r: "gyo", type: "hira", origin: "ぎ ＋ 小さい ょ → ぎょ", w: "ぎょせん", zh: "漁船", img: "gyosen", emoji: "🚢", pair: "ギョ" },
        { k: "じゃ", r: "ja", type: "hira", origin: "じ ＋ 小さい ゃ → じゃ", w: "じゃがいも", zh: "馬鈴薯", img: "jagaimo", emoji: "🥔", pair: "ジャ" },
        { k: "じゅ", r: "ju", type: "hira", origin: "じ ＋ 小さい ゅ → じゅ", w: "じゅうどう", zh: "柔道", img: "juudou", emoji: "🥋", pair: "ジュ" },
        { k: "じょ", r: "jo", type: "hira", origin: "じ ＋ 小さい ょ → じょ", w: "じょおう", zh: "女王", img: "joou", emoji: "👸", pair: "ジョ" },
        { k: "びゃ", r: "bya", type: "hira", origin: "び ＋ 小さい ゃ → びゃ", w: "びゃくや", zh: "白夜", img: "byakuya", emoji: "🌌", pair: "ビャ" },
        { k: "びゅ", r: "byu", type: "hira", origin: "び ＋ 小さい ゅ → びゅ", w: "びゅうびゅう", zh: "呼呼（強風）", img: "byuubyuu", emoji: "🌬️", pair: "ビュ" },
        { k: "びょ", r: "byo", type: "hira", origin: "び ＋ 小さい ょ → びょ", w: "びょういん", zh: "醫院", img: "byouin", emoji: "🏥", pair: "ビョ" },
        { k: "ぴゃ", r: "pya", type: "hira", origin: "ぴ ＋ 小さい ゃ → ぴゃ", w: "ぴゃっ", zh: "咻（擬聲）", img: "pya", emoji: "💨", pair: "ピャ" },
        { k: "ぴゅ", r: "pyu", type: "hira", origin: "ぴ ＋ 小さい ゅ → ぴゅ", w: "ぴゅうぴゅう", zh: "咻咻（風哨）", img: "pyuupyuu", emoji: "🌬️", pair: "ピュ" },
        { k: "ぴょ", r: "pyo", type: "hira", origin: "ぴ ＋ 小さい ょ → ぴょ", w: "ぴょんぴょん", zh: "蹦蹦跳（擬態）", img: "pyonpyon", emoji: "🐰", pair: "ピョ" }
      ],
      kata: [
        { k: "ミャ", r: "mya", type: "kata", origin: "ミ ＋ 小さい ャ → ミャ", w: "ミャンマー", zh: "緬甸", img: "myanmaa", emoji: "🗺️", pair: "みゃ" },
        { k: "ミュ", r: "myu", type: "kata", origin: "ミ ＋ 小さい ュ → ミュ", w: "ミュージック", zh: "音樂", img: "myuujikku", emoji: "🎵", pair: "みゅ" },
        { k: "ミョ", r: "myo", type: "kata", origin: "ミ ＋ 小さい ョ → ミョ", w: "ミョウガ", zh: "茗荷", img: "myouga", emoji: "🌱", pair: "みょ" },
        { k: "リャ", r: "rya", type: "kata", origin: "リ ＋ 小さい ャ → リャ", w: "リャク", zh: "簡略（片假名）", img: "ryaku_k", emoji: "📝", pair: "りゃ" },
        { k: "リュ", r: "ryu", type: "kata", origin: "リ ＋ 小さい ュ → リュ", w: "リュック", zh: "背包", img: "ryukku", emoji: "🎒", pair: "りゅ" },
        { k: "リョ", r: "ryo", type: "kata", origin: "リ ＋ 小さい ョ → リョ", w: "リョウリ", zh: "料理（片假名）", img: "ryouri", emoji: "🍳", pair: "りょ" },
        { k: "ギャ", r: "gya", type: "kata", origin: "ギ ＋ 小さい ャ → ギャ", w: "ギャラリー", zh: "畫廊", img: "gyararii", emoji: "🎨", pair: "ぎゃ" },
        { k: "ギュ", r: "gyu", type: "kata", origin: "ギ ＋ 小さい ュ → ギュ", w: "ギュッ", zh: "緊緊地（擬態）", img: "gyutto", emoji: "🤗", pair: "ぎゅ" },
        { k: "ギョ", r: "gyo", type: "kata", origin: "ギ ＋ 小さい ョ → ギョ", w: "ギョウザ", zh: "餃子", img: "gyouza", emoji: "🥟", pair: "ぎょ" },
        { k: "ジャ", r: "ja", type: "kata", origin: "ジ ＋ 小さい ャ → ジャ", w: "ジャム", zh: "果醬", img: "jamu", emoji: "🍯", pair: "じゃ" },
        { k: "ジュ", r: "ju", type: "kata", origin: "ジ ＋ 小さい ュ → ジュ", w: "ジュエリー", zh: "珠寶", img: "juerii", emoji: "💍", pair: "じゅ" },
        { k: "ジョ", r: "jo", type: "kata", origin: "ジ ＋ 小さい ョ → ジョ", w: "ジョギング", zh: "慢跑", img: "jogingu", emoji: "🏃", pair: "じょ" },
        { k: "ビャ", r: "bya", type: "kata", origin: "ビ ＋ 小さい ャ → ビャ", w: "ビャクヤ", zh: "白夜（片假名）", img: "byakuya_k", emoji: "🌌", pair: "びゃ" },
        { k: "ビュ", r: "byu", type: "kata", origin: "ビ ＋ 小さい ュ → ビュ", w: "ビュッフェ", zh: "自助餐", img: "byuffe", emoji: "🍽️", pair: "びゅ" },
        { k: "ビョ", r: "byo", type: "kata", origin: "ビ ＋ 小さい ョ → ビョ", w: "ビョウイン", zh: "醫院（片假名）", img: "byouin_k", emoji: "🏥", pair: "びょ" },
        { k: "ピャ", r: "pya", type: "kata", origin: "ピ ＋ 小さい ャ → ピャ", w: "ピャッ", zh: "咻（片假名擬聲）", img: "pya_k", emoji: "💨", pair: "ぴゃ" },
        { k: "ピュ", r: "pyu", type: "kata", origin: "ピ ＋ 小さい ュ → ピュ", w: "ピューマ", zh: "美洲獅", img: "pyuuma", emoji: "🐆", pair: "ぴゅ" },
        { k: "ピョ", r: "pyo", type: "kata", origin: "ピ ＋ 小さい ョ → ピョ", w: "ピョンピョン", zh: "蹦蹦跳（片假名）", img: "pyonpyon_k", emoji: "🐰", pair: "ぴょ" }
      ]
    }
  ]
};
