# GitHub Desktop 台灣繁體中文語言補丁

讓 GitHub Desktop 的介面更貼近台灣使用者的閱讀習慣，採用「儲存庫、分支、提交、貯藏」等一致用語。

本專案以 GitHub Desktop 3.6.10 簡體中文補丁為基礎，製作獨立的台灣繁體中文（zh-TW）詞庫，提供補丁原始碼、建置工具及安裝／還原腳本。

**[下載初步測試版](https://github.com/DawnCore-Yuan/GitHubDesktop-zh-TW/releases/tag/v3.6.10-zh-TW.1-alpha)** · **[回報問題](https://github.com/DawnCore-Yuan/GitHubDesktop-zh-TW/issues)** · **[查看術語表](docs/術語表.md)**

> 🧪 **目前為初步測試版（alpha）。**
> 已由使用者完成 Windows 實機安裝與啟動確認，主畫面及檔案選單可正常顯示繁體中文。
>
> 安裝還原、完整 Git 操作流程與其他介面仍待逐項驗收；詞庫中仍有 1,874 條尚未逐條對照英文校訂。
>
> 本專案為非官方語言補丁，未獲 GitHub, Inc. 背書，與其無隸屬關係。

## 支援範圍

| 項目 | 支援內容 |
|---|---|
| 應用程式 | GitHub Desktop **3.6.10** |
| 平台 | **Windows x64** |
| 語系 | 台灣繁體中文（zh-TW） |
| 安裝方式 | 替換指定介面檔案，保留原檔備份 |
| 還原方式 | 使用隨附腳本恢復原版英文檔案 |

**版本號相同，也必須通過原檔校驗。** 其他版本、平台或已被修改的檔案不在本版支援範圍。

GitHub Desktop 更新後，需重新確認補丁相容性，不能直接沿用舊版補丁。

## 翻譯範圍與特色

詞庫涵蓋主選單、儲存庫與分支管理、提交與差異、推送與拉取、合併相關提示、設定及崩潰頁面等文案。實際覆蓋情況仍待逐頁驗收。

- **台灣用語**：統一「預設、使用者、檔案、資料夾、遠端」等用詞。
- **區分 Git 操作**：Stash 使用「貯藏」，與 Stage「暫存」區分。
- **版本與檔案校驗**：安裝前檢查目標版本、檔案及備份。
- **可還原**：保留原版檔案，提供英文還原腳本。
- **原始碼公開**：提供詞庫、翻譯引擎、建置及檢查工具。

GitHub、Copilot 等產品名稱、快捷鍵、命令、網址、程式內部識別字及使用者內容應保留原樣。Git、伺服器與 AI 即時回傳文字，以及外部網頁、開發診斷訊息，不保證顯示中文。

## 下載與安裝

### 1. 下載補丁

前往 [Release 頁面](https://github.com/DawnCore-Yuan/GitHubDesktop-zh-TW/releases/tag/v3.6.10-zh-TW.1-alpha)，下載：

- `GitHubDesktop-3.6.10-zh-TW-initial-test.zip`
- `SHA256SUMS.txt`：供核對下載檔案完整性。

**一般使用者請下載上述補丁 ZIP。** GitHub 自動提供的 `Source code` 壓縮檔是原始碼，不能直接當作安裝包使用。

如需核對 ZIP，可在 PowerShell 執行：

```powershell
Get-FileHash -LiteralPath '.\GitHubDesktop-3.6.10-zh-TW-initial-test.zip' -Algorithm SHA256
```

確認結果與同一個 Release 的 `SHA256SUMS.txt` 相符。

### 2. 安裝補丁

1. 確認目前使用 GitHub Desktop **3.6.10 Windows x64**。
2. 完全結束 GitHub Desktop。
3. 將補丁 ZIP **完整解壓縮**至資料夾，不要直接在壓縮檔內執行。
4. 雙擊 `install.cmd`，確認顯示完成訊息。
5. 重新啟動 GitHub Desktop。

安裝腳本會先檢查版本、目前檔案、補丁檔案及已存在的原檔備份。前置檢查不通過時，會在替換應用程式檔案前停止。

> 若先前已安裝簡體中文或其他補丁，請先使用原補丁的還原功能恢復英文版，再安裝本補丁。不要混用不同補丁的備份。

### 3. 自訂安裝路徑與相容性檢查

預設安裝位置為：

```text
%LOCALAPPDATA%\GitHubDesktop
```

若安裝在其他位置，可於補丁資料夾開啟 PowerShell，指定 GitHub Desktop 的安裝根目錄：

```powershell
.\patch.ps1 -InstallPath 'D:\GitHubDesktop'
```

僅檢查相容性，不執行安裝：

```powershell
.\patch.ps1 -VerifyOnly
```

自訂路徑並僅檢查相容性：

```powershell
.\patch.ps1 -InstallPath 'D:\GitHubDesktop' -VerifyOnly
```

## 還原英文版

1. 完全結束 GitHub Desktop。
2. 在補丁資料夾雙擊 `restore.cmd`。
3. 確認顯示完成訊息後，重新啟動 GitHub Desktop。

自訂安裝路徑的還原方式：

```powershell
.\patch.ps1 -InstallPath 'D:\GitHubDesktop' -Restore
```

原檔備份位於安裝目錄下：

```text
app-3.6.10\resources\app\.zh-original-3.6.10
```

**請保留備份。** 還原功能需要安裝時保存的原版檔案。

## 翻譯與驗證進度

### 翻譯審查

| 分類 | 條目數 |
|---|---:|
| 詞庫總條目 | 1,925 |
| 已對照英文審查 | 51 |
| 自動轉換後尚待逐條審查 | 1,874 |

尚待審查的條目可能存在語意、用詞或上下文問題，不能視為已完成校訂。

目前實際替換共 **2,422 處**。這是引擎命中數，**不代表翻譯完成率或介面覆蓋率**。

詳細紀錄見 [翻譯審查紀錄](docs/翻譯審查紀錄.md)。

### 建置層檢查

目前已完成的檢查包括：

- 簡體參考版本的基準重現。
- 繁體產物的 JavaScript 語法檢查。
- 建置引擎內建的 AST 驗證，以及輔助結構比較。
- 工具目前涵蓋的佔位符格式比對。
- 乾淨 checkout 建置及兩次產物雜湊比對。
- Release ZIP 重新下載與 SHA256 比對。

上述檢查不能取代實際啟動與操作驗收，也不能證明所有譯文正確。

### Windows 實機驗收

下列項目目前**全部尚未驗證**：

| 類別 | 待驗收內容 |
|---|---|
| 安裝與還原 | 首次安裝、重複安裝、還原及不相容檔案攔截 |
| 啟動與顯示 | 啟動、選單、設定、錯誤提示及介面截字 |
| 儲存庫操作 | 新增、複製儲存庫 |
| 日常 Git 操作 | 提交、分支切換、擷取、拉取及推送 |
| 合併與衝突 | 合併、衝突提示及處理流程 |

測試步驟見 [Windows 驗收清單](docs/Windows驗收清單.md)。

## 術語與已知限制

| 英文 | 本專案用語 |
|---|---|
| Repository | 儲存庫 |
| Branch | 分支 |
| Commit | 提交 |
| Stash | 貯藏 |
| Stage | 暫存 |
| Staging area | 暫存區 |
| Discard changes | 捨棄變更 |
| Delete file / branch | 刪除檔案／分支 |

完整對照見 [術語表](docs/術語表.md)。

目前已知限制：

- 部分譯文仍可能保留簡體中文的表達習慣。
- 詞庫英文欄位未搜尋到 Stage 相關匹配項目；是否存在對應介面或漏譯，仍待實機確認。
- 簡體字候選掃描僅供審查參考，不能單靠掃描結果判定繁體中文品質。
- 安裝與還原腳本沿用參考專案，目前尚未在本專案的 Windows 環境實測。

## 常見問題

**為什麼同樣是 3.6.10，仍無法安裝？**

補丁同時檢查版本與原檔 SHA256。不同構建或已安裝其他補丁，都可能造成檔案不符。請保留完整錯誤訊息，不要略過校驗強制替換。

**GitHub Desktop 更新後可以繼續使用嗎？**

不保證。請等待對應版本的補丁，並重新檢查相容性。

**這個補丁會修改我的儲存庫嗎？**

安裝腳本以指定的介面檔案及備份為操作對象，不以修改儲存庫、帳號或網路設定為目的。目前尚未完成執行期驗收。

**為什麼還有英文？**

可能是詞庫尚未涵蓋的介面、刻意保留的名稱，或 Git、伺服器等即時回傳內容。歡迎附上畫面與操作步驟回報。

## 從原始碼重現建置

一般使用者可直接使用 Release 安裝包；以下流程供開發與驗證使用。

### 1. 準備環境與原檔

準備 **Node.js 22 或以上版本**，並在本專案根目錄執行後續指令。

從 [GitHub Desktop 官方 3.6.10 Release](https://github.com/desktop/desktop/releases/tag/release-3.6.10) 取得：

- `GitHubDesktop-3.6.10-x64-full.nupkg`
- `GitHub.Desktop-3.6.10-checksums.txt`

先核對下載檔案的 SHA256，再解出 `lib/net45/resources/app/` 中的：

```text
package.json
main.js
main.js.map
renderer.js
renderer.js.map
crash.js
crash.js.map
```

三份 source map 是翻譯引擎進行來源溯源所需的輸入。

### 2. 建置與檢查

將以下 `/path/to/resources/app` 替換為原版檔案所在位置：

```bash
node tools/build-zhtw.cjs "/path/to/resources/app" build/output
node tools/verify.cjs "/path/to/resources/app" build/output
node tools/audit.cjs
```

建置工具會讀取已提交的 `zh-TW/dictionary.json`，驗證原檔並產生補丁。**目前原檔校驗取自 `zh-cn-manifest.json`；繁體產物則需另行核對 `zh-TW/manifest.json` 的 `patched` 值。**

例如，可在 PowerShell 計算產物雜湊：

```powershell
Get-FileHash -LiteralPath `
  '.\build\output\main.js', `
  '.\build\output\renderer.js', `
  '.\build\output\crash.js' `
  -Algorithm SHA256
```

需要重新產生翻譯匹配報告時執行：

```bash
node tools/report.cjs "/path/to/resources/app"
```

此指令會更新 `zh-TW/translation-report.json`。請檢查報告差異與待審候選，不要將產生報告視為翻譯已通過審查。

> `convert.cjs` 與 `draft.cjs` 是初稿工具，不是正式重建流程。不要用其輸出覆蓋已人工校訂的最終詞庫。

完整步驟與簡體基準重現方式見 [建置流程](docs/建置流程.md)。

## 回報問題

請至 [Issues](https://github.com/DawnCore-Yuan/GitHubDesktop-zh-TW/issues) 提供：

- GitHub Desktop 版本與補丁版本。
- 問題畫面、重現步驟及預期結果。
- 翻譯問題的英文原文、目前譯文與建議用語。
- 安裝問題的完整錯誤訊息。

附圖或紀錄前，請遮蔽 Token、私人儲存庫網址及其他不宜公開的資訊。

## 來源與授權

感謝以下專案提供基礎：

- [xiazheteng8/GitHubDesktop-ZH-3.6.10](https://github.com/xiazheteng8/GitHubDesktop-ZH-3.6.10)：3.6.10 簡體詞庫、版本適配、建置與安裝機制。參考提交：`eda4fa7eb0929111c411033b8ccce4cea33f0026`。
- [Johnserf-Seed/GitHub-Desktop-Chinese-Language-Pack](https://github.com/Johnserf-Seed/GitHub-Desktop-Chinese-Language-Pack)：上游翻譯引擎與基礎詞庫，MIT。
- [Acorn](https://github.com/acornjs/acorn)：JavaScript AST 解析器，MIT。
- [OpenCC](https://github.com/BYVoid/OpenCC)：簡繁轉換字典，Apache-2.0。來源版本及各檔雜湊見 [dicts/SOURCES.md](dicts/SOURCES.md)。
- [GitHub Desktop](https://github.com/desktop/desktop)：原始應用程式，MIT；其包含的第三方元件依各自授權條款使用。

授權及聲明詳見：

- [LICENSE](LICENSE)
- [NOTICE.txt](NOTICE.txt)
- [THIRD-PARTY-LICENSE.txt](THIRD-PARTY-LICENSE.txt)
- [acorn-LICENSE.txt](acorn-LICENSE.txt)
- [OpenCC 授權](dicts/LICENSE-OpenCC.txt)

GitHub 及相關商標屬於各自權利人。本補丁中的條款或授權頁面譯文為非官方翻譯，原始條款請參閱官方英文內容。
