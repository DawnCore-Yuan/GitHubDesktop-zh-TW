# GitHub Desktop 3.6.10 台灣繁體中文語言補丁（非官方）

> ⚠️ **本專案不是 GitHub 官方版本。** 與 GitHub, Inc. 無任何關聯。
> GitHub Desktop 與 GitHub 商標屬於其各自權利人。
>
> 🧪 **狀態：初步測試版（alpha）。** 尚未完成 Windows 實機驗收。

## 支援範圍

| 項目 | 內容 |
|---|---|
| 應用程式 | GitHub Desktop **3.6.10** |
| 平台 | **Windows x64** |
| 語系 | 台灣繁體中文（zh-TW） |

其他版本與平台不在本版支援範圍，安裝程式會擋下不相符的版本。

## 安裝

1. 完全結束 GitHub Desktop。
2. 解壓縮 Release ZIP 到任意資料夾（**不要**直接在壓縮檔內執行）。
3. 雙擊 `install.cmd`。
4. 重新啟動 GitHub Desktop。

安裝前會驗證版本、原檔 SHA256、payload SHA256 與既有備份 SHA256。任一不符即中止，**且不改動任何檔案**。

## 還原

1. 完全結束 GitHub Desktop。
2. 雙擊 `restore.cmd`。
3. 重新啟動 GitHub Desktop。

還原使用安裝時保留的原檔備份（`.zh-original-3.6.10`），請勿刪除。

## 已安裝簡體補丁時

本補丁只接受**原始英文檔**。若目前是簡體補丁狀態：

1. 先用簡體補丁的 `restore.cmd` 還原英文原版
2. 確認 GitHub Desktop 可正常啟動
3. 再執行本補丁的 `install.cmd`

## 重現建置

### 1. 取得原版 `resources/app`

```bash
# 官方來源（校驗值見 release-3.6.10 的 checksums.txt）
curl -L -O https://github.com/desktop/desktop/releases/download/release-3.6.10/GitHubDesktop-3.6.10-x64-full.nupkg
# SHA256: 0b6c599f45cf675208abd68459b3c8e99a533cc0a03e0d1544868a06d64e05fc
```

解出 `lib/net45/resources/app/` 下的 `main.js`、`renderer.js`、`crash.js` 及三份 `.js.map` 與 `package.json`。

原檔 SHA256 必須符合 `zh-TW/manifest.json` 的 `original` 欄位，否則建置會中止。

### 2. 建置

```bash
node tools/build-zhtw.cjs <resources/app 路徑> build/output
```

產物 SHA256 必須等於 `zh-TW/manifest.json` 的 `patched` 欄位。

### 3. 驗證

```bash
node tools/verify.cjs   # 語法、AST 結構、佔位符
node tools/report.cjs   # 翻譯匹配報告
node tools/audit.cjs    # 殘留簡體字
```

## 翻譯審查進度

| 分類 | 數量 |
|---|---:|
| 詞庫總條目 | 1,925 |
| 已對照英文審查 | 51 |
| 僅自動轉換／仍待審查 | **1,874** |

**1,874 條不是錯誤，是尚未逐條對照英文。** 詳細分類見 `docs/翻譯審查紀錄.md`。

## 術語

Stash＝**貯藏**、Stage＝**暫存**、Staging area＝**暫存區**。完整對照見 `docs/術語表.md`。

> 註：來源 zh-CN 詞庫本身不含任何 Stage 條目（以英文側 `/stag/i` 搜尋為 0 筆）。

## 已知問題

1. 1,874 條僅經自動轉換，用語可能仍偏簡中習慣
2. 來源詞庫無 Stage 條目，若實機出現 Stage 相關英文未翻譯屬來源限制
3. Git／伺服器／AI 的即時回傳文字不保證中文
4. 外部網頁與開發診斷訊息不翻譯
5. `patch.ps1` 沿用參考專案原檔，未在 PowerShell 實跑

## 未驗證項目

| 項目 | 狀態 |
|---|---|
| Windows 實機啟動 | ❌ 未驗證 |
| PowerShell 安裝／還原 | ❌ 未驗證 |
| 重複安裝／不相容攔截 | ❌ 未驗證 |
| 新增、複製儲存庫 | ❌ 未驗證 |
| 提交、分支切換 | ❌ 未驗證 |
| 擷取、拉取、推送、合併 | ❌ 未驗證 |
| 衝突處理 | ❌ 未驗證 |
| 介面截字、選單、錯誤提示 | ❌ 未驗證 |

驗收步驟見 `docs/Windows驗收清單.md`。

## 來源與授權

- 翻譯引擎與詞庫結構改編自 [Johnserf-Seed/GitHub-Desktop-Chinese-Language-Pack](https://github.com/Johnserf-Seed/GitHub-Desktop-Chinese-Language-Pack)（MIT）
- zh-CN 詞庫參考 [xiazheteng8/GitHubDesktop-ZH-3.6.10](https://github.com/xiazheteng8/GitHubDesktop-ZH-3.6.10)（提交 `eda4fa7e`）
- AST 解析：[acorn](https://github.com/acornjs/acorn)（MIT）
- 簡繁轉換字典：[OpenCC](https://github.com/BYVoid/OpenCC)（Apache-2.0，固定提交 `9e9d730e`，見 `dicts/SOURCES.md`）
- GitHub Desktop 本體：MIT，© GitHub, Inc.（`LICENSE`）

完整聲明見 `NOTICE.txt`、`THIRD-PARTY-LICENSE.txt`、`acorn-LICENSE.txt`、`dicts/LICENSE-OpenCC.txt`。
