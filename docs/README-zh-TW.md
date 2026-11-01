# GitHub Desktop 3.6.10 台灣繁體中文語言補丁（非官方）

**狀態：初步測試版**

> 本專案為非官方社群補丁，與 GitHub, Inc. 無關。
> GitHub Desktop 與 GitHub 商標屬於其各自權利人。

## 支援範圍

| 項目 | 內容 |
|---|---|
| 應用程式 | GitHub Desktop 3.6.10 |
| 平台 | Windows x64 |
| 語系 | 台灣繁體中文（zh-TW） |

其他版本不在本版支援範圍。

## 安裝

1. 完全結束 GitHub Desktop。
2. 解壓縮本 ZIP 到任意資料夾（**不可**直接在壓縮檔內執行）。
3. 雙擊 `install.cmd`。
4. 重新啟動 GitHub Desktop。

安裝前會驗證：版本、原檔 SHA256、payload SHA256、既有備份 SHA256。任一不符即中止，且不改動任何檔案。

## 還原

1. 完全結束 GitHub Desktop。
2. 雙擊 `restore.cmd`。
3. 重新啟動 GitHub Desktop。

還原使用安裝時保留的原檔備份，請勿刪除。

## 若已安裝簡體補丁

本補丁的前置檢查只接受**原始英文檔**。若目前是簡體補丁狀態，請先：

1. 以簡體補丁附帶的 `restore.cmd` 還原英文原版；
2. 確認 GitHub Desktop 可正常啟動；
3. 再執行本補丁的 `install.cmd`。

不要跳過還原步驟直接覆蓋。

## 自訂安裝路徑

```powershell
powershell -ExecutionPolicy Bypass -File .\patch.ps1 -InstallPath "D:\Apps\GitHubDesktop"
```

僅驗證不安裝：

```powershell
powershell -ExecutionPolicy Bypass -File .\patch.ps1 -VerifyOnly
```

## 翻譯說明

- 詞庫共 1,925 條，其中 51 條已逐條對照英文審查，其餘為初稿轉換結果。
- Stash＝貯藏、Stage＝暫存、Staging area＝暫存區。
- 程式識別字、內部狀態、命令、URL、快捷鍵、佔位符與使用者輸入一律保留原文。

## 已知限制

- Git、伺服器與 AI 服務的即時回傳文字不保證顯示中文。
- 外部網頁與開發診斷訊息不翻譯。
- 尚未於 Windows 實機完成啟動與 Git 操作驗收。

## 授權

見 `LICENSE`、`NOTICE.txt`、`THIRD-PARTY-LICENSE.txt`、`acorn-LICENSE.txt`。
