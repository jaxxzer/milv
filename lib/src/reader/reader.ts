import { readFile, readFileSync, readdir, readdirSync } from 'fs';

import { IReader } from './reader.interface';

export class Reader implements IReader {
  async read(name: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      readFile(
        name,
        (error: NodeJS.ErrnoException, data: Buffer) => {
          if (!!error) {
            reject(error);
          } else {
            resolve(data.toString());
          }
        },
      );
    });
  }

  readSync(name: string): string {
    return readFileSync(name).toString();
  }

  async readAnyOf(fileNames: string[]): Promise<string | undefined> {
    try {
      return await this.read(fileNames[0]);
    } catch (err) {
      return fileNames.length > 0
        ? await this.readAnyOf(fileNames.slice(1, fileNames.length))
        : undefined;
    }
  }

  readAnyOfSync(fileNames: string[]): string | undefined {
    try {
      return this.readSync(fileNames[0]);
    } catch (err) {
      return fileNames.length > 0
        ? this.readAnyOfSync(fileNames.slice(1, fileNames.length))
        : undefined;
    }
  }

  async list(directory: string, suffixes?: string[]): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      readdir(
        directory,
        (error: NodeJS.ErrnoException, fileNames: string[]) => {
          if (!!error) {
            reject(error);
          } else {
            suffixes ? resolve(fileNames.filter(file => suffixes.some(suffix => file.endsWith(suffix)))) : resolve(fileNames);
          }
        },
      );
    });
  }

  listSync(directory: string, suffixes?: string[]): string[] {
    const files = readdirSync(directory);

    if (!suffixes) return files;
    return files.filter(file => suffixes.some(suffix => file.endsWith(suffix)));
  }
}
