import type { InvariantRegistry } from '../InvariantRegistry';
import { localSync, sessionSync, appRegistry } from '../../storage/storageInit';

const SESSION_KEYS = ['random', 'transition', 'mute', 'courses'] as const;
const LOCAL_KEYS = ['courseName', 'spoony_api_key', 'spoony_enabled', 'spoony_model'] as const;
const MAX_LOCAL_BYTES = 4 * 1024 * 1024; // 4 MB conservative guard

export function registerStorageInvariants(registry: InvariantRegistry): void {
  registry.register({
    id: 'storage.schema-valid-session',
    subsystem: 'storage',
    description: 'All registered session storage keys pass Zod schema on read',
    severity: 'critical',
    check: () => {
      for (const key of SESSION_KEYS) {
        const schema = appRegistry.getSchema(key);
        const raw = sessionStorage.getItem(key);
        if (raw === null || schema === undefined) continue;
        try {
          const parsed = JSON.parse(raw);
          const data =
            parsed && typeof parsed === 'object' && 'data' in parsed ? parsed.data : parsed;
          schema.parse(data);
        } catch (e) {
          throw Object.assign(new Error(`Session key "${key}" failed schema validation: ${String(e)}`), { cause: e });
        }
      }
    },
  });

  registry.register({
    id: 'storage.schema-valid-local',
    subsystem: 'storage',
    description: 'All registered local storage keys pass Zod schema on read',
    severity: 'critical',
    check: () => {
      for (const key of LOCAL_KEYS) {
        const schema = appRegistry.getSchema(key);
        const raw = localStorage.getItem(key);
        if (raw === null || schema === undefined) continue;
        try {
          const parsed = JSON.parse(raw);
          const data =
            parsed && typeof parsed === 'object' && 'data' in parsed ? parsed.data : parsed;
          schema.parse(data);
        } catch (e) {
          throw Object.assign(new Error(`Local key "${key}" failed schema validation: ${String(e)}`), { cause: e });
        }
      }
    },
  });

  registry.register({
    id: 'storage.null-guard',
    subsystem: 'storage',
    description: 'No registered key holds the literal string "null" or "undefined"',
    severity: 'high',
    check: () => {
      const allKeys = [
        ...SESSION_KEYS.map((k) => ({ key: k, store: sessionStorage })),
        ...LOCAL_KEYS.map((k) => ({ key: k, store: localStorage })),
      ];
      for (const { key, store } of allKeys) {
        const raw = store.getItem(key);
        if (raw === 'null' || raw === 'undefined') {
          throw new Error(`Key "${key}" holds prohibited value "${raw}"`);
        }
      }
    },
  });

  registry.register({
    id: 'storage.quota',
    subsystem: 'storage',
    description: 'Total localStorage usage is below 4 MB',
    severity: 'high',
    check: () => {
      let total = 0;
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k) {
          const v = localStorage.getItem(k);
          total += (k.length + (v?.length ?? 0)) * 2; // UTF-16 bytes approximation
        }
      }
      if (total > MAX_LOCAL_BYTES) {
        throw new Error(
          `localStorage usage ~${Math.round(total / 1024)} KB exceeds 4 MB guard`
        );
      }
    },
  });

  registry.register({
    id: 'storage.sensitive-not-empty',
    subsystem: 'storage',
    description: 'spoony_api_key is never stored as an empty string',
    severity: 'high',
    check: () => {
      const val = localSync.get<string>('spoony_api_key');
      if (val !== undefined && val.trim() === '') {
        throw new Error('spoony_api_key is stored as an empty string');
      }
    },
  });

  void sessionSync; // referenced for side-effect; adapters emit telemetry on use
}
