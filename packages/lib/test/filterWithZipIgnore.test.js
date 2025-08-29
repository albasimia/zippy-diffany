import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs-extra';
import path from 'path';
import { filterWithZipIgnore } from '../zipignore';

const mockZipIgnorePath = path.resolve('./test/mock/.zipignore');

beforeAll(() => {
    fs.ensureDirSync(path.dirname(mockZipIgnorePath));
    fs.writeFileSync(mockZipIgnorePath, `
# コメント行
*.log
build/
!keep.log
`);
});

describe('filterWithZipIgnore', () => {
    it('zipignoreにマッチするファイルを除外する', () => {
        const files = [
            'src/index.js',
            'debug.log',
            'build/main.js',
            'keep.log'
        ];

        const filtered = filterWithZipIgnore(files, mockZipIgnorePath);
        expect(filtered).toEqual([
            'src/index.js',
            'keep.log' // !keep.log により含まれる
        ]);
    });

    it('zipignoreファイルが存在しない場合は全て含める', () => {
        const files = ['a.js', 'b.css'];
        const filtered = filterWithZipIgnore(files, '/non/existent/path');
        expect(filtered).toEqual(files);
    });
});
