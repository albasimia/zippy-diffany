import { execSync } from 'child_process';

/**
 * 2つのコミット間の差分ファイル一覧を取得する
 * @param {string} repoPath - Gitリポジトリのルートパス
 * @param {string} commit1 - 最初のコミットハッシュ
 * @param {string} commit2 - 2番目のコミットハッシュ
 * @returns {string[]} - 差分ファイルの相対パス配列
 */
export function getDiffFiles(repoPath, commit1, commit2) {
  const cmd = `git -C "${repoPath}" diff --name-only --diff-filter=ACMR ${commit1} ${commit2}`;
  const output = execSync(cmd).toString().trim();
  return output.split('\n').filter(Boolean);
}
