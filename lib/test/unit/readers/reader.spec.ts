import * as fs from 'fs'
import { Reader } from '../../../src/reader';

jest.mock('fs', () => {
  return {
    readdir: jest.fn((dir, callback) => callback(null, [dir])),
    readFile: jest.fn((fileName, callback) => callback(null, fileName)),
  };
});

describe('Reader', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should use fs.readdir when list', async () => {
    const dir: string = process.cwd();
    const reader: Reader = new Reader();
    const filenames: string[] = await reader.list(dir);
    expect(fs.readdir).toHaveBeenCalled();
  });

  it('should use fs.readFile when read', async () => {
    const reader: Reader = new Reader();
    const content: string = await reader.read('fileName');
    expect(fs.readFile).toHaveBeenCalled();
  });
});
