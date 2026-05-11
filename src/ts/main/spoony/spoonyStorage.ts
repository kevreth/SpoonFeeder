import { localAsync } from '../infrastructure/storage/storageInit';
import { SPOONY_DEFAULT_MODEL } from './spoony.types';

export const SPOONY_API_KEY = {
  async get(): Promise<string | null> {
    return (await localAsync.get<string>('spoony_api_key')) ?? null;
  },
  async set(val: string): Promise<void> {
    await localAsync.set('spoony_api_key', val);
  },
  async remove(): Promise<void> {
    await localAsync.remove('spoony_api_key');
  },
};

export const SPOONY_ENABLED = {
  async get(): Promise<boolean> {
    const val = await localAsync.get<string>('spoony_enabled');
    if (val === undefined || val === null) return true;
    return val === 'true';
  },
  async set(val: boolean): Promise<void> {
    await localAsync.set('spoony_enabled', String(val) as 'true' | 'false');
  },
  async is(): Promise<boolean> {
    return this.get();
  },
  async remove(): Promise<void> {
    await localAsync.remove('spoony_enabled');
  },
};

export const SPOONY_MODEL = {
  async get(): Promise<string> {
    return (await localAsync.get<string>('spoony_model')) ?? SPOONY_DEFAULT_MODEL;
  },
  async set(val: string): Promise<void> {
    await localAsync.set('spoony_model', val);
  },
  async remove(): Promise<void> {
    await localAsync.remove('spoony_model');
  },
};
