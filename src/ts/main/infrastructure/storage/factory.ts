import type { Clock } from '../clocks/Clock';
import type { TelemetryBus } from '../telemetry/TelemetryBus';
import type { StorageAdapter } from './StorageAdapter';
import { WebStorageAdapter } from './WebStorageAdapter';
import type { SchemaRegistry } from './schemas/Registry';
import type { QuotaGuard } from './QuotaGuard';

// Android support requires @capacitor/preferences — not yet installed.
// When Capacitor packages are added, replace with:
//   import { AndroidStorageAdapter } from './AndroidStorageAdapter';
//   import { Capacitor } from '@capacitor/core';
//   if (Capacitor.getPlatform() === 'android') return new AndroidStorageAdapter(...)

export function createLocalStorageAdapter(
  registry: SchemaRegistry,
  quota: QuotaGuard,
  clock: Clock,
  telemetry: TelemetryBus
): StorageAdapter {
  return new WebStorageAdapter(localStorage, registry, quota, clock, telemetry);
}

export function createSessionStorageAdapter(
  registry: SchemaRegistry,
  quota: QuotaGuard,
  clock: Clock,
  telemetry: TelemetryBus
): StorageAdapter {
  return new WebStorageAdapter(sessionStorage, registry, quota, clock, telemetry);
}
