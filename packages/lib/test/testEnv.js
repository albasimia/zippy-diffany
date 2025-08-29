import { config } from 'dotenv';
import path from 'path';

// .env.test を読み込む
config({ path: path.resolve('/.env.test.local') });

// 環境変数をエクスポート
export const TEST_REPO_PATH = process.env.TEST_REPO_PATH;
export const COMMIT_1 = process.env.COMMIT_1;
export const COMMIT_2 = process.env.COMMIT_2;