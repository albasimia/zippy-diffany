#!/usr/bin/env node

import { Command } from 'commander';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import open from 'open'; // `--open` 用

import { getDiffFiles } from '../../lib/git-service/getDiffFiles.js';
import { createZipFromDiff } from '../../lib/zip-service/createZipFromDiff.js';
import { filterWithZipIgnore } from '../../lib/zip-service/filterWithZipIgnore.js';

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { version } = require('../package.json');

const program = new Command();
const __dirname = path.dirname(fileURLToPath(import.meta.url));


program
  .name('zippy-diffany')
  .description('🧩 Git差分からZIPファイルを生成するツール')
  .version(version, '-v, --version', 'バージョンを表示');

program
  .argument('<commit1>', '比較元のコミットID（またはブランチ）')
  .argument('[commit2]', '比較先のコミットID（またはブランチ）', 'HEAD')
  .option('--repo <path>', 'Gitリポジトリのルートパス（指定がない場合はカレント）')
  .option('--out <path>', 'ZIPの出力パス（指定がない場合はカレントに生成）')
  .option('--name <name>', 'ZIPファイル名（デフォルトはリポジトリ名と同じ）')
  .option('--zipignore <path>', '.zipignoreのパス（指定がない場合はリポジトリ直下を探索）')
  .option('--dry-run', 'ZIPを作成せず、差分ファイルの一覧のみ表示')
  .option('--log, -l', '詳細ログを表示')
  .option('--progress', '進捗を表示（%）', true)
  .option('--no-ignore', '.zipignoreを無視')
  .option('--include-deleted', '削除ファイルも含める')
  .option('--open', 'ZIP生成後にフォルダを開く')
  .option('--force, -f', '既存のZIPを上書き')
  .action(async (commit1, commit2, options) => {
    const repoPath = options.repo ? path.resolve(options.repo) : process.cwd();


    // デフォルトの .zipignore パス
    const defaultZipIgnorePath = path.join(__dirname, 'assets', 'default.zipignore');

    // 指定があれば使う、なければリポジトリ直下、なければ CLI 内のデフォルト
    const zipIgnorePath = (() => {
      if (options.zipignore && fs.existsSync(options.zipignore)) return options.zipignore;

      const repoZipIgnore = path.join(repoPath, '.zipignore');
      if (fs.existsSync(repoZipIgnore)) return repoZipIgnore;

      return defaultZipIgnorePath;
    })();

    const outputName = options.name || path.basename(repoPath);
    const outputPath = options.out || process.cwd();
    const outputZipPath = path.join(outputPath, `${outputName}.zip`);

    const diffFilter = options.includeDeleted ? 'ACMRT' : 'ACMR';

    try {
      const diffFiles = await getDiffFiles(repoPath, commit1, commit2, diffFilter);
      const filteredFiles = options.ignore === false
        ? diffFiles
        : filterWithZipIgnore(diffFiles, zipIgnorePath);

      if (options.log) {
        console.log('差分ファイル一覧:');
        console.log(filteredFiles.join('\n'));
      }

      if (options.dryRun) {
        console.log('※ dry-run モードのためZIPは生成されません');
        return;
      }

      if (!options.force && fs.existsSync(outputZipPath)) {
        const confirm = await askYesNo(`すでに ${outputZipPath} が存在します。上書きしますか？ [y/N]: `);
        if (!confirm) return;
      }

      if (options.progress) console.log('📦 ZIP生成中...');

      await createZipFromDiff(repoPath, filteredFiles, outputZipPath);

      console.log(`✅ ZIP生成完了: ${outputZipPath}`);

      if (options.open) {
        open(outputPath);
      }

    } catch (err) {
      console.error('❌ エラー:', err.message);
    }
  });

program.parse();


// 簡易的な yes/no 入力確認（必要に応じてreadline-syncなどに置換可）
function askYesNo(message) {
  return new Promise((resolve) => {
    process.stdout.write(message);
    process.stdin.setEncoding('utf8');
    process.stdin.once('data', (data) => {
      const input = data.trim().toLowerCase();
      process.stdin.destroy();
      resolve(input === 'y' || input === 'yes');
    });
  });
}
