# 新聞儲存與本地優先備援

## 檔案契約

- `data/news/index.js`：schemaVersion=1，僅保留最近 60 包的 id、日期、程度、日中標題、來源網址、文章相對路徑與 SHA-256。約 28 KB。
- `data/news/packs/<id>-<hash16>.js`：完整一篇教材，註冊到 `window.KANA_NEWS_PACKS[id]`。內容改變就換檔名，避免索引與離線快取版本混用。
- 原 `data/news.js` 的 60 包已完整遷移，逐包比對一致後移除。存檔使用的 pack.id 維持原值，因此學習進度不需重設。

列表只讀索引。點選文章時動態載入該篇 script，支援原有 `file://` 雙擊開啟；HTTP(S) 使用 SRI 驗證內容。載入中可返回列表，較晚完成的下載不會搶回畫面；失敗可重試，重複閱讀共用記憶體快取。

## 發布與離線一致性

發布前驗證教材及整份索引；先原子寫入新的文章檔案，再原子替換索引。既有文章不改寫；發布途中斷只可能留下未被索引引用的完整檔案，不能留下指向缺檔的新索引。

索引以 network-first 更新；文章因路徑含內容雜湊而採 cache-first。Service Worker v12 安裝時預快取最近三篇，其餘文章閱讀後快取，文章快取最多 60 個版本，且跨 shell 升級保留。尚未下載的舊文章離線時顯示提示，不把 HTML 當教材載入。

伺服器上的舊雜湊文章暫不刪除，以支援尚未更新索引的用戶；索引仍只呈現最近 60 包。未來清理伺服器歷史檔時需另設寬限期。GitHub 每日只提交新增文章與更新索引。

## AI 執行順序

1. 抓取 RSS 摘要、來源網址及發布時間，排除過舊或已使用來源。
2. 優先透過 Port Monitor `43922/v1` 的 `qwen36` 直接管理模型 改寫。
3. 本地未配置、Tailscale 無法連線、認證／HTTP／逾時／JSON 失敗，或教材驗證不合格時，使用 Gemini 備援；備援仍使用相同新聞來源。
4. 備援也必須通過相同的嚴格驗證。皆失敗就停止發布，保留舊索引與文章。
5. 成功教材記錄 `generation.provider`、`generation.isFallback` 與產生時間；日誌明示備援，不記錄憑證。

預設 `NEWS_AI_PROVIDER=auto`、`NEWS_AI_FALLBACK=gemini`。本地每次逾時預設 180 秒，最多 2 次呼叫；Gemini 最多 2 次呼叫，各 180 秒，整份工作流程另有 25 分鐘上限。若調整模型需求，可修改本地逾時；只測本地時設 `NEWS_AI_PROVIDER=openai`。

專案背景 key、Tailscale Serve 與 GitHub OIDC 身分已完成設定，HTTPS 閘道認證已通過。實際載入模型目前被管理器以 VRAM 不足拒絕，預設改用較小的 qwen36；工作流程會記錄實際 provider，不能將備援成功誤報為本地生成成功。

## 驗證

`npm run validate` 對照索引、檔案雜湊、基本教材格式與 metadata。`npm test` 驗證遷移、原子發布、不可變文章、篡改偵測、provider 備援與完整模擬生成；`npm run test:e2e` 驗證按需載入、重試、返回競態、離線及 file://。
