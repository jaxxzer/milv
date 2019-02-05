export interface IReader<T = string> {
  read(name: string): Promise<T>;
  readSync(name: string): T;
  readAnyOf(fileNames: string[]): Promise<string | undefined>;
  readAnyOfSync(fileNames: string[]): string | undefined;
  list(directory: string, extensions?: string[]): Promise<string[]>;
  listSync(directory: string, extensions?: string[]): string[];
}
