#!/usr/bin/env node

const { getDiffFiles, createZipFromDiff } = require('@zippy-diffany/lib');
const minimist = require('minimist');
const path = require('path');

const args = minimist(process.argv.slice(2));
const repo = args.repo || '.';
const commit1 = args.commit1;
const commit2 = args.commit2;
const output = args.out || path.basename(repo) + '.zip';

if (!commit1 || !commit2) {
  console.error('❌ コミットハッシュを2つ指定してください --commit1 <hash> --commit2 <hash>');
  process.exit(1);
}

(async () => {
  try {
    console.log('📁 差分ファイルを抽出中...');
    const diffFiles = await getDiffFiles(repo, commit1, commit2);
    console.log(`📄 対象ファイル数: ${diffFiles.length}`);

    console.log('📦 ZIPファイルを生成中...');
    await createZipFromDiff(repo, diffFiles, output);
    console.log(`✅ ZIPファイルを作成しました: ${output}`);
  } catch (err) {
    console.error('❌ エラー:', err.message);
    process.exit(1);
  }
})();
