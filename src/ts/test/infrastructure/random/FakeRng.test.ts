import { describe, it, expect } from 'vitest';
import { FakeRng } from '../../../main/infrastructure/random/FakeRng';

describe('FakeRng', () => {
  it('produces values in [0, 1)', () => {
    const rng = new FakeRng();
    rng.seed(42);
    for (let i = 0; i < 100; i++) {
      const v = rng.random();
      expect(v).toBeGreaterThanOrEqual(0);
      expect(v).toBeLessThan(1);
    }
  });

  it('same seed produces the same sequence', () => {
    const a = new FakeRng();
    const b = new FakeRng();
    a.seed(42);
    b.seed(42);
    for (let i = 0; i < 20; i++) {
      expect(a.random()).toBe(b.random());
    }
  });

  it('different seeds produce different sequences', () => {
    const a = new FakeRng();
    const b = new FakeRng();
    a.seed(1);
    b.seed(2);
    const aVals = Array.from({ length: 10 }, () => a.random());
    const bVals = Array.from({ length: 10 }, () => b.random());
    expect(aVals).not.toEqual(bVals);
  });

  it('re-seeding resets the sequence', () => {
    const rng = new FakeRng();
    rng.seed(99);
    const first = rng.random();
    rng.seed(99);
    expect(rng.random()).toBe(first);
  });
});
