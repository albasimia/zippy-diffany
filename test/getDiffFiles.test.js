import { describe, it, expect } from 'vitest';
import { getDiffFiles } from '../lib/git-service';

describe('getDiffFiles', () => {
  it('returns a list of diff files between two commits (mocked)', async () => {
    const repoPath = '/mock/repo';
    const commit1 = 'abc123';
    const commit2 = 'def456';

    const result = await getDiffFiles(repoPath, commit1, commit2);
    expect(Array.isArray(result)).toBe(true);
  });
});
