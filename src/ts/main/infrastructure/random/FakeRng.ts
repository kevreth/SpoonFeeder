import type { Rng } from './Rng';

export class FakeRng implements Rng {
  private state = 0;

  seed(value: number): void {
    this.state = value >>> 0;
  }

  random(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
