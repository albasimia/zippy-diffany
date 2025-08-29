#!/usr/bin/env node
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs-extra';
import dotenv from 'dotenv';


// import { getDiffFiles } from '@zippy-diffany/lib/git-service/getDiffFiles';
// import { createZipFromDiff } from '@zippy-diffany/lib/zip-service/createZipFromDiff.js';
// import { filterWithZipIgnore } from '@zippy-diffany/lib/zip-service/filterWithZipIgnore.js';

import { getDiffFiles } from '../lib/git-service/getDiffFiles.js';
import { createZipFromDiff } from '../lib/zip-service/createZipFromDiff.js';
import { filterWithZipIgnore } from '../lib/zip-service/filterWithZipIgnore.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 任意で使っている `.env.test.local` を読み込む
dotenv.config({ path: path.resolve(__dirname, '../../.env.test.local') });

const repoPath = process.env.TEST_REPO_PATH;
const commit1 = process.env.COMMIT_1;
const commit2 = process.env.COMMIT_2;

console.log('TEST_REPO_PATH:', process.env.TEST_REPO_PATH);
console.log('COMMIT_1:', process.env.COMMIT_1);
console.log('COMMIT_2:', process.env.COMMIT_2);

const zipIgnorePath = path.join(repoPath, '.zipignore');
const outputZip = path.join(process.cwd(), 'dist/test-output.zip');

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
