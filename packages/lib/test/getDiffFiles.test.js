import { describe, it, expect } from 'vitest';
import { getDiffFiles } from '../git-service';

import { TEST_REPO_PATH, COMMIT_1, COMMIT_2 } from './testEnv.js';

describe('getDiffFiles', () => {
  it('2つのコミット間の差分ファイル一覧を取得する（仮テスト）', async () => {
    const repoPath = TEST_REPO_PATH;
    const commit1 = COMMIT_1;
    const commit2 = COMMIT_2;
    const result = await getDiffFiles(repoPath, commit1, commit2);
    expect(Array.isArray(result)).toBe(true);
  });
});
