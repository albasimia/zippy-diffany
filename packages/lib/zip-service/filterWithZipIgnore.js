import fs from 'fs';
import ignore from 'ignore';

/**
 * .zipignore に基づいてファイルリストをフィルターする
 * @param {string[]} fileList - フィルター前のファイル一覧
 * @param {string} zipIgnorePath - .zipignore ファイルのパス
 * @returns {string[]} フィルター後のファイルリスト
 */
export function filterWithZipIgnore(fileList, zipIgnorePath) {
  if (!fs.existsSync(zipIgnorePath)) return fileList;

  const raw = fs.readFileSync(zipIgnorePath, 'utf-8');
  const ig = ignore().add(raw);
  return fileList.filter((f) => !ig.ignores(f));
}
