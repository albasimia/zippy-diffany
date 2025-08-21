# Zippy Diffany

> 💼 Git差分を素早く抽出してZIP化する、クロスプラットフォーム対応のCLI & GUIアプリケーション  
> 🧪 TDD対応 & モノレポ構成

---

## 📦 Project Overview / プロジェクト概要

Zippy Diffany は、ローカルのGitリポジトリに対して任意の2つのコミット間の差分ファイルを抽出し、必要なファイルだけを選んでZIPファイルとして出力するツールです。

Zippy Diffany is a tool that extracts the difference between two Git commits and creates a clean ZIP file with only the selected files.

- ✅ CLIツール（npmで公開可能）
- ✅ ElectronベースのGUIアプリ（App）
- ✅ 共通ロジックは `lib/` に集約
- ✅ TDD（テスト駆動開発）に対応（Vitest）

---

## 🗂 Repository Structure / リポジトリ構成

```
zippy-diffany/
├── packages/
│   ├── cli/        # CLIツール（npm公開対応）
│   ├── lib/        # 共通ロジック（Git操作・ZIP生成）
│   └── app/        # GUIアプリ（Electron）
├── package.json    # npm workspaces 設定
└── README.md       # 本ファイル
```

---

## 🚀 Usage (CLI) / 使い方（CLI）

### 📦 Install / インストール

```bash
npm install -g zippy-diffany
```

### 🔧 Run / 実行例

```bash
zippy-diffany \
  --repo ./my-git-project \
  --commit1 abc123 \
  --commit2 def456 \
  --out diff.zip
```

| オプション      | 説明                        |
|----------------|-----------------------------|
| `--repo`       | Gitリポジトリのパス         |
| `--commit1`    | 比較対象の古いコミット      |
| `--commit2`    | 比較対象の新しいコミット    |
| `--out`        | 出力ZIPファイル名（任意）   |

---

## 🧪 Run Tests / テスト実行

```bash
cd packages/lib
npm install
npm run test
```

---

## 📦 Publish CLI to npm / CLIをnpmに公開（任意）

```bash
cd packages/cli
npm login
npm publish --access public
```

---

## 🌐 多言語対応 / Multilingual

- 本READMEは日本語・英語併記となっています。
- This README includes both Japanese and English.

---

## 📄 License

MIT License(?)
