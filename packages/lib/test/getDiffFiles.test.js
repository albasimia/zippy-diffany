import { describe, it, expect } from 'vitest';
import { getDiffFiles } from '../git-service';

describe('getDiffFiles', () => {
  it('2つのコミット間の差分ファイル一覧を取得する（仮テスト）', async () => {
    const repoPath = '/mock/repo';
    const commit1 = 'abc123';
    const commit2 = 'def456';
    const result = await getDiffFiles(repoPath, commit1, commit2);
    expect(Array.isArray(result)).toBe(true);
  });
});
