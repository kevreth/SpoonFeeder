import type { Clock } from '../clocks/Clock';
import {
  TelemetryEventSchema,
  type TelemetryEvent,
  type TelemetryEventInput,
} from './TelemetryEventSchema';

export class TelemetryBus {
  private buffer: TelemetryEvent[] = [];
  private readonly maxSize = 1000;
  private subscribers: ((event: TelemetryEvent) => void)[] = [];

  constructor(private clock?: Clock) {}

  emit(rawEvent: TelemetryEventInput): void {
    const stamped = {
      ...rawEvent,
      timestamp: rawEvent.timestamp ?? this.clock?.now() ?? Date.now(),
    };
    const parsed = TelemetryEventSchema.safeParse(stamped);

    let validated: TelemetryEvent;
    if (!parsed.success) {
      validated = {
        traceId: rawEvent.traceId ?? 'malformed',
        subsystem: 'invariant',
        event: 'telemetry_schema_violation',
        timestamp: stamped.timestamp,
        platform: rawEvent.platform ?? 'web',
        severity: 'error',
        metadata: { issues: parsed.error.issues },
      };
    } else {
      validated = parsed.data;
    }

    this.subscribers.forEach((fn) => fn(validated));
    this.buffer.push(validated);
    if (this.buffer.length > this.maxSize) {
      this.buffer.shift();
    }
  }

  subscribe(fn: (event: TelemetryEvent) => void): () => void {
    this.subscribers.push(fn);
    return () => {
      this.subscribers = this.subscribers.filter((s) => s !== fn);
    };
  }

  flush(): TelemetryEvent[] {
    const copy = [...this.buffer];
    this.buffer = [];
    return copy;
  }

  snapshot(): TelemetryEvent[] {
    return [...this.buffer];
  }
}
