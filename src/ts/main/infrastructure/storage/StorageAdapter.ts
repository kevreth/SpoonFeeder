export interface StorageAdapter {
  get<T>(key: string): Promise<T | undefined>;
  set<T>(key: string, value: T): Promise<void>;
  update<T>(key: string, fn: (val: T | undefined) => T | Promise<T>): Promise<void>;
  remove(key: string): Promise<void>;
  keys(): Promise<string[]>;
  clear(): Promise<void>;
  readonly platform: 'web' | 'android' | 'test';
}
