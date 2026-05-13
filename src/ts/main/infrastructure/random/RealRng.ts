import type { Rng } from './Rng';

export class RealRng implements Rng {
  random(): number {
    return Math.random();
  }
  seed(): void {
    throw new Error('RealRng does not support seeding');
  }
}
