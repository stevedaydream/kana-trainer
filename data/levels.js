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
    }
  ]
};
