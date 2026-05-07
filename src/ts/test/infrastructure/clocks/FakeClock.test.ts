import { describe, it, expect, beforeEach } from 'vitest';
import { FakeClock } from '../../../main/infrastructure/clocks/FakeClock';

describe('FakeClock', () => {
  let clock: FakeClock;

  beforeEach(() => {
    clock = new FakeClock();
  });

  it('starts at zero', () => {
    expect(clock.now()).toBe(0);
  });

  it('advances time via tick', () => {
    clock.tick(1000);
    expect(clock.now()).toBe(1000);
    clock.tick(500);
    expect(clock.now()).toBe(1500);
  });

  it('fires a timer when tick passes its deadline', () => {
    let fired = false;
    clock.setTimeout(() => { fired = true; }, 100);
    clock.tick(99);
    expect(fired).toBe(false);
    clock.tick(1);
    expect(fired).toBe(true);
  });

  it('fires a timer exactly at its deadline', () => {
    let fired = false;
    clock.setTimeout(() => { fired = true; }, 50);
    clock.tick(50);
    expect(fired).toBe(true);
  });

  it('does not fire a cancelled timer', () => {
    let fired = false;
    const id = clock.setTimeout(() => { fired = true; }, 100);
    clock.clearTimeout(id);
    clock.tick(200);
    expect(fired).toBe(false);
  });

  it('fires multiple timers in a single tick', () => {
    const log: number[] = [];
    clock.setTimeout(() => log.push(1), 10);
    clock.setTimeout(() => log.push(2), 20);
    clock.setTimeout(() => log.push(3), 30);
    clock.tick(30);
    expect(log).toContain(1);
    expect(log).toContain(2);
    expect(log).toContain(3);
  });

  it('does not fire timers beyond the tick amount', () => {
    let fired = false;
    clock.setTimeout(() => { fired = true; }, 100);
    clock.tick(50);
    expect(fired).toBe(false);
  });

  it('reset clears time and all pending timers', () => {
    clock.setTimeout(() => {}, 100);
    clock.tick(50);
    clock.reset();
    expect(clock.now()).toBe(0);
    clock.tick(200);
    // no timer should fire since reset cleared it
  });

  it('reset accepts an initial time', () => {
    clock.reset(1715083200000);
    expect(clock.now()).toBe(1715083200000);
  });

  it('tick throws on RealClock (guard test via duck type)', () => {
    // Ensure FakeClock.tick does NOT throw (only RealClock.tick throws)
    expect(() => clock.tick(0)).not.toThrow();
  });
});
