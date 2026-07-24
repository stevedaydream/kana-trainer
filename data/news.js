/* =========================================================
 * data/news.js — 每日新聞資料包（唯一內容來源）
 * 由 scripts/generate-news.mjs 自動累積產生；前端只渲染。
 * schema 見 docs/ai-news-module-design.md §2。
 * ========================================================= */
window.KANA_NEWS = {
  "packs": [
    {
      "title": {
        "ja": "かわいいパンダの赤ちゃん、名前が決まったよ！",
        "furigana": "かわいいパンダのあかちゃん、なまえがきまったよ！",
        "zh": "可愛熊貓寶寶，名字決定了！",
        "en": "Cute Panda Baby's Name Decided!"
      },
      "source": {
        "title": "かわいいパンダの赤ちゃん、名前が決まったよ！",
        "publisher": "上野動物園 / Ueno Zoo",
        "url": "https://www.ueno-zoo.jp/news/",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "上野動物園に新しいパンダの赤ちゃんが生まれました。名前は「シャンシャン」です。たくさんの人が名前を考えました。動物園は赤ちゃんパンダの成長を楽しみにしています。",
          "furigana": "うえのどうぶつえんにあたらしいパンダのあかちゃんがうまれました。なまえは「シャンシャン」です。たくさんのひとがなまえをかんがえました。どうぶつえんはあかちゃんパンダのせいちょうをたのしみにしています。",
          "zh": "上野動物園誕生了一隻新的熊貓寶寶。牠的名字是「香香」。很多人為牠想了名字。動物園期待著熊貓寶寶的成長。",
          "en": "A new panda baby was born at Ueno Zoo. Its name is \"Xiang Xiang.\" Many people thought of names for it. The zoo is looking forward to the baby panda's growth."
        }
      ],
      "vocab": [
        {
          "word": "動物園",
          "reading": "どうぶつえん",
          "zh": "動物園",
          "en": "zoo",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "私は動物園が好きです。",
            "zh": "我喜歡動物園。"
          }
        },
        {
          "word": "赤ちゃん",
          "reading": "あかちゃん",
          "zh": "嬰兒，寶寶",
          "en": "baby",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "赤ちゃんが寝ています。",
            "zh": "寶寶正在睡覺。"
          }
        },
        {
          "word": "生まれる",
          "reading": "うまれる",
          "zh": "出生",
          "en": "to be born",
          "pos": "verb",
          "jlpt": "N5",
          "example": {
            "ja": "新しい命が生まれました。",
            "zh": "新的生命誕生了。"
          }
        },
        {
          "word": "名前",
          "reading": "なまえ",
          "zh": "名字",
          "en": "name",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "あなたの名前は何ですか。",
            "zh": "你叫什麼名字？"
          }
        },
        {
          "word": "成長",
          "reading": "せいちょう",
          "zh": "成長",
          "en": "growth",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "子どもの成長は早いです。",
            "zh": "孩子的成長很快。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜に〜が生まれる",
          "zh": "在〜出生了〜",
          "en": "Something is born in/at...",
          "example": {
            "ja": "上野動物園にパンダの赤ちゃんが生まれました。",
            "zh": "上野動物園出生了一隻熊貓寶寶。"
          },
          "note": "表示某物在某地誕生。"
        },
        {
          "point": "〜は〜です",
          "zh": "〜是〜",
          "en": "~ is ~",
          "example": {
            "ja": "名前は「シャンシャン」です。",
            "zh": "名字是「香香」。"
          },
          "note": "最基本的肯定句型，用於陳述事實或定義。"
        },
        {
          "point": "〜を楽しみしています",
          "zh": "期待著〜",
          "en": "looking forward to ~",
          "example": {
            "ja": "動物園は赤ちゃんパンダの成長を楽しみにしています。",
            "zh": "動物園期待著熊貓寶寶的成長。"
          },
          "note": "表示對某事物的期待或盼望。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "「動物園」の読み方はどれですか？",
            "zh": "「動物園」的讀音是哪一個？"
          },
          "audioText": "",
          "options": [
            "どうぶつえん",
            "どうぶつえ",
            "どうぶつその",
            "どうぶつねん"
          ],
          "answer": 0,
          "explain": {
            "zh": "「動物園」的正確讀音是「どうぶつえん」。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「赤ちゃん」の英語の意味は何ですか？",
            "zh": "「赤ちゃん」的英文意思是什麼？"
          },
          "audioText": "",
          "options": [
            "child",
            "baby",
            "adult",
            "student"
          ],
          "answer": 1,
          "explain": {
            "zh": "「赤ちゃん」的意思是「baby」。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「上野動物園（　）新しいパンダの赤ちゃんが生まれました。」（括號中應填入哪個助詞？）",
            "zh": "「上野動物園（　）新しいパンダの赤ちゃんが生まれました。」（括號中應該填入哪個助詞？）"
          },
          "audioText": "",
          "options": [
            "で",
            "に",
            "を",
            "と"
          ],
          "answer": 1,
          "explain": {
            "zh": "表示事物發生的地點時，常用「に」。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "上野動物園に新しいパンダの赤ちゃんが生まれました。",
            "zh": "請聽錄音並選出正確的句子。"
          },
          "audioText": "うえのどうぶつえんにあたらしいパンダのあかちゃんがうまれました。",
          "options": [
            "上野動物園に新しいパンダの赤ちゃんが生まれました。",
            "上野動物園は新しいパンダの赤ちゃんが生まれました。",
            "上野動物園と新しいパンダの赤ちゃんが生まれました。",
            "上野動物園も新しいパンダの赤ちゃんが生まれました。"
          ],
          "answer": 0,
          "explain": {
            "zh": "錄音內容是「上野動物園に新しいパンダの赤ちゃんが生まれました。」"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "動物園は赤ちゃんパンダの（　）を楽しみにしています。",
            "zh": "動物園期待著熊貓寶寶的（　）。"
          },
          "audioText": "",
          "options": [
            "名前",
            "食べ物",
            "成長",
            "遊び"
          ],
          "answer": 2,
          "explain": {
            "zh": "根據文章內容，動物園期待的是熊貓寶寶的「成長」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "名前はシャンシャンです。",
          "furigana": "なまえはシャンシャンです。",
          "accept": [
            "なまえはシャンシャンです",
            "名前はシャンシャンです"
          ],
          "hint": "牠的名字是香香。"
        }
      ],
      "speaking": [
        {
          "ja": "パンダの赤ちゃん、かわいいですね。",
          "furigana": "パンダのあかちゃん、かわいいですね。",
          "zh": "熊貓寶寶很可愛呢。",
          "focus": "intonation",
          "linking": "「パンダの」的「の」讀音較輕，幾乎與「パンダ」連讀。"
        }
      ],
      "id": "daily-2026-07-24-N5",
      "date": "2026-07-24",
      "level": "N5"
    },
    {
      "title": {
        "ja": "かわいいパンダの赤ちゃん、名前は？",
        "furigana": "かわいいパンダのあかちゃん、なまえは？",
        "zh": "可爱熊猫宝宝，名字是什么？",
        "en": "Cute Panda Baby, What's its Name?"
      },
      "source": {
        "title": "アドベンチャーワールドの赤ちゃんパンダ",
        "publisher": "和歌山経済新聞",
        "url": "https://wakayama.keizai.biz/headline/3874/",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "和歌山県のテーマパーク「アドベンチャーワールド」で、新しいパンダの赤ちゃんが生まれました。名前は「楓浜」です。とてもかわいいです。",
          "furigana": "わかやまけんのテーマパーク「アドベンチャーワールド」で、あたらしいパンダのあかちゃんがうまれました。なまえは「ふうひん」です。とてもかわいいです。",
          "zh": "在和歌山縣的主題公園「冒險世界」裡，一隻新的熊貓寶寶出生了。牠的名字是「楓浜」。牠非常可愛。",
          "en": "At the theme park 'Adventure World' in Wakayama Prefecture, a new panda baby was born. Its name is 'Fuhin'. It is very cute."
        },
        {
          "ja": "楓浜は、去年11月に生まれました。今、体重は8キロくらいです。元気に育っています。たくさんの人が楓浜を見に行きます。",
          "furigana": "ふうひんは、きょねん11がつにうまれました。いま、たいじゅうは8キロくらいです。げんきにそだっています。たくさんのひとがふうひんをみにいきます。",
          "zh": "楓浜是去年11月出生的。現在，牠的體重約8公斤。牠健康地成長著。很多人都去看楓浜。",
          "en": "Fuhin was born last November. Now, its weight is about 8 kg. It is growing up healthily. Many people go to see Fuhin."
        }
      ],
      "vocab": [
        {
          "word": "テーマパーク",
          "reading": "テーマパーク",
          "zh": "主题公园",
          "en": "theme park",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "テーマパークは楽しいです。",
            "zh": "主题公园很有趣。"
          }
        },
        {
          "word": "赤ちゃん",
          "reading": "あかちゃん",
          "zh": "婴儿",
          "en": "baby",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "赤ちゃんは小さいです。",
            "zh": "宝宝很小。"
          }
        },
        {
          "word": "生まれる",
          "reading": "うまれる",
          "zh": "出生",
          "en": "to be born",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "私は日本で生まれました。",
            "zh": "我在日本出生。"
          }
        },
        {
          "word": "去年",
          "reading": "きょねん",
          "zh": "去年",
          "en": "last year",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "去年、旅行に行きました。",
            "zh": "去年，我去了旅行。"
          }
        },
        {
          "word": "元気",
          "reading": "げんき",
          "zh": "健康；有精神",
          "en": "healthy; energetic",
          "pos": "形容動詞",
          "jlpt": "N5",
          "example": {
            "ja": "田中さんはいつも元気です。",
            "zh": "田中先生总是很有精神。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜で",
          "zh": "表示地点",
          "en": "indicates location of an action",
          "example": {
            "ja": "デパートで買いました。",
            "zh": "在百货公司买的。"
          },
          "note": "用于表示动作发生的场所。"
        },
        {
          "point": "〜は",
          "zh": "表示主题",
          "en": "indicates the topic of the sentence",
          "example": {
            "ja": "私は学生です。",
            "zh": "我是学生。"
          },
          "note": "提示句子的主题，读作「wa」。"
        },
        {
          "point": "〜です",
          "zh": "是",
          "en": "to be (polite form)",
          "example": {
            "ja": "これは本です。",
            "zh": "这是书。"
          },
          "note": "礼貌的肯定句结尾。"
        },
        {
          "point": "〜くらい",
          "zh": "大约；左右",
          "en": "approximately; about",
          "example": {
            "ja": "30分くらいかかります。",
            "zh": "大约需要30分钟。"
          },
          "note": "表示数量、时间等的概略。"
        },
        {
          "point": "〜に行きます",
          "zh": "去（做某事）",
          "en": "go to (do something)",
          "example": {
            "ja": "映画を見に行きます。",
            "zh": "去看电影。"
          },
          "note": "动词ます形 + に行きます，表示目的。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "「アドベンチャーワールド」はどこにありますか？",
            "zh": "「冒险世界」在哪里？"
          },
          "audioText": "",
          "options": [
            "東京",
            "大阪",
            "和歌山",
            "京都"
          ],
          "answer": 2,
          "explain": {
            "zh": "根据文章，它在和歌山县。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「赤ちゃん」の読み方はどれですか？",
            "zh": "「赤ちゃん」的读音是哪个？"
          },
          "audioText": "",
          "options": [
            "あかちゃん",
            "あかぢゃん",
            "あかたん",
            "あかさん"
          ],
          "answer": 0,
          "explain": {
            "zh": "「赤ちゃん」的正确读音是「あかちゃん」。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「たくさんの人が楓浜（　　）見に行きます。」カッコに入る正しい助詞は何ですか？",
            "zh": "「很多人（　　）去看枫浜。」括号里应填入哪个正确的助词？"
          },
          "audioText": "",
          "options": [
            "を",
            "が",
            "に",
            "で"
          ],
          "answer": 0,
          "explain": {
            "zh": "动词「見ます」的直接宾语需要用助词「を」。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "楓浜は、去年11月に（　　）。",
            "zh": "枫浜是去年11月（　　）。"
          },
          "audioText": "",
          "options": [
            "行きました",
            "生まれました",
            "食べました",
            "見ました"
          ],
          "answer": 1,
          "explain": {
            "zh": "根据文章，枫浜是去年11月出生的，所以填入「生まれました」。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "パンダの赤ちゃんは今、体重はどのくらいですか？",
            "zh": "熊猫宝宝现在体重大概是多少？"
          },
          "audioText": "パンダの赤ちゃんは今、体重は8キロくらいです。",
          "options": [
            "1キロ",
            "5キロ",
            "8キロ",
            "10キロ"
          ],
          "answer": 2,
          "explain": {
            "zh": "听力内容提到「体重は8キロくらいです」，所以是8公斤。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "名前は楓浜です。",
          "furigana": "なまえはふうひんです。",
          "accept": [
            "なまえはふうひんです。",
            "名前は楓浜です。"
          ],
          "hint": "牠叫枫浜。"
        },
        {
          "ja": "とてもかわいいです。",
          "furigana": "とてもかわいいです。",
          "accept": [
            "とてもかわいいです。"
          ],
          "hint": "非常可爱。"
        }
      ],
      "speaking": [
        {
          "ja": "楓浜は元気に育っています。",
          "furigana": "ふうひんはげんきにそだっています。",
          "zh": "枫浜健康地成长着。",
          "focus": "intonation",
          "linking": "「楓浜は」は「ふうひんわ」と発音されることがあります。"
        },
        {
          "ja": "たくさんの人が見に行きます。",
          "furigana": "たくさんのひとがみにいきます。",
          "zh": "很多人都去看。",
          "focus": "pacing",
          "linking": "「人が」は「ひとが」とスムーズにつなげて発音しましょう。"
        }
      ],
      "id": "daily-2026-07-23-N5",
      "date": "2026-07-23",
      "level": "N5"
    },
    {
      "title": {
        "ja": "かわいいパンダの赤ちゃん、名前は「暁暁」と「蕾蕾」！",
        "furigana": "かわいいパンダのあかちゃん、なまえは「シャオシャオ」と「レイレイ」！",
        "zh": "可愛的熊貓寶寶，名字是「曉曉」和「蕾蕾」！",
        "en": "Cute Panda Babies Named \"Xiao Xiao\" and \"Lei Lei\"!"
      },
      "source": {
        "title": "上野動物園の双子パンダ、名前は「シャオシャオ」と「レイレイ」",
        "publisher": "NHKニュース",
        "url": "https://www3.nhk.or.jp/news/html/20211008/k10013300581000.html",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "上野動物園に、パンダの赤ちゃんが二人います。一人は男の子で、もう一人は女の子です。みんなで名前を考えました。たくさんの人がアイデアを出しました。そして、男の子の名前は「シャオシャオ」、女の子の名前は「レイレイ」に決まりました。とてもかわいい名前ですね。",
          "furigana": "うえのどうぶつえんに、パンダのあかちゃんがふたりいます。ひとりは男(おとこ)の子(こ)で、もうひとりは女(おんな)の子(こ)です。みんなでなまえをかんがえました。たくさんの人(ひと)がアイデアをだしました。そして、男(おとこ)の子(こ)のなまえは「シャオシャオ」、女(おんな)の子(こ)のなまえは「レイレイ」にきまりました。とてもかわいいなまえですね。",
          "zh": "上野動物園有兩隻熊貓寶寶。一隻是男生，另一隻是女生。大家一起想了名字。很多人提出了想法。然後，男寶寶的名字決定是「曉曉」，女寶寶的名字決定是「蕾蕾」。真是非常可愛的名字呢。",
          "en": "There are two panda babies at Ueno Zoo. One is a boy, and the other is a girl. Everyone thought about names. Many people gave ideas. Then, the boy's name was decided as \"Xiao Xiao,\" and the girl's name was decided as \"Lei Lei.\" They are very cute names."
        }
      ],
      "vocab": [
        {
          "word": "動物園",
          "reading": "どうぶつえん",
          "zh": "動物園",
          "en": "zoo",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "私(わたし)は動物園(どうぶつえん)に行(い)きたいです。",
            "zh": "我想去動物園。"
          }
        },
        {
          "word": "赤ちゃん",
          "reading": "あかちゃん",
          "zh": "嬰兒、寶寶",
          "en": "baby",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "この赤ちゃん(あかちゃん)はとても可愛(かわい)いです。",
            "zh": "這個寶寶很可愛。"
          }
        },
        {
          "word": "二人",
          "reading": "ふたり",
          "zh": "兩個人",
          "en": "two people",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "私(わたし)たちは二人(ふたり)で公園(こうえん)に行(い)きました。",
            "zh": "我們兩個人去了公園。"
          }
        },
        {
          "word": "名前",
          "reading": "なまえ",
          "zh": "名字",
          "en": "name",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "あなたのお名前(なまえ)は何(なん)ですか。",
            "zh": "你的名字是什麼？"
          }
        },
        {
          "word": "決まります",
          "reading": "きまります",
          "zh": "決定",
          "en": "to be decided",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "来週(らいしゅう)の予定(よてい)が決(き)まりました。",
            "zh": "下週的計畫決定了。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜にいます / あります",
          "zh": "表示「在...有...」",
          "en": "Indicates existence of animate/inanimate objects at a location.",
          "example": {
            "ja": "部屋(へや)に猫(ねこ)がいます。",
            "zh": "房間裡有貓。"
          },
          "note": "「います」用於人或動物，「あります」用於物品或植物。"
        },
        {
          "point": "〜で",
          "zh": "表示「以...方式/手段」或「在...場所」",
          "en": "Indicates means/method or location of an action.",
          "example": {
            "ja": "みんなでご飯(はん)を食(た)べます。",
            "zh": "大家一起吃飯。"
          },
          "note": "在這裡表示「大家一起」的方式。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "上野動物園にいるのは、何の赤ちゃんですか？",
            "zh": "在上野動物園裡的是什麼的寶寶？"
          },
          "options": [
            "犬(いぬ)",
            "猫(ねこ)",
            "パンダ",
            "鳥(とり)"
          ],
          "answer": 2,
          "explain": {
            "zh": "新聞提到上野動物園有熊貓寶寶。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「赤ちゃん」の正しい読み方を選んでください。",
            "zh": "請選擇「赤ちゃん」的正確讀音。"
          },
          "options": [
            "おとな",
            "あかちゃん",
            "こども",
            "せんせい"
          ],
          "answer": 1,
          "explain": {
            "zh": "「赤ちゃん」的讀音是「あかちゃん」。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "私(わたし)の家(いえ)____、猫(ねこ)がいます。空欄に何が入りますか？",
            "zh": "我的家____，有貓。空格中應填入什麼？"
          },
          "options": [
            "に",
            "で",
            "を",
            "と"
          ],
          "answer": 0,
          "explain": {
            "zh": "表示存在於某地點時使用助詞「に」。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "パンダの赤ちゃんは、男の子と女の子、____います。",
            "zh": "熊貓寶寶有男生和女生，____。"
          },
          "audioText": "パンダの赤ちゃんは、男の子と女の子、ふたりいます。",
          "options": [
            "一人(ひとり)",
            "二人(ふたり)",
            "三人(さんにん)",
            "四人(よにん)"
          ],
          "answer": 1,
          "explain": {
            "zh": "新聞中提到有「二人」熊貓寶寶。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "「上野動物園に、パンダの赤ちゃんが二人います。」この文を聞いて、正しい意味を選んでください。",
            "zh": "請聽「上野動物園に、パンダの赤ちゃんが二人います。」這句話，並選出正確的意思。"
          },
          "audioText": "うえのどうぶつえんに、パンダのあかちゃんがふたりいます。",
          "options": [
            "上野動物園有兩隻熊貓。",
            "上野動物園有兩位飼養員。",
            "上野動物園有兩個熊貓玩偶。",
            "上野動物園只有一隻熊貓寶寶。"
          ],
          "answer": 0,
          "explain": {
            "zh": "這句話的意思是「上野動物園有兩隻熊貓寶寶」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "上野動物園にパンダの赤ちゃんが二人います。",
          "furigana": "うえのどうぶつえんにパンダのあかちゃんがふたりいます。",
          "accept": [
            "上野動物園にパンダの赤ちゃんが二人います",
            "うえのどうぶつえんにパンダのあかちゃんがふたりいます"
          ],
          "hint": "動物園裡有兩隻熊貓寶寶。"
        }
      ],
      "speaking": [
        {
          "ja": "とてもかわいい名前ですね。",
          "furigana": "とてもかわいいなまえですね。",
          "zh": "真是非常可愛的名字呢。",
          "focus": "intonation",
          "linking": "無"
        }
      ],
      "id": "daily-2026-07-22-N5",
      "date": "2026-07-22",
      "level": "N5"
    },
    {
      "title": {
        "ja": "桜が咲きました",
        "furigana": "さくらがさきました",
        "zh": "櫻花開了",
        "en": "Cherry Blossoms Have Bloomed"
      },
      "source": {
        "title": "全国の桜開花情報",
        "publisher": "ウェザーニュース",
        "url": "https://weathernews.jp/sakura/news/37603/",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "日本で桜が咲き始めました。",
          "furigana": "にほんでさくらがさきはじめました。",
          "zh": "日本的櫻花開始開了。",
          "en": "Cherry blossoms have started to bloom in Japan."
        },
        {
          "ja": "東京では、3月29日に桜が満開になりました。",
          "furigana": "とうきょうでは、さんがつにじゅうくにちにさくらがまんかいになりました。",
          "zh": "在東京，櫻花在3月29日盛開了。",
          "en": "In Tokyo, cherry blossoms reached full bloom on March 29th."
        },
        {
          "ja": "たくさんの人が桜を見に行きます。",
          "furigana": "たくさんのひとがさくらをみにいきます。",
          "zh": "很多人去看櫻花。",
          "en": "Many people go to see the cherry blossoms."
        },
        {
          "ja": "桜はとてもきれいです。",
          "furigana": "さくらはとてもきれいです。",
          "zh": "櫻花非常漂亮。",
          "en": "Cherry blossoms are very beautiful."
        },
        {
          "ja": "春の訪れを感じます。",
          "furigana": "はるのおとずれをかんじます。",
          "zh": "感受到了春天的到來。",
          "en": "We feel the arrival of spring."
        }
      ],
      "vocab": [
        {
          "word": "桜",
          "reading": "さくら",
          "zh": "櫻花",
          "en": "cherry blossom",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "桜が咲きました。",
            "zh": "櫻花開了。"
          }
        },
        {
          "word": "咲きます",
          "reading": "さきます",
          "zh": "開花",
          "en": "to bloom",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "花が咲きます。",
            "zh": "花開了。"
          }
        },
        {
          "word": "満開",
          "reading": "まんかい",
          "zh": "盛開",
          "en": "full bloom",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "桜が満開です。",
            "zh": "櫻花盛開了。"
          }
        },
        {
          "word": "見に行きます",
          "reading": "みにいきます",
          "zh": "去看",
          "en": "to go to see",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "映画を見に行きます。",
            "zh": "去看電影。"
          }
        },
        {
          "word": "きれい",
          "reading": "きれい",
          "zh": "漂亮、乾淨",
          "en": "beautiful, clean",
          "pos": "形容動詞",
          "jlpt": "N5",
          "example": {
            "ja": "きれいな花です。",
            "zh": "是漂亮的花。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜始めます (~hajimemasu)",
          "zh": "表示動作的開始",
          "en": "Indicates the start of an action.",
          "example": {
            "ja": "桜が咲き始めました。",
            "zh": "櫻花開始開了。"
          },
          "note": "動詞ます形 + 始めます"
        },
        {
          "point": "〜になります (~ni narimasu)",
          "zh": "表示狀態的變化、成為",
          "en": "Indicates a change of state, to become.",
          "example": {
            "ja": "桜が満開になりました。",
            "zh": "櫻花盛開了。"
          },
          "note": "名詞/な形容詞詞幹 + になります；い形容詞去い + くなります"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "「桜が咲きました」の読み方はどれですか。",
            "zh": "「桜が咲きました」的讀音是哪一個？"
          },
          "options": [
            "さくらがさきました",
            "はながさきました",
            "さくらがひらきました",
            "さくらがえみました"
          ],
          "answer": 0,
          "explain": {
            "zh": "「桜」讀作「さくら」，「咲きました」讀作「さきました」。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「満開」の意味は何ですか。",
            "zh": "「満開」的意思是什麼？"
          },
          "options": [
            "開花",
            "盛開",
            "落花",
            "新芽"
          ],
          "answer": 1,
          "explain": {
            "zh": "「満開（まんかい）」的意思是「盛開、全開」。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「日本で桜が______。」に適切な動詞の形を選びなさい。",
            "zh": "請選擇填入「日本で桜が______。」的正確動詞形式。"
          },
          "options": [
            "咲き始めました",
            "咲きます",
            "咲きました",
            "咲かない"
          ],
          "answer": 0,
          "explain": {
            "zh": "「咲き始めました」表示「開始開花」，符合文章內容和語法「動詞ます形 + 始めます」。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "東京では、3月29日に桜が______になりました。",
            "zh": "在東京，櫻花在3月29日______了。"
          },
          "options": [
            "開花",
            "満開",
            "散る",
            "美しい"
          ],
          "answer": 1,
          "explain": {
            "zh": "根據文章，東京的櫻花在3月29日「盛開」了，因此填入「満開（まんかい）」。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "「春の訪れを感じます。」の日本語を聞いて、正しい意味を選んでください。",
            "zh": "請聽「春の訪れを感じます。」的日語，並選擇正確的中文意思。"
          },
          "audioText": "春の訪れを感じます。",
          "options": [
            "春天來了。",
            "感受到了春天的到來。",
            "春天很熱。",
            "春天會下雨。"
          ],
          "answer": 1,
          "explain": {
            "zh": "「春の訪れを感じます。」的意思是「感受到了春天的到來」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "桜が咲きました。",
          "furigana": "さくらがさきました。",
          "accept": [
            "さくらがさきました",
            "桜が咲きました"
          ],
          "hint": "關於櫻花開花的句子"
        },
        {
          "ja": "東京では、桜が満開です。",
          "furigana": "とうきょうでは、さくらがまんかいです。",
          "accept": [
            "とうきょうでは、さくらがまんかいです",
            "東京では、桜が満開です"
          ],
          "hint": "關於東京櫻花盛開的句子"
        }
      ],
      "speaking": [
        {
          "ja": "桜はとてもきれいです。",
          "furigana": "さくらはとてもきれいです。",
          "zh": "櫻花非常漂亮。",
          "focus": "intonation",
          "linking": ""
        },
        {
          "ja": "春の訪れを感じます。",
          "furigana": "はるのおとずれをかんじます。",
          "zh": "感受到了春天的到來。",
          "focus": "pacing",
          "linking": ""
        }
      ],
      "id": "daily-2026-07-21-N5",
      "date": "2026-07-21",
      "level": "N5"
    },
    {
      "id": "sample-panda",
      "date": "2026-07-21",
      "level": "N5",
      "source": {
        "title": "（教學範例）上野動物園のパンダ",
        "publisher": "五十音練習器・原創教學素材",
        "url": "",
        "note": "本則為原創、分級改寫之新聞式短文，非重製任何特定報導。"
      },
      "title": {
        "ja": "上野動物園に赤ちゃんパンダ",
        "furigana": "うえのどうぶつえんに あかちゃんパンダ",
        "zh": "上野動物園有了熊貓寶寶",
        "en": "A baby panda at Ueno Zoo"
      },
      "summary": [
        {
          "ja": "東京の上野動物園で、赤ちゃんパンダが生まれました。",
          "furigana": "とうきょうの うえのどうぶつえんで、あかちゃんパンダが うまれました。",
          "zh": "在東京的上野動物園，誕生了一隻熊貓寶寶。",
          "en": "A baby panda was born at Ueno Zoo in Tokyo."
        },
        {
          "ja": "赤ちゃんはとても小さくて、体重は二百グラムです。",
          "furigana": "あかちゃんは とても ちいさくて、たいじゅうは にひゃくグラムです。",
          "zh": "寶寶非常小，體重是兩百公克。",
          "en": "The baby is very small and weighs 200 grams."
        },
        {
          "ja": "動物園は十二月に赤ちゃんの名前を発表します。",
          "furigana": "どうぶつえんは じゅうにがつに あかちゃんの なまえを はっぴょうします。",
          "zh": "動物園將在十二月公布寶寶的名字。",
          "en": "The zoo will announce the baby's name in December."
        },
        {
          "ja": "たくさんの人が赤ちゃんパンダを見に来るでしょう。",
          "furigana": "たくさんの ひとが あかちゃんパンダを みに くるでしょう。",
          "zh": "應該會有很多人來看熊貓寶寶吧。",
          "en": "Many people will probably come to see the baby panda."
        }
      ],
      "vocab": [
        {
          "word": "動物園",
          "reading": "どうぶつえん",
          "zh": "動物園",
          "en": "zoo",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "日曜日に動物園へ行きます。",
            "zh": "星期日要去動物園。"
          }
        },
        {
          "word": "赤ちゃん",
          "reading": "あかちゃん",
          "zh": "嬰兒、寶寶",
          "en": "baby",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "赤ちゃんが寝ています。",
            "zh": "寶寶正在睡覺。"
          }
        },
        {
          "word": "生まれる",
          "reading": "うまれる",
          "zh": "出生",
          "en": "to be born",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "子供が生まれました。",
            "zh": "孩子出生了。"
          }
        },
        {
          "word": "体重",
          "reading": "たいじゅう",
          "zh": "體重",
          "en": "body weight",
          "pos": "名詞",
          "jlpt": "N4",
          "example": {
            "ja": "体重をはかります。",
            "zh": "量體重。"
          }
        },
        {
          "word": "名前",
          "reading": "なまえ",
          "zh": "名字",
          "en": "name",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "名前を書いてください。",
            "zh": "請寫名字。"
          }
        },
        {
          "word": "発表",
          "reading": "はっぴょう",
          "zh": "發表、公布",
          "en": "announcement",
          "pos": "名詞",
          "jlpt": "N4",
          "example": {
            "ja": "結果を発表します。",
            "zh": "公布結果。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜でしょう",
          "zh": "應該～吧（推測）",
          "en": "probably / will likely",
          "example": {
            "ja": "あしたは雨でしょう。",
            "zh": "明天應該會下雨吧。"
          },
          "note": "對未確定的事表示推測。"
        },
        {
          "point": "〜を見に行く／来る",
          "zh": "去／來看～（目的）",
          "en": "go/come to see ~",
          "example": {
            "ja": "映画を見に行きます。",
            "zh": "去看電影。"
          },
          "note": "動詞ます形＋に＋行く/来る，表示移動的目的。"
        }
      ],
      "quiz": [
        {
          "type": "listening",
          "prompt": {
            "ja": "",
            "zh": "聽發音，選出正確的意思"
          },
          "audioText": "あかちゃんパンダが うまれました。",
          "options": [
            "誕生了熊貓寶寶",
            "熊貓寶寶生病了",
            "熊貓寶寶睡著了",
            "熊貓寶寶不見了"
          ],
          "answer": 0,
          "explain": {
            "zh": "「生まれました」是「生まれる（出生）」的過去式。"
          }
        },
        {
          "type": "reading",
          "prompt": {
            "ja": "赤ちゃんパンダは どこで 生まれましたか。",
            "zh": "熊貓寶寶在哪裡出生？"
          },
          "options": [
            "上野動物園",
            "京都",
            "北海道",
            "富士山"
          ],
          "answer": 0,
          "explain": {
            "zh": "短文第一句：東京の上野動物園で生まれました。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「体重」の意味は？",
            "zh": "「体重」的意思是？"
          },
          "options": [
            "體重",
            "身高",
            "年齡",
            "名字"
          ],
          "answer": 0,
          "explain": {
            "zh": "体重（たいじゅう）＝體重。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "あしたは 雨（　）。",
            "zh": "選出正確的推測說法"
          },
          "options": [
            "でしょう",
            "でした",
            "ますか",
            "ください"
          ],
          "answer": 0,
          "explain": {
            "zh": "推測用「〜でしょう」：應該～吧。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "パンダ（　）見に 行きます。",
            "zh": "選出正確的助詞"
          },
          "options": [
            "を",
            "に",
            "で",
            "と"
          ],
          "answer": 0,
          "explain": {
            "zh": "受詞＋を＋見に行く：を見に行く。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "あかちゃんは とても ちいさいです。",
          "furigana": "あかちゃんは とても ちいさいです。",
          "accept": [
            "あかちゃんはとてもちいさいです",
            "赤ちゃんはとても小さいです"
          ],
          "hint": "寶寶很小。"
        },
        {
          "ja": "どうぶつえんへ いきます。",
          "furigana": "どうぶつえんへ いきます。",
          "accept": [
            "どうぶつえんへいきます",
            "動物園へ行きます",
            "どうぶつえんにいきます"
          ],
          "hint": "去動物園。"
        }
      ],
      "speaking": [
        {
          "ja": "赤ちゃんパンダが 生まれました。",
          "furigana": "あかちゃんパンダが うまれました。",
          "zh": "誕生了熊貓寶寶。",
          "focus": "intonation",
          "linking": "「が」輕、句尾「ました」下降。"
        },
        {
          "ja": "とても 小さくて かわいいです。",
          "furigana": "とても ちいさくて かわいいです。",
          "zh": "又小又可愛。",
          "focus": "pacing",
          "linking": "「小さくて」在て處微停。"
        },
        {
          "ja": "動物園へ 見に 行きたいです。",
          "furigana": "どうぶつえんへ みに いきたいです。",
          "zh": "想去動物園看。",
          "focus": "intonation",
          "linking": "「見に行きたい」一氣呵成。"
        }
      ]
    }
  ]
};
