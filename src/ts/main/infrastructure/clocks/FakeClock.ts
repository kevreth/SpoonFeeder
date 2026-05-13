import type { Clock } from './Clock';

export class FakeClock implements Clock {
  private time = 0;
  private timers = new Map<number, { fn: () => void; fireAt: number }>();
  private nextId = 1;

  now(): number {
    return this.time;
  }

  setTimeout(fn: () => void, ms: number): number {
    const id = this.nextId++;
    this.timers.set(id, { fn, fireAt: this.time + ms });
    return id;
  }

  clearTimeout(id: number): void {
    this.timers.delete(id);
  }

  tick(ms: number): void {
    this.time += ms;
    for (const [id, t] of this.timers) {
      if (t.fireAt <= this.time) {
        this.timers.delete(id);
        t.fn();
      }
    }
  }

  reset(initialTime = 0): void {
    this.time = initialTime;
    this.timers.clear();
    this.nextId = 1;
  }
}
