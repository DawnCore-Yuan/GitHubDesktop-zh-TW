# OpenCC 字典來源

| 項目 | 值 |
|---|---|
| 上游 | https://github.com/BYVoid/OpenCC |
| 固定提交 | `9e9d730659fc7db366b43b4437b307444d87e23e` |
| 授權 | Apache License 2.0（見 `LICENSE-OpenCC.txt`） |
| 取得方式 | `https://raw.githubusercontent.com/BYVoid/OpenCC/<commit>/data/dictionary/<file>` |

## 檔案 SHA256（已與固定提交逐位元比對）

| 檔案 | SHA256 | 位元一致 |
|---|---|---|
| `STCharacters.txt` | `A0CA1601C70648CF48B33C3C6210CCBECC5C7EEAD4B4C3DAF76587BA2C03582B` | ✅ |
| `STPhrases.txt` | `24D23700F4F3D1860B899AA90896DCC7EC56C535A0B3A246BBF5A7048C7BDEB8` | ✅ |
| `TWVariants.txt` | `245B94EB5842957E735DD44B7E7D4FF469A3643126CC8FA511ADDA5281E9CB86` | ✅ |
| `TWVariantsRevPhrases.txt` | `5EBFB4BDC938C2B14E01ACE378988D5D3DC12462B3496EF1D424951CCD371256` | ✅ |

## 用途

僅用於產生 zh-TW 詞庫**初稿**。一對多（歧義）項目不任選，留待人工審查。

- `STCharacters.txt`：單字簡→繁
- `STPhrases.txt`：詞組簡→繁（優先於單字）
- `TWVariants.txt`：台灣字形變體
- `TWVariantsRevPhrases.txt`：僅記錄，未使用於轉換流程
