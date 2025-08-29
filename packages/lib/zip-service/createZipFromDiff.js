import fs from 'fs-extra';
import path from 'path';
import archiver from 'archiver';

/**
 * 差分ファイルからZIPを生成する
 * @param {string} repoPath - Gitリポジトリのルート
 * @param {string[]} fileList - ZIPに含めるファイルの相対パス一覧
 * @param {string} outputZipPath - 出力するZIPファイルのフルパス
 * @returns {Promise<void>}
 */
export async function createZipFromDiff(repoPath, fileList, outputZipPath) {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(outputZipPath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => resolve());
    archive.on('error', (err) => reject(err));
    archive.pipe(output);

    for (const relPath of fileList) {
      const fullPath = path.join(repoPath, relPath);
      if (fs.existsSync(fullPath)) {
        archive.file(fullPath, {
          name: relPath,
          mode: 0o604, // Windows互換
        });
      }
    }

    archive.finalize();
  });
}
