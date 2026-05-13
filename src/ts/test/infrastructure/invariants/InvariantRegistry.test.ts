import { describe, it, expect, beforeEach } from 'vitest';
import { InvariantRegistry } from '../../../main/infrastructure/invariants/InvariantRegistry';
import { FakeClock } from '../../../main/infrastructure/clocks/FakeClock';
import { TelemetryBus } from '../../../main/infrastructure/telemetry/TelemetryBus';

describe('InvariantRegistry', () => {
  let clock: FakeClock;
  let bus: TelemetryBus;
  let registry: InvariantRegistry;

  beforeEach(() => {
    clock = new FakeClock();
    clock.reset(1000);
    bus = new TelemetryBus(clock);
    registry = new InvariantRegistry(clock, 'web', bus);
  });

  it('passes without violations when all invariants pass', async () => {
    registry.register({
      id: 'test.pass',
      subsystem: 'storage',
      description: 'always passes',
      severity: 'low',
      check: () => {},
    });
    await expect(registry.assertAll()).resolves.toBeUndefined();
    expect(registry.getViolations()).toHaveLength(0);
  });

  it('records a violation when a check throws', async () => {
    registry.register({
      id: 'test.fail',
      subsystem: 'storage',
      description: 'always fails',
      severity: 'high',
      check: () => { throw new Error('bad state'); },
    });
    await expect(registry.assertAll()).rejects.toThrow('bad state');
    const violations = registry.getViolations();
    expect(violations).toHaveLength(1);
    expect(violations[0].invariantId).toBe('test.fail');
    expect(violations[0].message).toBe('bad state');
    expect(violations[0].timestamp).toBe(1000);
  });

  it('emits invariant_violation telemetry on failure', async () => {
    registry.register({
      id: 'test.fail',
      subsystem: 'quiz',
      description: 'fails',
      severity: 'critical',
      check: () => { throw new Error('oops'); },
    });
    await expect(registry.assertAll()).rejects.toThrow();
    const events = bus.snapshot().filter((e) => e.event === 'invariant_violation');
    expect(events).toHaveLength(1);
    expect(events[0].severity).toBe('error');
    expect(events[0].metadata?.invariantId).toBe('test.fail');
  });

  it('collects all violations without throwing when throwOnViolation is false', async () => {
    registry.register({
      id: 'test.fail1',
      subsystem: 'storage',
      description: 'fail 1',
      severity: 'high',
      check: () => { throw new Error('first'); },
    });
    registry.register({
      id: 'test.fail2',
      subsystem: 'storage',
      description: 'fail 2',
      severity: 'low',
      check: () => { throw new Error('second'); },
    });
    await expect(registry.assertAll({ throwOnViolation: false })).resolves.toBeUndefined();
    expect(registry.getViolations()).toHaveLength(2);
  });

  it('filters by subsystem', async () => {
    registry.register({
      id: 'storage.inv',
      subsystem: 'storage',
      description: 'storage check',
      severity: 'low',
      check: () => { throw new Error('storage fail'); },
    });
    registry.register({
      id: 'quiz.inv',
      subsystem: 'quiz',
      description: 'quiz check',
      severity: 'low',
      check: () => {},
    });
    await expect(registry.assertAll({ subsystem: 'quiz' })).resolves.toBeUndefined();
    expect(registry.getViolations()).toHaveLength(0);
  });

  it('clearViolations resets the violation list', async () => {
    registry.register({
      id: 'test.fail',
      subsystem: 'storage',
      description: 'fail',
      severity: 'low',
      check: () => { throw new Error('x'); },
    });
    await expect(registry.assertAll({ throwOnViolation: false })).resolves.toBeUndefined();
    expect(registry.getViolations()).toHaveLength(1);
    registry.clearViolations();
    expect(registry.getViolations()).toHaveLength(0);
  });

  it('supports async check functions', async () => {
    registry.register({
      id: 'test.async',
      subsystem: 'storage',
      description: 'async fail',
      severity: 'high',
      check: async () => { throw new Error('async error'); },
    });
    await expect(registry.assertAll()).rejects.toThrow('async error');
    expect(registry.getViolations()).toHaveLength(1);
  });
});
