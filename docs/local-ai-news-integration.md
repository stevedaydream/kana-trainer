# 每日新聞接入本地 AI 與 Tailscale

查核日期：2026-10-29。以下區分本機已確認狀態與建議配置；未變更其他專案、啟停模型或執行推理。

## 接入結論

每日新聞應走 **Port Monitor 的 OpenAI 相容入口**，由它處理模型載入、排隊與顯示卡協調。GitHub hosted runner 加入 Tailscale 後，透過獨立 HTTPS Serve 入口呼叫；前端仍只載入產生好的新聞資料，沒有 AI 金鑰或執行期推理。

```text
GitHub Actions 排程（台灣時間）
  → 擷取真實新聞來源與發布時間
  → Tailscale ephemeral CI 節點
  → HTTPS Serve → Port Monitor 127.0.0.1:43922/v1
  → 專案背景佇列 → 本地模型
  → JSON／教材欄位／出處驗證
  → 獨立文章寫入 → 原子替換 data/news/index.js → commit／既有靜態部署
```

這是根據既有程式介面與資源協調規則提出的整合設計，不代表 CI 已取得 tailnet 權限或正式推理已驗證。

## 本機確認結果

| 項目 | 結果 |
|---|---|
| Tailscale | 已安裝，`BackendState=Running` |
| Port Monitor AI 入口 | `GET http://127.0.0.1:43922/v1/models` 未帶金鑰回 HTTP 401；入口存在並要求認證 |
| Gateway 4000 | 唯讀 `/v1/models` 回 HTTP 200，列出本機 Qwen 系列模型與 `local` 別名 |
| Ollama 11434 | 本次唯讀探測連線遭拒，不能假設目前使用 Ollama |
| Tailscale Serve | 已有 443 → LiveCatch 8765，以及 8443 `/osce` → LiveCatch `/osce`；沒有 Port Monitor AI 入口轉發 |
| 專案金鑰 | 僅檢查 `ai-settings.json` 的欄位與專案名稱，沒有 `kana-trainer` 專用專案；未輸出或複用任何現有金鑰 |

Port Monitor 的 README、`AGENTS.md`、`src-tauri/src/ai.rs` 指定 AI 請求經 43922、使用專案金鑰；支援 `GET /v1/models` 與 `POST /v1/chat/completions`。`model=managed-model` 使用目前選定模型，也可指定管理器提供的模型 id／別名。請求原樣轉送 `response_format` 與 `chat_template_kwargs`，只改寫送給實際 Provider 的 model。

LiveCatch 的 `ai_entry.py`、ADR-007 已採同一個 Port Monitor 入口。其 `/osce/v1/chat/completions` 則綁定專用自管模型，不應借作每日新聞服務。直接呼叫 4000 或模型本身會繞過新入口的專案排程，故不作預設。

私密 tailnet 主機網址與金鑰不寫入此文件。其他專案仍由其原有管理方式維護。

## 設定契約

| 名稱 | 用途與範例 |
|---|---|
| `NEWS_AI_PROVIDER` | 預設 `auto`，本地優先、失敗轉 Gemini；`openai`／`gemini` 可供單一 Provider 診斷 |
| `NEWS_AI_FALLBACK` | 預設 `gemini`；`none` 停用備援 |
| `GEMINI_API_KEY` | 雲端備援金鑰，沿用 GitHub Secret |
| `LOCAL_AI_BASE_URL` | 含 `/v1`；本機為 `http://127.0.0.1:43922/v1`，CI 為 `https://<host>.<tailnet>.ts.net:9444/v1` |
| `LOCAL_AI_MODEL` | 預設 `qwen36`，目前已配置為本地 Qwen；亦可指定管理器提供的其他本地模型 ID |
| `LOCAL_AI_API_KEY` | Port Monitor 桌面建立的 `kana-trainer` 專案金鑰，priority 選 `background`；放 GitHub Secret／本機未追蹤設定 |
| `TAILSCALE_OAUTH_CLIENT_ID` | CI 使用的 Tailscale client ID |
| `TAILSCALE_AUDIENCE` | 使用 workload identity federation 時的 audience，搭配 client ID |
| `TAILSCALE_OAUTH_SECRET` | 若沿用 OAuth client，使用此 secret 代替 federation audience |

本專案已選 `qwen36` 作預設，透過 Port Monitor 原有本地 Qwen3.6 路由。`managed-model` 會跟隨管理器選定 Provider，本身不是「只用本機」保證，因此不作預設。模型資源仍由管理器協調，這次沒有重啟或切換模型。

### Port Monitor 專案金鑰

在桌面「專案金鑰與優先順序」新增 `kana-trainer`，選背景優先順序，再取得專用 key。此設定由桌面負責，不能借用手機配對金鑰或其他專案的 key。

程式查核：建立與讀取 key 的 `saveProject`／`projectKey` 只有本機 Tauri `dispatch` 操作；遠端操作明確拒絕。現有 CLI、手機 HTTP API、43922 API 沒有可安全建立 key 的外部入口。請勿直接編寫管理器的憑證檔，這也不會可靠地更新執行中的設定。

### Tailscale Serve

確認 9444 未使用後，可由服務管理者新增獨立入口：

```powershell
tailscale serve --bg --https=9444 http://127.0.0.1:43922
tailscale serve status
```

這是待執行的設定範例；本次研究沒有執行。保留既有 LiveCatch／OSCE 入口。Serve 支援指定 HTTPS 埠、反向代理與自動 TLS，私網使用 Serve 即可。[Tailscale Serve CLI](https://tailscale.com/docs/reference/tailscale-cli/serve)

為 CI 設專用 tag，例如 `tag:kana-news-ci`，只允許其連入 AI 主機的 9444。專案 key 提供應用層認證；tag／ACL 控制網路範圍。

### GitHub hosted runner

官方目前示例為 `tailscale/github-action@v4`。建議使用 federation：client ID + audience，workflow 加 `id-token: write`；既有 OAuth client ID + secret 也可。CI 節點為 ephemeral，結束後清除；須先在 tailnet 設定 tag 與權限。[Tailscale GitHub Action](https://tailscale.com/docs/integrations/github/github-action)

接入步驟應放在產生新聞前，使用 `ping` 或 `tailscale ping` 確認 AI 主機可達，再以帶專案 key 的 `GET /v1/models` 檢查入口。health／模型列表成功只證明連線與認證，不代表教材生成已成功。

本次只列舉 `H:/project` 直接子專案的 `.github/workflows`，沒有找到可重用的 Tailscale action／OAuth 配置範例。

## 模型 API 與可靠性

本專案實作已改用 [NHK 官方科學・文化 RSS](https://news.web.nhk/n-data/conf/na/rss/cat3.xml)。本機讀取確認目前含來源標題、摘要、HTTPS 文章網址與發布時間；舊 `www3.nhk.or.jp/rss` 入口回應可能過期，因此不作預設。來源仍須逐次驗證日期，不因 URL 官方就略過時效檢查。

採 `POST <LOCAL_AI_BASE_URL>/chat/completions`，使用 `Authorization: Bearer ...`、`stream:false`、`response_format:{type:"json_object"}`，並將教材欄位需求明確放入提示詞。使用 llama.cpp 系列時可送 `chat_template_kwargs:{enable_thinking:false}`。模型支援程度仍須以實際服務版本與一次完整教材生成確認；即使回 HTTP 200，仍必須在程式端驗證 JSON 與內容。[llama.cpp server](https://github.com/ggml-org/llama.cpp/blob/master/tools/server/README.md)

Ollama 可作替代 Provider：原生 `/api/chat` 的 `format` 可指定 JSON 或 JSON Schema；OpenAI 相容 `/v1/chat/completions` 支援 `response_format`。目前本機未確認 Ollama 啟動，不應硬寫 11434 為預設。[Ollama structured outputs](https://docs.ollama.com/capabilities/structured-outputs)、[Ollama OpenAI compatibility](https://docs.ollama.com/api/openai-compatibility)

建議執行規則：

- 真實來源由擷取程式取得；標題、網址、來源發布時間與擷取時間由程式保存，不能只相信模型產生的 source。
- 不把任意新聞內文當系統指令；模型只改寫提供的事實，不自行補造近期事件。
- 教材日期使用 `Asia/Taipei`，來源發布日另存，避免台灣清晨排程被標成前一天。
- 背景任務依管理器排隊；給冷啟動與排隊合理等待時間。入口程式目前的上游送出與每個回應 chunk 逾時各為 180 秒，排隊／載入發生在其前；單純加大客戶端 timeout 不能消除上游逾時。
- 分類處理 401／403、模型不存在、排隊／服務不可用、逾時、JSON 截斷與教材驗證失敗；依使用者指定轉用 Gemini 備援，日誌與產出 metadata 都標記備援；可設 `NEWS_AI_FALLBACK=none` 停用。
- 少量有界重試；失敗保留既有新聞。先驗證，再寫含雜湊的獨立文章，最後原子替換索引；模型故障不可清空歷史。
- 日誌不輸出 Authorization、API key、私密配對連結或完整憑證設定。

## 尚需完成的環境設定與驗收

1. 由 Port Monitor 桌面建立 `kana-trainer` 背景專案 key。
2. 新增專用 Serve 入口及 CI tag／ACL，確認沒有覆寫既有入口。
3. 在 GitHub 設定本地 AI endpoint／model 與所需 Secrets、Tailscale federation 或 OAuth。
4. 本機以新 key 查模型列表，再以真實來源生成一包教材；檢查來源、日語分級、讀音、題目與 JSON。
5. 手動觸發 GitHub workflow，確認 tailnet 連線、模型等待、完整驗證、成功提交，以及失敗不改壞原資料。
6. 最後確認每日排程確實在預期台灣日期產生；電腦／Port Monitor 必須在排程時運行。

前四項未全部驗收前，只能宣稱接入程式與流程已準備，不能宣稱每日本地 AI 自動化已啟用。

## 實作狀態更新

已完成小型索引＋每篇獨立檔案、前端按需載入、最近三篇離線預快取，以及本地優先／Gemini 備援的程式與模擬測試。工作流程預設 auto；Tailscale 或認證失敗不會提前中止備援。真實新聞來源抓取已驗證；真模型與正式 GitHub 執行仍需本專案 key、Serve 與 CI 身分完成配置。

最新唯讀設定查核：`local-qwen` 已設定本地 `qwen3.8-flash-next-iq3_xxs`；另有 `gateway-qwen36` 本地 Provider。只讀取 Provider id／model／是否 loopback 與專案名稱，未輸出金鑰；目前專案列表仍只有 Hermes。

## 實機接入設定（2026-10-29）

已在 Port Monitor 桌面建立 kana-trainer 專案並設為 background；未複用其他專案金鑰。新增 tailnet-only HTTPS 9444 → 43922，保留既有 LiveCatch 與 OSCE 入口，帶專案 key 的 HTTPS models 請求已通過。

GitHub 已建立 LOCAL_AI_API_KEY、LOCAL_AI_BASE_URL、TAILSCALE_OAUTH_CLIENT_ID、TAILSCALE_AUDIENCE Secrets，沿用既有 GEMINI_API_KEY。Tailscale 使用 OIDC，issuer 為 GitHub Actions，subject 限本 repo 的 branch refs，另以 workflow_ref 限 daily-news.yml。只有 auth_keys scope，節點必須使用 tag:kana-news-ci；CI grant 只開放 AI 主機 TCP 9444，並加入允許／拒絕政策測試。原有 member／shared 使用者連線權限保留。

兩個本地模型的載入測試目前都被管理器以 VRAM 不足回 HTTP 503，未強制停止服務或修改模型的顯卡配置。已改用較小的直接管理模型 qwen36 作專案預設；日後有足夠資源時由管理器自動載入，資源不足時轉用 Gemini 備援。不能將 HTTPS 認證成功或雲端備援成功報成已成功完成本地推理。

Serve 與 tailnet policy 的原始備份、CI public identity 設定保存在使用者 LocalAppData 的 kana-trainer-integration 目錄，不進版本庫；本機專案 key 放在忽略的 .env。實際私密主機網址及 API key 不寫入文件。
