/* =========================================================
 * data/news.js — 每日新聞資料包（唯一內容來源）
 * 由 scripts/generate-news.mjs 自動累積產生；前端只渲染。
 * schema 見 docs/ai-news-module-design.md §2。
 * ========================================================= */
window.KANA_NEWS = {
  "packs": [
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
