// packages/cli/test/cli-options.test.js
import { describe, it, expect } from 'vitest';
import { execa } from 'execa';
import path from 'path';
import fs from 'fs-extra';

const CLI_PATH = path.resolve('packages/cli/bin/zippy-diffany.js');
const TEST_REPO = path.resolve('packages/lib/test/mock/sample-repo');
const COMMIT1 = '89876003116ff2c08954b7d5292f3ef7d9365048'; // 実際に使えるコミットに置き換えて
const COMMIT2 = 'de1de634a8b41beb13de41b008fc384b94bda9c8';

describe('CLIオプションテスト', () => {
  it('--version', async () => {
    const { stdout } = await execa('node', [CLI_PATH, '--version']);
    expect(stdout).toMatch(/^\d+\.\d+\.\d+$/); // semver
  });

  it('--dry-run でZIPを作らない', async () => {
    const outputZip = path.resolve('test-output.zip');
    await execa('node', [
      CLI_PATH, COMMIT1, COMMIT2,
      '--repo', TEST_REPO,
      '--dry-run',
      '--out', path.dirname(outputZip),
      '--name', path.basename(outputZip, '.zip'),
    ]);
    expect(fs.existsSync(outputZip)).toBe(false);
  });

  it('--force でZIPを上書き', async () => {
    const outputZip = path.resolve('test-output.zip');
    fs.writeFileSync(outputZip, 'dummy');

    const { exitCode } = await execa('node', [
      CLI_PATH, COMMIT1, COMMIT2,
      '--repo', TEST_REPO,
      '--force',
      '--out', path.dirname(outputZip),
      '--name', path.basename(outputZip, '.zip'),
    ]);

    expect(exitCode).toBe(0);
    const stats = fs.statSync(outputZip);
    expect(stats.size).toBeGreaterThan(10); // dummyより大きい想定
  });

  // 他のオプションも同様に追加可
});
