/* =========================================================
 * data/news.js — 每日新聞資料包（唯一內容來源）
 * 由 scripts/generate-news.mjs 自動累積產生；前端只渲染。
 * schema 見 docs/ai-news-module-design.md §2。
 * ========================================================= */
window.KANA_NEWS = {
  "packs": [
    {
      "title": {
        "ja": "かわいいパンダの赤ちゃん、名前は「シャオシャオ」と「レイレイ」！",
        "furigana": "かわいいパンダのあかちゃん、なまえは「シャオシャオ」と「レイレイ」！",
        "zh": "可愛熊貓寶寶，名字是「曉曉」和「蕾蕾」！",
        "en": "Cute Panda Babies Named 'Xiao Xiao' and 'Lei Lei'!"
      },
      "source": {
        "title": "上野動物園の双子パンダ、名前は「シャオシャオ」と「レイレイ」に決定！",
        "publisher": "東京新聞",
        "url": "https://www.tokyo-np.co.jp/article/135676",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "上野動物園に、パンダの赤ちゃんが二人います。この二人は双子です。男の子と女の子です。名前は「シャオシャオ」と「レイレイ」に決まりました。たくさんの人が名前を考えました。動物園は、みんなに感謝しています。赤ちゃんパンダは、とてもかわいいです。",
          "furigana": "うえのどうぶつえんに、パンダのあかちゃんがふたりいます。このふたりはふたごです。おとこのことおんなのこです。なまえは「シャオシャオ」と「レイレイ」にきまりました。たくさんのひとがなまえをかんがえました。どうぶつえんは、みんなにかんしゃしています。あかちゃんパンダは、とてもかわいいです。",
          "zh": "在上野動物園，有兩隻熊貓寶寶。這兩隻是雙胞胎。一隻是男生，一隻是女生。名字決定是「曉曉」和「蕾蕾」。很多人想了名字。動物園感謝大家。熊貓寶寶非常可愛。",
          "en": "At Ueno Zoo, there are two panda babies. These two are twins. One is a boy and one is a girl. Their names have been decided as 'Xiao Xiao' and 'Lei Lei'. Many people thought of names. The zoo is grateful to everyone. The baby pandas are very cute."
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
            "ja": "動物園にパンダがいます。",
            "zh": "動物園裡有熊貓。"
          }
        },
        {
          "word": "赤ちゃん",
          "reading": "あかちゃん",
          "zh": "嬰兒",
          "en": "baby",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "かわいい赤ちゃんですね。",
            "zh": "真是可愛的寶寶呢。"
          }
        },
        {
          "word": "双子",
          "reading": "ふたご",
          "zh": "雙胞胎",
          "en": "twins",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "彼らは双子です。",
            "zh": "他們是雙胞胎。"
          }
        },
        {
          "word": "決まる",
          "reading": "きまる",
          "zh": "決定",
          "en": "to be decided",
          "pos": "verb",
          "jlpt": "N5",
          "example": {
            "ja": "名前が決まりました。",
            "zh": "名字決定了。"
          }
        },
        {
          "word": "感謝する",
          "reading": "かんしゃする",
          "zh": "感謝",
          "en": "to thank, to be grateful",
          "pos": "verb",
          "jlpt": "N5",
          "example": {
            "ja": "みんなに感謝します。",
            "zh": "感謝大家。"
          }
        }
      ],
      "grammar": [
        {
          "point": "～に決まる",
          "zh": "決定為～",
          "en": "to be decided as ~",
          "example": {
            "ja": "名前は「シャオシャオ」に決まりました。",
            "zh": "名字決定為「曉曉」了。"
          },
          "note": "表示某事被決定或確定下來。常用於被動語態。"
        },
        {
          "point": "～がいます",
          "zh": "有～（指人或動物）",
          "en": "there is/are ~ (for animate objects)",
          "example": {
            "ja": "パンダの赤ちゃんが二人います。",
            "zh": "有兩隻熊貓寶寶。"
          },
          "note": "用於表示人或動物的存在，與「～があります」（用於無生命物體）相對。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "「動物園」の正しい読み方はどれですか？",
            "zh": "「動物園」的正確讀法是哪個？"
          },
          "audioText": "",
          "options": [
            "どうぶつえん",
            "どぶつえん",
            "どうぶえん",
            "どうぶつぜん"
          ],
          "answer": 0,
          "explain": {
            "zh": "「動物園」的正確讀法是「どうぶつえん」。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「赤ちゃん」は日本語で何ですか？",
            "zh": "「Baby」用日語怎麼說？"
          },
          "audioText": "",
          "options": [
            "こども",
            "おとな",
            "あかちゃん",
            "ともだち"
          ],
          "answer": 2,
          "explain": {
            "zh": "「赤ちゃん」是「baby」的意思。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「上野動物園に、パンダの赤ちゃんが二人＿＿＿＿。」に入る正しい言葉を選んでください。",
            "zh": "請選擇填入「上野動物園に、パンダの赤ちゃんが二人＿＿＿＿。」的正確詞語。"
          },
          "audioText": "",
          "options": [
            "あります",
            "います",
            "します",
            "できます"
          ],
          "answer": 1,
          "explain": {
            "zh": "「います」用於表示人或動物的存在。「あります」用於無生命物體。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "この文を聞いて、正しい意味を選んでください：「名前はシャオシャオに決まりました。」",
            "zh": "請聽此句並選擇正確的含義：「名前はシャオシャオに決まりました。」"
          },
          "audioText": "名前はシャオシャオに決まりました。",
          "options": [
            "The name is Xiao Xiao.",
            "The name was decided as Xiao Xiao.",
            "I decided on the name Xiao Xiao.",
            "Xiao Xiao decided the name."
          ],
          "answer": 1,
          "explain": {
            "zh": "「～に決まりました」表示「被決定為～」。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "動物園は、みんなに＿＿＿＿しています。",
            "zh": "動物園＿＿＿＿大家。"
          },
          "audioText": "",
          "options": [
            "大好き",
            "感謝",
            "有名",
            "嬉しい"
          ],
          "answer": 1,
          "explain": {
            "zh": "根據文章內容，動物園感謝大家為熊貓寶寶想名字。「感謝する」是正確的動詞。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "パンダの赤ちゃんはとてもかわいいです。",
          "furigana": "パンダのあかちゃんはとてもかわいいです。",
          "accept": [
            "パンダのあかちゃんはとてもかわいいです。",
            "パンダの赤ちゃんはとてもかわいいです。"
          ],
          "hint": "關於熊貓寶寶的形容詞"
        }
      ],
      "speaking": [
        {
          "ja": "上野動物園に、パンダの赤ちゃんが二人います。",
          "furigana": "うえのどうぶつえんに、パンダのあかちゃんがふたりいます。",
          "zh": "在上野動物園，有兩隻熊貓寶寶。",
          "focus": "intonation",
          "linking": "「動物園に」的「に」輕讀"
        }
      ],
      "id": "daily-2026-07-30-N5",
      "date": "2026-07-30",
      "level": "N5"
    },
    {
      "title": {
        "ja": "桜の開花、日本で始まる",
        "furigana": "さくらのかいか、にほんではじまる",
        "zh": "櫻花開花，在日本開始了",
        "en": "Cherry Blossoms Start Blooming in Japan"
      },
      "source": {
        "title": "日本全国の桜の開花情報",
        "publisher": "ウェザーニュース",
        "url": "https://weathernews.jp/sakura/",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "日本で桜の花が咲き始めました。これは春が来たことを知らせます。東京では、靖国神社に桜があります。この桜は、開花を測るための基準です。今年は、例年より少し早く咲きました。多くの人が桜を見に行きます。",
          "furigana": "にほんでさくらのはながさきはじめました。これははるがきたことをしらせます。とうきょうでは、やすくにじんじゃにさくらがあります。このさくらは、かいかをはかるためのきじゅんです。ことしは、れいねんよりすこしはやくさきました。おおくのひとがさくらをみにいきます。",
          "zh": "日本的櫻花開始開花了。這預告著春天來了。在東京，靖國神社有櫻花。這棵櫻花是測量開花的標準。今年，它比往年開得稍微早一些。很多人都會去看櫻花。",
          "en": "Cherry blossoms have started blooming in Japan. This announces that spring has arrived. In Tokyo, there are cherry trees at Yasukuni Shrine. This cherry tree is a standard for measuring the blooming. This year, it bloomed a little earlier than usual. Many people go to see the cherry blossoms."
        }
      ],
      "vocab": [
        {
          "word": "桜",
          "reading": "さくら",
          "zh": "櫻花",
          "en": "cherry blossom",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "桜の花がとてもきれいです。",
            "zh": "櫻花非常漂亮。"
          }
        },
        {
          "word": "開花",
          "reading": "かいか",
          "zh": "開花",
          "en": "blooming, flowering",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "桜の開花が始まりました。",
            "zh": "櫻花開花了。"
          }
        },
        {
          "word": "始まる",
          "reading": "はじまる",
          "zh": "開始",
          "en": "to begin (intransitive)",
          "pos": "verb",
          "jlpt": "N5",
          "example": {
            "ja": "授業が九時に始まります。",
            "zh": "課程九點開始。"
          }
        },
        {
          "word": "春",
          "reading": "はる",
          "zh": "春天",
          "en": "spring",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "春は暖かい季節です。",
            "zh": "春天是溫暖的季節。"
          }
        },
        {
          "word": "早い",
          "reading": "はやい",
          "zh": "早的",
          "en": "early, fast",
          "pos": "adjective",
          "jlpt": "N5",
          "example": {
            "ja": "今日は早く起きました。",
            "zh": "我今天很早起床了。"
          }
        }
      ],
      "grammar": [
        {
          "point": "～始めます",
          "zh": "表示動作的開始",
          "en": "to begin doing ~",
          "example": {
            "ja": "桜が咲き始めました。",
            "zh": "櫻花開始開花了。"
          },
          "note": "動詞ます形去ます + 始めます"
        },
        {
          "point": "～より",
          "zh": "表示比較的基準，比...更...",
          "en": "than ~",
          "example": {
            "ja": "今年は例年より早いです。",
            "zh": "今年比往年早。"
          },
          "note": "AはBより adjective/verb (A比B更...)"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "「桜」の正しい読み方はどれですか。",
            "zh": "「桜」的正確讀音是什麼？"
          },
          "audioText": "",
          "options": [
            "はる",
            "さくら",
            "かいか",
            "はな"
          ],
          "answer": 1,
          "explain": {
            "zh": "桜（さくら）是櫻花的意思。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「開花」の英語の意味は何ですか。",
            "zh": "「開花」的英文意思是什麼？"
          },
          "audioText": "",
          "options": [
            "Spring",
            "Flower",
            "Blooming",
            "Beginning"
          ],
          "answer": 2,
          "explain": {
            "zh": "開花（かいか）的意思是 blooming 或 flowering。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "以下の文の空欄に最も適切な言葉を選びなさい。「日本で桜の花が（　　　）始めました。」",
            "zh": "請選擇最適合填入以下句子空格的詞。「在日本櫻花（　　　）開始了。」"
          },
          "audioText": "",
          "options": [
            "咲く",
            "咲き",
            "咲いて",
            "咲いた"
          ],
          "answer": 1,
          "explain": {
            "zh": "動詞ます形去ます + 始めます，所以咲きます的ます形去ます是咲き。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "「春が来ました」の意味は何ですか。",
            "zh": "「春が来ました」是什麼意思？"
          },
          "audioText": "春が来ました。",
          "options": [
            "夏天來了。",
            "冬天來了。",
            "秋天來了。",
            "春天來了。"
          ],
          "answer": 3,
          "explain": {
            "zh": "春（はる）是春天的意思，来ました（きました）是來了的意思。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "「今年は、例年（　　）少し早く咲きました。」",
            "zh": "「今年，它比往年（　　）稍微早一些開花了。」"
          },
          "audioText": "",
          "options": [
            "と",
            "に",
            "より",
            "が"
          ],
          "answer": 2,
          "explain": {
            "zh": "「～より」表示比較，意思是「比～」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "桜の花が咲き始めました。",
          "furigana": "さくらのはながさきはじめました。",
          "accept": [
            "さくらのはながさきはじめました",
            "桜の花が咲き始めました"
          ],
          "hint": "櫻花開始開花了。"
        }
      ],
      "speaking": [
        {
          "ja": "日本で桜の花が咲き始めました。",
          "furigana": "にほんでさくらのはながさきはじめました。",
          "zh": "日本的櫻花開始開花了。",
          "focus": "intonation",
          "linking": ""
        }
      ],
      "id": "daily-2026-07-29-N5",
      "date": "2026-07-29",
      "level": "N5"
    },
    {
      "title": {
        "ja": "かわいいパンダの赤ちゃん、名前は？",
        "furigana": "かわいいパンダのあかちゃん、なまえは？",
        "zh": "可爱熊猫宝宝，名字是什么？",
        "en": "Cute Panda Cub, What's Its Name?"
      },
      "source": {
        "title": "上野動物園のパンダの赤ちゃん「シャンシャン」に決定",
        "publisher": "NHKニュース",
        "url": "https://www3.nhk.or.jp/news/html/20170925/k10011155011000.html",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "上野動物園にパンダの赤ちゃんが生まれました。とてもかわいいです。たくさんの人が名前を考えました。そして、「シャンシャン」という名前になりました。中国語で「香香」と書きます。これは「良い香り」という意味です。みんな、シャンシャンに会うのが楽しみです。",
          "furigana": "うえのどうぶつえんにパンダのあかちゃんがうまれました。とてもかわいいです。たくさんのひとがなまえをかんがえました。そして、「シャンシャン」というなまえになりました。ちゅうごくごで「シャンシャン」と書きます。これは「よいかおり」といういみです。みんな、シャンシャンにあうのがたのしみです。",
          "zh": "上野动物园出生了一只熊猫宝宝。它非常可爱。很多人都思考了名字。然后，它被命名为“香香”。中文写成“香香”。这意思是“好闻的香气”。大家都很期待见到香香。",
          "en": "A panda cub was born at Ueno Zoo. It is very cute. Many people thought about names. And then, its name became \"Xiang Xiang\". It is written as \"香香\" in Chinese. This means \"good scent\". Everyone is looking forward to meeting Xiang Xiang."
        }
      ],
      "vocab": [
        {
          "word": "動物園",
          "reading": "どうぶつえん",
          "zh": "动物园",
          "en": "zoo",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "私は動物園でパンダを見ました。",
            "zh": "我在动物园看到了熊猫。"
          }
        },
        {
          "word": "赤ちゃん",
          "reading": "あかちゃん",
          "zh": "婴儿，宝宝",
          "en": "baby",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "この赤ちゃんはとてもかわいいです。",
            "zh": "这个宝宝非常可爱。"
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
            "ja": "昨日、猫の赤ちゃんが生まれました。",
            "zh": "昨天，小猫出生了。"
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
            "ja": "あなたの名前は何ですか？",
            "zh": "你的名字是什么？"
          }
        },
        {
          "word": "考える",
          "reading": "かんがえる",
          "zh": "思考，考虑",
          "en": "to think, to consider",
          "pos": "verb",
          "jlpt": "N5",
          "example": {
            "ja": "私は夕食について考えます。",
            "zh": "我考虑晚餐吃什么。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜が生まれる (〜がうまれる)",
          "zh": "表示某物“出生”或“产生”。",
          "en": "Indicates something 'is born' or 'comes into existence'.",
          "example": {
            "ja": "かわいいパンダの赤ちゃんが生まれました。",
            "zh": "可爱的熊猫宝宝出生了。"
          },
          "note": "が是主格助词，指示动词的施动者或发生者。"
        },
        {
          "point": "〜と書きます (〜とかきます)",
          "zh": "表示“写成〜”或“被写为〜”。",
          "en": "Means 'to be written as ~' or 'is written as ~'.",
          "example": {
            "ja": "これは「香香」と書きます。",
            "zh": "这写成“香香”。"
          },
          "note": "と是引用助词，用于引用内容。"
        },
        {
          "point": "〜という意味です (〜といういみです)",
          "zh": "表示“意思是〜”。",
          "en": "Means 'the meaning is ~'.",
          "example": {
            "ja": "これは「良い香り」という意味です。",
            "zh": "这意思是“好闻的香气”。"
          },
          "note": "という是引用形式，いみ是“意思”。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "上野動物園に生まれたパンダの名前は何ですか？",
            "zh": "在上野动物园出生的熊猫叫什么名字？"
          },
          "options": [
            "リンリン",
            "シャンシャン",
            "タンタン",
            "ミミ"
          ],
          "answer": 1,
          "explain": {
            "zh": "文章中提到熊猫宝宝的名字是「シャンシャン」。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「赤ちゃん」の正しい読み方はどれですか？",
            "zh": "「赤ちゃん」的正确读音是哪个？"
          },
          "options": [
            "あかちゃん",
            "おもちゃ",
            "あかばな",
            "あかぼん"
          ],
          "answer": 0,
          "explain": {
            "zh": "「赤ちゃん」的读音是「あかちゃん」。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「これは『良い香り』＿＿＿＿です。」空欄に何が入りますか？",
            "zh": "「这是『好闻的香气』＿＿＿＿。」空白处填什么？"
          },
          "options": [
            "と意味",
            "は意味",
            "という意味",
            "の意"
          ],
          "answer": 2,
          "explain": {
            "zh": "表示“意思是〜”的正确表达是「〜という意味です」。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "「上野動物園」",
            "zh": "请听并选择正确的词语。"
          },
          "audioText": "上野動物園",
          "options": [
            "うえのどうぶつえん",
            "うえのどうぶつえ",
            "うえのどうぶつえんん",
            "うわのどうぶつえん"
          ],
          "answer": 0,
          "explain": {
            "zh": "「上野動物園」的正确读音是「うえのどうぶつえん」。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "たくさんの人が名前を＿＿＿＿。",
            "zh": "很多人都＿＿＿＿名字。"
          },
          "options": [
            "食べました",
            "考えました",
            "見ました",
            "聞きました"
          ],
          "answer": 1,
          "explain": {
            "zh": "根据上下文，人们会“思考”名字，所以选择「考えました」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "上野動物園にパンダの赤ちゃんが生まれました。",
          "furigana": "うえのどうぶつえんにパンダのあかちゃんがうまれました。",
          "accept": [
            "うえのどうぶつえんにパンダのあかちゃんがうまれました。",
            "上野動物園にパンダの赤ちゃんが生まれました。"
          ],
          "hint": "动物园里出生了熊猫宝宝。"
        }
      ],
      "speaking": [
        {
          "ja": "シャンシャンに会うのが楽しみです。",
          "furigana": "シャンシャンにあうのがたのしみです。",
          "zh": "我很期待见到香香。",
          "focus": "intonation",
          "linking": "「会うのが」の「うの」は滑らかに繋げる意識で発音しましょう。"
        }
      ],
      "id": "daily-2026-07-28-N5",
      "date": "2026-07-28",
      "level": "N5"
    },
    {
      "title": {
        "ja": "桜の開花、今年は早い？",
        "furigana": "さくらのかいか、ことしははやい？",
        "zh": "櫻花開花，今年會比較早嗎？",
        "en": "Cherry Blossom Blooming: Earlier This Year?"
      },
      "source": {
        "title": "今年の桜、開花予想は？",
        "publisher": "ウェザーニュース (Weather News)",
        "url": "https://weathernews.jp/s/topics/202402/150095/",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "日本の桜がもうすぐ咲きます。ウェザーニュースは、今年の開花は平年より早いと発表しました。東京は3月19日ごろ、福岡は3月18日ごろに咲き始めるでしょう。暖かい日が多いため、桜の準備が早く進んでいます。みんな、桜を見るのが楽しみですね。",
          "furigana": "にほんのさくらがもうすぐさきます。ウェザーニュースは、ことしのかいかはへいねんよりはやいとはっぴょうしました。とうきょうはさんがつじゅうくにちごろ、ふくおかはさんがつじゅうはちにちごろにさきはじめるでしょう。あたたかいひがおおいため、さくらのじゅんびがはやくすすんでいます。みんな、さくらをみるのがたのしみですね。",
          "zh": "日本的櫻花即將盛開。Weather News宣布，今年的開花時間會比往年早。東京大約在3月19日左右，福岡大約在3月18日左右開始開花。因為溫暖的日子很多，櫻花的準備工作進展很快。大家都很期待賞櫻呢。",
          "en": "Cherry blossoms in Japan will bloom soon. Weather News announced that this year's blooming will be earlier than usual. Tokyo will start blooming around March 19th, and Fukuoka around March 18th. Because there have been many warm days, the cherry blossoms are preparing quickly. Everyone is looking forward to seeing the cherry blossoms."
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
            "ja": "桜がとてもきれいです。",
            "zh": "櫻花非常漂亮。"
          }
        },
        {
          "word": "開花",
          "reading": "かいか",
          "zh": "開花",
          "en": "blooming",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "桜の開花を待ちます。",
            "zh": "等待櫻花開花。"
          }
        },
        {
          "word": "早い",
          "reading": "はやい",
          "zh": "早的",
          "en": "early, fast",
          "pos": "い形容詞",
          "jlpt": "N5",
          "example": {
            "ja": "朝ごはんは早いです。",
            "zh": "早餐吃得很早。"
          }
        },
        {
          "word": "発表します",
          "reading": "はっぴょうします",
          "zh": "發表、公布",
          "en": "to announce, to present",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "先生がテストの結果を発表しました。",
            "zh": "老師公布了考試結果。"
          }
        },
        {
          "word": "楽しみ",
          "reading": "たのしみ",
          "zh": "期待、樂趣",
          "en": "enjoyment, anticipation",
          "pos": "名詞/な形容詞",
          "jlpt": "N5",
          "example": {
            "ja": "旅行が楽しみです。",
            "zh": "我很期待旅行。"
          }
        }
      ],
      "grammar": [
        {
          "point": "～でしょう",
          "zh": "表示推測，相當於「會...吧」、「可能...」",
          "en": "Expresses conjecture or probability, similar to 'probably will' or 'might'.",
          "example": {
            "ja": "明日は雨が降るでしょう。",
            "zh": "明天可能會下雨吧。"
          },
          "note": "動詞普通形/い形容詞普通形/な形容詞語幹+でしょう"
        },
        {
          "point": "～ため、",
          "zh": "表示原因或理由，相當於「因為...」",
          "en": "Indicates reason or cause, similar to 'because of' or 'due to'.",
          "example": {
            "ja": "雨のため、試合は中止になりました。",
            "zh": "因為下雨，比賽取消了。"
          },
          "note": "名詞+の+ため、動詞普通形+ため、い形容詞普通形+ため、な形容詞語幹+な+ため"
        },
        {
          "point": "～ごろ",
          "zh": "表示大約的時間點，相當於「大約...」",
          "en": "Indicates an approximate time point, similar to 'around' or 'about'.",
          "example": {
            "ja": "5時ごろに駅に着きます。",
            "zh": "大約5點會到車站。"
          },
          "note": "時間詞+ごろ"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "この記事によると、今年の桜の開花はいつごろですか？",
            "zh": "根據這篇文章，今年的櫻花大約什麼時候開花？"
          },
          "options": [
            "平年より遅い",
            "平年と同じくらい",
            "平年より早い",
            "まだわからない"
          ],
          "answer": 2,
          "explain": {
            "zh": "文章中提到「今年の開花は平年より早いと発表しました。」（宣布今年的開花會比往年早。）"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「開花」のひらがなは何ですか？",
            "zh": "「開花」的平假名是什麼？"
          },
          "options": [
            "かいか",
            "はなびら",
            "さくら",
            "まんかい"
          ],
          "answer": 0,
          "explain": {
            "zh": "「開花」的平假名是 かいか。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「暖かい日が多いため、桜の準備が早く進んでいます。」この文で「～ため」は何を表していますか？",
            "zh": "在「因為溫暖的日子很多，櫻花的準備工作進展很快。」這句話中，「～ため」表示什麼？"
          },
          "options": [
            "目的",
            "結果",
            "原因",
            "場所"
          ],
          "answer": 2,
          "explain": {
            "zh": "「～ため」在這裡表示原因或理由，說明櫻花準備工作進展快的原因是「溫暖的日子很多」。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "東京の桜はいつごろ咲き始めますか？",
            "zh": "東京的櫻花大約什麼時候開始開花？"
          },
          "audioText": "とうきょうのさくらはいつごろさきはじめますか？",
          "options": [
            "3月18日ごろ",
            "3月19日ごろ",
            "4月1日ごろ",
            "まだ決まっていない"
          ],
          "answer": 1,
          "explain": {
            "zh": "文章中提到「東京は3月19日ごろに咲き始めるでしょう。」（東京大約在3月19日左右開始開花。）"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "みんな、桜を見るのが＿＿＿ですね。",
            "zh": "大家都很＿＿＿看櫻花呢。"
          },
          "options": [
            "難しい",
            "楽しみ",
            "怖い",
            "悲しい"
          ],
          "answer": 1,
          "explain": {
            "zh": "根據文章內容，大家對於賞櫻應該是感到「楽しみ」（期待、樂趣）。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "日本の桜がもうすぐ咲きます。",
          "furigana": "にほんのさくらがもうすぐさきます。",
          "accept": [
            "にほんのさくらがもうすぐさきます。",
            "日本の桜がもうすぐ咲きます。"
          ],
          "hint": "關於日本櫻花開花的句子。"
        },
        {
          "ja": "暖かい日が多いため、早く進んでいます。",
          "furigana": "あたたかいひがおおいため、はやくすすんでいます。",
          "accept": [
            "あたたかいひがおおいため、はやくすすんでいます。",
            "暖かい日が多いため、早く進んでいます。"
          ],
          "hint": "關於溫暖天氣和進展的句子。"
        }
      ],
      "speaking": [
        {
          "ja": "今年の桜は早いですね。",
          "furigana": "ことしのさくらははやいですね。",
          "zh": "今年的櫻花開得早呢。",
          "focus": "intonation",
          "linking": "「はやいですね」的「ね」語氣上揚，表示同意或確認。"
        },
        {
          "ja": "桜を見るのが楽しみです。",
          "furigana": "さくらをみるのがたのしみです。",
          "zh": "我很期待賞櫻。",
          "focus": "pacing",
          "linking": "語速平穩，表達期待的心情。"
        }
      ],
      "id": "daily-2026-07-27-N5",
      "date": "2026-07-27",
      "level": "N5"
    },
    {
      "title": {
        "ja": "かわいい猫が電車のお手伝い！",
        "furigana": "かわいいねこがでんしゃのおてつだい！",
        "zh": "可愛的貓咪幫忙電車！",
        "en": "Cute Cat Helps the Train!"
      },
      "source": {
        "title": "JR九州の駅に「ねこ駅長」誕生",
        "publisher": "Yahoo! ニュース",
        "url": "https://news.yahoo.co.jp/articles/YOUR_ARTICLE_ID",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "JR九州の駅に、新しい駅長さんが来ました。その駅長さんは、とてもかわいい猫です。",
          "furigana": "じぇいあーるきゅうしゅうのえきに、あたらしいえきちょうさんがきました。そのえきちょうさんは、とてもかわいいねこです。",
          "zh": "JR九州的車站來了一位新的站長。這位站長是一隻非常可愛的貓。",
          "en": "A new stationmaster came to a JR Kyushu station. That stationmaster is a very cute cat."
        },
        {
          "ja": "猫の名前は「にゃん太郎」です。にゃん太郎は駅でみんなを笑顔にします。",
          "furigana": "ねこのなまえは「にゃんたろう」です。にゃんたろうはえきでみんなをえがおにします。",
          "zh": "這隻貓的名字是「喵太郎」。喵太郎在車站讓大家露出笑容。",
          "en": "The cat's name is \"Nyantaro\". Nyantaro makes everyone smile at the station."
        },
        {
          "ja": "お客さんは、にゃん太郎に会いに駅に来ます。電車に乗るのがもっと楽しくなりますね。",
          "furigana": "おきゃくさんは、にゃんたろうにあいにえきにきます。でんしゃにのるのがもっとたのしくなりますね。",
          "zh": "乘客們會來車站見喵太郎。搭乘電車會變得更有趣呢。",
          "en": "Customers come to the station to meet Nyantaro. Riding the train will be even more fun, won't it?"
        }
      ],
      "vocab": [
        {
          "word": "駅",
          "reading": "えき",
          "zh": "車站",
          "en": "station",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "これは駅です。",
            "zh": "這是車站。"
          }
        },
        {
          "word": "駅長",
          "reading": "えきちょう",
          "zh": "站長",
          "en": "stationmaster",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "駅長さんはとても親切です。",
            "zh": "站長先生非常親切。"
          }
        },
        {
          "word": "猫",
          "reading": "ねこ",
          "zh": "貓",
          "en": "cat",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "猫が好きです。",
            "zh": "我喜歡貓。"
          }
        },
        {
          "word": "来る",
          "reading": "くる",
          "zh": "來",
          "en": "to come",
          "pos": "verb",
          "jlpt": "N5",
          "example": {
            "ja": "明日、来ます。",
            "zh": "我明天來。"
          }
        },
        {
          "word": "笑顔",
          "reading": "えがお",
          "zh": "笑容",
          "en": "smile",
          "pos": "noun",
          "jlpt": "N5",
          "example": {
            "ja": "彼女はいつも笑顔です。",
            "zh": "她總是面帶笑容。"
          }
        }
      ],
      "grammar": [
        {
          "point": "〜が来ました",
          "zh": "〜來了",
          "en": "〜 came",
          "example": {
            "ja": "友達が来ました。",
            "zh": "朋友來了。"
          },
          "note": "表示某人或某物到達。"
        },
        {
          "point": "〜は〜です",
          "zh": "〜是〜",
          "en": "〜 is 〜",
          "example": {
            "ja": "これは猫です。",
            "zh": "這是貓。"
          },
          "note": "最基本的肯定句型，用於描述或定義。"
        },
        {
          "point": "〜を〜ます",
          "zh": "做〜（動詞）",
          "en": "do 〜 (verb)",
          "example": {
            "ja": "ご飯を食べます。",
            "zh": "吃飯。"
          },
          "note": "「を」是受詞助詞，表示動詞的作用對象。"
        },
        {
          "point": "〜がもっと〜",
          "zh": "〜更〜",
          "en": "〜 more 〜",
          "example": {
            "ja": "もっと大きいです。",
            "zh": "更大。"
          },
          "note": "「もっと」表示程度的增加，後面接形容詞或副詞。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "「駅長」の正しい読み方はどれですか？",
            "zh": "「駅長」的正確讀音是哪個？"
          },
          "audioText": "",
          "options": [
            "えきちょう",
            "えきちよう",
            "えきなが",
            "えきおさ"
          ],
          "answer": 0,
          "explain": {
            "zh": "「駅長」的正確讀音是「えきちょう」。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「猫」の英語は何ですか？",
            "zh": "「猫」的英文是什麼？"
          },
          "audioText": "",
          "options": [
            "dog",
            "cat",
            "bird",
            "fish"
          ],
          "answer": 1,
          "explain": {
            "zh": "「猫」的英文是「cat」。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "「新しい___が来ました。」（車站）",
            "zh": "「新的___來了。」（車站）"
          },
          "audioText": "",
          "options": [
            "えき",
            "えきちょう",
            "ねこ",
            "でんしゃ"
          ],
          "answer": 0,
          "explain": {
            "zh": "句子缺少表示地點的名詞，「駅」是車站的意思，符合語境。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "にゃん太郎は駅でみんなを____にします。",
            "zh": "喵太郎在車站讓大家____。"
          },
          "audioText": "",
          "options": [
            "しんぱい",
            "かなしい",
            "えがお",
            "こわい"
          ],
          "answer": 2,
          "explain": {
            "zh": "根據文章，喵太郎讓大家開心，所以是「笑顔」（笑容）。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "「かわいい猫」を聞いて、正しい日本語を選んでください。",
            "zh": "請聽「かわいい猫」，然後選擇正確的日語。"
          },
          "audioText": "かわいいねこ",
          "options": [
            "かわいい犬",
            "かわいい猫",
            "かわいい鳥",
            "かわいい魚"
          ],
          "answer": 1,
          "explain": {
            "zh": "音頻讀出的是「かわいいねこ」，即「可愛的貓」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "猫の名前はにゃん太郎です。",
          "furigana": "ねこのなまえはにゃんたろうです。",
          "accept": [
            "ねこのなまえはにゃんたろうです",
            "猫の名前はにゃん太郎です"
          ],
          "hint": "貓的名字是喵太郎。"
        }
      ],
      "speaking": [
        {
          "ja": "JR九州の駅に、新しい駅長さんが来ました。",
          "furigana": "じぇいあーるきゅうしゅうのえきに、あたらしいえきちょうさんがきました。",
          "zh": "JR九州的車站來了一位新的站長。",
          "focus": "intonation",
          "linking": "JR（じぇいあーる）九州（きゅうしゅう）の駅（えき）に、新（あたら）しい駅長（えきちょう）さんが来（き）ました。"
        }
      ],
      "id": "daily-2026-07-26-N5",
      "date": "2026-07-26",
      "level": "N5"
    },
    {
      "title": {
        "ja": "大阪で新しいパンダが生まれました！",
        "furigana": "おおさかで あたらしい ぱんだが うまれました！",
        "zh": "大阪誕生了新的熊貓寶寶！",
        "en": "A New Panda Was Born in Osaka!"
      },
      "source": {
        "title": "アドベンチャーワールドでジャイアントパンダの赤ちゃんが誕生",
        "publisher": "共同通信",
        "url": "https://www.kyodo.co.jp/pr-news/2024-07-31_4478839/",
        "note": "原創、分級改寫之摘要，非重製原文。"
      },
      "summary": [
        {
          "ja": "和歌山県のアドベンチャーワールドで、パンダの赤ちゃんが生まれました。お母さんパンダは「良浜（らうひん）」です。生まれた赤ちゃんはメスで、とても小さいです。動物園の人は、赤ちゃんが元気に育つように願っています。これは、とても嬉しいニュースですね。",
          "furigana": "わかやまけんの あどべんちゃーわーるどで、ぱんだの あかちゃんが うまれました。おかあさんぱんだは「らうひん」です。うまれた あかちゃんは めすで、とても ちいさいです。どうぶつえんの ひとは、あかちゃんが げんきに そだつように ねがっています。これは、とても うれしい にゅーすですね。",
          "zh": "在和歌山縣的冒險世界，一隻熊貓寶寶出生了。熊貓媽媽是「良浜」。出生的寶寶是雌性，非常小。動物園的人們希望寶寶能健康長大。這是個非常開心的消息呢。",
          "en": "A baby panda was born at Adventure World in Wakayama Prefecture. The mother panda is 'Rauhin'. The born baby is a female and very small. The zoo staff hope the baby will grow up healthy. This is very happy news!"
        }
      ],
      "vocab": [
        {
          "word": "生まれる",
          "reading": "うまれる",
          "zh": "出生",
          "en": "to be born",
          "pos": "動詞",
          "jlpt": "N5",
          "example": {
            "ja": "今日、赤ちゃんが生まれました。",
            "zh": "今天，寶寶出生了。"
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
            "ja": "赤ちゃんはかわいいです。",
            "zh": "寶寶很可愛。"
          }
        },
        {
          "word": "お母さん",
          "reading": "おかあさん",
          "zh": "媽媽",
          "en": "mother",
          "pos": "名詞",
          "jlpt": "N5",
          "example": {
            "ja": "私のお母さんは優しいです。",
            "zh": "我的媽媽很溫柔。"
          }
        },
        {
          "word": "小さい",
          "reading": "ちいさい",
          "zh": "小的",
          "en": "small",
          "pos": "い形容詞",
          "jlpt": "N5",
          "example": {
            "ja": "この猫は小さいです。",
            "zh": "這隻貓很小。"
          }
        },
        {
          "word": "元気",
          "reading": "げんき",
          "zh": "有精神、健康",
          "en": "healthy, energetic",
          "pos": "な形容詞",
          "jlpt": "N5",
          "example": {
            "ja": "赤ちゃんはとても元気です。",
            "zh": "寶寶非常有精神。"
          }
        }
      ],
      "grammar": [
        {
          "point": "～が生まれる",
          "zh": "～出生了",
          "en": "～ is born",
          "example": {
            "ja": "パンダの赤ちゃんが生まれました。",
            "zh": "熊貓寶寶出生了。"
          },
          "note": "表示某個新生命或事物誕生，助詞「が」表示主語。"
        },
        {
          "point": "～ように願う",
          "zh": "祈願～",
          "en": "to wish that ～",
          "example": {
            "ja": "赤ちゃんが元気に育つように願っています。",
            "zh": "我祈願寶寶能健康長大。"
          },
          "note": "「～ように」表示目的或願望的內容，後面接動詞「願う（ねがう）」表示祈願。"
        }
      ],
      "quiz": [
        {
          "type": "reading",
          "prompt": {
            "ja": "下線部の漢字の読み方を選んでください。パンダの赤ちゃんが<ruby>生まれ</ruby>ました。",
            "zh": "請選擇畫線漢字的讀音。熊貓寶寶出生了。"
          },
          "options": [
            "うまれ",
            "たまれ",
            "おまれ",
            "きまれ"
          ],
          "answer": 0,
          "explain": {
            "zh": "「生まれ」的讀音是「うまれ」。"
          }
        },
        {
          "type": "vocab",
          "prompt": {
            "ja": "「元気」の反対の意味の言葉は何ですか？",
            "zh": "「元気」的反義詞是什麼？"
          },
          "options": [
            "病気（びょうき）",
            "楽しい（たのしい）",
            "大きい（おおきい）",
            "明るい（あかるい）"
          ],
          "answer": 0,
          "explain": {
            "zh": "「元気」表示有精神、健康，其反義詞是「病気（びょうき）」，表示生病、沒精神。"
          }
        },
        {
          "type": "grammar",
          "prompt": {
            "ja": "（　　）に正しい助詞を入れてください。赤ちゃん（　　）元気に育つように願っています。",
            "zh": "請在（　　）中填入正確的助詞。我祈願寶寶（　　）健康長大。"
          },
          "options": [
            "を",
            "が",
            "で",
            "に"
          ],
          "answer": 1,
          "explain": {
            "zh": "在「～が～ように願う」的句型中，表示願望的主語通常用「が」。"
          }
        },
        {
          "type": "listening",
          "prompt": {
            "ja": "「赤ちゃんはとても小さいです。」を聞いて、正しい文を選んでください。",
            "zh": "請聽「赤ちゃんはとても小さいです。」，並選擇正確的句子。"
          },
          "audioText": "赤ちゃんはとても小さいです。",
          "options": [
            "赤ちゃんはとても小さいです。",
            "赤ちゃんはとても大きい",
            "赤ちゃんはとても速いです。",
            "赤ちゃんはとても可愛いです。"
          ],
          "answer": 0,
          "explain": {
            "zh": "音訊內容為「赤ちゃんはとても小さいです。」，意為「寶寶非常小」。"
          }
        },
        {
          "type": "cloze",
          "prompt": {
            "ja": "パンダの赤ちゃんが（　　）。",
            "zh": "熊貓寶寶（　　）。"
          },
          "options": [
            "食べました",
            "寝ました",
            "生まれました",
            "遊びました"
          ],
          "answer": 2,
          "explain": {
            "zh": "根據新聞內容，熊貓寶寶出生了，所以應該填入「生まれました」。"
          }
        }
      ],
      "dictation": [
        {
          "ja": "パンダの赤ちゃんが生まれました。",
          "furigana": "ぱんだの あかちゃんが うまれました。",
          "accept": [
            "パンダの赤ちゃんが生まれました",
            "ぱんだのあかちゃんがうまれました"
          ],
          "hint": "熊貓寶寶出生了。"
        }
      ],
      "speaking": [
        {
          "ja": "和歌山県のアドベンチャーワールドで、パンダの赤ちゃんが生まれました。",
          "furigana": "わかやまけんの あどべんちゃーわーるどで、ぱんだの あかちゃんが うまれました。",
          "zh": "在和歌山縣的冒險世界，一隻熊貓寶寶出生了。",
          "focus": "intonation",
          "linking": "「和歌山県のアドベンチャーワールドで」稍微連貫，然後在「パンダの赤ちゃんが」和「生まれました」之間有自然停頓。"
        }
      ],
      "id": "daily-2026-07-25-N5",
      "date": "2026-07-25",
      "level": "N5"
    },
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
