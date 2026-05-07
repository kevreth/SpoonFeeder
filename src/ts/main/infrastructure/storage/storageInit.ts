/**
 * Application-level storage singleton. Initialised once at module load time.
 * All dataaccess modules import from here rather than constructing their own adapters.
 */
import { QuotaGuard } from './QuotaGuard';
import { RealClock } from '../clocks/RealClock';
import { TelemetryBus } from '../telemetry/TelemetryBus';
import { WebStorageAdapter } from './WebStorageAdapter';
import { SyncStorageAdapter } from './SyncStorageAdapter';
import { SchemaRegistry } from './schemas/Registry';
import { registerSpoonFeederSchemas } from './schemas/spoonfeederSchemas';

export const appRegistry = new SchemaRegistry();
export const appClock = new RealClock();
export const appTelemetry = new TelemetryBus(appClock);

const _quota = new QuotaGuard();
_quota.setLimit('spoony_api_key', 200);

registerSpoonFeederSchemas(appRegistry);

/** Synchronous adapter over localStorage — for simple flags and strings. */
export const localSync = new SyncStorageAdapter(
  localStorage,
  appRegistry,
  _quota,
  appClock,
  appTelemetry
);

/** Synchronous adapter over sessionStorage — for session-scoped flags. */
export const sessionSync = new SyncStorageAdapter(
  sessionStorage,
  appRegistry,
  _quota,
  appClock,
  appTelemetry
);

/** Async adapter over localStorage — for SaveData and other complex records. */
export const localAsync = new WebStorageAdapter(
  localStorage,
  appRegistry,
  _quota,
  appClock,
  appTelemetry
);
