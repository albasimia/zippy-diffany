#!/usr/bin/env node
import path from 'path';
import fs from 'fs-extra';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { getDiffFiles } from '../../lib/git-service/getDiffFiles.js';
import { createZipFromDiff } from '../../lib/zip-service/createZipFromDiff.js';
import { filterWithZipIgnore } from '../../lib/zip-service/filterWithZipIgnore.js';

// __dirname polyfill (ESM)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// .env.test.local をルートから読み込み
dotenv.config({ path: path.resolve(__dirname, '../../../.env.test.local') });

// 環境変数から読み込む（仮：あとでCLI引数に変更可）
const repoPath = process.env.TEST_REPO_PATH;
const commit1 = process.env.COMMIT_1;
const commit2 = process.env.COMMIT_2;

const zipIgnorePath = path.join(repoPath, '.zipignore');
const outputZip = path.join(process.cwd(), 'zippy-output.zip');

(async () => {
  try {
    console.log('📄 差分を抽出中...');
    const allDiffFiles = await getDiffFiles(repoPath, commit1, commit2);

    console.log('🧹 .zipignore を適用中...');
    const filtered = filterWithZipIgnore(allDiffFiles, zipIgnorePath);

    console.log('📦 ZIP作成中...');
    await createZipFromDiff(repoPath, filtered, outputZip);

    console.log(`✅ ZIPファイルを生成しました: ${outputZip}`);
  } catch (err) {
    console.error('❌ エラー:', err);
  }
})();
