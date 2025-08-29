import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { createZipFromDiff } from '../git-service';

import { TEST_REPO_PATH, COMMIT_1, COMMIT_2 } from './testEnv.js';

describe('createZipFromDiff', () => {
  it('指定されたファイルだけをZIP化する', async () => {
    const repo = TEST_REPO_PATH;
    const files = ['index.html', 'docs/assets/img/watari_ss.png']; // 存在するファイルを指定
    const zipPath = path.resolve('./test-output.zip');

    await createZipFromDiff(repo, files, zipPath);

    // 出力ファイルが生成されていることを確認
    const exists = fs.existsSync(zipPath);
    expect(exists).toBe(true);

    // クリーンアップ（任意）
    fs.unlinkSync(zipPath);
  });
});
