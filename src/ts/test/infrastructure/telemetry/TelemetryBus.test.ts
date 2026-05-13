import { describe, it, expect, beforeEach } from 'vitest';
import { TelemetryBus } from '../../../main/infrastructure/telemetry/TelemetryBus';
import { FakeClock } from '../../../main/infrastructure/clocks/FakeClock';

describe('TelemetryBus', () => {
  let clock: FakeClock;
  let bus: TelemetryBus;

  beforeEach(() => {
    clock = new FakeClock();
    clock.reset(1000);
    bus = new TelemetryBus(clock);
  });

  it('buffers a valid event', () => {
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'storage_write', platform: 'web' });
    expect(bus.snapshot()).toHaveLength(1);
  });

  it('stamps timestamp from clock when not provided', () => {
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'ev', platform: 'web' });
    expect(bus.snapshot()[0].timestamp).toBe(1000);
  });

  it('uses provided timestamp over clock', () => {
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'ev', platform: 'web', timestamp: 9999 });
    expect(bus.snapshot()[0].timestamp).toBe(9999);
  });

  it('defaults severity to info', () => {
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'ev', platform: 'web' });
    expect(bus.snapshot()[0].severity).toBe('info');
  });

  it('stores a telemetry_schema_violation for an invalid event', () => {
    // @ts-expect-error intentional invalid subsystem for test
    bus.emit({ traceId: 'bad', subsystem: 'nonexistent', event: 'ev', platform: 'web' });
    const events = bus.snapshot();
    expect(events[0].event).toBe('telemetry_schema_violation');
    expect(events[0].severity).toBe('error');
  });

  it('notifies subscribers synchronously', () => {
    const received: string[] = [];
    bus.subscribe((e) => received.push(e.event));
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'storage_write', platform: 'web' });
    expect(received).toEqual(['storage_write']);
  });

  it('unsubscribe stops notifications', () => {
    const received: string[] = [];
    const unsub = bus.subscribe((e) => received.push(e.event));
    unsub();
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'ev', platform: 'web' });
    expect(received).toHaveLength(0);
  });

  it('flush returns buffer and clears it', () => {
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'ev', platform: 'web' });
    const flushed = bus.flush();
    expect(flushed).toHaveLength(1);
    expect(bus.snapshot()).toHaveLength(0);
  });

  it('snapshot does not clear the buffer', () => {
    bus.emit({ traceId: 't1', subsystem: 'storage', event: 'ev', platform: 'web' });
    bus.snapshot();
    expect(bus.snapshot()).toHaveLength(1);
  });

  it('wraps at max size of 1000', () => {
    for (let i = 0; i < 1001; i++) {
      bus.emit({ traceId: `t${i}`, subsystem: 'storage', event: 'ev', platform: 'web' });
    }
    expect(bus.snapshot()).toHaveLength(1000);
    expect(bus.snapshot()[0].traceId).toBe('t1');
  });
});
