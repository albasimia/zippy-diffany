# Zippy Diffany

**Zippy Diffany** は、ローカルのGitリポジトリの任意の2コミット間の差分ファイルを抽出し、不要なファイルを除外してZIP化できるクロスプラットフォーム対応のデスクトップアプリ＆CLIツールです。

## 特徴

- ローカルGitリポジトリの差分抽出（`--diff-filter=ACMR`）
- 不可視ファイル・ゴミファイルの自動除外
- `.zipignore` による柔軟な除外設定（テキスト記法）
- ZIPファイルのWindows互換（文字コード、改行コード、パーミッションなど対応）
- CLI と GUI（Electron）両対応
- TDDでテスト可能（Vitest採用）

## 使用方法（CLI）

今は仮
```bash
node cli.js --repo /path/to/repo --commit1 abc123 --commit2 def456 --out diff.zip
```

## ライセンス

後で考える
