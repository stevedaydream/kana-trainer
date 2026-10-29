# 配圖清單

**目前缺圖：0 張**

208 音皆有本機配圖：92 張既有 PNG、116 張原創 SVG。SVG 為簡筆學習圖示，擬聲詞以動作或聲音意象表示；並非照片。既有 PNG 優先，檔名相同時可直接替換。

- 原創向量來源：`scripts/build-illustrations.mjs`，執行後更新 SVG 與 `data/illustrations.js`。
- `data/illustrations.js` 是圖片路徑索引；支援直接以 file:// 開啟。
- SVG 隨 PWA 預快取；既有 PNG 在瀏覽時快取，避免安裝時一次下載約 27 MB。
- 查核：`node scripts/check-image-list.mjs`。
- 過去手工整理的日文搜尋詞保存在 [插畫升級參考](illustration-reference.md)。

翻牌隨機抽到其他單詞時，會另外標註聯想圖對應的預設詞，避免將圖像誤認為新單詞的意思。
