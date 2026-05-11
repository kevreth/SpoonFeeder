import type { Clock } from './Clock';

export class RealClock implements Clock {
  now(): number {
    return Date.now();
  }
  setTimeout(fn: () => void, ms: number): number {
    return window.setTimeout(fn, ms);
  }
  clearTimeout(id: number): void {
    window.clearTimeout(id);
  }
  tick(): void {
    throw new Error('RealClock does not support manual ticking');
  }
}
